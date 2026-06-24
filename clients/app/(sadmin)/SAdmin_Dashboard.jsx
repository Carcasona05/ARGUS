import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import SAdmin_Layout from "../../components/SAdmin_Compo/SAdmin_Layout";

export default function SAdmin_Dashboard() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const overviewCards = [
    {
      title: "Total Reports",
      value: "1,248",
      note: "All submitted incident reports",
      icon: "document-text-outline",
      iconType: "Ionicons",
      color: "#294880",
      bg: "#E8EFFB",
    },
    {
      title: "Pending Reports",
      value: "86",
      note: "Waiting for validation",
      icon: "time-outline",
      iconType: "Ionicons",
      color: "#D97706",
      bg: "#FEF3C7",
    },
    {
      title: "Verified Reports",
      value: "924",
      note: "Mapped and verified reports",
      icon: "shield-checkmark-outline",
      iconType: "Ionicons",
      color: "#059669",
      bg: "#D1FAE5",
    },
    {
      title: "Rejected Reports",
      value: "42",
      note: "Reports marked as invalid",
      icon: "close-circle-outline",
      iconType: "Ionicons",
      color: "#DC2626",
      bg: "#FEE2E2",
    },
    {
      title: "Active Admins",
      value: "12",
      note: "Normal admins currently registered",
      icon: "people-outline",
      iconType: "Ionicons",
      color: "#2563EB",
      bg: "#DBEAFE",
    },
    {
      title: "Audit Logs Today",
      value: "39",
      note: "System and admin activities",
      icon: "list-outline",
      iconType: "Ionicons",
      color: "#7C3AED",
      bg: "#EDE9FE",
    },
  ];

  const adminSummary = [
    {
      label: "SuperAdmin Accounts",
      value: "1",
      icon: "star-outline",
      color: "#294880",
    },
    {
      label: "Normal Admin Accounts",
      value: "12",
      icon: "person-outline",
      color: "#2563EB",
    },
    {
      label: "Pending Admin Requests",
      value: "3",
      icon: "person-add-outline",
      color: "#D97706",
    },
    {
      label: "Disabled Accounts",
      value: "1",
      icon: "person-remove-outline",
      color: "#DC2626",
    },
  ];

  const recentActivities = [
    {
      id: "LOG-001",
      title: "Report verified and mapped",
      description:
        "Admin R. Ramos verified Report #ARG-2031 and displayed it on the map.",
      time: "5 minutes ago",
      type: "Report Verified",
      icon: "shield-checkmark-outline",
      color: "#059669",
      bg: "#D1FAE5",
    },
    {
      id: "LOG-002",
      title: "Report soft deleted",
      description:
        "Report #ARG-2024 was soft deleted with reason: duplicate report.",
      time: "14 minutes ago",
      type: "Report Deleted",
      icon: "trash-outline",
      color: "#DC2626",
      bg: "#FEE2E2",
    },
    {
      id: "LOG-003",
      title: "AI threshold updated",
      description:
        "SuperAdmin updated high credibility threshold from 85 to 90.",
      time: "32 minutes ago",
      type: "System Settings",
      icon: "settings-outline",
      color: "#7C3AED",
      bg: "#EDE9FE",
    },
    {
      id: "LOG-004",
      title: "New admin request submitted",
      description: "A pending admin registration request needs review.",
      time: "1 hour ago",
      type: "Admin Request",
      icon: "person-add-outline",
      color: "#2563EB",
      bg: "#DBEAFE",
    },
  ];

  const aiSettings = [
    {
      label: "AI Scoring",
      value: "Enabled",
      status: "active",
    },
    {
      label: "High Credibility Threshold",
      value: "90%",
      status: "normal",
    },
    {
      label: "Medium Credibility Threshold",
      value: "65%",
      status: "normal",
    },
    {
      label: "Model Version",
      value: "ARGUS-AI v1.0",
      status: "normal",
    },
  ];

  const reportBreakdown = [
    {
      label: "Verified",
      value: 74,
      color: "#059669",
    },
    {
      label: "Pending",
      value: 18,
      color: "#D97706",
    },
    {
      label: "Rejected",
      value: 8,
      color: "#DC2626",
    },
  ];

  const getCardIcon = (item) => {
    if (item.iconType === "Feather") {
      return <Feather name={item.icon} size={23} color={item.color} />;
    }

    if (item.iconType === "MaterialIcons") {
      return <MaterialIcons name={item.icon} size={23} color={item.color} />;
    }

    return <Ionicons name={item.icon} size={23} color={item.color} />;
  };

  return (
    <SAdmin_Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overviewGrid}>
          {overviewCards.map((item, index) => (
            <View key={index} style={styles.overviewCard}>
              <View
                style={[
                  styles.overviewIconBox,
                  { backgroundColor: item.bg },
                ]}
              >
                {getCardIcon(item)}
              </View>

              <View style={styles.overviewTextBox}>
                <Text style={styles.overviewValue}>{item.value}</Text>
                <Text style={styles.overviewTitle}>{item.title}</Text>
                <Text style={styles.overviewNote}>{item.note}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.mainGrid}>
          <View style={styles.leftColumn}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View>
                  <Text style={styles.panelTitle}>
                    Report Verification Overview
                  </Text>
                  <Text style={styles.panelSubtitle}>
                    Current report status distribution
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.smallActionButton}
                  onPress={() => router.push("/(admin)/Admin_Reports")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.smallActionText}>View Reports</Text>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={15}
                    color="#294880"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.breakdownList}>
                {reportBreakdown.map((item, index) => (
                  <View key={index} style={styles.breakdownItem}>
                    <View style={styles.breakdownTop}>
                      <Text style={styles.breakdownLabel}>{item.label}</Text>
                      <Text style={styles.breakdownValue}>{item.value}%</Text>
                    </View>

                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View>
                  <Text style={styles.panelTitle}>
                    Recent Critical Activities
                  </Text>
                  <Text style={styles.panelSubtitle}>
                    Latest actions automatically recorded in the audit trail
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.smallActionButton}
                  onPress={() => router.push("/(sadmin)/SAdmin_AuditLogs")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.smallActionText}>Audit Logs</Text>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={15}
                    color="#294880"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.activityList}>
                {recentActivities.map((item) => (
                  <View key={item.id} style={styles.activityItem}>
                    <View
                      style={[
                        styles.activityIconBox,
                        { backgroundColor: item.bg },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={item.color}
                      />
                    </View>

                    <View style={styles.activityContent}>
                      <View style={styles.activityHeader}>
                        <Text style={styles.activityTitle}>{item.title}</Text>
                        <Text style={styles.activityTime}>{item.time}</Text>
                      </View>

                      <Text style={styles.activityDesc}>
                        {item.description}
                      </Text>

                      <View style={styles.activityTag}>
                        <Text style={styles.activityTagText}>{item.type}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.panel}>
              <View style={styles.panelHeaderCompact}>
                <View>
                  <Text style={styles.panelTitle}>Admin Management</Text>
                  <Text style={styles.panelSubtitle}>
                    Account and role summary
                  </Text>
                </View>
              </View>

              <View style={styles.adminSummaryList}>
                {adminSummary.map((item, index) => (
                  <View key={index} style={styles.adminSummaryItem}>
                    <View style={styles.adminSummaryLeft}>
                      <View style={styles.adminIconCircle}>
                        <Ionicons
                          name={item.icon}
                          size={18}
                          color={item.color}
                        />
                      </View>

                      <Text style={styles.adminSummaryLabel}>
                        {item.label}
                      </Text>
                    </View>

                    <Text style={styles.adminSummaryValue}>{item.value}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/(sadmin)/SAdmin_AdminAccounts")}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>
                  Manage Admin Accounts
                </Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={17}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.panel}>
              <View style={styles.panelHeaderCompact}>
                <View>
                  <Text style={styles.panelTitle}>AI Configuration Status</Text>
                  <Text style={styles.panelSubtitle}>
                    Current AI and model settings
                  </Text>
                </View>
              </View>

              <View style={styles.aiList}>
                {aiSettings.map((item, index) => (
                  <View key={index} style={styles.aiItem}>
                    <View>
                      <Text style={styles.aiLabel}>{item.label}</Text>
                      <Text style={styles.aiValue}>{item.value}</Text>
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        item.status === "active" && styles.activeStatusPill,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          item.status === "active" &&
                            styles.activeStatusPillText,
                        ]}
                      >
                        {item.status === "active" ? "Active" : "Set"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SAdmin_Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFD",
  },

  contentContainer: {
    paddingBottom: 30,
  },

  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 22,
  },

  overviewCard: {
    flexGrow: 1,
    flexBasis: 250,
    minWidth: 230,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#294880",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },

  overviewIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  overviewTextBox: {
    flex: 1,
  },

  overviewValue: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    marginBottom: 2,
  },

  overviewTitle: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#30415F",
  },

  overviewNote: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#6B7A99",
    marginTop: 3,
  },

  mainGrid: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
  },

  leftColumn: {
    flex: 1.55,
    gap: 20,
  },

  rightColumn: {
    flex: 1,
    gap: 20,
  },

  panel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    padding: 20,
    shadowColor: "#294880",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 3,
  },

  panelHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 14,
  },

  panelHeaderCompact: {
    marginBottom: 18,
  },

  panelTitle: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    marginBottom: 4,
  },

  panelSubtitle: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#6B7A99",
    lineHeight: 18,
  },

  smallActionButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#E8EFFB",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  smallActionText: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#294880",
  },

  breakdownList: {
    gap: 16,
  },

  breakdownItem: {
    gap: 8,
  },

  breakdownTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  breakdownLabel: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#30415F",
  },

  breakdownValue: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#EEF3FA",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  activityList: {
    gap: 14,
  },

  activityItem: {
    flexDirection: "row",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3FA",
  },

  activityIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  activityContent: {
    flex: 1,
  },

  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  activityTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  activityTime: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#8A98B3",
  },

  activityDesc: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5F6F8C",
    lineHeight: 19,
    marginTop: 4,
  },

  activityTag: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F6FB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },

  activityTagText: {
    fontSize: 11,
    fontFamily: "PoppinsMedium",
    color: "#294880",
  },

  adminSummaryList: {
    gap: 12,
    marginBottom: 18,
  },

  adminSummaryItem: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#E5ECF6",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  adminSummaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  adminIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#E8EFFB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  adminSummaryLabel: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#30415F",
  },

  adminSummaryValue: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  primaryButton: {
    height: 46,
    borderRadius: 14,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },

  aiList: {
    gap: 12,
  },

  aiItem: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#E5ECF6",
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  aiLabel: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#6B7A99",
    marginBottom: 3,
  },

  aiValue: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  statusPill: {
    borderRadius: 999,
    backgroundColor: "#E8EFFB",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  activeStatusPill: {
    backgroundColor: "#D1FAE5",
  },

  statusPillText: {
    fontSize: 11,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  activeStatusPillText: {
    color: "#059669",
  },
});