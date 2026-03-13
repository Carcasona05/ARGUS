import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationIcon = ({
  size = 28,
  color = '#333',
  badge = false,
  iconName = 'notifications',
}) => (
  <View style={[styles.container, { width: size, height: size }]}> 
    <Ionicons name={iconName} size={size} color={color} />
    {badge && <View style={styles.badge} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default NotificationIcon;
