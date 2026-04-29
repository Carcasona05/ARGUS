import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
} from "react-native";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../../components/BottomNavBar";

const ARGUS_BLUE = "#294880";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const isChildScreen =
    pathname.includes("User_RepPostView") ||
    pathname.includes("MyUser_RepPostView") ||
    pathname.includes("User_ProfileSettings");

  const showBottomNav = !isChildScreen;

  const getScreenTitle = () => {
    if (pathname.includes("User_ProfileSettings")) return "Account Settings";
    if (pathname.includes("User_RepPostView")) return "Post Details";
    if (pathname.includes("MyUser_RepPostView")) return "My Report";

    if (pathname.includes("User_Home")) return "Home";
    if (pathname.includes("User_Map")) return "Map";
    if (pathname.includes("User_MyReports")) return "My Reports";
    if (pathname.includes("User_Settings")) return "Settings";
    if (pathname.includes("User_PostReport")) return "Post Report";
    if (pathname.includes("User_Notification")) return "Notifications";

    return "ARGUS";
  };

  const handleNotification = () => {
    router.push("/User_Notification");
  };

  const Header = () => {
    const title = getScreenTitle();

    if (isChildScreen) {
      return (
        <View style={styles.childHeader}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={ARGUS_BLUE} />
          </TouchableOpacity>

          <View style={styles.childTitleWrap}>
            <Text numberOfLines={1} style={styles.childTitle}>
              {title}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.75}
            onPress={handleNotification}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={ARGUS_BLUE}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.majorHeader}>
        <View style={styles.majorTitleWrap}>
          <Text style={styles.majorTitle}>{title}</Text>

          <View style={styles.breadcrumbRow}>
            <Text style={styles.breadcrumbText}>ARGUS</Text>
            <Ionicons name="chevron-forward" size={13} color="#8A98AD" />
            <Text style={styles.breadcrumbCurrent}>{title}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.75}
          onPress={handleNotification}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={ARGUS_BLUE}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.root, isDark && styles.darkRoot]}>
      <Header />

      <View style={styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              display: "none",
            },
          }}
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
            name="User_MyReports"
            options={{
              title: "My Reports",
            }}
          />

          <Tabs.Screen
            name="User_Settings"
            options={{
              title: "Settings",
            }}
          />

          <Tabs.Screen
            name="User_ProfileSettings"
            options={{
              title: "Account Settings",
            }}
          />

          <Tabs.Screen
            name="User_RepPostView"
            options={{
              title: "Post Details",
            }}
          />

          <Tabs.Screen
            name="MyUser_RepPostView"
            options={{
              title: "My Report",
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
        </Tabs>
      </View>

      {showBottomNav && <BottomNavBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  darkRoot: {
    backgroundColor: "#F3F6FB",
  },

  content: {
    flex: 1,
  },

  majorHeader: {
    paddingTop: Platform.OS === "ios" ? 58 : 40,
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: "#F3F6FB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  majorTitleWrap: {
    flex: 1,
    marginRight: 12,
  },

  majorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: ARGUS_BLUE,
    letterSpacing: 0.2,
  },

  breadcrumbRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  breadcrumbText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8A98AD",
    marginRight: 4,
  },

  breadcrumbCurrent: {
    fontSize: 12,
    fontWeight: "700",
    color: ARGUS_BLUE,
    marginLeft: 4,
  },

  childHeader: {
    paddingTop: Platform.OS === "ios" ? 58 : 40,
    paddingHorizontal: 14,
    paddingBottom: 14,
    backgroundColor: "#F3F6FB",
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F2",
    shadowColor: "#8AA9E6",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },

  childTitleWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  childTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: ARGUS_BLUE,
    textAlign: "center",
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F2",
    shadowColor: "#8AA9E6",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
});