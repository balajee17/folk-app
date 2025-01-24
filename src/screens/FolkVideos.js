import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  SIZES,
  windowHeight,
  windowWidth,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import YoutubePlayer from 'react-native-youtube-iframe';

const FolkVideos = ({navigation}) => {
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.folkVideos}
        />
        {/* // # Contents */}
        <View style={[styles.contentContainer, MyStyles.paddingHor10]}>
          {/* // # Youtube Video */}
          <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
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
          </View>
          {/* // # Video Description */}
          <View style={[styles.videoContainer]}>
            <Text style={styles.videoTitle}>Sri Radha Krishna Temple</Text>
            <Text style={styles.dateTxt}>13-Dec-2024</Text>
          </View>
          <Text style={styles.descrpTxt}>
            ISKCON stands for International Society for Krishna Consciousness.
            Srila Prabhupada who went to the United States of America in the
            year 1966 to spread the message of Krishna and engage people in the
            practice of the yuga-dharma (chanting of the holy names of Krishna)
            established this society in 1966.
          </Text>

          {/* // # Youtube Videos List */}
          <ScrollView
            style={{marginTop: '5%'}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.historyCont}>
              {Array(10)
                .fill(10)
                .map(item => (
                  <>
                    <Text style={[styles.histDateTxt]}>12-Dec-2024</Text>
                    <View style={styles.historyVideoCont}>
                      <Image
                        source={{
                          uri: 'https://live.staticflickr.com/6035/6242435909_d179bb7025_z.jpg',
                        }}
                        style={styles.histImgStyle}
                      />
                      <View style={styles.histVideoTitleCont}>
                        <Text style={[styles.videoTitle, styles.width100Per]}>
                          Sri Radha Krishna Temple
                        </Text>
                        <Text numberOfLines={2} style={styles.descrpTxt}>
                          ISKCON stands for International Society for Krishna
                          Consciousness. Srila Prabhupada who went to the United
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default FolkVideos;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.paleYellow,
  },
  videoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  videoTitle: {
    fontSize: SIZES.xl,
    color: COLORS.black,
    fontFamily: FONTS.urbanistBold,
    width: '72%',
  },
  width100Per: {width: '100%'},
  dateTxt: {
    fontSize: SIZES.l,
    color: COLORS.black,
    fontFamily: FONTS.urbanistRegular,
    width: '27%',
    textAlign: 'right',
  },
  descrpTxt: {
    fontSize: SIZES.l - 1,
    color: COLORS.black,
    fontFamily: FONTS.urbanistRegular,
    width: '100%',
    marginTop: '1%',
    lineHeight: 18,
  },
  historyCont: {
    backgroundColor: COLORS.davyGrey,
    width: '100%',
    alignSelf: 'center',
    ...MyStyles.paddingHor10,
    borderRadius: moderateScale(15),
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    marginTop: '5%',
    marginBottom: '2%',
  },
  historyVideoCont: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  histDateTxt: {
    fontFamily: FONTS.urbanistBold,
    width: '100%',
    textAlign: 'left',
    color: COLORS.black,
    fontSize: SIZES.l,
    marginTop: '2%',
  },
  histImgStyle: {
    width: horizontalScale(88),
    height: horizontalScale(80),
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  histVideoTitleCont: {
    width: '71%',
  },
});
