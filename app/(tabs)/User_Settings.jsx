import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

const UserSettings = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>User Settings</ThemedText>
      <ThemedText style={styles.subtitle}>Customize your app preferences!</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
});

export default UserSettings;