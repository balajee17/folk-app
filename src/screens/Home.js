import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ParallexCarousel from '../components/ParallexCarousel';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  HomeIconShimmer,
  HomeTitleShimmer,
  ImageShimmer,
  ParallexShimmer,
} from '../components/Shimmer';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../App';
import LinearGradientBg from '../components/LinearGradientBg';
import {useToast} from 'react-native-toast-notifications';
import Swiper from 'react-native-deck-swiper';
import Feather from 'react-native-vector-icons/Feather';
import {
  CopyToClipboard,
  RedirectURL,
  ShareLink,
} from '../components/CommonFunctionalities';

const Home = ({apiData, shimmer, refreshData}) => {
  const {globalState, setGlobalState} = useAppContext();

  const {announcementCardColor} = globalState;

  const navigation = useNavigation();

  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setGlobalState(prev => ({...prev, current: 'DB1'}));
    }
  }, [isFocused]);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  // # Youtube Video onStateChange
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  // # Navigate Screen
  const navigateScreen = (screen, params) => {
    navigation.navigate(screen, params);
  };

  // # Section Title
  const RenderSecTitle = (title, color, icnLink, navigateTo) => {
    return (
      <TouchableOpacity
        disabled={navigateTo === 'N'}
        onPress={() => {
          navigateScreen(navigateTo, {
            title: title,
          });
        }}
        activeOpacity={0.8}
        style={[{flexDirection: 'row'}]}>
        <Image
          style={styles.titleImg}
          source={{uri: icnLink}}
          resizeMode="contain"
        />

        <Text
          numberOfLines={1}
          style={[MyStyles.subTitleText, styles.secTitle, {color: color}]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  // # History Icon
  const RenderHistoryIcon = (title, navigateTo, icnColor) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateScreen(navigateTo, {
            title: title,
          });
        }}
        style={styles.historyIcon}
        activeOpacity={0.6}>
        <MaterialCommunityIcons
          name="history"
          size={moderateScale(25)}
          color={icnColor}
        />
      </TouchableOpacity>
    );
  };

  // @ Daily Darshana - Carousel
  const DailyDarshan = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;

    return (
      <>
        <View
          key={index}
          style={[
            styles.dailyDarshanCont,
            {marginTop: index === 0 ? verticalScale(15) : 0},
          ]}>
          <View
            style={[
              styles.textHstryIcon,
              styles.marVert,
              MyStyles.paddingHor10,
            ]}>
            {shimmer ? (
              <>
                <View style={[styles.textHstryIcon, styles.shimmerCont]}>
                  <HomeIconShimmer />
                  <HomeTitleShimmer />
                </View>
                <HomeIconShimmer marginTop={verticalScale(15)} />
              </>
            ) : (
              UPDATES?.length > 0 && (
                <>
                  {RenderSecTitle(
                    TITLE,
                    index > 0 ? COLORS.black : COLORS.white,
                    icnLink,
                    screenNames.dailyDarshan,
                  )}
                  {/* {RenderHistoryIcon(
                    TITLE,
                    screenNames.dailyDarshan,
                    index > 0 ? COLORS.gableGreen : COLORS.white,
                  )} */}
                </>
              )
            )}
          </View>
          {shimmer ? (
            <ParallexShimmer />
          ) : (
            UPDATES?.length > 0 && (
              <ParallexCarousel
                carouselItems={UPDATES}
                autoScroll={UPDATES?.length < 8}
              />
            )
          )}
        </View>
        {!shimmer && apiData?.length - 1 > index && (
          <View style={styles.horizontalLine} />
        )}
      </>
    );
  };

  // @  Quotes - Swiper
  const Quotes = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;

    return (
      <>
        <View
          key={index}
          style={[
            styles.textHstryIcon,
            MyStyles.paddingHor10,
            styles.marVert,
            {marginTop: index === 0 ? verticalScale(15) : 0},
          ]}>
          {shimmer ? (
            <>
              <View
                style={[
                  styles.textHstryIcon,
                  styles.shimmerCont,
                  {marginTop: verticalScale(25)},
                ]}>
                <HomeIconShimmer />
                <HomeTitleShimmer />
              </View>
              <HomeIconShimmer marginTop={verticalScale(25)} />
            </>
          ) : (
            UPDATES?.length > 0 && (
              <>
                {RenderSecTitle(
                  TITLE,
                  index === 0 ? COLORS.white : COLORS.black,
                  icnLink,
                  screenNames.quotes,
                )}
                {/* {RenderHistoryIcon(
                  TITLE,
                  screenNames.quotes,
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                )} */}
              </>
            )
          )}
        </View>

        {shimmer ? (
          <ImageShimmer
            width={horizontalScale(290)}
            height={verticalScale(300)}
            borderRadius={moderateScale(15)}
            marginTop={verticalScale(12)}
            alignSelf={'center'}
          />
        ) : (
          UPDATES?.length > 0 && (
            // <View style={styles.quotesImgCont}>
            //   <Image
            //     style={[MyStyles.quotesImg]}
            //     source={{
            //       uri: UPDATES[0]?.link,
            //     }}
            //   />
            // </View>

            <View style={styles.quotesCont}>
              <Swiper
                cards={UPDATES}
                cardStyle={styles.swiperCard(announcementCardColor)}
                renderCard={(card, cardIndex) => {
                  return (
                    <View
                      key={card?.id}
                      style={{
                        width: windowWidth * 0.95,
                      }}>
                      <Image
                        source={{uri: card?.link}}
                        style={styles.quotesImg}
                      />
                      {/* // # Share & Download Button  */}
                      <View style={styles.shareDwnldCont}>
                        <TouchableOpacity
                          onPress={async () => {
                            const result = await RedirectURL(card?.link);
                            if (!!result?.type) {
                              toastMsg(result?.message, result?.type);
                            }
                          }}
                          style={styles.quotesBtns}
                          activeOpacity={0.6}>
                          <Feather
                            name="download"
                            size={moderateScale(25)}
                            color={COLORS.white}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            const result = ShareLink(card?.link);
                            if (!!result?.type) {
                              toastMsg(result?.message, result?.type);
                            }
                          }}
                          style={styles.quotesBtns}
                          activeOpacity={0.6}>
                          <MaterialCommunityIcons
                            name="share"
                            size={moderateScale(25)}
                            color={COLORS.white}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                cardIndex={0}
                backgroundColor={COLORS.transparent}
                animateCardOpacity
                disableBottomSwipe
                disableTopSwipe
                verticalSwipe={false}
                stackSeparation={-20}
                stackScale={5}
                horizontalSwipe
                infinite
                stackSize={3}
              />
            </View>
          )
        )}

        {!shimmer && apiData?.length - 1 > index && (
          <View style={styles.horizontalLine} />
        )}
      </>
    );
  };

  // @  Folk Announcements || Message from FOLK Guide
  const FolkUpdates = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;
    const section = data?.section;
    return (
      <>
        <View
          key={index}
          style={[
            styles.textHstryIcon,
            MyStyles.paddingHor10,
            styles.marVert,
            {marginTop: index === 0 ? verticalScale(15) : 0},
          ]}>
          {!shimmer && UPDATES?.length > 0 && (
            <>
              {RenderSecTitle(
                TITLE,
                index === 0 ? COLORS.white : COLORS.black,
                icnLink,
                section == 5 ? 'N' : screenNames.updates,
              )}
              {/* {section !== 5 &&
                RenderHistoryIcon(
                  TITLE,
                  screenNames.updates,
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                )} */}
            </>
          )}
        </View>

        {!shimmer &&
          UPDATES?.length > 0 &&
          UPDATES?.map((updateItem, updateIndex) => {
            return (
              <View key={updateIndex}>
                {!!updateItem?.link && (
                  <View key={updateItem?.id} style={[styles.quotesImgCont]}>
                    <Image
                      style={MyStyles.quotesImg}
                      source={{
                        uri: updateItem?.link,
                      }}
                    />
                    {/*  // # Share Btn */}
                    <TouchableOpacity
                      onPress={() => {
                        const result = ShareLink(updateItem?.link);
                        if (!!result?.type) {
                          toastMsg(result?.message, result?.type);
                        }
                      }}
                      style={MyStyles.shareBtn}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name="share"
                        size={moderateScale(25)}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {updateItem?.link && updateItem?.text ? (
                  <View
                    key={updateItem?.id}
                    style={[
                      MyStyles.updatesTextCont,
                      MyStyles.paddingHor10,
                      {
                        marginTop: '2%',
                      },
                    ]}>
                    <Text style={[MyStyles.announceTxt]}>
                      {updateItem?.title}
                    </Text>

                    <Text style={[MyStyles.updateTxt, {marginTop: '2%'}]}>
                      {updateItem?.text}
                    </Text>
                  </View>
                ) : updateItem?.text ? (
                  <Pressable
                    onLongPress={() => {
                      if (
                        CopyToClipboard(
                          `${updateItem?.title}\n${updateItem?.text}`,
                        )
                      ) {
                        toastMsg('Message copied', 'success');
                      } else {
                        toastMsg('Unable to copy the text', 'error');
                      }
                    }}
                    key={updateItem?.id}
                    style={[
                      MyStyles.updatesTextCont,
                      MyStyles.paddingHor10,
                      {
                        marginTop: !!updateItem?.link
                          ? '2%'
                          : index !== 0
                          ? '5%'
                          : '1%',
                      },
                    ]}>
                    {/* <LinearGradient
                      start={{x: 0.3, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={['#353a5f', '#9ebaf3']}
                      style={[MyStyles.gradient]}> */}
                    <View style={MyStyles.noticeCard(announcementCardColor)}>
                      <View
                        style={[
                          MyStyles.announceIcnTxtCont,
                          {
                            width: '17%',
                          },
                        ]}>
                        <Image
                          source={{
                            uri: updateItem?.icon,
                          }}
                          style={MyStyles.announceIcn}
                        />
                      </View>
                      <View style={{width: '80%'}}>
                        <Text style={[MyStyles.announceTxt]}>
                          {updateItem?.title}
                        </Text>
                        <Text style={[MyStyles.updateTxt, {marginTop: '2%'}]}>
                          {updateItem?.text}
                        </Text>
                      </View>
                    </View>
                    {/* </LinearGradient> */}
                  </Pressable>
                ) : (
                  <></>
                )}
              </View>
            );
          })}

        {!shimmer && apiData?.length - 1 > index && (
          <View style={styles.horizontalLine} />
        )}
      </>
    );
  };

  // @ Youtube Videos
  const YoutubeVideos = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;
    return (
      <>
        <View
          key={index}
          style={[
            styles.textHstryIcon,
            MyStyles.paddingHor10,
            {marginTop: index === 0 ? verticalScale(15) : 0},
          ]}>
          {!shimmer && UPDATES?.length > 0 && (
            <>
              {RenderSecTitle(
                TITLE,
                index === 0 ? COLORS.white : COLORS.black,
                icnLink,
                screenNames.folkVideos,
              )}
              {/* {RenderHistoryIcon(
                TITLE,
                screenNames.folkVideos,
                index === 0 ? COLORS.white : COLORS.gableGreen,
              )} */}
            </>
          )}
        </View>

        <View style={[MyStyles.youtubeCont]}>
          {!shimmer && UPDATES?.length > 0 && (
            <YoutubePlayer
              width={windowWidth * 0.95}
              height={windowWidth * 0.95 * (9 / 16)}
              webViewStyle={{
                borderRadius: moderateScale(15),
              }}
              play={playVideo}
              mute={youtubeAudio}
              videoId={UPDATES[0]?.code}
              onChangeState={onStateChange}
            />
          )}
        </View>
        {!shimmer && apiData?.length - 1 > index && (
          <View style={styles.horizontalLine} />
        )}
      </>
    );
  };

  // # Render Items in Order
  const renderItemsInOrder = (item, index) => {
    switch (item?.section) {
      case 1:
        return <DailyDarshan data={item} index={index} />;
      case 2:
        return <Quotes data={item} index={index} />;

      case 3:
      case 5:
        return <FolkUpdates data={item} index={index} />;

      case 4:
        return <YoutubeVideos data={item} index={index} />;

      default:
        return null;
    }
  };

  return (
    <>
      {
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => refreshData()}
            />
          }
          contentContainerStyle={{
            paddingBottom: shimmer ? 0 : verticalScale(220),
            flexGrow: 1,
          }}>
          <View style={MyStyles.contentCont}>
            <LinearGradientBg />
            {apiData?.map((item, index) => {
              if (shimmer || apiData?.length > 0) {
                return renderItemsInOrder(item, index);
              } else {
                return null;
              }
            })}
          </View>
        </ScrollView>
      }
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  historyIcon: {
    height: horizontalScale(35),
    width: horizontalScale(35),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyDarshanCont: {
    width: '100%',
  },
  textHstryIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotesImgCont: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    ...MyStyles.paddingHor10,
    marginTop: verticalScale(15),
  },

  scrollViewCont: {
    paddingBottom: verticalScale(160),
    backgroundColor: COLORS.white,
  },
  titleImg: {
    width: horizontalScale(35),
    height: horizontalScale(35),
  },
  secTitle: {
    color: COLORS.black,
    textAlign: 'left',
    marginLeft: '4%',
    width: '78%',
    textAlignVertical: 'center',
  },
  horizontalLine: {
    height: verticalScale(0.5),
    width: '100%',
    backgroundColor: COLORS.border,
    marginVertical: verticalScale(30),
  },
  shimmerCont: {width: '70%', marginTop: verticalScale(15)},
  quotesCont: {
    height: horizontalScale(345),
    width: windowWidth * 0.95,
    alignSelf: 'center',
  },
  swiperContainer: {
    width: windowWidth * 0.95,
    height: horizontalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperCard: bgColor => ({
    width: windowWidth * 0.95,
    height: horizontalScale(300),
    borderRadius: moderateScale(10),
    marginTop: '-6%',
    marginLeft: '-5%',
    backgroundColor: bgColor || COLORS.announcementCard,
  }),
  quotesImg: {
    width: windowWidth * 0.95,
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
