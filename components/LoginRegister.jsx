import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginRegister() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showLogin && styles.activeButton]}
          onPress={() => setShowLogin(true)}
        >
          <Text style={styles.toggleText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showLogin && styles.activeButton]}
          onPress={() => setShowLogin(false)}
        >
          <Text style={styles.toggleText}>Register</Text>
        </TouchableOpacity>
      </View>
      {showLogin ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login</Text>
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Register</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 320,
    alignSelf: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    color: '#333',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007bff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
