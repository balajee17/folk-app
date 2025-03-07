import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenWidth,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import UpcomingEvents from './UpcomingEvents';
import AttendedEvents from './AttendedEvents';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/FloatingInput';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const Events = ({openFilter, closeFilter, navigation}) => {
  const [filterValues, setFilterValues] = useState({});
  const [filterDrpDwnLst, setFilterDrpDwnLst] = useState({
    eventNames: [
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
    ],
    eventTypes: [
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
      {label: 'ajkfa', value: 'dkjhklh'},
    ],
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'upcoming', title: 'Upcoming'},
    {key: 'registered', title: 'Registered'},
  ]);

  const handleChange = (key, value) => {
    setFilterValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  // @ Custom Style Tab Bar
  const renderTabBar = props => {
    return (
      <View style={styles.tabBarContainer}>
        {props.navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setIndex(i)}
            style={[styles.tabItem, index === i && styles.activeTabItem]}>
            <Text style={[styles.tabText, index === i && styles.activeTabText]}>
              {route.title}
            </Text>
            {index === i && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  console.log('navigation', navigation);
  return (
    <View style={MyStyles.contentCont}>
      {/* // @ Filter Modal */}
      <Modal animationType="slide" visible={openFilter} transparent>
        <View style={styles.fltrModal}>
          {/* // @ Filter Card */}
          <View style={styles.filterCard}>
            {/* // # Title, Close Container */}
            <View style={styles.titleCloseCont}>
              <Text numberOfLines={1} style={styles.titleTxt}>
                Filter
              </Text>
              <TouchableOpacity
                onPress={() => closeFilter()}
                style={styles.closeBtn}
                activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="close"
                  size={moderateScale(25)}
                  color={COLORS.charcoal}
                />
              </TouchableOpacity>
            </View>
            {/* // # Event Name */}
            <FloatingInput
              type="dropdown"
              data={filterDrpDwnLst?.eventNames}
              label={'Event Name'}
              drpdwnContStyle={{
                backgroundColor: COLORS.dropDownBg,
                alignSelf: 'left',
              }}
              value={filterValues?.eventName}
              onChange={item => {
                handleChange('eventName', item);
              }}
              cntnrStyle={styles.dropdownCont}
              renderRightIcon={() => (
                <MaterialCommunityIcons
                  name={'chevron-down'}
                  color={COLORS.black}
                  size={25}
                />
              )}
            />
            {/* // # Event Type */}
            <FloatingInput
              type="dropdown"
              data={filterDrpDwnLst?.eventTypes}
              label={'Event Type'}
              value={filterValues?.eventType}
              onChange={item => {
                handleChange('eventType', item);
              }}
              drpdwnContStyle={{backgroundColor: COLORS.dropDownBg}}
              cntnrStyle={styles.dropdownCont}
              renderRightIcon={() => (
                <MaterialCommunityIcons
                  name={'chevron-down'}
                  color={COLORS.black}
                  size={25}
                />
              )}
            />
            {/* // # Date  */}
            <FloatingInput
              editable={false}
              data={filterDrpDwnLst?.eventTypes}
              label={'Date'}
              value={filterValues?.eventType}
              onChange={item => {
                handleChange('eventType', item);
              }}
              cntnrStyle={styles.dropdownCont}
              rightIcon={
                <MaterialCommunityIcons
                  name={'calendar'}
                  color={COLORS.black}
                  size={25}
                />
              }
              rightIconStyle={{marginRight: '4%'}}
            />
            {/* // # Clear & Filter Btn */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: '8%',
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.filterBtn, {backgroundColor: COLORS.cloud}]}>
                <Text style={styles.filterBtnTxt}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} style={styles.filterBtn}>
                <Text style={styles.filterBtnTxt}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* // @ Tab View */}
      <TabView
        navigationState={{index, routes}}
        lazy={true}
        lazyPreloadDistance={0}
        renderScene={({route}) => {
          if (route.key === 'upcoming' && index === 0) {
            return (
              <UpcomingEvents isFocused={index === 0} navigation={navigation} />
            );
          }
          if (route.key === 'registered' && index === 1) {
            return (
              <AttendedEvents isFocused={index === 1} navigation={navigation} />
            );
          }
          return null; // 👈 This prevents inactive screens from rendering
        }}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: horizontalScale(240),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(30),
    marginVertical: '3%',
    alignSelf: 'center',
    padding: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    padding: '2.5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '48%',
  },
  tabText: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.atlantis,
  },
  activeTabText: {
    color: COLORS.white,
    zIndex: 99,
  },
  tabIndicator: {
    position: 'absolute',
    width: horizontalScale(110),
    padding: '18%',
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.atlantis,
    bottom: verticalScale(-1),
  },
});
