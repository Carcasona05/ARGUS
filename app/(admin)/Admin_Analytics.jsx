import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Admin_Layout from "../../components/Admin_compo/Admin_Layout";

export default function Admin_Analytics() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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

  const mapPins = [
    { top: "13%", left: "18%", color: "#4F8EF7" },
    { top: "12%", left: "28%", color: "#F56B6B" },
    { top: "16%", left: "40%", color: "#F56B6B" },
    { top: "10%", left: "56%", color: "#F56B6B" },
    { top: "18%", left: "66%", color: "#3DBB74" },
    { top: "13%", left: "74%", color: "#F56B6B" },
    { top: "24%", left: "20%", color: "#F29A2E" },
    { top: "24%", left: "34%", color: "#4F8EF7" },
    { top: "26%", left: "48%", color: "#F56B6B" },
    { top: "22%", left: "60%", color: "#3DBB74" },
    { top: "28%", left: "70%", color: "#4F8EF7" },
    { top: "36%", left: "14%", color: "#F56B6B", label: "H1" },
    { top: "33%", left: "26%", color: "#3DBB74" },
    { top: "38%", left: "38%", color: "#F29A2E" },
    { top: "34%", left: "49%", color: "#F56B6B" },
    { top: "33%", left: "58%", color: "#4F8EF7" },
    { top: "35%", left: "71%", color: "#F56B6B", label: "H2" },
    { top: "47%", left: "19%", color: "#F56B6B" },
    { top: "49%", left: "30%", color: "#F29A2E" },
    { top: "46%", left: "42%", color: "#4F8EF7" },
    { top: "48%", left: "54%", color: "#F56B6B", label: "H4" },
    { top: "45%", left: "63%", color: "#3DBB74" },
    { top: "50%", left: "74%", color: "#F56B6B" },
    { top: "60%", left: "17%", color: "#F29A2E" },
    { top: "63%", left: "28%", color: "#4F8EF7" },
    { top: "57%", left: "39%", color: "#F56B6B" },
    { top: "61%", left: "50%", color: "#F29A2E", label: "H4" },
    { top: "58%", left: "61%", color: "#4F8EF7" },
    { top: "65%", left: "22%", color: "#3DBB74" },
  ];

  const crimeTypes = [
    { label: "Theft", value: "46%", color: "#67B7F7" },
    { label: "Assault", value: "31%", color: "#C78A54" },
    { label: "Accident", value: "23%", color: "#B9987B" },
  ];

  const recommendedActions = [
    "Increase patrol in hotspot area",
    "Notify nearest response units",
  ];

  return (
    <Admin_Layout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrap}>
          <View style={styles.topSection}>
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

            <View style={styles.middleRow}>
              <View style={styles.leftAnalyticsSection}>
                <View style={styles.mainCard}>
                  <View style={styles.cardHeaderTop}>
                    <Text style={styles.cardTitle}>Validation Queue</Text>
                  </View>

                  <View style={styles.mapCardBody}>
                    <View style={styles.mapArea}>
                      <View style={styles.mapBg} />

                      <View style={styles.roadOne} />
                      <View style={styles.roadTwo} />
                      <View style={styles.roadThree} />
                      <View style={styles.roadFour} />
                      <View style={styles.roadFive} />

                      <View style={styles.waterArea} />

                      <View style={styles.heatOne} />
                      <View style={styles.heatTwo} />
                      <View style={styles.heatThree} />
                      <View style={styles.heatFour} />

                      <View style={styles.mapControls}>
                        <TouchableOpacity style={styles.controlButtonWide}>
                          <Ionicons
                            name="layers-outline"
                            size={16}
                            color="#5D6F92"
                          />
                          <Text style={styles.controlButtonText}>Layer</Text>
                          <Ionicons
                            name="chevron-down-outline"
                            size={14}
                            color="#5D6F92"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.controlButtonWide}>
                          <Ionicons
                            name="search-outline"
                            size={16}
                            color="#5D6F92"
                          />
                          <Text style={styles.controlButtonText}>Zoom</Text>
                          <Ionicons
                            name="chevron-down-outline"
                            size={14}
                            color="#5D6F92"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.controlButtonWide}>
                          <Ionicons
                            name="filter-outline"
                            size={16}
                            color="#5D6F92"
                          />
                          <Text style={styles.controlButtonText}>
                            Dynamic Filter
                          </Text>
                          <Ionicons
                            name="chevron-down-outline"
                            size={14}
                            color="#5D6F92"
                          />
                        </TouchableOpacity>
                      </View>

                      {mapPins.map((pin, index) => (
                        <View
                          key={index}
                          style={[
                            styles.pinWrap,
                            { top: pin.top, left: pin.left },
                          ]}
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
                              { backgroundColor: "#F29A2E" },
                            ]}
                          />
                          <Text style={styles.legendText}>Assault</Text>
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

                      <View style={styles.mapAvatarBottom}>
                        <View style={styles.avatarBottomOuter}>
                          <Ionicons name="person" size={18} color="#FFFFFF" />
                        </View>
                      </View>

                      <View style={styles.zoomBox}>
                        <TouchableOpacity style={styles.zoomBtn}>
                          <Text style={styles.zoomText}>⊕</Text>
                        </TouchableOpacity>
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

                <View style={styles.bottomChartsRow}>
                  <View style={styles.chartCardLarge}>
                    <Text style={styles.sideCardTitle}>Sentiment Analysis</Text>

                    <View style={styles.chartContent}>
                      <Text style={styles.chartSubhead}>24hr Trend</Text>

                      <View style={styles.lineChartBox}>
                        <View style={styles.chartGridOne} />
                        <View style={styles.chartGridTwo} />
                        <View style={styles.chartGridThree} />
                        <View style={styles.chartGridFour} />

                        <View style={styles.yAxisLabels}>
                          <Text style={styles.axisText}>100</Text>
                          <Text style={styles.axisText}>75</Text>
                          <Text style={styles.axisText}>50</Text>
                          <Text style={styles.axisText}>25</Text>
                          <Text style={styles.axisText}>0</Text>
                        </View>

                        <View style={styles.chartBands}>
                          <View style={styles.bandAnxious} />
                          <View style={styles.bandNeutral} />
                          <View style={styles.bandCalm} />
                        </View>

                        <View style={styles.polylineOne} />
                        <View style={styles.polylineTwo} />
                        <View style={styles.polylineThree} />
                        <View style={styles.polylineFour} />
                        <View style={styles.polylineFive} />
                        <View style={styles.polylineSix} />

                        <View style={styles.rightLabels}>
                          <Text style={styles.anxiousLabel}>Anxious</Text>
                          <Text style={styles.neutralLabel}>Neutral</Text>
                          <Text style={styles.calmLabel}>Calm</Text>
                        </View>
                      </View>

                      <View style={styles.xAxisRow}>
                        <Text style={styles.axisText}>00:00</Text>
                        <Text style={styles.axisText}>08:00</Text>
                        <Text style={styles.axisText}>12:00</Text>
                        <Text style={styles.axisText}>12:00</Text>
                        <Text style={styles.axisText}>18:00</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.chartCardSmall}>
                    <Text style={styles.sideCardTitle}>
                      Predictive Trend Model
                    </Text>

                    <View style={styles.chartContent}>
                      <Text style={styles.predictiveSubText}>
                        Forecasted Incident Probability{"\n"}over next 48 hours
                      </Text>

                      <View style={styles.scatterChartBox}>
                        <View style={styles.scatterGridOne} />
                        <View style={styles.scatterGridTwo} />
                        <View style={styles.scatterGridThree} />
                        <View style={styles.scatterGridFour} />

                        <View style={styles.scatterAxisY}>
                          <Text style={styles.axisText}>100%</Text>
                          <Text style={styles.axisText}>80%</Text>
                          <Text style={styles.axisText}>40%</Text>
                          <Text style={styles.axisText}>20%</Text>
                          <Text style={styles.axisText}>0</Text>
                        </View>

                        <View style={styles.scatterXAxis}>
                          <Text style={styles.axisText}>0</Text>
                          <Text style={styles.axisText}>10</Text>
                          <Text style={styles.axisText}>20</Text>
                          <Text style={styles.axisText}>30</Text>
                          <Text style={styles.axisText}>48</Text>
                        </View>

                        <View style={styles.trendLine} />

                        {[
                          { bottom: 18, left: 58, color: "#4F8EF7" },
                          { bottom: 24, left: 74, color: "#F56B6B" },
                          { bottom: 22, left: 90, color: "#F29A2E" },
                          { bottom: 34, left: 105, color: "#4F8EF7" },
                          { bottom: 44, left: 118, color: "#F29A2E" },
                          { bottom: 56, left: 134, color: "#F56B6B" },
                          { bottom: 72, left: 152, color: "#4F8EF7" },
                          { bottom: 91, left: 166, color: "#F29A2E" },
                          { bottom: 109, left: 178, color: "#F56B6B" },
                          { bottom: 118, left: 191, color: "#3DBB74" },
                          { bottom: 126, left: 208, color: "#F56B6B" },
                          { bottom: 132, left: 226, color: "#F29A2E" },
                        ].map((dot, index) => (
                          <View
                            key={index}
                            style={[
                              styles.scatterDot,
                              {
                                bottom: dot.bottom,
                                left: dot.left,
                                backgroundColor: dot.color,
                              },
                            ]}
                          />
                        ))}

                        <Text style={styles.yAxisTitle}>Probability</Text>
                        <Text style={styles.xAxisTitle}>Incident Hours</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.rightForecastSection}>
                <View style={styles.forecastCard}>
                  <Text style={styles.forecastTitle}>
                    Possible Crime Forecast
                  </Text>
                  <Text style={styles.forecastSubtitle}>
                    Based on Predictive Trend Model
                  </Text>

                  <View style={styles.forecastDivider} />

                  <Text style={styles.forecastSectionTitle}>
                    Predicted High-Risk Zone
                  </Text>
                  <Text style={styles.forecastText}>
                    Colon St. – Osmeña Area
                  </Text>

                  <Text style={styles.forecastText}>
                    Risk Level: <Text style={styles.highRiskText}>HIGH</Text>
                  </Text>

                  <Text style={styles.forecastText}>
                    Probability: <Text style={styles.highRiskText}>82%</Text>
                  </Text>

                  <View style={styles.forecastDivider} />

                  <Text style={styles.forecastSectionTitle}>
                    Predicted Crime Types
                  </Text>

                  {crimeTypes.map((item, index) => (
                    <View key={index} style={styles.forecastListRow}>
                      <View style={styles.forecastListLeft}>
                        <View
                          style={[
                            styles.forecastListDot,
                            { backgroundColor: item.color },
                          ]}
                        />
                        <Text style={styles.forecastText}>{item.label}</Text>
                      </View>
                      <Text style={styles.forecastText}>{item.value}</Text>
                    </View>
                  ))}

                  <View style={styles.forecastDivider} />

                  <Text style={styles.forecastSectionTitle}>
                    Estimated Time Window
                  </Text>
                  <Text style={styles.forecastBigText}>6:00 PM – 10:00 PM</Text>

                  <View style={styles.forecastDivider} />

                  <Text style={styles.forecastSectionTitle}>
                    Trend Indicator
                  </Text>
                  <Text style={styles.trendText}>
                    ↑ +18% vs previous 24 hrs
                  </Text>

                  <View style={styles.forecastDivider} />

                  <Text style={styles.forecastSectionTitle}>
                    Recommended Action
                  </Text>

                  {recommendedActions.map((item, index) => (
                    <View key={index} style={styles.forecastListRowLeft}>
                      <View style={styles.recommendDot} />
                      <Text style={styles.forecastText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
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
    flex: 1,
  },

  topSection: {
    flex: 1,
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
    color: "#2E3F63",
  },

  summarySubtext: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
  },

  middleRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },

  leftAnalyticsSection: {
    flex: 1,
    minWidth: 0,
  },

  rightForecastSection: {
    width: 360,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
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
    backgroundColor: "#F7F9FD",
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  mapCardBody: {
    padding: 12,
    backgroundColor: "#FFFFFF",
  },

  mapArea: {
    height: 370,
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
    backgroundColor: "#DDEBE4",
  },

  roadOne: {
    position: "absolute",
    top: 35,
    left: -20,
    width: 760,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.65)",
    transform: [{ rotate: "8deg" }],
  },

  roadTwo: {
    position: "absolute",
    top: 120,
    left: -30,
    width: 780,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.7)",
    transform: [{ rotate: "-9deg" }],
  },

  roadThree: {
    position: "absolute",
    top: 210,
    left: -40,
    width: 800,
    height: 16,
    backgroundColor: "rgba(255,255,255,0.65)",
    transform: [{ rotate: "11deg" }],
  },

  roadFour: {
    position: "absolute",
    top: 30,
    left: 150,
    width: 18,
    height: 320,
    backgroundColor: "rgba(255,255,255,0.55)",
    transform: [{ rotate: "-28deg" }],
  },

  roadFive: {
    position: "absolute",
    top: 5,
    right: 170,
    width: 16,
    height: 340,
    backgroundColor: "rgba(255,255,255,0.55)",
    transform: [{ rotate: "24deg" }],
  },

  waterArea: {
    position: "absolute",
    right: -15,
    bottom: -10,
    width: 220,
    height: 260,
    borderTopLeftRadius: 100,
    backgroundColor: "#A8D2F7",
  },

  heatOne: {
    position: "absolute",
    top: 150,
    left: 105,
    width: 95,
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(255,0,0,0.30)",
  },

  heatTwo: {
    position: "absolute",
    top: 180,
    left: 355,
    width: 110,
    height: 75,
    borderRadius: 40,
    backgroundColor: "rgba(255,140,0,0.30)",
  },

  heatThree: {
    position: "absolute",
    top: 120,
    right: 160,
    width: 90,
    height: 65,
    borderRadius: 36,
    backgroundColor: "rgba(255,0,0,0.28)",
  },

  heatFour: {
    position: "absolute",
    bottom: 48,
    left: 255,
    width: 100,
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(255,140,0,0.32)",
  },

  mapControls: {
    position: "absolute",
    top: 12,
    left: 12,
    gap: 8,
    zIndex: 2,
  },

  controlButtonWide: {
    width: 165,
    height: 36,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CCD6E8",
    borderRadius: 8,
    backgroundColor: "#F9FBFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlButtonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#5D6F92",
    fontFamily: "PoppinsMedium",
  },

  pinWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  hotspotBadge: {
    position: "absolute",
    top: -6,
    minWidth: 28,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: "#E45757",
    alignItems: "center",
    justifyContent: "center",
  },

  hotspotBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "PoppinsMedium",
  },

  centerUserWrap: {
    position: "absolute",
    top: "33%",
    left: "56%",
    width: 52,
    height: 52,
    marginLeft: -26,
    marginTop: -26,
    alignItems: "center",
    justifyContent: "center",
  },

  centerUserOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  centerUserInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
  },

  cityLabel: {
    position: "absolute",
    top: "53%",
    left: "61%",
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#243E67",
  },

  legendCard: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 118,
  },

  legendTitle: {
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",
    color: "#35507A",
    marginBottom: 8,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 7,
  },

  legendText: {
    fontSize: 12,
    color: "#4B5D7A",
    fontFamily: "PoppinsMedium",
  },

  mapAvatarBottom: {
    position: "absolute",
    left: 52,
    bottom: 14,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarBottomOuter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
  },

  zoomBox: {
    position: "absolute",
    right: 12,
    bottom: 18,
    gap: 6,
  },

  zoomBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
  },

  zoomText: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#5D6F92",
    lineHeight: 20,
  },

  bottomChartsRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "stretch",
  },

  chartCardLarge: {
    flex: 1.6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 12,
    overflow: "hidden",
  },

  chartCardSmall: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 12,
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

  chartContent: {
    padding: 16,
  },

  chartSubhead: {
    fontSize: 13,
    color: "#4F70A5",
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
  },

  lineChartBox: {
    height: 128,
    marginLeft: 30,
    marginRight: 70,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },

  chartGridOne: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  chartGridTwo: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  chartGridThree: {
    position: "absolute",
    top: 64,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  chartGridFour: {
    position: "absolute",
    top: 96,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  yAxisLabels: {
    position: "absolute",
    left: -28,
    top: -8,
    height: 136,
    justifyContent: "space-between",
  },

  axisText: {
    fontSize: 11,
    color: "#6A7C9B",
    fontFamily: "PoppinsMedium",
  },

  chartBands: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 68,
    height: 128,
  },

  bandAnxious: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 43,
    backgroundColor: "#FFF1ED",
  },

  bandNeutral: {
    position: "absolute",
    top: 43,
    width: "100%",
    height: 42,
    backgroundColor: "#F8F0E4",
  },

  bandCalm: {
    position: "absolute",
    top: 85,
    width: "100%",
    height: 43,
    backgroundColor: "#EAF4FF",
  },

  polylineOne: {
    position: "absolute",
    left: 2,
    top: 58,
    width: 58,
    height: 28,
    borderTopWidth: 3,
    borderColor: "#2F8DE4",
    borderRadius: 20,
    transform: [{ rotate: "-4deg" }],
  },

  polylineTwo: {
    position: "absolute",
    left: 54,
    top: 40,
    width: 54,
    height: 32,
    borderTopWidth: 3,
    borderColor: "#2F8DE4",
    borderRadius: 20,
    transform: [{ rotate: "14deg" }],
  },

  polylineThree: {
    position: "absolute",
    left: 105,
    top: 50,
    width: 48,
    height: 24,
    borderTopWidth: 3,
    borderColor: "#2F8DE4",
    borderRadius: 20,
    transform: [{ rotate: "-12deg" }],
  },

  polylineFour: {
    position: "absolute",
    left: 150,
    top: 28,
    width: 62,
    height: 34,
    borderTopWidth: 3,
    borderColor: "#F0A12A",
    borderRadius: 24,
    transform: [{ rotate: "10deg" }],
  },

  polylineFive: {
    position: "absolute",
    left: 205,
    top: 12,
    width: 70,
    height: 26,
    borderTopWidth: 3,
    borderColor: "#F04E45",
    borderRadius: 24,
    transform: [{ rotate: "8deg" }],
  },

  polylineSix: {
    position: "absolute",
    left: 258,
    top: 24,
    width: 52,
    height: 20,
    borderTopWidth: 3,
    borderColor: "#F0A12A",
    borderRadius: 20,
    transform: [{ rotate: "-6deg" }],
  },

  rightLabels: {
    position: "absolute",
    right: -2,
    top: 8,
    height: 112,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  anxiousLabel: {
    fontSize: 12,
    color: "#F04E45",
    fontFamily: "PoppinsSemiBold",
  },

  neutralLabel: {
    fontSize: 12,
    color: "#C9731D",
    fontFamily: "PoppinsSemiBold",
  },

  calmLabel: {
    fontSize: 12,
    color: "#2F7DE1",
    fontFamily: "PoppinsSemiBold",
  },

  xAxisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginLeft: 28,
    marginRight: 64,
  },

  predictiveSubText: {
    fontSize: 12,
    color: "#5D6F92",
    lineHeight: 18,
    marginBottom: 10,
    fontFamily: "PoppinsMedium",
  },

  scatterChartBox: {
    height: 170,
    marginTop: 2,
    position: "relative",
    marginLeft: 48,
    marginRight: 10,
    marginBottom: 4,
  },

  scatterGridOne: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 18,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  scatterGridTwo: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 52,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  scatterGridThree: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 88,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  scatterGridFour: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 124,
    height: 1,
    backgroundColor: "#DCE5F1",
  },

  scatterAxisY: {
    position: "absolute",
    left: -38,
    top: 8,
    height: 134,
    justifyContent: "space-between",
  },

  scatterXAxis: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  trendLine: {
    position: "absolute",
    left: 10,
    bottom: 34,
    width: 210,
    height: 3,
    backgroundColor: "#F0A12A",
    transform: [{ rotate: "27deg" }],
    borderRadius: 2,
  },

  scatterDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  yAxisTitle: {
    position: "absolute",
    left: -58,
    top: 64,
    transform: [{ rotate: "-90deg" }],
    fontSize: 12,
    color: "#5D6F92",
    fontFamily: "PoppinsSemiBold",
  },

  xAxisTitle: {
    position: "absolute",
    bottom: -14,
    left: 70,
    fontSize: 12,
    color: "#5D6F92",
    fontFamily: "PoppinsSemiBold",
  },

  forecastCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    padding: 20,
  },

  forecastTitle: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
    marginBottom: 4,
  },

  forecastSubtitle: {
    fontSize: 13,
    color: "#4F70A5",
    fontFamily: "PoppinsMedium",
  },

  forecastDivider: {
    height: 1,
    backgroundColor: "#E3EAF4",
    marginVertical: 16,
  },

  forecastSectionTitle: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#2F4267",
    marginBottom: 8,
  },

  forecastText: {
    fontSize: 13,
    color: "#435A84",
    lineHeight: 22,
    fontFamily: "PoppinsMedium",
  },

  forecastBigText: {
    fontSize: 15,
    color: "#2F4267",
    fontFamily: "PoppinsSemiBold",
  },

  highRiskText: {
    color: "#E45757",
    fontFamily: "PoppinsSemiBold",
  },

  trendText: {
    fontSize: 14,
    color: "#22A06B",
    fontFamily: "PoppinsSemiBold",
  },

  forecastListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  forecastListLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  forecastListDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  forecastListRowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  recommendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#67B7F7",
    marginTop: 7,
    marginRight: 10,
  },
};