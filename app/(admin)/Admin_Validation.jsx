import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Admin_Layout from "../../components/Admin_Layout";

export default function Admin_Validation() {
  const summaryCards = [
    {
      title: "Active Incidents",
      value: "147",
      subtext: "▲ 8%",
      subColor: "#22A06B",
      icon: "flash-outline",
      iconType: "Ionicons",
      iconBg: "#EAF2FF",
      iconColor: "#4F8EF7",
    },
    {
      title: "Critical Hotspots",
      value: "4 Active",
      subtext: "",
      subColor: "#E45757",
      icon: "warning-outline",
      iconType: "Ionicons",
      iconBg: "#FDEEEE",
      iconColor: "#E45757",
    },
    {
      title: "Avg. Sentiment",
      value: "3.8/5.0",
      subtext: "Anxious",
      subColor: "#D97A1E",
      icon: "happy-outline",
      iconType: "Ionicons",
      iconBg: "#FFF4E5",
      iconColor: "#E5A12F",
    },
    {
      title: "Credibility Rate",
      value: "92%",
      subtext: "Validated",
      subColor: "#22A06B",
      icon: "shield-checkmark-outline",
      iconType: "Ionicons",
      iconBg: "#EAF8F1",
      iconColor: "#2BAE66",
    },
  ];

  const validationRows = [
    {
      id: "133001001",
      type: "Theft",
      timestamp: "2023-12-07 13:31 PM",
      sentiment: "Anxious",
      sentimentColor: "#D97A1E",
      aiScore: "High",
      aiColor: "#22A06B",
      pinColor: "#3DBB74",
    },
    {
      id: "133001002",
      type: "Assault",
      timestamp: "2023-12-07 13:33 PM",
      sentiment: "Neutral",
      sentimentColor: "#B96A19",
      aiScore: "High",
      aiColor: "#22A06B",
      pinColor: "#F56B6B",
    },
    {
      id: "133001004",
      type: "Theft",
      timestamp: "2023-12-07 13:34 PM",
      sentiment: "Medium",
      sentimentColor: "#C77315",
      aiScore: "Medium",
      aiColor: "#E29A2D",
      pinColor: "#F56B6B",
    },
    {
      id: "133001005",
      type: "Fire",
      timestamp: "2023-12-07 13:34 PM",
      sentiment: "Medium",
      sentimentColor: "#C77315",
      aiScore: "Medium",
      aiColor: "#E29A2D",
      pinColor: "#3DBB74",
    },
    {
      id: "133001006",
      type: "Accident",
      timestamp: "2023-12-07 13:38 PM",
      sentiment: "Neutral",
      sentimentColor: "#B96A19",
      aiScore: "Low",
      aiColor: "#E45757",
      pinColor: "#F29A2E",
    },
    {
      id: "133001007",
      type: "Fire",
      timestamp: "2023-12-07 13:33 PM",
      sentiment: "High",
      sentimentColor: "#1FA463",
      actionType: "approve",
      pinColor: "#F56B6B",
    },
    {
      id: "133001008",
      type: "Accident",
      timestamp: "2023-12-07 13:36 PM",
      sentiment: "Medium",
      sentimentColor: "#C77315",
      actionType: "reject",
      pinColor: "#3DBB74",
    },
    {
      id: "133001009",
      type: "Theft",
      timestamp: "2023-12-07 13:34 PM",
      sentiment: "Medium",
      sentimentColor: "#C77315",
      actionType: "clarify",
      pinColor: "#F56B6B",
    },
    {
      id: "133001010",
      type: "Assault",
      timestamp: "2023-12-07 13:38 PM",
      sentiment: "Neutral",
      sentimentColor: "#D97A1E",
      actionType: "feedback",
      pinColor: "#F56B6B",
    },
    {
      id: "133001011",
      type: "Accident",
      timestamp: "2023-12-21 14:30 PM",
      sentiment: "Low",
      sentimentColor: "#E45757",
      pinColor: "#F29A2E",
    },
    {
      id: "133001012",
      type: "Assault",
      timestamp: "2023-11-21 14:36 PM",
      sentiment: "Neutral",
      sentimentColor: "#B96A19",
      pinColor: "#3DBB74",
    },
    {
      id: "133001013",
      type: "Accident",
      timestamp: "2023-12-21 14:39 PM",
      sentiment: "Low",
      sentimentColor: "#E45757",
      pinColor: "#F56B6B",
    },
  ];

  const renderIcon = (card) => {
    if (card.iconType === "MaterialIcons") {
      return <MaterialIcons name={card.icon} size={24} color={card.iconColor} />;
    }
    if (card.iconType === "Feather") {
      return <Feather name={card.icon} size={24} color={card.iconColor} />;
    }
    return <Ionicons name={card.icon} size={24} color={card.iconColor} />;
  };

  const renderPinCard = (color) => {
    return (
      <View style={styles.locationThumb}>
        <View style={styles.locationMapBg} />
        <Ionicons name="location-sharp" size={22} color={color} />
      </View>
    );
  };

  const renderAiCell = (row) => {
    if (row.actionType === "approve") {
      return (
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.approveButtonText}>Approve &amp; Map</Text>
        </TouchableOpacity>
      );
    }

    if (row.actionType === "reject") {
      return (
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      );
    }

    if (row.actionType === "clarify") {
      return (
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Request Clarification</Text>
        </TouchableOpacity>
      );
    }

    if (row.actionType === "feedback") {
      return (
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>Feedback to AI</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#5D6F92" />
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[
          styles.scoreBadge,
          {
            backgroundColor:
              row.aiColor === "#22A06B"
                ? "#CFEFDD"
                : row.aiColor === "#E29A2D"
                ? "#F8E1B8"
                : "#F6C9C9",
          },
        ]}
      >
        <Text style={[styles.scoreBadgeText, { color: row.aiColor }]}>
          {row.aiScore}
        </Text>
      </View>
    );
  };

  return (
    <Admin_Layout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrap}>
          <View style={styles.leftSection}>
            <View style={styles.summaryRow}>
              {summaryCards.map((card, index) => (
                <View key={index} style={styles.summaryCard}>
                  <View style={[styles.summaryIconWrap, { backgroundColor: card.iconBg }]}>
                    {renderIcon(card)}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.summaryTitle}>{card.title}</Text>
                    <View style={styles.summaryValueRow}>
                      <Text
                        style={[
                          styles.summaryValue,
                          card.title === "Critical Hotspots" && { color: "#E45757" },
                        ]}
                      >
                        {card.value}
                      </Text>

                      {!!card.subtext && (
                        <Text style={[styles.summarySubtext, { color: card.subColor }]}>
                          {card.subtext}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tableCard}>
              <View style={styles.tableHeaderTop}>
                <Text style={styles.tableTitle}>Validation Queue</Text>

                <View style={styles.tableHeaderControls}>
                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="layers-outline" size={16} color="#5D6F92" />
                    <Text style={styles.controlButtonText}>Layer | Zoom</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Finding</Text>
                    <Ionicons name="chevron-down-outline" size={16} color="#5D6F92" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeadRow}>
                    <Text style={[styles.tableHeadText, styles.colId]}>Incident ID</Text>
                    <Text style={[styles.tableHeadText, styles.colType]}>Type</Text>
                    <Text style={[styles.tableHeadText, styles.colLocation]}>Reported Location</Text>
                    <Text style={[styles.tableHeadText, styles.colTime]}>Timestamp</Text>
                    <Text style={[styles.tableHeadText, styles.colSentiment]}>Reported Sentiment</Text>
                    <Text style={[styles.tableHeadText, styles.colScore]}>AI Credibility Score</Text>
                  </View>

                  {validationRows.map((row, index) => (
                    <View key={index} style={styles.tableBodyRow}>
                      <Text style={[styles.tableCellText, styles.colId]}>{row.id}</Text>
                      <Text style={[styles.tableCellText, styles.colType]}>{row.type}</Text>
                      <View style={styles.colLocation}>{renderPinCard(row.pinColor)}</View>
                      <Text style={[styles.tableCellText, styles.colTime]}>{row.timestamp}</Text>
                      <Text
                        style={[
                          styles.tableCellText,
                          styles.colSentiment,
                          { color: row.sentimentColor, fontWeight: "500" },
                        ]}
                      >
                        {row.sentiment}
                      </Text>
                      <View style={styles.colScore}>{renderAiCell(row)}</View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>System Health Metrics</Text>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Total Logs (24h)</Text>
                <Text style={[styles.metricValue, { color: "#22A06B" }]}>1,335</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Notification Dispatch Count</Text>
                <Text style={[styles.metricValue, { color: "#3B82F6" }]}>222</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Critical Events</Text>
                <Text style={[styles.metricValue, { color: "#E45757" }]}>0</Text>
              </View>

              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>AI Model Version: 4.3.01</Text>
              </View>
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Full geospatial content</Text>
              <View style={styles.mapPreview}>
                <View style={styles.heatOne} />
                <View style={styles.heatTwo} />
                <View style={styles.heatThree} />
                <View style={styles.mapPinBlue} />
                <View style={styles.mapPinYellow} />
                <View style={styles.mapPinGreen} />
              </View>
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>AI Credibility analysis</Text>

              <View style={styles.analysisRow}>
                <View style={styles.analysisCol}>
                  <View style={[styles.analysisBar, { backgroundColor: "#3B82F6" }]} />
                  <View>
                    <Text style={styles.analysisHead}>H 1: High Risk</Text>
                    <Text style={[styles.analysisSub, { color: "#22A06B" }]}>
                      AI Credibility Score{"\n"}Validated - 86%
                    </Text>
                  </View>
                </View>

                <View style={styles.analysisDivider} />

                <View style={styles.analysisCol}>
                  <View style={[styles.analysisBar, { backgroundColor: "#E29A2D" }]} />
                  <View>
                    <Text style={styles.analysisHead}>Rise H2</Text>
                    <Text style={[styles.analysisSub, { color: "#E45757" }]}>
                      Sentiment{"\n"}Fear/Anger
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.feedbackSideButton}>
                <Text style={styles.feedbackSideButtonText}>Feedback to AI</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Recently Validated</Text>

              {[
                { color: "#4F8EF7", text: "Theft near to Colon St.", time: "14:18" },
                { color: "#F56B6B", text: "Theft near to Colon St.", time: "14:18" },
                { color: "#4F8EF7", text: "Theft near to Colon St.", time: "14:18" },
              ].map((item, index) => (
                <View key={index} style={styles.recentRow}>
                  <View style={styles.recentLeft}>
                    <View style={[styles.recentDot, { backgroundColor: item.color }]} />
                    <Text style={styles.recentText}>{item.text}</Text>
                  </View>
                  <Text style={styles.recentTime}>{item.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Admin_Layout>
  );
}

const styles = {
  scrollContent: {
    paddingBottom: 24,
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
    width: 280,
    gap: 12,
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
    borderRadius: 14,
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

  summaryTitle: {
    fontSize: 14,
    color: "#4B5D7A",
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
    color: "#2E3F63",
  },

  summarySubtext: {
    fontSize: 13,
    fontWeight: "600",
  },

  tableCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    overflow: "hidden",
  },

  tableHeaderTop: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FBFF",
  },

  tableTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#294880",
  },

  tableHeaderControls: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  controlButton: {
    height: 30,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCD6E8",
    borderRadius: 8,
    backgroundColor: "#F9FBFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  controlButtonText: {
    fontSize: 13,
    color: "#5D6F92",
    fontWeight: "500",
  },

  filterButton: {
    width: 130,
    height: 34,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCD6E8",
    borderRadius: 8,
    backgroundColor: "#FFFDF8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filterButtonText: {
    fontSize: 13,
    color: "#4B5D7A",
    fontWeight: "500",
  },

  tableHeadRow: {
    height: 44,
    backgroundColor: "#F7F9FD",
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  tableHeadText: {
    fontSize: 13,
    color: "#4B5D7A",
    fontWeight: "600",
  },

  tableBodyRow: {
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },

  tableCellText: {
    fontSize: 13,
    color: "#2F4267",
  },

  colId: {
    width: 120,
  },

  colType: {
    width: 90,
  },

  colLocation: {
    width: 155,
    justifyContent: "center",
  },

  colTime: {
    width: 175,
  },

  colSentiment: {
    width: 150,
  },

  colScore: {
    width: 185,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  locationThumb: {
    width: 110,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#EAF1FB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  locationMapBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#DCE8F8",
    opacity: 0.7,
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

  approveButton: {
    minWidth: 172,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#35C27B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  approveButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  rejectButton: {
    minWidth: 172,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#F2A0A0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  rejectButtonText: {
    color: "#E45757",
    fontSize: 13,
    fontWeight: "700",
  },

  outlineButton: {
    minWidth: 172,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#C9D4E8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  outlineButtonText: {
    color: "#445A84",
    fontSize: 13,
    fontWeight: "600",
  },

  dropdownButton: {
    minWidth: 172,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#C9D4E8",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    flexDirection: "row",
  },

  dropdownButtonText: {
    color: "#445A84",
    fontSize: 13,
    fontWeight: "600",
  },

  sideCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 12,
    overflow: "hidden",
  },

  sideCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#294880",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
  },

  metricItem: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  metricLabel: {
    fontSize: 13,
    color: "#4B5D7A",
    lineHeight: 20,
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },

  mapPreview: {
    height: 135,
    margin: 16,
    borderRadius: 10,
    backgroundColor: "#CAE7DE",
    overflow: "hidden",
    position: "relative",
  },

  heatOne: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,98,0,0.45)",
    top: 26,
    left: 108,
  },

  heatTwo: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,0,0,0.38)",
    top: 62,
    left: 152,
  },

  heatThree: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,143,0,0.40)",
    top: 42,
    left: 74,
  },

  mapPinBlue: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    top: 32,
    left: 42,
  },

  mapPinYellow: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
    top: 24,
    left: 182,
  },

  mapPinGreen: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    top: 88,
    left: 28,
  },

  analysisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },

  analysisCol: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },

  analysisBar: {
    width: 3,
    height: 72,
    borderRadius: 3,
    marginRight: 12,
    marginTop: 2,
  },

  analysisHead: {
    fontSize: 13,
    fontWeight: "700",
    color: "#33476B",
    marginBottom: 8,
  },

  analysisSub: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },

  analysisDivider: {
    width: 1,
    backgroundColor: "#D9E2F0",
    marginHorizontal: 12,
  },

  feedbackSideButton: {
    marginHorizontal: 18,
    marginBottom: 14,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C9D4E8",
    backgroundColor: "#F8FAFD",
    alignItems: "center",
    justifyContent: "center",
  },

  feedbackSideButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#445A84",
  },

  recentRow: {
    minHeight: 46,
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  recentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  recentDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },

  recentText: {
    fontSize: 13,
    color: "#33476B",
  },

  recentTime: {
    fontSize: 13,
    color: "#5D6F92",
  },
};