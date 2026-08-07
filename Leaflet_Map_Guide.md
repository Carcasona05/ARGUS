# ARGUS — Leaflet Map Guide

This guide explains how to call the **Leaflet** map API, and how to make the map
(1) start centered on the user's **current location** and (2) **follow** the user
as they move.

---

## 1. The important packaging note for THIS project

Your app is an **Expo / React Native** app. `User_Map.jsx` and `MapView.jsx` use
React Native `<View>`s, not a browser DOM.

**Leaflet is a browser (DOM) library.** It can only run on the **web** target of
your app (`npx expo start --web`). It cannot render inside a React Native native
view on Android/iOS.

So you have two real options:

| Target              | Recommended library                                       |
| ------------------- | --------------------------------------------------------- |
| Web (Expo web)      | **Leaflet** directly, or `react-leaflet` wrapper          |
| Android / iOS native| **`react-native-maps`** (`react-native-maps-directions` etc.) |

This guide teaches **Leaflet** (web). The "current location + follow" concepts at
the bottom apply to both; the code differs only in the map object API.

---

## 2. Getting Leaflet (CDN — best for web)

Add the CSS + JS in `public/index.html` (Expo web) or your app's HTML shell:

```html
<!-- In the <head> -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>

<!-- Before your app script -->
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""
></script>
```

> The `integrity` hashes let the browser verify the file. If you change the
> version, regenerate the hashes from https://unpkg.com or drop them.

---

## 3. The core Leaflet API calls

### 3.1 Create a map

`L.map(id, options)` needs a DOM element. In React on web you give it a `<div>`
with `ref`/`id`:

```js
// createMap.js
export function createMap(divId, { latitude, longitude, zoom = 14 }) {
  const map = L.map(divId, {
    center: [latitude, longitude], // [lat, lng] — Leaflet is lat-first!
    zoom,
  });

  // Add OpenStreetMap tiles (required or you get an empty grey box)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  return map;
}
```

> **CRITICAL ORDERING:** Leaflet coordinates are **[latitude, longitude]**.
> Your `User_PostReport.jsx` stores `latitude` and `longitude` — pass them as
> `[lat, lng]`, **not** `[lng, lat]`.

### 3.2 Add a marker at the user's location

```js
const marker = L.marker([lat, lng]).addTo(map);
marker.bindPopup("You are here").openPopup();
```

### 3.3 Set/pan the view

```js
map.setView([lat, lng], 15);          // jump (center) + zoom
map.panTo([lat, lng]);                // animate center, keep zoom
map.flyTo([lat, lng], 15);            // animated fly (nice for follow)
```

### 3.4 Add circles / heat zones / custom icons

```js
L.circle([lat, lng], {
  radius: 500,            // meters
  color: "#E45757",
  fillColor: "#E45757",
  fillOpacity: 0.2,
}).addTo(map);
```

---

## 4. Getting the user's location

The browser lets you read real GPS position. There are two calls:

| Call                 | Behavior                          |
| -------------------- | --------------------------------- |
| `getCurrentPosition` | Get the position **once**         |
| `watchPosition`      | Keep firing as the user moves **important for FOLLOW** |

```js
// browser geolocation (web)
if (!navigator.geolocation) {
  console.error("Geolocation not supported");
  return;
}

// 1) initial position
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 14);
    userMarker.setLatLng([latitude, longitude]);
  },
  (err) => console.error("Location error:", err.message),
  { enableHighAccuracy: true, timeout: 10000 }
);
```

---

## 5. Make it FOLLOW the user (the core of your question)

"Follow" = keep the map centered on the user as they move. The recipe has three
parts:

1. **Start centered on current location** (a one-time call).
2. **Watch position continuously** (`watchPosition`).
3. **Keep panning** to the new position **only if "follow" is on**.

```js
let followUser = true;          // toggled by a "re-center" button
const userMarker = L.marker([0, 0]).addTo(map);

function startFollow() {
  // initial positioning
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const ll = [pos.coords.latitude, pos.coords.longitude];
      userMarker.setLatLng(ll);
      if (follow) map.setView(ll, 14);
    },
    (err) => console.error(err.message),
    { enableHighAccuracy: true }
  );

  // follow: re-center whenever the user moves
  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const ll = [pos.coords.latitude, pos.coords.longitude];
      userMarker.setLatLng(ll);
      if (follow) map.panTo(ll, { animate: true });
    },
    (err) => console.error(err.message),
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
  );

  // store watchId if you later want to stop following:
  // navigator.geolocation.clearWatch(watchId);
}
```

A common UI is a **crosshair/recenter** button that sets `follow = true` and pans
to the user again. If the user drags the map around, they can set `follow = false`.

---

## 6. In React — the react-leaflet version (cleaner for web)

Install:

```bash
npm install leaflet react-leaflet
# and the types if you use TS
npm install -D @types/leaflet
```

Make a `LocateMap.jsx`:

```jsx
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Child component that listens for location once the map mounts
function LocationController() {
  const map = useMap();
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (p) => setPos([p.coords.latitude, p.coords.longitude]),
      (err) => console.error(err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (pos) map.setView(pos, 14);
  }, [pos, map]);

  // FOLLOW: watchPosition re-centers continuously
  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      (p) => {
        const ll = [p.coords.latitude, p.coords.longitude];
        setPos(ll);
      },
      (err) => console.error(err.message),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watch); // cleanup
  }, []);

  if (!pos) return null;
  return <Marker position={pos} />;
}

export default function LocateMap() {
  return (
    <MapContainer center={[10.3145, 123.3067]} zoom={13} style={{ height: 500 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationController />
    </MapContainer>
  );
}
```

### React Native equivalent (native apps)

For Android/iOS use `react-native-maps` (not Leaflet):

```bash
npx expo install react-native-maps
npx expo install expo-location
```

```jsx
import MapView, { Marker } from "react-native-maps";
```

getting the current position the same way your `User_PostReport.jsx` already
does:

```js
const { status } = await Location.requestForegroundPermissionsAsync();
const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
const { latitude, longitude } = current.coords;
```

and `<MapView region={{ latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }} />`.

---

## 7. How this maps to YOUR code

- `MapView.jsx` is a **placeholder** — replace its body:
  - **Web:** render `<div id="argus-map">` and import the Leaflet scripts, then
    call `createMap("argus-map", { center })`.
  - **Native:** use `<MapView>` from `react-native-maps`.
- `User_Map.jsx` calls `<MapView style={styles.map} />` and renders the "user
  location" dot at hard-coded `top`/`left`. Replace those hard-coded values with
  the **real GPS coordinates** you already store in `User_PostReport`.
- The toggle "follow" can be wired to the blue re-center button already in the UI.

### Quick checklist for "start at my location + follow"

1. Request location permission (user gesture / on mount).
2. `getCurrentPosition` once → `map.setView([lat, lng], 14)` → place user marker.
3. `watchPosition` → on each update, move the marker and `map.panTo`/`setView`.
4. Keep `follow` flag; re-enable on button tap.

---

## 6. Common pitfalls

- **Lat/Lng order:** Leaflet and react-native-maps use `[latitude, longitude]`.
- **Missing tiles:** you must add at least one `TileLayer`, or the map is blank.
- **Marker vs popup on first load:** the marker may exist before tiles load;
  call `map.invalidateSize()` if the container resizes (e.g., modal opens).
- **Battery:** `watchPosition` with `enableHighAccuracy:true` drains battery;
  consider throttling or clearing the watch when following is disabled.
- **Web vs native:** Leaflet only on web; use `react-native-maps` on Android/iOS.