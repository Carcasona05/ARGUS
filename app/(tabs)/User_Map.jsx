import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import MapView from '../../components/MapView';
import Divboxwhite from '../../components/Divboxwhite';
import ThemedHeader from '../../components/ThemedHeader';

const UserMap = () => {
  const [searchText, setSearchText] = useState('');
  const [crimeType, setCrimeType] = useState('All');
  const [timeRange, setTimeRange] = useState('Last 24 Hours');

  return (

    
    <ThemedView style={styles.container}>
      {/* Top Header Section */}

       <Divboxwhite>
          <ThemedHeader style={{marginBottom: 10}}>Map</ThemedHeader>
          <MapView style={{ width: '100%', height: 600 }} />
        </Divboxwhite>

      <View style={styles.header}>
        <ThemedText style={styles.appTitle}>SafeZone</ThemedText>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Here..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setCrimeType('All')}>
            <ThemedText>Crime Types: {crimeType}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setTimeRange('Last Week')}>
            <ThemedText>Time Range: {timeRange}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapSection}>
        <MapView />
      </View>

      {/* Recent Incidents Section */}
      <View style={styles.incidentsSection}>
        <ThemedText style={styles.incidentsTitle}>Recent Incidents: 20</ThemedText>
        <View style={styles.incidentsBreakdown}>
          <ThemedText>Robbery: 5</ThemedText>
          <ThemedText>Car Theft: 7</ThemedText>
          <ThemedText>Accidents: 8</ThemedText>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button}>
            <ThemedText>Locate Me</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <ThemedText>Safety Tips</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#294880',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  mapSection: {
    flex: 1,
  },
  incidentsSection: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  incidentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incidentsBreakdown: {
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: '#294880',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UserMap;