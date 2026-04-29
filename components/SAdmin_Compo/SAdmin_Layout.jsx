import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function SAdmin_Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      route: "/(sadmin)/SAdmin_Dashboard",
      icon: "grid",
      iconType: "Feather",
      description: "SuperAdmin overview of reports, admin activity, and system status",
    },
    {
      label: "Validation",
      route: "/(admin)/Admin_Validation",
      icon: "shield-checkmark-outline",
      iconType: "Ionicons",
      description: "Review report validation and AI credibility results",
    },
    {
      label: "Audit Logs",
      route: "/(sadmin)/SAdmin_AuditLogs",
      icon: "list-outline",
      iconType: "Ionicons",
      description: "View audit trail, deleted reports, and admin actions",
    },
    {
      label: "Admin Accounts",
      route: "/(sadmin)/SAdmin_AdminAccounts",
      icon: "people-outline",
      iconType: "Ionicons",
      description: "Manage admin accounts, roles, and admin requests",
    },
    {
      label: "Settings",
      route: "/(sadmin)/SAdmin_Settings",
      icon: "settings-outline",
      iconType: "Ionicons",
      description: "Configure AI thresholds, map settings, and system preferences",
    },
  ];

  const notifications = [
    {
      id: "SN-001",
      type: "admin",
      title: "Admin Account Request",
      message: "A new admin account request needs review.",
      time: "3 minutes ago",
      priority: "High",
      unread: true,
      route: "/(sadmin)/SAdmin_AdminAccounts",
    },
    {
      id: "SN-002",
      type: "log",
      title: "Report Deleted",
      message: "A report was soft deleted and recorded in audit logs.",
      time: "12 minutes ago",
      priority: "Medium",
      unread: true,
      route: "/(sadmin)/SAdmin_AuditLogs",
    },
    {
      id: "SN-003",
      type: "system",
      title: "AI Threshold Updated",
      message: "System configuration was changed by SuperAdmin.",
      time: "25 minutes ago",
      priority: "Low",
      unread: false,
      route: "/(sadmin)/SAdmin_Settings",
    },
    {
      id: "SN-004",
      type: "report",
      title: "Report Verification Updated",
      message: "A verified report was corrected and logged successfully.",
      time: "40 minutes ago",
      priority: "Low",
      unread: false,
      route: "/(sadmin)/SAdmin_AuditLogs",
    },
  ];

  const unreadCount = notifications.filter((item) => item.unread).length;

  const getIcon = (item, isActive) => {
    const color = isActive ? "#2563EB" : "#4B5D7A";

    if (item.iconType === "Feather") {
      return <Feather name={item.icon} size={22} color={color} />;
    }

    return <Ionicons name={item.icon} size={22} color={color} />;
  };

  const getNotificationIcon = (type) => {
    if (type === "admin") {
      return <Ionicons name="people-outline" size={20} color="#2563EB" />;
    }

    if (type === "log") {
      return <Ionicons name="list-outline" size={20} color="#7C3AED" />;
    }

    if (type === "system") {
      return <Ionicons name="server-outline" size={20} color="#F59E0B" />;
    }

    if (type === "report") {
      return <Ionicons name="document-text-outline" size={20} color="#059669" />;
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

  const getCurrentPage = () => {
    const found = navItems.find((item) => item.route === pathname);

    if (found) {
      return found;
    }

    if (pathname.includes("Admin_ViewValidation")) {
      return {
        label: "View Validation",
        description: "Review AI validation and report credibility details",
      };
    }

    if (pathname.includes("Admin_ViewReport")) {
      return {
        label: "View Report",
        description: "Review complete incident report information",
      };
    }

    if (pathname.includes("SuperAdmin_EditReq")) {
      return {
        label: "Edit Request",
        description: "Review and manage admin edit requests",
      };
    }

    if (pathname.includes("Admin_AddAdmin")) {
      return {
        label: "Add Admin",
        description: "Create or register a new admin account",
      };
    }

    return {
      label: "SuperAdmin",
      description: "SuperAdmin panel",
    };
  };

  const currentPage = getCurrentPage();

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
    setShowProfileDropdown(false);
    setShowNotifications(false);
    router.replace("/(auth)/Admin_Login");
  };

  const closeDropdowns = () => {
    if (showNotifications) {
      setShowNotifications(false);
    }

    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.logoSection}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>A</Text>
          </View>

          <View>
            <Text style={styles.logoText}>ARGUS</Text>
            <Text style={styles.logoSubText}>SuperAdmin Panel</Text>
          </View>
        </View>

        <View style={styles.navList}>
          {navItems.map((item, index) => {
            const isActive = pathname === item.route;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.navItem, isActive && styles.activeNavItem]}
                onPress={() => handleNavPress(item.route)}
                activeOpacity={0.75}
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

      <View style={styles.mainContent}>
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.breadcrumb}>
              ARGUS SuperAdmin Dashboard:{" "}
              <Text style={styles.breadcrumbHighlight}>{currentPage.label}</Text>
            </Text>

            <Text style={styles.pageDesc}>{currentPage.description}</Text>
          </View>

          <View style={styles.headerRight}>
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
                activeOpacity={0.75}
              >
                <Ionicons name="notifications-outline" size={24} color="#294880" />

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
                      router.push("/(sadmin)/SAdmin_AuditLogs");
                    }}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.viewAllText}>View all notifications</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={16}
                      color="#294880"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

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
                activeOpacity={0.75}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>S</Text>
                </View>

                <View>
                  <Text style={styles.profileText}>SuperAdmin</Text>
                  <Text style={styles.profileRole}>System Owner</Text>
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
                    onPress={handleLogout}
                    activeOpacity={0.75}
                  >
                    <View
                      style={[
                        styles.profileDropdownIconBox,
                        styles.logoutIconBox,
                      ]}
                    >
                      <Ionicons name="log-out-outline" size={20} color="#DC2626" />
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
    backgroundColor: "#F8FAFD",
  },

  sidebar: {
    width: 250,
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

  logoSubText: {
    fontSize: 11,
    color: "#6B7A99",
    marginTop: 1,
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
    fontSize: 15.5,
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

  pageContent: {
    flex: 1,
    padding: 24,
  },
};