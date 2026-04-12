import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // TODO: Add actual registration logic here (API call, etc.)
    // For now, just navigate to home
    Alert.alert("Success", "Registration successful!", [
      { text: "OK", onPress: () => router.replace("/(tabs)/User_Home") },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Logo */}
        <Image
          source={require("../../assets/img/logotext.png")}
          style={styles.logo}
        />

        {/* Register Title */}
        <Text style={styles.title}>Register</Text>

        {/* Name Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="person"
            size={20}
            color="#2F4F8F"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#6E7FA5"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="email"
            size={20}
            color="#2F4F8F"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#6E7FA5"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <FontAwesome
            name="lock"
            size={20}
            color="#2F4F8F"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6E7FA5"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputWrapper}>
          <FontAwesome
            name="lock"
            size={20}
            color="#2F4F8F"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#6E7FA5"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleRegister}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Sign In Section */}
        <View style={styles.signupSection}>
          <View style={styles.lineRow}>
            <View style={styles.line} />
            <Text style={styles.signupQuestion}>Already have an account?</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity onPress={() => router.push("/(auth)/User_Login")}>
            <Text style={styles.signupLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Banner */}
        <Image
          source={require("../../assets/img/bannerdark.png")}
          style={styles.bottomBanner}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingTop: Platform.OS === "android" ? 30 : 10,
  },
  logo: {
    width: 1.2 * width,
    height: 210,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#294880",
    marginBottom: 24,
  },
  inputWrapper: {
    width: "86%",
    height: 48,
    borderWidth: 1.2,
    borderColor: "#8EA3CE",
    borderRadius: 6,
    backgroundColor: "#EEF2F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#294880",
    fontSize: 14,
  },
  loginButton: {
    width: "86%",
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    marginBottom: 36,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  signupSection: {
    width: "86%",
    alignItems: "center",
    marginBottom: 150,
  },
  lineRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#A8B6D4",
  },
  signupQuestion: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#6C7B9D",
  },
  signupLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
    textDecorationLine: "underline",
  },
  bottomBanner: {
    position: "absolute",
    bottom: -height * 0.12,
    left: -width * 0.05,
    width: width * 1.1,
    height: height * 0.36,
  },
});
