import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const UserReport = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("All Reports");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const reports = [
    {
      id: "1",
      crimeType: "Robbery",
      location: "Mabini St.",
      time: "15 minutes ago",
      status: "In Review",
      description: "Victim attacked for wallet and phone",
      comments: 23,
      saved: false,
      mine: true,
    },
    {
      id: "2",
      crimeType: "Suspicious Activity",
      location: "Arroyo Blvd. & Perez Rd.",
      time: "1 hour ago",
      status: "Verified",
      description: "Suspicious person loitering near a convenience store",
      comments: 15,
      saved: true,
      mine: false,
    },
    {
      id: "3",
      crimeType: "Car Theft",
      location: "Central Ave.",
      time: "2 hours ago",
      status: "In Review",
      description: "Car reported stolen from parking lot",
      comments: 8,
      saved: false,
      mine: true,
    },
    {
      id: "4",
      crimeType: "Assault",
      location: "Rizal Park",
      time: "3 hours ago",
      status: "Verified",
      description: "Physical altercation reported by multiple witnesses",
      comments: 12,
      saved: true,
      mine: false,
    },
  ];

  const filteredReports = useMemo(() => {
    if (filter === "My Reports") {
      return reports.filter((item) => item.mine);
    }

    if (filter === "Saved Reports") {
      return reports.filter((item) => item.saved);
    }

    return reports;
  }, [filter]);

  const totalReports = reports.length;
  const verifiedReports = reports.filter(
    (item) => item.status === "Verified",
  ).length;
  const reviewReports = reports.filter(
    (item) => item.status === "In Review",
  ).length;

  const ReportCard = ({ item }) => {
    const isVerified = item.status === "Verified";

    return (
      <TouchableOpacity activeOpacity={0.88} style={styles.reportCard}>
        <View style={styles.cardTopRow}>
          <View style={styles.typeWrap}>
            <View
              style={[
                styles.typeDot,
                {
                  backgroundColor: isVerified ? "#2E9E5B" : "#F4A62A",
                },
              ]}
            />
            <ThemedText style={styles.crimeType}>{item.crimeType}</ThemedText>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isVerified ? "#E8F7EE" : "#FFF4DF",
              },
            ]}
          >
            <ThemedText
              style={[
                styles.statusText,
                {
                  color: isVerified ? "#2E7D4F" : "#B9770E",
                },
              ]}
            >
              {item.status}
            </ThemedText>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <ThemedText style={styles.locationText}>{item.location}</ThemedText>
        </View>

        <ThemedText style={styles.descriptionText}>
          {item.description}
        </ThemedText>

        <View style={styles.cardFooter}>
          <View style={styles.metaGroup}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <ThemedText style={styles.metaText}>{item.time}</ThemedText>
            </View>

            <View style={styles.metaItem}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={14}
                color="#6B7280"
              />
              <ThemedText style={styles.metaText}>{item.comments}</ThemedText>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.85}>
            <ThemedText style={styles.detailsText}>View Details</ThemedText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            <View style={styles.headerSection}>
              <View style={styles.headerTop}>
                <View style={{ flex: 1 }}>
                  <ThemedText style={styles.pageTitle}>Reports</ThemedText>
                  <ThemedText style={styles.pageSubtitle}>
                    View verified incidents, track reports, and submit new
                    safety alerts.
                  </ThemedText>
                </View>

                <TouchableOpacity
                  style={styles.newReportButton}
                  onPress={() => router.push("/User_PostReport")}
                  activeOpacity={0.88}
                >
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                  <ThemedText style={styles.newReportText}>
                    New Report
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <ThemedText style={styles.statNumber}>
                    {totalReports}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>
                    Total Reports
                  </ThemedText>
                </View>

                <View style={styles.statCard}>
                  <ThemedText style={styles.statNumber}>
                    {verifiedReports}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>Verified</ThemedText>
                </View>

                <View style={styles.statCard}>
                  <ThemedText style={styles.statNumber}>
                    {reviewReports}
                  </ThemedText>
                  <ThemedText style={styles.statLabel}>In Review</ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.toolbarSection}>
              <View style={styles.sectionHeaderRow}>
                <ThemedText style={styles.sectionTitle}>
                  Recent Reports
                </ThemedText>
              </View>

              <View style={styles.filterArea}>
                <TouchableOpacity
                  style={styles.filterDropdown}
                  activeOpacity={0.88}
                  onPress={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <View style={styles.filterLeft}>
                    <Ionicons
                      name="options-outline"
                      size={16}
                      color="#294880"
                    />
                    <ThemedText style={styles.filterText}>{filter}</ThemedText>
                  </View>

                  <Ionicons
                    name={showFilterDropdown ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#294880"
                  />
                </TouchableOpacity>

                {showFilterDropdown && (
                  <View style={styles.dropdownOptions}>
                    {["All Reports", "My Reports", "Saved Reports"].map(
                      (option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.dropdownItem,
                            filter === option && styles.dropdownItemActive,
                          ]}
                          activeOpacity={0.88}
                          onPress={() => {
                            setFilter(option);
                            setShowFilterDropdown(false);
                          }}
                        >
                          <ThemedText
                            style={[
                              styles.dropdownItemText,
                              filter === option &&
                                styles.dropdownItemTextActive,
                            ]}
                          >
                            {option}
                          </ThemedText>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>
                )}
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => <ReportCard item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={34} color="#9AA4B2" />
            <ThemedText style={styles.emptyTitle}>No reports found</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Try changing your filter or add a new report.
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FB" },
  listContainer: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 30 },
  headerSection: { marginBottom: 16 },
  headerTop: { marginBottom: 14 },
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
    marginBottom: 14,
  },
  newReportButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#294880",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
  },
  newReportText: {
    color: "#FFFFFF",
    fontWeight: "800",
    marginLeft: 6,
    fontSize: 13,
  },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
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
  statLabel: { fontSize: 11, color: "#6B7280", textAlign: "center" },
  toolbarSection: { marginBottom: 14, zIndex: 10 },
  sectionHeaderRow: { marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#1F2A37" },
  filterArea: { position: "relative" },
  filterDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },
  filterLeft: { flexDirection: "row", alignItems: "center" },
  filterText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
  },
  dropdownOptions: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 14 },
  dropdownItemActive: { backgroundColor: "#EEF3FF" },
  dropdownItemText: { fontSize: 13, color: "#4B5563", fontWeight: "600" },
  dropdownItemTextActive: { color: "#294880", fontWeight: "800" },
  reportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  typeDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  crimeType: { fontSize: 15, fontWeight: "800", color: "#1F2937" },
  statusBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  statusText: { fontSize: 11, fontWeight: "800" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#667085",
  },
  descriptionText: { fontSize: 13, lineHeight: 20, color: "#5F6B7A" },
  cardFooter: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaGroup: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", marginRight: 14 },
  metaText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  detailsText: { fontSize: 12, fontWeight: "800", color: "#D64545" },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    padding: 24,
    alignItems: "center",
    marginTop: 10,
  },
  emptyTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2A37",
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 20,
  },
});
export default UserReport;
