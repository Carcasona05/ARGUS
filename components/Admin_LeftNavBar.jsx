import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Admin_LeftNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      route: "/(admin)/Admin_Dashboard",
      icon: <Feather name="grid" size={22} color={pathname === "/(admin)/Admin_Dashboard" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Incident Map",
      route: "/(admin)/Admin_Map",
      icon: <Ionicons name="location-outline" size={22} color={pathname === "/(admin)/Admin_Map" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Analytics",
      route: "/(admin)/Admin_Analytics",
      icon: <Ionicons name="bar-chart-outline" size={22} color={pathname === "/(admin)/Admin_Analytics" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Validation",
      route: "/(admin)/Admin_Validation",
      icon: <Ionicons name="shield-checkmark-outline" size={22} color={pathname === "/(admin)/Admin_Validation" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Reports",
      route: "/(admin)/Admin_Reports",
      icon: <MaterialIcons name="description" size={22} color={pathname === "/(admin)/Admin_Reports" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Settings",
      route: "/(admin)/Admin_Settings",
      icon: <Ionicons name="settings-outline" size={22} color={pathname === "/(admin)/Admin_Settings" ? "#1D4ED8" : "#4A5A7A"} />,
    },
    {
      label: "Logs",
      route: "/(admin)/Admin_Logs",
      icon: <Ionicons name="list-outline" size={22} color={pathname === "/(admin)/Admin_Logs" ? "#1D4ED8" : "#4A5A7A"} />,
    },
  ];

  const isActive = (route) => pathname === route;

  return (
    <View style={styles.sidebar}>
      <View style={styles.logoWrap}>
        {/* Replace with your real logo if you want */}
        <View style={styles.logoIcon}>
          <Text style={styles.logoIconText}>A</Text>
        </View>
        <Text style={styles.logoText}>ARGUS</Text>
      </View>

      <View style={styles.navList}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            style={[styles.navItem, isActive(item.route) && styles.activeNavItem]}
          >
            <View style={styles.iconWrap}>{item.icon}</View>
            <Text style={[styles.navText, isActive(item.route) && styles.activeNavText]}>
              {item.label}
            </Text>

            {isActive(item.route) && <View style={styles.activeBar} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = {
  sidebar: {
    width: 235,
    minHeight: "100vh",
    backgroundColor: "#F3F6FB",
    borderRightWidth: 1,
    borderRightColor: "#D9E2F0",
    paddingTop: 24,
    paddingBottom: 24,
  },

  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    marginBottom: 34,
  },

  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoIconText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  logoText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#294880",
    letterSpacing: 0.5,
  },

  navList: {
    gap: 6,
  },

  navItem: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    paddingHorizontal: 28,
    overflow: "hidden",
  },

  activeNavItem: {
    backgroundColor: "#E8EFFB",
  },

  iconWrap: {
    width: 28,
    alignItems: "center",
    marginRight: 14,
  },

  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A5A7A",
  },

  activeNavText: {
    color: "#294880",
    fontWeight: "700",
  },

  activeBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: "#3B82F6",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
};