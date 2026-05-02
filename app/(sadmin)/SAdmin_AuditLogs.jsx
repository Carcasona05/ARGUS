import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import SAdmin_Layout from "../../components/SAdmin_Compo/SAdmin_Layout";

function LogBadge({ type }) {
  const getStyle = () => {
    if (type.includes("Deleted")) {
      return {
        backgroundColor: "#FFF5F5",
        color: "#E45757",
      };
    }

    if (type.includes("Verified") || type.includes("Mapped")) {
      return {
        backgroundColor: "#EAF8F1",
        color: "#22A06B",
      };
    }

    if (type.includes("Admin")) {
      return {
        backgroundColor: "#EAF2FF",
        color: "#294880",
      };
    }

    if (type.includes("AI")) {
      return {
        backgroundColor: "#F3E8FF",
        color: "#7C3AED",
      };
    }

    return {
      backgroundColor: "#FFF4E5",
      color: "#C98A2E",
    };
  };

  const style = getStyle();

  return (
    <View style={[styles.logBadge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.logBadgeText, { color: style.color }]}>{type}</Text>
    </View>
  );
}

function AuditLogRow({ log, isLast }) {
  const getIcon = () => {
    if (log.actionType.includes("Deleted")) {
      return {
        icon: "trash-outline",
        color: "#E45757",
        bg: "#FFF5F5",
      };
    }

    if (log.actionType.includes("Verified")) {
      return {
        icon: "shield-checkmark-outline",
        color: "#22A06B",
        bg: "#EAF8F1",
      };
    }

    if (log.actionType.includes("Mapped")) {
      return {
        icon: "map-outline",
        color: "#22A06B",
        bg: "#EAF8F1",
      };
    }

    if (log.actionType.includes("Admin")) {
      return {
        icon: "person-circle-outline",
        color: "#294880",
        bg: "#EAF2FF",
      };
    }

    if (log.actionType.includes("AI")) {
      return {
        icon: "sparkles-outline",
        color: "#7C3AED",
        bg: "#F3E8FF",
      };
    }

    return {
      icon: "document-text-outline",
      color: "#C98A2E",
      bg: "#FFF4E5",
    };
  };

  const iconData = getIcon();

  return (
    <View style={[styles.logRow, !isLast && styles.logRowBorder]}>
      <View style={[styles.logIconBox, { backgroundColor: iconData.bg }]}>
        <Ionicons name={iconData.icon} size={21} color={iconData.color} />
      </View>

      <View style={styles.logContent}>
        <View style={styles.logTopRow}>
          <View style={styles.logTitleWrap}>
            <Text style={styles.logTitle}>{log.title}</Text>
            <Text style={styles.logMeta}>
              {log.actor} • {log.dateTime}
            </Text>
          </View>

          <LogBadge type={log.actionType} />
        </View>

        <Text style={styles.logDescription}>{log.details}</Text>

        <View style={styles.logInfoGrid}>
          <View style={styles.logInfoItem}>
            <Text style={styles.logInfoLabel}>Report ID</Text>
            <Text style={styles.logInfoValue}>{log.reportId || "N/A"}</Text>
          </View>

          <View style={styles.logInfoItem}>
            <Text style={styles.logInfoLabel}>Old Value</Text>
            <Text style={styles.logInfoValue}>{log.oldValue || "N/A"}</Text>
          </View>

          <View style={styles.logInfoItem}>
            <Text style={styles.logInfoLabel}>New Value</Text>
            <Text style={styles.logInfoValue}>{log.newValue || "N/A"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function SAdmin_AuditLogs() {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const auditLogs = [
    {
      id: "LOG-001",
      title: "Report verified and mapped",
      actor: "Admin R. Ramos",
      actionType: "Report Verified",
      details:
        "Report #ARG-2031 was verified and displayed on the Argao incident map.",
      reportId: "ARG-2031",
      oldValue: "Pending",
      newValue: "Verified",
      dateTime: "Apr 29, 2026 • 10:30 AM",
    },
    {
      id: "LOG-002",
      title: "Report soft deleted",
      actor: "Admin C. Lim",
      actionType: "Report Deleted",
      details:
        "Report #ARG-2024 was soft deleted. Reason: duplicate incident report.",
      reportId: "ARG-2024",
      oldValue: "Active",
      newValue: "Deleted",
      dateTime: "Apr 29, 2026 • 10:12 AM",
    },
    {
      id: "LOG-003",
      title: "AI analysis completed",
      actor: "System",
      actionType: "AI Analysis Completed",
      details:
        "AI credibility analysis was completed for Report #ARG-2032 with high credibility.",
      reportId: "ARG-2032",
      oldValue: "Not analyzed",
      newValue: "Score 92%",
      dateTime: "Apr 29, 2026 • 9:58 AM",
    },
    {
      id: "LOG-004",
      title: "Admin account added",
      actor: "SuperAdmin",
      actionType: "Admin Added",
      details: "A new normal admin account was added to the system.",
      reportId: null,
      oldValue: "N/A",
      newValue: "Admin Created",
      dateTime: "Apr 29, 2026 • 9:30 AM",
    },
    {
      id: "LOG-005",
      title: "Map details corrected",
      actor: "Admin J. Reyes",
      actionType: "Report Mapped",
      details:
        "Report location was corrected from Poblacion to Talaga after verification review.",
      reportId: "ARG-2019",
      oldValue: "Barangay Poblacion",
      newValue: "Barangay Talaga",
      dateTime: "Apr 29, 2026 • 8:42 AM",
    },
    {
      id: "LOG-006",
      title: "System settings updated",
      actor: "SuperAdmin",
      actionType: "System Settings Updated",
      details: "AI high credibility threshold was updated from 85% to 90%.",
      reportId: null,
      oldValue: "85%",
      newValue: "90%",
      dateTime: "Apr 28, 2026 • 5:21 PM",
    },
  ];

  const filters = [
    "All",
    "Report Verified",
    "Report Deleted",
    "Report Mapped",
    "Admin Added",
    "AI Analysis Completed",
    "System Settings Updated",
  ];

  const filteredLogs = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return auditLogs.filter((log) => {
      const matchesFilter =
        selectedFilter === "All" || log.actionType === selectedFilter;

      const matchesSearch =
        !query ||
        log.title.toLowerCase().includes(query) ||
        log.actor.toLowerCase().includes(query) ||
        log.actionType.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        (log.reportId || "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [searchText, selectedFilter]);

  const deletedCount = auditLogs.filter(
    (log) => log.actionType === "Report Deleted"
  ).length;

  const verifiedCount = auditLogs.filter(
    (log) => log.actionType === "Report Verified"
  ).length;

  const adminActionCount = auditLogs.filter((log) =>
    log.actionType.includes("Admin")
  ).length;

  return (
    <SAdmin_Layout>
      <View style={styles.mainWrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIconBox}>
                <Ionicons name="list-outline" size={24} color="#294880" />
              </View>

              <View>
                <Text style={styles.summaryValue}>{auditLogs.length}</Text>
                <Text style={styles.summaryLabel}>Total Logs</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.successIconBox}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color="#22A06B"
                />
              </View>

              <View>
                <Text style={styles.summaryValue}>{verifiedCount}</Text>
                <Text style={styles.summaryLabel}>Verified Reports</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.dangerIconBox}>
                <Ionicons name="trash-outline" size={24} color="#E45757" />
              </View>

              <View>
                <Text style={styles.summaryValue}>{deletedCount}</Text>
                <Text style={styles.summaryLabel}>Deleted Reports</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.warningIconBox}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="#C98A2E"
                />
              </View>

              <View>
                <Text style={styles.summaryValue}>{adminActionCount}</Text>
                <Text style={styles.summaryLabel}>Admin Actions</Text>
              </View>
            </View>
          </View>

          <View style={styles.filterCard}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#5D6F92" />

              <TextInput
                style={styles.searchInput}
                placeholder="Search logs by report ID, action, actor, or details..."
                placeholderTextColor="#8A98B3"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterList}
            >
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;

                return (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterPill,
                      isActive && styles.activeFilterPill,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        isActive && styles.activeFilterPillText,
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.logsCard}>
            <View style={styles.logsHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recent System Activity</Text>
                <Text style={styles.sectionSubtitle}>
                  Audit logs are system-generated and should not be manually
                  edited.
                </Text>
              </View>

              <View style={styles.resultPill}>
                <Text style={styles.resultPillText}>
                  {filteredLogs.length} result
                  {filteredLogs.length === 1 ? "" : "s"}
                </Text>
              </View>
            </View>

            {filteredLogs.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="document-text-outline"
                  size={38}
                  color="#5D6F92"
                />
                <Text style={styles.emptyTitle}>No audit logs found</Text>
                <Text style={styles.emptyText}>
                  Try changing the search keyword or selected filter.
                </Text>
              </View>
            ) : (
              filteredLogs.map((log, index) => (
                <AuditLogRow
                  key={log.id}
                  log={log}
                  isLast={index === filteredLogs.length - 1}
                />
              ))
            )}
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
    maxWidth: 820,
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

  dangerIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF5F5",
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

  summaryValue: {
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
    color: "#2F4267",
  },

  summaryLabel: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    marginTop: 4,
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  searchBox: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    color: "#294880",
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  filterList: {
    gap: 10,
  },

  filterPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilterPill: {
    backgroundColor: "#294880",
    borderColor: "#294880",
  },

  filterPillText: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#294880",
  },

  activeFilterPillText: {
    color: "#FFFFFF",
  },

  logsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    overflow: "hidden",
  },

  logsHeader: {
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
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
  },

  resultPill: {
    borderRadius: 999,
    backgroundColor: "#EAF2FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  resultPillText: {
    color: "#294880",
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",
  },

  logRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  logRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
  },

  logIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  logContent: {
    flex: 1,
  },

  logTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },

  logTitleWrap: {
    flex: 1,
  },

  logTitle: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: "#2F4267",
    marginBottom: 4,
  },

  logMeta: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
  },

  logBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  logBadgeText: {
    fontSize: 11,
    fontFamily: "PoppinsSemiBold",
  },

  logDescription: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    lineHeight: 19,
    marginBottom: 12,
  },

  logInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  logInfoItem: {
    flex: 1,
    minWidth: 170,
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: "#E4EAF3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  logInfoLabel: {
    fontSize: 11,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    marginBottom: 4,
  },

  logInfoValue: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#294880",
  },

  emptyState: {
    paddingVertical: 44,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#2F4267",
    marginTop: 10,
    marginBottom: 4,
  },

  emptyText: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    textAlign: "center",
  },
});