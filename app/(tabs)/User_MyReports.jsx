import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import MyUser_RepPost_Layout from "../../components/User_compo/MyUser_RepPost_Layout";

const initialMyReports = [
  {
    id: "my_report_001",
    userName: "You",
    userAvatar: null,
    location: "Poblacion, Argao, Cebu",
    incidentCategory: "Community and Environmental Concerns",
    incidentType: "Flood",
    details:
      "Flooding was seen near the roadside after heavy rain. The water level is rising and may affect nearby houses.",
    status: "Pending",
    verified: false,
    likes: 0,
    comments: 0,
    images: [],
    commentList: [],
  },
  {
    id: "my_report_002",
    userName: "You",
    userAvatar: null,
    location: "Langtad, Argao, Cebu",
    incidentCategory: "Infrastructure Issues",
    incidentType: "Broken Street Light",
    details:
      "The street light near the corner is not working. The area becomes dark at night and may be unsafe for pedestrians.",
    status: "Verified",
    verified: true,
    likes: 6,
    comments: 1,
    images: [],
    commentList: [
      {
        id: "c1",
        user: "Anonymous User",
        text: "This area really needs better lighting.",
      },
    ],
  },
  {
    id: "my_report_003",
    userName: "You",
    userAvatar: null,
    location: "Talaga, Argao, Cebu",
    incidentCategory: "Traffic and Road Concerns",
    incidentType: "Road Obstruction",
    details:
      "A large branch is blocking part of the road and may cause accidents for motorcycles passing at night.",
    status: "Rejected",
    verified: false,
    likes: 3,
    comments: 0,
    images: [],
    commentList: [],
  },
];

const User_MyReports = () => {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [myReports, setMyReports] = useState(initialMyReports);

  const filteredReports = useMemo(() => {
    if (selectedFilter === "Pending") {
      return myReports.filter((report) => report.status === "Pending");
    }

    if (selectedFilter === "Verified") {
      return myReports.filter((report) => report.status === "Verified");
    }

    if (selectedFilter === "Rejected") {
      return myReports.filter((report) => report.status === "Rejected");
    }

    return myReports;
  }, [selectedFilter, myReports]);

  const totalReports = myReports.length;
  const totalPending = myReports.filter(
    (report) => report.status === "Pending"
  ).length;
  const totalVerified = myReports.filter(
    (report) => report.status === "Verified"
  ).length;

  const handleLike = (reportId) => {
    setMyReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              likes: report.likes + 1,
            }
          : report
      )
    );
  };

  const handleOpenReport = (reportData) => {
    router.push({
      pathname: "/MyUser_RepPostView",
      params: {
        report: JSON.stringify(reportData),
      },
    });
  };

  const handleEditReport = (report) => {
    Alert.alert(
      "Edit Report",
      `Edit function for "${report.incidentType}" will be connected later.`
    );
  };

  const handleDeleteReport = (reportId) => {
    Alert.alert("Delete Report", "Are you sure you want to delete this report?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMyReports((prevReports) =>
            prevReports.filter((report) => report.id !== reportId)
          );
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>{totalReports}</ThemedText>
              <ThemedText style={styles.statLabel}>Total Reports</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>{totalPending}</ThemedText>
              <ThemedText style={styles.statLabel}>Pending</ThemedText>
            </View>

            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>{totalVerified}</ThemedText>
              <ThemedText style={styles.statLabel}>Verified</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            
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
                selectedFilter === "Pending" && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter("Pending")}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  selectedFilter === "Pending" && styles.activeFilterChipText,
                ]}
              >
                Pending
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
                selectedFilter === "Rejected" && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedFilter("Rejected")}
            >
              <ThemedText
                style={[
                  styles.filterChipText,
                  selectedFilter === "Rejected" && styles.activeFilterChipText,
                ]}
              >
                Rejected
              </ThemedText>
            </TouchableOpacity>
          </View>

          {filteredReports.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="folder-open-outline" size={38} color="#94A3B8" />
              <ThemedText style={styles.emptyTitle}>No reports found</ThemedText>
              <ThemedText style={styles.emptySubtitle}>
                There are no reports under this filter.
              </ThemedText>
            </View>
          ) : (
            filteredReports.map((report, index) => (
              <MyUser_RepPost_Layout
                key={report.id}
                userName={report.userName}
                userAvatar={report.userAvatar}
                location={report.location}
                incidentCategory={report.incidentCategory}
                incidentType={report.incidentType}
                details={report.details}
                status={report.status}
                likes={report.likes}
                comments={report.comments}
                images={report.images}
                onLike={() => handleLike(report.id)}
                onComment={() => handleOpenReport(report)}
                onEdit={() => handleEditReport(report)}
                onDelete={() => handleDeleteReport(report.id)}
                style={
                  index !== filteredReports.length - 1
                    ? styles.reportCardSpacing
                    : null
                }
              />
            ))
          )}
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2A37",
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#E4EBF7",
    marginRight: 8,
    marginBottom: 8,
  },

  activeFilterChip: {
    backgroundColor: "#294880",
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#294880",
  },

  activeFilterChipText: {
    color: "#FFFFFF",
  },

  reportCardSpacing: {
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2A37",
    marginTop: 10,
    marginBottom: 4,
  },

  emptySubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default User_MyReports;