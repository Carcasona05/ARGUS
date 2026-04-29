import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ARGUS_BLUE = "#294880";

const MyUser_RepPost_Layout = ({
  userName = "You",
  userAvatar = null,
  location = "Not specified",
  incidentCategory = "Not specified",
  incidentType = "Not specified",
  details = "No details provided.",
  images = [],
  status = "Pending",
  likes = 0,
  comments = 0,
  onLike = () => {},
  onComment = () => {},
  onEdit = () => {},
  onDelete = () => {},
  style,
}) => {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSmallScreen = width < 360;

  const cardWidth = Math.min(width - 24, 430);
  const avatarSize = isSmallScreen ? 46 : 54;
  const iconSize = isSmallScreen ? 18 : 20;
  const mediaHeight = isSmallScreen ? 110 : 130;

  const firstImage = images?.[0] || null;
  const secondImage = images?.[1] || null;

  const getImageSource = (img) => {
    if (!img) return null;
    return typeof img === "string" ? { uri: img } : img;
  };

  const getStatusStyle = () => {
    if (status === "Verified") {
      return {
        bg: "#E8F7EE",
        color: "#237A4B",
        icon: "shield-checkmark",
        label: "VERIFIED",
      };
    }

    if (status === "Rejected") {
      return {
        bg: "#FDEBEC",
        color: "#C0392B",
        icon: "close-circle",
        label: "REJECTED",
      };
    }

    return {
      bg: "#FFF4D6",
      color: "#9A6A00",
      icon: "alert-circle",
      label: "PENDING",
    };
  };

  const statusStyle = getStatusStyle();

  const renderMediaBox = (img) => {
    const source = getImageSource(img);

    if (source) {
      return (
        <View style={[styles.mediaBox, { height: mediaHeight }]}>
          <Image source={source} style={styles.mediaImage} />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.mediaBox,
          styles.blankMediaBox,
          {
            height: mediaHeight,
          },
        ]}
      >
        <Ionicons name="image-outline" size={24} color="#9AA8BC" />
      </View>
    );
  };

  return (
    <View style={[styles.wrapper, { width: cardWidth }, style]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.userSection}>
            {userAvatar ? (
              <Image
                source={getImageSource(userAvatar)}
                style={[
                  styles.avatar,
                  {
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                  },
                ]}
              />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  {
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={avatarSize * 0.5}
                  color={ARGUS_BLUE}
                />
              </View>
            )}

            <View style={styles.userTextWrap}>
              <Text style={styles.userName} numberOfLines={1}>
                {userName}
              </Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>

          <View style={styles.rightHeader}>
            <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
              <Ionicons
                name={statusStyle.icon}
                size={14}
                color={statusStyle.color}
              />
              <Text style={[styles.badgeText, { color: statusStyle.color }]}>
                {statusStyle.label}
              </Text>
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
                    onEdit();
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={16}
                    color={ARGUS_BLUE}
                  />
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.75}
                  onPress={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                >
                  <Ionicons name="trash-outline" size={16} color="#C0392B" />
                  <Text style={[styles.menuText, styles.deleteText]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bodyCard}>
          <View style={styles.incidentInfoWrap}>
            <View style={styles.incidentInfoItem}>
              <Text style={styles.incidentInfoLabel}>Incident Category</Text>
              <Text style={styles.incidentInfoValue}>{incidentCategory}</Text>
            </View>

            <View style={styles.incidentInfoItem}>
              <Text style={styles.incidentInfoLabel}>Incident Type</Text>
              <Text style={styles.incidentInfoValue}>{incidentType}</Text>
            </View>
          </View>

          <Text style={styles.detailsText}>{details}</Text>

          <View style={styles.mediaRow}>
            <View style={styles.mediaItem}>{renderMediaBox(firstImage)}</View>
            <View style={styles.mediaItem}>{renderMediaBox(secondImage)}</View>
          </View>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={onLike}
        >
          <Ionicons
            name="thumbs-up-outline"
            size={iconSize}
            color={ARGUS_BLUE}
          />
          <Text style={styles.actionText}>Like</Text>
          <Text style={styles.actionCount}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={onComment}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={iconSize}
            color={ARGUS_BLUE}
          />
          <Text style={styles.actionText}>Comment</Text>
          <Text style={styles.actionCount}>{comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "visible",
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E6ECF5",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: "#FAFCFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    position: "relative",
    zIndex: 20,
  },

  userSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },

  avatar: {
    borderWidth: 1.5,
    borderColor: "#D7E0F0",
  },

  avatarPlaceholder: {
    backgroundColor: "#EAF0FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D7E0F0",
  },

  userTextWrap: {
    flex: 1,
    marginLeft: 12,
  },

  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: ARGUS_BLUE,
  },

  locationText: {
    marginTop: 3,
    fontSize: 13,
    color: "#6C7A96",
    fontWeight: "500",
  },

  rightHeader: {
    alignItems: "flex-end",
    position: "relative",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
  },

  badgeText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "800",
  },

  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5FA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D7E0F0",
  },

  menuBox: {
    position: "absolute",
    top: 74,
    right: 0,
    width: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6ECF5",
    paddingVertical: 6,
    zIndex: 99,
    elevation: 12,
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
    color: "#C0392B",
  },

  bodyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    padding: 14,
  },

  incidentInfoWrap: {
    marginBottom: 12,
  },

  incidentInfoItem: {
    marginBottom: 10,
  },

  incidentInfoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: ARGUS_BLUE,
    marginBottom: 4,
  },

  incidentInfoValue: {
    fontSize: 14,
    color: "#3E4B61",
    fontWeight: "500",
  },

  detailsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#3E4B61",
    marginBottom: 14,
  },

  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mediaItem: {
    width: "48%",
  },

  mediaBox: {
    backgroundColor: "#F1F5FA",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D7E0F0",
    overflow: "hidden",
  },

  blankMediaBox: {
    justifyContent: "center",
    alignItems: "center",
  },

  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  actionBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F2",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },

  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: ARGUS_BLUE,
  },

  actionCount: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#6C7A96",
  },
});

export default MyUser_RepPost_Layout;