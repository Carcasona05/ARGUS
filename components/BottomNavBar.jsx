import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 360;

  const navWidth = Math.min(width - 24, 420);
  const navHeight = isSmallScreen ? 68 : 74;
  const plusSize = isSmallScreen ? 56 : 62;
  const plusBorder = isSmallScreen ? 5 : 6;
  const iconSize = isSmallScreen ? 22 : 24;
  const plusIconSize = isSmallScreen ? 30 : 34;
  const labelSize = isSmallScreen ? 9 : 10;

  const leftTabs = [
    { name: "HOME", route: "/User_Home", icon: "home" },
    { name: "MAPS", route: "/User_Map", icon: "location" },
  ];

  const rightTabs = [
    {
      name: "NOTIFICATION",
      route: "/User_Notification",
      icon: "notifications",
    },
    { name: "PROFILE", route: "/User_Profile", icon: "person" },
  ];

  const isActiveRoute = (route) => {
    if (route === "/User_Profile") {
      return (
        pathname === "/User_Profile" || pathname === "/User_ProfileSettings"
      );
    }

    return pathname === route || pathname.startsWith(route + "/");
  };

  const renderTab = (tab) => {
    const isActive = isActiveRoute(tab.route);

    return (
      <TouchableOpacity
        key={tab.name}
        style={styles.tab}
        activeOpacity={0.8}
        onPress={() => router.push(tab.route)}
      >
        <Ionicons
          name={isActive ? tab.icon : `${tab.icon}-outline`}
          size={iconSize}
          color={isActive ? "#294880" : "#3F4860"}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            {
              fontSize: labelSize,
              color: isActive ? "#294880" : "#3F4860",
            },
          ]}
        >
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          bottom: insets.bottom > 0 ? insets.bottom + 6 : 14,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            width: navWidth,
            height: navHeight,
            borderRadius: navHeight / 2,
          },
        ]}
      >
        <View style={styles.sideGroup}>{leftTabs.map(renderTab)}</View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/User_PostReport")}
          style={[
            styles.plusButton,
            {
              width: plusSize,
              height: plusSize,
              borderRadius: plusSize / 2,
              borderWidth: plusBorder,
              top: -(plusSize * 0.32),
              marginLeft: -(plusSize / 2),
            },
          ]}
        >
          <Ionicons name="add" size={plusIconSize} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.sideGroup}>{rightTabs.map(renderTab)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },

  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    position: "relative",
    shadowColor: "#8AA9E6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },

  sideGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  label: {
    marginTop: 4,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  plusButton: {
    position: "absolute",
    left: "53%",
    backgroundColor: "#294880",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFFFFF",
    shadowColor: "#8AA9E6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default BottomNavBar;
