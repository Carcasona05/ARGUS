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

const MyUserPost_Layout = ({
  userName = "Unknown User",
  userAvatar = null,
  location = "Not specified",
  incidentCategory = "Not specified",
  incidentType = "Not specified",
  details = "No details provided.",
  images = [],
  verified = false,
  likes = 0,
  comments = 0,
  onLike = () => {},
  onComment = () => {},
  onAddMedia = () => {},
  onEdit = () => {},
  onDelete = () => {},
  style,
}) => {
  const { width } = useWindowDimensions();
  const [showMenu, setShowMenu] = useState(false);

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

  const handleEdit = () => {
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  const renderMediaBox = (img, isAddBox = false) => {
    const source = getImageSource(img);

    if (source) {
      return (
        <View style={[styles.mediaBox, { height: mediaHeight }]}>
          <Image source={source} style={styles.mediaImage} />
        </View>
      );
    }

    if (isAddBox) {
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onAddMedia}
          style={[styles.mediaBox, styles.addMediaBox, { height: mediaHeight }]}
        >
          <Ionicons name="add" size={28} color="#294880" />
          <Text style={styles.addMediaText}>Add media</Text>
        </TouchableOpacity>
      );
    }

    return <View style={[styles.mediaBox, { height: mediaHeight }]} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setShowMenu(false)}
      style={[styles.wrapper, { width: cardWidth }, style]}
    >
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
                  color="#294880"
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

          <View style={styles.headerRight}>
            <View
              style={[
                styles.badge,
                verified ? styles.verifiedBadge : styles.unverifiedBadge,
              ]}
            >
              <Ionicons
                name={verified ? "shield-checkmark" : "alert-circle"}
                size={14}
                color={verified ? "#237A4B" : "#9A6A00"}
              />

              <Text
                style={[
                  styles.badgeText,
                  { color: verified ? "#237A4B" : "#9A6A00" },
                ]}
              >
                {verified ? "VERIFIED" : "UNVERIFIED"}
              </Text>
            </View>

            <View style={styles.menuWrapper}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.menuButton}
                onPress={(event) => {
                  event.stopPropagation();
                  setShowMenu(!showMenu);
                }}
              >
                <Ionicons name="ellipsis-horizontal" size={22} color="#294880" />
              </TouchableOpacity>

              {showMenu && (
                <View style={styles.menuDropdown}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.menuItem}
                    onPress={handleEdit}
                  >
                    <View style={styles.menuIconBox}>
                      <Ionicons name="create-outline" size={18} color="#294880" />
                    </View>

                    <Text style={styles.menuText}>Edit</Text>
                  </TouchableOpacity>

                  <View style={styles.menuDivider} />

                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.menuItem}
                    onPress={handleDelete}
                  >
                    <View style={[styles.menuIconBox, styles.deleteIconBox]}>
                      <Ionicons name="trash-outline" size={18} color="#DC2626" />
                    </View>

                    <Text style={styles.deleteMenuText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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

            <View style={styles.mediaItem}>
              {secondImage
                ? renderMediaBox(secondImage)
                : renderMediaBox(null, true)}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={onLike}
        >
          <Ionicons name="thumbs-up-outline" size={iconSize} color="#294880" />
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
            color="#294880"
          />
          <Text style={styles.actionText}>Comment</Text>
          <Text style={styles.actionCount}>{comments}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    position: "relative",
    zIndex: 1,
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
    color: "#294880",
  },

  locationText: {
    marginTop: 3,
    fontSize: 13,
    color: "#6C7A96",
    fontWeight: "500",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    position: "relative",
    zIndex: 30,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  verifiedBadge: {
    backgroundColor: "#E8F7EE",
  },

  unverifiedBadge: {
    backgroundColor: "#FFF4D6",
  },

  badgeText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "800",
  },

  menuWrapper: {
    position: "relative",
    zIndex: 50,
  },

  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#EAF0FA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D7E0F0",
  },

  menuDropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
    paddingVertical: 6,
    zIndex: 100,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  menuIconBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EAF0FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  deleteIconBox: {
    backgroundColor: "#FDECEC",
  },

  menuText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#294880",
  },

  deleteMenuText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#EEF3FA",
    marginHorizontal: 10,
  },

  bodyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    padding: 14,
    zIndex: 1,
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
    color: "#294880",
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

  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  addMediaBox: {
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  addMediaText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#294880",
  },

  actionBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F2",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: "hidden",
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
    color: "#294880",
  },

  actionCount: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#6C7A96",
  },
});

export default MyUserPost_Layout;