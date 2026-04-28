import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const User_ViewPost = ({ post, onBack }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const safePost = post || {
    id: "report_001",
    userName: "Anonymous User",
    userAvatar: null,
    location: "Mabini Street, Manila",
    incidentCategory: "Suspicious Activities",
    incidentType: "Loitering / Suspicious Presence",
    details:
      "A suspicious person was seen loitering near the gate around 9:30 PM.",
    verified: true,
    likes: 12,
    comments: 2,
    images: [],
    commentList: [],
  };

  const [comments, setComments] = useState(safePost.commentList || []);
  const [newComment, setNewComment] = useState("");

  const avatarSize = isSmallScreen ? 46 : 54;
  const iconSize = isSmallScreen ? 18 : 20;
  const mediaHeight = isSmallScreen ? 120 : 145;

  const getImageSource = (img) => {
    if (!img) return null;
    return typeof img === "string" ? { uri: img } : img;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentToAdd = {
      id: Date.now().toString(),
      user: "Anonymous User",
      text: newComment.trim(),
    };

    setComments((prev) => [...prev, commentToAdd]);
    setNewComment("");
  };

  const renderMediaBox = (img) => {
    const source = getImageSource(img);

    if (!source) {
      return (
        <View
          style={[styles.mediaBox, styles.emptyMediaBox, { height: mediaHeight }]}
        >
          <Ionicons name="image-outline" size={28} color="#8AA0C8" />
          <Text style={styles.emptyMediaText}>No media</Text>
        </View>
      );
    }

    return (
      <View style={[styles.mediaBox, { height: mediaHeight }]}>
        <Image source={source} style={styles.mediaImage} />
      </View>
    );
  };

  const firstImage = safePost.images?.[0] || null;
  const secondImage = safePost.images?.[1] || null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.85}
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={20} color="#294880" />
          </TouchableOpacity>

          <Text style={styles.topBarTitle}>Post Details</Text>

          <View style={styles.topBarSpacer} />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.postWrapper}>
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <View style={styles.userSection}>
                  {safePost.userAvatar ? (
                    <Image
                      source={getImageSource(safePost.userAvatar)}
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
                      {safePost.userName || "Anonymous User"}
                    </Text>
                    <Text style={styles.locationText} numberOfLines={1}>
                      {safePost.location}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.badge,
                    safePost.verified
                      ? styles.verifiedBadge
                      : styles.unverifiedBadge,
                  ]}
                >
                  <Ionicons
                    name={safePost.verified ? "shield-checkmark" : "alert-circle"}
                    size={14}
                    color={safePost.verified ? "#237A4B" : "#9A6A00"}
                  />
                  <Text
                    style={[
                      styles.badgeText,
                      { color: safePost.verified ? "#237A4B" : "#9A6A00" },
                    ]}
                  >
                    {safePost.verified ? "VERIFIED" : "UNVERIFIED"}
                  </Text>
                </View>
              </View>

              <View style={styles.bodyCard}>
                <View style={styles.incidentInfoWrap}>
                  <View style={styles.incidentInfoItem}>
                    <Text style={styles.incidentInfoLabel}>Incident Category</Text>
                    <Text style={styles.incidentInfoValue}>
                      {safePost.incidentCategory}
                    </Text>
                  </View>

                  <View style={styles.incidentInfoItem}>
                    <Text style={styles.incidentInfoLabel}>Incident Type</Text>
                    <Text style={styles.incidentInfoValue}>
                      {safePost.incidentType}
                    </Text>
                  </View>
                </View>

                <Text style={styles.detailsText}>{safePost.details}</Text>

                <View style={styles.mediaRow}>
                  <View style={styles.mediaItem}>{renderMediaBox(firstImage)}</View>
                  <View style={styles.mediaItem}>{renderMediaBox(secondImage)}</View>
                </View>
              </View>
            </View>

            <View style={styles.actionBar}>
              <View style={styles.actionButton}>
                <Ionicons
                  name="thumbs-up-outline"
                  size={iconSize}
                  color="#294880"
                />
                <Text style={styles.actionText}>Like</Text>
                <Text style={styles.actionCount}>{safePost.likes}</Text>
              </View>

              <View style={styles.actionButton}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={iconSize}
                  color="#294880"
                />
                <Text style={styles.actionText}>Comment</Text>
                <Text style={styles.actionCount}>{comments.length}</Text>
              </View>
            </View>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentSectionTitle}>Comments</Text>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <View style={styles.commentAvatar}>
                      <Ionicons name="person" size={16} color="#294880" />
                    </View>
                    <Text style={styles.commentUser}>{comment.user}</Text>
                  </View>

                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateCard}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={30}
                  color="#8AA0C8"
                />
                <Text style={styles.emptyStateText}>
                  No comments yet. Be the first to comment.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            placeholderTextColor="#8A94A6"
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.85}
            onPress={handleAddComment}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User_ViewPost;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F3F6FB" },
  container: { flex: 1, backgroundColor: "#F3F6FB" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    backgroundColor: "#F3F6FB",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F2",
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#294880",
  },
  topBarSpacer: { width: 42 },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingHorizontal: 12, paddingBottom: 20 },
  postWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    marginVertical: 8,
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
  userTextWrap: { flex: 1, marginLeft: 12 },
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
  verifiedBadge: { backgroundColor: "#E8F7EE" },
  unverifiedBadge: { backgroundColor: "#FFF4D6" },
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
  incidentInfoWrap: { marginBottom: 12 },
  incidentInfoItem: { marginBottom: 10 },
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
  mediaItem: { width: "48%" },
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
  emptyMediaBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMediaText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#6C7A96",
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
  commentSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  commentSectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#294880",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  commentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EAF0FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D7E0F0",
  },
  commentUser: {
    fontSize: 13,
    fontWeight: "800",
    color: "#294880",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#3E4B61",
  },
  emptyStateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    alignItems: "center",
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 13,
    color: "#7D8CA6",
    textAlign: "center",
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F2",
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 100,
    backgroundColor: "#F7FAFF",
    borderWidth: 1,
    borderColor: "#D8E2F0",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F2A37",
    marginRight: 10,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#294880",
    justifyContent: "center",
    alignItems: "center",
  },
});