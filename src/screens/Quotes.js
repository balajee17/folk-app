import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import AndroidBackHandler from '../components/BackHandler';
import Swiper from 'react-native-deck-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {ShareLink} from '../components/CommonFunctionalities';
import {useAppContext} from '../../App';
import {DownloadImage} from '../components/FileDownloader';

const Quotes = props => {
  const [quotesData, setQuotesData] = useState([]);

  const {globalState} = useAppContext();
  const {announcementCardColor} = globalState;

  const [shimmer, setShimmer] = useState(true);

  const {navigation, route} = props;
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
                      cardStyle={styles.swiperCard(announcementCardColor)}
                      renderCard={(card, cardIndex) => {
                        return (
                          <View
                            key={cardIndex}
                            style={{
                              width: horizontalScale(290),
                            }}>
                            <Image
                              source={{uri: card}}
                              style={styles.quotesImg}
                            />
                            {/* // # Share & Download Button  */}
                            <View style={styles.shareDwnldCont}>
                              <TouchableOpacity
                                onPress={async () => {
                                  const result = await DownloadImage(card);

                                  if (!!result?.type) {
                                    toastMsg(
                                      result?.msg,
                                      result?.type === 'S'
                                        ? 'success'
                                        : 'error',
                                    );
                                  } else {
                                    toastMsg('Download failed.', 'error');
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
                                  const result = ShareLink(card);
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
                          </View>
                        );
                      }}
                      cardIndex={0}
                      verticalSwipe={false}
                      backgroundColor={COLORS.transparent}
                      animateCardOpacity
                      disableBottomSwipe
                      disableTopSwipe
                      stackSeparation={-20}
                      stackScale={5}
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
    height: horizontalScale(345),
    width: windowWidth,
  },
  swiperContainer: {
    width: windowWidth,
    height: horizontalScale(300),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperCard: bgColor => ({
    width: horizontalScale(290),
    height: horizontalScale(300),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginTop: '-6%',
    marginLeft: '6.5%',
    backgroundColor: bgColor || COLORS.announcementCard,
  }),
  quotesImg: {
    width: horizontalScale(290),
    height: horizontalScale(250),
    resizeMode: 'stretch',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  shareDwnldCont: {
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: verticalScale(50),
  },
  quotesBtns: {
    backgroundColor: COLORS.whiteGlassy,
    width: horizontalScale(40),
    height: horizontalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
  },
});
