import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Svg, { Path, Line, Circle, Text as SvgText } from "react-native-svg";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Divboxwhite from "../../components/Divboxwhite";
import ThemedHeader from "../../components/ThemedHeader";

const polarToCartesian = (cx, cy, r, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const SpeedometerChart = ({ value = 20, min = 0, max = 50 }) => {
  const safeValue = Math.max(min, Math.min(value, max));

  const width = 260;
  const height = 170;
  const cx = width / 2;
  const cy = 125;
  const radius = 82;

  const segmentColors = [
    "#D32F2F", // red
    "#F57C00", // orange
    "#FBC02D", // yellow
    "#9CCC65", // yellow-green
    "#2E7D32", // green
  ];

  const segmentAngles = [-90, -54, -18, 18, 54, 90];
  const needleAngle = -90 + ((safeValue - min) / (max - min)) * 180;
  const needleEnd = polarToCartesian(cx, cy, radius - 18, needleAngle);

  return (
    <View style={styles.speedometerWrapper}>
      <Svg width={width} height={height}>
        {segmentColors.map((color, index) => (
          <Path
            key={index}
            d={describeArc(
              cx,
              cy,
              radius,
              segmentAngles[index],
              segmentAngles[index + 1],
            )}
            stroke={color}
            strokeWidth={16}
            fill="none"
            strokeLinecap="round"
          />
        ))}

        <Line
          x1={cx}
          y1={cy}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke="#294880"
          strokeWidth={4}
          strokeLinecap="round"
        />

        <Circle cx={cx} cy={cy} r={8} fill="#294880" />

        <SvgText
          x={cx - 12}
          y={98}
          fontSize="18"
          fontWeight="bold"
          fill="#294880"
        >
          {safeValue}
        </SvgText>

        <SvgText x={28} y={135} fontSize="14" fontWeight="600" fill="#6B7280">
          0
        </SvgText>

        <SvgText x={218} y={135} fontSize="14" fontWeight="600" fill="#6B7280">
          50
        </SvgText>
      </Svg>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#D32F2F" }]} />
          <ThemedText style={styles.legendText}>Red</ThemedText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#F57C00" }]} />
          <ThemedText style={styles.legendText}>Orange</ThemedText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#FBC02D" }]} />
          <ThemedText style={styles.legendText}>Yellow</ThemedText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#9CCC65" }]} />
          <ThemedText style={styles.legendText}>Yellow-Green</ThemedText>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#2E7D32" }]} />
          <ThemedText style={styles.legendText}>Green</ThemedText>
        </View>
      </View>
    </View>
  );
};

const UserProfileSettings = () => {
  const [editMode, setEditMode] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "Mika",
    location: "Langtad, Argao, Cebu",
    email: "mika@gmail.com",
    credibilityScore: 20,
  });

  const [tempDetails, setTempDetails] = useState(userDetails);

  const handleEdit = () => {
    setTempDetails(userDetails);
    setEditMode(true);
  };

  const handleSave = () => {
    setUserDetails(tempDetails);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempDetails(userDetails);
    setEditMode(false);
  };

  const updateTempDetail = (key, value) => {
    setTempDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Divboxwhite style={styles.detailsCard}>
          <View style={styles.cardHeader}>
            <ThemedHeader style={styles.cardTitle}>
              Personal Information
            </ThemedHeader>

            {editMode ? (
              <View style={styles.editButtons}>
                <TouchableOpacity onPress={handleCancel}>
                  <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave}>
                  <ThemedText style={styles.saveText}>Save</ThemedText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={handleEdit}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Username</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.username}
                onChangeText={(value) => updateTempDetail("username", value)}
                placeholder="Enter username"
              />
            ) : (
              <ThemedText style={styles.value}>
                {userDetails.username}
              </ThemedText>
            )}
          </View>

          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Current Location</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.location}
                onChangeText={(value) => updateTempDetail("location", value)}
                placeholder="Enter location"
              />
            ) : (
              <ThemedText style={styles.value}>
                {userDetails.location}
              </ThemedText>
            )}
          </View>

          <View style={styles.detailsRow}>
            <ThemedText style={styles.label}>Email</ThemedText>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={tempDetails.email}
                onChangeText={(value) => updateTempDetail("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email"
              />
            ) : (
              <ThemedText style={styles.value}>{userDetails.email}</ThemedText>
            )}
          </View>

          <View style={styles.scoreSection}>
            <ThemedText style={styles.scoreTitle}>Credibility Score</ThemedText>
            <SpeedometerChart value={userDetails.credibilityScore} />
          </View>
        </Divboxwhite>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
  },
  detailsCard: {
    padding: 16,
    borderRadius: 18,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    color: "#294880",
  },
  editButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#294880",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7A7A7A",
    marginRight: 14,
  },
  saveText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#294880",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#294880",
    paddingVertical: 4,
  },
  scoreSection: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#294880",
    marginBottom: 12,
  },
  speedometerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  legendRow: {
    marginTop: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 11,
    color: "#6B7280",
  },
});

export default UserProfileSettings;
