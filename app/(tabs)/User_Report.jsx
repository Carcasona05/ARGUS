import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Divboxwhite from '../../components/Divboxwhite';
import ThemedHeader from '../../components/ThemedHeader';

const UserReport = () => {
  const [filter, setFilter] = useState('All Reports');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const reports = [
    {
      id: '1',
      crimeType: 'Robbery',
      location: 'Mabini St.',
      time: '15 minutes ago',
      status: 'In Review',
      description: 'Victim attacked for wallet and phone',
      comments: 23,
    },
    {
      id: '2',
      crimeType: 'Suspicious Activity',
      location: 'Arroyo Blvd. & Perez Rd.',
      time: '1 hour ago',
      status: 'Verified',
      description: 'Suspicious person loitering',
      comments: 15,
    },
    {
      id: '3',
      crimeType: 'Car Theft',
      location: 'Central Ave.',
      time: '2 hours ago',
      status: 'In Review',
      description: 'Car stolen from parking lot',
      comments: 8,
    },
    {
      id: '4',
      crimeType: 'Assault',
      location: 'Rizal Park',
      time: '3 hours ago',
      status: 'Verified',
      description: 'Physical altercation reported',
      comments: 12,
    },
  ];

  const renderReport = ({ item }) => (
    <View style={styles.reportItem}>
      <ThemedText style={styles.crimeType}>{item.crimeType}</ThemedText>
      <View style={styles.locationRow}>
        <Ionicons name="location" size={16} color="#294880" />
        <ThemedText style={styles.location}>{item.location}</ThemedText>
      </View>
      <ThemedText style={styles.time}>{item.time}</ThemedText>
      <View style={[styles.statusBadge, item.status === 'Verified' ? styles.verified : styles.inReview]}>
        <ThemedText style={styles.statusText}>{item.status}</ThemedText>
      </View>
      <ThemedText style={styles.description}>{item.description}</ThemedText>
      <ThemedText style={styles.comments}>{item.comments} comments</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Top Header */}
      <Divboxwhite  style={{ width: '97%' }}>
        <View style={styles.rowContainer}>
          <ThemedHeader style={{ marginBottom: 10 }}>Reports</ThemedHeader>
          
          {/* New Report Button */}
          <TouchableOpacity style={styles.newReportButton}>
            <ThemedText style={styles.newReportText}>+ New Report</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Reports Section */}
      <View style={styles.reportsSection}>
        <TouchableOpacity style={styles.filterDropdown} onPress={() => setShowFilterDropdown(!showFilterDropdown)}>
          <ThemedText>{filter}</ThemedText>
          <Ionicons name="chevron-down" size={16} color="#294880" />
        </TouchableOpacity>
        {showFilterDropdown && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity onPress={() => { setFilter('All Reports'); setShowFilterDropdown(false); }}>
              <ThemedText>All Reports</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFilter('My Reports'); setShowFilterDropdown(false); }}>
              <ThemedText>My Reports</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setFilter('Saved Reports'); setShowFilterDropdown(false); }}>
              <ThemedText>Saved Reports</ThemedText>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.applyButton}>
            <ThemedText style={styles.buttonText}>Apply Filters</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton}>
            <ThemedText style={styles.buttonText}>Clear Filters</ThemedText>
          </TouchableOpacity>
        </View>
      </View>


      </Divboxwhite >

      

      {/* Report List */}
      <FlatList
        data={reports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        style={styles.reportList}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row', // Align header and button horizontally
    justifyContent: 'space-between', // Space between the header and the button
    alignItems: 'center', // Center the items vertically
    padding: 15,
  },
  newReportButton: {
    backgroundColor: '#4A7BD8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newReportText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportsSection: {
    padding: 10,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownOptions: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportList: {
    flex: 1,
  },
  listContent: {
    padding: 15,
    paddingBottom: 20,
  },
  reportItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  crimeType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#294880',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  location: {
    marginLeft: 5,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  verified: {
    backgroundColor: '#4CAF50',
  },
  inReview: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  description: {
    marginBottom: 5,
  },
  comments: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserReport;