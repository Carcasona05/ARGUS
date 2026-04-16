import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Admin_Layout from "../../components/Admin_Layout";

export default function Admin_Dashboard() {
  const summaryCards = [
    {
      title: "Active Incidents",
      value: "147",
      subtext: "▲ 8%",
      subColor: "#22A06B",
      icon: "flash-outline",
      iconBg: "#EAF2FF",
      iconColor: "#4F8EF7",
    },
    {
      title: "Critical Hotspots",
      value: "4 Active",
      subtext: "",
      subColor: "#E45757",
      icon: "warning-outline",
      iconBg: "#FDEEEE",
      iconColor: "#E45757",
    },
    {
      title: "Avg. Sentiment",
      value: "3.8/5.0",
      subtext: "Anxious",
      subColor: "#D97A1E",
      icon: "happy-outline",
      iconBg: "#FFF4E5",
      iconColor: "#E5A12F",
    },
    {
      title: "Credibility Rate",
      value: "92%",
      subtext: "Validated",
      subColor: "#22A06B",
      icon: "shield-checkmark-outline",
      iconBg: "#EAF8F1",
      iconColor: "#2BAE66",
    },
  ];

  const incidentFeed = [
    {
      title: "Theft near Colon St.",
      location: "Suspicious activity blvd.",
      score: "96%",
      sentiment: "Fear/Anger",
      time: "14:18",
    },
    {
      title: "Theft near Colon St.",
      location: "Suspicious activity blvd.",
      score: "96%",
      sentiment: "Fear/Anger",
      time: "14:18",
    },
    {
      title: "Theft near Colon St.",
      location: "Suspicious activity blvd.",
      score: "96%",
      sentiment: "Fear/Anger",
      time: "14:18",
    },
    {
      title: "Theft near Colon St.",
      location: "Suspicious activity blvd.",
      score: "95%",
      sentiment: "Fear/Anger",
      time: "14:18",
    },
  ];

  const mapPins = [
    { top: "15%", left: "12%", color: "#F56B6B" },
    { top: "18%", left: "24%", color: "#F29A2E" },
    { top: "11%", left: "36%", color: "#4F8EF7" },
    { top: "16%", left: "44%", color: "#F56B6B" },
    { top: "10%", left: "54%", color: "#3DBB74" },
    { top: "15%", left: "66%", color: "#4F8EF7" },
    { top: "28%", left: "21%", color: "#F56B6B", label: "H1" },
    { top: "32%", left: "46%", color: "#F56B6B" },
    { top: "26%", left: "70%", color: "#F56B6B", label: "H3" },
    { top: "44%", left: "28%", color: "#3DBB74" },
    { top: "50%", left: "52%", color: "#F29A2E", label: "H4" },
    { top: "57%", left: "14%", color: "#4F8EF7" },
  ];

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

                  <View style={{ flex: 1 }}>
                    <Text style={styles.summaryTitle}>{card.title}</Text>
                    <View style={styles.summaryValueRow}>
                      <Text
                        style={[
                          styles.summaryValue,
                          card.title === "Critical Hotspots" && {
                            color: "#E45757",
                          },
                        ]}
                      >
                        {card.value}
                      </Text>

                      {!!card.subtext && (
                        <Text
                          style={[
                            styles.summarySubtext,
                            { color: card.subColor },
                          ]}
                        >
                          {card.subtext}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.mainCard}>
              <View style={styles.cardHeaderTop}>
                <Text style={styles.cardTitle}>Validation Queue</Text>

                <View style={styles.cardHeaderControls}>
                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="layers-outline" size={16} color="#5D6F92" />
                    <Text style={styles.controlButtonText}>Layer</Text>
                    <Ionicons
                      name="chevron-down-outline"
                      size={14}
                      color="#5D6F92"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="expand-outline" size={16} color="#5D6F92" />
                    <Text style={styles.controlButtonText}>Zoom</Text>
                    <Ionicons
                      name="chevron-down-outline"
                      size={14}
                      color="#5D6F92"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={16} color="#5D6F92" />
                    <Text style={styles.filterButtonText}>Dynamic Filter</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.mapCardBody}>
                <View style={styles.mapArea}>
                  <View style={styles.mapBg} />

                  <View style={styles.roadOne} />
                  <View style={styles.roadTwo} />
                  <View style={styles.roadThree} />
                  <View style={styles.roadFour} />

                  <View style={styles.waterArea} />

                  <View style={styles.heatOne} />
                  <View style={styles.heatTwo} />
                  <View style={styles.heatThree} />

                  {mapPins.map((pin, index) => (
                    <View
                      key={index}
                      style={[styles.pinWrap, { top: pin.top, left: pin.left }]}
                    >
                      <Ionicons
                        name="location-sharp"
                        size={25}
                        color={pin.color}
                      />
                      {pin.label ? (
                        <View style={styles.hotspotBadge}>
                          <Text style={styles.hotspotBadgeText}>
                            {pin.label}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ))}

                  <View style={styles.centerUserWrap}>
                    <View style={styles.centerUserOuter}>
                      <View style={styles.centerUserInner}>
                        <Ionicons name="person" size={18} color="#FFFFFF" />
                      </View>
                    </View>
                  </View>

                  <Text style={styles.cityLabel}>Cebu City</Text>

                  <View style={styles.legendCard}>
                    <Text style={styles.legendTitle}>Incidents:</Text>

                    <View style={styles.legendItem}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: "#F56B6B" },
                        ]}
                      />
                      <Text style={styles.legendText}>Theft</Text>
                    </View>

                    <View style={styles.legendItem}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: "#4F8EF7" },
                        ]}
                      />
                      <Text style={styles.legendText}>Fire</Text>
                    </View>

                    <View style={styles.legendItem}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: "#3DBB74" },
                        ]}
                      />
                      <Text style={styles.legendText}>Accident</Text>
                    </View>
                  </View>

                  <View style={styles.zoomBox}>
                    <TouchableOpacity style={styles.zoomBtn}>
                      <Text style={styles.zoomText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.zoomBtn}>
                      <Text style={styles.zoomText}>−</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.sideCard}>
              <Text style={styles.sideCardTitle}>Incident Feed</Text>

              {incidentFeed.map((item, index) => (
                <View
                  key={index}
                  style={[styles.feedRow, index !== 0 && styles.feedRowBorder]}
                >
                  <View style={styles.feedTopRow}>
                    <View style={styles.feedTitleWrap}>
                      <Ionicons name="warning" size={15} color="#E45757" />
                      <Text style={styles.feedTitle}>{item.title}</Text>
                    </View>
                    <Text style={styles.feedTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.feedLocation}>{item.location}</Text>

                  <Text style={styles.feedMeta}>
                    AI Credibility Score:{" "}
                    <Text style={styles.feedScore}>{item.score}</Text>
                  </Text>

                  <Text style={styles.feedMeta}>
                    Validated -{" "}
                    <Text style={styles.feedValidated}>{item.score}</Text>{" "}
                    <Text style={styles.feedSentiment}>{item.sentiment}</Text>
                  </Text>
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
    width: 300,
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

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    overflow: "hidden",
  },

  cardHeaderTop: {
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FBFF",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#294880",
  },

  cardHeaderControls: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },

  controlButton: {
    height: 32,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCD6E8",
    borderRadius: 8,
    backgroundColor: "#F9FBFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  controlButtonText: {
    fontSize: 13,
    color: "#5D6F92",
    fontWeight: "500",
  },

  filterButton: {
    height: 32,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCD6E8",
    borderRadius: 8,
    backgroundColor: "#FFFDF8",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  filterButtonText: {
    fontSize: 13,
    color: "#4B5D7A",
    fontWeight: "500",
  },

  mapCardBody: {
    padding: 12,
    backgroundColor: "#FFFFFF",
  },

  mapArea: {
    height: 410,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#D8EAFB",
  },

  mapBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#D9EAF9",
  },

  roadOne: {
    position: "absolute",
    top: 30,
    left: -20,
    width: 540,
    height: 26,
    backgroundColor: "rgba(255,255,255,0.7)",
    transform: [{ rotate: "8deg" }],
  },

  roadTwo: {
    position: "absolute",
    top: 120,
    left: -20,
    width: 520,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.65)",
    transform: [{ rotate: "-12deg" }],
  },

  roadThree: {
    position: "absolute",
    top: 210,
    left: -40,
    width: 560,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.65)",
    transform: [{ rotate: "10deg" }],
  },

  roadFour: {
    position: "absolute",
    top: 40,
    right: 90,
    width: 18,
    height: 300,
    backgroundColor: "rgba(255,255,255,0.6)",
    transform: [{ rotate: "18deg" }],
  },

  waterArea: {
    position: "absolute",
    right: -20,
    bottom: -10,
    width: 180,
    height: 220,
    borderTopLeftRadius: 80,
    backgroundColor: "#A8D2F7",
  },

  heatOne: {
    position: "absolute",
    bottom: 40,
    left: "30%",
    width: 150,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,0,0,0.28)",
  },

  heatTwo: {
    position: "absolute",
    bottom: 52,
    left: "39%",
    width: 100,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,143,0,0.34)",
  },

  heatThree: {
    position: "absolute",
    bottom: 58,
    left: "46%",
    width: 68,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,235,59,0.34)",
  },

  pinWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  hotspotBadge: {
    position: "absolute",
    top: -6,
    minWidth: 24,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: "#E45757",
    alignItems: "center",
    justifyContent: "center",
  },

  hotspotBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  centerUserWrap: {
    position: "absolute",
    top: "38%",
    left: "54%",
    width: 38,
    height: 38,
    marginLeft: -19,
    marginTop: -19,
    alignItems: "center",
    justifyContent: "center",
  },

  centerUserOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  centerUserInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
  },

  cityLabel: {
    position: "absolute",
    top: "52%",
    left: "56%",
    fontSize: 15,
    fontWeight: "700",
    color: "#4B5D7A",
  },

  legendCard: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  legendTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4B5D7A",
    marginBottom: 6,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },

  legendText: {
    fontSize: 11,
    color: "#4B5D7A",
    fontWeight: "500",
  },

  zoomBox: {
    position: "absolute",
    right: 10,
    bottom: 12,
    gap: 6,
  },

  zoomBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  zoomText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#5D6F92",
    lineHeight: 18,
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

  feedRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },

  feedRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
  },

  feedTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },

  feedTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  feedTitle: {
    marginLeft: 6,
    fontSize: 13,
    color: "#E45757",
    fontWeight: "700",
    flexShrink: 1,
  },

  feedTime: {
    fontSize: 11,
    color: "#7A8BA8",
    fontWeight: "500",
  },

  feedLocation: {
    fontSize: 12,
    color: "#6D7D99",
    marginBottom: 6,
    marginLeft: 21,
  },

  feedMeta: {
    fontSize: 12,
    color: "#6D7D99",
    marginLeft: 21,
    marginBottom: 2,
  },

  feedScore: {
    color: "#294880",
    fontWeight: "700",
  },

  feedValidated: {
    color: "#22A06B",
    fontWeight: "700",
  },

  feedSentiment: {
    color: "#E45757",
    fontWeight: "700",
  },
};
