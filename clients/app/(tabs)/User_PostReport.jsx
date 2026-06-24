import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const ARGUS_BLUE = "#294880";

const incidentCategories = {
  "Public Safety Incidents": [
    "Public Disturbance",
    "Harassment",
    "Loitering / Suspicious Presence",
    "Trespassing",
  ],

  "Property-Related Incidents": [
    "Theft",
    "Lost Property",
    "Vandalism / Property Damage",
    "Shoplifting",
  ],

  "Traffic and Road Incidents": [
    "Vehicular Accident",
    "Reckless Driving",
    "Illegal Parking",
    "Road Obstruction",
  ],

  "Community and Environmental Concerns": [
    "Fire Incident",
    "Flooding",
    "Blocked Drainage",
    "Garbage / Sanitation Issues",
    "Streetlight Outage",
  ],

  "Suspicious Activities": [
    "Suspicious Person",
    "Suspicious Vehicle",
    "Unattended / Abandoned Object",
    "Unusual Behavior",
  ],

  "Public Assistance / Community Reports": [
    "Missing Pet",
    "Lost Item",
    "Request for Assistance",
    "General Safety Concern",
  ],
};

export default function User_PostReport() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [fullName] = useState("Juan Dela Cruz");
  const [username, setUsername] = useState("Juan");
  const [displayNameType, setDisplayNameType] = useState("Fullname");

  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [incidentCategory, setIncidentCategory] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const incidentTypes = useMemo(() => {
    return incidentCategories[incidentCategory] || [];
  }, [incidentCategory]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!incidentTypes.includes(incidentType)) {
      setIncidentType("");
    }
  }, [incidentCategory, incidentType, incidentTypes]);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocation("Location permission denied");
        setLatitude("");
        setLongitude("");
        setLoadingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const fetchedLatitude = currentLocation.coords.latitude.toFixed(6);
      const fetchedLongitude = currentLocation.coords.longitude.toFixed(6);

      setLatitude(fetchedLatitude);
      setLongitude(fetchedLongitude);
      setLocation(`${fetchedLatitude}, ${fetchedLongitude}`);
    } catch (error) {
      setLocation("Unable to fetch current location");
      setLatitude("");
      setLongitude("");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handlePickPhoto = async () => {
    if (photos.length >= 3) {
      Alert.alert("Maximum Reached", "You can only upload up to 3 photos.");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Needed",
        "Please allow access to your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      const selectedUri = result.assets[0].uri;
      setPhotos((prev) => [...prev, selectedUri]);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePostReport = () => {
    const selectedDisplayName =
      displayNameType === "Fullname" ? fullName : username.trim();

    if (
      !selectedDisplayName ||
      !latitude ||
      !longitude ||
      !incidentCategory ||
      !incidentType ||
      !details.trim()
    ) {
      Alert.alert(
        "Incomplete Report",
        "Please complete the display name, location, category, incident type, and details."
      );
      return;
    }

    const reportData = {
      submittedBy: selectedDisplayName,
      displayNameType,
      location,
      latitude,
      longitude,
      incidentCategory,
      incidentType,
      details,
      photos,
      status: "Pending Review",
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitted Report:", reportData);

    Alert.alert("Report Posted", "Your report has been submitted successfully.", [
      {
        text: "OK",
        onPress: () => router.push("/User_Home"),
      },
    ]);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Display Name</ThemedText>

            <View style={styles.nameChoiceRow}>
              <TouchableOpacity
                style={[
                  styles.nameChoiceButton,
                  displayNameType === "Fullname" &&
                    styles.nameChoiceButtonActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setDisplayNameType("Fullname")}
              >
                <Ionicons
                  name={
                    displayNameType === "Fullname"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={16}
                  color={
                    displayNameType === "Fullname" ? ARGUS_BLUE : "#8A94A6"
                  }
                />

                <ThemedText
                  style={[
                    styles.nameChoiceText,
                    displayNameType === "Fullname" &&
                      styles.nameChoiceTextActive,
                  ]}
                >
                  Fullname
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.nameChoiceButton,
                  displayNameType === "Username" &&
                    styles.nameChoiceButtonActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setDisplayNameType("Username")}
              >
                <Ionicons
                  name={
                    displayNameType === "Username"
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={16}
                  color={
                    displayNameType === "Username" ? ARGUS_BLUE : "#8A94A6"
                  }
                />

                <ThemedText
                  style={[
                    styles.nameChoiceText,
                    displayNameType === "Username" &&
                      styles.nameChoiceTextActive,
                  ]}
                >
                  Username / Nickname
                </ThemedText>
              </TouchableOpacity>
            </View>

            {displayNameType === "Fullname" ? (
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={fullName}
                editable={false}
                placeholderTextColor="#8A94A6"
              />
            ) : (
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username or nickname"
                placeholderTextColor="#8A94A6"
              />
            )}

            <ThemedText style={styles.helperText}>
              This name will appear as the reporter name on your submitted
              report.
            </ThemedText>
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.locationHeaderRow}>
              <ThemedText style={styles.label}>Current Location</ThemedText>

              <TouchableOpacity
                style={styles.refreshButton}
                activeOpacity={0.85}
                onPress={getCurrentLocation}
                disabled={loadingLocation}
              >
                <Ionicons
                  name="refresh-outline"
                  size={14}
                  color={ARGUS_BLUE}
                />
                <ThemedText style={styles.refreshText}>
                  {loadingLocation ? "Fetching" : "Refresh"}
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.locationInputWrap}>
              <Ionicons
                name="location-outline"
                size={18}
                color={ARGUS_BLUE}
              />

              <TextInput
                style={styles.locationInput}
                value={location}
                editable={false}
                pointerEvents="none"
                placeholder={
                  loadingLocation
                    ? "Fetching current location..."
                    : "Location will be fetched automatically"
                }
                placeholderTextColor="#8A94A6"
              />
            </View>

            <ThemedText style={styles.helperText}>
              Location is automatically fetched and cannot be edited manually.
            </ThemedText>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Incident Category</ThemedText>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={incidentCategory}
                onValueChange={(itemValue) => setIncidentCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Incident Category" value="" />

                {Object.keys(incidentCategories).map((category) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Incident Type</ThemedText>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={incidentType}
                onValueChange={(itemValue) => setIncidentType(itemValue)}
                style={styles.picker}
                enabled={!!incidentCategory}
              >
                <Picker.Item
                  label={
                    incidentCategory
                      ? "Select Incident Type"
                      : "Select category first"
                  }
                  value=""
                />

                {incidentTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Report Details</ThemedText>

            <TextInput
              style={styles.textArea}
              value={details}
              onChangeText={setDetails}
              placeholder="Describe what happened..."
              placeholderTextColor="#8A94A6"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.photoHeaderRow}>
              <ThemedText style={styles.label}>Photo Evidence</ThemedText>

              <ThemedText style={styles.photoCount}>
                {photos.length}/3
              </ThemedText>
            </View>

            <TouchableOpacity
              style={styles.uploadButton}
              activeOpacity={0.88}
              onPress={handlePickPhoto}
            >
              <Ionicons name="images-outline" size={18} color={ARGUS_BLUE} />

              <ThemedText style={styles.uploadButtonText}>
                Choose from Album
              </ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.helperText}>
              Optional. You can upload up to 3 photos.
            </ThemedText>

            {photos.length > 0 ? (
              <View style={styles.photoGrid}>
                {photos.map((uri, index) => (
                  <View key={`${uri}-${index}`} style={styles.photoCard}>
                    <Image source={{ uri }} style={styles.photoPreview} />

                    <TouchableOpacity
                      style={styles.removePhotoButton}
                      onPress={() => handleRemovePhoto(index)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="close" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostReport}
            activeOpacity={0.88}
          >
            <ThemedText style={styles.postButtonText}>Post Report</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  scrollContainer: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 34,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    marginBottom: 16,
  },

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: "#1F2A37",
  },

  disabledInput: {
    backgroundColor: "#F8FAFD",
    color: "#68758A",
  },

  nameChoiceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  nameChoiceButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  nameChoiceButtonActive: {
    backgroundColor: "#EEF3FF",
    borderColor: ARGUS_BLUE,
  },

  nameChoiceText: {
    marginLeft: 7,
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#68758A",
  },

  nameChoiceTextActive: {
    color: ARGUS_BLUE,
    fontFamily: "PoppinsSemiBold",
  },

  locationHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF3FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },

  refreshText: {
    marginLeft: 4,
    fontSize: 11,
    fontFamily: "PoppinsMedium",
    color: ARGUS_BLUE,
  },

  locationInputWrap: {
    minHeight: 50,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  locationInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: "#1F2A37",
  },

  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    overflow: "hidden",
  },

  picker: {
    height: 52,
    color: "#1F2A37",
    fontFamily: "PoppinsRegular",
  },

  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 140,
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: "#1F2A37",
  },

  photoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  photoCount: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "#68758A",
  },

  uploadButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    backgroundColor: "#F8FAFD",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: ARGUS_BLUE,
  },

  helperText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "PoppinsRegular",
    color: "#68758A",
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },

  photoCard: {
    width: 92,
    height: 92,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
    backgroundColor: "#EEF2F7",
    borderWidth: 1,
    borderColor: "#D8E0EB",
  },

  photoPreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  removePhotoButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  postButton: {
    backgroundColor: ARGUS_BLUE,
    borderRadius: 14,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  postButtonText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});