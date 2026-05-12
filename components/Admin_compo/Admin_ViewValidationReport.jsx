import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ARGUS_BLUE = "#294880";

export default function Admin_ViewValidationReport({
  visible,
  report,
  compiledGroup,
  onClose,
  onVerify,
  onReject,
  onMapAndVerify,
}) {
  const isCompiled = !!compiledGroup;
  const activeReport = report || compiledGroup?.reports?.[0];

  if (!activeReport && !compiledGroup) {
    return null;
  }

  const getStatusStyle = (status) => {
    if (status === "Resolved") {
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

    if (status === "Under Verification") {
      return {
        bg: "#EAF2FF",
        color: ARGUS_BLUE,
      };
    }

    if (status === "Archived") {
      return {
        bg: "#EEF1F5",
        color: "#6B7280",
      };
    }

    return {
      bg: "#FFF4E5",
      color: "#C98A2E",
    };
  };

  const getCompiledStatusText = () => {
    if (!compiledGroup?.statusSummary) return "No status summary";

    return Object.entries(compiledGroup.statusSummary)
      .map(([status, count]) => `${status}: ${count}`)
      .join(" • ");
  };

  const statusStyle = getStatusStyle(activeReport?.status);

  const handleVerify = () => {
    if (isCompiled) {
      onVerify?.(compiledGroup);
      return;
    }

    onVerify?.(activeReport);
  };

  const handleReject = () => {
    if (isCompiled) {
      onReject?.(compiledGroup);
      return;
    }

    onReject?.(activeReport);
  };

  const handleMapAndVerify = () => {
    if (isCompiled) {
      onMapAndVerify?.(compiledGroup);
      return;
    }

    onMapAndVerify?.(activeReport);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIconBox}>
                <Ionicons
                  name={isCompiled ? "copy-outline" : "document-text-outline"}
                  size={24}
                  color={ARGUS_BLUE}
                />
              </View>

              <View style={styles.headerTextBox}>
                <Text style={styles.modalTitle}>
                  {isCompiled
                    ? "Compiled Incident Report"
                    : "Validation Report"}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {isCompiled
                    ? "Multiple reports detected for the same incident"
                    : "Review report details, AI credibility, and action status"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Ionicons name="close-outline" size={24} color="#4B5D7A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            {isCompiled ? (
              <>
                <View style={styles.compiledHeroCard}>
                  <View style={styles.compiledHeroLeft}>
                    <Text style={styles.incidentTitle}>
                      {compiledGroup.type} in {compiledGroup.barangay}
                    </Text>

                    <Text style={styles.incidentLocation}>
                      {compiledGroup.location}
                    </Text>

                    <Text style={styles.incidentCategory}>
                      {compiledGroup.category}
                    </Text>
                  </View>

                  <View style={styles.reportCountBadge}>
                    <Text style={styles.reportCountNumber}>
                      {compiledGroup.reportCount}
                    </Text>
                    <Text style={styles.reportCountLabel}>Reports</Text>
                  </View>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Reported Same Incident</Text>
                    <Text style={styles.infoValue}>
                      {compiledGroup.reportCount} reports
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>User Reports</Text>
                    <Text style={styles.infoValue}>
                      {compiledGroup.userCount}
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Admin Reports</Text>
                    <Text style={styles.infoValue}>
                      {compiledGroup.adminCount}
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Highest AI Score</Text>
                    <Text style={styles.infoValue}>
                      {compiledGroup.highestAiScore}%
                    </Text>
                  </View>
                </View>

                <View style={styles.sectionCard}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons
                      name="git-merge-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />
                    <Text style={styles.sectionTitle}>Compiled Summary</Text>
                  </View>

                  <Text style={styles.paragraphText}>
                    This compiled incident groups reports with the same incident
                    category, incident type, and barangay. This prevents
                    repeated reports of the same incident from being handled as
                    separate unrelated cases.
                  </Text>

                  <Text style={styles.paragraphText}>
                    Example: if 5 users report the same robbery in Cansuje, the
                    system displays it as 1 compiled incident with 5 related
                    reports.
                  </Text>

                  <Text style={styles.compiledStatusText}>
                    {getCompiledStatusText()}
                  </Text>
                </View>

                <View style={styles.sectionCard}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons
                      name="documents-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />
                    <Text style={styles.sectionTitle}>Included Reports</Text>
                  </View>

                  {compiledGroup.reports?.map((item, index) => {
                    const itemStatusStyle = getStatusStyle(item.status);

                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.includedReportRow,
                          index !== 0 && styles.rowDivider,
                        ]}
                      >
                        <View style={styles.includedReportTop}>
                          <Text style={styles.includedReportId}>{item.id}</Text>

                          <View
                            style={[
                              styles.statusBadge,
                              { backgroundColor: itemStatusStyle.bg },
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusText,
                                { color: itemStatusStyle.color },
                              ]}
                            >
                              {item.status}
                            </Text>
                          </View>
                        </View>

                        <Text style={styles.includedReportTitle}>
                          {item.title}
                        </Text>

                        <Text style={styles.includedReportMeta}>
                          Submitted by {item.submittedBy} ({item.submittedRole})
                          {" • "}
                          {item.submittedAt}
                        </Text>

                        <Text style={styles.includedReportDetails}>
                          {item.details}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            ) : (
              <>
                <View style={styles.singleHeroCard}>
                  <View style={styles.singleHeroTop}>
                    <View style={styles.singleHeroTitleBox}>
                      <Text style={styles.incidentTitle}>
                        {activeReport.title}
                      </Text>

                      <Text style={styles.incidentLocation}>
                        {activeReport.location}
                      </Text>
                    </View>

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
                        {activeReport.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.incidentCategory}>
                    {activeReport.category} • {activeReport.type}
                  </Text>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Report ID</Text>
                    <Text style={styles.infoValue}>{activeReport.id}</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>AI Score</Text>
                    <Text style={styles.infoValue}>
                      {activeReport.aiScore}%
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Severity</Text>
                    <Text style={styles.infoValue}>
                      {activeReport.severity}
                    </Text>
                  </View>

                  <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Sentiment</Text>
                    <Text style={styles.infoValue}>
                      {activeReport.sentiment}
                    </Text>
                  </View>
                </View>

                <View style={styles.sectionCard}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />
                    <Text style={styles.sectionTitle}>Report Details</Text>
                  </View>

                  <Text style={styles.paragraphText}>
                    {activeReport.details}
                  </Text>
                </View>

                <View style={styles.sectionCard}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons
                      name="sparkles-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />
                    <Text style={styles.sectionTitle}>AI Credibility Review</Text>
                  </View>

                  <Text style={styles.paragraphText}>
                    {activeReport.credibilityReview}
                  </Text>
                </View>

                <View style={styles.sectionCard}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />
                    <Text style={styles.sectionTitle}>Submission Info</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Submitted By</Text>
                    <Text style={styles.detailValue}>
                      {activeReport.submittedBy} ({activeReport.submittedRole})
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Submitted At</Text>
                    <Text style={styles.detailValue}>
                      {activeReport.submittedAt}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Barangay</Text>
                    <Text style={styles.detailValue}>
                      {activeReport.barangay}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Verified By</Text>
                    <Text style={styles.detailValue}>
                      {activeReport.verifiedBy || "Not yet verified"}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Remarks</Text>
                    <Text style={styles.detailValue}>
                      {activeReport.remarks || "No remarks yet"}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.footerActions}>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={handleReject}
              activeOpacity={0.85}
            >
              <Ionicons name="close-circle-outline" size={18} color="#E45757" />
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
              activeOpacity={0.85}
            >
              <Ionicons name="sync-outline" size={18} color={ARGUS_BLUE} />
              <Text style={styles.verifyButtonText}>Under Verification</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resolveButton}
              onPress={handleMapAndVerify}
              activeOpacity={0.85}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.resolveButtonText}>Resolve / Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    width: Platform.OS === "web" ? "78%" : "96%",
    maxWidth: 980,
    maxHeight: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D9E2F0",
  },

  modalHeader: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF3",
    backgroundColor: "#F8FBFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  headerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerTextBox: {
    flex: 1,
    minWidth: 0,
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  modalSubtitle: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    marginTop: 3,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },

  bodyScroll: {
    flexGrow: 0,
  },

  bodyContent: {
    padding: 22,
    paddingBottom: 12,
  },

  compiledHeroCard: {
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  compiledHeroLeft: {
    flex: 1,
    minWidth: 0,
  },

  singleHeroCard: {
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  singleHeroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },

  singleHeroTitleBox: {
    flex: 1,
    minWidth: 0,
  },

  incidentTitle: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: "#111827",
  },

  incidentLocation: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    marginTop: 4,
  },

  incidentCategory: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: ARGUS_BLUE,
    marginTop: 8,
  },

  reportCountBadge: {
    width: 96,
    borderRadius: 18,
    backgroundColor: "#EAF2FF",
    borderWidth: 1,
    borderColor: "#D6E0F0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  reportCountNumber: {
    fontSize: 30,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  reportCountLabel: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#5D6F92",
    marginTop: -2,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  infoBox: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 14,
    padding: 14,
  },

  infoLabel: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#7A8BA8",
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  paragraphText: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    lineHeight: 21,
    marginBottom: 8,
  },

  compiledStatusText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#6B7280",
    marginTop: 8,
  },

  includedReportRow: {
    paddingVertical: 12,
  },

  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
  },

  includedReportTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  includedReportId: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  includedReportTitle: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#111827",
    marginBottom: 4,
  },

  includedReportMeta: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#7A8BA8",
    marginBottom: 5,
  },

  includedReportDetails: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#5D6F92",
    lineHeight: 19,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3FA",
  },

  detailLabel: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#7A8BA8",
  },

  detailValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#294880",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 11,
    fontFamily: "PoppinsSemiBold",
  },

  footerActions: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E4EAF3",
    backgroundColor: "#F8FBFF",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    flexWrap: "wrap",
  },

  rejectButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFD6D6",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  rejectButtonText: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#E45757",
  },

  verifyButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#EAF2FF",
    borderWidth: 1,
    borderColor: "#D6E0F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  verifyButtonText: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  resolveButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: ARGUS_BLUE,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  resolveButtonText: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});