import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

const UserTips = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const categories = [
    'Personal Safety Tips',
    'Walking Alone At Night',
    'Commute Protection',
    'Home and Property Security',
  ];

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const callEmergency = () => {
    Linking.openURL('tel:911');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <ThemedText style={styles.headerTitle}>Safety Tips</ThemedText>

        {/* New Safety Tip Section */}
        <View style={styles.newTipSection}>
          <Ionicons name="bulb" size={24} color="#000" />
          <ThemedText style={styles.newTipTitle}>Be Aware of Your Surroundings</ThemedText>
          <ThemedText style={styles.newTipDescription}>
            Stay alert and avoid distractions, especially while walking outside at night.
          </ThemedText>
          <TouchableOpacity style={styles.readMoreButton}>
            <ThemedText style={styles.readMoreText}>Read More</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Safety Tip Categories */}
        <View style={styles.categoriesSection}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => toggleTip(index)}>
              <Ionicons name="location" size={20} color="#294880" />
              <ThemedText style={styles.categoryText}>{category}</ThemedText>
              <Ionicons name={expandedTip === index ? "chevron-up" : "chevron-down"} size={20} color="#294880" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Numbers Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton} onPress={callEmergency}>
            <Ionicons name="call" size={20} color="#fff" />
            <ThemedText style={styles.emergencyText}>Call 911 Emergency</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.policeContact}>Nearby Police: XXXX-XXX-XXXX</ThemedText>
        </View>
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
    padding: 20,
    paddingBottom: 20, // Reduced padding since no BottomNavBar
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#294880',
    textAlign: 'center',
    marginBottom: 20,
  },
  newTipSection: {
    backgroundColor: '#FFFF00', // Yellow background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  newTipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  newTipDescription: {
    textAlign: 'center',
    marginBottom: 10,
  },
  readMoreButton: {
    backgroundColor: '#294880',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  categoryText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  emergencySection: {
    alignItems: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000', // Red button
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  policeContact: {
    fontSize: 16,
    color: '#666',
  },
});

export default UserTips;