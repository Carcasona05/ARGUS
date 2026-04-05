import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import MapView from '../../components/MapView';

const INCIDENTS = [
  {
    id: 1,
    type: 'Robbery',
    street: 'Mabin St.',
    description: 'Victim attacked by armed suspect',
    hoursAgo: 2,
    top: 165,
    left: '58%',
    risk: 'High',
  },
  {
    id: 2,
    type: 'Mugging',
    street: 'Rizal Ave.',
    description: 'Phone snatching reported by pedestrian',
    hoursAgo: 4,
    top: 110,
    left: '22%',
    risk: 'Moderate',
  },
  {
    id: 3,
    type: 'Burglary',
    street: 'Aguinaldo St.',
    description: 'Forced entry reported at residence',
    hoursAgo: 7,
    top: 285,
    left: '28%',
    risk: 'High',
  },
  {
    id: 4,
    type: 'Car Theft',
    street: 'Luna St.',
    description: 'Vehicle stolen from roadside parking',
    hoursAgo: 10,
    top: 420,
    left: '72%',
    risk: 'Moderate',
  },
  {
    id: 5,
    type: 'Assault',
    street: 'Bonifacio Rd.',
    description: 'Fight incident reported near intersection',
    hoursAgo: 14,
    top: 500,
    left: '38%',
    risk: 'High',
  },
  {
    id: 6,
    type: 'Robbery',
    street: 'Del Pilar St.',
    description: 'Convenience store hold-up reported',
    hoursAgo: 20,
    top: 560,
    left: '65%',
    risk: 'High',
  },
];

const ALL_CRIMES = [
  'Robbery',
  'Mugging',
  'Burglary',
  'Assault',
  'Car Theft',
];

const UserMap = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCrimes, setSelectedCrimes] = useState([
    'Robbery',
    'Mugging',
    'Burglary',
  ]);
  const [timeRange, setTimeRange] = useState('Past 24 hours');
  const [selectedIncident, setSelectedIncident] = useState(INCIDENTS[0]);

  const filteredIncidents = useMemo(() => {
    const maxHours = timeRange === 'Past 24 hours' ? 24 : 24 * 7;

    return INCIDENTS.filter((incident) => {
      const matchesCrime = selectedCrimes.includes(incident.type);
      const matchesTime = incident.hoursAgo <= maxHours;
      const matchesSearch =
        searchText.trim() === '' ||
        incident.street.toLowerCase().includes(searchText.toLowerCase()) ||
        incident.type.toLowerCase().includes(searchText.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchText.toLowerCase());

      return matchesCrime && matchesTime && matchesSearch;
    });
  }, [searchText, selectedCrimes, timeRange]);

  const robberyCount = filteredIncidents.filter((i) => i.type === 'Robbery').length;
  const carTheftCount = filteredIncidents.filter((i) => i.type === 'Car Theft').length;
  const assaultCount = filteredIncidents.filter((i) => i.type === 'Assault').length;

  const toggleCrime = (crime) => {
    setSelectedCrimes((prev) =>
      prev.includes(crime)
        ? prev.filter((item) => item !== crime)
        : [...prev, crime]
    );
  };

  const getMarkerStyle = (risk) => {
    switch (risk) {
      case 'Low':
        return styles.lowMarker;
      case 'Moderate':
        return styles.moderateMarker;
      default:
        return styles.highMarker;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapView style={styles.map} />

        {/* Colored risk zones */}
        <View style={[styles.riskZone, styles.lowZone]} />
        <View style={[styles.riskZone, styles.moderateZone]} />
        <View style={[styles.riskZone, styles.highZone]} />

        {/* Search */}
        <View style={styles.topBar}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search area..."
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

        {/* Risk legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: '#84C865' }]} />
            <ThemedText style={styles.legendText}>Low Risk</ThemedText>
          </View>

          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: '#F5B041' }]} />
            <ThemedText style={styles.legendText}>Moderate Risk</ThemedText>
          </View>

          <View style={styles.legendChip}>
            <View style={[styles.legendDot, { backgroundColor: '#D9534F' }]} />
            <ThemedText style={styles.legendText}>High Risk</ThemedText>
          </View>
        </View>

        {/* User location */}
        <View style={styles.userLocation}>
          <View style={styles.userLocationDot} />
        </View>
        <View style={styles.userBadge}>
          <ThemedText style={styles.userBadgeText}>You</ThemedText>
        </View>

        {/* Crime markers */}
        {filteredIncidents.map((incident) => (
          <TouchableOpacity
            key={incident.id}
            style={[
              styles.marker,
              getMarkerStyle(incident.risk),
              { top: incident.top, left: incident.left },
            ]}
            onPress={() => setSelectedIncident(incident)}
          >
            <ThemedText style={styles.markerText}>!</ThemedText>
          </TouchableOpacity>
        ))}

        {/* Selected incident card */}
        {selectedIncident && (
          <View style={styles.incidentCard}>
            <View style={styles.incidentCardHeader}>
              <View style={styles.incidentTypeRow}>
                <View style={styles.smallDangerDot} />
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

            <TouchableOpacity>
              <ThemedText style={styles.moreDetailsText}>More Details</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom summary panel */}
        <View style={styles.bottomPanel}>
          <View style={styles.filtersTag}>
            <ThemedText style={styles.filtersTagText}>
              Filters ({selectedCrimes.length})
            </ThemedText>
          </View>

          <View style={styles.statsRow}>
            <ThemedText style={styles.totalLabel}>
              Total Incidents: {filteredIncidents.length}
            </ThemedText>
            <ThemedText style={styles.breakdownText}>Robbery {robberyCount}</ThemedText>
            <ThemedText style={styles.breakdownText}>
              Car Theft {carTheftCount}
            </ThemedText>
            <ThemedText style={styles.breakdownText}>Assault {assaultCount}</ThemedText>
          </View>

          <ThemedText style={styles.rangeText}>{timeRange}</ThemedText>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Locate Me</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Directions</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionButtonText}>Safety Tips</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilters(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowFilters(false)}>
          <Pressable style={styles.filterModal} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Apply Filters</ThemedText>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <ThemedText style={styles.closeText}>✕</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.sectionTitle}>Crime Type</ThemedText>

            <View style={styles.checkboxGrid}>
              {ALL_CRIMES.map((crime) => {
                const checked = selectedCrimes.includes(crime);

                return (
                  <TouchableOpacity
                    key={crime}
                    style={styles.checkboxItem}
                    onPress={() => toggleCrime(crime)}
                  >
                    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                      <ThemedText style={styles.checkboxTick}>
                        {checked ? '✓' : ''}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.checkboxLabel}>{crime}</ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            <ThemedText style={styles.sectionTitle}>Time Range</ThemedText>

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                setTimeRange((prev) =>
                  prev === 'Past 24 hours' ? 'Past 7 days' : 'Past 24 hours'
                )
              }
            >
              <ThemedText style={styles.dropdownText}>{timeRange}</ThemedText>
              <ThemedText style={styles.dropdownArrow}>⌄</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  topBar: {
    position: 'absolute',
    top: 14,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1E1E1E',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  filterIconButton: {
    width: 46,
    height: 46,
    marginLeft: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  filterIconText: {
    fontSize: 18,
    color: '#294880',
    fontWeight: '700',
  },

  legendRow: {
    position: 'absolute',
    top: 70,
    left: 12,
    right: 12,
    flexDirection: 'row',
  },
  legendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    fontWeight: '600',
    color: '#4A4A4A',
  },

  riskZone: {
    position: 'absolute',
    opacity: 0.26,
    borderRadius: 24,
  },
  lowZone: {
    width: 110,
    height: 210,
    top: 140,
    left: 24,
    backgroundColor: '#84C865',
    transform: [{ rotate: '-20deg' }],
  },
  moderateZone: {
    width: 130,
    height: 240,
    top: 210,
    left: 90,
    backgroundColor: '#F5B041',
    transform: [{ rotate: '-18deg' }],
  },
  highZone: {
    width: 150,
    height: 350,
    top: 120,
    left: 150,
    backgroundColor: '#D9534F',
    transform: [{ rotate: '-16deg' }],
  },

  marker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  lowMarker: {
    backgroundColor: '#84C865',
  },
  moderateMarker: {
    backgroundColor: '#F5B041',
  },
  highMarker: {
    backgroundColor: '#D9534F',
  },
  markerText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    marginTop: -1,
  },

  userLocation: {
    position: 'absolute',
    top: 305,
    left: '47%',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2F80ED',
  },
  userBadge: {
    position: 'absolute',
    top: 328,
    left: '44.5%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 2,
  },
  userBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B6B6B',
  },

  incidentCard: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  incidentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incidentTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallDangerDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#D9534F',
    marginRight: 6,
  },
  incidentTypeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  timeText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  streetText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#5E5E5E',
  },
  descriptionText: {
    marginTop: 6,
    fontSize: 13,
    color: '#6C6C6C',
    lineHeight: 18,
  },
  moreDetailsText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#D9534F',
  },

  bottomPanel: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 20,
    padding: 12,
    elevation: 8,
  },
  filtersTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  filtersTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#294880',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  totalLabel: {
    width: '100%',
    fontSize: 13,
    fontWeight: '700',
    color: '#3A3A3A',
    marginBottom: 4,
  },
  breakdownText: {
    fontSize: 12,
    color: '#5E5E5E',
    marginRight: 12,
    marginBottom: 4,
  },
  rangeText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#294880',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 92,
    paddingRight: 14,
  },
  filterModal: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222222',
  },
  closeText: {
    fontSize: 18,
    color: '#6C6C6C',
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#3A3A3A',
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#C7C7CC',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#D9534F',
    borderColor: '#D9534F',
  },
  checkboxTick: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#444444',
  },
  dropdown: {
    height: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 13,
    color: '#444444',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666666',
  },
  applyButton: {
    marginTop: 18,
    backgroundColor: '#C62828',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default UserMap;