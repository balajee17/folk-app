import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {windowHeight, windowWidth} from '../styles/MyStyles';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Animation = () => {
  const WIDTH = windowWidth * 0.7;
  const HEIGHT = WIDTH * 1.54;
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
            <Animated.Image
              key={`background-image-${index}`}
              source={{uri: item}}
              blurRadius={50}
              style={[StyleSheet.absoluteFillObject, animatedStyle]}
            />
          );
        })}
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        data={imageAddress}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {imageAddress.map((item, index) => {
          return (
            <View
              key={index + 1}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: windowWidth,
              }}>
              <Image
                source={{uri: item}}
                style={{
                  height: HEIGHT,
                  width: WIDTH,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});
