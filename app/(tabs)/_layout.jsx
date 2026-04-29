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
        return "Home";

      case "User_Map":
        return "Map";

      case "User_Profile":
        return "My Reports";

      case "User_Settings":
        return "Settings";

      case "User_PostReport":
        return "Post Report";

      case "User_Notification":
        return "Notifications";

      case "User_ProfileSettings":
        return "Personal Information";

      default:
        return "ARGUS";
    }
  };

  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: "none",
          },

          headerStyle: {
            backgroundColor: theme.navBackground || "#F3F6FB",
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
              style={styles.notificationButton}
              onPress={() => router.push("/User_Notification")}
              activeOpacity={0.8}
            >
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#294880"
              />

              <View style={styles.notificationDot} />
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
            tabBarButton: () => null,
          }}
        />

        <Tabs.Screen
          name="User_Notification"
          options={{
            title: "Notifications",
            tabBarButton: () => null,
          }}
        />

        <Tabs.Screen
          name="User_Profile"
          options={{
            title: "My Reports",
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
          }}
        />
      </Tabs>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  headerLeftContainer: {
    marginLeft: 16,
    justifyContent: "center",
  },

  headerTitleText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#294880",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F2",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});