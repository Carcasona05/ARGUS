import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

const PRIMARY = "#294880";

const FONT = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
};

const MyUser_RepPost_Layout = ({
  id = Date.now().toString(),
  userName = "You",
  userAvatar = null,
  location = "Location not specified",
  datePosted = "Just now",
  incidentCategory = "Not specified",
  incidentType = "Not specified",
  details = "No details provided.",
  images = [],
  status = "Pending Review",
  likes = 0,
  comments = 0,
  commentList = [],
  onLike = () => {},
  onComment = () => {},
  onDelete = () => {},
  style,
}) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const cardWidth = Math.min(width - 24, 430);
  const avatarSize = isSmallScreen ? 42 : 46;
  const iconSize = isSmallScreen ? 18 : 20;
  const mediaHeight = isSmallScreen ? 140 : 165;

  const firstImage = images?.[0] || null;
  const secondImage = images?.[1] || null;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={PRIMARY} />
      </View>
    );
  }

  const getImageSource = (img) => {
    if (!img) return null;
    return typeof img === "string" ? { uri: img } : img;
  };

  const normalizeStatus = (value) => {
    const current = String(value || "").toLowerCase();

    if (current.includes("under")) return "Under Verification";
    if (current.includes("resolved")) return "Resolved";
    if (current.includes("reject")) return "Rejected";
    if (current.includes("archive")) return "Archived";
    if (current.includes("verified")) return "Resolved";
    if (current.includes("pending")) return "Pending Review";

    return "Pending Review";
  };

  const getStatusData = () => {
    const currentStatus = normalizeStatus(status);

    switch (currentStatus) {
      case "Under Verification":
        return {
          label: "Under Verification",
          icon: "search-circle-outline",
          color: PRIMARY,
        };

      case "Resolved":
        return {
          label: "Resolved",
          icon: "checkmark-circle-outline",
          color: "#237A4B",
        };

      case "Rejected":
        return {
          label: "Rejected",
          icon: "close-circle-outline",
          color: "#C0392B",
        };

      case "Archived":
        return {
          label: "Archived",
          icon: "archive-outline",
          color: "#64748B",
        };

      default:
        return {
          label: "Pending Review",
          icon: "time-outline",
          color: "#9A6A00",
        };
    }
  };

  const handleEdit = () => {
    setMenuOpen(false);

    const reportData = {
      id,
      userName,
      userAvatar,
      location,
      datePosted,
      incidentCategory,
      incidentType,
      details,
      images,
      status,
      likes,
      comments,
      commentList,
    };

    router.push({
      pathname: "/MyUser_RepPostView_Edit",
      params: {
        report: JSON.stringify(reportData),
      },
    });
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete();
  };

  const statusData = getStatusData();

  const renderAvatar = () => {
    const avatarSource = getImageSource(userAvatar);

    if (avatarSource) {
      return (
        <Image
          source={avatarSource}
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      );
    }

    return (
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
          name="person-outline"
          size={avatarSize * 0.5}
          color={PRIMARY}
        />
      </View>
    );
  };

  const renderImages = () => {
    const firstSource = getImageSource(firstImage);
    const secondSource = getImageSource(secondImage);

    if (!firstSource && !secondSource) {
      return (
        <View style={[styles.singleImagePlaceholder, { height: mediaHeight }]}>
          <Ionicons name="image-outline" size={24} color="#9CA3AF" />
          <Text style={styles.placeholderText}>No image attached</Text>
        </View>
      );
    }

    if (firstSource && !secondSource) {
      return (
        <Image
          source={firstSource}
          style={[styles.singleImage, { height: mediaHeight }]}
        />
      );
    }

    return (
      <View style={styles.imageRow}>
        {firstSource ? (
          <Image
            source={firstSource}
            style={[styles.doubleImage, { height: mediaHeight }]}
          />
        ) : null}

        {secondSource ? (
          <Image
            source={secondSource}
            style={[styles.doubleImage, { height: mediaHeight }]}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.wrapper, { width: cardWidth }, style]}>
      <View style={styles.header}>
        <View style={styles.userSection}>
          {renderAvatar()}

          <View style={styles.userTextWrap}>
            <Text style={styles.userName} numberOfLines={1}>
              {userName || "You"}
            </Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={13} color="#7B8794" />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>

            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
              <Text style={styles.dateText} numberOfLines={1}>
                {datePosted}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.statusWrap}>
            <Ionicons
              name={statusData.icon}
              size={14}
              color={statusData.color}
            />
            <Text style={[styles.statusText, { color: statusData.color }]}>
              {statusData.label}
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
                onPress={handleEdit}
              >
                <Ionicons name="create-outline" size={16} color={PRIMARY} />
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.75}
                onPress={handleDelete}
              >
                <Ionicons name="trash-outline" size={16} color="#C0392B" />
                <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.categoryText}>{incidentCategory}</Text>

        <Text style={styles.typeText} numberOfLines={2}>
          {incidentType}
        </Text>

        <Text style={styles.detailsText}>{details}</Text>

        {renderImages()}
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={onLike}
        >
          <Ionicons name="thumbs-up-outline" size={iconSize} color={PRIMARY} />
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
            color={PRIMARY}
          />
          <Text style={styles.actionText}>Comment</Text>
          <Text style={styles.actionCount}>{comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E4EBF7",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    overflow: "visible",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
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
    backgroundColor: "#E8EEF9",
  },

  avatarPlaceholder: {
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
  },

  userTextWrap: {
    flex: 1,
    marginLeft: 11,
  },

  userName: {
    fontFamily: FONT.semiBold,
    fontSize: 15,
    color: "#1F2A37",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  locationText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 11.5,
    color: "#7B8794",
    marginLeft: 4,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  dateText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 11,
    color: "#9CA3AF",
    marginLeft: 4,
  },

  headerRight: {
    alignItems: "flex-end",
    position: "relative",
  },

  statusWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  statusText: {
    fontFamily: FONT.medium,
    marginLeft: 4,
    fontSize: 11,
  },

  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6FB",
    borderWidth: 1,
    borderColor: "#E4EBF7",
  },

  menuBox: {
    position: "absolute",
    top: 64,
    right: 0,
    width: 128,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4EBF7",
    paddingVertical: 6,
    zIndex: 99,
    elevation: 10,
    shadowColor: "#000000",
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
    fontFamily: FONT.medium,
    fontSize: 13,
    color: "#1F2A37",
    marginLeft: 8,
  },

  deleteText: {
    color: "#C0392B",
  },

  content: {
    paddingTop: 2,
  },

  categoryText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: "#7B8794",
    marginBottom: 2,
  },

  typeText: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: "#1F2A37",
    marginBottom: 8,
  },

  detailsText: {
    fontFamily: FONT.regular,
    fontSize: 13,
    color: "#3E4B61",
    lineHeight: 21,
    marginBottom: 13,
  },

  singleImage: {
    width: "100%",
    borderRadius: 16,
    resizeMode: "cover",
    backgroundColor: "#E4EBF7",
  },

  singleImagePlaceholder: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#F3F6FB",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D7E0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontFamily: FONT.regular,
    marginTop: 5,
    fontSize: 12,
    color: "#9CA3AF",
  },

  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  doubleImage: {
    width: "48.5%",
    borderRadius: 16,
    resizeMode: "cover",
    backgroundColor: "#E4EBF7",
  },

  actionBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E4EBF7",
    marginTop: 13,
    paddingTop: 4,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 11,
  },

  actionText: {
    fontFamily: FONT.medium,
    marginLeft: 6,
    fontSize: 13,
    color: PRIMARY,
  },

  actionCount: {
    fontFamily: FONT.regular,
    marginLeft: 6,
    fontSize: 13,
    color: "#6C7A96",
  },
});

export default MyUser_RepPost_Layout;