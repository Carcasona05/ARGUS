import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const UserTips = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const categories = [
    {
      title: "Personal Safety Tips",
      icon: "shield-checkmark-outline",
      content:
        "Stay alert, avoid distractions in public places, keep your phone accessible, and let someone know where you are going when traveling alone.",
    },
    {
      title: "Walking Alone At Night",
      icon: "moon-outline",
      content:
        "Stick to well-lit streets, avoid isolated shortcuts, stay aware of nearby people, and keep valuables out of sight while walking.",
    },
    {
      title: "Commute Protection",
      icon: "bus-outline",
      content:
        "Wait in visible areas, verify public transport details before boarding, avoid showing expensive gadgets, and stay near trusted passengers when possible.",
    },
    {
      title: "Home and Property Security",
      icon: "home-outline",
      content:
        "Lock doors and windows, install lights around entry points, avoid posting your location publicly, and double-check gates before leaving home.",
    },
  ];

  const quickTips = [
    "Avoid using your phone while crossing dark streets.",
    "Share your live location with a trusted contact.",
    "Use busy, well-lit roads instead of shortcuts.",
  ];

  const toggleTip = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  const callEmergency = () => {
    Linking.openURL("tel:911");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <ThemedText style={styles.pageTitle}>Safety Tips</ThemedText>
          <ThemedText style={styles.pageSubtitle}>
            Stay informed with practical safety reminders, travel precautions,
            and emergency access.
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIconWrap}>
            <Ionicons name="bulb-outline" size={24} color="#F4A62A" />
          </View>

          <View style={styles.featureContent}>
            <ThemedText style={styles.featureLabel}>Featured Tip</ThemedText>
            <ThemedText style={styles.featureTitle}>
              Be aware of your surroundings
            </ThemedText>
            <ThemedText style={styles.featureDescription}>
              Stay alert and avoid distractions, especially while walking
              outside at night or when commuting alone.
            </ThemedText>

            <TouchableOpacity
              style={styles.readMoreButton}
              activeOpacity={0.88}
            >
              <ThemedText style={styles.readMoreText}>Read More</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quickTipsCard}>
          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitle}>Quick Reminders</ThemedText>
          </View>

          {quickTips.map((tip, index) => (
            <View key={index} style={styles.quickTipItem}>
              <View style={styles.quickTipDot} />
              <ThemedText style={styles.quickTipText}>{tip}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.categorySection}>
          <ThemedText style={styles.sectionTitle}>Safety Categories</ThemedText>

          {categories.map((category, index) => {
            const isExpanded = expandedTip === index;

            return (
              <View key={index} style={styles.categoryCard}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  activeOpacity={0.88}
                  onPress={() => toggleTip(index)}
                >
                  <View style={styles.categoryLeft}>
                    <View style={styles.categoryIconWrap}>
                      <Ionicons
                        name={category.icon}
                        size={18}
                        color="#294880"
                      />
                    </View>

                    <ThemedText style={styles.categoryText}>
                      {category.title}
                    </ThemedText>
                  </View>

                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#294880"
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.categoryBody}>
                    <ThemedText style={styles.categoryContent}>
                      {category.content}
                    </ThemedText>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.emergencyCard}>
          <View style={styles.emergencyTop}>
            <View style={styles.emergencyIconWrap}>
              <Ionicons name="call" size={22} color="#FFFFFF" />
            </View>

            <View style={styles.emergencyTextWrap}>
              <ThemedText style={styles.emergencyTitle}>
                Emergency Assistance
              </ThemedText>
              <ThemedText style={styles.emergencySubtitle}>
                Call emergency services immediately in urgent situations.
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={callEmergency}
            activeOpacity={0.88}
          >
            <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            <ThemedText style={styles.emergencyButtonText}>
              Call 911 Emergency
            </ThemedText>
          </TouchableOpacity>

          <ThemedText style={styles.policeContact}>
            Nearby Police: XXXX-XXX-XXXX
          </ThemedText>
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

  headerSection: {
    marginBottom: 16,
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

  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    marginBottom: 14,
    flexDirection: "row",
  },
  featureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF4DD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#B9770E",
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5F6B7A",
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    backgroundColor: "#294880",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  readMoreText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  quickTipsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    marginBottom: 14,
  },
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2A37",
  },
  quickTipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  quickTipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#294880",
    marginTop: 6,
    marginRight: 10,
  },
  quickTipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#5F6B7A",
  },

  categorySection: {
    marginBottom: 14,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    overflow: "hidden",
  },
  categoryHeader: {
    paddingHorizontal: 14,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  categoryIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  categoryText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#294880",
  },
  categoryBody: {
    paddingHorizontal: 14,
    paddingBottom: 15,
    paddingTop: 2,
  },
  categoryContent: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5F6B7A",
  },

  emergencyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F6D8D8",
  },
  emergencyTop: {
    flexDirection: "row",
    marginBottom: 14,
  },
  emergencyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#D64545",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  emergencyTextWrap: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#C0392B",
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#5F6B7A",
  },
  emergencyButton: {
    backgroundColor: "#D64545",
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  emergencyButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
    marginLeft: 8,
  },
  policeContact: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default UserTips;
