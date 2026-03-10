import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useRouter } from 'expo-router'

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ARGUS</Text>
        <Text style={styles.subtitle}>Incident Mapping & Risk Awareness System</Text>
      </View>
      {showLogin ? (
        <Login onSignUp={() => setShowLogin(false)} />
      ) : (
        <Register onSignIn={() => setShowLogin(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
})
