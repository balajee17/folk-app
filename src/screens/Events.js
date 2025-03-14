import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';

import UpcomingEvents from './UpcomingEvents';
import AttendedEvents from './AttendedEvents';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/FloatingInput';
import {TabView} from 'react-native-tab-view';

const Events = ({
  openFilter,
  closeFilter,
  navigation,
  eventTabChange,
  index,
  shimmer,
  eventList,
  refreshUpcoming,
  refreshRegistered,
}) => {
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
            activeOpacity={0.8}
            key={i}
            onPress={() => eventTabChange(i)}
            style={[styles.tabItem]}>
            <Text style={[styles.tabText, index === i && styles.activeTabText]}>
              {route.title}
            </Text>
            {index === i && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[MyStyles.contentCont, {minHeight: screenHeight}]}>
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
        lazyPreloadDistance={1}
        renderScene={({route}) => {
          if (route.key === 'upcoming' && index === 0) {
            return (
              <UpcomingEvents
                navigation={navigation}
                shimmer={shimmer?.upcoming}
                upcomingList={eventList?.upcoming}
                refresh={() => refreshUpcoming()}
              />
            );
          }
          if (route.key === 'registered' && index === 1) {
            return (
              <AttendedEvents
                navigation={navigation}
                shimmer={shimmer?.registered}
                registeredList={eventList?.registered}
                refresh={() => refreshRegistered()}
              />
            );
          }
          return null;
        }}
        onIndexChange={index => eventTabChange(index)}
        initialLayout={{width: windowWidth}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
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

  fltrModal: {
    backgroundColor: COLORS.modalBg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCard: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  titleCloseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxxl,
    color: COLORS.black,
    width: '70%',
  },
  closeBtn: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  dropdownCont: {
    width: '100%',
    paddingHorizontal: '4%',
    paddingRight: 0,
    height: verticalScale(48),
    marginTop: '5%',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.dropDownBg,
  },
  filterBtn: {
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    width: '35%',
    height: horizontalScale(45),
    backgroundColor: COLORS.silkBlue,
  },
  filterBtnTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
    textAlign: 'center',
  },
});
