import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ARGUS_BLUE = "#294880";

const MyUser_RepPostView_Layout = ({ report, onEdit, onDelete }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(report?.commentList || []);
  }, [report]);

  const getStatusStyle = () => {
    if (report?.status === "Verified" || report?.verified === true) {
      return {
        bg: "#DCFCE7",
        color: "#16A34A",
        label: "Verified",
      };
    }

    if (report?.status === "Rejected") {
      return {
        bg: "#FEE2E2",
        color: "#DC2626",
        label: "Rejected",
      };
    }

    return {
      bg: "#FEF3C7",
      color: "#D97706",
      label: report?.status || "Pending",
    };
  };

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

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      return;
    }

    Alert.alert("Delete Report", "Delete function will be connected later.");
  };

  const renderImageSource = (image) => {
    if (typeof image === "string") {
      return { uri: image };
    }

    return image;
  };

  if (!report) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={38} color={ARGUS_BLUE} />
        <Text style={styles.emptyText}>No report data found.</Text>
      </View>
    );
  }

  const statusStyle = getStatusStyle();

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
            {report.userAvatar ? (
              <Image
                source={renderImageSource(report.userAvatar)}
                style={styles.avatarImage}
              />
            ) : (
              <Ionicons name="person" size={22} color={ARGUS_BLUE} />
            )}
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.userName}>{report.userName || "You"}</Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text style={styles.locationText} numberOfLines={1}>
                {report.location || "No location provided"}
              </Text>
            </View>
          </View>

          <View
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
          >
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        <View style={styles.ownerActions}>
          <TouchableOpacity
            style={styles.ownerButton}
            activeOpacity={0.8}
            onPress={onEdit}
          >
            <Ionicons name="create-outline" size={17} color={ARGUS_BLUE} />
            <Text style={styles.ownerButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ownerButton, styles.deleteButton]}
            activeOpacity={0.8}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={17} color="#DC2626" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsBox}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Category</Text>
            <Text style={styles.detailsValue}>
              {report.incidentCategory || "No category"}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Incident Type</Text>
            <Text style={styles.detailsValue}>
              {report.incidentType || "No incident type"}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsLabel}>Location</Text>
            <Text style={styles.detailsValue}>
              {report.location || "No location provided"}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Report Details</Text>
          <Text style={styles.descriptionText}>
            {report.details || "No report details provided."}
          </Text>
        </View>

        {report.images?.length > 0 ? (
          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Attached Photos</Text>

            <View style={styles.photoGrid}>
              {report.images.map((image, index) => (
                <Image
                  key={index}
                  source={renderImageSource(image)}
                  style={[
                    styles.postImage,
                    report.images.length === 1 && styles.singlePostImage,
                  ]}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.blankPhotoBox}>
            <Ionicons name="image-outline" size={30} color="#94A3B8" />
            <Text style={styles.blankPhotoText}>No image attached</Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="heart-outline" size={18} color={ARGUS_BLUE} />
            <Text style={styles.summaryText}>{report.likes || 0} Likes</Text>
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
    marginBottom: 12,
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

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  ownerActions: {
    flexDirection: "row",
    marginBottom: 12,
  },

  ownerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EEF9",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },

  ownerButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: ARGUS_BLUE,
    marginLeft: 5,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
  },

  deleteButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#DC2626",
    marginLeft: 5,
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

  blankPhotoBox: {
    width: "100%",
    height: 170,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#DDE7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  blankPhotoText: {
    marginTop: 8,
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

export default MyUser_RepPostView_Layout;