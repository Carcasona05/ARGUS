import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import MapView from "../../components/MapView";

const ARGUS_BLUE = "#294880";

const { width } = Dimensions.get("window");

const FACILITY_TYPES = ["All", "Police Station", "Fire Department"];

const EMERGENCY_FACILITIES = [
  {
    id: 1,
    type: "Police Station",
    name: "Argao Municipal Police Station",
    location: "Poblacion, Argao",
    distance: "1.2 km away",
    contact: "911 / Local Police Hotline",
    responseNote: "Nearest police assistance for public safety concerns.",
    top: 165,
    left: "42%",
  },
  {
    id: 2,
    type: "Fire Department",
    name: "Argao Fire Station",
    location: "Poblacion, Argao",
    distance: "1.8 km away",
    contact: "911 / Local Fire Hotline",
    responseNote: "Nearest fire response for fire and emergency incidents.",
    top: 250,
    left: "58%",
  },
  {
    id: 3,
    type: "Police Station",
    name: "Nearby Police Assistance Point",
    location: "South Road Area, Argao",
    distance: "2.4 km away",
    contact: "911",
    responseNote: "Available for patrol assistance and incident reporting.",
    top: 340,
    left: "34%",
  },
  {
    id: 4,
    type: "Fire Department",
    name: "Nearby Fire Response Unit",
    location: "Argao Emergency Response Area",
    distance: "3.1 km away",
    contact: "911",
    responseNote: "Available for fire, rescue, and emergency response.",
    top: 410,
    left: "64%",
  },
];

const UserMap = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(
    EMERGENCY_FACILITIES[0]
  );

  const filteredFacilities = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return EMERGENCY_FACILITIES.filter((facility) => {
      const matchesType =
        selectedType === "All" || facility.type === selectedType;

      const matchesSearch =
        normalizedSearch === "" ||
        facility.name.toLowerCase().includes(normalizedSearch) ||
        facility.type.toLowerCase().includes(normalizedSearch) ||
        facility.location.toLowerCase().includes(normalizedSearch);

      return matchesType && matchesSearch;
    });
  }, [searchText, selectedType]);

  const nearestPolice = EMERGENCY_FACILITIES.find(
    (facility) => facility.type === "Police Station"
  );

  const nearestFire = EMERGENCY_FACILITIES.find(
    (facility) => facility.type === "Fire Department"
  );

  const handleSelectType = (type) => {
    setSelectedType(type);
    setShowFilters(false);

    const firstMatch = EMERGENCY_FACILITIES.find((facility) => {
      return type === "All" || facility.type === type;
    });

    if (firstMatch) {
      setSelectedFacility(firstMatch);
    }
  };

  const resetFilters = () => {
    setSelectedType("All");
    setSearchText("");
    setSelectedFacility(EMERGENCY_FACILITIES[0]);
  };

  const getFacilityIcon = (type) => {
    if (type === "Police Station") return "shield-checkmark";
    if (type === "Fire Department") return "flame";
    return "location";
  };

  const getFacilityPinStyle = (type) => {
    if (type === "Police Station") return styles.policePin;
    if (type === "Fire Department") return styles.firePin;
    return styles.defaultPin;
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={styles.screenContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapWrapper}>
          <MapView style={styles.map} />

          <View style={styles.topBar}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search police or fire station..."
              placeholderTextColor="#8E8E93"
              value={searchText}
              onChangeText={setSearchText}
            />

            <TouchableOpacity
              style={styles.filterIconButton}
              activeOpacity={0.8}
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="options-outline" size={22} color={ARGUS_BLUE} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.legendRow}
            contentContainerStyle={styles.legendContent}
          >
            <View style={styles.legendChip}>
              <View style={[styles.legendDot, styles.policeDot]} />
              <ThemedText style={styles.legendText}>Police Station</ThemedText>
            </View>

            <View style={styles.legendChip}>
              <View style={[styles.legendDot, styles.fireDot]} />
              <ThemedText style={styles.legendText}>Fire Department</ThemedText>
            </View>

            <View style={styles.legendChip}>
              <View style={[styles.legendDot, styles.userDotSmall]} />
              <ThemedText style={styles.legendText}>Your Location</ThemedText>
            </View>
          </ScrollView>

          <View style={styles.userLocation}>
            <View style={styles.userLocationDot} />
          </View>

          <View style={styles.userBadge}>
            <ThemedText style={styles.userBadgeText}>You</ThemedText>
          </View>

          {filteredFacilities.map((facility) => (
            <TouchableOpacity
              key={facility.id}
              activeOpacity={0.85}
              style={[
                styles.facilityMarker,
                getFacilityPinStyle(facility.type),
                {
                  top: facility.top,
                  left: facility.left,
                },
              ]}
              onPress={() => setSelectedFacility(facility)}
            >
              <Ionicons
                name={getFacilityIcon(facility.type)}
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          ))}
        </View>

        {selectedFacility && (
          <View style={styles.facilityCard}>
            <View style={styles.facilityHeader}>
              <View style={styles.facilityTitleRow}>
                <View
                  style={[
                    styles.facilityIconBox,
                    selectedFacility.type === "Police Station"
                      ? styles.policeIconBox
                      : styles.fireIconBox,
                  ]}
                >
                  <Ionicons
                    name={getFacilityIcon(selectedFacility.type)}
                    size={18}
                    color="#FFFFFF"
                  />
                </View>

                <View style={styles.facilityTitleWrap}>
                  <ThemedText style={styles.facilityName}>
                    {selectedFacility.name}
                  </ThemedText>

                  <ThemedText style={styles.facilityType}>
                    {selectedFacility.type}
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={styles.distanceText}>
                {selectedFacility.distance}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.infoText}>
                {selectedFacility.location}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.infoText}>
                {selectedFacility.contact}
              </ThemedText>
            </View>

            <ThemedText style={styles.responseNote}>
              {selectedFacility.responseNote}
            </ThemedText>

            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                <Ionicons name="navigate-outline" size={16} color="#FFFFFF" />
                <ThemedText style={styles.primaryButtonText}>
                  Get Directions
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
              >
                <Ionicons name="call-outline" size={16} color={ARGUS_BLUE} />
                <ThemedText style={styles.secondaryButtonText}>
                  Call
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.bottomPanel}>
          <View style={styles.filtersTag}>
            <ThemedText style={styles.filtersTagText}>
              Showing: {selectedType}
            </ThemedText>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, styles.policeIconBox]}>
                <Ionicons name="shield-checkmark" size={17} color="#FFFFFF" />
              </View>

              <View style={styles.summaryTextWrap}>
                <ThemedText style={styles.summaryLabel}>
                  Nearest Police
                </ThemedText>

                <ThemedText numberOfLines={1} style={styles.summaryValue}>
                  {nearestPolice?.distance}
                </ThemedText>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, styles.fireIconBox]}>
                <Ionicons name="flame" size={17} color="#FFFFFF" />
              </View>

              <View style={styles.summaryTextWrap}>
                <ThemedText style={styles.summaryLabel}>
                  Nearest Fire Dept.
                </ThemedText>

                <ThemedText numberOfLines={1} style={styles.summaryValue}>
                  {nearestFire?.distance}
                </ThemedText>
              </View>
            </View>
          </View>

          <ThemedText style={styles.bottomNote}>
            Pins show nearby emergency response locations for faster assistance.
          </ThemedText>
        </View>
      </ScrollView>

      <Modal
        visible={showFilters}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilters(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowFilters(false)}
        >
          <Pressable style={styles.filterModal} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Map Filter</ThemedText>

              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.sectionTitle}>
              Emergency Location Type
            </ThemedText>

            {FACILITY_TYPES.map((type) => {
              const active = selectedType === type;

              return (
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.8}
                  style={[styles.filterOption, active && styles.activeOption]}
                  onPress={() => handleSelectType(type)}
                >
                  <View style={styles.filterOptionLeft}>
                    <View
                      style={[
                        styles.radioCircle,
                        active && styles.radioCircleActive,
                      ]}
                    >
                      {active && <View style={styles.radioInner} />}
                    </View>

                    <ThemedText
                      style={[
                        styles.filterOptionText,
                        active && styles.filterOptionTextActive,
                      ]}
                    >
                      {type}
                    </ThemedText>
                  </View>

                  {type !== "All" && (
                    <Ionicons
                      name={getFacilityIcon(type)}
                      size={18}
                      color={active ? ARGUS_BLUE : "#9CA3AF"}
                    />
                  )}
                </TouchableOpacity>
              );
            })}

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.resetButton}
                activeOpacity={0.8}
                onPress={resetFilters}
              >
                <ThemedText style={styles.resetButtonText}>Reset</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                activeOpacity={0.8}
                onPress={() => setShowFilters(false)}
              >
                <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  screenScroll: {
    flex: 1,
  },

  screenContent: {
    paddingBottom: 120,
  },

  mapWrapper: {
    width: "100%",
    height: 560,
    position: "relative",
    backgroundColor: "#DCE7F3",
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  topBar: {
    position: "absolute",
    top: 14,
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },

  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#1E1E1E",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  filterIconButton: {
    width: 46,
    height: 46,
    marginLeft: 8,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  legendRow: {
    position: "absolute",
    top: 70,
    left: 12,
    right: 12,
    maxHeight: 42,
    zIndex: 10,
  },

  legendContent: {
    paddingRight: 20,
  },

  legendChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginRight: 8,
    elevation: 2,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 6,
  },

  policeDot: {
    backgroundColor: ARGUS_BLUE,
  },

  fireDot: {
    backgroundColor: "#D9534F",
  },

  userDotSmall: {
    backgroundColor: "#2F80ED",
  },

  legendText: {
    fontSize: 11,
    fontFamily: "PoppinsMedium",
    color: "#4A4A4A",
  },

  userLocation: {
    position: "absolute",
    top: 300,
    left: "47%",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
  },

  userLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2F80ED",
  },

  userBadge: {
    position: "absolute",
    top: 323,
    left: "44.5%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 2,
    zIndex: 9,
  },

  userBadgeText: {
    fontSize: 11,
    fontFamily: "PoppinsMedium",
    color: "#6B6B6B",
  },

  facilityMarker: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 8,
  },

  policePin: {
    backgroundColor: ARGUS_BLUE,
  },

  firePin: {
    backgroundColor: "#D9534F",
  },

  defaultPin: {
    backgroundColor: "#6B7280",
  },

  facilityCard: {
    marginHorizontal: 14,
    marginTop: -78,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 20,
  },

  facilityHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  facilityTitleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  facilityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  policeIconBox: {
    backgroundColor: ARGUS_BLUE,
  },

  fireIconBox: {
    backgroundColor: "#D9534F",
  },

  facilityTitleWrap: {
    flex: 1,
  },

  facilityName: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: "#1F2937",
  },

  facilityType: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
  },

  distanceText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: ARGUS_BLUE,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  infoText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#4B5563",
  },

  responseNote: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
    lineHeight: 18,
  },

  cardButtons: {
    flexDirection: "row",
    marginTop: 13,
  },

  primaryButton: {
    flex: 1.3,
    height: 40,
    borderRadius: 999,
    backgroundColor: ARGUS_BLUE,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 8,
  },

  primaryButtonText: {
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },

  secondaryButton: {
    flex: 0.8,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  secondaryButtonText: {
    marginLeft: 6,
    color: ARGUS_BLUE,
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },

  bottomPanel: {
    marginHorizontal: 10,
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 20,
    padding: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  filtersTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },

  filtersTagText: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: ARGUS_BLUE,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 8,
  },

  summaryCard: {
    flex: 1,
    minHeight: 66,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5EAF3",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  summaryTextWrap: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 11,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
  },

  summaryValue: {
    marginTop: 3,
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#1F2937",
  },

  bottomNote: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#6B7280",
    lineHeight: 17,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 92,
    paddingRight: 14,
  },

  filterModal: {
    width: Math.min(width - 28, 320),
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    elevation: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: "#222222",
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#3A3A3A",
  },

  filterOption: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    backgroundColor: "#FAFBFF",
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  activeOption: {
    backgroundColor: "#EEF2FF",
    borderColor: "#C9D8F5",
  },

  filterOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  radioCircleActive: {
    borderColor: ARGUS_BLUE,
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: ARGUS_BLUE,
  },

  filterOptionText: {
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#4B5563",
  },

  filterOptionTextActive: {
    fontFamily: "PoppinsMedium",
    color: ARGUS_BLUE,
  },

  modalButtonsRow: {
    flexDirection: "row",
    marginTop: 16,
  },

  resetButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#EEF2FF",
  },

  resetButtonText: {
    color: ARGUS_BLUE,
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },

  applyButton: {
    flex: 1.3,
    backgroundColor: ARGUS_BLUE,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },

  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "PoppinsMedium",
  },
});

export default UserMap;