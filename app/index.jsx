import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/C_Login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ARGUS</Text>
        <Text style={styles.subtitle}>Incident Mapping & Risk Awareness System</Text>
      </View>
    </View>
  )
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
