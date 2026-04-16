import React, { useCallback, useState } from "react";
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
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

const { width, height } = Dimensions.get("window");

if (!globalThis.demoAccount) {
  globalThis.demoAccount = {
    email: "demo@argus.com",
    password: "Argus123",
    resetEmail: "",
    otp: "123456",
  };
}

export default function UserLogin() {
  const [email, setEmail] = useState(globalThis.demoAccount.resetEmail || "");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [adminTapCount, setAdminTapCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (globalThis.demoAccount?.resetEmail) {
        setEmail(globalThis.demoAccount.resetEmail);
      }
    }, []),
  );

  const handleHiddenAdminTap = () => {
    setAdminTapCount((prev) => {
      const next = prev + 1;

      if (next >= 5) {
        if (Platform.OS === "web") {
          router.push("/(auth)/Admin_Login");
        } else {
          Alert.alert("Admin Access", "Admin login is available on web only.");
        }
        return 0;
      }

      return next;
    });
  };

  const handleLogin = () => {
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
      cleanEmail === globalThis.demoAccount.email.toLowerCase() &&
      password === globalThis.demoAccount.password
    ) {
      Alert.alert("Success", "Login successful!");
      router.replace("/(tabs)/User_Home");
    } else {
      Alert.alert(
        "Login Failed",
        `Use:\nEmail: ${globalThis.demoAccount.email}\nPassword: ${globalThis.demoAccount.password}`,
      );
    }
  };

  const openForgotModal = () => {
    setResetEmail(email);
    setShowForgotModal(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setResetEmail("");
  };

  const handleVerifyEmail = () => {
    const cleanEmail = resetEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    globalThis.demoAccount.resetEmail = cleanEmail;
    closeForgotModal();
    router.push("/(auth)/SendOTP");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={handleHiddenAdminTap}>
          <Image
            source={require("../../assets/img/logotext.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={openForgotModal}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupSection}>
          <View style={styles.lineRow}>
            <View style={styles.line} />
            <Text style={styles.signupQuestion}>Don’t have an account?</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/User_Register")}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/img/bannerdark.png")}
          style={styles.bottomBanner}
          resizeMode="cover"
        />

        <Modal
          visible={showForgotModal}
          transparent
          animationType="fade"
          onRequestClose={closeForgotModal}
        >
          <KeyboardAvoidingView
            style={styles.modalOverlay}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeForgotModal}
              >
                <Ionicons name="close" size={22} color="#294880" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Forgot Password</Text>
              <Text style={styles.modalSubtitle}>
                Enter your email to receive your OTP.
              </Text>

              <View style={styles.modalInputWrapper}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#2F4F8F"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#6E7FA5"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleVerifyEmail}
                activeOpacity={0.85}
              >
                <Text style={styles.modalButtonText}>Verify Email</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
    width: 1.5 * width,
    height: 270,
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
  forgotContainer: {
    width: "86%",
    marginTop: -8,
    marginBottom: 18,
    alignItems: "flex-start",
  },
  forgotText: {
    fontSize: 12,
    color: "#5A6F9E",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D9E2F2",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    padding: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#294880",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#6C7B9D",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  modalInputWrapper: {
    width: "100%",
    height: 48,
    borderWidth: 1.2,
    borderColor: "#8EA3CE",
    borderRadius: 8,
    backgroundColor: "#EEF2F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  modalInput: {
    flex: 1,
    height: "100%",
    color: "#294880",
    fontSize: 14,
  },
  modalButton: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    marginTop: 6,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});