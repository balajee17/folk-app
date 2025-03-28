import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import AndroidBackHandler from '../components/BackHandler';
import Swiper from 'react-native-deck-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {ShareLink} from '../components/CommonFunctionalities';

const Quotes = props => {
  const [quotesData, setQuotesData] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [newData, setNewData] = useState(quotesData);
  const [shimmer, setShimmer] = useState(false);

  const animatedValue = useSharedValue(0);
  const {navigation, route} = props;
  // const {title} = route?.params;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getQuotesHistory();
    return AndroidBackHandler.removerHandler();
  }, []);

  // # API Call to get Quotes History
  const getQuotesHistory = async () => {
    try {
      const response = await API.getQuotesHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setQuotesData(history);
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
        <View style={styles.contentCont}>
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
              contentContainerStyle={{flexGrow: 1}}
              keyExtractor={item => item?.id}
              renderItem={({item}) => {
                return (
                  <>
                    <Text
                      style={[
                        MyStyles.subTitleText,
                        MyStyles.marTop3Per,
                        {paddingHorizontal: horizontalScale(10)},
                      ]}>
                      {item?.day}
                    </Text>

                    <View style={styles.quotesCont}>
                      <Swiper
                        cards={item?.images}
                        containerStyle={styles.swiperContainer}
                        cardStyle={styles.swiperCard}
                        renderCard={card => {
                          return (
                            <ImageBackground
                              source={{uri: card}}
                              style={styles.quotesImg}>
                              {/* // # Share & Download Button  */}
                              <View style={styles.shareDwnldCont}>
                                <TouchableOpacity
                                  onPress={async () => {
                                    const result = await RedirectURL(
                                      item?.session_link,
                                    );
                                    if (!!result?.type) {
                                      toastMsg(result?.message, result?.type);
                                    }
                                  }}
                                  style={styles.quotesBtns}
                                  activeOpacity={0.6}>
                                  <Feather
                                    name="download"
                                    size={moderateScale(30)}
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
                                  style={styles.quotesBtns}
                                  activeOpacity={0.6}>
                                  <MaterialCommunityIcons
                                    name="share"
                                    size={moderateScale(30)}
                                    color={COLORS.white}
                                  />
                                </TouchableOpacity>
                              </View>
                            </ImageBackground>
                          );
                        }}
                        onSwiped={cardIndex => {
                          console.log(cardIndex);
                        }}
                        onSwipedAll={() => {
                          console.log('onSwipedAll');
                        }}
                        cardIndex={0}
                        backgroundColor={'#0000'}
                        animateCardOpacity
                        disableBottomSwipe
                        disableTopSwipe
                        stackSeparation={-20}
                        stackScale={6}
                        horizontalSwipe
                        infinite
                        stackSize={3}
                      />
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
  contentCont: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  quotesCont: {
    height: horizontalScale(350),
    width: windowWidth,
  },
  swiperContainer: {
    width: windowWidth,
    height: horizontalScale(300),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperCard: {
    width: horizontalScale(300),
    height: horizontalScale(300),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginTop: '-6%',
    marginLeft: '5%',
  },
  quotesImg: {
    width: horizontalScale(300),
    height: horizontalScale(300),
  },
  shareDwnldCont: {
    position: 'absolute',
    bottom: horizontalScale(10),
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  quotesBtns: {
    backgroundColor: COLORS.shareBtn,
    width: horizontalScale(45),
    height: horizontalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
  },
});
