import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Switch,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Admin_Layout from "../../components/Admin_Layout";
import Admin_AddAdmin from "../../components/modals/Admin_AddAdmin";
import Admin_EditAdminReq from "../../components/modals/SuperAdmin_EditReq";

const COLORS = {
  primary: "#294880",
  primarySoft: "#EAF2FF",
  primaryBorder: "#D9E2F0",
  text: "#2F4267",
  textMuted: "#5D6F92",
  white: "#FFFFFF",
  background: "#F5F8FC",
  surfaceSoft: "#F7F9FD",
  success: "#22A06B",
  successSoft: "#EAF8F1",
  danger: "#E45757",
  dangerSoft: "#FFF5F5",
  warning: "#C98A2E",
  warningSoft: "#FFF4E5",
};

function StatusBadge({ label, tone = "success" }) {
  const toneMap = {
    primary: {
      backgroundColor: COLORS.primarySoft,
      color: COLORS.primary,
    },
    success: {
      backgroundColor: COLORS.successSoft,
      color: COLORS.success,
    },
    warning: {
      backgroundColor: COLORS.warningSoft,
      color: COLORS.warning,
    },
    danger: {
      backgroundColor: COLORS.dangerSoft,
      color: COLORS.danger,
    },
  };

  const style = toneMap[tone] || toneMap.primary;

  return (
    <View style={[styles.statusBadge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.statusBadgeText, { color: style.color }]}>{label}</Text>
    </View>
  );
}

function SummaryCard({ icon, title, value, subtext, tone = "primary" }) {
  const iconBg =
    tone === "success"
      ? COLORS.successSoft
      : tone === "warning"
      ? COLORS.warningSoft
      : COLORS.primarySoft;

  const iconColor =
    tone === "success"
      ? COLORS.success
      : tone === "warning"
      ? COLORS.warning
      : COLORS.primary;

  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>

      <View style={styles.summaryTextWrap}>
        <Text style={styles.summaryTitle}>{title}</Text>

        <View style={styles.summaryValueRow}>
          <Text style={styles.summaryValue}>{value}</Text>
          <Text style={[styles.summarySubtext, { color: iconColor }]}>{subtext}</Text>
        </View>
      </View>
    </View>
  );
}

function SettingRow({ icon, title, description, rightContent, isLast = false }) {
  return (
    <View style={[styles.settingRow, !isLast && styles.settingRowBorder]}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIconWrap}>
          <Ionicons name={icon} size={18} color={COLORS.primary} />
        </View>

        <View style={styles.settingTextWrap}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>

      <View style={styles.settingRight}>{rightContent}</View>
    </View>
  );
}

function AdminRow({ admin, isLast, onEdit, onDelete }) {
  return (
    <View style={[styles.adminRow, !isLast && styles.adminRowBorder]}>
      <View style={styles.adminLeft}>
        <View style={styles.adminIconWrap}>
          <Ionicons name="person-circle-outline" size={24} color={COLORS.primary} />
        </View>

        <View style={styles.adminInfo}>
          <Text style={styles.adminName}>{admin.name}</Text>
          <Text style={styles.adminDetails}>
            {admin.role} • {admin.email}
          </Text>
          <Text style={styles.adminSubDetails}>{admin.department}</Text>
        </View>
      </View>

      <View style={styles.adminRight}>
        <StatusBadge label={admin.status} tone="success" />

        <View style={styles.rowActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(admin)}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={16} color={COLORS.primary} />
            <Text style={styles.editButtonText}>Edit Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(admin.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={17} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Admin_SuperSettings() {
  const [isAddAdminVisible, setIsAddAdminVisible] = useState(false);
  const [isEditRequestVisible, setIsEditRequestVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [autoMapVerified, setAutoMapVerified] = useState(true);
  const [aiCredibilityEnabled, setAiCredibilityEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [clusterOverlay, setClusterOverlay] = useState(true);
  const [heatmapOverlay, setHeatmapOverlay] = useState(true);

  const [highThreshold, setHighThreshold] = useState("85");
  const [mediumThreshold, setMediumThreshold] = useState("60");
  const [defaultMapZoom, setDefaultMapZoom] = useState("13");
  const [mapCenter, setMapCenter] = useState("Cebu City");
  const [modelVersion, setModelVersion] = useState("ARGUS-AI v4.3.01");
  const [apiEndpoint, setApiEndpoint] = useState("https://api.argus.local/v1");

  const [adminAccounts, setAdminAccounts] = useState([
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@argus.com",
      role: "Super Admin",
      department: "System Management",
      phone: "0912 345 6789",
      status: "Active",
    },
    {
      id: 2,
      name: "John Reyes",
      email: "john.reyes@argus.com",
      role: "Operations Admin",
      department: "Incident Operations",
      phone: "0923 456 7890",
      status: "Active",
    },
    {
      id: 3,
      name: "Carla Lim",
      email: "carla.lim@argus.com",
      role: "Validation Admin",
      department: "Report Validation",
      phone: "0934 567 8901",
      status: "Active",
    },
  ]);

  const incidentCategories = [
    "Public Safety Incidents",
    "Property-Related Incidents",
    "Traffic and Road Incidents",
    "Community and Environmental Concerns",
    "Suspicious Activities",
    "Public Assistance / Community Reports",
    "Cyber and Online Incidents",
  ];

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const handleOpenAddAdmin = () => {
    setIsAddAdminVisible(true);
  };

  const handleCloseAddAdmin = () => {
    setIsAddAdminVisible(false);
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
    };

    setAdminAccounts((prev) => [adminToAdd, ...prev]);
    setIsAddAdminVisible(false);

    showMessage("Admin Added", "New admin account has been added successfully.");
  };

  const handleOpenEditRequest = (admin) => {
    setSelectedAdmin(admin);
    setIsEditRequestVisible(true);
  };

  const handleCloseEditRequest = () => {
    setSelectedAdmin(null);
    setIsEditRequestVisible(false);
  };

  const handleSaveEditRequest = (updatedAdmin) => {
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

    showMessage(
      "Edit Request Saved",
      "The admin details edit request has been saved successfully."
    );
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

  const handleSaveSettings = () => {
    showMessage("Settings Saved", "System settings have been saved successfully.");
  };

  const handleResetSettings = () => {
    setAutoMapVerified(true);
    setAiCredibilityEnabled(true);
    setEmailNotifications(true);
    setPushNotifications(false);
    setClusterOverlay(true);
    setHeatmapOverlay(true);
    setHighThreshold("85");
    setMediumThreshold("60");
    setDefaultMapZoom("13");
    setMapCenter("Cebu City");
    setModelVersion("ARGUS-AI v4.3.01");
    setApiEndpoint("https://api.argus.local/v1");

    showMessage("Settings Reset", "Settings have been restored to default values.");
  };

  return (
    <Admin_Layout>
      <View style={styles.mainWrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrap}>
            <View style={styles.leftSection}>
              <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Super Admin Settings</Text>
                <Text style={styles.pageSubtitle}>
                  Manage admin accounts, AI rules, incident categories, map settings,
                  notifications, and API model configuration.
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <SummaryCard
                  icon="people-outline"
                  title="Admin Accounts"
                  value={adminAccounts.length}
                  subtext="Active users"
                />

                <SummaryCard
                  icon="hardware-chip-outline"
                  title="AI Rules"
                  value={aiCredibilityEnabled ? "Enabled" : "Off"}
                  subtext="Validation active"
                  tone="success"
                />

                <SummaryCard
                  icon="layers-outline"
                  title="Categories"
                  value={incidentCategories.length}
                  subtext="Configured groups"
                />

                <SummaryCard
                  icon="notifications-outline"
                  title="Notifications"
                  value={emailNotifications || pushNotifications ? "Live" : "Off"}
                  subtext="System alerts"
                  tone="warning"
                />
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>Admin Account Management</Text>
                    <Text style={styles.sectionDescription}>
                      Add admins, open edit request details, or delete admin accounts.
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={handleOpenAddAdmin}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="add" size={16} color={COLORS.white} />
                    <Text style={styles.primaryActionButtonText}>Add Admin</Text>
                  </TouchableOpacity>
                </View>

                {adminAccounts.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="people-outline" size={34} color={COLORS.textMuted} />
                    <Text style={styles.emptyTitle}>No admins available</Text>
                    <Text style={styles.emptyDescription}>
                      Click Add Admin to create a new admin account.
                    </Text>
                  </View>
                ) : (
                  adminAccounts.map((admin, index) => (
                    <AdminRow
                      key={admin.id}
                      admin={admin}
                      isLast={index === adminAccounts.length - 1}
                      onEdit={handleOpenEditRequest}
                      onDelete={handleDeleteAdmin}
                    />
                  ))
                )}
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>AI Threshold Configuration</Text>
                    <Text style={styles.sectionDescription}>
                      Configure AI credibility scoring for report validation.
                    </Text>
                  </View>

                  <StatusBadge
                    label={aiCredibilityEnabled ? "AI Enabled" : "AI Disabled"}
                    tone={aiCredibilityEnabled ? "success" : "danger"}
                  />
                </View>

                <SettingRow
                  icon="analytics-outline"
                  title="Enable AI Credibility Scoring"
                  description="Use AI to score credibility and support validation decisions."
                  rightContent={
                    <Switch
                      value={aiCredibilityEnabled}
                      onValueChange={setAiCredibilityEnabled}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={aiCredibilityEnabled ? COLORS.primary : COLORS.white}
                    />
                  }
                />

                <View style={styles.inputGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>High Credibility Threshold</Text>
                    <TextInput
                      value={highThreshold}
                      onChangeText={setHighThreshold}
                      style={styles.textInput}
                      keyboardType="numeric"
                      placeholder="85"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Medium Credibility Threshold</Text>
                    <TextInput
                      value={mediumThreshold}
                      onChangeText={setMediumThreshold}
                      style={styles.textInput}
                      keyboardType="numeric"
                      placeholder="60"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>Incident Category Management</Text>
                    <Text style={styles.sectionDescription}>
                      Manage the categories used for submitted incident reports.
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
                    <Text style={styles.secondaryButtonText}>Edit Categories</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.categoryList}>
                  {incidentCategories.map((category) => (
                    <View key={category} style={styles.categoryTag}>
                      <Text style={styles.categoryTagText}>{category}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>Map Settings</Text>
                    <Text style={styles.sectionDescription}>
                      Control how verified reports appear on the admin incident map.
                    </Text>
                  </View>

                  <StatusBadge label="Live Map" tone="primary" />
                </View>

                <SettingRow
                  icon="map-outline"
                  title="Auto-map verified reports"
                  description="Automatically place verified reports on the admin incident map."
                  rightContent={
                    <Switch
                      value={autoMapVerified}
                      onValueChange={setAutoMapVerified}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={autoMapVerified ? COLORS.primary : COLORS.white}
                    />
                  }
                />

                <SettingRow
                  icon="git-network-outline"
                  title="Show clustering overlay"
                  description="Display grouped incident patterns on the map."
                  rightContent={
                    <Switch
                      value={clusterOverlay}
                      onValueChange={setClusterOverlay}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={clusterOverlay ? COLORS.primary : COLORS.white}
                    />
                  }
                />

                <SettingRow
                  icon="flame-outline"
                  title="Show heatmap overlay"
                  description="Visualize high-density incident areas as heat zones."
                  isLast
                  rightContent={
                    <Switch
                      value={heatmapOverlay}
                      onValueChange={setHeatmapOverlay}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={heatmapOverlay ? COLORS.primary : COLORS.white}
                    />
                  }
                />

                <View style={styles.inputGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Default Map Zoom</Text>
                    <TextInput
                      value={defaultMapZoom}
                      onChangeText={setDefaultMapZoom}
                      style={styles.textInput}
                      keyboardType="numeric"
                      placeholder="13"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Default Map Center</Text>
                    <TextInput
                      value={mapCenter}
                      onChangeText={setMapCenter}
                      style={styles.textInput}
                      placeholder="Cebu City"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>Notification Preferences</Text>
                    <Text style={styles.sectionDescription}>
                      Configure system alerts and admin notification channels.
                    </Text>
                  </View>

                  <StatusBadge label="Configurable" tone="warning" />
                </View>

                <SettingRow
                  icon="mail-outline"
                  title="Email Notifications"
                  description="Send validation and system activity updates by email."
                  rightContent={
                    <Switch
                      value={emailNotifications}
                      onValueChange={setEmailNotifications}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={emailNotifications ? COLORS.primary : COLORS.white}
                    />
                  }
                />

                <SettingRow
                  icon="notifications-outline"
                  title="Push Notifications"
                  description="Receive in-app alerts for validation activity and system events."
                  isLast
                  rightContent={
                    <Switch
                      value={pushNotifications}
                      onValueChange={setPushNotifications}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={pushNotifications ? COLORS.primary : COLORS.white}
                    />
                  }
                />
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>API and Model Settings</Text>
                    <Text style={styles.sectionDescription}>
                      Manage model version and system API endpoint settings.
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    activeOpacity={0.85}
                    onPress={() =>
                      showMessage("Connection Test", "API connection test completed.")
                    }
                  >
                    <Text style={styles.secondaryButtonText}>Test Connection</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Model Version</Text>
                    <TextInput
                      value={modelVersion}
                      onChangeText={setModelVersion}
                      style={styles.textInput}
                      placeholder="ARGUS-AI v4.3.01"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>API Endpoint</Text>
                    <TextInput
                      value={apiEndpoint}
                      onChangeText={setApiEndpoint}
                      style={styles.textInput}
                      placeholder="https://api.argus.local/v1"
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.footerActions}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetSettings}
                  activeOpacity={0.85}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveSettings}
                  activeOpacity={0.85}
                >
                  <Ionicons name="save-outline" size={18} color={COLORS.white} />
                  <Text style={styles.saveButtonText}>Save Settings</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rightSection}>
              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Settings Overview</Text>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Admin Accounts</Text>
                  <Text style={styles.breakdownCount}>{adminAccounts.length}</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>AI Threshold Rules</Text>
                  <Text style={styles.breakdownCount}>2</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Incident Categories</Text>
                  <Text style={styles.breakdownCount}>{incidentCategories.length}</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Map Preferences</Text>
                  <Text style={styles.breakdownCount}>4</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Notifications</Text>
                  <Text style={styles.breakdownCount}>2</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>API / Model Fields</Text>
                  <Text style={styles.breakdownCount}>2</Text>
                </View>
              </View>

              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Configuration Notes</Text>

                <View style={styles.notesContent}>
                  <Text style={styles.notesHeading}>Functions</Text>
                  <Text style={styles.notesText}>
                    • Manage admin accounts{"\n"}
                    • Configure AI thresholds{"\n"}
                    • Manage incident categories{"\n"}
                    • Change map settings{"\n"}
                    • Notification preferences{"\n"}
                    • API or model settings
                  </Text>

                  <Text style={[styles.notesHeading, styles.notesHeadingSpacing]}>
                    Reminder
                  </Text>
                  <Text style={styles.notesText}>
                    Settings control the behavior of the admin system, so changes should
                    only be saved by authorized administrators.
                  </Text>
                </View>
              </View>

              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Admin Edit Request</Text>

                <View style={styles.notesContent}>
                  <Text style={styles.notesText}>
                    Click Edit Request in the admin list to open the selected admin details.
                    You can update name, email, role, department, and phone number.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <Admin_AddAdmin
          visible={isAddAdminVisible}
          onClose={handleCloseAddAdmin}
          onSubmit={handleAddAdmin}
        />

        <Admin_EditAdminReq
          visible={isEditRequestVisible}
          admin={selectedAdmin}
          onClose={handleCloseEditRequest}
          onSave={handleSaveEditRequest}
        />
      </View>
    </Admin_Layout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  contentWrap: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
  },

  leftSection: {
    flex: 1,
    minWidth: 0,
  },

  rightSection: {
    width: 300,
    gap: 14,
  },

  pageHeader: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },

  pageTitle: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "800",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 21,
  },

  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 16,
  },

  summaryCard: {
    flex: 1,
    minWidth: 210,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  summaryTextWrap: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: "500",
  },

  summaryValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },

  summaryValue: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
  },

  summarySubtext: {
    fontSize: 13,
    fontWeight: "600",
  },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },

  sectionHeader: {
    minHeight: 72,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surfaceSoft,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionHeaderText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 19,
  },

  primaryActionButton: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  primaryActionButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  adminRow: {
    minHeight: 92,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: COLORS.white,
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

  adminIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  adminInfo: {
    flex: 1,
    minWidth: 0,
  },

  adminName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  adminDetails: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },

  adminSubDetails: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  adminRight: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },

  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  editButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  editButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.dangerSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyState: {
    paddingVertical: 34,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 4,
  },

  emptyDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 19,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  statusBadgeText: {
    fontWeight: "700",
    fontSize: 12,
  },

  settingRow: {
    minHeight: 76,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: COLORS.white,
  },

  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
  },

  settingLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  settingIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingTextWrap: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  settingDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 19,
  },

  settingRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  inputGrid: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
    padding: 20,
  },

  inputCard: {
    flex: 1,
    minWidth: 240,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 20,
  },

  categoryTag: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
  },

  categoryTagText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  footerActions: {
    marginTop: 4,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  resetButton: {
    height: 46,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  resetButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },

  saveButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  sideCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 14,
    overflow: "hidden",
  },

  sideCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    backgroundColor: COLORS.surfaceSoft,
  },

  breakdownRow: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  breakdownText: {
    color: COLORS.text,
    fontSize: 13,
    flex: 1,
    marginRight: 12,
  },

  breakdownCount: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 14,
  },

  notesContent: {
    padding: 18,
  },

  notesHeading: {
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 8,
  },

  notesHeadingSpacing: {
    marginTop: 14,
  },

  notesText: {
    color: COLORS.textMuted,
    lineHeight: 21,
    fontSize: 13,
  },
});