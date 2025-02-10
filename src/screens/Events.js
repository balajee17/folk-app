import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
} from '../styles/MyStyles';
import {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Events = () => {
  //   const [activeTab, setActiveTab] = useState(0);
  const activeTab = useSharedValue(0);
  const scrollRef = useRef(null);
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  const handleTabPress = item => {
    activeTab.current = item;

    // Indicator animation
    Animated.timing(indicatorPosition, {
      toValue: item * horizontalScale(112),
      duration: 300, // Faster animation duration
      easing: Easing.linear(),
      useNativeDriver: true,
    }).start();

    // Use requestAnimationFrame to delay scroll for smooth synchronization
    // requestAnimationFrame(() => {
    scrollRef.current?.scrollTo({
      x: item * screenWidth,
      animated: true,
    });
    // });
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: indicatorPosition}}}],
    {
      useNativeDriver: false, // For smooth scroll handling
      listener: event => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const progress = contentOffsetX / screenWidth;
        indicatorPosition.setValue(progress * horizontalScale(112));
      },
    },
  );

  const handleScrollEnd = event => {
    if (!scrollRef.current) return;
    scrollRef.current = false;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);

    // setActiveTab(index);
    Animated.timing(indicatorPosition, {
      toValue: index * horizontalScale(112),
      duration: 200, // Faster animation (lower duration)
      easing: Easing.linear(),
      useNativeDriver: true,
    }).start();
    // scrollRef.current?.scrollTo({x: index * screenWidth, animated: true});
  };

  return (
    <View style={MyStyles.contentCont}>
      <View style={styles.tabBarBox}>
        <View style={styles.tabCont}>
          <Pressable
            onPress={() => handleTabPress(0)}
            style={styles.leftTabBtn}>
            <Text
              style={[
                styles.tabBtnTxt,
                {color: activeTab === 0 ? COLORS.white : COLORS.atlantis},
              ]}>
              Upcoming
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleTabPress(1)}
            style={styles.rightTabBtn}>
            <Text
              style={[
                styles.tabBtnTxt,
                {color: activeTab === 1 ? COLORS.white : COLORS.atlantis},
              ]}>
              Attended
            </Text>
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

      <ScrollView
        ref={scrollRef}
        overScrollMode="never"
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={8} // Reduced for smoother scrolling
      >
        <View
          style={{backgroundColor: 'red', width: screenWidth, height: 400}}
        />
        <View
          style={{backgroundColor: 'pink', width: screenWidth, height: 400}}
        />
      </ScrollView>
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
