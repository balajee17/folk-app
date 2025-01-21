import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  windowHeight,
  windowWidth,
} from '../styles/MyStyles';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {StatusBarTransp} from '../components/StatusBarComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Animation = () => {
  const WIDTH = windowWidth * 0.75;
  const HEIGHT = WIDTH * 1.58;
  const imageAddress = [
    'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
    'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
    'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
    'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
  ];
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <>
      <StatusBarTransp />
      <View style={{backgroundColor: '#000', flex: 1}}>
        <View style={StyleSheet.absoluteFillObject}>
          {imageAddress.map((item, index) => {
            const inputRange = [
              (index - 1) * windowWidth,
              index * windowWidth,
              (index + 1) * windowWidth,
            ];

            const animatedStyle = useAnimatedStyle(() => {
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0, 1, 0],
                Extrapolation.CLAMP,
              );
              return {
                opacity,
              };
            });

            return (
              <>
                <Animated.Image
                  key={`background-image-${index}`}
                  source={{uri: item}}
                  blurRadius={50}
                  style={[StyleSheet.absoluteFillObject, animatedStyle]}
                />
              </>
            );
          })}
        </View>
        <Animated.ScrollView
          onScroll={scrollHandler}
          data={imageAddress}
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {imageAddress.map((item, index) => {
            return (
              <View
                key={index + 1}
                style={{
                  width: windowWidth,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingHorizontal: '1%',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    width: horizontalScale(30),
                    height: horizontalScale(30),
                    borderWidth: 2,
                    borderColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: moderateScale(20),
                    alignSelf: 'flex-end',
                  }}
                  activeOpacity={0.6}>
                  <AntDesign
                    name="close"
                    size={moderateScale(20)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>

                <Image
                  source={{uri: item}}
                  style={{
                    height: HEIGHT,
                    width: WIDTH,
                    resizeMode: 'cover',
                    borderRadius: 16,
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handlePress();
                    }}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      width: horizontalScale(50),
                      height: horizontalScale(50),
                      borderWidth: 2,
                      borderColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: moderateScale(10),
                      alignSelf: 'flex-end',
                    }}
                    activeOpacity={0.6}>
                    <Feather
                      name="download"
                      size={moderateScale(35)}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      width: horizontalScale(50),
                      height: horizontalScale(50),
                      borderWidth: 2,
                      borderColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: moderateScale(10),
                      alignSelf: 'flex-end',
                    }}
                    activeOpacity={0.6}>
                    <MaterialCommunityIcons
                      name="share"
                      size={moderateScale(40)}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </>
  );
};

export default Animation;

const styles = StyleSheet.create({});
