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
import { useFonts } from "expo-font";

import SAdmin_Layout from "../../components/SAdmin_Compo/SAdmin_Layout";

function StatusBadge({ label, tone = "primary" }) {
  const toneMap = {
    primary: {
      backgroundColor: "#EAF2FF",
      color: "#294880",
    },
    success: {
      backgroundColor: "#EAF8F1",
      color: "#22A06B",
    },
    warning: {
      backgroundColor: "#FFF4E5",
      color: "#C98A2E",
    },
    danger: {
      backgroundColor: "#FFF5F5",
      color: "#E45757",
    },
  };

  const style = toneMap[tone] || toneMap.primary;

  return (
    <View style={[styles.statusBadge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.statusBadgeText, { color: style.color }]}>
        {label}
      </Text>
    </View>
  );
}

function SummaryCard({ icon, title, value, subtext, tone = "primary" }) {
  const iconBg =
    tone === "success"
      ? "#EAF8F1"
      : tone === "warning"
      ? "#FFF4E5"
      : tone === "danger"
      ? "#FFF5F5"
      : "#EAF2FF";

  const iconColor =
    tone === "success"
      ? "#22A06B"
      : tone === "warning"
      ? "#C98A2E"
      : tone === "danger"
      ? "#E45757"
      : "#294880";

  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>

      <View style={styles.summaryTextWrap}>
        <Text style={styles.summaryTitle}>{title}</Text>

        <View style={styles.summaryValueRow}>
          <Text style={styles.summaryValue}>{value}</Text>
          <Text style={[styles.summarySubtext, { color: iconColor }]}>
            {subtext}
          </Text>
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
          <Ionicons name={icon} size={18} color="#294880" />
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

export default function SAdmin_Settings() {
  const [fullName, setFullName] = useState("ARGUS SuperAdmin");
  const [emailAddress, setEmailAddress] = useState("superadmin@argus.com");
  const [phoneNumber, setPhoneNumber] = useState("0912 345 6789");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [autoMapVerified, setAutoMapVerified] = useState(true);
  const [aiCredibilityEnabled, setAiCredibilityEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [clusterOverlay, setClusterOverlay] = useState(true);
  const [heatmapOverlay, setHeatmapOverlay] = useState(true);

  const [highThreshold, setHighThreshold] = useState("85");
  const [mediumThreshold, setMediumThreshold] = useState("60");
  const [defaultMapZoom, setDefaultMapZoom] = useState("13");
  const [mapCenter, setMapCenter] = useState("Argao, Cebu");
  const [modelVersion, setModelVersion] = useState("ARGUS-AI v4.3.01");
  const [apiEndpoint, setApiEndpoint] = useState("https://api.argus.local/v1");

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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

  const handleSaveProfile = () => {
    if (!fullName.trim() || !emailAddress.trim() || !phoneNumber.trim()) {
      showMessage("Missing Information", "Please fill in all profile fields.");
      return;
    }

    if (!emailAddress.includes("@")) {
      showMessage("Invalid Email", "Please enter a valid email address.");
      return;
    }

    globalThis.adminAccount = {
      ...(globalThis.adminAccount || {}),
      fullName: fullName.trim(),
      email: emailAddress.trim().toLowerCase(),
      phone: phoneNumber.trim(),
      role: "SuperAdmin",
    };

    showMessage(
      "Profile Updated",
      "Your SuperAdmin profile information has been updated."
    );
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showMessage("Missing Password", "Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      showMessage("Weak Password", "New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showMessage(
        "Password Mismatch",
        "New password and confirm password do not match."
      );
      return;
    }

    globalThis.adminAccount = {
      ...(globalThis.adminAccount || {}),
      password: newPassword,
    };

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    showMessage("Password Updated", "Your SuperAdmin password has been changed.");
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
    setMapCenter("Argao, Cebu");
    setModelVersion("ARGUS-AI v4.3.01");
    setApiEndpoint("https://api.argus.local/v1");

    showMessage(
      "Settings Reset",
      "System settings have been restored to default values."
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
          <View style={styles.contentWrap}>
            <View style={styles.leftSection}>
              <View style={styles.summaryRow}>
                <SummaryCard
                  icon="person-circle-outline"
                  title="Profile"
                  value="Active"
                  subtext="SuperAdmin"
                />

                <SummaryCard
                  icon="hardware-chip-outline"
                  title="AI Rules"
                  value={aiCredibilityEnabled ? "Enabled" : "Off"}
                  subtext="Validation"
                  tone="success"
                />

                <SummaryCard
                  icon="map-outline"
                  title="Map Scope"
                  value="Argao"
                  subtext="Cebu"
                />

                <SummaryCard
                  icon="notifications-outline"
                  title="Alerts"
                  value={emailNotifications || pushNotifications ? "Live" : "Off"}
                  subtext="System"
                  tone="warning"
                />
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>
                      SuperAdmin Profile Settings
                    </Text>
                    <Text style={styles.sectionDescription}>
                      Update your own SuperAdmin name, email address, and phone
                      number.
                    </Text>
                  </View>

                  <StatusBadge label="Account Owner" tone="primary" />
                </View>

                <View style={styles.profileGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      style={styles.textInput}
                      placeholder="Full Name"
                      placeholderTextColor="#5D6F92"
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                      style={styles.textInput}
                      placeholder="Email Address"
                      placeholderTextColor="#5D6F92"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      style={styles.textInput}
                      placeholder="Phone Number"
                      placeholderTextColor="#5D6F92"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.profileActionRow}>
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={handleSaveProfile}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="save-outline" size={17} color="#FFFFFF" />
                    <Text style={styles.primaryActionButtonText}>
                      Save Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>Change Password</Text>
                    <Text style={styles.sectionDescription}>
                      Update your SuperAdmin password for account security.
                    </Text>
                  </View>

                  <StatusBadge label="Secure" tone="success" />
                </View>

                <View style={styles.profileGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Current Password</Text>

                    <View style={styles.passwordInputWrap}>
                      <TextInput
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        style={styles.passwordInput}
                        placeholder="Current Password"
                        placeholderTextColor="#5D6F92"
                        secureTextEntry={!showCurrentPassword}
                      />

                      <TouchableOpacity
                        onPress={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={
                            showCurrentPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color="#5D6F92"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>New Password</Text>

                    <View style={styles.passwordInputWrap}>
                      <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.passwordInput}
                        placeholder="New Password"
                        placeholderTextColor="#5D6F92"
                        secureTextEntry={!showNewPassword}
                      />

                      <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                          size={20}
                          color="#5D6F92"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>

                    <View style={styles.passwordInputWrap}>
                      <TextInput
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        style={styles.passwordInput}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#5D6F92"
                        secureTextEntry={!showConfirmNewPassword}
                      />

                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={
                            showConfirmNewPassword
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={20}
                          color="#5D6F92"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.profileActionRow}>
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={handleChangePassword}
                    activeOpacity={0.85}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={17}
                      color="#FFFFFF"
                    />
                    <Text style={styles.primaryActionButtonText}>
                      Update Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>
                      AI Threshold Configuration
                    </Text>
                    <Text style={styles.sectionDescription}>
                      Configure AI credibility scoring used during report
                      validation.
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
                      thumbColor={aiCredibilityEnabled ? "#294880" : "#FFFFFF"}
                    />
                  }
                />

                <View style={styles.inputGrid}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>
                      High Credibility Threshold
                    </Text>
                    <TextInput
                      value={highThreshold}
                      onChangeText={setHighThreshold}
                      style={styles.textInput}
                      keyboardType="numeric"
                      placeholder="85"
                      placeholderTextColor="#5D6F92"
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>
                      Medium Credibility Threshold
                    </Text>
                    <TextInput
                      value={mediumThreshold}
                      onChangeText={setMediumThreshold}
                      style={styles.textInput}
                      keyboardType="numeric"
                      placeholder="60"
                      placeholderTextColor="#5D6F92"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>
                      Incident Category Management
                    </Text>
                    <Text style={styles.sectionDescription}>
                      Review the category groups used for submitted incident
                      reports.
                    </Text>
                  </View>

                  <StatusBadge label={`${incidentCategories.length} Categories`} />
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
                      Control how verified reports appear on the Argao incident
                      map.
                    </Text>
                  </View>

                  <StatusBadge label="Argao Map" tone="primary" />
                </View>

                <SettingRow
                  icon="map-outline"
                  title="Auto-map verified reports"
                  description="Automatically display verified reports on the incident map."
                  rightContent={
                    <Switch
                      value={autoMapVerified}
                      onValueChange={setAutoMapVerified}
                      trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                      thumbColor={autoMapVerified ? "#294880" : "#FFFFFF"}
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
                      thumbColor={clusterOverlay ? "#294880" : "#FFFFFF"}
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
                      thumbColor={heatmapOverlay ? "#294880" : "#FFFFFF"}
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
                      placeholderTextColor="#5D6F92"
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Default Map Center</Text>
                    <TextInput
                      value={mapCenter}
                      onChangeText={setMapCenter}
                      style={styles.textInput}
                      placeholder="Argao, Cebu"
                      placeholderTextColor="#5D6F92"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>
                      Notification Preferences
                    </Text>
                    <Text style={styles.sectionDescription}>
                      Configure SuperAdmin system alerts and notification channels.
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
                      thumbColor={emailNotifications ? "#294880" : "#FFFFFF"}
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
                      thumbColor={pushNotifications ? "#294880" : "#FFFFFF"}
                    />
                  }
                />
              </View>

              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionHeaderText}>
                    <Text style={styles.sectionTitle}>
                      API and Model Settings
                    </Text>
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
                    <Text style={styles.secondaryButtonText}>
                      Test Connection
                    </Text>
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
                      placeholderTextColor="#5D6F92"
                    />
                  </View>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>API Endpoint</Text>
                    <TextInput
                      value={apiEndpoint}
                      onChangeText={setApiEndpoint}
                      style={styles.textInput}
                      placeholder="https://api.argus.local/v1"
                      placeholderTextColor="#5D6F92"
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
                  <Text style={styles.resetButtonText}>
                    Reset System Settings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveSettings}
                  activeOpacity={0.85}
                >
                  <Ionicons name="save-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>
                    Save System Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rightSection}>
              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Settings Overview</Text>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Profile Settings</Text>
                  <Text style={styles.breakdownCount}>3</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Password Fields</Text>
                  <Text style={styles.breakdownCount}>3</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>AI Threshold Rules</Text>
                  <Text style={styles.breakdownCount}>2</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Incident Categories</Text>
                  <Text style={styles.breakdownCount}>
                    {incidentCategories.length}
                  </Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Map Preferences</Text>
                  <Text style={styles.breakdownCount}>4</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownText}>Notifications</Text>
                  <Text style={styles.breakdownCount}>2</Text>
                </View>
              </View>

              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Configuration Notes</Text>

                <View style={styles.notesContent}>
                  <Text style={styles.notesHeading}>This page is for</Text>
                  <Text style={styles.notesText}>
                    • SuperAdmin own profile{"\n"}
                    • Change own password{"\n"}
                    • Configure AI thresholds{"\n"}
                    • Review incident categories{"\n"}
                    • Change map settings{"\n"}
                    • Notification preferences{"\n"}
                    • API or model settings
                  </Text>

                  <Text style={[styles.notesHeading, styles.notesHeadingSpacing]}>
                    Not included here
                  </Text>
                  <Text style={styles.notesText}>
                    Admin account listing, adding, editing, and deleting should be
                    handled in the Admin Accounts page to avoid duplicate sections.
                  </Text>
                </View>
              </View>

              <View style={styles.sideCard}>
                <Text style={styles.sideCardTitle}>Security Reminder</Text>

                <View style={styles.notesContent}>
                  <Text style={styles.notesText}>
                    Password changes should be verified before saving. In the final
                    backend version, the current password should be checked against
                    the database before allowing updates.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },

  pageTitle: {
    fontSize: 24,
    color: "#294880",
    fontFamily: "PoppinsSemiBold",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#5D6F92",
    fontFamily: "PoppinsRegular",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
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
    color: "#5D6F92",
    marginBottom: 6,
    fontFamily: "PoppinsMedium",
  },

  summaryValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },

  summaryValue: {
    fontSize: 21,
    fontFamily: "PoppinsSemiBold",
    color: "#2F4267",
  },

  summarySubtext: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },

  sectionHeader: {
    minHeight: 72,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#F7F9FD",
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
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    lineHeight: 19,
  },

  profileGrid: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
    padding: 20,
    paddingBottom: 10,
  },

  profileActionRow: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  primaryActionButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  primaryActionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "PoppinsMedium",
  },

  secondaryButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#294880",
    fontSize: 13,
    fontFamily: "PoppinsMedium",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  statusBadgeText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },

  settingRow: {
    minHeight: 76,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingTextWrap: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#2F4267",
    marginBottom: 4,
  },

  settingDescription: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
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
    fontFamily: "PoppinsMedium",
    color: "#2F4267",
    marginBottom: 8,
  },

  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 12,
    backgroundColor: "#F7F9FD",
    paddingHorizontal: 14,
    color: "#2F4267",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  passwordInputWrap: {
    height: 44,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 12,
    backgroundColor: "#F7F9FD",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#2F4267",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
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
    backgroundColor: "#EAF2FF",
  },

  categoryTagText: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#294880",
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
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  resetButtonText: {
    color: "#2F4267",
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  saveButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },

  sideCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    overflow: "hidden",
  },

  sideCardTitle: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
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
    color: "#2F4267",
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    flex: 1,
    marginRight: 12,
  },

  breakdownCount: {
    color: "#294880",
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },

  notesContent: {
    padding: 18,
  },

  notesHeading: {
    color: "#2F4267",
    fontFamily: "PoppinsMedium",
    marginBottom: 8,
  },

  notesHeadingSpacing: {
    marginTop: 14,
  },

  notesText: {
    color: "#5D6F92",
    lineHeight: 21,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
  },
});