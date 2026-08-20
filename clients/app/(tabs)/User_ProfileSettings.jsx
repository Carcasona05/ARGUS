import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Divboxwhite from "../../components/Divboxwhite";
import ThemedHeader from "../../components/ThemedHeader";
import apiClient from "../../services/apiClient";
import { getCache, setCache } from "../../services/dataStore";

const ARGUS_BLUE = "#294880";

const validateNewPassword = (value) => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least one capital letter.";
  if (!/[\d\W_]/.test(value))
    return "Password must contain at least one number or symbol.";
  return "";
};

const validateConfirmPassword = (value, newPasswordValue) => {
  if (!value) return "Please confirm your password.";
  if (value !== newPasswordValue) return "Passwords do not match.";
  return "";
};

const validateCurrentPassword = (value) => {
  if (!value) return "Current password is required.";
  return "";
};

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

const parseBirthdate = (value) => {
  if (!value) return new Date(2000, 0, 1);
  if (value instanceof Date) return value;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value));
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(2000, 0, 1) : date;
};

const toDateString = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CredibilityScore = ({ statusIndex = 3, score = 60 }) => {
  const safeIndex = Math.min(
    credibilityLevels.length - 1,
    Math.max(0, Number(statusIndex) || 0)
  );
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));
  const scorePosition = Math.min(1, Math.max(0, safeScore / 80));
  const lineWidthPercent = scorePosition * 80;
  const currentStatus = credibilityLevels[safeIndex];

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
              width: `${lineWidthPercent}%`,
              backgroundColor: currentStatus.color,
            },
          ]}
        />

        <View style={styles.timelineRow}>
          {credibilityLevels.map((item, index) => {
            const isActive = index === safeIndex;
            const isPassed = index < safeIndex;

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
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    birthdate: new Date(2000, 0, 1),
    contactNumber: "",
    location: "",
    email: "",
    credibilityStatus: 3,
    credibilityScore: 60,
  });

  const [tempDetails, setTempDetails] = useState(userDetails);

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const applyProfile = useCallback((profile) => {
    let credibilityStatus = 3;
    const rawStatus = Number(profile.credibility_status);
    if (Number.isFinite(rawStatus) && rawStatus >= 0 && rawStatus <= 4) {
      credibilityStatus = rawStatus;
    } else {
      console.warn(
        "[profile] credibility_status missing/invalid - restart the server so /profile returns it:",
        profile.credibility_status
      );
    }

    let credibilityScore = 60;
    const rawScore = Number(profile.credibility_score);
    if (Number.isFinite(rawScore)) {
      credibilityScore = Math.min(100, Math.max(0, rawScore));
    }

    const loaded = {
      firstName: profile.first_name ?? "",
      middleName: profile.middle_name ?? "",
      lastName: profile.last_name ?? "",
      username: profile.user_name ?? profile.name ?? "",
      birthdate: parseBirthdate(profile.birthdate),
      contactNumber: profile.phone ?? "",
      location: profile.location ?? "",
      email: profile.email ?? "",
      credibilityStatus,
      credibilityScore,
    };

    setUserDetails((prev) => ({
      ...prev,
      ...loaded,
    }));
    setTempDetails((prev) => ({
      ...prev,
      ...loaded,
    }));
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      const cached = getCache("api:/profile");
      if (cached !== undefined) applyProfile(cached);

      const res = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profile = res.data ?? {};
      setCache("api:/profile", profile);
      applyProfile(profile);
    } catch {
      // profile fetch failed; keep empty defaults
    }
  }, [applyProfile]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  if (!fontsLoaded) {
    return null;
  }

  const handleEdit = () => {
    setTempDetails(userDetails);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        console.warn("No access token found; not saving.");
        return;
      }

      await apiClient.put(
        "/profile",
        {
          first_name: tempDetails.firstName,
          middle_name: tempDetails.middleName,
          last_name: tempDetails.lastName,
          user_name: tempDetails.username,
          phone: tempDetails.contactNumber,
          birthdate: toDateString(tempDetails.birthdate) || null,
          location: tempDetails.location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserDetails(tempDetails);
      setEditMode(false);
      setShowBirthdatePicker(false);

      const res = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = res.data ?? {};
      const synced = {
        ...tempDetails,
        firstName: profile.first_name ?? tempDetails.firstName,
        middleName: profile.middle_name ?? tempDetails.middleName,
        lastName: profile.last_name ?? tempDetails.lastName,
        username: profile.user_name ?? tempDetails.username,
        birthdate: profile.birthdate
          ? parseBirthdate(profile.birthdate)
          : tempDetails.birthdate,
        contactNumber: profile.phone ?? tempDetails.contactNumber,
        location: profile.location ?? tempDetails.location,
        email: profile.email ?? tempDetails.email,
      };
      setUserDetails(synced);
      setTempDetails(synced);
    } catch (error) {
      console.warn(
        "Failed to save profile:",
        error.response?.data?.error || error.message
      );
      Alert.alert(
        "Save failed",
        error.response?.data?.error ||
          "Could not save your profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setTempDetails(userDetails);
    setEditMode(false);
    setShowBirthdatePicker(false);
  };

  const handlePasswordSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordDetails;

    setPasswordSubmitted(true);

    const currentError = validateCurrentPassword(currentPassword);
    const newError = validateNewPassword(newPassword);
    const confirmError = validateConfirmPassword(newPassword, confirmPassword);

    setCurrentPasswordError(currentError);
    setNewPasswordError(newError);
    setConfirmPasswordError(confirmError);

    if (currentError || newError || confirmError) return;

    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        console.warn("No access token found; not saving password.");
        return;
      }

      await apiClient.put(
        "/profile/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPasswordDetails({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setPasswordEditMode(false);

      Alert.alert("Success", "Your access code has been updated successfully.");
    } catch (error) {
      Alert.alert(
        "Update failed",
        error.response?.data?.error ||
          "Could not update your access code. Please try again."
      );
    }
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
    setPasswordSubmitted(false);
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

  const updateTempDetail = (key, value) => {
    setTempDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updatePasswordDetail = (key, value) => {
    setPasswordDetails((prev) => {
      const next = { ...prev, [key]: value };

      if (passwordSubmitted) {
        setCurrentPasswordError(validateCurrentPassword(next.currentPassword));
        setNewPasswordError(validateNewPassword(next.newPassword));
        setConfirmPasswordError(
          validateConfirmPassword(next.newPassword, next.confirmPassword)
        );
      }

      return next;
    });
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
                icon="person-outline"
                label="Middlename"
                value={userDetails.middleName}
                editValue={tempDetails.middleName}
                placeholder="Enter middlename"
                fieldKey="middleName"
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

            <CredibilityScore
              statusIndex={userDetails.credibilityStatus}
              score={userDetails.credibilityScore}
            />

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
                  <View
                    style={[
                      styles.passwordInputWrap,
                      currentPasswordError && styles.passwordInputWrapError,
                    ]}
                  >
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
                      onPress={() => setShowCurrentPassword(!showCurrentPassword)}
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
                  {currentPasswordError ? (
                    <Text style={styles.errorText}>
                      {currentPasswordError}
                    </Text>
                  ) : null}

                  <View
                    style={[
                      styles.passwordInputWrap,
                      newPasswordError && styles.passwordInputWrapError,
                    ]}
                  >
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
                  {newPasswordError ? (
                    <Text style={styles.errorText}>{newPasswordError}</Text>
                  ) : null}

                  <View
                    style={[
                      styles.passwordInputWrap,
                      confirmPasswordError && styles.passwordInputWrapError,
                    ]}
                  >
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
                  {confirmPasswordError ? (
                    <Text style={styles.errorText}>
                      {confirmPasswordError}
                    </Text>
                  ) : null}
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
    left: "10%",
    right: "10%",
    height: 4,
    borderRadius: 999,
    backgroundColor: "#D9E2F0",
  },

  timelineLineActive: {
    position: "absolute",
    top: 12,
    left: "10%",
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

  passwordInputWrapError: {
    borderColor: "#C0392B",
  },

  errorText: {
    width: "100%",
    color: "#C0392B",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "PoppinsRegular",
    marginTop: -4,
    marginBottom: 8,
    paddingHorizontal: 2,
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