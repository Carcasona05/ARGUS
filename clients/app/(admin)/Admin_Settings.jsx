import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Admin_Layout from "../../components/Admin_compo/Admin_Layout";
import apiClient from "../../services/apiClient";

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
  danger: "#E45757",
};

function FormSection({ icon, title, description, children }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionIconWrap}>
            <Ionicons name={icon} size={18} color={COLORS.primary} />
          </View>

          <View style={styles.sectionTextWrap}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionDescription}>{description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContent}>{children}</View>
    </View>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  icon,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={COLORS.textMuted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

export default function Admin_Settings() {
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    phone: "",
    department: "",
  });

  const [emailData, setEmailData] = useState({
    currentEmail: "",
    newEmail: "",
    confirmEmail: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const loadProfile = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      const res = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data ?? {};

      setProfile({
        fullName: data.name || data.fullname || "",
        username: data.user_name || "",
        phone: data.phone || "",
        department: data.department || "",
      });

      setEmailData((prev) => ({ ...prev, currentEmail: data.email || "" }));
    } catch {
      // keep empty defaults on failure
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (!fontsLoaded) {
    return null;
  }

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleProfileSave = async () => {
    if (
      !profile.fullName ||
      !profile.username ||
      !profile.phone ||
      !profile.department
    ) {
      showMessage("Missing Details", "Please complete all profile details.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      await apiClient.put(
        "/profile",
        {
          first_name: profile.fullName,
          user_name: profile.username,
          phone: profile.phone,
          department: profile.department,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showMessage(
        "Profile Updated",
        "Your profile details have been updated successfully."
      );
    } catch (error) {
      showMessage(
        "Update Failed",
        error.response?.data?.error || "Could not update your profile."
      );
    }
  };

  const handleEmailSave = async () => {
    if (!emailData.currentEmail || !emailData.newEmail || !emailData.confirmEmail) {
      showMessage("Missing Email", "Please enter and confirm your new email.");
      return;
    }

    if (emailData.newEmail !== emailData.confirmEmail) {
      showMessage(
        "Email Mismatch",
        "New email and confirm email do not match."
      );
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      await apiClient.put(
        "/profile/email",
        {
          currentEmail: emailData.currentEmail,
          newEmail: emailData.newEmail,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmailData((prev) => ({
        ...prev,
        newEmail: "",
        confirmEmail: "",
      }));

      showMessage(
        "Email Update Requested",
        "Confirm the change from your new email."
      );
    } catch (error) {
      showMessage(
        "Update Failed",
        error.response?.data?.error || "Could not update your email."
      );
    }
  };

  const handlePasswordSave = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      showMessage("Missing Password", "Please complete all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage(
        "Password Mismatch",
        "New password and confirm password do not match."
      );
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      await apiClient.put(
        "/profile/password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showMessage(
        "Password Updated",
        "Your password has been changed successfully."
      );
    } catch (error) {
      showMessage(
        "Update Failed",
        error.response?.data?.error || "Could not update your password."
      );
    }
  };

  return (
    <Admin_Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrap}>
          <FormSection
            icon="person-circle-outline"
            title="Edit Profile Details"
            description="Update the basic information shown on your admin account."
          >
            <View style={styles.inputGrid}>
              <InputField
                label="Full Name"
                value={profile.fullName}
                onChangeText={(text) =>
                  setProfile({ ...profile, fullName: text })
                }
                placeholder="Enter full name"
                icon="person-outline"
              />

              <InputField
                label="Username"
                value={profile.username}
                onChangeText={(text) =>
                  setProfile({ ...profile, username: text })
                }
                placeholder="Enter username"
                icon="at-outline"
              />

              <InputField
                label="Phone Number"
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                icon="call-outline"
              />

              <InputField
                label="Department"
                value={profile.department}
                onChangeText={(text) =>
                  setProfile({ ...profile, department: text })
                }
                placeholder="Enter department"
                icon="business-outline"
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleProfileSave}
              >
                <Ionicons name="save-outline" size={18} color={COLORS.white} />
                <Text style={styles.saveButtonText}>Save Profile</Text>
              </TouchableOpacity>
            </View>
          </FormSection>

          <FormSection
            icon="mail-outline"
            title="Change Email"
            description="Use a valid email address that you can access."
          >
            <View style={styles.inputGrid}>
              <InputField
                label="Current Email"
                value={emailData.currentEmail}
                onChangeText={(text) =>
                  setEmailData({ ...emailData, currentEmail: text })
                }
                placeholder="Current email"
                keyboardType="email-address"
                icon="mail-open-outline"
              />

              <InputField
                label="New Email"
                value={emailData.newEmail}
                onChangeText={(text) =>
                  setEmailData({ ...emailData, newEmail: text })
                }
                placeholder="Enter new email"
                keyboardType="email-address"
                icon="mail-outline"
              />

              <InputField
                label="Confirm New Email"
                value={emailData.confirmEmail}
                onChangeText={(text) =>
                  setEmailData({ ...emailData, confirmEmail: text })
                }
                placeholder="Confirm new email"
                keyboardType="email-address"
                icon="checkmark-circle-outline"
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleEmailSave}
              >
                <Ionicons name="mail-outline" size={18} color={COLORS.white} />
                <Text style={styles.saveButtonText}>Update Email</Text>
              </TouchableOpacity>
            </View>
          </FormSection>

          <FormSection
            icon="lock-closed-outline"
            title="Change Password"
            description="Choose a new password to secure your admin account."
          >
            <View style={styles.inputGrid}>
              <InputField
                label="Current Password"
                value={passwordData.currentPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, currentPassword: text })
                }
                placeholder="Enter current password"
                secureTextEntry
                icon="key-outline"
              />

              <InputField
                label="New Password"
                value={passwordData.newPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, newPassword: text })
                }
                placeholder="Enter new password"
                secureTextEntry
                icon="lock-closed-outline"
              />

              <InputField
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, confirmPassword: text })
                }
                placeholder="Confirm new password"
                secureTextEntry
                icon="shield-checkmark-outline"
              />
            </View>

            <View style={styles.passwordNote}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.passwordNoteText}>
                Password must be at least 6 characters.
              </Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handlePasswordSave}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={COLORS.white}
                />
                <Text style={styles.saveButtonText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          </FormSection>
        </View>
      </ScrollView>
    </Admin_Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  contentWrap: {
    width: "100%",
  },

  pageHeader: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },

  pageTitle: {
    fontSize: 24,
    color: COLORS.primary,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontFamily: "PoppinsRegular",
    lineHeight: 21,
  },

  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 16,
  },

  infoCard: {
    flex: 1,
    minWidth: 230,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  infoTextWrap: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 15,
    color: COLORS.text,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
  },

  infoDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: "PoppinsRegular",
    lineHeight: 19,
  },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
  },

  sectionHeader: {
    backgroundColor: COLORS.surfaceSoft,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  sectionTextWrap: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 17,
    fontFamily: "PoppinsSemiBold",
    color: COLORS.primary,
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: "PoppinsRegular",
    lineHeight: 19,
  },

  formContent: {
    padding: 20,
  },

  inputGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },

  inputGroup: {
    flex: 1,
    minWidth: 250,
  },

  inputLabel: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: "PoppinsMedium",
    marginBottom: 8,
  },

  inputWrap: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceSoft,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  textInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    outlineStyle: Platform.OS === "web" ? "none" : undefined,
  },

  passwordNote: {
    marginTop: 14,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordNoteText: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    lineHeight: 19,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },

  saveButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },
});