import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Divboxwhite from '../../components/Divboxwhite';
import ThemedHeader from '../../components/ThemedHeader';
import ReportItem from '../../components/ReportItem'; // Import the ReportItem component

const UserReport = () => {
  const router = useRouter();
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
    <ReportItem 
      location={item.location}
      incidentType={item.crimeType}
      status={item.status}
      description={item.description}
      timeAgo={item.time}
      likes={item.comments} // Assuming likes are the same as comments for now
      comments={item.comments}
    />
  );

  return (
    <ThemedView style={styles.container}>
      {/* Top Header */}
      <Divboxwhite style={{ width: '97%' }}>
        <View style={styles.rowContainer}>
          <ThemedHeader style={{ marginBottom: 10 }}>Reports</ThemedHeader>

          {/* New Report Button */}
          <TouchableOpacity style={styles.newReportButton} onPress={() => router.push('/User_PostReport')}>
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
        </View>
      </Divboxwhite>

      {/* Reports List */}
      <FlatList
        data={reports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newReportButton: {
    backgroundColor: '#294880',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  newReportText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportsSection: {
    marginTop: 10,
  },
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdownOptions: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  listContainer: {
    paddingBottom: 100, // Space for bottom nav
  },
});

export default UserReport;