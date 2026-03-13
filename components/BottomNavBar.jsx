import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import Colors from '../constants/Color';
import { useColorScheme } from 'react-native';

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const tabs = [
    { name: 'Home', route: '/User_Home', icon: 'home' },
    { name: 'Map', route: '/User_Map', icon: 'map' },
    { name: 'Reports', route: '/User_Report', icon: 'add-circle' },
    { name: 'Tips', route: '/User_Tips', icon: 'bulb' },
    { name: 'Settings', route: '/User_Settings', icon: 'settings' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.navBackground, borderTopColor: theme.uiBackground }]}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route || (pathname === '/' && tab.route === '/User_Home');
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? theme.iconColorFocused : theme.iconColor}
            />
            <Text
              style={[styles.label, { color: isActive ? theme.iconColorFocused : theme.iconColor }]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 85,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Safe area
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default BottomNavBar;