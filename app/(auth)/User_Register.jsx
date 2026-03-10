import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

export default function Register() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Register</ThemedText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color="#007bff" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Name" />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#007bff" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email Address" />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#007bff" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.replace('/(tabs)/User_Home')}>
          <ThemedText style={styles.registerText}>Register</ThemedText>
        </TouchableOpacity>
        <View style={styles.signinContainer}>
          <ThemedText style={styles.signinText}>Already have an account?</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/User_Login')}>
            <ThemedText style={styles.signinLink}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signinText: {
    color: '#333',
    marginRight: 4,
  },
  signinLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
