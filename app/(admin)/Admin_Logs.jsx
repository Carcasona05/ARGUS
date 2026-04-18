import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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

const LOG_DATA = [
  {
    id: "LOG-0001",
    type: "Approval",
    actor: "Admin Maria Santos",
    action: "Verified and mapped incident report ARG-VAL-1001.",
    target: "ARG-VAL-1001",
    timestamp: "2026-04-18 08:52 PM",
    status: "Success",
    icon: "checkmark-circle-outline",
  },
  {
    id: "LOG-0002",
    type: "Rejection",
    actor: "Admin John Reyes",
    action:
      "Rejected incident report ARG-VAL-1004 due to insufficient details.",
    target: "ARG-VAL-1004",
    timestamp: "2026-04-18 08:41 PM",
    status: "Warning",
    icon: "close-circle-outline",
  },
  {
    id: "LOG-0003",
    type: "Submission",
    actor: "Citizen Report System",
    action:
      "New incident report submitted for suspicious person at Fuente Circle.",
    target: "ARG-VAL-1003",
    timestamp: "2026-04-18 07:14 PM",
    status: "Info",
    icon: "document-text-outline",
  },
  {
    id: "LOG-0004",
    type: "AI Processing",
    actor: "AI Validation Engine",
    action: "Generated sentiment and credibility assessment for ARG-VAL-1002.",
    target: "ARG-VAL-1002",
    timestamp: "2026-04-18 07:53 PM",
    status: "Success",
    icon: "hardware-chip-outline",
  },
  {
    id: "LOG-0005",
    type: "Notification",
    actor: "Notification Service",
    action:
      "Validation update sent to reporting user for incident ARG-VAL-1001.",
    target: "ARG-VAL-1001",
    timestamp: "2026-04-18 08:55 PM",
    status: "Info",
    icon: "notifications-outline",
  },
  {
    id: "LOG-0006",
    type: "System Event",
    actor: "System Monitor",
    action:
      "Temporary delay detected in AI scoring queue. Auto-recovery completed.",
    target: "AI Queue",
    timestamp: "2026-04-18 06:32 PM",
    status: "Error",
    icon: "alert-circle-outline",
  },
  {
    id: "LOG-0007",
    type: "Admin Action",
    actor: "Admin Carla Lim",
    action: "Opened full validation record for ARG-VAL-1002.",
    target: "ARG-VAL-1002",
    timestamp: "2026-04-18 08:02 PM",
    status: "Info",
    icon: "eye-outline",
  },
  {
    id: "LOG-0008",
    type: "Submission",
    actor: "Citizen Report System",
    action: "New flooding report submitted for Mabolo, Barangay Kasambagan.",
    target: "ARG-VAL-1004",
    timestamp: "2026-04-18 06:48 PM",
    status: "Info",
    icon: "document-text-outline",
  },
];

function StatusBadge({ label }) {
  const value = (label || "").toLowerCase();

  let badgeStyle = {
    backgroundColor: COLORS.pendingSoft,
    color: COLORS.primary,
  };

  if (value === "success") {
    badgeStyle = {
      backgroundColor: COLORS.successSoft,
      color: COLORS.success,
    };
  } else if (value === "error") {
    badgeStyle = {
      backgroundColor: COLORS.dangerSoft,
      color: COLORS.danger,
    };
  } else if (value === "warning") {
    badgeStyle = {
      backgroundColor: COLORS.warningSoft,
      color: COLORS.warning,
    };
  }

  return (
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: badgeStyle.backgroundColor },
      ]}
    >
      <Text style={[styles.statusBadgeText, { color: badgeStyle.color }]}>
        {label}
      </Text>
    </View>
  );
}

function TypeBadge({ label }) {
  return (
    <View style={styles.typeBadge}>
      <Text style={styles.typeBadgeText}>{label}</Text>
    </View>
  );
}

export default function Admin_Logs() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Approval",
    "Submission",
    "AI Processing",
    "Notification",
    "System Event",
  ];

  const filteredLogs = useMemo(() => {
    if (activeFilter === "All") return LOG_DATA;
    return LOG_DATA.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  const summaryCards = [
    {
      title: "Total Logs",
      value: LOG_DATA.length.toString(),
      subtext: "Activity records",
      icon: "receipt-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "Admin Actions",
      value: LOG_DATA.filter(
        (item) =>
          item.type === "Approval" ||
          item.type === "Rejection" ||
          item.type === "Admin Action",
      ).length.toString(),
      subtext: "Manual operations",
      icon: "person-circle-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "AI Processing",
      value: LOG_DATA.filter(
        (item) => item.type === "AI Processing",
      ).length.toString(),
      subtext: "Automated checks",
      icon: "hardware-chip-outline",
      iconBg: COLORS.successSoft,
      iconColor: COLORS.success,
      subColor: COLORS.success,
    },
    {
      title: "System Events",
      value: LOG_DATA.filter(
        (item) => item.type === "System Event",
      ).length.toString(),
      subtext: "Alerts and errors",
      icon: "alert-circle-outline",
      iconBg: COLORS.dangerSoft,
      iconColor: COLORS.danger,
      subColor: COLORS.danger,
    },
  ];

  const activityBreakdown = [
    "Approval",
    "Rejection",
    "Submission",
    "AI Processing",
    "Notification",
    "Admin Action",
    "System Event",
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
                  <View
                    style={[
                      styles.summaryIconWrap,
                      { backgroundColor: card.iconBg },
                    ]}
                  >
                    <Ionicons
                      name={card.icon}
                      size={24}
                      color={card.iconColor}
                    />
                  </View>

                  <View style={styles.summaryTextWrap}>
                    <Text style={styles.summaryTitle}>{card.title}</Text>
                    <View style={styles.summaryValueRow}>
                      <Text style={styles.summaryValue}>{card.value}</Text>
                      <Text
                        style={[
                          styles.summarySubtext,
                          { color: card.subColor },
                        ]}
                      >
                        {card.subtext}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tableCard}>
              <View style={styles.tableHeaderTop}>
                <View style={styles.tableHeaderTextWrap}>
                  <Text style={styles.tableTitle}>System Activity Logs</Text>
                  <Text style={styles.tableSubtitle}>
                    Track validations, submissions, AI actions, notifications,
                    and system events for audit trail and transparency.
                  </Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filtersRow}
                >
                  {filters.map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          styles.filterButton,
                          isActive && styles.filterButtonActive,
                        ]}
                        onPress={() => setActiveFilter(filter)}
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            isActive && styles.filterButtonTextActive,
                          ]}
                        >
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeadRow}>
                    <Text style={[styles.tableHeadText, styles.colLogId]}>
                      Log ID
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colType]}>
                      Type
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colActor]}>
                      Actor
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colAction]}>
                      Action
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colTarget]}>
                      Target
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colTime]}>
                      Timestamp
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colStatus]}>
                      Status
                    </Text>
                  </View>

                  {filteredLogs.map((row) => (
                    <View key={row.id} style={styles.tableBodyRow}>
                      <Text style={[styles.tableCellText, styles.colLogId]}>
                        {row.id}
                      </Text>

                      <View style={styles.colType}>
                        <TypeBadge label={row.type} />
                      </View>

                      <View style={[styles.colActor, styles.actorCell]}>
                        <View style={styles.actorIconWrap}>
                          <Ionicons
                            name={row.icon}
                            size={16}
                            color={COLORS.primary}
                          />
                        </View>
                        <Text style={styles.actorText}>{row.actor}</Text>
                      </View>

                      <Text
                        style={[styles.tableCellText, styles.colAction]}
                        numberOfLines={2}
                      >
                        {row.action}
                      </Text>

                      <Text style={[styles.tableCellText, styles.colTarget]}>
                        {row.target}
                      </Text>

                      <Text style={[styles.tableCellText, styles.colTime]}>
                        {row.timestamp}
                      </Text>

                      <View style={styles.colStatus}>
                        <StatusBadge label={row.status} />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Activity Breakdown</Text>

              {activityBreakdown.map((type) => {
                const count = LOG_DATA.filter(
                  (item) => item.type === type,
                ).length;

                return (
                  <View key={type} style={styles.breakdownRow}>
                    <Text style={styles.breakdownText}>{type}</Text>
                    <Text style={styles.breakdownCount}>{count}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Audit Trail Notes</Text>

              <View style={styles.notesContent}>
                <Text style={styles.notesHeading}>Purpose</Text>
                <Text style={styles.notesText}>
                  Logs provide transparency for report validation, AI scoring,
                  notifications, admin actions, and system-level events.
                </Text>

                <Text style={[styles.notesHeading, styles.notesHeadingSpacing]}>
                  Included Tracking
                </Text>
                <Text style={styles.notesText}>
                  • Who approved or rejected a report{"\n"}• When a report was
                  submitted{"\n"}• AI processing activity{"\n"}• Notification
                  dispatch logs{"\n"}• Admin actions{"\n"}• Errors or system
                  events
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
  tableCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 16,
    overflow: "hidden",
  },
  tableHeaderTop: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surfaceSoft,
  },
  tableHeaderTextWrap: {
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
  },
  tableSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  filtersRow: {
    gap: 10,
    paddingRight: 8,
  },
  filterButton: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  tableHeadRow: {
    height: 46,
    backgroundColor: COLORS.surfaceSoft,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tableHeadText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "600",
  },
  tableBodyRow: {
    minHeight: 68,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  tableCellText: {
    fontSize: 13,
    color: COLORS.text,
  },
  colLogId: {
    width: 110,
  },
  colType: {
    width: 150,
    justifyContent: "center",
  },
  colActor: {
    width: 220,
  },
  colAction: {
    width: 360,
  },
  colTarget: {
    width: 140,
  },
  colTime: {
    width: 180,
  },
  colStatus: {
    width: 120,
    justifyContent: "center",
  },
  actorCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  actorIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actorText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "600",
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
  },
  typeBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
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
