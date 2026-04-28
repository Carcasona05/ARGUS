import { Tabs, useRouter } from "expo-router";
import {
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Color";
import BottomNavBar from "../../components/BottomNavBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();

  const getScreenTitle = (routeName) => {
    switch (routeName) {
      case "User_Home":
        return "ARGUS";
      case "User_Map":
        return "Map";
      case "User_PostReport":
        return "Post Report";
      case "User_Notification":
        return "Notifications";
      case "User_Profile":
        return "My Reports";
      case "User_ProfileSettings":
        return "Personal Information";
      case "User_Settings":
        return "Settings";
      default:
        return "ARGUS";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: "none",
          },
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Text style={styles.headerTitleText}>
                {getScreenTitle(route.name)}
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/User_Settings")}
              activeOpacity={0.8}
            >
              <Ionicons name="settings-outline" size={28} color="#294880" />
            </TouchableOpacity>
          ),
        })}
      >
        <Tabs.Screen
          name="User_Home"
          options={{
            title: "Home",
          }}
        />

        <Tabs.Screen
          name="User_Map"
          options={{
            title: "Map",
          }}
        />

        <Tabs.Screen
          name="User_PostReport"
          options={{
            title: "Post Report",
          }}
        />

        <Tabs.Screen
          name="User_Notification"
          options={{
            title: "Notifications",
          }}
        />

        <Tabs.Screen
          name="User_Profile"
          options={{
            title: "Profile",
          }}
        />

        <Tabs.Screen
          name="User_ProfileSettings"
          options={{
            title: "Personal Information",
            tabBarButton: () => null,
          }}
        />

        <Tabs.Screen
          name="User_Settings"
          options={{
            title: "Settings",
            tabBarButton: () => null,
          }}
        />
      </Tabs>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 15,
    justifyContent: "center",
  },

  headerTitleText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 6,
  },

  profileButton: {
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
