import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReportPost_Layout = ({
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
  style,
}) => {
  const { width } = useWindowDimensions();
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
          
        </TouchableOpacity>
      );
    }

    return <View style={[styles.mediaBox, { height: mediaHeight }]} />;
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
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
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
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

export default ReportPost_Layout;