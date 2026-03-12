import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';

const MapView = () => (
  <View style={styles.mapContainer}>
    <ThemedText>Map with Risk Zones Here</ThemedText>
    {/* Implement actual map rendering */}
  </View>
);

const styles = StyleSheet.create({
  mapContainer: {
    height: 500,  
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapView;