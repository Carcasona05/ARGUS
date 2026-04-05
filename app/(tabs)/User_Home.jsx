import React from 'react'; 
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; 
import ThemedView from '../../components/ThemedView'; 
import ThemedText from '../../components/ThemedText'; 

const incidents = [ { id: '1', type: 'Robbery', desc: 'Victim was held up for wallet and phone.', time: '32 min ago', place: 'Mabin St.', level: 'High', }, 
{ id: '2', type: 'Assault', desc: 'Physical altercation reported near the park entrance.', time: '1 hr ago', place: 'Rizal Ave.', level: 'High', }, 
{ id: '3', type: 'Theft', desc: 'Bike stolen from a public parking area.', time: '2 hrs ago', place: 'Del Pilar St.', level: 'Moderate', }, { id: '4', type: 'Burglary', desc: 'Forced entry reported in a residential home.', time: 'Yesterday', place: 'Aguinaldo St.', level: 'High', }, ]; 

const markers = [ { id: 1, top: 62, left: 62, color: '#F4A62A' }, 
{ id: 2, top: 105, left: 198, color: '#D64545' }, 
{ id: 3, top: 152, left: 118, color: '#D64545' }, 
{ id: 4, top: 178, left: 248, color: '#F4A62A' }, ]; 

const MapPreview = ({ style }) => 
{ return ( 
<View style={[styles.mapCard, style]}> 
<View style={[styles.zone, styles.lowZone]} /> 

<View style={[styles.zone, styles.moderateZone]} /> 
<View style={[styles.zone, styles.highZone]} /> 
<View style={styles.roadLineOne} /> 
<View style={styles.roadLineTwo} /> <View style={styles.roadLineThree} /> <View style={styles.roadLineFour} /> 

<View style={styles.legendWrap}> 
<View style={styles.legendChip}> 

<View style={[styles.legendDot, { backgroundColor: '#76C16E' }]} /> <ThemedText style={styles.legendText}>Low</ThemedText> </View> 


<View style={styles.legendChip}> <View style={[styles.legendDot, { backgroundColor: '#F4A62A' }]} /> <ThemedText style={styles.legendText}>Moderate</ThemedText> </View> 

<View style={styles.legendChip}> <View style={[styles.legendDot, { backgroundColor: '#D64545' }]} /> <ThemedText style={styles.legendText}>High</ThemedText> </View> 

</View> {markers.map((marker) => ( 

<View key={marker.id} style={[ styles.mapMarker, { top: marker.top, left: marker.left, backgroundColor: marker.color, }, ]} > 
<ThemedText style={styles.markerText}>!</ThemedText> </View> ))} <View style={styles.userPin}> <View style={styles.userPinDot} /> </View> 
<View style={styles.userLabel}> <ThemedText style={styles.userLabelText}>You</ThemedText> </View> 
<View style={styles.mapInfoCard}> <View style={styles.mapInfoTop}> <View style={styles.mapInfoTitleRow}> 
<View style={styles.mapAlertDot} /> <ThemedText style={styles.mapInfoTitle}>Area Status</ThemedText> </View> <View style={styles.liveBadge}> 
<ThemedText style={styles.liveBadgeText}>LIVE</ThemedText> </View> </View> 
<ThemedText style={styles.mapInfoSubtitle}> 3 high-risk spots detected near your location. </ThemedText> </View>
 </View> ); }; 
const QuickAction = ({ label, iconText, primary }) => { return ( 

	<TouchableOpacity style={[styles.quickActionButton, primary && styles.quickActionButtonPrimary]} activeOpacity={0.85} > 

	<View style={[ styles.quickActionIcon, primary && styles.quickActionIconPrimary, ]} > 

	<ThemedText style={[ styles.quickActionIconText, primary && styles.quickActionIconTextPrimary, ]} > {iconText} </ThemedText> 

</View> 

<ThemedText style={[ styles.quickActionText, primary && styles.quickActionTextPrimary, ]} > {label} </ThemedText> 

</TouchableOpacity> ); }; const IncidentCard = ({ item }) => { const high = item.level === 'High'; return ( 

<TouchableOpacity style={styles.incidentCard} activeOpacity={0.85}> 

<View style={styles.incidentHeaderRow}> 
<View style={styles.incidentTitleWrap}> 
<View style={[ styles.incidentLevelDot, { backgroundColor: high ? '#D64545' : '#F4A62A' }, ]} /> 

<ThemedText style={styles.incidentType}>{item.type}</ThemedText> </View> <View style={styles.timeBadge}> 

<ThemedText style={styles.timeBadgeText}>{item.time}</ThemedText> </View> 
</View> 

<ThemedText style={styles.incidentPlace}>{item.place}</ThemedText> <ThemedText style={styles.incidentDesc}>{item.desc}</ThemedText> 

<View style={styles.incidentFooterRow}> <View style={[ styles.levelPill, { backgroundColor: high ? '#FDEBEC' : '#FFF3DE' }, ]} > 

<ThemedText style={[ styles.levelPillText, { color: high ? '#C0392B' : '#B9770E' }, ]} > {item.level} Risk </ThemedText> </View> 


<ThemedText style={styles.moreText}>More Details</ThemedText> </View> 

</TouchableOpacity> ); }; const UserHome = () => { return ( 

<ThemedView style={styles.container}> <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} > 


<View style={styles.heroSection}> <View style={styles.pageHeader}> 

<View style={{ flex: 1 }}> <ThemedText style={styles.pageTitle}>Dashboard</ThemedText> 

<ThemedText style={styles.pageSubtitle}> Track nearby incidents, safer routes, and risk zones in real time. </ThemedText> 

</View> </View> <MapPreview style={styles.mapSpacing} /> <View style={styles.statsRow}> <View style={styles.statCard}> 

<ThemedText style={styles.statNumber}>38</ThemedText> <ThemedText style={styles.statLabel}>Total Incidents</ThemedText> </View> 

<View style={styles.statCard}> <ThemedText style={styles.statNumber}>12</ThemedText> <ThemedText style={styles.statLabel}>Robbery Reports</ThemedText> </View> 

<View style={styles.statCard}> <ThemedText style={styles.statNumber}>3</ThemedText> <ThemedText style={styles.statLabel}>High-Risk Zones</ThemedText> </View> </View> 

</View> <View style={styles.alertCard}> <View style={styles.alertIconWrap}> <ThemedText style={styles.alertIconText}>!</ThemedText> </View> 

<View style={styles.alertTextWrap}> <ThemedText style={styles.alertTitle}> Caution: High-risk area nearby </ThemedText> 

<ThemedText style={styles.alertMessage}> Stay alert, avoid walking alone, and keep valuables out of sight while passing through this area. </ThemedText> 

<View style={styles.alertButtonsRow}> 

<TouchableOpacity style={styles.alertPrimaryButton} activeOpacity={0.85}> 
<ThemedText style={styles.alertPrimaryButtonText}> Safety Tips </ThemedText>
</TouchableOpacity> 

<TouchableOpacity style={styles.alertSecondaryButton} activeOpacity={0.85}> 
<ThemedText style={styles.alertSecondaryButtonText}> Open Map </ThemedText> 
</TouchableOpacity> 

</View> 
</View> 
</View> 
<View style={styles.sectionBlock}> 


 
 <View style={styles.sectionHeaderRow}> <ThemedText style={styles.sectionTitle}>Recent Incidents</ThemedText> 

 <TouchableOpacity activeOpacity={0.85}> <ThemedText style={styles.viewAllText}>View All</ThemedText> </TouchableOpacity> 

 </View> {incidents.map((item) => ( <IncidentCard key={item.id} item={item} /> ))} </View> </ScrollView> 
 </ThemedView> ); }; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 28,
  },
  heroSection: {
    marginBottom: 14,
  },
  pageHeader: {
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#294880',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#68758A',
  },
  mapSpacing: {
    marginBottom: 12,
  },
  mapCard: {
    height: 250,
    borderRadius: 24,
    backgroundColor: '#EEF2F7',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  zone: {
    position: 'absolute',
    borderRadius: 26,
    opacity: 0.28,
  },
  lowZone: {
    width: 110,
    height: 180,
    backgroundColor: '#76C16E',
    top: 44,
    left: 18,
    transform: [{ rotate: '-24deg' }],
  },
  moderateZone: {
    width: 110,
    height: 170,
    backgroundColor: '#F4A62A',
    top: 66,
    left: 104,
    transform: [{ rotate: '-23deg' }],
  },
  highZone: {
    width: 145,
    height: 280,
    backgroundColor: '#D64545',
    top: 12,
    right: 20,
    transform: [{ rotate: '-24deg' }],
  },
  roadLineOne: {
    position: 'absolute',
    width: 420,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    top: 58,
    left: -20,
    transform: [{ rotate: '-20deg' }],
  },
  roadLineTwo: {
    position: 'absolute',
    width: 420,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    top: 116,
    left: -30,
    transform: [{ rotate: '-18deg' }],
  },
  roadLineThree: {
    position: 'absolute',
    width: 12,
    height: 260,
    backgroundColor: 'rgba(255,255,255,0.7)',
    top: -10,
    left: 92,
    transform: [{ rotate: '22deg' }],
  },
  roadLineFour: {
    position: 'absolute',
    width: 12,
    height: 280,
    backgroundColor: 'rgba(255,255,255,0.7)',
    top: -10,
    right: 72,
    transform: [{ rotate: '18deg' }],
  },
  legendWrap: {
    position: 'absolute',
    top: 14,
    left: 12,
    flexDirection: 'row',
  },
  legendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4A5568',
  },
  mapMarker: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    marginTop: -1,
  },
  userPin: {
    position: 'absolute',
    bottom: 70,
    left: 160,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DCE6F8',
  },
  userPinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D8CFF',
  },
  userLabel: {
    position: 'absolute',
    bottom: 44,
    left: 146,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  userLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  mapInfoCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 18,
    padding: 12,
  },
  mapInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapInfoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapAlertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D64545',
    marginRight: 8,
  },
  mapInfoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  mapInfoSubtitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  liveBadge: {
    backgroundColor: '#FFE8E8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C53030',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7ECF3',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#294880',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 15,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F6D8D8',
  },
  alertIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FDECEC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertIconText: {
    color: '#D64545',
    fontSize: 20,
    fontWeight: '900',
  },
  alertTextWrap: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#C0392B',
    marginBottom: 6,
  },
  alertMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5F6B7A',
    marginBottom: 12,
  },
  alertButtonsRow: {
    flexDirection: 'row',
  },
  alertPrimaryButton: {
    backgroundColor: '#D64545',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
  },
  alertPrimaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  alertSecondaryButton: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  alertSecondaryButtonText: {
    color: '#294880',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionBlock: {
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2A37',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#294880',
  },
  
  incidentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7ECF3',
  },
  incidentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incidentTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incidentLevelDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  incidentType: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  timeBadge: {
    backgroundColor: '#F4F7FB',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  incidentPlace: {
    fontSize: 13,
    fontWeight: '700',
    color: '#667085',
    marginTop: 8,
    marginBottom: 6,
  },
  incidentDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5F6B7A',
  },
  incidentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  levelPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  levelPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  moreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D64545',
  },
});

export default UserHome;