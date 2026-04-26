import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#294880",
  primarySoft: "#EAF2FF",
  primaryBorder: "#D9E2F0",
  text: "#2F4267",
  textMuted: "#5D6F92",
  white: "#FFFFFF",
  background: "#F5F8FC",
  surfaceSoft: "#F7F9FD",
  success: "#22A06B",
  successSoft: "#EAF8F1",
  danger: "#E45757",
  dangerSoft: "#FFF5F5",
  warning: "#C98A2E",
  warningSoft: "#FFF4E5",
  pendingSoft: "#EEF3FB",
};

function StatusBadge({ label }) {
  const value = (label || "").toLowerCase();

  let badgeStyle = {
    backgroundColor: COLORS.pendingSoft,
    color: COLORS.primary,
    icon: "ellipse-outline",
  };

  if (value === "verified") {
    badgeStyle = {
      backgroundColor: COLORS.successSoft,
      color: COLORS.success,
      icon: "shield-checkmark-outline",
    };
  } else if (value === "rejected") {
    badgeStyle = {
      backgroundColor: COLORS.dangerSoft,
      color: COLORS.danger,
      icon: "close-circle-outline",
    };
  } else if (value === "resolved") {
    badgeStyle = {
      backgroundColor: COLORS.primarySoft,
      color: COLORS.primary,
      icon: "checkmark-done-circle-outline",
    };
  } else if (value === "pending") {
    badgeStyle = {
      backgroundColor: COLORS.warningSoft,
      color: COLORS.warning,
      icon: "time-outline",
    };
  }

  return (
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: badgeStyle.backgroundColor },
      ]}
    >
      <Ionicons name={badgeStyle.icon} size={14} color={badgeStyle.color} />
      <Text style={[styles.statusBadgeText, { color: badgeStyle.color }]}>
        {label}
      </Text>
    </View>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIconBox}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
      </View>

      <View style={styles.detailTextWrap}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function Admin_ViewReport({ visible, report, onClose }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 760;

  if (!report) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.reportIconBox}>
                <Ionicons
                  name="document-text-outline"
                  size={26}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.headerTextWrap}>
                <Text style={styles.modalTitle}>Report Details</Text>
                <Text style={styles.modalSubtitle}>{report.id}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.85}
              onPress={onClose}
            >
              <Ionicons name="close" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.summaryCard}>
              <View style={styles.summaryMain}>
                <Text style={styles.reportId}>{report.id}</Text>
                <Text style={styles.reportType}>{report.type}</Text>
                <Text style={styles.reportCategory}>{report.category}</Text>
              </View>

              <StatusBadge label={report.status} />
            </View>

            <View
              style={[
                styles.contentGrid,
                isSmallScreen && styles.contentGridSmall,
              ]}
            >
              <View style={styles.leftColumn}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardTitle}>Incident Information</Text>
                      <Text style={styles.cardSubtitle}>
                        Main submitted report details
                      </Text>
                    </View>

                    <View style={styles.cardHeaderIcon}>
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                    </View>
                  </View>

                  <View style={styles.detailList}>
                    <DetailRow
                      icon="pricetag-outline"
                      label="Incident Category"
                      value={report.category}
                    />

                    <DetailRow
                      icon="alert-circle-outline"
                      label="Incident Type"
                      value={report.type}
                    />

                    <DetailRow
                      icon="location-outline"
                      label="Location"
                      value={report.location}
                    />

                    <DetailRow
                      icon="calendar-outline"
                      label="Timestamp"
                      value={report.timestamp}
                    />

                    <DetailRow
                      icon="person-circle-outline"
                      label="Submitted By"
                      value={report.submittedBy || "Anonymous Reporter"}
                    />
                  </View>
                </View>

                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardTitle}>Report Description</Text>
                      <Text style={styles.cardSubtitle}>
                        Details provided by the reporter
                      </Text>
                    </View>

                    <View style={styles.cardHeaderIcon}>
                      <Ionicons
                        name="reader-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                    </View>
                  </View>

                  <View style={styles.descriptionBox}>
                    <Text style={styles.descriptionText}>
                      {report.description}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.rightColumn, isSmallScreen && styles.fullWidth]}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardTitle}>Validation</Text>
                      <Text style={styles.cardSubtitle}>
                        Admin and AI review details
                      </Text>
                    </View>

                    <View style={styles.cardHeaderIcon}>
                      <Ionicons
                        name="shield-checkmark-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                    </View>
                  </View>

                  <View style={styles.validationList}>
                    <View style={styles.validationItem}>
                      <Text style={styles.validationLabel}>Priority</Text>
                      <Text style={styles.validationValue}>
                        {report.priority || "Medium"}
                      </Text>
                    </View>

                    <View style={styles.validationItem}>
                      <Text style={styles.validationLabel}>AI Confidence</Text>
                      <Text style={styles.validationValue}>
                        {report.aiConfidence || "86%"}
                      </Text>
                    </View>

                    <View style={styles.validationItem}>
                      <Text style={styles.validationLabel}>Assigned Admin</Text>
                      <Text style={styles.validationValue}>
                        {report.assignedAdmin || "Unassigned"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.actionCard}>
                  <View style={styles.actionHeader}>
                    <Text style={styles.actionTitle}>Admin Actions</Text>
                    <Text style={styles.actionSubtitle}>
                      Choose how this report should be handled.
                    </Text>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={18}
                        color={COLORS.white}
                      />
                      <Text style={styles.primaryActionText}>Approve</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectButton}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={18}
                        color={COLORS.white}
                      />
                      <Text style={styles.primaryActionText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resolveButton}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name="checkmark-done-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.resolveButtonText}>Resolved</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 31, 56, 0.42)",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "100%",
    maxWidth: 980,
    maxHeight: "92%",
    backgroundColor: COLORS.background,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    overflow: "hidden",
  },
  modalHeader: {
    minHeight: 72,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reportIconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.primary,
  },
  modalSubtitle: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  summaryMain: {
    flex: 1,
  },
  reportId: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.primary,
  },
  reportType: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  reportCategory: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 6,
  },
  statusBadgeText: {
    fontWeight: "800",
    fontSize: 12,
  },
  contentGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 18,
    alignItems: "flex-start",
  },
  contentGridSmall: {
    flexDirection: "column",
  },
  leftColumn: {
    flex: 1,
    gap: 16,
  },
  rightColumn: {
    width: 340,
    gap: 16,
  },
  fullWidth: {
    width: "100%",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    overflow: "hidden",
  },
  cardHeader: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: COLORS.surfaceSoft,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  cardHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  detailList: {
    padding: 18,
    gap: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  detailTextWrap: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 20,
  },
  descriptionBox: {
    margin: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 23,
    color: COLORS.text,
    fontWeight: "600",
  },
  validationList: {
    padding: 18,
    gap: 12,
  },
  validationItem: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  validationLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.textMuted,
    marginBottom: 5,
  },
  validationValue: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.text,
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    padding: 18,
  },
  actionHeader: {
    marginBottom: 14,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primary,
  },
  actionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  approveButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  rejectButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.danger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  resolveButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryActionText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
  resolveButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
  },
});