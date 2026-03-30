import { Tabs } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Color';
import NotificationIcon from '../../components/icons/NotificationIcon';
import BottomNavBar from '../../components/BottomNavBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
          tabBarStyle: {
            display: 'none', // Hide the built-in tab bar
          },
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerTintColor: theme.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <NotificationIcon size={28} color={theme.iconColorFocused} badge />
            </TouchableOpacity>
          ),
        }}
      >
      <Tabs.Screen
        name="User_Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <NotificationIcon size={28} color={theme.iconColorFocused} badge />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="User_Map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="User_Report"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="User_Tips"
        options={{
          title: 'Tips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="User_Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="User_ProfileSettings"
        options={{
          title: 'Personal Information',
          headerShown: false,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="User_Password&Security"
        options={{
          title: 'Password & Security',
          headerShown: false,
          tabBarButton: () => null, // Hide from tab bar
        }}
      />
      </Tabs>
      <BottomNavBar />
    </View>
  );
}