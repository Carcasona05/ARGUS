import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Register() {
  const { width, height } = useWindowDimensions();

  const isSmallPhone = width < 360;
  const isShortScreen = height < 720;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "Registration successful!", [
      {
        text: "OK",
        onPress: () => router.replace("/(tabs)/User_Home"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/img/bannerdark.png")}
            style={[
              styles.bottomBanner,
              {
                width: width * 1.15,
                height: isShortScreen ? height * 0.26 : height * 0.34,
                bottom: isShortScreen ? -height * 0.1 : -height * 0.12,
                left: -width * 0.075,
              },
            ]}
            resizeMode="cover"
          />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop:
                  Platform.OS === "android"
                    ? isShortScreen
                      ? 14
                      : 26
                    : isShortScreen
                      ? 8
                      : 18,
                paddingBottom: isShortScreen ? 42 : 90,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.formCard,
                {
                  width: width >= 500 ? 420 : "88%",
                },
              ]}
            >
              <Image
                source={require("../../assets/img/logotext.png")}
                style={[
                  styles.logo,
                  {
                    width: isSmallPhone ? 290 : Math.min(width * 0.9, 410),
                    height: isShortScreen ? 135 : isSmallPhone ? 150 : 170,
                    marginBottom: isShortScreen ? -8 : -4,
                  },
                ]}
              />

              <Text
                style={[
                  styles.title,
                  {
                    fontSize: isSmallPhone ? 22 : 24,
                    marginBottom: isShortScreen ? 18 : 24,
                  },
                ]}
              >
                Register
              </Text>

              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <MaterialIcons name="person" size={20} color="#2F4F8F" />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#6E7FA5"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <MaterialIcons name="email" size={20} color="#2F4F8F" />
                </View>

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
                <View style={styles.iconBox}>
                  <FontAwesome name="lock" size={21} color="#2F4F8F" />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6E7FA5"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <FontAwesome name="lock" size={21} color="#2F4F8F" />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#6E7FA5"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    marginBottom: isShortScreen ? 26 : 36,
                  },
                ]}
                onPress={handleRegister}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Register</Text>
              </TouchableOpacity>

              <View style={styles.signupSection}>
                <View style={styles.lineRow}>
                  <View style={styles.line} />
                  <Text style={styles.signupQuestion}>
                    Already have an account?
                  </Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/User_Login")}
                >
                  <Text style={styles.signupLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  formCard: {
    alignItems: "center",
    zIndex: 2,
  },

  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },

  title: {
    fontWeight: "700",
    color: "#294880",
    textAlign: "center",
  },

  inputWrapper: {
    width: "100%",
    minHeight: 48,
    borderWidth: 1.2,
    borderColor: "#8EA3CE",
    borderRadius: 8,
    backgroundColor: "#EEF2F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  iconBox: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  input: {
    flex: 1,
    minHeight: 48,
    color: "#294880",
    fontSize: 14,
    paddingVertical: Platform.OS === "web" ? 10 : 0,
    outlineStyle: "none",
  },

  loginButton: {
    width: "100%",
    minHeight: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#294880",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  signupSection: {
    width: "100%",
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
    textAlign: "center",
  },

  signupLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
    textDecorationLine: "underline",
  },

  bottomBanner: {
    position: "absolute",
    opacity: 0.95,
  },
});