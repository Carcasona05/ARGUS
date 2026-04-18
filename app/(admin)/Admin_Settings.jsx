import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Admin_Layout from "../../components/Admin_Layout";

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
  pendingSoft: "#EEF3FB",
};

function StatusBadge({ label, tone = "primary" }) {
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
  };

  const style = toneMap[tone] || toneMap.primary;

  return (
    <View style={[styles.statusBadge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.statusBadgeText, { color: style.color }]}>{label}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  description,
  rightContent,
  isLast = false,
}) {
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

export default function Admin_Settings() {
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

  const summaryCards = [
    {
      title: "Admin Accounts",
      value: "5",
      subtext: "Active users",
      icon: "people-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "AI Rules",
      value: "Enabled",
      subtext: "Validation active",
      icon: "hardware-chip-outline",
      iconBg: COLORS.successSoft,
      iconColor: COLORS.success,
      subColor: COLORS.success,
    },
    {
      title: "Categories",
      value: "7",
      subtext: "Configured groups",
      icon: "layers-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "Notifications",
      value: "Live",
      subtext: "System alerts on",
      icon: "notifications-outline",
      iconBg: COLORS.warningSoft,
      iconColor: COLORS.warning,
      subColor: COLORS.warning,
    },
  ];

  const adminAccounts = [
    { name: "Maria Santos", role: "Super Admin", status: "Active" },
    { name: "John Reyes", role: "Operations Admin", status: "Active" },
    { name: "Carla Lim", role: "Validation Admin", status: "Active" },
  ];

  const incidentCategories = [
    "Public Safety Incidents",
    "Property-Related Incidents",
    "Traffic and Road Incidents",
    "Community and Environmental Concerns",
    "Suspicious Activities",
    "Public Assistance / Community Reports",
    "Cyber and Online Incidents",
  ];

  return (
    <Admin_Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrap}>
          <View style={styles.leftSection}>
            <View style={styles.summaryRow}>
              {summaryCards.map((card) => (
                <View key={card.title} style={styles.summaryCard}>
                  <View style={[styles.summaryIconWrap, { backgroundColor: card.iconBg }]}>
                    <Ionicons name={card.icon} size={24} color={card.iconColor} />
                  </View>

                  <View style={styles.summaryTextWrap}>
                    <Text style={styles.summaryTitle}>{card.title}</Text>
                    <View style={styles.summaryValueRow}>
                      <Text style={styles.summaryValue}>{card.value}</Text>
                      <Text style={[styles.summarySubtext, { color: card.subColor }]}>
                        {card.subtext}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Admin Account Management</Text>
                <TouchableOpacity style={styles.primaryActionButton}>
                  <Ionicons name="add" size={16} color={COLORS.white} />
                  <Text style={styles.primaryActionButtonText}>Add Admin</Text>
                </TouchableOpacity>
              </View>

              {adminAccounts.map((admin, index) => (
                <SettingRow
                  key={admin.name}
                  icon="person-circle-outline"
                  title={admin.name}
                  description={`${admin.role} • Manage access and permissions`}
                  isLast={index === adminAccounts.length - 1}
                  rightContent={<StatusBadge label={admin.status} tone="success" />}
                />
              ))}
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>AI Threshold Configuration</Text>
                <StatusBadge label="AI Enabled" tone="success" />
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
                    thumbColor={aiCredibilityEnabled ? COLORS.primary : "#FFFFFF"}
                  />
                }
              />

              <View style={styles.thresholdGrid}>
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
                <Text style={styles.sectionTitle}>Incident Category Management</Text>
                <TouchableOpacity style={styles.secondaryButton}>
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
                <Text style={styles.sectionTitle}>Map Settings</Text>
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
                    thumbColor={autoMapVerified ? COLORS.primary : "#FFFFFF"}
                  />
                }
              />

              <SettingRow
                icon="git-network-outline"
                title="Show clustering overlay"
                description="Display clustered incident pattern grouping on the map."
                rightContent={
                  <Switch
                    value={clusterOverlay}
                    onValueChange={setClusterOverlay}
                    trackColor={{ false: "#D9E2F0", true: "#BFD4FF" }}
                    thumbColor={clusterOverlay ? COLORS.primary : "#FFFFFF"}
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
                    thumbColor={heatmapOverlay ? COLORS.primary : "#FFFFFF"}
                  />
                }
              />

              <View style={styles.thresholdGrid}>
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
                <Text style={styles.sectionTitle}>Notification Preferences</Text>
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
                    thumbColor={emailNotifications ? COLORS.primary : "#FFFFFF"}
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
                    thumbColor={pushNotifications ? COLORS.primary : "#FFFFFF"}
                  />
                }
              />
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>API and Model Settings</Text>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Test Connection</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.thresholdGrid}>
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
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton}>
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
                <Text style={styles.breakdownCount}>5</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>AI Threshold Rules</Text>
                <Text style={styles.breakdownCount}>2</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Incident Categories</Text>
                <Text style={styles.breakdownCount}>7</Text>
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
                  Settings control the behavior of the admin system, so changes
                  should only be saved by authorized administrators.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Admin_Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 28,
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
    minHeight: 58,
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
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
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
  thresholdGrid: {
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