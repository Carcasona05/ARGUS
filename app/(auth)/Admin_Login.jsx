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
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

if (!globalThis.adminAccount) {
  globalThis.adminAccount = {
    email: "admin@argus.com",
    password: "Admin123",
  };
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (Platform.OS !== "web") {
      Alert.alert("Restricted", "Admin login is available on web only.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (
      cleanEmail === globalThis.adminAccount.email.toLowerCase() &&
      password === globalThis.adminAccount.password
    ) {
      Alert.alert("Success", "Admin login successful!");
      router.replace("/(admin)/Admin_Dashboard");
    } else {
      Alert.alert(
        "Login Failed",
        `Use:\nEmail: ${globalThis.adminAccount.email}\nPassword: ${globalThis.adminAccount.password}`,
      );
    }
  };

  if (Platform.OS !== "web") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.page}>
          <Image
            source={require("../../assets/img/bannerdark.png")}
            style={styles.backgroundBanner}
            resizeMode="cover"
          />
          <View style={styles.overlay} />

          <View style={[styles.container, styles.centerContent]}>
            <View style={styles.webCard}>
              <Image
                source={require("../../assets/img/logotext.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>Admin Login</Text>
              <Text style={styles.webOnlyText}>
                This page is available on web only.
              </Text>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.replace("/(auth)/User_Login")}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Back to User Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <Image
          source={require("../../assets/img/bannerdark.png")}
          style={styles.backgroundBanner}
          resizeMode="cover"
        />

        <View style={styles.overlay} />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.webCard}>
              <Image
                source={require("../../assets/img/logotext.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>Admin Login</Text>
              <Text style={styles.subtitle}>
                Sign in to access the ARGUS admin dashboard
              </Text>

              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#2F4F8F"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Admin Email Address"
                  placeholderTextColor="#6E7FA5"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <FontAwesome
                  name="lock"
                  size={20}
                  color="#2F4F8F"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Admin Password"
                  placeholderTextColor="#6E7FA5"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleAdminLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Login as Admin</Text>
              </TouchableOpacity>

              <View style={styles.bottomSection}>
                <View style={styles.lineRow}>
                  <View style={styles.line} />
                  <Text style={styles.signupQuestion}>No admin account yet?</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/Admin_Register")}
                >
                  <Text style={styles.signupLink}>Admin Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/User_Login")}
                  style={styles.backLinkWrap}
                >
                  <Text style={styles.backLink}>Back to User Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  page: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  backgroundBanner: {
    position: "absolute",
    width: width * 1.2,
    height: height * 1.05,
    bottom: -height * 0.08,
    left: -width * 0.08,
    opacity: 0.14,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248,248,248,0.72)",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    minHeight: height,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },

  centerContent: {
    justifyContent: "center",
  },

  webCard: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "#D9E2F2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  logo: {
    width: 1.5 * width,
    height: 200,
    alignSelf: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#294880",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6C7B9D",
    textAlign: "center",
    marginBottom: 24,
  },

  inputWrapper: {
    width: "100%",
    height: 52,
    borderWidth: 1.2,
    borderColor: "#8EA3CE",
    borderRadius: 10,
    backgroundColor: "#EEF2F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
    width: "100%",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    marginTop: 4,
    marginBottom: 22,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSection: {
    alignItems: "center",
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
    fontSize: 14,
    fontWeight: "700",
    color: "#294880",
    textDecorationLine: "underline",
  },

  backLinkWrap: {
    marginTop: 14,
  },

  backLink: {
    fontSize: 13,
    color: "#5A6F9E",
    textDecorationLine: "underline",
  },

  webOnlyText: {
    fontSize: 15,
    color: "#5A6F9E",
    textAlign: "center",
    marginBottom: 24,
  },
});