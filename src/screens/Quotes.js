import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Container from '../components/Container';
import {
  moderateScale,
  MyStyles,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const Quotes = ({navigation}) => {
  const imageSource = [
    {
      id: 1,
      image:
        'https://www.iskconbangalore.org/wp-content/uploads/2015/11/theme-park-731x800.jpeg',
    },
    {
      id: 2,
      image: 'https://i.ytimg.com/vi/LuE9riw-klA/maxresdefault.jpg',
    },
    {
      id: 3,
      image:
        'https://www.iskconbangalore.org/wp-content/uploads/2016/01/g01-iskcon-temple-night-view.jpg',
    },
    {
      id: 4,
      image: 'https://i.ytimg.com/vi/LuE9riw-klA/maxresdefault.jpg',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newData, setNewData] = useState([...imageSource, ...imageSource]);

  const swipeXArray = newData.map(() => useSharedValue(0));
  const swipeDirection = useSharedValue(0);
  const animatedValue = useSharedValue(0);

  const handleSwipe = direction => {
    // Update the currentIndex to simulate infinite scrolling
    if (direction === 'left') {
      setCurrentIndex(prevIndex => (prevIndex + 1) % imageSource.length);
    } else if (direction === 'right') {
      setCurrentIndex(prevIndex =>
        prevIndex === 0 ? imageSource.length - 1 : prevIndex - 1,
      );
    }
  };

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.quotes}
        />

        {/* // # Contents */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={MyStyles.scrollView}>
          <Text style={[MyStyles.subTitleText, styles.titleTxt]}>Today</Text>
          <View
            style={{
              alignSelf: 'center',
              width: windowWidth,
              height: verticalScale(350),
              marginTop: '8%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: moderateScale(10),
            }}>
            {newData.map((item, index) => {
              const swipeAnimation = useAnimatedStyle(() => {
                const isCurrentItem = currentIndex === index;
                const rotateZ = interpolate(
                  swipeXArray[index]?.value || 0, // Ensure swipeXArray[index] exists
                  [0, windowWidth],
                  [0, 20],
                );
                const translateY = interpolate(
                  animatedValue.value,
                  [index - 1, index],
                  [-30, 0],
                );
                const scale = interpolate(
                  animatedValue.value,
                  [index - 1, index],
                  [0.9, 1],
                );

                return {
                  transform: [
                    {translateX: swipeXArray[index]?.value || 0}, // Safe access
                    {scale: isCurrentItem ? 1 : scale},
                    {translateY: isCurrentItem ? 0 : translateY},
                    {rotateZ: `${isCurrentItem ? rotateZ : 0}deg`},
                  ],
                };
              });
              const pan = Gesture.Pan()
                .onUpdate(e => {
                  const isSwipeRight = e.translationX > 0;
                  swipeDirection.value = isSwipeRight ? 1 : -1;

                  if (currentIndex === index) {
                    swipeXArray[index].value = e.translationX;
                    animatedValue.value = interpolate(
                      Math.abs(e.translationX),
                      [0, windowWidth],
                      [index, index + 1],
                    );
                  }
                })
                .onEnd(e => {
                  if (currentIndex === index) {
                    if (
                      Math.abs(e.translationX) > 150 ||
                      Math.abs(e.velocityX) > 1000
                    ) {
                      swipeXArray[index].value = withTiming(
                        windowWidth * swipeDirection.value * 2,
                        {},
                        () => {
                          runOnJS(setCurrentIndex)(currentIndex + 1);
                          //   runOnJS(() =>
                          //     setNewData(prevData => [
                          //       ...prevData.slice(1),
                          //       prevData[0],
                          //     ]),
                          //   );
                          //   runOnJS(handleSwipe)(
                          //     swipeDirection.value > 0 ? 'right' : 'left',
                          //   );
                        },
                      );
                      animatedValue.value = withTiming(currentIndex + 1);
                    } else {
                      swipeXArray[index].value = withTiming(0, {
                        duration: 500,
                      });
                      animatedValue.value = withTiming(currentIndex);
                    }
                  }
                });
              return (
                <GestureDetector key={index + 1} gesture={pan}>
                  <Animated.View
                    style={[
                      {
                        position: 'absolute',
                        zIndex: newData.length - index,
                        width: '100%',
                        height: verticalScale(350),
                      },
                      swipeAnimation,
                    ]}>
                    <ImageBackground
                      source={{uri: item?.image}}
                      resizeMode="stretch"
                      imageStyle={{borderRadius: moderateScale(20)}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Animated.View>
                </GestureDetector>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Quotes;

const styles = StyleSheet.create({
  titleTxt: {paddingHorizontal: moderateScale(10), marginTop: '4%'},
});
