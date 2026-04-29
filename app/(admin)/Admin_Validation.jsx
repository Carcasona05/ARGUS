import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Admin_Layout from "../../components/Admin_compo/Admin_Layout";
import Admin_ViewValidationReport from "../../components/Admin_compo/Admin_ViewValidationReport";

export default function Admin_Validation() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewVisible, setIsViewVisible] = useState(false);

  const [reports, setReports] = useState([
    {
      id: "ARG-2031",
      title: "Road accident near Poblacion",
      category: "Traffic and Road Incidents",
      type: "Road Accident",
      location: "Poblacion, Argao, Cebu",
      barangay: "Poblacion",
      submittedBy: "Juan Dela Cruz",
      submittedRole: "User",
      status: "Pending",
      details:
        "A motorcycle and tricycle collision was reported near the public market road.",
      photo: "accident_photo.jpg",
      aiScore: 92,
      sentiment: "Urgent",
      credibilityReview: "Highly credible based on location and report details.",
      severity: "High",
      submittedAt: "Apr 29, 2026 • 10:30 AM",
      verifiedBy: null,
      verifiedAt: null,
      remarks: "",
      mapVisible: false,
    },
    {
      id: "ARG-2032",
      title: "Suspicious activity near Public Market",
      category: "Suspicious Activities",
      type: "Suspicious Activity",
      location: "Argao Public Market Area",
      barangay: "Poblacion",
      submittedBy: "Admin R. Ramos",
      submittedRole: "Admin",
      status: "Verified",
      details:
        "Admin-created report after monitoring suspicious activity around the market area.",
      photo: "market_report.jpg",
      aiScore: 95,
      sentiment: "Concern",
      credibilityReview: "Admin-created report. Automatically verified.",
      severity: "Medium",
      submittedAt: "Apr 29, 2026 • 9:46 AM",
      verifiedBy: "Admin R. Ramos",
      verifiedAt: "Apr 29, 2026 • 9:46 AM",
      remarks: "Admin-created report. Auto verified and mapped.",
      mapVisible: true,
    },
    {
      id: "ARG-2033",
      title: "Flood report near San Miguel",
      category: "Community and Environmental Concerns",
      type: "Flood",
      location: "Brgy. San Miguel, Argao",
      barangay: "San Miguel",
      submittedBy: "Maria Lopez",
      submittedRole: "User",
      status: "Pending",
      details:
        "Heavy rain caused roadside flooding near a residential area.",
      photo: "flood_report.jpg",
      aiScore: 88,
      sentiment: "Anxious",
      credibilityReview: "Likely credible but needs admin review.",
      severity: "Medium",
      submittedAt: "Apr 29, 2026 • 8:20 AM",
      verifiedBy: null,
      verifiedAt: null,
      remarks: "",
      mapVisible: false,
    },
    {
      id: "ARG-2034",
      title: "False fire alarm report",
      category: "Public Safety Incidents",
      type: "Fire",
      location: "Brgy. Talaga, Argao",
      barangay: "Talaga",
      submittedBy: "Unknown User",
      submittedRole: "User",
      status: "Rejected",
      details:
        "Report was reviewed and marked invalid due to unclear details and duplicate submission.",
      photo: "fire_report.jpg",
      aiScore: 41,
      sentiment: "Unclear",
      credibilityReview: "Low credibility. Duplicate and incomplete information.",
      severity: "Low",
      submittedAt: "Apr 28, 2026 • 5:15 PM",
      verifiedBy: "Admin R. Ramos",
      verifiedAt: "Apr 28, 2026 • 5:30 PM",
      remarks: "Rejected because the report was duplicate and unclear.",
      mapVisible: false,
    },
  ]);

  const filters = ["All", "Pending", "Verified", "Rejected", "Admin-Created"];

  const filteredReports = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesFilter =
        selectedFilter === "All" ||
        report.status === selectedFilter ||
        (selectedFilter === "Admin-Created" &&
          report.submittedRole === "Admin");

      const matchesSearch =
        !query ||
        report.id.toLowerCase().includes(query) ||
        report.title.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query) ||
        report.status.toLowerCase().includes(query) ||
        report.submittedRole.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [reports, selectedFilter, searchText]);

  const totalCount = reports.length;
  const pendingCount = reports.filter((item) => item.status === "Pending").length;
  const verifiedCount = reports.filter((item) => item.status === "Verified").length;
  const rejectedCount = reports.filter((item) => item.status === "Rejected").length;

  const showMessage = (message) => {
    if (Platform.OS === "web") {
      window.alert(message);
      return;
    }

    alert(message);
  };

  const openViewModal = (report) => {
    setSelectedReport(report);
    setIsViewVisible(true);
  };

  const closeViewModal = () => {
    setSelectedReport(null);
    setIsViewVisible(false);
  };

  const updateReportStatus = (reportId, status, remarks = "") => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id !== reportId) return report;

        return {
          ...report,
          status,
          verifiedBy: "Admin R. Ramos",
          verifiedAt: "Apr 29, 2026 • Current Time",
          remarks,
          mapVisible: status === "Verified",
        };
      })
    );

    closeViewModal();
  };

  const handleVerify = (report) => {
    updateReportStatus(
      report.id,
      "Verified",
      "Report verified by admin after review."
    );
  };

  const handleReject = (report) => {
    updateReportStatus(
      report.id,
      "Rejected",
      "Report rejected after admin review."
    );
  };

  const handleMapAndVerify = (report) => {
    updateReportStatus(
      report.id,
      "Verified",
      "Report mapped and verified by admin."
    );
  };

  const handleAddAdminReport = () => {
    const newReport = {
      id: `ARG-${Date.now().toString().slice(-4)}`,
      title: "Admin-created incident report",
      category: "Public Safety Incidents",
      type: "Admin Report",
      location: "Poblacion, Argao, Cebu",
      barangay: "Poblacion",
      submittedBy: "Admin R. Ramos",
      submittedRole: "Admin",
      status: "Verified",
      details:
        "This is an admin-created report. Since it came from an admin, it is automatically verified and visible on the map.",
      photo: "admin_report.jpg",
      aiScore: 100,
      sentiment: "Official",
      credibilityReview: "Admin-created report. Automatically verified.",
      severity: "Medium",
      submittedAt: "Apr 29, 2026 • Current Time",
      verifiedBy: "Admin R. Ramos",
      verifiedAt: "Apr 29, 2026 • Current Time",
      remarks: "Admin-created report. Auto verified and mapped.",
      mapVisible: true,
    };

    setReports((prev) => [newReport, ...prev]);
    showMessage("Admin report added and automatically verified.");
  };

  const getStatusStyle = (status) => {
    if (status === "Verified") {
      return {
        bg: "#EAF8F1",
        color: "#22A06B",
      };
    }

    if (status === "Rejected") {
      return {
        bg: "#FFF5F5",
        color: "#E45757",
      };
    }

    return {
      bg: "#FFF4E5",
      color: "#C98A2E",
    };
  };

  const StatCard = ({ icon, title, value, color, bg }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={23} color={color} />
      </View>

      <View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <Admin_Layout>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerCard}>
            <View>
              <Text style={styles.pageTitle}>Validation</Text>
              <Text style={styles.pageSubtitle}>
                Manage submitted reports, validate user reports, and add
                admin-created reports.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddAdminReport}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Admin Report</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon="document-text-outline"
              title="Total Reports"
              value={totalCount}
              color="#294880"
              bg="#EAF2FF"
            />

            <StatCard
              icon="time-outline"
              title="Pending"
              value={pendingCount}
              color="#C98A2E"
              bg="#FFF4E5"
            />

            <StatCard
              icon="shield-checkmark-outline"
              title="Verified"
              value={verifiedCount}
              color="#22A06B"
              bg="#EAF8F1"
            />

            <StatCard
              icon="close-circle-outline"
              title="Rejected"
              value={rejectedCount}
              color="#E45757"
              bg="#FFF5F5"
            />
          </View>

          <View style={styles.filterCard}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#5D6F92" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by ID, type, location, status..."
                placeholderTextColor="#8A98B3"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
            >
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;

                return (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterPill,
                      isActive && styles.activeFilterPill,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        isActive && styles.activeFilterPillText,
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.reportListCard}>
            <View style={styles.listHeader}>
              <View>
                <Text style={styles.sectionTitle}>Report List</Text>
                <Text style={styles.sectionSubtitle}>
                  Validation and report management are combined here.
                </Text>
              </View>

              <Text style={styles.resultText}>
                {filteredReports.length} result
                {filteredReports.length === 1 ? "" : "s"}
              </Text>
            </View>

            {filteredReports.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={38} color="#5D6F92" />
                <Text style={styles.emptyTitle}>No reports found</Text>
                <Text style={styles.emptyText}>
                  Try changing the search keyword or selected filter.
                </Text>
              </View>
            ) : (
              filteredReports.map((report, index) => {
                const statusStyle = getStatusStyle(report.status);

                return (
                  <TouchableOpacity
                    key={report.id}
                    style={[
                      styles.reportRow,
                      index !== 0 && styles.reportRowBorder,
                    ]}
                    onPress={() => openViewModal(report)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.reportLeft}>
                      <View style={styles.reportIconBox}>
                        <Ionicons
                          name={
                            report.submittedRole === "Admin"
                              ? "person-circle-outline"
                              : "document-text-outline"
                          }
                          size={22}
                          color="#294880"
                        />
                      </View>

                      <View style={styles.reportInfo}>
                        <View style={styles.reportTitleRow}>
                          <Text style={styles.reportTitle}>{report.title}</Text>

                          <View
                            style={[
                              styles.statusBadge,
                              { backgroundColor: statusStyle.bg },
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusText,
                                { color: statusStyle.color },
                              ]}
                            >
                              {report.status}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.reportMeta}>
                          {report.id} • {report.type} • {report.location}
                        </Text>

                        <Text style={styles.reportSubMeta}>
                          Submitted by {report.submittedBy} ({report.submittedRole})
                        </Text>
                      </View>
                    </View>

                    <View style={styles.reportRight}>
                      <Text style={styles.scoreText}>{report.aiScore}%</Text>
                      <Text style={styles.scoreLabel}>AI Score</Text>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={18}
                        color="#8A98B3"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>

        <Admin_ViewValidationReport
          visible={isViewVisible}
          report={selectedReport}
          onClose={closeViewModal}
          onVerify={handleVerify}
          onReject={handleReject}
          onMapAndVerify={handleMapAndVerify}
        />
      </View>
    </Admin_Layout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  pageTitle: {
    fontSize: 24,
    color: "#294880",
    fontWeight: "800",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 14,
    color: "#5D6F92",
    lineHeight: 21,
  },

  addButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    minWidth: 190,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2F4267",
  },

  statTitle: {
    fontSize: 13,
    color: "#5D6F92",
    marginTop: 4,
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  searchBox: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    color: "#294880",
    fontSize: 14,
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  filterRow: {
    gap: 10,
  },

  filterPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilterPill: {
    backgroundColor: "#294880",
    borderColor: "#294880",
  },

  filterPillText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
  },

  activeFilterPillText: {
    color: "#FFFFFF",
  },

  reportListCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    overflow: "hidden",
  },

  listHeader: {
    minHeight: 76,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#5D6F92",
  },

  resultText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#294880",
  },

  reportRow: {
    minHeight: 92,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  reportRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
  },

  reportLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  reportIconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  reportInfo: {
    flex: 1,
    minWidth: 0,
  },

  reportTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    flexWrap: "wrap",
  },

  reportTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  reportMeta: {
    fontSize: 13,
    color: "#5D6F92",
    marginBottom: 4,
  },

  reportSubMeta: {
    fontSize: 12,
    color: "#7A8BA8",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },

  reportRight: {
    minWidth: 88,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  scoreText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#294880",
  },

  scoreLabel: {
    fontSize: 11,
    color: "#7A8BA8",
    marginBottom: 4,
  },

  emptyState: {
    paddingVertical: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2F4267",
    marginTop: 10,
    marginBottom: 4,
  },

  emptyText: {
    fontSize: 13,
    color: "#5D6F92",
  },
});