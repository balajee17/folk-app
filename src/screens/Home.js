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
  windowWidth,
} from '../styles/MyStyles';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utils/GetImage';
import {screenNames} from '../constants/ScreenNames';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ParallexCarousel from '../components/ParallexCarousel';
import YoutubePlayer from 'react-native-youtube-iframe';

const Home = () => {
  const imageSource = [
    {
      id: 1,
      image: 'https://i.ytimg.com/vi/lWp58c3NOHU/hqdefault.jpg',
    },
    {
      id: 2,
      image:
        'https://i.ytimg.com/vi/WYPGdCz5ecI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCIekOyrKEWTgaOJosw_l5I_Prr1Q',
    },
    {
      id: 3,
      image: 'https://yometro.com/images/places/iskcon-temples.jpg',
    },
    {
      id: 4,
      image: 'https://i.ytimg.com/vi/LuE9riw-klA/maxresdefault.jpg',
    },
  ];

  const [imageDimensions, setImageDimensions] = useState({});
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);

  const [quotesImg, setQuotesImg] = useState(
    'https://pbs.twimg.com/media/Ft_jtRaagAM_PJD.jpg:large',
  );
  const updates = 'Text';

  useEffect(() => {
    // Fetch the dimensions of the image
    Image.getSize(
      quotesImg,
      (width, height) => {
        setImageDimensions({width: width, height: height});
      },
      error => {
        console.error('Error fetching image dimensions:', error);
      },
    );
  }, [quotesImg]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={COLORS.charcoal}
        barStyle="light-content"
        animated
      />
      {/* // @ Gradient BackGround */}
      <SafeAreaView style={styles.contentContainer}>
        {/* // # Header */}
        <View style={[styles.header]}>
          <TouchableOpacity
            activeOpacity={0.6} // Menu Drawer Icon
            style={styles.menuIcon}>
            <Image
              style={styles.menuImage}
              source={getImage.menu}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* Title */}
          <Text style={MyStyles.titleText}>{screenNames.home}</Text>
          <TouchableOpacity
            activeOpacity={0.6} // Notification Icon
            style={styles.menuIcon}>
            <Image
              style={styles.notifyImage}
              source={getImage.notification}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(8),
            backgroundColor: COLORS.paleYellow,
          }}>
          {/* // @ Daily Darshana - Carousel  */}
          <View style={[styles.dailyDarshanCont, styles.padVert10]}>
            <View style={styles.halfBg} />

            <View style={[styles.textHstryIcon, styles.paddingHor10]}>
              <Text
                style={[
                  MyStyles.subTitleText,
                  {
                    color: COLORS.golden,
                  },
                ]}>
                Daily Darshan
              </Text>
              <TouchableOpacity style={styles.historyIcon} activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="history"
                  size={moderateScale(25)}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            <ParallexCarousel carouselItems={imageSource} autoScroll={true} />
          </View>

          {/* // @  Quotes  */}
          <View style={{paddingBottom: verticalScale(10)}}>
            <View style={[styles.textHstryIcon, styles.paddingHor10]}>
              <Text style={[MyStyles.subTitleText]}>Quotes</Text>
              <TouchableOpacity style={styles.historyIcon} activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="history"
                  size={moderateScale(25)}
                  color={COLORS.gableGreen}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.quotesImgCont(imageDimensions)}>
              <Image
                style={styles.quotesImg}
                source={{
                  uri: quotesImg,
                }}
              />
            </View>
          </View>

          {/* // @  Folk Updates  */}
          <View style={styles.padVert10}>
            <View style={[styles.textHstryIcon, styles.paddingHor10]}>
              <Text style={[MyStyles.subTitleText]}>Folk Updates</Text>
              <TouchableOpacity style={styles.historyIcon} activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="history"
                  size={moderateScale(25)}
                  color={COLORS.gableGreen}
                />
              </TouchableOpacity>
            </View>
            {updates === 'image' ? (
              <View style={styles.quotesImgCont(imageDimensions)}>
                <Image
                  style={styles.quotesImg}
                  source={{
                    uri: quotesImg,
                  }}
                />
              </View>
            ) : (
              <View style={[styles.paddingHor10, styles.updatesTextCont]}>
                <LinearGradient
                  start={{x: 0.3, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#353a5f', '#9ebaf3']}
                  style={[styles.gradient, styles.marTop10]}>
                  <View style={{padding: moderateScale(10)}}>
                    <Text style={styles.updateTitle}>Welcome to Folk App</Text>
                    <Text style={[styles.updateTxt, {fontSize: SIZES.xl}]}>
                      Vaikunta Ekadasi,
                    </Text>
                    <Text style={styles.updateTxt}>
                      Vaikuntha Ekadashi is an important festival celebrated
                      every year. Ekadashi is the eleventh day of the fortnight
                      of the waxing or waning moon and occurs twice a month. But
                      the Ekadashi that occurs in the month of Margashirsha
                      (December – January) during the fortnight of the waxing
                      moon is of special significance and is glorified as
                      Vaikuntha Ekadashi. On this day, the gates of Vaikuntha
                      (the Lord’s abode) open to His ardent devotees. This is a
                      major festival of South India celebrated in all the
                      temples of Lord Vishnu.
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>

          {/* // @ Youtube Videos */}
          <View style={styles.padVert10}>
            <View style={[styles.textHstryIcon, styles.paddingHor10]}>
              <Text style={[MyStyles.subTitleText]}>Folk Videos</Text>
              <TouchableOpacity style={styles.historyIcon} activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="history"
                  size={moderateScale(25)}
                  color={COLORS.gableGreen}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.marTop10,
                {
                  borderRadius: moderateScale(15),
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
              <YoutubePlayer
                width={screenWidth * 0.95}
                height={screenHeight * 0.24}
                webViewStyle={{
                  // backgroundColor: 'red',
                  borderRadius: moderateScale(15),
                  // paddingHorizontal: moderateScale(10),
                }}
                play={playVideo}
                mute={youtubeAudio}
                videoId={'kaVrPCxg_us'}
                onChangeState={onStateChange}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: COLORS.charcoal},
  gradient: {
    borderRadius: moderateScale(15),
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.charcoal,
  },
  menuIcon: {
    padding: moderateScale(6),
    borderWidth: moderateScale(1),
    height: horizontalScale(35),
    width: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    borderColor: COLORS.osloGrey,
  },
  menuImage: {height: '80%', width: '80%'},
  notifyImage: {height: '90%', width: '90%'},
  historyIcon: {
    height: horizontalScale(35),
    width: horizontalScale(35),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyDarshanCont: {
    width: '100%',
    position: 'relative',
  },
  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
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

  paddingHor10: {paddingHorizontal: moderateScale(10)},
  marTop15: {marginTop: verticalScale(15)},
  quotesImgCont: imageDimensions => ({
    width: windowWidth,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    aspectRatio:
      (imageDimensions?.width || 135) / (imageDimensions?.height || 76),
    borderRadius: moderateScale(15),
  }),
  quotesImg: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(15),
  },
  padVert10: {paddingVertical: verticalScale(10)},
  updateTitle: {
    fontSize: SIZES.xxxl,
    textAlign: 'center',
    color: COLORS.golden,
    fontFamily: FONTS.aladinRegular,
  },
  updateTxt: {
    fontSize: SIZES.l,
    color: COLORS.white,
    fontFamily: FONTS.urbanistMedium,
    marginTop: '2%',
    lineHeight: 20,
  },
  updatesTextCont: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: moderateScale(15),
  },
  updatesBgImg: {
    marginTop: verticalScale(10),
    width: '100%',
    borderRadius: moderateScale(15),
  },
  marTop10: {marginTop: verticalScale(10)},
});
