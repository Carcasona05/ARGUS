import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const ARGUS_BLUE = "#294880";
const DARK_BLUE = "#183865";

export default function Admin_Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      route: "/(admin)/Admin_Dashboard",
      path: "/Admin_Dashboard",
      icon: "grid",
      iconType: "Feather",
      description: "Overview of incidents, hotspots, and system activity",
    },
    {
      label: "Analytics",
      route: "/(admin)/Admin_Analytics",
      path: "/Admin_Analytics",
      icon: "bar-chart-outline",
      iconType: "Ionicons",
      description: "View trends, metrics, and incident intelligence",
    },
    {
      label: "Validation",
      route: "/(admin)/Admin_Validation",
      path: "/Admin_Validation",
      icon: "shield-checkmark-outline",
      iconType: "Ionicons",
      description: "Manage reports, validate submissions, and review AI credibility",
    },
    {
      label: "Logs",
      route: "/(admin)/Admin_Logs",
      path: "/Admin_Logs",
      icon: "list-outline",
      iconType: "Ionicons",
      description: "Track system logs and recent admin activities",
    },
    {
      label: "Settings",
      route: "/(admin)/Admin_Settings",
      path: "/Admin_Settings",
      icon: "settings-outline",
      iconType: "Ionicons",
      description: "Manage admin accounts, profile, and system preferences",
    },
  ];

  const notifications = [
    {
      id: "N-001",
      type: "report",
      title: "New Report Submitted",
      message: "A new incident report was submitted near Brgy. San Isidro.",
      time: "2 minutes ago",
      priority: "High",
      unread: true,
      route: "/(admin)/Admin_Validation",
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

  const isRouteActive = (item) => {
    return (
      pathname === item.path ||
      pathname === item.route ||
      pathname.includes(item.path.replace("/", ""))
    );
  };

  const getCurrentPage = () => {
    const found = navItems.find((item) => isRouteActive(item));

    if (found) {
      return found;
    }

    if (pathname.includes("Admin_ViewReport")) {
      return {
        label: "View Report",
        description: "Review complete incident report details",
      };
    }

    if (pathname.includes("Admin_ViewValidation")) {
      return {
        label: "View Validation",
        description: "Review AI validation and report credibility details",
      };
    }

    if (pathname.includes("Admin_ViewValidationReport")) {
      return {
        label: "View Validation Report",
        description: "Review submitted incident validation information",
      };
    }

    if (pathname.includes("Admin_ViewReport")) {
      return {
        label: "View Report",
        description: "Review complete incident report information",
      };
    }

    return {
      label: "Admin",
      description: "Admin panel",
    };
  };

  const currentPage = getCurrentPage();

  const getIcon = (item, isActive) => {
    const color = isActive ? "#FFFFFF" : "#B9C8E6";

    if (item.iconType === "Feather") {
      return <Feather name={item.icon} size={21} color={color} />;
    }

    return <Ionicons name={item.icon} size={22} color={color} />;
  };

  const getNotificationIcon = (type) => {
    if (type === "report") {
      return <Ionicons name="document-text-outline" size={20} color={ARGUS_BLUE} />;
    }

    if (type === "ai") {
      return <Ionicons name="sparkles-outline" size={20} color="#7C3AED" />;
    }

    if (type === "admin") {
      return <Ionicons name="person-circle-outline" size={21} color="#059669" />;
    }

    if (type === "system") {
      return <Ionicons name="server-outline" size={20} color="#F59E0B" />;
    }

    return <Ionicons name="notifications-outline" size={20} color={ARGUS_BLUE} />;
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return {
        backgroundColor: "#FDECEC",
        color: "#DC2626",
      };
    }

    if (priority === "Medium") {
      return {
        backgroundColor: "#FFF7E6",
        color: "#D97706",
      };
    }

    return {
      backgroundColor: "#E8EEF9",
      color: ARGUS_BLUE,
    };
  };

  const handleNavPress = (route) => {
    setShowNotifications(false);
    setShowProfileDropdown(false);
    router.push(route);
  };

  const handleNotificationPress = (item) => {
    setShowNotifications(false);
    setShowProfileDropdown(false);
    router.push(item.route);
  };

  const handleLogout = () => {
    setShowNotifications(false);
    setShowProfileDropdown(false);
    router.replace("/(auth)/Admin_Login");
  };

  const closeDropdowns = () => {
    setShowNotifications(false);
    setShowProfileDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.logoSection}>
          <Image
            source={require("../../assets/img/logonotext.png")}
            style={styles.logoTextImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.sidebarDivider} />

        <View style={styles.navSection}>
          <Text style={styles.navSectionTitle}>MAIN MENU</Text>

          <View style={styles.navList}>
            {navItems.map((item, index) => {
              const isActive = isRouteActive(item);

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.navItem, isActive && styles.activeNavItem]}
                  onPress={() => handleNavPress(item.route)}
                  activeOpacity={0.75}
                >
                  <View style={styles.navIcon}>{getIcon(item, isActive)}</View>

                  <Text style={[styles.navText, isActive && styles.activeNavText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sidebarFooter}>
          <View style={styles.footerAvatar}>
            <Text style={styles.footerAvatarText}>AD</Text>
          </View>

          <View style={styles.footerInfo}>
            <Text style={styles.footerName}>Admin User</Text>
            <Text style={styles.footerRole}>System Administrator</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.headerTitleDivider} />

            <View>
              <Text style={styles.pageTitle}>{currentPage.label}</Text>
              <Text style={styles.pageDesc}>{currentPage.description}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.notificationWrapper}>
              <TouchableOpacity
                style={[
                  styles.notificationButton,
                  showNotifications && styles.activeHeaderButton,
                ]}
                onPress={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
                activeOpacity={0.75}
              >
                <Ionicons
                  name="notifications-outline"
                  size={23}
                  color={ARGUS_BLUE}
                />

                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {showNotifications && (
                <View style={styles.notificationDropdown}>
                  <View style={styles.notificationHeader}>
                    <View>
                      <Text style={styles.notificationTitle}>Notifications</Text>
                      <Text style={styles.notificationSubtitle}>
                        {unreadCount} unread alerts
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.closeNotificationButton}
                      onPress={() => setShowNotifications(false)}
                      activeOpacity={0.75}
                    >
                      <Ionicons name="close-outline" size={22} color="#4B5D7A" />
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
                          activeOpacity={0.75}
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
                    activeOpacity={0.75}
                  >
                    <Text style={styles.viewAllText}>View all notifications</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={16}
                      color={ARGUS_BLUE}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.profileWrapper}>
              <TouchableOpacity
                style={[
                  styles.profileSection,
                  showProfileDropdown && styles.activeHeaderButton,
                ]}
                onPress={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                activeOpacity={0.75}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>A</Text>
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.profileText}>Admin</Text>
                  <Text style={styles.profileRole}>Administrator</Text>
                </View>

                <Ionicons
                  name={
                    showProfileDropdown
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={17}
                  color="#6B7A99"
                />
              </TouchableOpacity>

              {showProfileDropdown && (
                <View style={styles.profileDropdown}>
                  <TouchableOpacity
                    style={styles.profileDropdownItem}
                    onPress={handleLogout}
                    activeOpacity={0.75}
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

        <TouchableOpacity
          activeOpacity={1}
          style={styles.pageContent}
          onPress={closeDropdowns}
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
    backgroundColor: "#F4F7FB",
  },

  sidebar: {
    width: 260,
    minHeight: "100vh",
    backgroundColor: DARK_BLUE,
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 14,
    shadowColor: "#102A4C",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: {
      width: 6,
      height: 0,
    },
    elevation: 8,
  },

  logoSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    marginBottom: 8,
  },

  logoTextImage: {
    width: 150,
    height: 150,
  },

  sidebarDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
    marginHorizontal: 8,
    marginBottom: 22,
  },

  navSection: {
    flex: 1,
  },

  navSectionTitle: {
    fontSize: 13,
    color: "#8FA8CF",
    marginLeft: 14,
    marginBottom: 12,
    letterSpacing: 1,
    fontWeight: "700",
  },

  navList: {
    gap: 8,
  },

  navItem: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
  },

  activeNavItem: {
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  navIcon: {
    width: 29,
    alignItems: "center",
    marginRight: 13,
  },

  navText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#B9C8E6",
  },

  activeNavText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  sidebarFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  footerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  footerAvatarText: {
    color: ARGUS_BLUE,
    fontSize: 13,
    fontWeight: "800",
  },

  footerInfo: {
    flex: 1,
  },

  footerName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  footerRole: {
    color: "#B9C8E6",
    fontSize: 12,
    marginTop: 2,
  },

  mainContent: {
    flex: 1,
  },

  topHeader: {
    height: 98,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DCE5F2",
    shadowColor: ARGUS_BLUE,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  headerLeft: {
    flex: 1,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitleDivider: {
    width: 5,
    height: 54,
    borderRadius: 999,
    backgroundColor: ARGUS_BLUE,
    marginRight: 16,
  },

  pageTitle: {
    fontSize: 34,
    color: "#16233A",
    fontWeight: "800",
    marginBottom: 4,
  },

  pageDesc: {
    fontSize: 17,
    color: "#5F6F8C",
    fontWeight: "500",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    position: "relative",
  },

  notificationWrapper: {
    position: "relative",
    zIndex: 50,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5F2",
  },

  activeHeaderButton: {
    backgroundColor: "#E8EEF9",
    borderColor: "#D6E0F0",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  notificationDropdown: {
    position: "absolute",
    top: 58,
    right: -105,
    width: 385,
    maxHeight: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E8F4",
    shadowColor: ARGUS_BLUE,
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 12,
    zIndex: 100,
    overflow: "hidden",
  },

  notificationHeader: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16233A",
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
    backgroundColor: "#F4F7FB",
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
    borderBottomColor: "#F0F4FA",
    backgroundColor: "#FFFFFF",
  },

  unreadNotificationItem: {
    backgroundColor: "#F8FAFD",
  },

  notificationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#E8EEF9",
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
    color: "#16233A",
    flex: 1,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
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
    borderTopColor: "#EEF3FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F8FAFD",
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: "800",
    color: ARGUS_BLUE,
  },

  profileWrapper: {
    position: "relative",
    zIndex: 60,
  },

  profileSection: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 9,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5F2",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: ARGUS_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  profileInfo: {
    minWidth: 90,
  },

  profileText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16233A",
  },

  profileRole: {
    fontSize: 12,
    color: "#6B7A99",
    marginTop: 1,
  },

  profileDropdown: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 260,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E1E8F4",
    shadowColor: ARGUS_BLUE,
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 12,
    zIndex: 120,
    overflow: "hidden",
    paddingVertical: 6,
  },

  profileDropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },

  profileDropdownIconBox: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutIconBox: {
    backgroundColor: "#FDECEC",
  },

  profileDropdownTextBox: {
    flex: 1,
  },

  profileDropdownTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16233A",
  },

  profileDropdownSubtitle: {
    fontSize: 12,
    color: "#6B7A99",
    marginTop: 2,
  },

  logoutText: {
    color: "#DC2626",
  },

  pageContent: {
    flex: 1,
    paddingHorizontal: 26,
    paddingBottom: 26,
    paddingTop: 24,
  },
};