import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import MapView from "../../components/MapView";

const INCIDENT_CATEGORY_MAP = {
  Crime: ["Robbery", "Mugging", "Burglary", "Assault", "Car Theft"],
  Traffic: ["Vehicular Accident", "Road Obstruction", "Drunk Driving"],
  Hazard: ["Fire", "Flood", "Fallen Tree"],
  "Public Safety": [
    "Suspicious Activity",
    "Medical Emergency",
    "Missing Person",
  ],
};

const TIME_RANGE_OPTIONS = [
  "Past 24 hours",
  "Past 3 days",
  "Past 7 days",
  "Past 30 days",
];

const INCIDENTS = [
  {
    id: 1,
    category: "Crime",
    type: "Robbery",
    street: "Mabini St.",
    description: "Victim attacked by armed suspect.",
    hoursAgo: 2,
    top: 165,
    left: "58%",
    risk: "High",
  },
  {
    id: 2,
    category: "Crime",
    type: "Mugging",
    street: "Rizal Ave.",
    description: "Phone snatching reported by pedestrian.",
    hoursAgo: 4,
    top: 110,
    left: "22%",
    risk: "Moderate",
  },
  {
    id: 3,
    category: "Crime",
    type: "Burglary",
    street: "Aguinaldo St.",
    description: "Forced entry reported at residence.",
    hoursAgo: 7,
    top: 285,
    left: "28%",
    risk: "High",
  },
  {
    id: 4,
    category: "Crime",
    type: "Car Theft",
    street: "Luna St.",
    description: "Vehicle stolen from roadside parking.",
    hoursAgo: 10,
    top: 420,
    left: "72%",
    risk: "Moderate",
  },
  {
    id: 5,
    category: "Crime",
    type: "Assault",
    street: "Bonifacio Rd.",
    description: "Fight incident reported near intersection.",
    hoursAgo: 14,
    top: 500,
    left: "38%",
    risk: "High",
  },
  {
    id: 6,
    category: "Traffic",
    type: "Vehicular Accident",
    street: "Osmeña Blvd.",
    description: "Two motorcycles collided near the crossing.",
    hoursAgo: 5,
    top: 235,
    left: "62%",
    risk: "Moderate",
  },
  {
    id: 7,
    category: "Traffic",
    type: "Road Obstruction",
    street: "Quezon Ave.",
    description: "Broken-down truck blocking one lane.",
    hoursAgo: 18,
    top: 355,
    left: "20%",
    risk: "Low",
  },
  {
    id: 8,
    category: "Hazard",
    type: "Flood",
    street: "San Jose Ext.",
    description: "Street partially flooded after heavy rain.",
    hoursAgo: 8,
    top: 470,
    left: "57%",
    risk: "Moderate",
  },
  {
    id: 9,
    category: "Hazard",
    type: "Fire",
    street: "P. Gomez St.",
    description: "Small residential fire already reported.",
    hoursAgo: 3,
    top: 210,
    left: "44%",
    risk: "High",
  },
  {
    id: 10,
    category: "Public Safety",
    type: "Suspicious Activity",
    street: "Del Pilar St.",
    description: "Unidentified person loitering near closed stores.",
    hoursAgo: 9,
    top: 560,
    left: "65%",
    risk: "Moderate",
  },
  {
    id: 11,
    category: "Public Safety",
    type: "Medical Emergency",
    street: "Burgos St.",
    description: "Resident requested urgent medical assistance.",
    hoursAgo: 1,
    top: 300,
    left: "50%",
    risk: "High",
  },
];

const getHoursLimit = (range) => {
  switch (range) {
    case "Past 24 hours":
      return 24;
    case "Past 3 days":
      return 72;
    case "Past 7 days":
      return 168;
    case "Past 30 days":
      return 720;
    default:
      return 24;
  }
};

const getRiskStyle = (risk, styles) => {
  switch (risk) {
    case "Low":
      return styles.lowMarker;
    case "Moderate":
      return styles.moderateMarker;
    default:
      return styles.highMarker;
  }
};

const UserMap = () => {
  const categoryOptions = Object.keys(INCIDENT_CATEGORY_MAP);

  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Crime");
  const [selectedTypes, setSelectedTypes] = useState(
    INCIDENT_CATEGORY_MAP["Crime"]
  );
  const [timeRange, setTimeRange] = useState("Past 24 hours");

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const [selectedIncident, setSelectedIncident] = useState(null);

  const availableTypes = useMemo(() => {
    return INCIDENT_CATEGORY_MAP[selectedCategory] ?? [];
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedTypes(INCIDENT_CATEGORY_MAP[selectedCategory] ?? []);
  }, [selectedCategory]);

  const filteredIncidents = useMemo(() => {
    const maxHours = getHoursLimit(timeRange);
    const normalizedSearch = searchText.trim().toLowerCase();

    return INCIDENTS.filter((incident) => {
      const matchesCategory = incident.category === selectedCategory;
      const matchesType = selectedTypes.includes(incident.type);
      const matchesTime = incident.hoursAgo <= maxHours;
      const matchesSearch =
        normalizedSearch === "" ||
        incident.street.toLowerCase().includes(normalizedSearch) ||
        incident.type.toLowerCase().includes(normalizedSearch) ||
        incident.category.toLowerCase().includes(normalizedSearch) ||
        incident.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesType && matchesTime && matchesSearch;
    });
  }, [searchText, selectedCategory, selectedTypes, timeRange]);

  useEffect(() => {
    if (filteredIncidents.length === 0) {
      setSelectedIncident(null);
      return;
    }

    setSelectedIncident((prev) => {
      if (prev && filteredIncidents.some((item) => item.id === prev.id)) {
        return (
          filteredIncidents.find((item) => item.id === prev.id) ??
          filteredIncidents[0]
        );
      }

      return filteredIncidents[0];
    });
  }, [filteredIncidents]);

  const typeBreakdown = useMemo(() => {
    return filteredIncidents.reduce((acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1;
      return acc;
    }, {});
  }, [filteredIncidents]);

  const breakdownEntries = Object.entries(typeBreakdown).slice(0, 3);

  const toggleIncidentType = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== type);
      }

      return [...prev, type];
    });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleSelectTimeRange = (range) => {
    setTimeRange(range);
    setShowTimeDropdown(false);
  };

  const resetFilters = () => {
    setSelectedCategory("Crime");
    setSelectedTypes(INCIDENT_CATEGORY_MAP["Crime"]);
    setTimeRange("Past 24 hours");
    setSearchText("");
    setShowCategoryDropdown(false);
    setShowTimeDropdown(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView style={styles.map} />

        <View style={[styles.riskZone, styles.lowZone]} />
        <View style={[styles.riskZone, styles.moderateZone]} />
        <View style={[styles.riskZone, styles.highZone]} />

        <View style={styles.topBar}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search area or incident..."
            placeholderTextColor="#8E8E93"
            value={searchText}
            onChangeText={setSearchText}
          />

          <TouchableOpacity
            style={styles.filterIconButton}
            onPress={() => setShowFilters(true)}
          >
            <ThemedText style={styles.filterIconText}>☰</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.legendRow}
          contentContainerStyle={styles.legendContent}
        >
          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: "#84C865" }]} />
            <ThemedText style={styles.legendText}>Low Risk</ThemedText>
          </View>

          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: "#F5B041" }]} />
            <ThemedText style={styles.legendText}>Moderate Risk</ThemedText>
          </View>

          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: "#D9534F" }]} />
            <ThemedText style={styles.legendText}>High Risk</ThemedText>
          </View>
        </ScrollView>

        <View style={styles.userLocation}>
          <View style={styles.userLocationDot} />
        </View>

        <View style={styles.userBadge}>
          <ThemedText style={styles.userBadgeText}>You</ThemedText>
        </View>

        {filteredIncidents.map((incident) => (
          <TouchableOpacity
            key={incident.id}
            style={[
              styles.marker,
              getRiskStyle(incident.risk, styles),
              {
                top: incident.top,
                left: incident.left,
              },
            ]}
            onPress={() => setSelectedIncident(incident)}
          >
            <ThemedText style={styles.markerText}>!</ThemedText>
          </TouchableOpacity>
        ))}

        {selectedIncident && (
          <View style={styles.incidentCard}>
            <View style={styles.incidentCardHeader}>
              <View style={styles.incidentTypeRow}>
                <View
                  style={[
                    styles.smallDangerDot,
                    selectedIncident.risk === "Low"
                      ? styles.lowMarker
                      : selectedIncident.risk === "Moderate"
                        ? styles.moderateMarker
                        : styles.highMarker,
                  ]}
                />
                <ThemedText style={styles.incidentTypeText}>
                  {selectedIncident.type}
                </ThemedText>
              </View>

              <ThemedText style={styles.timeText}>
                {selectedIncident.hoursAgo} hrs ago
              </ThemedText>
            </View>

            <ThemedText style={styles.streetText}>
              {selectedIncident.street}
            </ThemedText>

            <ThemedText style={styles.descriptionText}>
              {selectedIncident.description}
            </ThemedText>

            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <ThemedText style={styles.metaChipText}>
                  {selectedIncident.category}
                </ThemedText>
              </View>

              <View style={styles.metaChip}>
                <ThemedText style={styles.metaChipText}>
                  {selectedIncident.risk} Risk
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        <View style={styles.bottomSafeSpace} />

        <View style={styles.bottomPanel}>
          <View style={styles.filtersTag}>
            <ThemedText style={styles.filtersTagText}>
              {selectedCategory} • {selectedTypes.length} type
              {selectedTypes.length > 1 ? "s" : ""}
            </ThemedText>
          </View>

          <View style={styles.statsRow}>
            <ThemedText style={styles.totalLabel}>
              Total Incidents: {filteredIncidents.length}
            </ThemedText>

            {breakdownEntries.length > 0 ? (
              breakdownEntries.map(([type, count]) => (
                <ThemedText key={type} style={styles.breakdownText}>
                  {type} {count}
                </ThemedText>
              ))
            ) : (
              <ThemedText style={styles.breakdownText}>
                No incidents found
              </ThemedText>
            )}
          </View>

          <ThemedText style={styles.rangeText}>{timeRange}</ThemedText>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Locate Me</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>
                Directions
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
              <ThemedText style={styles.modalTitle}>Apply Filters</ThemedText>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <ThemedText style={styles.closeText}>✕</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.sectionTitle}>
              Incident Category
            </ThemedText>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowCategoryDropdown((prev) => !prev);
                setShowTimeDropdown(false);
              }}
            >
              <ThemedText style={styles.dropdownText}>
                {selectedCategory}
              </ThemedText>
              <ThemedText style={styles.dropdownArrow}>
                {showCategoryDropdown ? "⌃" : "⌄"}
              </ThemedText>
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View style={styles.dropdownList}>
                {categoryOptions.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.dropdownItem,
                      selectedCategory === category &&
                        styles.dropdownItemActive,
                    ]}
                    onPress={() => handleSelectCategory(category)}
                  >
                    <ThemedText
                      style={[
                        styles.dropdownItemText,
                        selectedCategory === category &&
                          styles.dropdownItemTextActive,
                      ]}
                    >
                      {category}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <ThemedText style={styles.sectionTitle}>Incident Type</ThemedText>
            <View style={styles.checkboxGrid}>
              {availableTypes.map((type) => {
                const checked = selectedTypes.includes(type);

                return (
                  <TouchableOpacity
                    key={type}
                    style={styles.checkboxItem}
                    onPress={() => toggleIncidentType(type)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        checked && styles.checkboxChecked,
                      ]}
                    >
                      <ThemedText style={styles.checkboxTick}>
                        {checked ? "✓" : ""}
                      </ThemedText>
                    </View>

                    <ThemedText style={styles.checkboxLabel}>{type}</ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            <ThemedText style={styles.sectionTitle}>Time Range</ThemedText>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowTimeDropdown((prev) => !prev);
                setShowCategoryDropdown(false);
              }}
            >
              <ThemedText style={styles.dropdownText}>{timeRange}</ThemedText>
              <ThemedText style={styles.dropdownArrow}>
                {showTimeDropdown ? "⌃" : "⌄"}
              </ThemedText>
            </TouchableOpacity>

            {showTimeDropdown && (
              <View style={styles.dropdownList}>
                {TIME_RANGE_OPTIONS.map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={[
                      styles.dropdownItem,
                      timeRange === range && styles.dropdownItemActive,
                    ]}
                    onPress={() => handleSelectTimeRange(range)}
                  >
                    <ThemedText
                      style={[
                        styles.dropdownItemText,
                        timeRange === range && styles.dropdownItemTextActive,
                      ]}
                    >
                      {range}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <ThemedText style={styles.resetButtonText}>Reset</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <ThemedText style={styles.applyButtonText}>
                  Apply Filters
                </ThemedText>
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

  mapWrapper: {
    flex: 1,
    position: "relative",
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
  },

  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1E1E1E",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  filterIconText: {
    fontSize: 18,
    color: "#294880",
    fontWeight: "700",
  },

  legendRow: {
    position: "absolute",
    top: 70,
    left: 12,
    right: 12,
    maxHeight: 40,
  },

  legendContent: {
    paddingRight: 20,
  },

  legendChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 6,
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

  legendText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4A4A4A",
  },

  riskZone: {
    position: "absolute",
    opacity: 0.22,
    borderRadius: 24,
  },

  lowZone: {
    width: 110,
    height: 210,
    top: 140,
    left: 24,
    backgroundColor: "#84C865",
    transform: [{ rotate: "-20deg" }],
  },

  moderateZone: {
    width: 130,
    height: 240,
    top: 210,
    left: 90,
    backgroundColor: "#F5B041",
    transform: [{ rotate: "-18deg" }],
  },

  highZone: {
    width: 150,
    height: 350,
    top: 120,
    left: 150,
    backgroundColor: "#D9534F",
    transform: [{ rotate: "-16deg" }],
  },

  marker: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  lowMarker: {
    backgroundColor: "#84C865",
  },

  moderateMarker: {
    backgroundColor: "#F5B041",
  },

  highMarker: {
    backgroundColor: "#D9534F",
  },

  markerText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
    marginTop: -1,
  },

  userLocation: {
    position: "absolute",
    top: 305,
    left: "47%",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  userLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2F80ED",
  },

  userBadge: {
    position: "absolute",
    top: 328,
    left: "44.5%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 2,
  },

  userBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B6B6B",
  },

  incidentCard: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  incidentCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  incidentTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  smallDangerDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 6,
  },

  incidentTypeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
    flexShrink: 1,
  },

  timeText: {
    fontSize: 12,
    color: "#8E8E93",
  },

  streetText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#5E5E5E",
  },

  descriptionText: {
    marginTop: 6,
    fontSize: 13,
    color: "#6C6C6C",
    lineHeight: 18,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  metaChip: {
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
  },

  metaChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#294880",
  },

  bottomSafeSpace: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
    backgroundColor: "#000000",
    opacity: 0.05,
  },

  bottomPanel: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 110,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 20,
    padding: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
    fontWeight: "700",
    color: "#294880",
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },

  totalLabel: {
    width: "100%",
    fontSize: 13,
    fontWeight: "700",
    color: "#3A3A3A",
    marginBottom: 4,
  },

  breakdownText: {
    fontSize: 12,
    color: "#5E5E5E",
    marginRight: 12,
    marginBottom: 4,
  },

  rangeText: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 10,
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#294880",
    paddingVertical: 9,
    borderRadius: 999,
    alignItems: "center",
    marginHorizontal: 4,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
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
    width: 290,
    maxHeight: "78%",
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
    fontWeight: "700",
    color: "#222222",
  },

  closeText: {
    fontSize: 18,
    color: "#6C6C6C",
    fontWeight: "700",
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#3A3A3A",
  },

  dropdown: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#D9E1F2",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAFBFF",
  },

  dropdownText: {
    fontSize: 13,
    color: "#444444",
    fontWeight: "600",
  },

  dropdownArrow: {
    fontSize: 16,
    color: "#666666",
  },

  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },

  dropdownItemActive: {
    backgroundColor: "#EEF2FF",
  },

  dropdownItemText: {
    fontSize: 13,
    color: "#444444",
  },

  dropdownItemTextActive: {
    color: "#294880",
    fontWeight: "700",
  },

  checkboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  checkboxItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingRight: 8,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#C7C7CC",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  checkboxChecked: {
    backgroundColor: "#294880",
    borderColor: "#294880",
  },

  checkboxTick: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: "#444444",
  },

  modalButtonsRow: {
    flexDirection: "row",
    marginTop: 20,
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
    color: "#294880",
    fontWeight: "700",
    fontSize: 14,
  },

  applyButton: {
    flex: 1.3,
    backgroundColor: "#294880",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },

  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default UserMap;