import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  screenWidth,
  SIZES,
  verticalScale,
  windowHeight,
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
  YoutubeShimmer,
} from '../components/Shimmer';
import {API} from '../services/API';

const Home = props => {
  const {navigation} = props;

  const [homeData, setHomeData] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);
  const [shimmer, setShimmer] = useState({
    titleIcn: true,
    parallex: true,
    quotesImg: true,
    updatesImg: false,
    youtubeShimmer: true,
  });

  useEffect(() => {
    getHomeScreenData();
  }, []);

  useEffect(() => {
    console.log('IMG-DIMEN', imageDimensions);
  }, []);

  const getHomeScreenData = async () => {
    try {
      const response = await API.getHomeScreenData();

      console.log('response', response.data);
      const {data} = response;
      if (data.SuccessCode === 1) {
        const checkQuotes = data.hasOwnProperty('section2');
        const checkUpdates = data.hasOwnProperty('section3');

        if (checkQuotes) {
          getImgDimension(data?.section2?.images, 'quotesWid', 'quotesHgt');
        }

        if (checkUpdates) {
          getImgDimension(data?.section3?.updates, 'updatesWid', 'updatesHgt');
        }
        setHomeData(data);
      } else {
      }
      handleShimmer('titleIcn', false);
    } catch (err) {
      console.log('ERR-Home-screen', err);
    }
  };

  const getImgDimension = (imageLinks, key_width, key_height) => {
    imageLinks?.map((imageLink, index) => {
      if (imageLink?.link) {
        Image.getSize(
          imageLink.link,
          (width, height) => {
            setImageDimensions(prev => {
              // Ensure prev is an object before spreading
              const updatedDimensions = {
                ...prev, // If prev is undefined, this will initialize it as an empty object
                [key_width]: [...(prev?.[key_width] || []), width],
                [key_height]: [...(prev?.[key_height] || []), height],
              };

              console.log('IMG-DIMEN', updatedDimensions); // Logs the updated image dimensions

              return updatedDimensions;
            });
          },
          error => {
            console.error(
              `Error fetching dimensions for image at index ${index}:`,
              error,
            );
          },
        );
      }
    });
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  const handleShimmer = (key, value) => {
    setShimmer(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const navigateScreen = screen => {
    navigation.navigate(screen);
  };

  const Section1 = homeData?.section1?.images;
  const Section2 = homeData?.section2?.images;
  const Section3 = homeData?.section3?.updates;
  const Section4 = homeData?.section4?.images;

  const Section1_Title = homeData?.section1?.title;
  const Section2_Title = homeData?.section2?.title;
  const Section3_Title = homeData?.section3?.title;
  const Section4_Title = homeData?.section4?.title;

  const checkSection1 = homeData?.hasOwnProperty('section1');
  const checkSection2 = homeData?.hasOwnProperty('section2');
  const checkSection3 = homeData?.hasOwnProperty('section3');
  // const checkSection4 = homeData?.hasOwnProperty('section4');

  return (
    <Container>
      <SafeAreaView styles={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          toggleDrawer={() => navigation.openDrawer()}
          titleName={screenNames.home}
        />

        {/* // # Contents */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            MyStyles.scrollView,
            {
              paddingBottom: verticalScale(80),
            },
          ]}>
          <View style={styles.contentCont}>
            <View style={styles.halfBg} />

            {/* // @ Daily Darshana - Carousel  */}
            {Section1?.length > 0 && (
              <View style={[styles.dailyDarshanCont, styles.padVert10]}>
                <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                  {shimmer?.titleIcn ? (
                    <HomeTitleShimmer />
                  ) : (
                    <Text
                      style={[
                        MyStyles.subTitleText,
                        {
                          color: COLORS.golden,
                        },
                      ]}>
                      {Section1_Title}
                    </Text>
                  )}
                  {shimmer?.titleIcn ? (
                    <HomeIconShimmer />
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigateScreen(screenNames.dailyDarshan)}
                      style={styles.historyIcon}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name="history"
                        size={moderateScale(25)}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <ParallexCarousel
                  shimmer={shimmer?.parallex}
                  setShimmer={value => handleShimmer('parallex', value)}
                  carouselItems={homeData?.section1?.images}
                  autoScroll={true}
                />
              </View>
            )}

            {/* // @  Quotes  */}
            {Section2?.length > 0 && (
              <View style={{paddingBottom: verticalScale(10)}}>
                <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                  {shimmer?.titleIcn ? (
                    <HomeTitleShimmer />
                  ) : (
                    <Text
                      style={[
                        MyStyles.subTitleText,
                        {
                          color: !checkSection1
                            ? COLORS.golden
                            : COLORS.gableGreen,
                        },
                      ]}>
                      {Section2_Title}
                    </Text>
                  )}
                  {shimmer?.titleIcn ? (
                    <HomeIconShimmer />
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigateScreen(screenNames.quotes)}
                      style={styles.historyIcon}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name="history"
                        size={moderateScale(25)}
                        color={checkSection1 ? COLORS.gableGreen : COLORS.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={styles.quotesImgCont(
                    imageDimensions?.quotesWid[0] || 135,
                    imageDimensions?.quotesHgt[0] || 76,
                  )}>
                  {shimmer?.quotesImg ? (
                    <ImageShimmer
                      width={'100%'}
                      height={'100%'}
                      borderRadius={moderateScale(15)}
                    />
                  ) : (
                    <Image
                      style={MyStyles.quotesImg}
                      source={{
                        uri: homeData?.section2?.images[0]?.link,
                      }}
                      onLoadStart={() => {
                        console.log('Image loading started...');
                        !shimmer?.quotesImg && handleShimmer('quotesImg', true);
                      }}
                      onLoadEnd={() => {
                        console.log('Image ENDED...');
                        handleShimmer('quotesImg', false);
                      }}
                      onError={() => {
                        console.log('Image failed to load.');
                        handleShimmer('quotesImg', false); // Hide shimmer on error
                      }}
                    />
                  )}
                </View>
              </View>
            )}

            {/* // @  Folk Updates  */}
            {Section3?.length > 0 && (
              <View style={styles.padVert10}>
                <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                  {shimmer?.titleIcn ? (
                    <HomeTitleShimmer />
                  ) : (
                    <Text
                      style={[
                        MyStyles.subTitleText,
                        {
                          color:
                            !checkSection1 && !checkSection2
                              ? COLORS.golden
                              : COLORS.gableGreen,
                        },
                      ]}>
                      {Section3_Title}
                    </Text>
                  )}
                  {shimmer?.titleIcn ? (
                    <HomeIconShimmer />
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigateScreen(screenNames.updates)}
                      style={styles.historyIcon}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name="history"
                        size={moderateScale(25)}
                        color={
                          checkSection1 && checkSection2
                            ? COLORS.gableGreen
                            : COLORS.white
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {shimmer?.updatesImg ? (
                  <>
                    <ImageShimmer
                      width={'95%'}
                      height={verticalScale(300)}
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
                  Section3.map((item, index) => {
                    return (
                      <View
                        key={item?.id}
                        style={styles.quotesImgCont(
                          imageDimensions?.updatesWid[index] || 135,
                          imageDimensions?.updatesHgt[index] || 76,
                        )}>
                        {!!item?.link && (
                          <Image
                            style={MyStyles.quotesImg}
                            source={{
                              uri: item?.link,
                            }}
                            onLoadStart={() => {
                              console.log('Image loading started...');
                              if (!shimmer?.updatesImg) {
                                handleShimmer('updatesImg', true);
                              }
                            }}
                            onLoadEnd={() => {
                              console.log('Image loading ended...');
                              handleShimmer('updatesImg', false);
                            }}
                            onError={() => {
                              console.log('Image failed to load.');
                              handleShimmer('updatesImg', false);
                            }}
                          />
                        )}
                        {!!item?.text && (
                          <View
                            style={[
                              MyStyles.paddingHor10,
                              MyStyles.updatesTextCont,
                            ]}>
                            <LinearGradient
                              start={{x: 0.3, y: 0}}
                              end={{x: 1, y: 1}}
                              colors={['#353a5f', '#9ebaf3']}
                              style={[MyStyles.gradient, MyStyles.marTop10]}>
                              <View style={{padding: moderateScale(10)}}>
                                <Text style={MyStyles.updateTitle}>
                                  Welcome to Folk App
                                </Text>
                                <Text
                                  style={[
                                    MyStyles.updateTxt,
                                    {fontSize: SIZES.xl},
                                  ]}>
                                  Vaikunta Ekadasi,
                                </Text>
                                <Text style={MyStyles.updateTxt}>
                                  {item?.text}
                                </Text>
                              </View>
                            </LinearGradient>
                          </View>
                        )}
                      </View>
                    );
                  })
                )}
              </View>
            )}

            {/* // @ Youtube Videos */}
            {Section4?.length > 0 && (
              <View style={styles.padVert10}>
                <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                  {shimmer?.titleIcn ? (
                    <HomeTitleShimmer />
                  ) : (
                    <Text
                      style={[
                        MyStyles.subTitleText,
                        {
                          color:
                            !checkSection1 && !checkSection2 && !checkSection3
                              ? COLORS.golden
                              : COLORS.gableGreen,
                        },
                      ]}>
                      {Section4_Title}
                    </Text>
                  )}

                  {shimmer?.titleIcn ? (
                    <HomeIconShimmer />
                  ) : (
                    <TouchableOpacity
                      onPress={() => navigateScreen(screenNames.folkVideos)}
                      style={styles.historyIcon}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name="history"
                        size={moderateScale(25)}
                        color={
                          checkSection1 && checkSection2 && checkSection3
                            ? COLORS.gableGreen
                            : COLORS.white
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
                  {shimmer?.youtubeShimmer ? (
                    <YoutubeShimmer
                      width={windowWidth * 0.95}
                      height={windowWidth * 0.95 * (9 / 16)}
                      borderRadius={moderateScale(15)}
                    />
                  ) : (
                    <YoutubePlayer
                      width={windowWidth * 0.95}
                      height={windowWidth * 0.95 * (9 / 16)}
                      webViewStyle={{
                        borderRadius: moderateScale(15),
                      }}
                      play={playVideo}
                      mute={youtubeAudio}
                      videoId={'kaVrPCxg_us'}
                      onChangeState={onStateChange}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
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
  contentCont: {height: screenHeight, backgroundColor: COLORS.paleYellow},
  dailyDarshanCont: {
    width: '100%',
    position: 'relative',
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
  quotesImgCont: (width, height) => ({
    width: windowWidth,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    aspectRatio: width / height,
    borderRadius: moderateScale(15),
    ...MyStyles.paddingHor10,
  }),

  padVert10: {paddingVertical: verticalScale(10)},

  //SKELETON
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e1e9ee',
  },
  skeletonTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  skeletonTitle: {
    width: '80%',
    height: 20,
    backgroundColor: '#e1e9ee',
    marginBottom: 8,
  },
  skeletonSubtitle: {
    width: '60%',
    height: 16,
    backgroundColor: '#e1e9ee',
  },
});
