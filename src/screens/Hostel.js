import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Hostel = props => {
  const {globalState, setGlobalState} = useAppContext();
  const {navigation, route} = props;
  const [selectedTab, setSelectedTab] = useState('My Hostel');

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    return AndroidBackHandler.removerHandler();
  }, []);

  
  // Sample hostel data based on the screenshot
  const hostelData = [
    {
      id: 1,
      name: 'Ramaiah FOLK Residency',
      address: '#33, 3rd Main, New BEL Rd, opp. to FM Silks, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094.',
      image: require('../assets/images/hostel1.png'),
      available: 26,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'FOLK Residency-Koramangala',
      address: '200, 3rd Avenue street, 3rd Main, 560034. Teacher\'s Colony, 1st Block...',
      image: require('../assets/images/hostel2.png'),
      available: 26,
      isAvailable: false,
    },
    {
      id: 3,
      name: 'Ramaiah FOLK Residency',
      address: '#33, 3rd Main, New BEL Rd, opp. to FM, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094.',
      image: require('../assets/images/hostel3.png'),
      available: 26,
      isAvailable: true,
    },
  ];

  const renderHostelCard = ({item, index}) => (
    <View style={styles.hostelCard}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.hostelImage} />
        <View style={styles.tagContainer}>
          {item.isAvailable && (
            <View style={styles.availableTag}>
              <Text style={styles.availableText}>Available</Text>
            </View>
          )}
          <View style={styles.countTag}>
            <Text style={styles.countText}>{item.available}</Text>
          </View>
        </View>
      </View>
      <View style={styles.hostelInfo}>
        <Text style={styles.hostelName}>{item.name}</Text>
        <View style={styles.addressContainer}>
          <Image
            source={require('../assets/images/location1.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      {/* Custom Header with Tabs */}
      <View style={styles.headerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
            style={styles.backButton}>
            <MaterialIcons
              name="arrow-back"
              size={moderateScale(24)}
              color={COLORS.white}
            />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Hostels</Text>
          
          <View style={styles.rightIcon} />
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'My Hostel' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('My Hostel')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'My Hostel' && styles.activeTabText,
              ]}>
              My Hostel
            </Text>
            {selectedTab === 'My Hostel' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'FOLK Hostels' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('FOLK Hostels')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'FOLK Hostels' && styles.activeTabText,
              ]}>
              FOLK Hostels
            </Text>
            {selectedTab === 'FOLK Hostels' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content */}
      <View style={[MyStyles.contentCont, styles.mainContainer]}>
        {/* Hostel List */}
        <FlatList
          data={hostelData}
          renderItem={renderHostelCard}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Bottom Tab */}
      <CustomBottomTab
        selIcon={''}
        setSelIcon={value => {
          if (value) {
            navigation.navigate(screenNames.switcherScreen);
            setGlobalState(prev => ({...prev, btTab: value, current: value}));
          }
        }}
      />
    </Container>
  );
};

export default Hostel;

const styles = StyleSheet.create({
  mainContainer: {
    padding: '4%',
  },
  headerContainer: {
    backgroundColor: COLORS.header,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    paddingTop: verticalScale(16),
  },
  backButton: {
    padding: moderateScale(8),
  },
  headerTitle: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  rightIcon: {
    width: horizontalScale(40),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    // paddingBottom: verticalScale(12),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    position: 'relative',
  },
  tabText: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.white,
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontStyle: 'italic',
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: verticalScale(4),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(1),
    width: '120%',
  },
  listContainer: {
    paddingBottom: verticalScale(100),
  },
  hostelCard: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  hostelImage: {
    width: '100%',
    height: verticalScale(200),
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: verticalScale(12),
    right: horizontalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableTag: {
    backgroundColor: COLORS.gunsmoke,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    marginRight: horizontalScale(8),
  },
  availableText: {
    color: COLORS.white,
    fontSize: SIZES.s,
    fontFamily: FONTS.urbanistMedium,
  },
  countTag: {
    backgroundColor: COLORS.header,
    width: horizontalScale(32),
    height: horizontalScale(32),
    borderRadius: horizontalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: COLORS.white,
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistSemiBold,
  },
  hostelInfo: {
    padding: horizontalScale(16),
  },
  hostelName: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    marginBottom: verticalScale(8),
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistMedium,
    color: COLORS.gunsmoke,
    flex: 1,
    marginLeft: horizontalScale(4),
    lineHeight: verticalScale(20),
  },
  locationIcon: {
    width: horizontalScale(16),
    height: horizontalScale(16),
    marginTop: verticalScale(2),
  },
}); 