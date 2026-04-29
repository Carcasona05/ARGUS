import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Admin_Layout from "../../components/Admin_compo/Admin_Layout";

export default function Admin_Logs() {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const logs = [
    {
      id: "LOG-001",
      actionType: "Report Verified",
      title: "Report verified",
      actor: "Admin R. Ramos",
      reportId: "ARG-2031",
      details: "Road accident near Poblacion was reviewed and verified.",
      oldStatus: "Pending",
      newStatus: "Verified",
      dateTime: "Apr 29, 2026 • 10:35 AM",
    },
    {
      id: "LOG-002",
      actionType: "Map & Verify",
      title: "Report mapped and verified",
      actor: "Admin R. Ramos",
      reportId: "ARG-2033",
      details: "Flood report near San Miguel was verified and shown on the map.",
      oldStatus: "Pending",
      newStatus: "Verified + Map Visible",
      dateTime: "Apr 29, 2026 • 9:48 AM",
    },
    {
      id: "LOG-003",
      actionType: "AI Analysis",
      title: "AI analysis completed",
      actor: "ARGUS AI",
      reportId: "ARG-2031",
      details: "AI generated a 92% credibility score with urgent sentiment.",
      oldStatus: "Not Analyzed",
      newStatus: "AI Score 92%",
      dateTime: "Apr 29, 2026 • 9:41 AM",
    },
    {
      id: "LOG-004",
      actionType: "Admin Report Created",
      title: "Admin-created report added",
      actor: "Admin R. Ramos",
      reportId: "ARG-2032",
      details:
        "Admin created a suspicious activity report. It was automatically verified.",
      oldStatus: "None",
      newStatus: "Verified",
      dateTime: "Apr 29, 2026 • 9:20 AM",
    },
    {
      id: "LOG-005",
      actionType: "Report Rejected",
      title: "Report rejected",
      actor: "Admin R. Ramos",
      reportId: "ARG-2034",
      details: "False fire alarm report was rejected due to unclear details.",
      oldStatus: "Pending",
      newStatus: "Rejected",
      dateTime: "Apr 28, 2026 • 5:30 PM",
    },
    {
      id: "LOG-006",
      actionType: "Notification Sent",
      title: "Notification sent",
      actor: "System",
      reportId: "ARG-2031",
      details: "A report verification notification was sent to the user.",
      oldStatus: "Pending Notification",
      newStatus: "Sent",
      dateTime: "Apr 28, 2026 • 4:55 PM",
    },
  ];

  const filters = [
    "All",
    "Report Verified",
    "Report Rejected",
    "Map & Verify",
    "Admin Report Created",
    "AI Analysis",
    "Notification Sent",
  ];

  const filteredLogs = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesFilter =
        selectedFilter === "All" || log.actionType === selectedFilter;

      const matchesSearch =
        !query ||
        log.id.toLowerCase().includes(query) ||
        log.title.toLowerCase().includes(query) ||
        log.actor.toLowerCase().includes(query) ||
        log.reportId.toLowerCase().includes(query) ||
        log.actionType.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [searchText, selectedFilter]);

  const totalLogs = logs.length;
  const verifiedLogs = logs.filter(
    (item) =>
      item.actionType === "Report Verified" ||
      item.actionType === "Map & Verify"
  ).length;
  const rejectedLogs = logs.filter(
    (item) => item.actionType === "Report Rejected"
  ).length;
  const aiLogs = logs.filter((item) => item.actionType === "AI Analysis").length;

  const getLogStyle = (type) => {
    if (type === "Report Verified" || type === "Map & Verify") {
      return {
        icon:
          type === "Map & Verify"
            ? "map-outline"
            : "shield-checkmark-outline",
        color: "#22A06B",
        bg: "#EAF8F1",
      };
    }

    if (type === "Report Rejected") {
      return {
        icon: "close-circle-outline",
        color: "#E45757",
        bg: "#FFF5F5",
      };
    }

    if (type === "AI Analysis") {
      return {
        icon: "sparkles-outline",
        color: "#7C3AED",
        bg: "#F3E8FF",
      };
    }

    if (type === "Admin Report Created") {
      return {
        icon: "add-circle-outline",
        color: "#294880",
        bg: "#EAF2FF",
      };
    }

    if (type === "Notification Sent") {
      return {
        icon: "notifications-outline",
        color: "#C98A2E",
        bg: "#FFF4E5",
      };
    }

    return {
      icon: "document-text-outline",
      color: "#294880",
      bg: "#EAF2FF",
    };
  };

  const getBadgeStyle = (type) => {
    if (type === "Report Verified" || type === "Map & Verify") {
      return {
        bg: "#EAF8F1",
        color: "#22A06B",
      };
    }

    if (type === "Report Rejected") {
      return {
        bg: "#FFF5F5",
        color: "#E45757",
      };
    }

    if (type === "AI Analysis") {
      return {
        bg: "#F3E8FF",
        color: "#7C3AED",
      };
    }

    if (type === "Notification Sent") {
      return {
        bg: "#FFF4E5",
        color: "#C98A2E",
      };
    }

    return {
      bg: "#EAF2FF",
      color: "#294880",
    };
  };

  const StatCard = ({ icon, title, value, color, bg }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={25} color={color} />
      </View>

      <View style={styles.statTextBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <Admin_Layout>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerCard}>
            <View style={styles.headerTextBox}>
              <Text style={styles.pageTitle}>Logs</Text>
              <Text style={styles.pageSubtitle}>
                Track recent report validation actions, AI processing,
                admin-created reports, and notification events.
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon="list-outline"
              title="Total Logs"
              value={totalLogs}
              color="#294880"
              bg="#EAF2FF"
            />

            <StatCard
              icon="shield-checkmark-outline"
              title="Verified Actions"
              value={verifiedLogs}
              color="#22A06B"
              bg="#EAF8F1"
            />

            <StatCard
              icon="close-circle-outline"
              title="Rejected Reports"
              value={rejectedLogs}
              color="#E45757"
              bg="#FFF5F5"
            />

            <StatCard
              icon="sparkles-outline"
              title="AI Logs"
              value={aiLogs}
              color="#7C3AED"
              bg="#F3E8FF"
            />
          </View>

          <View style={styles.filterCard}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={21} color="#5D6F92" />

              <TextInput
                style={styles.searchInput}
                placeholder="Search by report ID, action, actor, or details..."
                placeholderTextColor="#8A98B3"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
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
            <View style={styles.listHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recent Admin Activity</Text>
                <Text style={styles.sectionSubtitle}>
                  These logs show report-related actions for normal admin
                  workflow.
                </Text>
              </View>

              <Text style={styles.resultText}>
                {filteredLogs.length} result
                {filteredLogs.length === 1 ? "" : "s"}
              </Text>
            </View>

            {filteredLogs.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={42} color="#5D6F92" />
                <Text style={styles.emptyTitle}>No logs found</Text>
                <Text style={styles.emptyText}>
                  Try changing your search keyword or selected filter.
                </Text>
              </View>
            ) : (
              filteredLogs.map((log, index) => {
                const logStyle = getLogStyle(log.actionType);
                const badgeStyle = getBadgeStyle(log.actionType);

                return (
                  <View
                    key={log.id}
                    style={[styles.logRow, index !== 0 && styles.logRowBorder]}
                  >
                    <View
                      style={[
                        styles.logIconBox,
                        { backgroundColor: logStyle.bg },
                      ]}
                    >
                      <Ionicons
                        name={logStyle.icon}
                        size={25}
                        color={logStyle.color}
                      />
                    </View>

                    <View style={styles.logContent}>
                      <View style={styles.logTopRow}>
                        <View style={styles.logTitleBox}>
                          <Text style={styles.logTitle}>{log.title}</Text>
                          <Text style={styles.logMeta}>
                            {log.actor} • {log.dateTime}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.actionBadge,
                            { backgroundColor: badgeStyle.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.actionBadgeText,
                              { color: badgeStyle.color },
                            ]}
                          >
                            {log.actionType}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.logDetails}>{log.details}</Text>

                      <View style={styles.statusChangeBox}>
                        <View style={styles.statusItem}>
                          <Text style={styles.statusLabel}>Report ID</Text>
                          <Text style={styles.statusValue}>{log.reportId}</Text>
                        </View>

                        <View style={styles.statusItem}>
                          <Text style={styles.statusLabel}>Old Status</Text>
                          <Text style={styles.statusValue}>
                            {log.oldStatus}
                          </Text>
                        </View>

                        <View style={styles.statusArrowBox}>
                          <Ionicons
                            name="arrow-forward-outline"
                            size={18}
                            color="#8A98B3"
                          />
                        </View>

                        <View style={styles.statusItem}>
                          <Text style={styles.statusLabel}>New Status</Text>
                          <Text style={styles.statusValue}>
                            {log.newStatus}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </Admin_Layout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingBottom: 34,
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 24,
    marginBottom: 18,
  },

  headerTextBox: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 30,
    color: "#294880",
    fontWeight: "700",
    marginBottom: 8,
  },

  pageSubtitle: {
    fontSize: 16,
    color: "#5D6F92",
    lineHeight: 24,
    maxWidth: 900,
    fontWeight: "400",
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 18,
  },

  statCard: {
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

  statIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  statTextBox: {
    flex: 1,
  },

  statValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2F4267",
  },

  statTitle: {
    fontSize: 15,
    color: "#5D6F92",
    marginTop: 4,
    fontWeight: "500",
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  searchBox: {
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    color: "#294880",
    fontSize: 16,
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  filterRow: {
    gap: 10,
  },

  filterPill: {
    height: 40,
    paddingHorizontal: 16,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#294880",
  },

  activeFilterPillText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  logsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    overflow: "hidden",
  },

  listHeader: {
    minHeight: 82,
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#294880",
    marginBottom: 5,
  },

  sectionSubtitle: {
    fontSize: 15,
    color: "#5D6F92",
    fontWeight: "400",
  },

  resultText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#294880",
  },

  logRow: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },

  logRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
  },

  logIconBox: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  logContent: {
    flex: 1,
    minWidth: 0,
  },

  logTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  logTitleBox: {
    flex: 1,
  },

  logTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 23,
    marginBottom: 4,
  },

  logMeta: {
    fontSize: 14,
    color: "#5D6F92",
    lineHeight: 20,
    fontWeight: "400",
  },

  actionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  actionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  logDetails: {
    fontSize: 15,
    color: "#5D6F92",
    lineHeight: 22,
    marginBottom: 14,
    fontWeight: "400",
  },

  statusChangeBox: {
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: 10,
  },

  statusItem: {
    flex: 1,
    minWidth: 160,
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: "#E4EAF3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  statusLabel: {
    fontSize: 12,
    color: "#7A8BA8",
    fontWeight: "500",
    marginBottom: 5,
  },

  statusValue: {
    fontSize: 14,
    color: "#294880",
    fontWeight: "600",
    lineHeight: 19,
  },

  statusArrowBox: {
    width: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F4267",
    marginTop: 12,
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 15,
    color: "#5D6F92",
    fontWeight: "400",
  },
});