import React, { useState } from 'react'; 
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; import { useRouter } from 'expo-router'; 
import ThemedView from '../../components/ThemedView'; import ThemedText from '../../components/ThemedText'; 

const UserSettings = () => { 
	const router = useRouter(); 
	const [notifications, setNotifications] = useState(true); 
	const [crimeAlerts, setCrimeAlerts] = useState(true); 
	const handleLogout = () => { router.push('../(auth)/User_Login'); }; 
	const SettingItem = ({ icon, iconBg, iconColor, title, subtitle, onPress, rightComponent, showBorder = true, }) => ( 
		<TouchableOpacity style={[styles.settingItem, !showBorder && styles.noBorder]} activeOpacity={0.88} onPress={onPress} disabled={!onPress} > <View style={[styles.iconWrap, { backgroundColor: iconBg }]}> <Ionicons name={icon} size={18} color={iconColor} /> </View> <View style={styles.settingTextWrap}> <ThemedText style={styles.settingTitle}>{title}</ThemedText> {subtitle ? ( <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText> ) : null} </View> {rightComponent} </TouchableOpacity> ); return ( <ThemedView style={styles.container}> 
		<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} > 
		<View style={styles.headerSection}> <ThemedText style={styles.pageTitle}>Settings</ThemedText> 
		<ThemedText style={styles.pageSubtitle}> Manage your account, notifications, privacy, and security preferences. </ThemedText>
		 </View> 
		<View style={styles.profileCard}> <View style={styles.avatarCircle}> <Ionicons name="person" size={24} color="#294880" /> 
		</View> 
		<View style={styles.profileInfo}> <ThemedText style={styles.profileName}>SafeZone User</ThemedText> <ThemedText style={styles.profileEmail}> youraccount@email.com 
		</ThemedText> </View> 
		<TouchableOpacity style={styles.editButton} activeOpacity={0.88} onPress={() => router.push('/User_ProfileSettings')} >
		 <ThemedText style={styles.editButtonText}>Edit</ThemedText> </TouchableOpacity> </View> <View style={styles.sectionCard}> 
		 <ThemedText style={styles.sectionTitle}>Account</ThemedText> 
		 <SettingItem icon="person-outline" iconBg="#EEF3FF" iconColor="#294880" title="Personal Information" subtitle="Update your basic profile details" onPress={() => router.push('/User_ProfileSettings')} rightComponent={ <Ionicons name="chevron-forward" size={18} color="#94A3B8" /> } /> 
		 <SettingItem icon="lock-closed-outline" iconBg="#F2EEFF" iconColor="#6C4CE3" title="Password & Security" subtitle="Change password and secure your account" onPress={() => router.push('/User_Password&Security')} rightComponent={ <Ionicons name="chevron-forward" size={18} color="#94A3B8" /> } showBorder={false} /> </View> <View style={styles.sectionCard}> <ThemedText style={styles.sectionTitle}>Preferences</ThemedText> <SettingItem icon="notifications-outline" iconBg="#FFF4DD" iconColor="#E7A11A" title="Notifications" subtitle="Receive app updates and important reminders" rightComponent={ <Switch trackColor={{ false: '#D1D5DB', true: '#BFD2FF' }} thumbColor={notifications ? '#294880' : '#F9FAFB'} onValueChange={setNotifications} value={notifications} /> } /> 
		 <SettingItem icon="warning-outline" iconBg="#FFEAEA" iconColor="#D64545" title="Crime Alert Settings" subtitle="Enable alerts for incidents near your location" rightComponent={ <Switch trackColor={{ false: '#D1D5DB', true: '#FFD2D2' }} thumbColor={crimeAlerts ? '#D64545' : '#F9FAFB'} onValueChange={setCrimeAlerts} value={crimeAlerts} /> } /> <SettingItem icon="help-circle-outline" iconBg="#EAF8F0" iconColor="#2E9E5B" title="Help & Support" subtitle="Get assistance and answers to common issues" onPress={() => {}} rightComponent={ <Ionicons name="chevron-forward" size={18} color="#94A3B8" /> } showBorder={false} /> </View> <View style={styles.dangerCard}> <View style={styles.dangerTop}> <View style={styles.dangerIconWrap}> <Ionicons name="log-out-outline" size={20} color="#D64545" /> </View> <View style={styles.dangerTextWrap}> 
		 <ThemedText style={styles.dangerTitle}>Logout</ThemedText>
		  <ThemedText style={styles.dangerSubtitle}> Sign out of your account on this device. </ThemedText> </View> 
		  </View> <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.88} >
		   <ThemedText style={styles.logoutText}>Logout</ThemedText> </TouchableOpacity> </View> </ScrollView> </ThemedView> ); }; 


		const styles = StyleSheet.create({ 
      container: { flex: 1, backgroundColor: '#F3F6FB', }, 

      scrollContainer: { flex: 1, }, 

			scrollContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 28, }, 
      
      headerSection: { marginBottom: 16, },

			pageTitle: { fontSize: 28, fontWeight: '800', color: '#294880', marginBottom: 6, }, 

      pageSubtitle: { fontSize: 13, lineHeight: 20, color: '#68758A', }, 
      
      profileCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, borderWidth: 1, borderColor: '#E7ECF3', flexDirection: 'row', alignItems: 'center', marginBottom: 14, }, 
      
      avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#EEF3FF', alignItems: 'center', justifyContent: 'center', marginRight: 12, }, profileInfo: { flex: 1, }, profileName: { fontSize: 16, fontWeight: '800', color: '#1F2A37', marginBottom: 4, }, profileEmail: { fontSize: 12, color: '#6B7280', }, editButton: { backgroundColor: '#294880', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, }, editButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', }, sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 22, paddingHorizontal: 14, paddingTop: 16, paddingBottom: 4, borderWidth: 1, borderColor: '#E7ECF3', marginBottom: 14, }, sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2A37', marginBottom: 8, }, settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEF2F7', }, noBorder: { borderBottomWidth: 0, }, iconWrap: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginRight: 12, }, settingTextWrap: { flex: 1, marginRight: 10, }, 
      settingTitle: { fontSize: 14, fontWeight: '700', color: '#1F2A37', marginBottom: 3, }, settingSubtitle: { fontSize: 12, lineHeight: 18, color: '#6B7280', }, dangerCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, borderWidth: 1, borderColor: '#F6D8D8', }, 
      dangerTop: { flexDirection: 'row', marginBottom: 14, }, dangerIconWrap: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FDEBEC', alignItems: 'center', justifyContent: 'center', marginRight: 12, }, dangerTextWrap: { flex: 1, }, 
      dangerTitle: { fontSize: 17, fontWeight: '800', color: '#C0392B', marginBottom: 4, }, dangerSubtitle: { fontSize: 13, lineHeight: 19, color: '#5F6B7A', }, logoutButton: { backgroundColor: '#D64545', borderRadius: 999, paddingVertical: 13, alignItems: 'center', justifyContent: 'center', }, logoutText: { fontSize: 13, color: '#FFFFFF', fontWeight: '800', }, }); 
export default UserSettings;

