import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import ThemedHeader from '../components/ThemedHeader';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

const UserPostReport = () => {
  const router = useRouter();
  const [username, setUsername] = useState('John Doe'); // TODO: Get from user context
  const [location, setLocation] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [detailedReport, setDetailedReport] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission denied');
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(`${locationData.coords.latitude}, ${locationData.coords.longitude}`);
    })();
  }, []);

  const handlePost = () => {
    // TODO: Submit the report
    router.push('/(tabs)/User_Home');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/User_Report')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#294880" />
        </TouchableOpacity>
        <ThemedHeader style={styles.headerTitle}>Post New Report</ThemedHeader>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Username</ThemedText>
            <TextInput
              style={styles.input}
              value={username}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Current Location</ThemedText>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Fetching location..."
            />
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Incident Type</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={incidentType}
                onValueChange={(itemValue) => setIncidentType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Incident Type" value="" />
                <Picker.Item label="Robbery" value="Robbery" />
                <Picker.Item label="Assault" value="Assault" />
                <Picker.Item label="Car Theft" value="Car Theft" />
                <Picker.Item label="Suspicious Activity" value="Suspicious Activity" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <ThemedText style={styles.label}>Detailed Report</ThemedText>
            <TextInput
              style={styles.textArea}
              value={detailedReport}
              onChangeText={setDetailedReport}
              placeholder="Describe the incident in detail..."
              multiline
              numberOfLines={6}
            />
          </View>

          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <ThemedText style={styles.postButtonText}>Post Report</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 30, // To center since back button takes space
  },
  headerSpacer: {
    width: 30,
  },
  scrollContainer: {
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#294880',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserPostReport;