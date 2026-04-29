import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SAdmin_Layout from "../../components/SAdmin_Compo/SAdmin_Layout";
import Admin_AddAdmin from "../../components/modals/Admin_AddAdmin";
import Admin_EditAdminReq from "../../components/modals/SuperAdmin_EditReq";

function StatusBadge({ label }) {
  const isActive = label === "Active";
  const isPending = label === "Pending";

  return (
    <View
      style={[
        styles.statusBadge,
        isActive && styles.activeBadge,
        isPending && styles.pendingBadge,
        !isActive && !isPending && styles.disabledBadge,
      ]}
    >
      <Text
        style={[
          styles.statusBadgeText,
          isActive && styles.activeBadgeText,
          isPending && styles.pendingBadgeText,
          !isActive && !isPending && styles.disabledBadgeText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function AdminAccountRow({ admin, isLast, onEdit, onDelete, onToggleStatus }) {
  return (
    <View style={[styles.adminRow, !isLast && styles.adminRowBorder]}>
      <View style={styles.adminLeft}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>
            {admin.name
              .split(" ")
              .map((item) => item[0])
              .join("")
              .slice(0, 2)}
          </Text>
        </View>

        <View style={styles.adminInfo}>
          <Text style={styles.adminName}>{admin.name}</Text>
          <Text style={styles.adminEmail}>{admin.email}</Text>

          <View style={styles.adminMetaRow}>
            <Text style={styles.adminMeta}>{admin.role}</Text>
            <Text style={styles.adminDot}>•</Text>
            <Text style={styles.adminMeta}>{admin.department}</Text>
          </View>
        </View>
      </View>

      <View style={styles.adminRight}>
        <StatusBadge label={admin.status} />

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => onToggleStatus(admin.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={admin.status === "Active" ? "pause-outline" : "checkmark-outline"}
              size={16}
              color="#294880"
            />
            <Text style={styles.smallButtonText}>
              {admin.status === "Active" ? "Disable" : "Activate"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onEdit(admin)}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={17} color="#294880" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(admin.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={17} color="#E45757" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function SAdmin_AdminAccounts() {
  const [searchText, setSearchText] = useState("");
  const [isAddAdminVisible, setIsAddAdminVisible] = useState(false);
  const [isEditRequestVisible, setIsEditRequestVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [adminAccounts, setAdminAccounts] = useState([
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@argus.com",
      role: "Super Admin",
      department: "System Management",
      phone: "0912 345 6789",
      status: "Active",
      createdAt: "Apr 20, 2026",
    },
    {
      id: 2,
      name: "John Reyes",
      email: "john.reyes@argus.com",
      role: "Operations Admin",
      department: "Incident Operations",
      phone: "0923 456 7890",
      status: "Active",
      createdAt: "Apr 22, 2026",
    },
    {
      id: 3,
      name: "Carla Lim",
      email: "carla.lim@argus.com",
      role: "Validation Admin",
      department: "Report Validation",
      phone: "0934 567 8901",
      status: "Active",
      createdAt: "Apr 25, 2026",
    },
    {
      id: 4,
      name: "Ramon Cruz",
      email: "ramon.cruz@argus.com",
      role: "Map Admin",
      department: "Mapping and Verification",
      phone: "0945 678 9012",
      status: "Disabled",
      createdAt: "Apr 26, 2026",
    },
  ]);

  const filteredAdmins = adminAccounts.filter((admin) => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query) ||
      admin.department.toLowerCase().includes(query) ||
      admin.status.toLowerCase().includes(query)
    );
  });

  const activeCount = adminAccounts.filter((admin) => admin.status === "Active").length;
  const disabledCount = adminAccounts.filter(
    (admin) => admin.status === "Disabled"
  ).length;
  const superAdminCount = adminAccounts.filter((admin) =>
    admin.role.toLowerCase().includes("super")
  ).length;

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const handleAddAdmin = (newAdmin) => {
    const adminToAdd = {
      id: Date.now(),
      name: newAdmin?.name || newAdmin?.fullName || "New Admin",
      email: newAdmin?.email || "new.admin@argus.com",
      role: newAdmin?.role || "Admin",
      department: newAdmin?.department || "Admin Department",
      phone: newAdmin?.phone || "Not provided",
      status: "Active",
      createdAt: "Today",
    };

    setAdminAccounts((prev) => [adminToAdd, ...prev]);
    setIsAddAdminVisible(false);
    showMessage("Admin Added", "New admin account has been added successfully.");
  };

  const handleOpenEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditRequestVisible(true);
  };

  const handleSaveEdit = (updatedAdmin) => {
    setAdminAccounts((prev) =>
      prev.map((admin) =>
        admin.id === updatedAdmin.id
          ? {
              ...admin,
              ...updatedAdmin,
            }
          : admin
      )
    );

    setSelectedAdmin(null);
    setIsEditRequestVisible(false);
    showMessage("Edit Request Saved", "The admin account was updated successfully.");
  };

  const handleDeleteAdmin = (adminId) => {
    const deleteAction = () => {
      setAdminAccounts((prev) => prev.filter((admin) => admin.id !== adminId));
      showMessage("Admin Deleted", "The admin account has been removed.");
    };

    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete this admin?");

      if (confirmed) {
        deleteAction();
      }

      return;
    }

    Alert.alert("Delete Admin", "Are you sure you want to delete this admin?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteAction,
      },
    ]);
  };

  const handleToggleStatus = (adminId) => {
    setAdminAccounts((prev) =>
      prev.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              status: admin.status === "Active" ? "Disabled" : "Active",
            }
          : admin
      )
    );
  };

  return (
    <SAdmin_Layout>
      <View style={styles.mainWrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageHeader}>
            

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddAdminVisible(true)}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Admin</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconBox}>
                <Ionicons name="people-outline" size={24} color="#294880" />
              </View>
              <View>
                <Text style={styles.summaryValue}>{adminAccounts.length}</Text>
                <Text style={styles.summaryLabel}>Total Accounts</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.successIconBox}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#22A06B" />
              </View>
              <View>
                <Text style={styles.summaryValue}>{activeCount}</Text>
                <Text style={styles.summaryLabel}>Active Admins</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.warningIconBox}>
                <Ionicons name="star-outline" size={24} color="#C98A2E" />
              </View>
              <View>
                <Text style={styles.summaryValue}>{superAdminCount}</Text>
                <Text style={styles.summaryLabel}>SuperAdmins</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.dangerIconBox}>
                <Ionicons name="person-remove-outline" size={24} color="#E45757" />
              </View>
              <View>
                <Text style={styles.summaryValue}>{disabledCount}</Text>
                <Text style={styles.summaryLabel}>Disabled</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <View>
                <Text style={styles.sectionTitle}>Account List</Text>
                <Text style={styles.sectionSubtitle}>
                  Search, edit, disable, or delete admin accounts.
                </Text>
              </View>

              <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={18} color="#5D6F92" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search admin..."
                  placeholderTextColor="#8A98B3"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </View>

            {filteredAdmins.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={38} color="#5D6F92" />
                <Text style={styles.emptyTitle}>No admin found</Text>
                <Text style={styles.emptyText}>
                  Try searching with another name, email, role, or status.
                </Text>
              </View>
            ) : (
              filteredAdmins.map((admin, index) => (
                <AdminAccountRow
                  key={admin.id}
                  admin={admin}
                  isLast={index === filteredAdmins.length - 1}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeleteAdmin}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
          </View>
        </ScrollView>

        <Admin_AddAdmin
          visible={isAddAdminVisible}
          onClose={() => setIsAddAdminVisible(false)}
          onSubmit={handleAddAdmin}
        />

        <Admin_EditAdminReq
          visible={isEditRequestVisible}
          admin={selectedAdmin}
          onClose={() => {
            setSelectedAdmin(null);
            setIsEditRequestVisible(false);
          }}
          onSave={handleSaveEdit}
        />
      </View>
    </SAdmin_Layout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  pageHeader: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  pageTitle: {
    fontSize: 24,
    color: "#294880",
    fontWeight: "800",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#5D6F92",
    lineHeight: 21,
    maxWidth: 720,
  },

  addButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 16,
  },

  summaryCard: {
    flex: 1,
    minWidth: 210,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  successIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF8F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  warningIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF4E5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  dangerIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2F4267",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#5D6F92",
    marginTop: 4,
  },

  tableCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    overflow: "hidden",
  },

  tableHeader: {
    minHeight: 78,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#5D6F92",
  },

  searchBox: {
    width: 260,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    fontSize: 14,
    color: "#294880",
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  adminRow: {
    minHeight: 96,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  adminRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
  },

  adminLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  avatarBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  adminInfo: {
    flex: 1,
    minWidth: 0,
  },

  adminName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2F4267",
    marginBottom: 4,
  },

  adminEmail: {
    fontSize: 13,
    color: "#5D6F92",
    marginBottom: 5,
  },

  adminMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },

  adminMeta: {
    fontSize: 12,
    color: "#5D6F92",
  },

  adminDot: {
    fontSize: 12,
    color: "#8A98B3",
  },

  adminRight: {
    alignItems: "flex-end",
    gap: 10,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  statusBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },

  activeBadge: {
    backgroundColor: "#EAF8F1",
  },

  activeBadgeText: {
    color: "#22A06B",
  },

  pendingBadge: {
    backgroundColor: "#FFF4E5",
  },

  pendingBadgeText: {
    color: "#C98A2E",
  },

  disabledBadge: {
    backgroundColor: "#FFF5F5",
  },

  disabledBadgeText: {
    color: "#E45757",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  smallButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  smallButtonText: {
    color: "#294880",
    fontSize: 12,
    fontWeight: "700",
  },

  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyState: {
    paddingVertical: 44,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2F4267",
    marginTop: 10,
    marginBottom: 4,
  },

  emptyText: {
    fontSize: 13,
    color: "#5D6F92",
    textAlign: "center",
  },
});