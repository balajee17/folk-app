import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenWidth,
  SIZES,
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

const Events = () => {
  const activeTab = useSharedValue(0);
  const scrollRef = useRef(null);
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = horizontalScale(112);

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
              Attended
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
        <UpcomingEvents />

        <AttendedEvents />
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
});
