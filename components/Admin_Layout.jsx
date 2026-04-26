import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function Admin_Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      route: "/(admin)/Admin_Dashboard",
      icon: "grid",
      iconType: "Feather",
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
      label: "Logs",
      route: "/(admin)/Admin_Logs",
      icon: "list-outline",
      iconType: "Ionicons",
    },
    {
      label: "Settings",
      route: "/(admin)/Admin_Settings",
      icon: "settings-outline",
      iconType: "Ionicons",
    },
  ];

  const notifications = [
    {
      id: "N-001",
      type: "report",
      title: "New Report Submitted",
      message: "A new flood report was submitted near Brgy. San Isidro.",
      time: "2 minutes ago",
      priority: "High",
      unread: true,
      route: "/(admin)/Admin_Reports",
    },
    {
      id: "N-002",
      type: "ai",
      title: "AI Validation Completed",
      message: "Report #ARG-2031 received a credibility score of 92%.",
      time: "8 minutes ago",
      priority: "Medium",
      unread: true,
      route: "/(admin)/Admin_Validation",
    },
    {
      id: "N-003",
      type: "admin",
      title: "Report Approved",
      message: "Admin R. Ramos approved Report #ARG-2019.",
      time: "20 minutes ago",
      priority: "Low",
      unread: true,
      route: "/(admin)/Admin_Logs",
    },
    {
      id: "N-004",
      type: "system",
      title: "System Activity Logged",
      message: "AI processing logs were updated successfully.",
      time: "35 minutes ago",
      priority: "Low",
      unread: false,
      route: "/(admin)/Admin_Logs",
    },
  ];

  const unreadCount = notifications.filter((item) => item.unread).length;

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

  const getNotificationIcon = (type) => {
    if (type === "report") {
      return (
        <Ionicons name="document-text-outline" size={20} color="#2563EB" />
      );
    }

    if (type === "ai") {
      return <Ionicons name="sparkles-outline" size={20} color="#7C3AED" />;
    }

    if (type === "admin") {
      return (
        <Ionicons name="person-circle-outline" size={21} color="#059669" />
      );
    }

    if (type === "system") {
      return <Ionicons name="server-outline" size={20} color="#F59E0B" />;
    }

    return <Ionicons name="notifications-outline" size={20} color="#294880" />;
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return {
        backgroundColor: "#FEE2E2",
        color: "#DC2626",
      };
    }

    if (priority === "Medium") {
      return {
        backgroundColor: "#FEF3C7",
        color: "#D97706",
      };
    }

    return {
      backgroundColor: "#E8EFFB",
      color: "#294880",
    };
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

  const handleNotificationPress = (item) => {
    setShowNotifications(false);
    setShowProfileDropdown(false);
    router.push(item.route);
  };

  const handleProfileSettings = () => {
    setShowProfileDropdown(false);
    setShowNotifications(false);
    router.push("/(admin)/Admin_Settings");
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    setShowNotifications(false);
    router.replace("/(auth)/Admin_Login");
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
                onPress={() => {
                  setShowNotifications(false);
                  setShowProfileDropdown(false);
                  router.push(item.route);
                }}
              >
                {isActive && <View style={styles.activeBar} />}

                <View style={styles.navIcon}>{getIcon(item, isActive)}</View>

                <Text
                  style={[styles.navText, isActive && styles.activeNavText]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* RIGHT CONTENT */}
      <View style={styles.mainContent}>
        {/* TOP HEADER */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.breadcrumb}>
              ARGUS Admin Dashboard:{" "}
              <Text style={styles.breadcrumbHighlight}>
                {getCurrentPageName()}
              </Text>
            </Text>

            <Text style={styles.pageDesc}>{getPageDescription()}</Text>
          </View>

          <View style={styles.headerRight}>
            {/* NOTIFICATION BUTTON */}
            <View style={styles.notificationWrapper}>
              <TouchableOpacity
                style={[
                  styles.notificationButton,
                  showNotifications && styles.activeNotificationButton,
                ]}
                onPress={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#294880"
                />

                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* NOTIFICATION DROPDOWN */}
              {showNotifications && (
                <View style={styles.notificationDropdown}>
                  <View style={styles.notificationHeader}>
                    <View>
                      <Text style={styles.notificationTitle}>
                        Notifications
                      </Text>
                      <Text style={styles.notificationSubtitle}>
                        {unreadCount} unread alerts
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.closeNotificationButton}
                      onPress={() => setShowNotifications(false)}
                    >
                      <Ionicons
                        name="close-outline"
                        size={22}
                        color="#4B5D7A"
                      />
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    style={styles.notificationList}
                    showsVerticalScrollIndicator={false}
                  >
                    {notifications.map((item) => {
                      const priorityStyle = getPriorityStyle(item.priority);

                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={[
                            styles.notificationItem,
                            item.unread && styles.unreadNotificationItem,
                          ]}
                          onPress={() => handleNotificationPress(item)}
                        >
                          <View style={styles.notificationIconBox}>
                            {getNotificationIcon(item.type)}
                          </View>

                          <View style={styles.notificationContent}>
                            <View style={styles.notificationItemHeader}>
                              <Text style={styles.notificationItemTitle}>
                                {item.title}
                              </Text>

                              {item.unread && <View style={styles.unreadDot} />}
                            </View>

                            <Text style={styles.notificationMessage}>
                              {item.message}
                            </Text>

                            <View style={styles.notificationMeta}>
                              <Text style={styles.notificationTime}>
                                {item.time}
                              </Text>

                              <View
                                style={[
                                  styles.priorityBadge,
                                  {
                                    backgroundColor:
                                      priorityStyle.backgroundColor,
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.priorityText,
                                    { color: priorityStyle.color },
                                  ]}
                                >
                                  {item.priority}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => {
                      setShowNotifications(false);
                      setShowProfileDropdown(false);
                      router.push("/(admin)/Admin_Logs");
                    }}
                  >
                    <Text style={styles.viewAllText}>
                      View all notifications
                    </Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={16}
                      color="#294880"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* PROFILE DROPDOWN */}
            <View style={styles.profileWrapper}>
              <TouchableOpacity
                style={[
                  styles.profileSection,
                  showProfileDropdown && styles.activeProfileSection,
                ]}
                onPress={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>R</Text>
                </View>

                <View>
                  <Text style={styles.profileText}>Admin: R. Ramos</Text>
                  <Text style={styles.profileRole}>System Administrator</Text>
                </View>

                <Ionicons
                  name={
                    showProfileDropdown
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={18}
                  color="#4B5D7A"
                />
              </TouchableOpacity>

              {showProfileDropdown && (
                <View style={styles.profileDropdown}>
                  <TouchableOpacity
                    style={styles.profileDropdownItem}
                    onPress={handleProfileSettings}
                  >
                    <View style={styles.profileDropdownIconBox}>
                      <Ionicons
                        name="person-circle-outline"
                        size={20}
                        color="#294880"
                      />
                    </View>

                    <View style={styles.profileDropdownTextBox}>
                      <Text style={styles.profileDropdownTitle}>
                        Profile Settings
                      </Text>
                      <Text style={styles.profileDropdownSubtitle}>
                        Manage admin account
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.profileDropdownDivider} />

                  <TouchableOpacity
                    style={styles.profileDropdownItem}
                    onPress={handleLogout}
                  >
                    <View
                      style={[
                        styles.profileDropdownIconBox,
                        styles.logoutIconBox,
                      ]}
                    >
                      <Ionicons
                        name="log-out-outline"
                        size={20}
                        color="#DC2626"
                      />
                    </View>

                    <View style={styles.profileDropdownTextBox}>
                      <Text
                        style={[styles.profileDropdownTitle, styles.logoutText]}
                      >
                        Logout
                      </Text>
                      <Text style={styles.profileDropdownSubtitle}>
                        Back to admin login
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* PAGE CONTENT */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.pageContent}
          onPress={() => {
            if (showNotifications) {
              setShowNotifications(false);
            }

            if (showProfileDropdown) {
              setShowProfileDropdown(false);
            }
          }}
        >
          {children}
        </TouchableOpacity>
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
    zIndex: 20,
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
    position: "relative",
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

  notificationWrapper: {
    position: "relative",
    zIndex: 50,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  activeNotificationButton: {
    backgroundColor: "#E8EFFB",
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

  notificationDropdown: {
    position: "absolute",
    top: 52,
    right: -120,
    width: 380,
    maxHeight: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    shadowColor: "#294880",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
    zIndex: 100,
    overflow: "hidden",
  },

  notificationHeader: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5ECF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#294880",
  },

  notificationSubtitle: {
    fontSize: 13,
    color: "#6B7A99",
    marginTop: 3,
  },

  closeNotificationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationList: {
    maxHeight: 355,
  },

  notificationItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3FA",
    backgroundColor: "#FFFFFF",
  },

  unreadNotificationItem: {
    backgroundColor: "#F8FAFD",
  },

  notificationIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E8EFFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  notificationContent: {
    flex: 1,
  },

  notificationItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationItemTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#294880",
    flex: 1,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    marginLeft: 8,
  },

  notificationMessage: {
    fontSize: 13,
    color: "#5F6F8C",
    lineHeight: 18,
    marginTop: 4,
  },

  notificationMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  notificationTime: {
    fontSize: 12,
    color: "#8A98B3",
  },

  priorityBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "800",
  },

  viewAllButton: {
    height: 48,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: "#E5ECF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F8FAFD",
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#294880",
  },

  profileWrapper: {
    position: "relative",
    zIndex: 60,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },

  activeProfileSection: {
    backgroundColor: "#E8EFFB",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#294880",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  profileText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#294880",
  },

  profileRole: {
    fontSize: 11,
    color: "#6B7A99",
    marginTop: 2,
  },

  profileDropdown: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9E2F0",
    shadowColor: "#294880",
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
    zIndex: 120,
    overflow: "hidden",
  },

  profileDropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },

  profileDropdownIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E8EFFB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutIconBox: {
    backgroundColor: "#FEE2E2",
  },

  profileDropdownTextBox: {
    flex: 1,
  },

  profileDropdownTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#294880",
  },

  profileDropdownSubtitle: {
    fontSize: 12,
    color: "#6B7A99",
    marginTop: 2,
  },

  logoutText: {
    color: "#DC2626",
  },

  profileDropdownDivider: {
    height: 1,
    backgroundColor: "#EEF3FA",
  },

  pageContent: {
    flex: 1,
    padding: 24,
  },
};
