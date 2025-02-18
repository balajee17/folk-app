import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenWidth,
  SIZES,
  verticalScale,
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

const Events = ({openFilter, closeFilter}) => {
  const activeTab = useSharedValue(0);
  const scrollRef = useRef(null);
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = horizontalScale(112);
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

  const navigation = useNavigation();

  useEffect(() => {}, []);

  const handleChange = (key, value) => {
    setFilterValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTabPress = item => {
    // Animate active tab value first
    activeTab.value = withTiming(item, {duration: 100}, () => {
      // Once animation completes, smoothly scroll
      runOnJS(scrollToTab)(item);
    });

    // Animate indicator position in sync
    indicatorPosition.value = withTiming(item * indicatorWidth, {
      duration: 100,
      easing: Easing.linear,
    });
  };

  // Separate function to ensure smooth scrolling
  const scrollToTab = index => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const scrollX = event.contentOffset.x;
      const newIndex = scrollX / screenWidth;

      // Update indicator smoothly
      indicatorPosition.value = withTiming(newIndex * indicatorWidth, {
        duration: 100,
        easing: Easing.linear,
      });
    },
  });

  const handleScrollEnd = event => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const exactIndex = scrollX / screenWidth;
    const newIndex =
      exactIndex - activeTab.value > 0.2
        ? Math.ceil(exactIndex)
        : exactIndex - activeTab.value < -0.2
        ? Math.floor(exactIndex)
        : activeTab.value;

    // Animate tab change smoothly
    activeTab.value = withTiming(newIndex, {duration: 100}, () => {
      runOnJS(scrollToTab)(newIndex);
    });

    // Animate indicator in sync
    indicatorPosition.value = withTiming(newIndex * indicatorWidth, {
      duration: 100,
      easing: Easing.linear,
    });
  };

  // Interpolating colors smoothly
  const upcomingStyle = useAnimatedStyle(() => {
    const color = withTiming(
      activeTab.value === 0 ? COLORS.white : COLORS.atlantis,
      {duration: 150},
    );
    return {
      color: color,
    };
  });

  const attendedStyle = useAnimatedStyle(() => {
    const color = withTiming(
      activeTab.value === 1 ? COLORS.white : COLORS.atlantis,
      {duration: 150},
    );
    return {
      color: color,
    };
  });

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

      {/* // @ TabBar Buttons - Upcoming, Attended */}
      <View style={styles.tabBarBox}>
        <View style={styles.tabCont}>
          <Pressable
            onPress={() => handleTabPress(0)}
            style={styles.leftTabBtn}>
            <Animated.Text style={[styles.tabBtnTxt, upcomingStyle]}>
              Upcoming
            </Animated.Text>
          </Pressable>
          <Pressable
            onPress={() => handleTabPress(1)}
            style={styles.rightTabBtn}>
            <Animated.Text style={[styles.tabBtnTxt, attendedStyle]}>
              Registered
            </Animated.Text>
          </Pressable>
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{translateX: indicatorPosition}],
              },
            ]}
          />
        </View>
      </View>
      {/* // @ Tab View Contents */}
      <Animated.ScrollView
        ref={scrollRef}
        overScrollMode="never"
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={8}>
        <UpcomingEvents navigation={navigation} />

        <AttendedEvents navigation={navigation} />
      </Animated.ScrollView>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: COLORS.atlantis,
    width: horizontalScale(100),
    borderRadius: moderateScale(20),
  },
  tabBarBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: COLORS.white,
    margin: moderateScale(10),
    borderRadius: moderateScale(50),
    width: horizontalScale(230),
    alignSelf: 'center',
  },
  tabCont: {
    margin: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftTabBtn: {
    width: horizontalScale(100),
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    zIndex: 999,
  },
  rightTabBtn: {
    padding: '4%',
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(100),
    zIndex: 999,
  },
  tabBtnTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    textAlign: 'center',
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
