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
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

export default function User_PostReport() {
  const router = useRouter();

  const [userName] = useState("Juan Dela Cruz");
  const [location, setLocation] = useState("");
  const [incidentCategory, setIncidentCategory] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const incidentOptions = {
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
      "Loitering / Suspicious Presence",
    ],
    "Public Assistance / Community Reports": [
      "Missing Pet",
      "Lost Item",
      "Request for Assistance",
      "General Safety Concern",
    ],
    "Cyber and Online Incidents (Non-sensitive)": [
      "Online Scam / Suspicious Message",
      "Cyberbullying",
      "Fake Information / Misinformation",
    ],
  };

  const incidentTypes = useMemo(() => {
    return incidentOptions[incidentCategory] || [];
  }, [incidentCategory]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocation("Location permission denied");
          setLoadingLocation(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const latitude = currentLocation.coords.latitude.toFixed(6);
        const longitude = currentLocation.coords.longitude.toFixed(6);

        setLocation(`${latitude}, ${longitude}`);
      } catch (error) {
        setLocation("Unable to fetch current location");
      } finally {
        setLoadingLocation(false);
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!incidentTypes.includes(incidentType)) {
      setIncidentType("");
    }
  }, [incidentCategory, incidentType, incidentTypes]);

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
      mediaTypes: ["images"],
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
    if (!location.trim() || !incidentCategory || !incidentType || !details.trim()) {
      Alert.alert(
        "Incomplete Report",
        "Please complete the location, category, incident type, and details."
      );
      return;
    }

    Alert.alert("Report Posted", "Your report has been submitted successfully.", [
      {
        text: "OK",
        onPress: () => router.push("/User_Home"),
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heroCard}>
          <ThemedText style={styles.pageTitle}>Create Report</ThemedText>
          <ThemedText style={styles.pageSubtitle}>
            Submit the incident details below. Photo evidence is optional.
          </ThemedText>
        </View>

        <View style={styles.formCard}>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Username</ThemedText>
            <TextInput
              style={styles.input}
              value={userName}
              editable={false}
              placeholderTextColor="#8A94A6"
            />
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Current Location</ThemedText>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder={
                loadingLocation ? "Fetching current location..." : "Enter location"
              }
              placeholderTextColor="#8A94A6"
            />
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
                {Object.keys(incidentOptions).map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
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
              <Ionicons name="images-outline" size={18} color="#294880" />
              <ThemedText style={styles.uploadButtonText}>
                Choose from Album
              </ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.helperText}>
              Optional. You can upload up to 3 photos.
            </ThemedText>

            {photos.length > 0 && (
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
            )}
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

  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#68758A",
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
    fontWeight: "800",
    color: "#294880",
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
    color: "#1F2A37",
  },

  photoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  photoCount: {
    fontSize: 12,
    fontWeight: "700",
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
    fontWeight: "800",
    color: "#294880",
  },

  helperText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
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
    backgroundColor: "#294880",
    borderRadius: 14,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  postButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});