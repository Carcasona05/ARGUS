import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ReportPost_Layout from "../../components/ReportPost_Layout";

const markers = [
  { id: 1, top: 62, left: 62, color: "#F4A62A" },
  { id: 2, top: 105, left: 198, color: "#D64545" },
  { id: 3, top: 152, left: 118, color: "#D64545" },
  { id: 4, top: 178, left: 248, color: "#F4A62A" },
];

const MapPreview = ({ style }) => {
  return (
    <View style={[styles.mapCard, style]}>
      <View style={styles.lowZone} />
      <View style={styles.moderateZone} />
      <View style={styles.highZone} />

      <View style={styles.roadLineOne} />
      <View style={styles.roadLineTwo} />
      <View style={styles.roadLineThree} />
      <View style={styles.roadLineFour} />

      <View style={styles.legendWrap}>
        <View style={styles.legendChip}>
          <View style={[styles.legendDot, { backgroundColor: "#76C16E" }]} />
          <ThemedText style={styles.legendText}>Low</ThemedText>
        </View>

        <View style={styles.legendChip}>
          <View style={[styles.legendDot, { backgroundColor: "#F4A62A" }]} />
          <ThemedText style={styles.legendText}>Moderate</ThemedText>
        </View>

        <View style={styles.legendChip}>
          <View style={[styles.legendDot, { backgroundColor: "#D64545" }]} />
          <ThemedText style={styles.legendText}>High</ThemedText>
        </View>
      </View>

      {markers.map((marker) => (
        <View
          key={marker.id}
          style={[
            styles.mapMarker,
            {
              top: marker.top,
              left: marker.left,
              backgroundColor: marker.color,
            },
          ]}
        >
          <ThemedText style={styles.markerText}>!</ThemedText>
        </View>
      ))}

      <View style={styles.userPin}>
        <View style={styles.userPinDot} />
      </View>

      <View style={styles.userLabel}>
        <ThemedText style={styles.userLabelText}>You</ThemedText>
      </View>

      <View style={styles.mapInfoCard}>
        <View style={styles.mapInfoTop}>
          <View style={styles.mapInfoTitleRow}>
            <View style={styles.mapAlertDot} />
            <ThemedText style={styles.mapInfoTitle}>Area Status</ThemedText>
          </View>

          <View style={styles.liveBadge}>
            <ThemedText style={styles.liveBadgeText}>LIVE</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.mapInfoSubtitle}>
          3 high-risk spots detected near your location.
        </ThemedText>
      </View>
    </View>
  );
};

const User_Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.pageHeader}>
            <View style={{ flex: 1 }}>
              
            </View>
          </View>

          <MapPreview style={styles.mapSpacing} />

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>38</ThemedText>
              <ThemedText style={styles.statLabel}>Total Incidents</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>12</ThemedText>
              <ThemedText style={styles.statLabel}>Robbery Reports</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>3</ThemedText>
              <ThemedText style={styles.statLabel}>High-Risk Zones</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitle}>Latest Reports</ThemedText>
            <TouchableOpacity activeOpacity={0.85}>
              <ThemedText style={styles.viewAllText}>View All</ThemedText>
            </TouchableOpacity>
          </View>

          <ReportPost_Layout
            userName="Juan Dela Cruz"
            location="Mabini Street, Manila"
            incidentCategory="Suspicious Activities"
            incidentType="Loitering / Suspicious Presence"
            details="A suspicious person was seen loitering near the gate around 9:30 PM."
            verified={true}
            likes={12}
            comments={4}
            images={[]}
            onLike={() => console.log("Liked report 1")}
            onComment={() => console.log("Comment report 1")}
            onAddMedia={() => console.log("Add media report 1")}
            style={styles.reportCardSpacing}
          />

          <ReportPost_Layout
            userName="Verified Resident"
            location="Rizal Avenue, Manila"
            incidentCategory="Public Safety Incidents"
            incidentType="Public Disturbance"
            details="A loud commotion and shouting were reported near the park entrance. Nearby residents were advised to stay alert while the situation was being checked."
            verified={true}
            likes={41}
            comments={15}
            images={[]}
            onLike={() => console.log("Liked report 2")}
            onComment={() => console.log("Comment report 2")}
            onAddMedia={() => console.log("Add media report 2")}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 28,
  },
  heroSection: {
    marginBottom: 14,
  },
  pageHeader: {
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#68758A",
  },
  mapSpacing: {
    marginBottom: 12,
  },
  mapCard: {
    height: 250,
    borderRadius: 24,
    backgroundColor: "#EEF2F7",
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  lowZone: {
    position: "absolute",
    width: 110,
    height: 180,
    borderRadius: 26,
    opacity: 0.28,
    backgroundColor: "#76C16E",
    top: 44,
    left: 18,
    transform: [{ rotate: "-24deg" }],
  },
  moderateZone: {
    position: "absolute",
    width: 110,
    height: 170,
    borderRadius: 26,
    opacity: 0.28,
    backgroundColor: "#F4A62A",
    top: 66,
    left: 104,
    transform: [{ rotate: "-23deg" }],
  },
  highZone: {
    position: "absolute",
    width: 145,
    height: 280,
    borderRadius: 26,
    opacity: 0.28,
    backgroundColor: "#D64545",
    top: 12,
    right: 20,
    transform: [{ rotate: "-24deg" }],
  },
  roadLineOne: {
    position: "absolute",
    width: 420,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    top: 58,
    left: -20,
    transform: [{ rotate: "-20deg" }],
  },
  roadLineTwo: {
    position: "absolute",
    width: 420,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    top: 116,
    left: -30,
    transform: [{ rotate: "-18deg" }],
  },
  roadLineThree: {
    position: "absolute",
    width: 12,
    height: 260,
    backgroundColor: "rgba(255,255,255,0.7)",
    top: -10,
    left: 92,
    transform: [{ rotate: "22deg" }],
  },
  roadLineFour: {
    position: "absolute",
    width: 12,
    height: 280,
    backgroundColor: "rgba(255,255,255,0.7)",
    top: -10,
    right: 72,
    transform: [{ rotate: "18deg" }],
  },
  legendWrap: {
    position: "absolute",
    top: 14,
    left: 12,
    flexDirection: "row",
  },
  legendChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.94)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A5568",
  },
  mapMarker: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  markerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    marginTop: -1,
  },
  userPin: {
    position: "absolute",
    bottom: 70,
    left: 160,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#DCE6F8",
  },
  userPinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2D8CFF",
  },
  userLabel: {
    position: "absolute",
    bottom: 44,
    left: 146,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  userLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
  },
  mapInfoCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 18,
    padding: 12,
  },
  mapInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapInfoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapAlertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D64545",
    marginRight: 8,
  },
  mapInfoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F2937",
  },
  mapInfoSubtitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
  },
  liveBadge: {
    backgroundColor: "#FFE8E8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#C53030",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 15,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2A37",
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
  },
  reportCardSpacing: {
    marginBottom: 12,
  },
});

export default User_Home;
