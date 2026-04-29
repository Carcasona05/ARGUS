import React, { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ReportPost_Layout from "../../components/ReportPost_Layout";

const markers = [
  { id: 1, top: 62, left: 62, color: "#F4A62A" },
  { id: 2, top: 105, left: 198, color: "#D64545" },
  { id: 3, top: 152, left: 118, color: "#D64545" },
  { id: 4, top: 178, left: 248, color: "#F4A62A" },
];

const initialReports = [
  {
    id: "report_001",
    userName: "Anonymous User",
    userAvatar: null,
    location: "Mabini Street, Manila",
    incidentCategory: "Suspicious Activities",
    incidentType: "Loitering / Suspicious Presence",
    details:
      "A suspicious person was seen loitering near the gate around 9:30 PM.",
    verified: true,
    likes: 12,
    comments: 2,
    images: [],
    commentList: [
      {
        id: "c1",
        user: "Anonymous User",
        text: "Please stay alert in this area.",
      },
      {
        id: "c2",
        user: "Anonymous User",
        text: "I also noticed this last night.",
      },
    ],
  },
  {
    id: "report_002",
    userName: "Anonymous User",
    userAvatar: null,
    location: "Rizal Avenue, Manila",
    incidentCategory: "Public Safety Incidents",
    incidentType: "Public Disturbance",
    details:
      "A loud commotion and shouting were reported near the park entrance. Nearby residents were advised to stay alert while the situation was being checked.",
    verified: true,
    likes: 41,
    comments: 1,
    images: [],
    commentList: [
      {
        id: "c3",
        user: "Anonymous User",
        text: "Hope authorities respond soon.",
      },
    ],
  },
  {
    id: "report_003",
    userName: "Anonymous User",
    userAvatar: null,
    location: "Taft Avenue, Manila",
    incidentCategory: "Infrastructure Issues",
    incidentType: "Broken Street Light",
    details:
      "The street light near the pedestrian lane is not working, causing poor visibility at night.",
    verified: false,
    likes: 8,
    comments: 0,
    images: [],
    commentList: [],
  },
  {
    id: "report_004",
    userName: "Anonymous User",
    userAvatar: null,
    location: "España Boulevard, Manila",
    incidentCategory: "Traffic and Road Concerns",
    incidentType: "Road Obstruction",
    details:
      "A stalled vehicle has been blocking one lane for over 20 minutes, causing traffic buildup.",
    verified: false,
    likes: 17,
    comments: 0,
    images: [],
    commentList: [],
  },
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
        </View>

        <ThemedText style={styles.mapInfoSubtitle}>
          3 high-risk spots detected near your location.
        </ThemedText>
      </View>
    </View>
  );
};

const User_Home = () => {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [reports, setReports] = useState(initialReports);

  const filteredReports = useMemo(() => {
    if (selectedFilter === "Verified") {
      return reports.filter((report) => report.verified);
    }

    if (selectedFilter === "Unverified") {
      return reports.filter((report) => !report.verified);
    }

    return reports;
  }, [selectedFilter, reports]);

  const totalIncidents = reports.length;
  const totalVerified = reports.filter((report) => report.verified).length;
  const totalUnverified = reports.filter((report) => !report.verified).length;

  const handleLike = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, likes: report.likes + 1 }
          : report
      )
    );
  };

  const handleOpenPost = (report) => {
    router.push({
      pathname: "/User_RepPostView",
      params: {
        post: JSON.stringify(report),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <MapPreview style={styles.mapSpacing} />

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>
                {totalIncidents}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Total Incidents</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>{totalVerified}</ThemedText>
              <ThemedText style={styles.statLabel}>Verified</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>
                {totalUnverified}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Unverified</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitle}>Latest Reports</ThemedText>
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filterChip,
                selectedFilter === "All" && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter("All")}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  selectedFilter === "All" && styles.activeFilterChipText,
                ]}
              >
                All
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filterChip,
                selectedFilter === "Verified" && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter("Verified")}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  selectedFilter === "Verified" && styles.activeFilterChipText,
                ]}
              >
                Verified
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filterChip,
                selectedFilter === "Unverified" && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter("Unverified")}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  selectedFilter === "Unverified" &&
                    styles.activeFilterChipText,
                ]}
              >
                Unverified
              </ThemedText>
            </TouchableOpacity>
          </View>

          {filteredReports.map((report, index) => (
            <ReportPost_Layout
              key={report.id}
              userName={report.userName}
              userAvatar={report.userAvatar}
              location={report.location}
              incidentCategory={report.incidentCategory}
              incidentType={report.incidentType}
              details={report.details}
              verified={report.verified}
              likes={report.likes}
              comments={report.comments}
              images={report.images}
              onLike={() => handleLike(report.id)}
              onComment={() => handleOpenPost(report)}
              onAddMedia={() => console.log(`Add media ${report.id}`)}
              style={
                index !== filteredReports.length - 1
                  ? styles.reportCardSpacing
                  : null
              }
            />
          ))}
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
    paddingBottom: 110,
  },

  heroSection: {
    marginBottom: 14,
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
    color: "#1F2937",
  },

  mapInfoSubtitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    color: "#1F2A37",
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#E4EBF7",
    marginRight: 8,
  },

  activeFilterChip: {
    backgroundColor: "#294880",
  },

  filterChipText: {
    fontSize: 12,
    color: "#294880",
  },

  activeFilterChipText: {
    color: "#FFFFFF",
  },

  reportCardSpacing: {
    marginBottom: 12,
  },
});

export default User_Home;