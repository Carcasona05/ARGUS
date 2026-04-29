import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Admin_ViewValidationReport({
  visible,
  report,
  onClose,
  onVerify,
  onReject,
  onMapAndVerify,
}) {
  if (!report) return null;

  const isPending = report.status === "Pending";
  const isVerified = report.status === "Verified";
  const isRejected = report.status === "Rejected";

  const getStatusStyle = () => {
    if (isVerified) {
      return {
        bg: "#EAF8F1",
        color: "#22A06B",
      };
    }

    if (isRejected) {
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

  const statusStyle = getStatusStyle();

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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
            <View>
              <Text style={styles.modalTitle}>Report Details</Text>
              <Text style={styles.modalSubtitle}>{report.id}</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.75}
            >
              <Ionicons name="close-outline" size={24} color="#294880" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>
                    {getInitials(report.submittedBy)}
                  </Text>
                </View>

                <View style={styles.postHeaderInfo}>
                  <Text style={styles.postAuthor}>{report.submittedBy}</Text>

                  <View style={styles.postMetaRow}>
                    <Text style={styles.postMetaText}>
                      {report.submittedRole}
                    </Text>

                    <Text style={styles.postDot}>•</Text>

                    <Text style={styles.postMetaText}>
                      {report.submittedAt}
                    </Text>

                    <Text style={styles.postDot}>•</Text>

                    <Ionicons name="earth-outline" size={13} color="#6B7280" />
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusStyle.bg },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: statusStyle.color }]}
                  >
                    {report.status}
                  </Text>
                </View>
              </View>

              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{report.title}</Text>

                <Text style={styles.postDetails}>{report.details}</Text>

                <View style={styles.postLocationRow}>
                  <Ionicons name="location-outline" size={16} color="#294880" />
                  <Text style={styles.postLocation}>{report.location}</Text>
                </View>
              </View>

              <View style={styles.postImageBox}>
                <Ionicons name="image-outline" size={36} color="#8A98B3" />
                <Text style={styles.postImageText}>
                  {report.photo || "No photo attached"}
                </Text>
              </View>

              <View style={styles.postInfoGrid}>
                <View style={styles.postInfoItem}>
                  <Text style={styles.postInfoLabel}>Category</Text>
                  <Text style={styles.postInfoValue}>{report.category}</Text>
                </View>

                <View style={styles.postInfoItem}>
                  <Text style={styles.postInfoLabel}>Incident Type</Text>
                  <Text style={styles.postInfoValue}>{report.type}</Text>
                </View>

                <View style={styles.postInfoItem}>
                  <Text style={styles.postInfoLabel}>Barangay</Text>
                  <Text style={styles.postInfoValue}>{report.barangay}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>AI Review</Text>

              <View style={styles.aiRow}>
                <View style={styles.aiScoreBox}>
                  <Text style={styles.aiScore}>{report.aiScore}%</Text>
                  <Text style={styles.aiLabel}>Credit Score</Text>
                </View>

                <View style={styles.aiInfo}>
                  <Text style={styles.aiInfoText}>
                    Sentiment:{" "}
                    <Text style={styles.aiInfoBold}>{report.sentiment}</Text>
                  </Text>

                  <Text style={styles.aiInfoText}>
                    Severity:{" "}
                    <Text style={styles.aiInfoBold}>{report.severity}</Text>
                  </Text>

                  <Text style={styles.aiInfoText}>
                    Review:{" "}
                    <Text style={styles.aiInfoBold}>
                      {report.credibilityReview}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>Verification Information</Text>

              <InfoLine
                label="Verified By"
                value={report.verifiedBy || "Not verified yet"}
              />

              <InfoLine
                label="Verified At"
                value={report.verifiedAt || "Not verified yet"}
              />

              <InfoLine
                label="Map Visible"
                value={report.mapVisible ? "Yes" : "No"}
              />

              <InfoLine
                label="Remarks"
                value={report.remarks || "No remarks yet"}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>

            {isPending && (
              <>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => onReject(report)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={17}
                    color="#E45757"
                  />
                  <Text style={styles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={() => onVerify(report)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={17}
                    color="#FFFFFF"
                  />
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => onMapAndVerify(report)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="map-outline" size={17} color="#FFFFFF" />
                  <Text style={styles.mapButtonText}>Map & Verify</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

function InfoLine({ label, value }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLineLabel}>{label}</Text>
      <Text style={styles.infoLineValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 30, 55, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 760,
    maxHeight: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    overflow: "hidden",
  },

  modalHeader: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    backgroundColor: "#F7F9FD",
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#294880",
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#5D6F92",
    marginTop: 3,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  modalBody: {
    flexGrow: 0,
  },

  modalBodyContent: {
    padding: 20,
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAF3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  postAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  postAvatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  postHeaderInfo: {
    flex: 1,
  },

  postAuthor: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 3,
  },

  postMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  postMetaText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  postDot: {
    fontSize: 12,
    color: "#6B7280",
    marginHorizontal: 5,
  },

  postContent: {
    marginBottom: 14,
  },

  postTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  postDetails: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 10,
  },

  postLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  postLocation: {
    fontSize: 13,
    color: "#294880",
    fontWeight: "700",
  },

  postImageBox: {
    height: 190,
    borderRadius: 14,
    backgroundColor: "#F3F6FB",
    borderWidth: 1,
    borderColor: "#D9E2F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  postImageText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
    marginTop: 8,
  },

  postInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEF3FA",
    paddingTop: 14,
  },

  postInfoItem: {
    flex: 1,
    minWidth: 170,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#E4EAF3",
    borderRadius: 12,
    padding: 12,
  },

  postInfoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
    fontWeight: "600",
  },

  postInfoValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "800",
    lineHeight: 18,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginLeft: 10,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },

  sectionBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAF3",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 8,
  },

  aiRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },

  aiScoreBox: {
    width: 110,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  aiScore: {
    fontSize: 26,
    fontWeight: "800",
    color: "#294880",
  },

  aiLabel: {
    fontSize: 12,
    color: "#5D6F92",
    marginTop: 3,
  },

  aiInfo: {
    flex: 1,
  },

  aiInfoText: {
    fontSize: 14,
    color: "#5D6F92",
    lineHeight: 22,
  },

  aiInfoBold: {
    color: "#2F4267",
    fontWeight: "800",
  },

  infoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3FA",
  },

  infoLineLabel: {
    fontSize: 13,
    color: "#5D6F92",
    fontWeight: "600",
  },

  infoLineValue: {
    flex: 1,
    fontSize: 13,
    color: "#2F4267",
    fontWeight: "700",
    textAlign: "right",
  },

  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#D9E2F0",
    backgroundColor: "#F7F9FD",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 10,
  },

  cancelButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: "#2F4267",
    fontSize: 13,
    fontWeight: "700",
  },

  rejectButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 11,
    backgroundColor: "#FFF5F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  rejectButtonText: {
    color: "#E45757",
    fontSize: 13,
    fontWeight: "800",
  },

  verifyButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 11,
    backgroundColor: "#22A06B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  mapButton: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 11,
    backgroundColor: "#294880",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});