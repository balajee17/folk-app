import {
  FlatList,
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
import {API} from '../services/API';

const Quotes = ({navigation, route}) => {
  const [quotesData, setQuotesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newData, setNewData] = useState([]);
  const [shimmer, setShimmer] = useState(true);

  const animatedValue = useSharedValue(0);

  const {title} = route?.params;

  useEffect(() => {
    getQuotesHistory();
  }, []);

  // # API Call to get Quotes History
  const getQuotesHistory = async () => {
    try {
      const response = await API.getQuotesHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode} = response?.data;
      if (SuccessCode === 1) {
        setQuotesData(history);
        // const filterImages = history?.map(item => {
        //   return item?.images;
        // });
        // console.log('filterImages', filterImages);
        // setNewData(filterImages);
      } else {
        setQuotesData([]);
      }
      setShimmer(false);
    } catch (err) {
      console.log('ERR-Updates-screen', err);
    }
  };

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
              data={quotesData}
              keyExtractor={(_, index) => index}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                      {item?.day}
                    </Text>
                    <View style={styles.cardCont}>
                      {item?.images?.map((quotesImg, QuotesIndex) => {
                        return (
                          <SwipeCard
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            animatedValue={animatedValue}
                            newData={newData}
                            setNewData={setNewData}
                            item={quotesImg}
                            index={QuotesIndex}
                            imageSource={quotesData}
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
