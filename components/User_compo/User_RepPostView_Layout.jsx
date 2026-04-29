import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ARGUS_BLUE = "#294880";

const User_RepPostView_Layout = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.commentList || []);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      user: "You",
      text: commentText.trim(),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  if (!post) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={38} color={ARGUS_BLUE} />
        <Text style={styles.emptyText}>No post data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.avatarWrap}>
            {post.userAvatar ? (
              <Image source={post.userAvatar} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={22} color={ARGUS_BLUE} />
            )}
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.userName}>
              {post.userName || "Anonymous User"}
            </Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text style={styles.locationText}>{post.location}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              post.verified ? styles.verifiedBadge : styles.unverifiedBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                post.verified ? styles.verifiedText : styles.unverifiedText,
              ]}
            >
              {post.verified ? "Verified" : "Pending"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsBox}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Category</Text>
            <Text style={styles.detailsValue}>{post.incidentCategory}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Incident Type</Text>
            <Text style={styles.detailsValue}>{post.incidentType}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Location</Text>
            <Text style={styles.detailsValue}>{post.location}</Text>
          </View>
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Report Details</Text>
          <Text style={styles.descriptionText}>{post.details}</Text>
        </View>

        {post.images?.length > 0 ? (
          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Attached Photos</Text>

            <View style={styles.photoGrid}>
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  source={typeof image === "string" ? { uri: image } : image}
                  style={[
                    styles.postImage,
                    post.images.length === 1 && styles.singlePostImage,
                  ]}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.noPhotoBox}>
            <Ionicons name="image-outline" size={24} color="#94A3B8" />
            <Text style={styles.noPhotoText}>No photo attached</Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="heart-outline" size={18} color={ARGUS_BLUE} />
            <Text style={styles.summaryText}>{post.likes || 0} Likes</Text>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="chatbubble-outline" size={18} color={ARGUS_BLUE} />
            <Text style={styles.summaryText}>{comments.length} Comments</Text>
          </View>
        </View>
      </View>

      <View style={styles.commentsCard}>
        <Text style={styles.commentsTitle}>Comments</Text>

        {comments.length === 0 ? (
          <Text style={styles.noCommentsText}>No comments yet.</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentAvatar}>
                <Ionicons name="person" size={14} color={ARGUS_BLUE} />
              </View>

              <View style={styles.commentBubble}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.commentInputRow}>
          <TextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write a comment..."
            placeholderTextColor="#9CA3AF"
            multiline
          />

          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.8}
            onPress={handleAddComment}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 32,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    marginBottom: 14,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  headerTextWrap: {
    flex: 1,
  },

  userName: {
    fontSize: 15,
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

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
  },

  verifiedBadge: {
    backgroundColor: "#DCFCE7",
  },

  unverifiedBadge: {
    backgroundColor: "#FEF3C7",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  verifiedText: {
    color: "#16A34A",
  },

  unverifiedText: {
    color: "#D97706",
  },

  detailsBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    marginBottom: 12,
  },

  detailsItem: {
    marginBottom: 10,
  },

  detailsLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 3,
  },

  detailsValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2A37",
  },

  descriptionBox: {
    marginBottom: 12,
  },

  descriptionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 6,
  },

  descriptionText: {
    fontSize: 13,
    lineHeight: 21,
    color: "#374151",
  },

  photoSection: {
    marginBottom: 12,
  },

  photoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 8,
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  postImage: {
    width: "48%",
    height: 150,
    borderRadius: 16,
    backgroundColor: "#E8EEF9",
  },

  singlePostImage: {
    width: "100%",
    height: 220,
  },

  noPhotoBox: {
    minHeight: 80,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#DDE7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  noPhotoText: {
    marginTop: 6,
    fontSize: 12,
    color: "#94A3B8",
  },

  summaryRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
    paddingTop: 12,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },

  summaryText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "700",
    color: ARGUS_BLUE,
  },

  commentsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },

  commentsTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 12,
  },

  noCommentsText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },

  commentItem: {
    flexDirection: "row",
    marginBottom: 12,
  },

  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E8EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  commentBubble: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 10,
  },

  commentUser: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1F2A37",
    marginBottom: 3,
  },

  commentText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#374151",
  },

  commentInputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
    paddingTop: 12,
  },

  commentInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 90,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E1E8F2",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111827",
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ARGUS_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});

export default User_RepPostView_Layout;