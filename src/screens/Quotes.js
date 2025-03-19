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
import {useToast} from 'react-native-toast-notifications';

const Quotes = ({navigation, route}) => {
  const [quotesData, setQuotesData] = useState([
    {
      id: 1,
      link: 'http://192.168.1.11/FOLKDashboard/public/inspiring-quotes/20_.jpg',
    },
    {
      id: 2,
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ym84uF34s_5vPN7GDhVj_c5Z9qnBmS6Egw&s',
    },
    {
      id: 3,
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsy5J-mW2R2DLkJjBdqVNVABMJXzadf39KMQ&s',
    },
    {
      id: 4,
      link: 'https://i.pinimg.com/1200x/d8/f5/db/d8f5dbe5e4030e6c5fc9a611c849ec88.jpg',
    },
    {
      id: 5,
      link: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiyvozGlueHLXLfZucK03IitAENUvoKsyOu9kXG-XrW9m7ieYokQSQFw5pRawNc8NI8J45CP1fq8MxYUiqp0wChhf-_aqQfykWv0THTD4v1zbaYez9d0HLAm7cQbGUQbnf5kGK6BVQJCA/s1600/srila+prabhupada+quotes+on+life-best+life+changing+words+by+srila+prabhupada-jnanakadlai.jpg',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newData, setNewData] = useState(quotesData);
  const [shimmer, setShimmer] = useState(false);

  const animatedValue = useSharedValue(0);

  // const {title} = route?.params;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  useEffect(() => {
    // getQuotesHistory();
  }, []);

  // # API Call to get Quotes History
  const getQuotesHistory = async () => {
    try {
      const response = await API.getQuotesHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setQuotesData(history);
        // const filterImages = history?.map(item => {
        //   return item?.images;
        // });
        // console.log('filterImages', filterImages);
        // setNewData(filterImages);
      } else {
        setQuotesData([]);
        toastMsg(message, 'warning');
      }
      setShimmer(false);
    } catch (err) {
      toastMsg('', 'error');
      setShimmer(false);

      console.log('ERR-Updates-screen', err);
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
            // <FlatList
            //   data={quotesData}
            //   keyExtractor={(_, index) => index}
            //   showsVerticalScrollIndicator={false}
            //   renderItem={({item, index}) => {
            //     return (
            <View style={styles.cardCont}>
              {/* {quotesData.map((item, index) => {
                return ( */}
              {/* <> */}
              <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                Today
              </Text>
              {newData?.map((quotesImg, QuotesIndex) => {
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

              {/* // );
            //   }}
            // /> */}
            </View>
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
