import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import MyUser_RepPost_Layout from "../../components/User_compo/MyUser_RepPost_Layout";

const PRIMARY = "#294880";

const FONT = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
};

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

const initialMyReports = [
  {
    id: "my_report_001",
    userName: "You",
    userAvatar: null,
    location: "Poblacion, Argao, Cebu",
    incidentCategory: "Community and Environmental Concerns",
    incidentType: "Flooding",
    details:
      "Flooding was seen near the roadside after heavy rain. The water level is rising and may affect nearby houses.",
    status: "Pending Review",
    verified: false,
    likes: 0,
    comments: 0,
    images: [],
    commentList: [],
  },
  {
    id: "my_report_002",
    userName: "You",
    userAvatar: null,
    location: "Langtad, Argao, Cebu",
    incidentCategory: "Community and Environmental Concerns",
    incidentType: "Streetlight Outage",
    details:
      "The street light near the corner is not working. The area becomes dark at night and may be unsafe for pedestrians.",
    status: "Resolved",
    verified: true,
    likes: 6,
    comments: 1,
    images: [],
    commentList: [
      {
        id: "c1",
        user: "Anonymous User",
        text: "This area really needs better lighting.",
      },
    ],
  },
  {
    id: "my_report_003",
    userName: "You",
    userAvatar: null,
    location: "Talaga, Argao, Cebu",
    incidentCategory: "Traffic and Road Incidents",
    incidentType: "Road Obstruction",
    details:
      "A large branch is blocking part of the road and may cause accidents for motorcycles passing at night.",
    status: "Rejected",
    verified: false,
    likes: 3,
    comments: 0,
    images: [],
    commentList: [],
  },
  {
    id: "my_report_004",
    userName: "You",
    userAvatar: null,
    location: "Canbanua, Argao, Cebu",
    incidentCategory: "Suspicious Activities",
    incidentType: "Suspicious Vehicle",
    details:
      "A vehicle was seen parked for a long time near a residential area. The driver was not familiar to nearby residents.",
    status: "Under Verification",
    verified: false,
    likes: 2,
    comments: 0,
    images: [],
    commentList: [],
  },
];

const statusOptions = [
  "All Status",
  "Pending Review",
  "Under Verification",
  "Resolved",
  "Rejected",
  "Archived",
];

const DropdownFilter = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  icon,
}) => {
  return (
    <View style={styles.dropdownBlock}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.dropdownButton, isOpen && styles.activeDropdownButton]}
        onPress={onToggle}
      >
        <View style={styles.dropdownLeft}>
          <View
            style={[
              styles.dropdownIconWrap,
              isOpen && styles.activeDropdownIconWrap,
            ]}
          >
            <Ionicons
              name={icon}
              size={15}
              color={isOpen ? "#FFFFFF" : PRIMARY}
            />
          </View>

          <View style={styles.dropdownTextWrap}>
            <ThemedText
              style={[
                styles.dropdownLabel,
                isOpen && styles.activeDropdownLabel,
              ]}
            >
              {label}
            </ThemedText>

            <ThemedText
              style={[
                styles.dropdownValue,
                isOpen && styles.activeDropdownValue,
              ]}
              numberOfLines={1}
            >
              {value}
            </ThemedText>
          </View>
        </View>

        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color={isOpen ? "#FFFFFF" : PRIMARY}
        />
      </TouchableOpacity>

      {isOpen ? (
        <View style={styles.dropdownMenu}>
          {options.map((option) => {
            const isActive = option === value;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.85}
                style={[
                  styles.dropdownOption,
                  isActive && styles.activeDropdownOption,
                ]}
                onPress={() => onSelect(option)}
              >
                <ThemedText
                  style={[
                    styles.dropdownOptionText,
                    isActive && styles.activeDropdownOptionText,
                  ]}
                >
                  {option}
                </ThemedText>

                {isActive ? (
                  <Ionicons name="checkmark-circle" size={16} color={PRIMARY} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const EditReportModal = ({ visible, report, onClose, onSave }) => {
  const [location, setLocation] = useState("");
  const [incidentCategory, setIncidentCategory] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState([]);

  const incidentTypes = useMemo(() => {
    return incidentOptions[incidentCategory] || [];
  }, [incidentCategory]);

  useEffect(() => {
    if (report) {
      setLocation(report.location || "");
      setIncidentCategory(report.incidentCategory || "");
      setIncidentType(report.incidentType || "");
      setDetails(report.details || "");
      setPhotos(Array.isArray(report.images) ? report.images : []);
    }
  }, [report]);

  useEffect(() => {
    if (incidentCategory && !incidentTypes.includes(incidentType)) {
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

  const handleSaveChanges = () => {
    if (!incidentCategory || !incidentType || !details.trim()) {
      Alert.alert(
        "Incomplete Report",
        "Please complete the category, incident type, and details."
      );
      return;
    }

    const updatedReport = {
      ...report,
      location,
      incidentCategory,
      incidentType,
      details: details.trim(),
      images: photos,
    };

    onSave(updatedReport);
  };

  if (!report) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalTopCloseRow}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              activeOpacity={0.85}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color="#475467" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>Username</ThemedText>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={report.userName || "You"}
                editable={false}
                placeholderTextColor="#8A94A6"
              />
            </View>

            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>Current Location</ThemedText>

              <View style={styles.lockedInputWrap}>
                <TextInput
                  style={[styles.input, styles.lockedInput]}
                  value={location}
                  editable={false}
                  placeholder="Current location"
                  placeholderTextColor="#8A94A6"
                />

                <Ionicons
                  name="lock-closed"
                  size={17}
                  color="#98A2B3"
                  style={styles.lockIconInside}
                />
              </View>

              <ThemedText style={styles.helperText}>
                Location cannot be changed after posting.
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

                  {Object.keys(incidentOptions).map((category) => (
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
                <Ionicons name="images-outline" size={18} color={PRIMARY} />

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

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.85}
                onPress={onClose}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.88}
                onPress={handleSaveChanges}
              >
                <ThemedText style={styles.saveButtonText}>
                  Save Changes
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const User_MyReports = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [myReports, setMyReports] = useState(initialMyReports);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    if (selectedStatus === "All Status") {
      return myReports;
    }

    return myReports.filter((report) => report.status === selectedStatus);
  }, [selectedStatus, myReports]);

  const totalReports = myReports.length;

  const totalPending = myReports.filter(
    (report) => report.status === "Pending Review"
  ).length;

  const totalResolved = myReports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown((current) =>
      current === dropdownName ? null : dropdownName
    );
  };

  const handleLike = (reportId) => {
    setMyReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              likes: report.likes + 1,
            }
          : report
      )
    );
  };

  const handleOpenReport = (reportData) => {
    router.push({
      pathname: "/MyUser_RepPostView",
      params: {
        report: JSON.stringify(reportData),
      },
    });
  };

  const handleEditReport = (report) => {
    setSelectedReport(report);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedReport(null);
  };

  const handleSaveEditedReport = (updatedReport) => {
    setMyReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );

    setEditModalVisible(false);
    setSelectedReport(null);

    Alert.alert("Report Updated", "Your report has been updated successfully.");
  };

  const handleDeleteReport = (reportId) => {
    Alert.alert("Delete Report", "Are you sure you want to delete this report?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMyReports((prevReports) =>
            prevReports.filter((report) => report.id !== reportId)
          );
        },
      },
    ]);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={17}
                  color={PRIMARY}
                />
              </View>

              <ThemedText style={styles.statNumber}>{totalReports}</ThemedText>
              <ThemedText style={styles.statLabel}>Total Reports</ThemedText>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="time-outline" size={17} color={PRIMARY} />
              </View>

              <ThemedText style={styles.statNumber}>{totalPending}</ThemedText>
              <ThemedText style={styles.statLabel}>Pending</ThemedText>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={17}
                  color={PRIMARY}
                />
              </View>

              <ThemedText style={styles.statNumber}>{totalResolved}</ThemedText>
              <ThemedText style={styles.statLabel}>Resolved</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.feedHeader}>
            <View style={styles.feedHeaderText}>
              <ThemedText style={styles.feedTitle}>My Reports</ThemedText>

              <ThemedText style={styles.feedSubtitle}>
                View your submitted reports and current status.
              </ThemedText>
            </View>

            <View style={styles.resultPill}>
              <ThemedText style={styles.resultPillText}>
                {filteredReports.length} result
                {filteredReports.length === 1 ? "" : "s"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.filterCard}>
            <DropdownFilter
              label="Status"
              value={selectedStatus}
              options={statusOptions}
              icon="filter-outline"
              isOpen={openDropdown === "status"}
              onToggle={() => handleDropdownToggle("status")}
              onSelect={(option) => {
                setSelectedStatus(option);
                setOpenDropdown(null);
              }}
            />
          </View>

          {filteredReports.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIcon}>
                <Ionicons name="folder-open-outline" size={28} color="#9CA3AF" />
              </View>

              <ThemedText style={styles.emptyTitle}>No reports found</ThemedText>

              <ThemedText style={styles.emptySubtitle}>
                There are no reports under this status filter.
              </ThemedText>
            </View>
          ) : (
            filteredReports.map((report, index) => (
              <MyUser_RepPost_Layout
                key={report.id}
                userName={report.userName}
                userAvatar={report.userAvatar}
                location={report.location}
                incidentCategory={report.incidentCategory}
                incidentType={report.incidentType}
                details={report.details}
                status={report.status}
                verified={report.verified}
                likes={report.likes}
                comments={report.comments}
                images={report.images}
                onLike={() => handleLike(report.id)}
                onComment={() => handleOpenReport(report)}
                onEdit={() => handleEditReport(report)}
                onDelete={() => handleDeleteReport(report.id)}
                style={
                  index !== filteredReports.length - 1
                    ? styles.reportCardSpacing
                    : null
                }
              />
            ))
          )}
        </View>
      </ScrollView>

      <EditReportModal
        visible={editModalVisible}
        report={selectedReport}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditedReport}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 110,
  },

  heroSection: {
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },

  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  statNumber: {
    fontFamily: FONT.semiBold,
    fontSize: 20,
    color: PRIMARY,
  },

  statLabel: {
    fontFamily: FONT.regular,
    marginTop: 3,
    fontSize: 10.5,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 15,
  },

  sectionBlock: {
    marginBottom: 14,
  },

  feedHeader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  feedHeaderText: {
    flex: 1,
    paddingRight: 10,
  },

  feedTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: "#1F2A37",
  },

  feedSubtitle: {
    fontFamily: FONT.regular,
    fontSize: 11,
    color: "#7B8794",
    marginTop: 3,
    lineHeight: 16,
  },

  resultPill: {
    backgroundColor: "#E8EEF9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  resultPillText: {
    fontFamily: FONT.medium,
    fontSize: 11,
    color: PRIMARY,
  },

  filterCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    zIndex: 50,
  },

  dropdownBlock: {
    position: "relative",
  },

  dropdownButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: "#F8FAFE",
    borderWidth: 1,
    borderColor: "#DDE7F5",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  activeDropdownButton: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  dropdownIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
  },

  activeDropdownIconWrap: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  dropdownTextWrap: {
    marginLeft: 10,
    flex: 1,
  },

  dropdownLabel: {
    fontFamily: FONT.regular,
    fontSize: 10,
    color: "#7B8794",
  },

  activeDropdownLabel: {
    color: "rgba(255,255,255,0.76)",
  },

  dropdownValue: {
    fontFamily: FONT.medium,
    marginTop: 2,
    fontSize: 13,
    color: PRIMARY,
  },

  activeDropdownValue: {
    color: "#FFFFFF",
  },

  dropdownMenu: {
    marginTop: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4EBF7",
    overflow: "hidden",
  },

  dropdownOption: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  activeDropdownOption: {
    backgroundColor: "#F3F6FB",
  },

  dropdownOptionText: {
    fontFamily: FONT.regular,
    fontSize: 13,
    color: "#374151",
  },

  activeDropdownOptionText: {
    fontFamily: FONT.medium,
    color: PRIMARY,
  },

  reportCardSpacing: {
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E4EBF7",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontFamily: FONT.semiBold,
    marginTop: 8,
    color: "#1F2A37",
    fontSize: 15,
  },

  emptySubtitle: {
    fontFamily: FONT.regular,
    marginTop: 4,
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  modalCard: {
    maxHeight: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    overflow: "hidden",
  },

  modalTopCloseRow: {
    paddingHorizontal: 14,
    paddingTop: 14,
    alignItems: "flex-end",
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
  },

  modalScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 20,
  },

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: PRIMARY,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONT.regular,
    fontSize: 15,
    color: "#1F2A37",
  },

  disabledInput: {
    backgroundColor: "#F8FAFD",
    color: "#68758A",
  },

  lockedInputWrap: {
    position: "relative",
  },

  lockedInput: {
    backgroundColor: "#F8FAFD",
    color: "#1F2A37",
    paddingRight: 42,
  },

  lockIconInside: {
    position: "absolute",
    right: 14,
    top: 15,
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
    fontFamily: FONT.regular,
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
    fontFamily: FONT.regular,
    fontSize: 15,
    color: "#1F2A37",
  },

  photoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  photoCount: {
    fontFamily: FONT.medium,
    fontSize: 12,
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
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: PRIMARY,
  },

  helperText: {
    marginTop: 8,
    fontFamily: FONT.regular,
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

  modalButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E0EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: "#475467",
  },

  saveButton: {
    flex: 1.4,
    height: 50,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default User_MyReports;