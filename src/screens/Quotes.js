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
  COLORS,
  horizontalScale,
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
import SwipeCard from '../components/SwipeCard';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Quotes = ({navigation, route}) => {
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
  const [newData, setNewData] = useState(imageSource);
  const [shimmer, setShimmer] = useState(true);

  const animatedValue = useSharedValue(0);

  console.log('route', route);

  const {title} = route?.params;

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader goBack={() => navigation.goBack()} titleName={title} />
        {/* // # Contents */}

        <View style={MyStyles.contentContainer}>
          {shimmer ? (
            <View>
              {Array(3)
                .fill(3)
                .map(_ => {
                  return (
                    <>
                      <TitleShimmer />
                      <ImageShimmer
                        width={'90%'}
                        height={verticalScale(300)}
                        borderRadius={moderateScale(15)}
                        marginTop={verticalScale(10)}
                        alignSelf={'center'}
                      />
                    </>
                  );
                })}
            </View>
          ) : (
            <FlatList
              data={sampleData}
              keyExtractor={item => item?.id}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                      Today
                    </Text>
                    <View style={styles.cardCont}>
                      {newData.map((item, index) => {
                        return (
                          <SwipeCard
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            animatedValue={animatedValue}
                            newData={newData}
                            setNewData={setNewData}
                            item={item}
                            index={index}
                            imageSource={imageSource}
                          />
                        );
                      })}
                    </View>
                  </>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Quotes;

const styles = StyleSheet.create({
  cardCont: {
    alignSelf: 'center',
    width: windowWidth,
    height: verticalScale(350),
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
});
