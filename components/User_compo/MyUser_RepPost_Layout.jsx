import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ARGUS_BLUE = "#294880";

const MyUser_RepPost_Layout = ({
  userName = "You",
  userAvatar = null,
  location = "Unknown location",
  incidentCategory = "Incident Category",
  incidentType = "Incident Type",
  details = "No details provided.",
  status = "Pending",
  likes = 0,
  comments = 0,
  images = [],
  onLike,
  onComment,
  onEdit,
  onDelete,
  style,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusStyle = () => {
    if (status === "Verified") {
      return {
        bg: "#DCFCE7",
        color: "#16A34A",
      };
    }

    if (status === "Rejected") {
      return {
        bg: "#FEE2E2",
        color: "#DC2626",
      };
    }

    return {
      bg: "#FEF3C7",
      color: "#D97706",
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrap}>
          {userAvatar ? (
            <Image
              source={typeof userAvatar === "string" ? { uri: userAvatar } : userAvatar}
              style={styles.avatarImage}
            />
          ) : (
            <Ionicons name="person" size={20} color={ARGUS_BLUE} />
          )}
        </View>

        <View style={styles.headerTextWrap}>
          <Text style={styles.userName}>{userName}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={13} color="#6B7280" />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.75}
          onPress={() => setMenuOpen((prev) => !prev)}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color="#64748B" />
        </TouchableOpacity>

        {menuOpen && (
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.75}
              onPress={() => {
                setMenuOpen(false);
                onEdit?.();
              }}
            >
              <Ionicons name="create-outline" size={16} color={ARGUS_BLUE} />
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.75}
              onPress={() => {
                setMenuOpen(false);
                onDelete?.();
              }}
            >
              <Ionicons name="trash-outline" size={16} color="#DC2626" />
              <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{incidentCategory}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Incident Type</Text>
          <Text style={styles.infoValue}>{incidentType}</Text>
        </View>
      </View>

      <Text style={styles.detailsText} numberOfLines={3}>
        {details}
      </Text>

      <View style={styles.blankImageBox}>
        {images?.length > 0 ? (
          <>
            <Ionicons name="image-outline" size={24} color={ARGUS_BLUE} />
            <Text style={styles.imageText}>{images.length} attached media</Text>
          </>
        ) : (
          <>
            <Ionicons name="image-outline" size={24} color="#94A3B8" />
            <Text style={styles.blankImageText}>No image attached</Text>
          </>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.75}
          onPress={onLike}
        >
          <Ionicons name="heart-outline" size={19} color={ARGUS_BLUE} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.75}
          onPress={onComment}
        >
          <Ionicons name="chatbubble-outline" size={19} color={ARGUS_BLUE} />
          <Text style={styles.actionText}>{comments} Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.75}
          onPress={onComment}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    shadowColor: "#8AA9E6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    position: "relative",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  headerTextWrap: {
    flex: 1,
  },

  userName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 3,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    flex: 1,
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 3,
  },

  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  menuBox: {
    position: "absolute",
    top: 38,
    right: 0,
    width: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    paddingVertical: 6,
    zIndex: 50,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  menuText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2A37",
    marginLeft: 8,
  },

  deleteText: {
    color: "#DC2626",
  },

  statusRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  infoBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    marginBottom: 10,
  },

  infoRow: {
    marginBottom: 8,
  },

  infoLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2A37",
  },

  detailsText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#374151",
    marginBottom: 12,
  },

  blankImageBox: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE7F5",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  imageText: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },

  blankImageText: {
    marginTop: 6,
    fontSize: 12,
    color: "#94A3B8",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
    paddingTop: 10,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "700",
    color: ARGUS_BLUE,
    marginLeft: 5,
  },

  viewButton: {
    marginLeft: "auto",
    backgroundColor: "#E8EEF9",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  viewButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: ARGUS_BLUE,
  },
});

export default MyUser_RepPost_Layout;