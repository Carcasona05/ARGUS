import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReportItem = ({ location, incidentType, status, description, timeAgo, likes, comments }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.leftSection}>
          <Ionicons name="location" size={24} color="#FFCC00" />
          <View style={styles.textSection}>
            <Text style={styles.incidentType}>{incidentType}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, status === 'Verified' ? styles.verified : styles.inReview]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.footerRow}>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action}>
            <Ionicons name="thumbs-up" size={20} color="#294880" />
            <Text style={styles.actionText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Ionicons name="chatbubble" size={20} color="#294880" />
            <Text style={styles.actionText}>{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textSection: {
    marginLeft: 10,
    flex: 1,
  },
  incidentType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#294880',
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  verified: {
    backgroundColor: '#4CAF50',
  },
  inReview: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 12,
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  actionText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#555',
  },
});

export default ReportItem;