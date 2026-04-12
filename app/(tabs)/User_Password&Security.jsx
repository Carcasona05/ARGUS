import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Divboxwhite from "../../components/Divboxwhite";
import ThemedHeader from "../../components/ThemedHeader";
import BottomNavBar from "../../components/BottomNavBar";
import Colors from "../../constants/Color";
import { useColorScheme } from "react-native";

const UserPrivacySecurity = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long.");
      return;
    }
    // Here you would typically call an API to change the password
    Alert.alert("Success", "Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top App Bar */}
      <View style={[styles.topBar, { backgroundColor: theme.navBackground }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.iconColorFocused}
          />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Password & Security</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Change Password Card */}
        <Divboxwhite style={styles.card}>
          <ThemedHeader style={styles.cardTitle}>Change Password</ThemedHeader>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Current Password</ThemedText>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="Enter current password"
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>New Password</ThemedText>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Confirm New Password</ThemedText>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
            />
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleChangePassword}
          >
            <ThemedText style={styles.changeButtonText}>
              Change Password
            </ThemedText>
          </TouchableOpacity>
        </Divboxwhite>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
    top: 8,
  },
  title: {
    flex: 1,
    top: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#294880",
  },
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  card: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  changeButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserPrivacySecurity;
