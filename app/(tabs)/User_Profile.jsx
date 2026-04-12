import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import ReportPost_Layout from '../../components/ReportPost_Layout';
// import BottomNavBar from '../../components/BottomNavBar'; // optional

const User_Profile = () => {
  const currentUser = {
    id: 'user_001',
    name: 'Juan Dela Cruz',
    email: 'juandelacruz@gmail.com',
    address: 'Cavite, Philippines',
    avatar: 'https://i.pravatar.cc/300?img=12',
  };

  const reports = [
    {
      id: 'rep_001',
      userId: 'user_001',
      location: 'Barangay San Jose',
      incidentType: 'Suspicious Activity',
      incidentNumber: 'ARG-2026-0001',
      details:
        'A suspicious person was seen walking near the subdivision gate around 10:30 PM.',
      images: ['https://placehold.co/600x400/png'],
      verified: false,
      likes: 12,
      comments: 3,
    },
    {
      id: 'rep_002',
      userId: 'user_001',
      location: 'Poblacion Area',
      incidentType: 'Street Light Issue',
      incidentNumber: 'ARG-2026-0002',
      details:
        'The street light near the waiting shed is not working, making the area too dark at night.',
      images: ['https://placehold.co/600x400/png'],
      verified: true,
      likes: 8,
      comments: 2,
    },
    {
      id: 'rep_003',
      userId: 'user_002',
      location: 'Market Road',
      incidentType: 'Noise Complaint',
      incidentNumber: 'ARG-2026-0003',
      details: 'Loud videoke music was reported past midnight.',
      images: ['https://placehold.co/600x400/png'],
      verified: false,
      likes: 5,
      comments: 1,
    },
  ];

  const currentUserReports = reports
    .filter((report) => report.userId === currentUser.id)
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />

          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
          <Text style={styles.address}>{currentUser.address}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{currentUserReports.length}</Text>
              <Text style={styles.statLabel}>My Reports</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Incident Reports</Text>

        {currentUserReports.map((report) => (
          <ReportPost_Layout
            key={report.id}
            userName={currentUser.name}
            userAvatar={currentUser.avatar}
            location={report.location}
            incidentType={report.incidentType}
            incidentNumber={report.incidentNumber}
            details={report.details}
            images={report.images}
            verified={report.verified}
            likes={report.likes}
            comments={report.comments}
            onLike={() => console.log(`Liked ${report.id}`)}
            onComment={() => console.log(`Commented on ${report.id}`)}
            onAddMedia={() => console.log(`Add media to ${report.id}`)}
            style={styles.reportCardSpacing}
          />
        ))}
      </ScrollView>

      {/* <BottomNavBar /> */}
    </SafeAreaView>
  );
};

export default User_Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 120,
  },
  profileCard: {
    marginHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#8AA9E6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#D9E6FF',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#182033',
  },
  email: {
    fontSize: 14,
    color: '#3F4860',
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: '#7B86A3',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  statBox: {
    minWidth: 120,
    backgroundColor: '#F4F8FF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E5EFF',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#3F4860',
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '800',
    color: '#182033',
  },
  reportCardSpacing: {
    marginBottom: 16,
  },
});