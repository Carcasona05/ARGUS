import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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

const SUBMITTED_REPORTS = [
  {
    id: "ARG-REP-1001",
    category: "Property-Related Incidents",
    type: "Theft",
    location: "Colon Street, Barangay 6, Cebu City",
    timestamp: "2026-04-18 08:31 PM",
    status: "Pending",
    evidence: "1 Photo",
    description:
      "Witness reported a phone snatching incident near the sidewalk.",
  },
  {
    id: "ARG-REP-1002",
    category: "Traffic and Road Incidents",
    type: "Illegal Parking",
    location: "Osmeña Boulevard, Cebu City",
    timestamp: "2026-04-18 07:52 PM",
    status: "Verified",
    evidence: "2 Photos",
    description: "Vehicle parked across one lane and slowed traffic flow.",
  },
  {
    id: "ARG-REP-1003",
    category: "Suspicious Activities",
    type: "Suspicious Person",
    location: "Fuente Circle, Cebu City",
    timestamp: "2026-04-18 07:14 PM",
    status: "Rejected",
    evidence: "No File",
    description: "Reported suspicious loitering near the entrance area.",
  },
  {
    id: "ARG-REP-1004",
    category: "Community and Environmental Concerns",
    type: "Flooding",
    location: "Mabolo, Barangay Kasambagan, Cebu City",
    timestamp: "2026-04-18 06:48 PM",
    status: "Resolved",
    evidence: "1 Video",
    description: "Roadside flooding observed after heavy rainfall.",
  },
  {
    id: "ARG-REP-1005",
    category: "Public Safety Incidents",
    type: "Public Disturbance",
    location: "Carbon Market Area, Cebu City",
    timestamp: "2026-04-17 11:12 PM",
    status: "Pending",
    evidence: "1 Photo",
    description: "Noise and verbal altercation reported by nearby residents.",
  },
];

const GENERATED_REPORTS = [
  {
    id: "GEN-001",
    title: "Weekly Incident Summary - Metro",
    type: "Incident Summary",
    scope: "Cebu City",
    dateGenerated: "2026-04-18 09:10 PM",
    format: "PDF / CSV",
    generatedBy: "Admin Maria Santos",
  },
  {
    id: "GEN-002",
    title: "Hotspot Analysis Q2",
    type: "Hotspot Analysis",
    scope: "North District",
    dateGenerated: "2026-04-18 05:40 PM",
    format: "PDF",
    generatedBy: "Admin John Reyes",
  },
  {
    id: "GEN-003",
    title: "Validation Performance Snapshot",
    type: "Validation Performance",
    scope: "System-wide",
    dateGenerated: "2026-04-17 04:20 PM",
    format: "CSV",
    generatedBy: "Admin Carla Lim",
  },
  {
    id: "GEN-004",
    title: "Sentiment Analysis Report",
    type: "Sentiment Analysis",
    scope: "South Zone",
    dateGenerated: "2026-04-16 01:15 PM",
    format: "PDF / CSV",
    generatedBy: "Admin Maria Santos",
  },
];

function StatusBadge({ label }) {
  const value = (label || "").toLowerCase();

  let badgeStyle = {
    backgroundColor: COLORS.pendingSoft,
    color: COLORS.primary,
  };

  if (value === "verified") {
    badgeStyle = {
      backgroundColor: COLORS.successSoft,
      color: COLORS.success,
    };
  } else if (value === "rejected") {
    badgeStyle = {
      backgroundColor: COLORS.dangerSoft,
      color: COLORS.danger,
    };
  } else if (value === "resolved") {
    badgeStyle = {
      backgroundColor: COLORS.primarySoft,
      color: COLORS.primary,
    };
  } else if (value === "pending") {
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

function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Text
        style={[styles.tabButtonText, active && styles.tabButtonTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Admin_Reports() {
  const [activeTab, setActiveTab] = useState("Submitted Reports");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [generatedTypeFilter, setGeneratedTypeFilter] = useState("All");

  const statusFilters = ["All", "Pending", "Verified", "Rejected", "Resolved"];
  const generatedTypeFilters = [
    "All",
    "Incident Summary",
    "Hotspot Analysis",
    "Sentiment Analysis",
    "Validation Performance",
  ];

  const filteredSubmittedReports = useMemo(() => {
    return SUBMITTED_REPORTS.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter]);

  const filteredGeneratedReports = useMemo(() => {
    return GENERATED_REPORTS.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase()) ||
        item.scope.toLowerCase().includes(searchText.toLowerCase());

      const matchesType =
        generatedTypeFilter === "All"
          ? true
          : item.type === generatedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchText, generatedTypeFilter]);

  const summaryCards = [
    {
      title: "Submitted Reports",
      value: SUBMITTED_REPORTS.length.toString(),
      subtext: "Master records",
      icon: "documents-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "Pending Reports",
      value: SUBMITTED_REPORTS.filter(
        (item) => item.status === "Pending",
      ).length.toString(),
      subtext: "Awaiting review",
      icon: "time-outline",
      iconBg: COLORS.warningSoft,
      iconColor: COLORS.warning,
      subColor: COLORS.warning,
    },
    {
      title: "Verified Reports",
      value: SUBMITTED_REPORTS.filter(
        (item) => item.status === "Verified",
      ).length.toString(),
      subtext: "Approved records",
      icon: "shield-checkmark-outline",
      iconBg: COLORS.successSoft,
      iconColor: COLORS.success,
      subColor: COLORS.success,
    },
    {
      title: "Generated Reports",
      value: GENERATED_REPORTS.length.toString(),
      subtext: "Exported files",
      icon: "download-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
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

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.tabRow}>
                  <TabButton
                    label="Submitted Reports"
                    active={activeTab === "Submitted Reports"}
                    onPress={() => setActiveTab("Submitted Reports")}
                  />
                  <TabButton
                    label="Generated Reports"
                    active={activeTab === "Generated Reports"}
                    onPress={() => setActiveTab("Generated Reports")}
                  />
                </View>
              </View>

              <View style={styles.toolbar}>
                <View style={styles.searchWrap}>
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={COLORS.textMuted}
                  />
                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={
                      activeTab === "Submitted Reports"
                        ? "Search by ID, type, location, or status"
                        : "Search by title, type, scope, or ID"
                    }
                    placeholderTextColor={COLORS.textMuted}
                    style={styles.searchInput}
                  />
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterRow}
                >
                  {(activeTab === "Submitted Reports"
                    ? statusFilters
                    : generatedTypeFilters
                  ).map((filter) => {
                    const active =
                      activeTab === "Submitted Reports"
                        ? statusFilter === filter
                        : generatedTypeFilter === filter;

                    return (
                      <TouchableOpacity
                        key={filter}
                        style={[
                          styles.filterButton,
                          active && styles.filterButtonActive,
                        ]}
                        onPress={() =>
                          activeTab === "Submitted Reports"
                            ? setStatusFilter(filter)
                            : setGeneratedTypeFilter(filter)
                        }
                      >
                        <Text
                          style={[
                            styles.filterButtonText,
                            active && styles.filterButtonTextActive,
                          ]}
                        >
                          {filter}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {activeTab === "Submitted Reports" ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <View style={styles.tableHeadRow}>
                      <Text style={[styles.tableHeadText, styles.colId]}>
                        Report ID
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colCategory]}>
                        Category
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colType]}>
                        Type
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colLocation]}>
                        Location
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colTime]}>
                        Timestamp
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colStatus]}>
                        Status
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colEvidence]}>
                        Evidence
                      </Text>
                      <Text
                        style={[styles.tableHeadText, styles.colDescription]}
                      >
                        Description
                      </Text>
                      <Text style={[styles.tableHeadText, styles.colAction]}>
                        Action
                      </Text>
                    </View>

                    {filteredSubmittedReports.map((row) => (
                      <View key={row.id} style={styles.tableBodyRow}>
                        <Text style={[styles.tableCellText, styles.colId]}>
                          {row.id}
                        </Text>
                        <Text
                          style={[styles.tableCellText, styles.colCategory]}
                        >
                          {row.category}
                        </Text>
                        <Text
                          style={[
                            styles.tableCellText,
                            styles.colType,
                            styles.typeText,
                          ]}
                        >
                          {row.type}
                        </Text>
                        <Text
                          style={[styles.tableCellText, styles.colLocation]}
                          numberOfLines={2}
                        >
                          {row.location}
                        </Text>
                        <Text style={[styles.tableCellText, styles.colTime]}>
                          {row.timestamp}
                        </Text>

                        <View style={styles.colStatus}>
                          <StatusBadge label={row.status} />
                        </View>

                        <Text
                          style={[styles.tableCellText, styles.colEvidence]}
                        >
                          {row.evidence}
                        </Text>

                        <Text
                          style={[styles.tableCellText, styles.colDescription]}
                          numberOfLines={2}
                        >
                          {row.description}
                        </Text>

                        <View style={styles.colAction}>
                          <TouchableOpacity style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>
                              View Details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <View style={styles.tableHeadRow}>
                      <Text style={[styles.tableHeadText, styles.genColId]}>
                        Report ID
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColTitle]}>
                        Report Title
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColType]}>
                        Type
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColScope]}>
                        Scope
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColDate]}>
                        Date Generated
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColFormat]}>
                        Format
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColBy]}>
                        Generated By
                      </Text>
                      <Text style={[styles.tableHeadText, styles.genColAction]}>
                        Action
                      </Text>
                    </View>

                    {filteredGeneratedReports.map((row) => (
                      <View key={row.id} style={styles.tableBodyRow}>
                        <Text style={[styles.tableCellText, styles.genColId]}>
                          {row.id}
                        </Text>
                        <Text
                          style={[styles.tableCellText, styles.genColTitle]}
                        >
                          {row.title}
                        </Text>
                        <Text style={[styles.tableCellText, styles.genColType]}>
                          {row.type}
                        </Text>
                        <Text
                          style={[styles.tableCellText, styles.genColScope]}
                        >
                          {row.scope}
                        </Text>
                        <Text style={[styles.tableCellText, styles.genColDate]}>
                          {row.dateGenerated}
                        </Text>
                        <Text
                          style={[styles.tableCellText, styles.genColFormat]}
                        >
                          {row.format}
                        </Text>
                        <Text style={[styles.tableCellText, styles.genColBy]}>
                          {row.generatedBy}
                        </Text>

                        <View style={styles.genColAction}>
                          <View style={styles.downloadActions}>
                            <TouchableOpacity style={styles.smallActionButton}>
                              <Text style={styles.smallActionButtonText}>
                                PDF
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.smallActionButton}>
                              <Text style={styles.smallActionButtonText}>
                                CSV
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Reports Overview</Text>

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Pending</Text>
                <Text style={styles.breakdownCount}>
                  {
                    SUBMITTED_REPORTS.filter(
                      (item) => item.status === "Pending",
                    ).length
                  }
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Verified</Text>
                <Text style={styles.breakdownCount}>
                  {
                    SUBMITTED_REPORTS.filter(
                      (item) => item.status === "Verified",
                    ).length
                  }
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Rejected</Text>
                <Text style={styles.breakdownCount}>
                  {
                    SUBMITTED_REPORTS.filter(
                      (item) => item.status === "Rejected",
                    ).length
                  }
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Resolved</Text>
                <Text style={styles.breakdownCount}>
                  {
                    SUBMITTED_REPORTS.filter(
                      (item) => item.status === "Resolved",
                    ).length
                  }
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Generated Files</Text>
                <Text style={styles.breakdownCount}>
                  {GENERATED_REPORTS.length}
                </Text>
              </View>
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Reports Module Notes</Text>

              <View style={styles.notesContent}>
                <Text style={styles.notesHeading}>Submitted Reports</Text>
                <Text style={styles.notesText}>
                  Shows all incident submissions with search, status tracking,
                  evidence viewing, and full record management.
                </Text>

                <Text style={[styles.notesHeading, styles.notesHeadingSpacing]}>
                  Generated Reports
                </Text>
                <Text style={styles.notesText}>
                  Stores exported summaries such as incident summary, hotspot
                  analysis, sentiment analysis, and validation performance.
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
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surfaceSoft,
  },
  tabRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  tabButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },
  tabButtonTextActive: {
    color: COLORS.white,
  },
  toolbar: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
    gap: 12,
  },
  searchWrap: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  filterRow: {
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
  typeText: {
    fontWeight: "600",
  },
  colId: {
    width: 120,
  },
  colCategory: {
    width: 220,
  },
  colType: {
    width: 140,
  },
  colLocation: {
    width: 220,
  },
  colTime: {
    width: 180,
  },
  colStatus: {
    width: 120,
    justifyContent: "center",
  },
  colEvidence: {
    width: 100,
  },
  colDescription: {
    width: 280,
  },
  colAction: {
    width: 140,
  },
  genColId: {
    width: 110,
  },
  genColTitle: {
    width: 280,
  },
  genColType: {
    width: 180,
  },
  genColScope: {
    width: 150,
  },
  genColDate: {
    width: 180,
  },
  genColFormat: {
    width: 120,
  },
  genColBy: {
    width: 180,
  },
  genColAction: {
    width: 140,
    justifyContent: "center",
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
  scoreBadge: {
    minWidth: 84,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  viewButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 10,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  downloadActions: {
    flexDirection: "row",
    gap: 8,
  },
  smallActionButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 10,
  },
  smallActionButtonText: {
    color: COLORS.primary,
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
