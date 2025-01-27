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

const Home = props => {
  const {navigation} = props;
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

  const navigateScreen = screen => {
    navigation.navigate(screen);
  };

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
            {paddingBottom: verticalScale(80)},
          ]}>
          <View style={styles.contentCont}>
            <View style={styles.halfBg} />

            {/* // @ Daily Darshana - Carousel  */}
            <View style={[styles.dailyDarshanCont, styles.padVert10]}>
              <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                <Text
                  style={[
                    MyStyles.subTitleText,
                    {
                      color: COLORS.golden,
                    },
                  ]}>
                  Daily Darshan
                </Text>
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
              </View>

              <ParallexCarousel carouselItems={imageSource} autoScroll={true} />
            </View>

            {/* // @  Quotes  */}
            <View style={{paddingBottom: verticalScale(10)}}>
              <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                <Text style={[MyStyles.subTitleText]}>Quotes</Text>
                <TouchableOpacity
                  onPress={() => navigateScreen(screenNames.quotes)}
                  style={styles.historyIcon}
                  activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="history"
                    size={moderateScale(25)}
                    color={COLORS.gableGreen}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.quotesImgCont(imageDimensions)}>
                <Image
                  style={MyStyles.quotesImg}
                  source={{
                    uri: quotesImg,
                  }}
                />
              </View>
            </View>

            {/* // @  Folk Updates  */}
            <View style={styles.padVert10}>
              <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                <Text style={[MyStyles.subTitleText]}>Folk Updates</Text>
                <TouchableOpacity
                  onPress={() => navigateScreen(screenNames.updates)}
                  style={styles.historyIcon}
                  activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="history"
                    size={moderateScale(25)}
                    color={COLORS.gableGreen}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.quotesImgCont(imageDimensions)}>
                <Image
                  style={MyStyles.quotesImg}
                  source={{
                    uri: 'https://pbs.twimg.com/media/FtJ9xsCaMAAvEsM.jpg:large',
                  }}
                />
              </View>

              <View style={[MyStyles.paddingHor10, MyStyles.updatesTextCont]}>
                <LinearGradient
                  start={{x: 0.3, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#353a5f', '#9ebaf3']}
                  style={[MyStyles.gradient, MyStyles.marTop10]}>
                  <View style={{padding: moderateScale(10)}}>
                    <Text style={MyStyles.updateTitle}>
                      Welcome to Folk App
                    </Text>
                    <Text style={[MyStyles.updateTxt, {fontSize: SIZES.xl}]}>
                      Vaikunta Ekadasi,
                    </Text>
                    <Text style={MyStyles.updateTxt}>
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
            </View>

            {/* // @ Youtube Videos */}
            <View style={styles.padVert10}>
              <View style={[styles.textHstryIcon, MyStyles.paddingHor10]}>
                <Text style={[MyStyles.subTitleText]}>Folk Videos</Text>
                <TouchableOpacity
                  onPress={() => navigateScreen(screenNames.folkVideos)}
                  style={styles.historyIcon}
                  activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="history"
                    size={moderateScale(25)}
                    color={COLORS.gableGreen}
                  />
                </TouchableOpacity>
              </View>
              <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
                <YoutubePlayer
                  width={windowWidth * 0.95}
                  height={windowWidth * 0.95 * (9 / 16)}
                  webViewStyle={{
                    borderRadius: moderateScale(15),
                    backgroundColor: 'red',
                  }}
                  play={playVideo}
                  mute={youtubeAudio}
                  videoId={'kaVrPCxg_us'}
                  onChangeState={onStateChange}
                />
              </View>
            </View>
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
  contentCont: {flex: 1, backgroundColor: COLORS.paleYellow},
  dailyDarshanCont: {
    width: '100%',
    position: 'relative',
  },

  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '8%',
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
  quotesImgCont: imageDimensions => ({
    width: windowWidth,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    aspectRatio:
      (imageDimensions?.width || 135) / (imageDimensions?.height || 76),
    borderRadius: moderateScale(15),
    ...MyStyles.paddingHor10,
  }),

  padVert10: {paddingVertical: verticalScale(10)},
});
