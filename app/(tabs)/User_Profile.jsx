import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ReportPost_Layout from "../../components/ReportPost_Layout";

const User_Profile = () => {
  const currentUser = {
    id: "user_001",
    username: "Anonymous User",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  const reports = [
    {
      id: "rep_001",
      userId: "user_001",
      location: "Barangay San Jose",
      incidentType: "Suspicious Activity",
      incidentNumber: "ARG-2026-0001",
      details:
        "A suspicious person was seen walking near the subdivision gate around 10:30 PM.",
      images: ["https://placehold.co/600x400/png"],
      verified: false,
      likes: 12,
      comments: 3,
    },
    {
      id: "rep_002",
      userId: "user_001",
      location: "Poblacion Area",
      incidentType: "Street Light Issue",
      incidentNumber: "ARG-2026-0002",
      details:
        "The street light near the waiting shed is not working, making the area too dark at night.",
      images: ["https://placehold.co/600x400/png"],
      verified: true,
      likes: 8,
      comments: 2,
    },
    {
      id: "rep_003",
      userId: "user_001",
      location: "Market Road",
      incidentType: "Noise Complaint",
      incidentNumber: "ARG-2026-0003",
      details: "Loud videoke music was reported past midnight.",
      images: ["https://placehold.co/600x400/png"],
      verified: false,
      likes: 5,
      comments: 1,
    },
  ];

  const [filter, setFilter] = useState("All");

  const currentUserReports = reports.filter((report) => {
    const isCurrentUser = report.userId === currentUser.id;

    if (filter === "Verified") {
      return isCurrentUser && report.verified;
    }

    if (filter === "Unverified") {
      return isCurrentUser && !report.verified;
    }

    return isCurrentUser;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "All" && styles.activeFilterButton,
            ]}
            onPress={() => setFilter("All")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "All" && styles.activeFilterText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "Verified" && styles.activeFilterButton,
            ]}
            onPress={() => setFilter("Verified")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "Verified" && styles.activeFilterText,
              ]}
            >
              Verified
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "Unverified" && styles.activeFilterButton,
            ]}
            onPress={() => setFilter("Unverified")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "Unverified" && styles.activeFilterText,
              ]}
            >
              Unverified
            </Text>
          </TouchableOpacity>
        </View>

        {currentUserReports.map((report) => (
          <ReportPost_Layout
            key={report.id}
            userName={currentUser.username}
            userAvatar={currentUser.avatar}
            location={report.location}
            incidentType={report.incidentType}
            incidentNumber={report.incidentNumber}
            details={report.details}
            images={report.images}
            verified={report.verified}
            likes={report.likes}
            comments={report.comments}
            onLike={() => console.log(`Liked ${report.id}`)}
            onComment={() => console.log(`Commented on ${report.id}`)}
            onAddMedia={() => console.log(`Add media to ${report.id}`)}
            style={styles.reportCardSpacing}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default User_Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 120,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 14,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#DCE6F8",
  },
  activeFilterButton: {
    backgroundColor: "#294880",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#294880",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  reportCardSpacing: {
    marginBottom: 16,
  },
});