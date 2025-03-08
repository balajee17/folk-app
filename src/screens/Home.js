import {
  Image,
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
import LinearGradient from 'react-native-linear-gradient';
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

const Home = ({apiData, shimmer}) => {
  const {setSelScreen} = useAppContext();

  const navigation = useNavigation();

  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelScreen(prev => ({...prev, current: 'DB1'}));
    }
  }, [isFocused]);

  // # Youtube Video onStateChange
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  // # Navigate Sreen
  const navigateScreen = (screen, params) => {
    navigation.navigate(screen, params);
  };

  // # Section Title
  const RenderSecTitle = (title, color, icnLink) => {
    return (
      <View style={[{flexDirection: 'row'}]}>
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
      </View>
    );
  };

  // # History Icon
  const RenderHistoryIcon = (title, navigateTo, icnColor) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigateScreen(navigateTo, {
            title: title,
          })
        }
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
                    index > 0 ? COLORS.gableGreen : COLORS.white,
                    icnLink,
                  )}
                  {RenderHistoryIcon(
                    TITLE,
                    screenNames.dailyDarshan,
                    index > 0 ? COLORS.gableGreen : COLORS.white,
                  )}
                </>
              )
            )}
          </View>
          {shimmer ? (
            <ParallexShimmer />
          ) : (
            UPDATES?.length > 0 && (
              <ParallexCarousel carouselItems={UPDATES} autoScroll />
            )
          )}
        </View>
        {!shimmer && apiData?.length - 1 > index && (
          <View style={styles.horizontalLine} />
        )}
      </>
    );
  };

  // @  Quotes
  const Quotes = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;
    return (
      <>
        <View
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
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                  icnLink,
                )}
                {RenderHistoryIcon(
                  TITLE,
                  screenNames.quotes,
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                )}
              </>
            )
          )}
        </View>

        {shimmer ? (
          <ImageShimmer
            width={'95%'}
            height={verticalScale(300)}
            borderRadius={moderateScale(15)}
            marginTop={verticalScale(12)}
            alignSelf={'center'}
          />
        ) : (
          UPDATES?.length > 0 && (
            <View style={styles.quotesImgCont}>
              <Image
                style={[MyStyles.quotesImg]}
                source={{
                  uri: UPDATES[0]?.link,
                }}
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

  // @  Folk Updates
  const FolkUpdates = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    const icnLink = data?.icon;
    return (
      <>
        <View
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
                index === 0 ? COLORS.white : COLORS.gableGreen,
                icnLink,
              )}
              {RenderHistoryIcon(
                TITLE,
                screenNames.updates,
                index === 0 ? COLORS.white : COLORS.gableGreen,
              )}
            </>
          )}
        </View>

        {!shimmer &&
          // (
          //   <>
          //     <ImageShimmer
          //       width={'95%'}
          //       height={verticalScale(250)}
          //       borderRadius={moderateScale(15)}
          //       marginTop={verticalScale(10)}
          //       alignSelf={'center'}
          //     />
          //     <ImageShimmer
          //       width={'95%'}
          //       height={verticalScale(120)}
          //       borderRadius={moderateScale(15)}
          //       marginTop={verticalScale(10)}
          //       alignSelf={'center'}
          //     />
          //   </>
          // ) :

          UPDATES?.length > 0 &&
          UPDATES?.map((updateItem, updateIndex) => {
            return (
              <>
                {!!updateItem?.link && (
                  <View key={updateItem?.id} style={[styles.quotesImgCont]}>
                    <Image
                      style={MyStyles.quotesImg}
                      source={{
                        uri: updateItem?.link,
                      }}
                    />
                  </View>
                )}
                {updateItem?.text && (
                  <View
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
                    <LinearGradient
                      start={{x: 0.3, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={['#353a5f', '#9ebaf3']}
                      style={[MyStyles.gradient]}>
                      <View style={{padding: moderateScale(10)}}>
                        {/* <Text style={MyStyles.updateTitle}>
                                  Welcome to Folk App
                                </Text> */}
                        {/* <Text
                                  style={[
                                    MyStyles.updateTxt,
                                    {fontSize: SIZES.xl},
                                  ]}>
                                  Vaikunta Ekadasi,
                                </Text> */}
                        <Text style={[MyStyles.updateTxt, {marginTop: 0}]}>
                          {updateItem?.text}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                )}
              </>
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
          style={[
            styles.textHstryIcon,
            MyStyles.paddingHor10,
            {marginTop: index === 0 ? verticalScale(15) : 0},
          ]}>
          {!shimmer && UPDATES?.length > 0 && (
            <>
              {RenderSecTitle(
                TITLE,
                index === 0 ? COLORS.white : COLORS.gableGreen,
                icnLink,
              )}
              {RenderHistoryIcon(
                TITLE,
                screenNames.folkVideos,
                index === 0 ? COLORS.white : COLORS.gableGreen,
              )}
            </>
          )}
        </View>

        <View style={[MyStyles.youtubeCont]}>
          {!shimmer &&
            //  (
            //   <YoutubeShimmer
            //     width={windowWidth * 0.95}
            //     height={windowWidth * 0.95 * (9 / 16)}
            //     borderRadius={moderateScale(15)}
            //   />
            // ) :
            UPDATES?.length > 0 && (
              <YoutubePlayer
                width={windowWidth * 0.95}
                height={windowWidth * 0.95 * (9 / 16)}
                webViewStyle={{
                  borderRadius: moderateScale(15),
                }}
                play={playVideo}
                onReady={() => {
                  // setShimmer(prev => ({...prev, video: false}));
                }}
                onError={() => {
                  // setShimmer(prev => ({...prev, video: false}));
                }}
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
        return <DailyDarshan key={index} data={item} index={index} />;
      case 2:
        return <Quotes key={index} data={item} index={index} />;

      case 3:
        return <FolkUpdates key={index} data={item} index={index} />;

      case 4:
        return <YoutubeVideos key={index} data={item} index={index} />;

      default:
        return null;
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          paddingBottom: shimmer ? 0 : verticalScale(180),
        }}>
        <View style={MyStyles.contentCont}>
          <LinearGradient
            colors={[
              'rgba(65, 110, 189, 1)',
              'rgba(65, 110, 189, 0.9)',
              'rgba(65, 110, 189, 0.6)',
              'rgba(65, 110, 189, 0.1)',
              COLORS.white,
            ]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.halfBg}
          />

          {apiData?.map((item, index) => {
            if (shimmer || apiData?.length > 0) {
              return renderItemsInOrder(item, index);
            } else {
              return null;
            }
          })}
        </View>
      </ScrollView>
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
  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(300),
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
    width: '70%',
    textAlignVertical: 'center',
  },
  horizontalLine: {
    height: verticalScale(0.5),
    width: '100%',
    backgroundColor: COLORS.highLightColor,
    marginVertical: verticalScale(30),
  },
  shimmerCont: {width: '70%', marginTop: verticalScale(15)},
});
