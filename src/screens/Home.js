import {
  FlatList,
  Image,
  SafeAreaView,
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
  screenHeight,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import LinearGradient from 'react-native-linear-gradient';
import {screenNames} from '../constants/ScreenNames';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ParallexCarousel from '../components/ParallexCarousel';
import YoutubePlayer from 'react-native-youtube-iframe';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {
  HomeIconShimmer,
  HomeTitleShimmer,
  ImageShimmer,
  ParallexShimmer,
  YoutubeShimmer,
} from '../components/Shimmer';
import {API} from '../services/API';
import CustomBottomTab from '../components/CustomBottomTab';

const Home = props => {
  const {navigation} = props;

  const [homeData, setHomeData] = useState([
    {section: 1, title: '', updates: [{id: 1, link: ''}]},
    {section: 2, title: '', updates: [{id: 1, link: ''}]},
    {section: 3, title: '', updates: [{id: 1, link: ''}]},
    {section: 4, title: '', updates: [{id: 1, link: '', code: ''}]},
  ]);
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);
  const [shimmer, setShimmer] = useState({content: true, video: true});

  useEffect(() => {
    getHomeScreenData();
  }, []);

  // # API Call to get Darshan History
  const getHomeScreenData = async () => {
    try {
      const response = await API.getHomeScreenData();

      console.log('response', response?.data);
      const {data, SuccessCode} = response?.data;
      if (SuccessCode === 1) {
        setHomeData(data);
      } else {
        setHomeData([]);
      }
      setShimmer(prev => ({...prev, content: false}));
    } catch (err) {
      setHomeData([]);
      console.log('ERR-Home-screen', err);
    }
  };

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
  const RenderSecTitle = (title, color) => {
    return (
      <Text
        style={[
          MyStyles.subTitleText,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
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

    return (
      <View style={[styles.dailyDarshanCont, styles.padVert10]}>
        <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
          {shimmer?.content ? (
            <>
              <HomeTitleShimmer />
              <HomeIconShimmer />
            </>
          ) : (
            UPDATES?.length > 0 && (
              <>
                {RenderSecTitle(
                  TITLE,
                  index > 0 ? COLORS.gableGreen : COLORS.golden,
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
        {shimmer?.content ? (
          <ParallexShimmer />
        ) : (
          UPDATES?.length > 0 && (
            <ParallexCarousel carouselItems={UPDATES} autoScroll />
          )
        )}
      </View>
    );
  };

  // @  Quotes
  const Quotes = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    return (
      <View style={{paddingBottom: verticalScale(10)}}>
        <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
          {shimmer?.content ? (
            <>
              <HomeTitleShimmer />
              <HomeIconShimmer />
            </>
          ) : (
            UPDATES?.length > 0 && (
              <>
                {RenderSecTitle(
                  TITLE,
                  index === 0 ? COLORS.golden : COLORS.gableGreen,
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

        {shimmer?.content ? (
          <ImageShimmer
            width={'95%'}
            height={verticalScale(300)}
            borderRadius={moderateScale(15)}
            marginTop={verticalScale(10)}
            alignSelf={'center'}
          />
        ) : (
          UPDATES?.length > 0 && (
            <View style={styles.quotesImgCont}>
              <Image
                style={[MyStyles.quotesImg, {marginTop: verticalScale(10)}]}
                source={{
                  uri: UPDATES[0]?.link,
                }}
              />
            </View>
          )
        )}
      </View>
    );
  };

  // @  Folk Updates
  const FolkUpdates = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;
    return (
      <View style={styles.padVert10}>
        <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
          {shimmer?.content ? (
            <>
              <HomeTitleShimmer />
              <HomeIconShimmer />
            </>
          ) : (
            UPDATES?.length > 0 && (
              <>
                {RenderSecTitle(
                  TITLE,
                  index === 0 ? COLORS.golden : COLORS.gableGreen,
                )}
                {RenderHistoryIcon(
                  TITLE,
                  screenNames.updates,
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                )}
              </>
            )
          )}
        </View>

        {shimmer?.content ? (
          <>
            <ImageShimmer
              width={'95%'}
              height={verticalScale(250)}
              borderRadius={moderateScale(15)}
              marginTop={verticalScale(10)}
              alignSelf={'center'}
            />
            <ImageShimmer
              width={'95%'}
              height={verticalScale(120)}
              borderRadius={moderateScale(15)}
              marginTop={verticalScale(10)}
              alignSelf={'center'}
            />
          </>
        ) : (
          UPDATES?.length > 0 &&
          UPDATES?.map((updateItem, updateIndex) => {
            return (
              <>
                {!!updateItem?.link && (
                  <View
                    key={updateItem?.id}
                    style={[
                      styles.quotesImgCont,
                      {marginTop: updateIndex !== 0 ? '5%' : verticalScale(10)},
                    ]}>
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
          })
        )}
      </View>
    );
  };

  // @ Youtube Videos
  const YoutubeVideos = ({data, index}) => {
    const UPDATES = data?.updates;
    const TITLE = data?.title;

    console.log('UPDATES', UPDATES);
    return (
      <View style={styles.padVert10}>
        <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
          {shimmer?.content ? (
            <>
              <HomeTitleShimmer />
              <HomeIconShimmer />
            </>
          ) : (
            UPDATES?.length > 0 && (
              <>
                {RenderSecTitle(
                  TITLE,
                  index === 0 ? COLORS.golden : COLORS.gableGreen,
                )}
                {RenderHistoryIcon(
                  TITLE,
                  screenNames.folkVideos,
                  index === 0 ? COLORS.white : COLORS.gableGreen,
                )}
              </>
            )
          )}
        </View>
        <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
          {shimmer?.video ? (
            <YoutubeShimmer
              width={windowWidth * 0.95}
              height={windowWidth * 0.95 * (9 / 16)}
              borderRadius={moderateScale(15)}
            />
          ) : (
            UPDATES?.length > 0 && (
              <YoutubePlayer
                width={windowWidth * 0.95}
                height={windowWidth * 0.95 * (9 / 16)}
                webViewStyle={{
                  borderRadius: moderateScale(15),
                }}
                play={playVideo}
                onReady={() => {
                  setShimmer(prev => ({...prev, video: false}));
                }}
                onError={() => {
                  setShimmer(prev => ({...prev, video: false}));
                }}
                mute={youtubeAudio}
                videoId={UPDATES[0]?.code}
                onChangeState={onStateChange}
              />
            )
          )}
        </View>
      </View>
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
        contentContainerStyle={styles.scrollViewCont}>
        <View style={MyStyles.contentCont}>
          <View style={styles.halfBg} />

          {/* <FlatList
          data={homeData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.section}
          contentContainerStyle={styles.flatListCont}
          renderItem={({item, index}) => {
            if (shimmer?.content || homeData?.length > 0) {
              return renderItemsInOrder(item, index);
            } else {
              return null;
            }
          }}
        /> */}

          {homeData?.map((item, index) => {
            if (shimmer?.content || homeData?.length > 0) {
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
    height: verticalScale(200),
    backgroundColor: COLORS.charcoal,
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  textHstryIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  marTop15: {marginTop: verticalScale(15)},
  quotesImgCont: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    ...MyStyles.paddingHor10,
  },

  padVert10: {paddingVertical: verticalScale(10)},
  scrollViewCont: {
    paddingBottom: verticalScale(160),
    backgroundColor: COLORS.paleYellow,
  },
});
