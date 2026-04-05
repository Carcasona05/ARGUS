import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Divboxwhite from '../../components/Divboxwhite';
import ThemedHeader from '../../components/ThemedHeader';
import BottomNavBar from '../../components/BottomNavBar';
import ReportItem from '../../components/ReportItem';
import Colors from '../../constants/Color';
import { useColorScheme } from 'react-native';

const UserProfileSettings = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const [activeFilter, setActiveFilter] = useState('All');
  const [editMode, setEditMode] = useState(false);
  const [editableDetails, setEditableDetails] = useState({
    username: 'Mika',
    location: 'Langtad, Argao, Cebu',
    email: 'mika@gmail.com',
  });
  const [tempDetails, setTempDetails] = useState({ ...editableDetails });

  const handleEdit = () => {
    setTempDetails({ ...editableDetails });
    setEditMode(true);
  };

  const handleSave = () => {
    setEditableDetails({ ...tempDetails });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const updateTempDetail = (key, value) => {
    setTempDetails({ ...tempDetails, [key]: value });
  };

  const userDetails = {
    ...editableDetails,
    credibilityScore: '20 pts',
  };

  const posts = [
    {
      id: '1',
      crimeType: 'Robbery',
      location: 'Langtad Str...',
      time: '30 mins ago',
      status: 'In Review',
      description: 'Victim got holdap for wallet and phone',
      likes: 12,
      comments: 5,
    },
    {
      id: '2',
      crimeType: 'Suspicious Activity',
      location: 'Arroyo Blvd...',
      time: '1 hour ago',
      status: 'Verified',
      description: 'Suspicious person loitering',
      likes: 8,
      comments: 3,
    },
  ];

  const filteredPosts = activeFilter === 'All' ? posts : posts.filter(post => post.status === activeFilter);

  return (
    <ThemedView style={styles.container}>
      {/* Top App Bar */}
      <View style={[styles.topBar, { backgroundColor: theme.navBackground }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.iconColorFocused} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Personal Information</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Details Card */}
        <Divboxwhite style={styles.detailsCard}>
          <View style={styles.cardHeader}>
            <ThemedHeader style={styles.cardTitle}>Details</ThemedHeader>
            {editMode ? (
              <View style={styles.editButtons}>
                <TouchableOpacity onPress={handleCancel}>
                  <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <ThemedText style={styles.saveText}>Save</ThemedText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={handleEdit}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Username</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.username}
                onChangeText={(value) => updateTempDetail('username', value)}
              />
            ) : (
              <ThemedText style={styles.value}>{userDetails.username}</ThemedText>
            )}
          </View>
          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Current Location</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.location}
                onChangeText={(value) => updateTempDetail('location', value)}
              />
            ) : (
              <ThemedText style={styles.value}>{userDetails.location}</ThemedText>
            )}
          </View>
          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Email</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.email}
                onChangeText={(value) => updateTempDetail('email', value)}
                keyboardType="email-address"
              />
            ) : (
              <ThemedText style={styles.value}>{userDetails.email}</ThemedText>
            )}
          </View>
          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Credibility Score</ThemedText>
            <ThemedText style={styles.value}>{userDetails.credibilityScore}</ThemedText>
          </View>
        </Divboxwhite>

        {/* Posts Section Header */}
        <View style={styles.postsHeader}>
          <ThemedHeader style={styles.postsTitle}>Posts</ThemedHeader>
          <View style={styles.filters}>
            <TouchableOpacity
              style={[styles.filterPill, activeFilter === 'Verified' && styles.activeFilter, { backgroundColor: activeFilter === 'Verified' ? '#d4edda' : '#f8f9fa' }]}
              onPress={() => setActiveFilter(activeFilter === 'Verified' ? 'All' : 'Verified')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'Verified' && { color: '#155724' }]}>Verified (2)</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterPill, activeFilter === 'In Review' && styles.activeFilter, { backgroundColor: activeFilter === 'In Review' ? '#f8d7da' : '#f8f9fa' }]}
              onPress={() => setActiveFilter(activeFilter === 'In Review' ? 'All' : 'In Review')}
            >
              <ThemedText style={[styles.filterText, activeFilter === 'In Review' && { color: '#721c24' }]}>In Review (2)</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post Cards List */}
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReportItem
              location={item.location}
              incidentType={item.crimeType}
              status={item.status}
              description={item.description}
              timeAgo={item.time}
              likes={item.likes}
              comments={item.comments}
            />
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
    top: 8,
  },
  title: {
    flex: 1,
    top: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#294880',
  },
  placeholder: {
    width: 34, // To balance the back button
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  detailsCard: {
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
  },
  editButtons: {
    flexDirection: 'row',
  },
  cancelText: {
    color: '#6c757d',
    fontSize: 16,
    marginRight: 15,
  },
  saveText: {
    color: '#007bff',
    fontSize: 16,
  },
  editText: {
    color: '#007bff',
    fontSize: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
  input: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    paddingVertical: 2,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  postsTitle: {
    fontSize: 18,
  },
  filters: {
    flexDirection: 'row',
  },
  filterPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  activeFilter: {
    borderWidth: 1,
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default UserProfileSettings;