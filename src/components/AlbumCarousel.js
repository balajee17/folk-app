import {
  FlatList,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {
  CommonStatusBar,
  StatusBarTransp,
} from '../components/StatusBarComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';
import {RedirectURL, ShareLink} from './CommonFunctionalities';

const AlbumCarousel = ({selectedItem, activeIndex, closeAlbum}) => {
  const WIDTH = windowWidth * 0.75;
  const HEIGHT = WIDTH * 1.58;
  const imagesData = selectedItem?.images;

  const scrollX = useSharedValue(activeIndex);
  const scrollRef = useRef(null);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const scrollToIndex = index => {
    const offset = index * windowWidth; // Calculate the x-offset for the selected index
    scrollRef?.current?.scrollToOffset({offset, animated: true}); // Scroll to the index
    scrollX.value = index; // Update the active index
  };

  return (
    <>
      <CommonStatusBar />
      <View style={{backgroundColor: '#000', flex: 1}}>
        <View style={StyleSheet.absoluteFillObject}>
          {imagesData?.map((item, index) => {
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
                source={{uri: item?.link}}
                blurRadius={50}
                style={[StyleSheet.absoluteFillObject, animatedStyle]}
              />
            );
          })}
        </View>

        <Animated.FlatList
          ref={scrollRef}
          data={imagesData}
          onScroll={scrollHandler}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: windowWidth,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingHorizontal: '1%',
                }}>
                <TouchableOpacity
                  onPress={() => closeAlbum()}
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
                    marginRight: '3%',
                  }}
                  activeOpacity={0.6}>
                  <AntDesign
                    name="close"
                    size={moderateScale(20)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>

                <Image
                  source={{uri: item?.link}}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
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
                    onPress={async () => {
                      const result = await RedirectURL(item?.URL);

                      if (!!result?.type) {
                        toastMsg(result?.message, result?.type);
                      }
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
                    onPress={() => {
                      const result = ShareLink(item?.link);
                      if (!!result?.type) {
                        toastMsg(result?.message, result?.type);
                      }
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
                    <MaterialCommunityIcons
                      name="share"
                      size={moderateScale(40)}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default AlbumCarousel;

const styles = StyleSheet.create({});
