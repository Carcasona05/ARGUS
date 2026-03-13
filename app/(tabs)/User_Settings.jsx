import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // For navigation
import ThemedHeader from '../../components/ThemedHeader';
import Divboxwhite from '../../components/Divboxwhite';

const UserSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    // Navigate to the User_Login screen (adjust to your route)
    router.push('../(auth)/User_Login');
  };

  const toggleSwitch = () => setNotifications((previousState) => !previousState);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <Divboxwhite width="98%" style={styles.divBox}>
          <ThemedHeader>Settings</ThemedHeader>
        </Divboxwhite>

        {/* Settings List Section */}
        <Divboxwhite width="98%" style={styles.divBox}>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.item}>
              <Ionicons name="location" size={24} color="#FFCC00" />
              <ThemedText style={styles.itemText}>Personal Information</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#294880" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Ionicons name="notifications" size={24} color="#FFCC00" />
              <ThemedText style={styles.itemText}>Notifications</ThemedText>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notifications ? '#294880' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={notifications}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Ionicons name="alert-circle" size={24} color="#FFCC00" />
              <ThemedText style={styles.itemText}>Crime Alert Settings</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#294880" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Ionicons name="lock-closed" size={24} color="#FFCC00" />
              <ThemedText style={styles.itemText}>Privacy & Security</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#294880" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Ionicons name="help-circle" size={24} color="#FFCC00" />
              <ThemedText style={styles.itemText}>Help & Support</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#294880" />
            </TouchableOpacity>
          </View>
        </Divboxwhite>

        {/* Logout Button Section */}
        <Divboxwhite width="98%" style={styles.divBox}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </Divboxwhite>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* You can add the bottom navigation here if needed */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7ECFF', // Background color for the container
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 10,
  },
  divBox: {
    marginBottom: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#294880',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#294880',
  },
  settingsList: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#294880',
    flex: 1,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#FF5A5F',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default UserSettings;