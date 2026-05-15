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
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Divboxwhite from "../../components/Divboxwhite";
import ThemedHeader from "../../components/ThemedHeader";

const ARGUS_BLUE = "#294880";

const credibilityLevels = [
  {
    label: "Suspended",
    color: "#6B7280",
    bg: "#E5E7EB",
  },
  {
    label: "At risk",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  {
    label: "Very Limited",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    label: "Limited",
    color: ARGUS_BLUE,
    bg: "#E8EEF9",
  },
  {
    label: "All good",
    color: "#22C55E",
    bg: "#DCFCE7",
  },
];

const formatBirthdate = (date) => {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const CredibilityScore = ({ statusIndex = 3 }) => {
  const currentStatus = credibilityLevels[statusIndex];

  return (
    <Divboxwhite style={styles.credibilityCard}>
      <View style={styles.credibilityTop}>
        <View style={styles.credibilityIconBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={ARGUS_BLUE}
          />
        </View>

        <View style={styles.credibilityTextWrap}>
          <ThemedHeader style={styles.cardTitle}>
            Credibility Score
          </ThemedHeader>

          <ThemedText style={styles.credibilitySubtitle}>
            Your current account credibility level.
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
                      fontFamily: "PoppinsSemiBold",
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
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showBirthdatePicker, setShowBirthdatePicker] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstName: "Mika",
    lastName: "Santos",
    username: "Mika",
    birthdate: new Date(2002, 4, 15),
    contactNumber: "09123456789",
    location: "Langtad, Argao, Cebu",
    email: "mika@gmail.com",
    credibilityStatus: 3,
  });

  const [tempDetails, setTempDetails] = useState(userDetails);

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleEdit = () => {
    setTempDetails(userDetails);
    setEditMode(true);
  };

  const handleSave = () => {
    setUserDetails(tempDetails);
    setEditMode(false);
    setShowBirthdatePicker(false);
  };

  const handleCancel = () => {
    setTempDetails(userDetails);
    setEditMode(false);
    setShowBirthdatePicker(false);
  };

  const handlePasswordSave = () => {
    setPasswordDetails({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordEditMode(false);
  };

  const handlePasswordCancel = () => {
    setPasswordDetails({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
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

  const handleBirthdateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowBirthdatePicker(false);
    }

    if (selectedDate) {
      updateTempDetail("birthdate", selectedDate);
    }
  };

  const DetailRow = ({
    icon,
    label,
    value,
    editValue,
    placeholder,
    fieldKey,
    keyboardType = "default",
    autoCapitalize = "sentences",
    isLast = false,
  }) => {
    return (
      <View style={[styles.detailsRow, isLast && styles.noBorder]}>
        <View style={styles.detailLabelWrap}>
          <Ionicons name={icon} size={18} color={ARGUS_BLUE} />
          <ThemedText style={styles.label}>{label}</ThemedText>
        </View>

        {editMode ? (
          <TextInput
            style={styles.input}
            value={editValue}
            onChangeText={(text) => updateTempDetail(fieldKey, text)}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        ) : (
          <ThemedText style={styles.value}>{value}</ThemedText>
        )}
      </View>
    );
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
                  Profile Details
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

              <DetailRow
                icon="person-outline"
                label="Firstname"
                value={userDetails.firstName}
                editValue={tempDetails.firstName}
                placeholder="Enter firstname"
                fieldKey="firstName"
              />

              <DetailRow
                icon="person-outline"
                label="Lastname"
                value={userDetails.lastName}
                editValue={tempDetails.lastName}
                placeholder="Enter lastname"
                fieldKey="lastName"
              />

              <DetailRow
                icon="person-circle-outline"
                label="Username"
                value={userDetails.username}
                editValue={tempDetails.username}
                placeholder="Enter username"
                fieldKey="username"
              />

              <View style={styles.detailsRow}>
                <View style={styles.detailLabelWrap}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={ARGUS_BLUE}
                  />
                  <ThemedText style={styles.label}>Birthdate</ThemedText>
                </View>

                {editMode ? (
                  <TouchableOpacity
                    style={styles.dateInput}
                    activeOpacity={0.85}
                    onPress={() => setShowBirthdatePicker(true)}
                  >
                    <ThemedText style={styles.dateInputText}>
                      {formatBirthdate(tempDetails.birthdate)}
                    </ThemedText>

                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={ARGUS_BLUE}
                    />
                  </TouchableOpacity>
                ) : (
                  <ThemedText style={styles.value}>
                    {formatBirthdate(userDetails.birthdate)}
                  </ThemedText>
                )}
              </View>

              {showBirthdatePicker && editMode ? (
                <DateTimePicker
                  value={tempDetails.birthdate || new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={handleBirthdateChange}
                />
              ) : null}

              <DetailRow
                icon="call-outline"
                label="Contact Number"
                value={userDetails.contactNumber}
                editValue={tempDetails.contactNumber}
                placeholder="Enter contact number"
                fieldKey="contactNumber"
                keyboardType="phone-pad"
              />

              <DetailRow
                icon="location-outline"
                label="Current Location"
                value={userDetails.location}
                editValue={tempDetails.location}
                placeholder="Enter location"
                fieldKey="location"
              />

              <DetailRow
                icon="mail-outline"
                label="Email"
                value={userDetails.email}
                editValue={tempDetails.email}
                placeholder="Enter email"
                fieldKey="email"
                keyboardType="email-address"
                autoCapitalize="none"
                isLast
              />
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
                      color={ARGUS_BLUE}
                    />

                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.currentPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("currentPassword", value)
                      }
                      secureTextEntry={!showCurrentPassword}
                      placeholder="Current access code"
                      placeholderTextColor="#9CA3AF"
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        setShowCurrentPassword()
                      }
                    >
                      <Ionicons
                        name={
                          showCurrentPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.passwordInputWrap}>
                    <Ionicons
                      name="key-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />

                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.newPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("newPassword", value)
                      }
                      secureTextEntry={!showNewPassword}
                      placeholder="New access code"
                      placeholderTextColor="#9CA3AF"
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <Ionicons
                        name={
                          showNewPassword ? "eye-off-outline" : "eye-outline"
                        }
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.passwordInputWrap}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={18}
                      color={ARGUS_BLUE}
                    />

                    <TextInput
                      style={styles.passwordInput}
                      value={passwordDetails.confirmPassword}
                      onChangeText={(value) =>
                        updatePasswordDetail("confirmPassword", value)
                      }
                      secureTextEntry={!showConfirmPassword}
                      placeholder="Confirm new access code"
                      placeholderTextColor="#9CA3AF"
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.securityPreview}>
                  <View style={styles.securityIconWrap}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color={ARGUS_BLUE}
                    />
                  </View>

                  <View style={styles.securityTextWrap}>
                    <ThemedText style={styles.securityTitle}>
                      Account protected
                    </ThemedText>

                    <ThemedText style={styles.securitySubtitle}>
                      Update your sign-in access anytime to keep your account
                      secure.
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
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  editButtons: {
    flexDirection: "row",
    alignItems: "center",
  },

  editText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  cancelText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#7A7A7A",
    marginRight: 14,
  },

  saveText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
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
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
    marginLeft: 8,
  },

  value: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#111827",
    textAlign: "right",
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#111827",
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: ARGUS_BLUE,
    paddingVertical: 4,
  },

  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: ARGUS_BLUE,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  dateInputText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#111827",
    marginRight: 4,
    textAlign: "right",
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

  credibilitySubtitle: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
    marginTop: 3,
  },

  currentBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  currentBadgeText: {
    fontSize: 10,
    fontFamily: "PoppinsSemiBold",
  },

  timelineWrapper: {
    position: "relative",
    paddingTop: 5,
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
    fontFamily: "PoppinsRegular",
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
    marginRight: 8,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
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
    fontFamily: "PoppinsSemiBold",
    color: "#1F2A37",
    marginBottom: 3,
  },

  securitySubtitle: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
  },
});

export default UserProfileSettings;