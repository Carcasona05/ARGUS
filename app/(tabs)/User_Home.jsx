import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Divboxwhite from '../../components/Divboxwhite';
import ThemedHeader from '../../components/ThemedHeader';

// MapView Component (Static for now)
const MapView = () => (
  <View style={styles.mapContainer}>
    <ThemedText style={styles.mapText}>Map with Risk Zones Here</ThemedText>
    {/* Implement actual map rendering */}
  </View>
);

// CautionBox Component
const CautionBox = () => (
  <View style={styles.cautionBox}>
    <ThemedText style={styles.warningText}>CAUTION:</ThemedText>
    <ThemedText style={styles.messageText}>
      You are entering a high-risk area. Stay alert. Avoid walking alone, and keep your valuables out of sight.
    </ThemedText>
    <TouchableOpacity style={styles.safetyButton}>
      <ThemedText style={styles.buttonText}>Safety Tips</ThemedText>
    </TouchableOpacity>
  </View>
);

// Recent Incidents Component
const RecentIncidents = () => {
  const data = [
    { id: '1', type: 'Robbery', desc: 'Victim got holdap for wallet and phone', time: '32 minutes ago' },
    { id: '2', type: 'Assault', desc: 'Victim was attacked near the park', time: '1 hour ago' },
    { id: '3', type: 'Theft', desc: 'Bike stolen from parking lot', time: '2 hours ago' },
    { id: '4', type: 'Robbery', desc: 'Victim got holdap for wallet and phone', time: '3 hours ago' },
    { id: '5', type: 'Burglary', desc: 'House break-in reported', time: 'Yesterday' },
  ];

  return (
    <View style={styles.incidentsContainer}>
      <ThemedHeader style={styles.incidentsTitle}>Recent Incidents</ThemedHeader>
      {data.map((item) => (
        <Divboxwhite key={item.id} style={styles.incidentItem}>
          <ThemedText style={styles.incidentType}>{item.type}</ThemedText>
          <ThemedText style={styles.incidentDesc}>{item.desc}</ThemedText>
          <ThemedText style={styles.incidentTime}>{item.time}</ThemedText>
        </Divboxwhite>
      ))}
      <TouchableOpacity style={styles.viewMoreButton}>
        <ThemedText style={styles.viewMoreText}>View More Incidents</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const UserHome = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Divboxwhite>
          <ThemedHeader style={{marginBottom: 10}}>Dashboard</ThemedHeader>
          <MapView />
          <CautionBox />


        </Divboxwhite>

        <Divboxwhite style={{marginTop: 10}}>
        <RecentIncidents />

        </Divboxwhite>

      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 5,
    paddingBottom: 20, // Reduced padding since no BottomNavBar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#294880',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  // MapView styles
  mapContainer: {
    backgroundColor: '#f0f0f0',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapText: {
    fontSize: 16,
    color: '#666',
  },
  // CautionBox styles
  cautionBox: {
    backgroundColor: '#ffebee',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#f44336',
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  safetyButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // RecentIncidents styles
  incidentsContainer: {
    marginVertical: 10,
  },
  incidentsTitle: {
    marginBottom: 15,
  },
  incidentItem: {
    marginBottom: 10,
  },
  incidentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 5,
  },
  incidentDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 18,
  },
  incidentTime: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  viewMoreButton: {
    backgroundColor: '#294880',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserHome;