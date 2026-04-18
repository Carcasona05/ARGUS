import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Admin_Layout from "../../components/Admin_Layout";
import Admin_ViewValidation from "../../components/Admin_ViewValidation";

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

function ScoreBadge({ label }) {
  const value = (label || "").toLowerCase();

  let badgeStyle = {
    backgroundColor: COLORS.warningSoft,
    color: COLORS.warning,
  };

  if (value === "high") {
    badgeStyle = {
      backgroundColor: COLORS.successSoft,
      color: COLORS.success,
    };
  } else if (value === "low") {
    badgeStyle = {
      backgroundColor: COLORS.dangerSoft,
      color: COLORS.danger,
    };
  }

  return (
    <View
      style={[
        styles.scoreBadge,
        { backgroundColor: badgeStyle.backgroundColor },
      ]}
    >
      <Text style={[styles.scoreBadgeText, { color: badgeStyle.color }]}>
        {label}
      </Text>
    </View>
  );
}

const getSentimentColor = (sentiment) => {
  const value = (sentiment || "").toLowerCase();

  if (value === "fearful") return COLORS.danger;
  if (value === "anxious" || value === "concerned") return COLORS.warning;
  return COLORS.textMuted;
};

export default function Admin_Validation() {
  const [reports, setReports] = useState([
    {
      id: "ARG-VAL-1001",
      category: "Property-Related Incidents",
      type: "Theft",
      location: "Colon Street, Barangay 6, Cebu City",
      coordinates: "10.2956, 123.8981",
      timestamp: "2026-04-18 08:31 PM",
      status: "Pending",
      sentiment: "Anxious",
      credibility: "High",
      aiReview:
        "The report includes a complete location, clear time reference, and consistent incident details. Nearby verified theft reports in the same zone increase confidence.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      comments: [
        {
          author: "Juan Dela Cruz",
          timestamp: "2026-04-18 08:40 PM",
          text: "I saw two individuals running toward the corner after the incident.",
        },
        {
          author: "Maria Santos",
          timestamp: "2026-04-18 08:45 PM",
          text: "The victim looked shaken and was asking nearby vendors for help.",
        },
      ],
    },
    {
      id: "ARG-VAL-1002",
      category: "Traffic and Road Incidents",
      type: "Illegal Parking",
      location: "Osmeña Boulevard, Barangay Capitol Site, Cebu City",
      coordinates: "10.3094, 123.8912",
      timestamp: "2026-04-18 07:52 PM",
      status: "Pending",
      sentiment: "Neutral",
      credibility: "Medium",
      aiReview:
        "Report is structurally valid but lacks strong supporting detail. Location is usable, though the description may need clarification for enforcement priority.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      comments: [
        {
          author: "Traffic Watch Volunteer",
          timestamp: "2026-04-18 07:58 PM",
          text: "The parked vehicle is blocking one lane and slowing traffic.",
        },
      ],
    },
    {
      id: "ARG-VAL-1003",
      category: "Suspicious Activities",
      type: "Suspicious Person",
      location: "Fuente Circle, Barangay Sta. Cruz, Cebu City",
      coordinates: "10.3102, 123.8915",
      timestamp: "2026-04-18 07:14 PM",
      status: "Pending",
      sentiment: "Fearful",
      credibility: "High",
      aiReview:
        "The narrative shows urgency and includes a specific place description. Similar suspicious presence reports were recently submitted nearby, suggesting a possible cluster.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      comments: [
        {
          author: "Nearby Resident",
          timestamp: "2026-04-18 07:18 PM",
          text: "The person stayed near the entrance for several minutes and kept watching passersby.",
        },
        {
          author: "Security Guard",
          timestamp: "2026-04-18 07:22 PM",
          text: "We noticed similar behavior yesterday in the same area.",
        },
      ],
    },
    {
      id: "ARG-VAL-1004",
      category: "Community and Environmental Concerns",
      type: "Flooding",
      location: "Mabolo, Barangay Kasambagan, Cebu City",
      coordinates: "10.3217, 123.9090",
      timestamp: "2026-04-18 06:48 PM",
      status: "Pending",
      sentiment: "Concerned",
      credibility: "Low",
      aiReview:
        "The report includes a broad location but limited situational detail. No matching environmental alerts were detected in recent submissions, so manual review is recommended.",
      image:
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80",
      comments: [
        {
          author: "Barangay Staff",
          timestamp: "2026-04-18 06:55 PM",
          text: "Water buildup was reported, but the exact drainage point still needs confirmation.",
        },
      ],
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const summaryCards = [
    {
      title: "Pending Reviews",
      value: reports
        .filter((item) => item.status === "Pending")
        .length.toString(),
      subtext: "Needs validation",
      icon: "time-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
    {
      title: "Verified Reports",
      value: reports
        .filter((item) => item.status === "Verified")
        .length.toString(),
      subtext: "Mapped incidents",
      icon: "shield-checkmark-outline",
      iconBg: COLORS.successSoft,
      iconColor: COLORS.success,
      subColor: COLORS.success,
    },
    {
      title: "Rejected Reports",
      value: reports
        .filter((item) => item.status === "Rejected")
        .length.toString(),
      subtext: "Not accepted",
      icon: "close-circle-outline",
      iconBg: COLORS.dangerSoft,
      iconColor: COLORS.danger,
      subColor: COLORS.danger,
    },
    {
      title: "Resolved Incidents",
      value: reports
        .filter((item) => item.status === "Resolved")
        .length.toString(),
      subtext: "Handled cases",
      icon: "checkmark-done-outline",
      iconBg: COLORS.primarySoft,
      iconColor: COLORS.primary,
      subColor: COLORS.primary,
    },
  ];

  const categoryBreakdown = [
    "Property-Related Incidents",
    "Traffic and Road Incidents",
    "Suspicious Activities",
    "Community and Environmental Concerns",
  ];

  const pendingReports = reports.filter((item) => item.status === "Pending");

  const handleOpenReport = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const handleVerify = (report) => {
    setReports((prev) =>
      prev.map((item) =>
        item.id === report.id ? { ...item, status: "Verified" } : item,
      ),
    );
    setSelectedReport((prev) =>
      prev ? { ...prev, status: "Verified" } : prev,
    );
    setModalVisible(false);
  };

  const handleReject = (report) => {
    setReports((prev) =>
      prev.map((item) =>
        item.id === report.id ? { ...item, status: "Rejected" } : item,
      ),
    );
    setSelectedReport((prev) =>
      prev ? { ...prev, status: "Rejected" } : prev,
    );
    setModalVisible(false);
  };

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
                <View>
                  <Text style={styles.tableTitle}>Validation Queue</Text>
                  <Text style={styles.tableSubtitle}>
                    Review pending incident submissions before they become
                    official mapped reports.
                  </Text>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeadRow}>
                    <Text style={[styles.tableHeadText, styles.colId]}>
                      Incident ID
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
                    <Text style={[styles.tableHeadText, styles.colSentiment]}>
                      Sentiment
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colCredibility]}>
                      Credibility
                    </Text>
                    <Text style={[styles.tableHeadText, styles.colAction]}>
                      Action
                    </Text>
                  </View>

                  {pendingReports.map((row) => (
                    <TouchableOpacity
                      key={row.id}
                      onPress={() => handleOpenReport(row)}
                      activeOpacity={0.85}
                      style={styles.tableBodyRow}
                    >
                      <Text style={[styles.tableCellText, styles.colId]}>
                        {row.id}
                      </Text>

                      <Text style={[styles.tableCellText, styles.colCategory]}>
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
                        style={[
                          styles.tableCellText,
                          styles.colSentiment,
                          {
                            color: getSentimentColor(row.sentiment),
                            fontWeight: "700",
                          },
                        ]}
                      >
                        {row.sentiment}
                      </Text>

                      <View style={styles.colCredibility}>
                        <ScoreBadge label={row.credibility} />
                      </View>

                      <View style={styles.colAction}>
                        <View style={styles.viewButton}>
                          <Text style={styles.viewButtonText}>View</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>
                Incident Category Breakdown
              </Text>

              {categoryBreakdown.map((category) => {
                const count = reports.filter(
                  (item) => item.category === category,
                ).length;

                return (
                  <View key={category} style={styles.breakdownRow}>
                    <Text style={styles.breakdownText}>{category}</Text>
                    <Text style={styles.breakdownCount}>{count}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>AI Review Notes</Text>

              <View style={styles.notesContent}>
                <Text style={styles.notesHeading}>Validation Logic</Text>
                <Text style={styles.notesText}>
                  AI credibility and sentiment are advisory. Final validation
                  and mapping decisions remain under the administrator.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Admin_ViewValidation
        visible={modalVisible}
        report={selectedReport}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onReject={handleReject}
      />
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
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: "center",
    backgroundColor: COLORS.surfaceSoft,
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
    minHeight: 66,
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
  colSentiment: {
    width: 140,
  },
  colCredibility: {
    width: 130,
    justifyContent: "center",
  },
  colAction: {
    width: 120,
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
    alignSelf: "flex-start",
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
  notesText: {
    color: COLORS.textMuted,
    lineHeight: 21,
    fontSize: 13,
  },
});
