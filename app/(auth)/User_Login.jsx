import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

export default function Login() {

  const handleLogin = () => {
    // TODO: Add actual authentication logic here
    // For now, just navigate to home
    router.replace('/(tabs)/User_Home');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Login</ThemedText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#007bff" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Email Address" />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#007bff" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>
        <TouchableOpacity>
          <ThemedText style={styles.forgot}>Forgot Password?</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginText}>Login</ThemedText>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <ThemedText style={styles.signupText}>Don't have an account?</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/User_Register')}>
            <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
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
  forgot: {
    color: '#007bff',
    textAlign: 'right',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#333',
    marginRight: 4,
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
