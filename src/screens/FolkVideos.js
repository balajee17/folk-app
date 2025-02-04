import {
  FlatList,
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
  verticalScale,
  windowHeight,
  windowWidth,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import YoutubePlayer from 'react-native-youtube-iframe';
import {TitleShimmer, YoutubeShimmer} from '../components/Shimmer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const FolkVideos = ({navigation, route}) => {
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);
  const [shimmer, setShimmer] = useState({video: true, text: false});

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  const {title} = route?.params;

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader goBack={() => navigation.goBack()} titleName={title} />
        {/* // # Contents */}
        <View style={[styles.contentContainer, MyStyles.paddingHor10]}>
          <View style={{flex: 0.6}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* // # Youtube Video */}
              <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
                {shimmer?.video ? (
                  <YoutubeShimmer />
                ) : (
                  <YoutubePlayer
                    width={windowWidth * 0.95}
                    height={windowWidth * 0.95 * (9 / 16)}
                    webViewStyle={{
                      borderRadius: moderateScale(15),
                    }}
                    onReady={() => {
                      setShimmer(prev => ({...prev, video: false}));
                    }}
                    play={playVideo}
                    mute={youtubeAudio}
                    videoId={'kaVrPCxg_us'}
                    onChangeState={onStateChange}
                  />
                )}
              </View>
              {/* // # Video Description */}
              {shimmer?.text ? (
                <>
                  <View style={styles.videoContainer}>
                    <View style={{width: '72%'}}>
                      <SkeletonPlaceholder
                        highlightColor={COLORS.highLightColor}
                        backgroundColor={COLORS.shimmerBg}>
                        <SkeletonPlaceholder.Item
                          height={verticalScale(15)}
                          width={'100%'}
                          borderRadius={20}
                        />
                      </SkeletonPlaceholder>
                    </View>
                    <View style={{width: '27%'}}>
                      <SkeletonPlaceholder
                        highlightColor={COLORS.highLightColor}
                        backgroundColor={COLORS.shimmerBg}>
                        <SkeletonPlaceholder.Item
                          height={verticalScale(15)}
                          width={'100%'}
                          borderRadius={20}
                        />
                      </SkeletonPlaceholder>
                    </View>
                  </View>

                  <SkeletonPlaceholder
                    highlightColor={COLORS.highLightColor}
                    backgroundColor={COLORS.shimmerBg}>
                    <SkeletonPlaceholder.Item
                      height={verticalScale(10)}
                      width={'80%'}
                      borderRadius={20}
                      marginTop={'5%'}
                    />
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder
                    highlightColor={COLORS.highLightColor}
                    backgroundColor={COLORS.shimmerBg}>
                    <SkeletonPlaceholder.Item
                      height={verticalScale(10)}
                      width={'70%'}
                      borderRadius={20}
                      marginTop={'1%'}
                    />
                  </SkeletonPlaceholder>
                </>
              ) : (
                <>
                  <View style={[styles.videoContainer]}>
                    <Text style={styles.videoTitle}>
                      Sri Radha Krishna Temple
                    </Text>
                    <Text style={styles.dateTxt}>13-Dec-2024</Text>
                  </View>
                  <Text style={styles.descrpTxt}>
                    ISKCON stands for International Society for Krishna
                    Consciousness. Srila Prabhupada who went to the United
                    States of America in the year 1966 to spread the message of
                    Krishna and engage people in the practice of the yuga-dharma
                    (chanting of the holy names of Krishna) established this
                    society in 1966.
                  </Text>
                </>
              )}
            </ScrollView>
          </View>

          <View style={{flex: 0.4}}>
            {/* // # Youtube Videos List */}
            <View style={styles.historyCont}>
              {shimmer?.text ? (
                Array(5)
                  .fill(5)
                  .map(_ => {
                    return (
                      <>
                        <TitleShimmer
                          width={'30%'}
                          marginTop={'2%'}
                          height={verticalScale(15)}
                        />

                        <View style={styles.historyVideoCont}>
                          <View>
                            <SkeletonPlaceholder
                              highlightColor={COLORS.highLightColor}
                              backgroundColor={COLORS.shimmerBg}>
                              <SkeletonPlaceholder.Item
                                width={horizontalScale(88)}
                                height={horizontalScale(80)}
                                resizeMode={'cover'}
                                borderRadius={moderateScale(8)}
                              />
                            </SkeletonPlaceholder>
                          </View>

                          <View style={[styles.histVideoTitleCont]}>
                            <View>
                              <SkeletonPlaceholder
                                highlightColor={COLORS.highLightColor}
                                backgroundColor={COLORS.shimmerBg}>
                                <SkeletonPlaceholder.Item
                                  width={'100%'}
                                  height={horizontalScale(12)}
                                  resizeMode={'cover'}
                                  borderRadius={moderateScale(8)}
                                />
                              </SkeletonPlaceholder>
                            </View>
                            <View>
                              <SkeletonPlaceholder
                                highlightColor={COLORS.highLightColor}
                                backgroundColor={COLORS.shimmerBg}>
                                <SkeletonPlaceholder.Item
                                  width={'80%'}
                                  height={horizontalScale(8)}
                                  resizeMode={'cover'}
                                  borderRadius={moderateScale(8)}
                                  marginTop={'6%'}
                                />
                              </SkeletonPlaceholder>
                            </View>
                            <View>
                              <SkeletonPlaceholder
                                highlightColor={COLORS.highLightColor}
                                backgroundColor={COLORS.shimmerBg}>
                                <SkeletonPlaceholder.Item
                                  width={'70%'}
                                  height={horizontalScale(8)}
                                  resizeMode={'cover'}
                                  borderRadius={moderateScale(8)}
                                  marginTop={'2%'}
                                />
                              </SkeletonPlaceholder>
                            </View>
                          </View>
                        </View>
                      </>
                    );
                  })
              ) : (
                <FlatList
                  // data={}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item?.id}
                  renderItem={({item, index}) => {
                    return (
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
                            <Text
                              style={[styles.videoTitle, styles.width100Per]}>
                              Sri Radha Krishna Temple
                            </Text>
                            <Text numberOfLines={2} style={styles.descrpTxt}>
                              ISKCON stands for International Society for
                              Krishna Consciousness. Srila Prabhupada who went
                              to the United
                            </Text>
                          </View>
                        </View>
                      </>
                    );
                  }}
                />
              )}
            </View>
          </View>
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
