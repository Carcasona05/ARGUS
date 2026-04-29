import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Divboxwhite from "../../components/Divboxwhite";
import ThemedHeader from "../../components/ThemedHeader";

const credibilityLevels = [
  {
    label: "All good!",
    color: "#22C55E",
    bg: "#DCFCE7",
  },
  {
    label: "Limited",
    color: "#294880",
    bg: "#E8EEF9",
  },
  {
    label: "Very limited",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    label: "At risk",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  {
    label: "Suspended",
    color: "#6B7280",
    bg: "#E5E7EB",
  },
];

const CredibilityScore = ({ statusIndex = 0 }) => {
  const currentStatus = credibilityLevels[statusIndex];

  return (
    <Divboxwhite style={styles.credibilityCard}>
      <View style={styles.credibilityTop}>
        <View style={styles.credibilityIconBox}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#294880" />
        </View>

        <View style={styles.credibilityTextWrap}>
          <ThemedText style={styles.credibilityTitle}>
            Credibility Score
          </ThemedText>
          <ThemedText style={styles.credibilitySubtitle}>
            Your account standing will show up here.
          </ThemedText>
        </View>

        <View
          style={[styles.currentBadge, { backgroundColor: currentStatus.bg }]}
        >
          <ThemedText
            style={[styles.currentBadgeText, { color: currentStatus.color }]}
          >
            {currentStatus.label}
          </ThemedText>
        </View>
      </View>

      <View style={styles.timelineWrapper}>
        <View style={styles.timelineLineBg} />

        <View
          style={[
            styles.timelineLineActive,
            {
              width: `${(statusIndex / (credibilityLevels.length - 1)) * 100}%`,
              backgroundColor: currentStatus.color,
            },
          ]}
        />

        <View style={styles.timelineRow}>
          {credibilityLevels.map((item, index) => {
            const isActive = index === statusIndex;
            const isPassed = index < statusIndex;

            return (
              <View key={index} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineDot,
                    {
                      backgroundColor:
                        isActive || isPassed ? item.color : "#D9E2F0",
                      borderColor:
                        isActive || isPassed ? item.color : "#C9D3E3",
                    },
                    isActive && styles.timelineDotActive,
                  ]}
                >
                  {isActive ? (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  ) : null}
                </View>

                <ThemedText
                  style={[
                    styles.timelineLabel,
                    isActive && {
                      color: item.color,
                      fontWeight: "800",
                    },
                  ]}
                >
                  {item.label}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </Divboxwhite>
  );
};

const UserProfileSettings = () => {
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "Mika",
    location: "Langtad, Argao, Cebu",
    email: "mika@gmail.com",
    credibilityStatus: 0,
  });

  const [tempDetails, setTempDetails] = useState(userDetails);

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEdit = () => {
    setTempDetails(userDetails);
    setEditMode(true);
  };

  const handleSave = () => {
    setUserDetails(tempDetails);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempDetails(userDetails);
    setEditMode(false);
  };

  const handlePasswordSave = () => {
    setPasswordDetails({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordEditMode(false);
  };

  const handlePasswordCancel = () => {
    setPasswordDetails({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordEditMode(false);
  };

  const updateTempDetail = (key, value) => {
    setTempDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updatePasswordDetail = (key, value) => {
    setPasswordDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Divboxwhite style={styles.detailsCard}>
              <View style={styles.cardHeader}>
                <ThemedHeader style={styles.cardTitle}>
                  Account Settings
                </ThemedHeader>

                {editMode ? (
                  <View style={styles.editButtons}>
                    <TouchableOpacity onPress={handleCancel}>
                      <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSave}>
                      <ThemedText style={styles.saveText}>Save</ThemedText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleEdit}>
                    <ThemedText style={styles.editText}>Edit</ThemedText>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailLabelWrap}>
                  <Ionicons name="person-outline" size={18} color="#294880" />
                  <ThemedText style={styles.label}>Username</ThemedText>
                </View>

                {editMode ? (
                  <TextInput
                    style={styles.input}
                    value={tempDetails.username}
                    onChangeText={(value) =>
                      updateTempDetail("username", value)
                    }
                    placeholder="Enter username"
                    placeholderTextColor="#9CA3AF"
                  />
                ) : (
                  <ThemedText style={styles.value}>
                    {userDetails.username}
                  </ThemedText>
                )}
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailLabelWrap}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color="#294880"
                  />
                  <ThemedText style={styles.label}>Current Location</ThemedText>
                </View>

                {editMode ? (
                  <TextInput
                    style={styles.input}
                    value={tempDetails.location}
                    onChangeText={(value) =>
                      updateTempDetail("location", value)
                    }
                    placeholder="Enter location"
                    placeholderTextColor="#9CA3AF"
                  />
                ) : (
                  <ThemedText style={styles.value}>
                    {userDetails.location}
                  </ThemedText>
                )}
              </View>

              <View style={[styles.detailsRow, styles.noBorder]}>
                <View style={styles.detailLabelWrap}>
                  <Ionicons name="mail-outline" size={18} color="#294880" />
                  <ThemedText style={styles.label}>Email</ThemedText>
                </View>

                {editMode ? (
                  <TextInput
                    style={styles.input}
                    value={tempDetails.email}
                    onChangeText={(value) => updateTempDetail("email", value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter email"
                    placeholderTextColor="#9CA3AF"
                  />
                ) : (
                  <ThemedText style={styles.value}>
                    {userDetails.email}
                  </ThemedText>
                )}
              </View>
            </Divboxwhite>

            <CredibilityScore statusIndex={userDetails.credibilityStatus} />

            <Divboxwhite style={styles.passwordCard}>
              <View style={styles.cardHeader}>
                <ThemedHeader style={styles.cardTitle}>
                  Password & Security
                </ThemedHeader>

                {passwordEditMode ? (
                  <View style={styles.editButtons}>
                    <TouchableOpacity onPress={handlePasswordCancel}>
                      <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePasswordSave}>
                      <ThemedText style={styles.saveText}>Save</ThemedText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setPasswordEditMode(true)}>
                    <ThemedText style={styles.editText}>Change</ThemedText>
                  </TouchableOpacity>
                )}
              </View>

              {passwordEditMode ? (
                <View>
                  <View style={styles.passwordInputWrap}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#294880"
                    />
                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.currentPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("currentPassword", value)
                      }
                      secureTextEntry
                      placeholder="Current password"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.passwordInputWrap}>
                    <Ionicons name="key-outline" size={18} color="#294880" />
                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.newPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("newPassword", value)
                      }
                      secureTextEntry
                      placeholder="New password"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.passwordInputWrap}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={18}
                      color="#294880"
                    />
                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.confirmPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("confirmPassword", value)
                      }
                      secureTextEntry
                      placeholder="Confirm new password"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.securityPreview}>
                  <View style={styles.securityIconWrap}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color="#294880"
                    />
                  </View>

                  <View style={styles.securityTextWrap}>
                    <ThemedText style={styles.securityTitle}>
                      Password protected
                    </ThemedText>
                    <ThemedText style={styles.securitySubtitle}>
                      Change your password anytime to keep your account secure.
                    </ThemedText>
                  </View>
                </View>
              )}
            </Divboxwhite>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 40,
  },

  detailsCard: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },

  passwordCard: {
    padding: 16,
    borderRadius: 18,
    marginTop: 14,
    marginBottom: 24,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 20,
    color: "#294880",
  },

  editButtons: {
    flexDirection: "row",
    alignItems: "center",
  },

  editText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#294880",
  },

  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
    marginRight: 14,
  },

  saveText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#294880",
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  detailLabelWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },

  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#294880",
    paddingVertical: 4,
  },

  credibilityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: "#DDE7F5",
  },

  credibilityTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  credibilityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  credibilityTextWrap: {
    flex: 1,
  },

  credibilityTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 3,
  },

  credibilitySubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#6B7280",
  },

  currentBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  currentBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },

  timelineWrapper: {
    position: "relative",
    paddingTop: 2,
  },

  timelineLineBg: {
    position: "absolute",
    top: 12,
    left: 20,
    right: 20,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#D9E2F0",
  },

  timelineLineActive: {
    position: "absolute",
    top: 12,
    left: 20,
    height: 4,
    borderRadius: 999,
  },

  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timelineItem: {
    width: "20%",
    alignItems: "center",
  },

  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  timelineDotActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: -5,
    marginBottom: 5,
  },

  timelineLabel: {
    fontSize: 10,
    color: "#7A8699",
    textAlign: "center",
    lineHeight: 14,
  },

  passwordInputWrap: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E8EDF5",
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
  },

  securityPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },

  securityIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  securityTextWrap: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2A37",
    marginBottom: 3,
  },

  securitySubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
  },
});

export default UserProfileSettings;