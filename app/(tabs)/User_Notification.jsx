import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const userReports = [
  {
    id: "1",
    title: "Robbery Report Approved",
    message:
      "Your report about the incident on Mabin St. was reviewed and marked as VERIFIED by the admin.",
    time: "12 min ago",
    location: "Mabin St.",
    verified: true,
  },
  {
    id: "2",
    title: "Assault Report Reviewed",
    message:
      "Your report near Rizal Ave. was checked by the admin and is currently marked as UNVERIFIED.",
    time: "1 hr ago",
    location: "Rizal Ave.",
    verified: false,
  },
];

const nearbyIncidents = [
  {
    id: "1",
    type: "Suspicious Activity",
    message: "A suspicious person was reported near the public park entrance.",
    time: "18 min ago",
    distance: "350 m away",
    level: "Moderate",
  },
  {
    id: "2",
    type: "Theft Alert",
    message: "A mobile phone theft was reported near the transport terminal.",
    time: "42 min ago",
    distance: "700 m away",
    level: "High",
  },
];

const loginActivity = [
  {
    id: "1",
    device: "Samsung Galaxy A15",
    location: "Cavite, Philippines",
    time: "Today, 8:24 AM",
    current: true,
  },
  {
    id: "2",
    device: "Windows Chrome Browser",
    location: "Manila, Philippines",
    time: "Yesterday, 9:41 PM",
    current: false,
  },
];

const ReportStatusCard = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.iconTitleWrap}>
          <View
            style={[
              styles.iconBadge,
              {
                backgroundColor: item.verified ? "#E8F7EE" : "#FFF4CC",
              },
            ]}
          >
            <Ionicons
              name={item.verified ? "shield-checkmark" : "warning"}
              size={18}
              color={item.verified ? "#1E8E5A" : "#9B6A00"}
            />
          </View>

          <View style={styles.cardTitleWrap}>
            <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.cardTime}>{item.time}</ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: item.verified ? "#E8F7EE" : "#FFF4CC",
            },
          ]}
        >
          <ThemedText
            style={[
              styles.statusPillText,
              {
                color: item.verified ? "#1E8E5A" : "#9B6A00",
              },
            ]}
          >
            {item.verified ? "Verified" : "Unverified"}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.cardMessage}>{item.message}</ThemedText>

      <View style={styles.metaRow}>
        <Ionicons name="location" size={14} color="#1E5EFF" />
        <ThemedText style={styles.metaText}>{item.location}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const NearbyIncidentCard = ({ item }) => {
  const high = item.level === "High";

  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.iconTitleWrap}>
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: high ? "#FFE8E8" : "#FFF3DE" },
            ]}
          >
            <Ionicons
              name={high ? "alert-circle" : "notifications"}
              size={18}
              color={high ? "#D64545" : "#F4A62A"}
            />
          </View>

          <View style={styles.cardTitleWrap}>
            <ThemedText style={styles.cardTitle}>{item.type}</ThemedText>
            <ThemedText style={styles.cardTime}>{item.time}</ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.statusPill,
            { backgroundColor: high ? "#FFE8E8" : "#FFF3DE" },
          ]}
        >
          <ThemedText
            style={[
              styles.statusPillText,
              { color: high ? "#C53030" : "#B9770E" },
            ]}
          >
            {item.level}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.cardMessage}>{item.message}</ThemedText>

      <View style={styles.metaRowBetween}>
        <View style={styles.metaRow}>
          <Ionicons name="navigate" size={14} color="#1E5EFF" />
          <ThemedText style={styles.metaText}>{item.distance}</ThemedText>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <ThemedText style={styles.linkText}>View Map</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const LoginCard = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.86} style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.iconTitleWrap}>
          <View style={[styles.iconBadge, { backgroundColor: "#EEF4FF" }]}>
            <Ionicons
              name={item.device.toLowerCase().includes("windows") ? "desktop" : "phone-portrait"}
              size={18}
              color="#1E5EFF"
            />
          </View>

          <View style={styles.cardTitleWrap}>
            <ThemedText style={styles.cardTitle}>{item.device}</ThemedText>
            <ThemedText style={styles.cardTime}>{item.time}</ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: item.current ? "#EAF2FF" : "#F4F7FB",
            },
          ]}
        >
          <ThemedText
            style={[
              styles.statusPillText,
              {
                color: item.current ? "#1E5EFF" : "#68758A",
              },
            ]}
          >
            {item.current ? "Current" : "Recent"}
          </ThemedText>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={14} color="#1E5EFF" />
        <ThemedText style={styles.metaText}>{item.location}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ title, action }) => {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {action ? <ThemedText style={styles.sectionAction}>{action}</ThemedText> : null}
    </View>
  );
};

const User_Notification = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <ThemedText style={styles.pageTitle}>Notifications</ThemedText>
          <ThemedText style={styles.pageSubtitle}>
            Stay updated with your reports, nearby incidents, and account access.
          </ThemedText>
        </View>

        <View style={styles.sectionBlock}>
          <SectionHeader title="Your Reports" action="See All" />
          {userReports.map((item) => (
            <ReportStatusCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <SectionHeader title="Incident Reports Near Your Location" action="Open Map" />
          {nearbyIncidents.map((item) => (
            <NearbyIncidentCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <SectionHeader title="Recent Account Login" action="Manage" />
          {loginActivity.map((item) => (
            <LoginCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 28,
  },
  pageHeader: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#68758A",
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2A37",
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: "700",
    color: "#294880",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconTitleWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "800",
  },
  cardMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5F6B7A",
    marginTop: 12,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#667085",
  },
  linkText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E5EFF",
  },
});

export default User_Notification;
