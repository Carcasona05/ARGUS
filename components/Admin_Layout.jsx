import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Admin_Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      route: "/(admin)/Admin_Dashboard",
      icon: "grid",
      iconType: "Feather",
    },
    {
      label: "Incident Map",
      route: "/(admin)/Admin_Map",
      icon: "location-outline",
      iconType: "Ionicons",
    },
    {
      label: "Analytics",
      route: "/(admin)/Admin_Analytics",
      icon: "bar-chart-outline",
      iconType: "Ionicons",
    },
    {
      label: "Validation",
      route: "/(admin)/Admin_Validation",
      icon: "shield-checkmark-outline",
      iconType: "Ionicons",
    },
    {
      label: "Reports",
      route: "/(admin)/Admin_Reports",
      icon: "description",
      iconType: "MaterialIcons",
    },
    {
      label: "Settings",
      route: "/(admin)/Admin_Settings",
      icon: "settings-outline",
      iconType: "Ionicons",
    },
    {
      label: "Logs",
      route: "/(admin)/Admin_Logs",
      icon: "list-outline",
      iconType: "Ionicons",
    },
  ];

  const getIcon = (item, isActive) => {
    const color = isActive ? "#2563EB" : "#4B5D7A";

    if (item.iconType === "Feather") {
      return <Feather name={item.icon} size={22} color={color} />;
    }

    if (item.iconType === "MaterialIcons") {
      return <MaterialIcons name={item.icon} size={22} color={color} />;
    }

    return <Ionicons name={item.icon} size={22} color={color} />;
  };

  const getCurrentPageName = () => {
    const found = navItems.find((item) => item.route === pathname);
    return found ? found.label : "Admin";
  };

  const getPageDescription = () => {
    switch (pathname) {
      case "/(admin)/Admin_Dashboard":
        return "Overview of incidents, hotspots, and system health";
      case "/(admin)/Admin_Map":
        return "Monitor incidents and geographic activity across the city";
      case "/(admin)/Admin_Analytics":
        return "View trends, metrics, and incident intelligence";
      case "/(admin)/Admin_Validation":
        return "Validate reports and assess AI credibility results";
      case "/(admin)/Admin_Reports":
        return "Manage submitted reports and generated summaries";
      case "/(admin)/Admin_Settings":
        return "Configure admin preferences and system behavior";
      case "/(admin)/Admin_Logs":
        return "Track system logs and recent admin activities";
      default:
        return "Admin panel";
    }
  };

  return (
    <View style={styles.container}>
      {/* LEFT SIDEBAR */}
      <View style={styles.sidebar}>
        <View style={styles.logoSection}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>A</Text>
          </View>
          <Text style={styles.logoText}>ARGUS</Text>
        </View>

        <View style={styles.navList}>
          {navItems.map((item, index) => {
            const isActive = pathname === item.route;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.navItem, isActive && styles.activeNavItem]}
                onPress={() => router.push(item.route)}
              >
                {isActive && <View style={styles.activeBar} />}
                <View style={styles.navIcon}>{getIcon(item, isActive)}</View>
                <Text style={[styles.navText, isActive && styles.activeNavText]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* RIGHT CONTENT */}
      <View style={styles.mainContent}>
        {/* TOP HEADER / BREADCRUMB AREA */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.breadcrumb}>
              ARGUS Admin Dashboard:{" "}
              <Text style={styles.breadcrumbHighlight}>{getCurrentPageName()}</Text>
            </Text>
            <Text style={styles.pageDesc}>{getPageDescription()}</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#7A8CAA" />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#7A8CAA"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#294880" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileSection}>
              <View style={styles.avatar} />
              <Text style={styles.profileText}>Admin: R. Ramos</Text>
              <Ionicons name="chevron-down-outline" size={18} color="#4B5D7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PAGE CONTENT */}
        <View style={styles.pageContent}>{children}</View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8FAFD",
  },

  sidebar: {
    width: 235,
    minHeight: "100vh",
    backgroundColor: "#F3F6FB",
    borderRightWidth: 1,
    borderRightColor: "#D9E2F0",
    paddingTop: 24,
    paddingBottom: 24,
  },

  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 34,
  },

  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoIconText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#294880",
  },

  navList: {
    gap: 4,
  },

  navItem: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    position: "relative",
    overflow: "hidden",
  },

  activeNavItem: {
    backgroundColor: "#E8EFFB",
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

  navIcon: {
    width: 28,
    alignItems: "center",
    marginRight: 14,
  },

  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5D7A",
  },

  activeNavText: {
    color: "#294880",
    fontWeight: "700",
  },

  mainContent: {
    flex: 1,
  },

  topHeader: {
    height: 86,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D9E2F0",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
    marginRight: 20,
  },

  breadcrumb: {
    fontSize: 17,
    color: "#294880",
    fontWeight: "500",
    marginBottom: 4,
  },

  breadcrumbHighlight: {
    fontWeight: "800",
    color: "#1E4D8F",
  },

  pageDesc: {
    fontSize: 13,
    color: "#6B7A99",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  searchBox: {
    width: 220,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D5DEEC",
    backgroundColor: "#F8FAFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#294880",
    outlineStyle: "none",
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: 2,
    right: 1,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D9DEE8",
  },

  profileText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#294880",
  },

  pageContent: {
    flex: 1,
    padding: 24,
  },
};