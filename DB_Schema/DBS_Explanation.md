# ARGUS — `profiles` Table Schema Explanation

## 1. Table Structure

The `profiles` table is a one-to-one extension of Supabase's `auth.users` table. Each
authenticated user has exactly one row here, keyed by the same `uuid`.

| Column        | Type        | Constraint / Default       | Purpose                                    |
| ------------- | ----------- | -------------------------- | ------------------------------------------ |
| `id`          | `uuid`      | PRIMARY KEY                | References `auth.users(id)`, cascades on delete |
| `name`        | `text`      | NOT NULL                   | Full name (legacy/admin flows use this)    |
| `first_name`  | `text`      | NULL                       | First name                                 |
| `last_name`   | `text`      | NULL                       | Last name                                  |
| `middle_name` | `text`      | NULL                       | Middle name (reserved for later use)       |
| `user_name`   | `text`      | NULL                       | Username (from the register form)          |
| `role`        | `text`      | NOT NULL, DEFAULT `'user'` | `'user'` / `'admin'` / `'super_admin'`     |
| `phone`       | `text`      | NULL                       | Optional contact number                    |
| `department`  | `text`      | NULL                       | Optional department for admins             |
| `status`      | `text`      | NOT NULL, DEFAULT `'Active'` | `'Active'` / `'Disabled'`                |
| `created_at`  | `timestamptz`| NOT NULL, DEFAULT now()    | Set on creation                            |
| `updated_at`  | `timestamptz`| NOT NULL, DEFAULT now()    | Auto-refreshed on update                   |

The `check` constraints enforce valid `role` and `status` values at the database level so bad data cannot be inserted.

## 2. Why it is in 3NF (Third Normal Form)

The relation satisfies 3NF (and BCNF) without any extra splitting:

- **Single key:** `id` is the only key.
- **1NF:** all columns are atomic (phone is a single number, not a list, etc.).
- **2NF:** every non-key column (`name`, `role`, `phone`, `department`, `status`, timestamps) depends on the *entire* key `id`, not just part of it (there is only one column in the key).
- **3NF:** no non-key column depends on another non-key column. For example, `department` does not determine `role`, and `role` does not determine `department`. `status` is independent of `role`.

Splitting `role` / `department` / `status` into lookup tables would only be for maintenance convenience, not a normalization requirement. Keeping the enums inline here is simpler and stays 3NF-compliant.

## 3. Automatically Creating a Profile

A database trigger runs whenever a new `auth.users` row is created, so every signup is guaranteed a profile.

- `handle_new_user()` inserts a profile row with `role = 'user'`, copying the username from `user_metadata.userName` (falling back to `user_metadata.name`), and optionally `firstName`, `lastName`, and `middleName` from the same metadata.
- Trigger `on_auth_user_created` fires `AFTER INSERT ON auth.users`, executing the function.

Both triggers are created inside `DO $$ ... end $$` blocks that `DROP TRIGGER IF EXISTS ...` first. This makes the script safe to re-run (Postgres does not support `CREATE OR REPLACE TRIGGER`).

## 4. Automatically Keeping `updated_at` Fresh

The `set_updated_at` function sets `updated_at = now()` on every `UPDATE` of the `profiles` table, handled by the `set_profiles_updated_at` `BEFORE UPDATE` trigger.

## 5. Row Level Security (RLS) & Role-Based Access

RLS is enabled so the app can safely use the Supabase anon/user-scoped client. Access is decided by the caller's `role`, read from the caller's own profile.

> **Important (defense-in-depth):** all admin/account CRUD in the backend uses the **service-role key** (`supabaseAdmin`), which **bypasses RLS entirely**. Backend authorization is application-level (only `super_admin` may create or manage admins). These RLS policies are an additional database-level guard for any future user-scoped access.

The helper `current_user_role()` returns the role of the current authenticated user (or anon/`NULL` for unauthenticated requests).

### Yes/No permission matrix

| Role          | SELECT                     | INSERT                                           | UPDATE                             | DELETE                                   |
| ------------- | -------------------------- | ------------------------------------------------ | ---------------------------------- | ---------------------------------------- |
| `user`        | Own profile only           | No                                               | Own profile only                   | No                                       |
| `admin`       | All profiles               | No (cannot add new admins)                       | Own profile only                   | No                                       |
| `super_admin` | All profiles               | Allowed (can create admins)                    | Any row (can promote/change roles) | Allowed                                  |

#### SELECT policies
1. `select_own_profile` — any authenticated user may read their own profile (`auth.uid() = id`).
2. `admin_select_all_profiles` — users whose role is `admin` or `super_admin` may read the full profile directory.

#### INSERT policy
- `super_admin_insert_profiles` — only `super_admin` may insert new rows. This is what prevents a regular `admin` from adding new admins. Regular signups insert via the auth trigger, not through this policy.

#### UPDATE policies
1. `update_own_profile` — anyone may update their own profile.
2. `super_admin_update_all` — `super_admin` may update any profile, including promoting to `admin`/`super_admin`, changing `role`, `status`, etc.

#### DELETE policy
1. `super_admin_delete_profiles` — only `super_admin` may delete profiles (account removal / deactivation).

## 6. How This Maps to the Backend

| Backend operation | Code location | Supabase client | RLS applies? |
| ----------------- | -------------- | --------------- | ------------- |
| Register / login  | `authController.ts`        | `supabaseAdmin` / `supabase` (anon) | No (service/anon) |
| Profile read      | `authService.getProfile` (line 15-19) | user-scoped token | Yes — own row via `select_own_profile` |
| Own profile edit  | `authService.updateName`   | user-scoped token | Yes — `update_own_profile` |
| Add admin         | `createAdmin` / `adminRegister` | `supabaseAdmin` | No — guarded in code (`role === 'super_admin'`) |
| Admin CRUD        | `adminController.ts`        | `supabaseAdmin` | No — guarded in code by `role === 'super_admin'` |

Because account management uses the service role, the backend checks `profile.role !== "super_admin"` before creating/viewing/updating/deleting admins (`adminController.ts` and `authController.ts`). The RLS policies in this script enforce the same rules at the database level for any user-scoped access.

---

# REPORTS — Community Feed Schema Explanation

> Schema file: `reports_schema.sql`. Covers the user report lifecycle:
> submit (`User_PostReport`), feed (`User_Home`), details + comments
> (`User_RepPostView`), and own-report list/edit/delete (`User_MyReports`).
> Admin safety posts in the same feed are stored in `admin_posts`.

## 1. Tables

| Table                | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `incident_categories`| Top-level incident categories (7, seeded from the forms)       |
| `incident_types`     | Incident types; each belongs to one category (unique pair)     |
| `reports`            | The core user incident report                                 |
| `report_images`      | 0..N photos per report (form caps at 3; feed shows 2)          |
| `report_comments`    | Comments; drives the detail view and the comment count         |
| `report_likes`       | One like per user per report; drives the like count            |
| `admin_posts`        | Admin/SuperAdmin safety posts (feed source "Admin")            |

## 2. `reports` columns

| Column             | Type            | Notes                                             |
| ------------------ | --------------- | ------------------------------------------------- |
| `id`               | `uuid` PK       |                                                   |
| `user_id`          | `uuid`          | → `auth.users`; set null if user deleted          |
| `incident_type_id` | `uuid`          | → `incident_types` (normalized category + type)   |
| `location`         | `text`          | Display text (auto-fetched)                       |
| `latitude`         | `double precision` | Geo point (auto-fetched)                      |
| `longitude`        | `double precision` | Geo point (auto-fetched)                      |
| `poster_name`      | `text`          | Reporter display name chosen at submit time       |
| `display_name_type`| `text`          | `Fullname` or `Username`                          |
| `details`          | `text`          | Incident description                              |
| `status`           | `text`          | Pending Review / Under Verification / Resolved / Rejected / Archived |
| `is_verified`      | `boolean`       | Verified flag                                     |
| `created_at`       | `timestamptz`   | Set on creation                                   |
| `updated_at`       | `timestamptz`   | Auto-refreshed                                    |

## 3. Why it is in 3NF

- **1NF:** every column holds a single atomic value.
- **2NF:** `id` is the only key; every non-key column depends on the whole `id`.
- **3NF:** no non-key column depends on another non-key column. The incident
  text (`incident_category` / `incident_type`) is split into lookup tables
  (`incident_types` → `incident_categories`) instead of being repeated per
  report. Like/comment counts are **derived** via `COUNT()`, not stored, so
  there are no redundant counters to keep in sync.

## 4. RLS

- Feed content (`reports`, `report_images`, `report_comments`, `report_likes`,
  `admin_posts`) is readable by all authenticated users.
- Users manage only their own reports, images, comments, and likes.
- Only `admin` / `super_admin` (checked via `profiles.role`) may create/update/
  delete `admin_posts`.
- Admin validation writes (verified_by, status) go through the service-role
  backend client, which bypasses RLS.

## 5. Key queries

- Feed rows with type/category text, reporter name, and counts — see the
  query at the top of `reports_schema.sql`.
- A user's own reports (`User_MyReports`):
  `select * from public.reports where user_id = auth.uid() order by created_at desc;`