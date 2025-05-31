import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import YoutubePlayer from 'react-native-youtube-iframe';
import {TitleShimmer, YoutubeShimmer} from '../components/Shimmer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import NoDataFound from '../components/NoDataFound';
import AndroidBackHandler from '../components/BackHandler';
import {useAppContext} from '../../App';

const FolkVideos = props => {
  const [videoControl, setVideoControl] = useState({
    playVideo: true,
    muteAudio: true,
  });
  const [playingVideo, setPlayingVideo] = useState({});
  const [shimmer, setShimmer] = useState({video: true, text: true});
  const [videosData, setVideosData] = useState([]);
  const {globalState} = useAppContext();
  const {cardColor} = globalState;

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setVideoControl(prev => ({...prev, playVideo: false}));
    }
  });
  const {navigation, route} = props;

  const {title} = route?.params;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getVideosHistory();
    return AndroidBackHandler.removerHandler();
  }, []);

  // # API Call to get Videos History
  const getVideosHistory = async () => {
    try {
      const response = await API.getVideosHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setVideosData(history);
        setPlayingVideo(history[0]);
      } else {
        setVideosData([]);
        toastMsg(message, 'warning');
      }
      setShimmer({video: false, text: false});
    } catch (err) {
      setVideosData([]);
      toastMsg('', 'error');
      setShimmer({video: false, text: false});
      console.log('ERR-Videos-screen', err);
    }
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader goBack={() => navigation.goBack()} titleName={title} />
      {/* // # Contents */}
      <View style={[styles.contentContainer, MyStyles.paddingHor10]}>
        <View style={{flex: 0.5}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* // # Youtube Video */}
            <View style={[MyStyles.marTop10, MyStyles.youtubeCont]}>
              {shimmer?.video ? (
                <YoutubeShimmer />
              ) : (
                <YoutubePlayer
                  videoId={playingVideo?.videos?.[0]?.vediocode}
                  width={windowWidth * 0.95}
                  height={windowWidth * 0.95 * (9 / 16)}
                  webViewStyle={{
                    borderRadius: moderateScale(15),
                  }}
                  onReady={() => {
                    console.log('Ready_VIDEO');
                    setShimmer(prev => ({...prev, video: false}));
                  }}
                  play={videoControl?.playVideo}
                  mute={videoControl?.muteAudio}
                  onChangeState={onStateChange}
                  onError={e => {
                    setShimmer(prev => ({...prev, video: false}));
                  }}
                />
              )}
            </View>
            {/* // # Video Description */}
            {shimmer?.text ? (
              <>
                <View style={styles.videoContainer}>
                  <View style={{width: '72%'}}>
                    <SkeletonPlaceholder
                      highlightColor={COLORS.border}
                      backgroundColor={COLORS.gunsmoke}>
                      <SkeletonPlaceholder.Item
                        height={verticalScale(15)}
                        width={'100%'}
                        borderRadius={20}
                      />
                    </SkeletonPlaceholder>
                  </View>
                  <View style={{width: '27%'}}>
                    <SkeletonPlaceholder
                      highlightColor={COLORS.border}
                      backgroundColor={COLORS.gunsmoke}>
                      <SkeletonPlaceholder.Item
                        height={verticalScale(15)}
                        width={'100%'}
                        borderRadius={20}
                      />
                    </SkeletonPlaceholder>
                  </View>
                </View>

                <SkeletonPlaceholder
                  highlightColor={COLORS.border}
                  backgroundColor={COLORS.gunsmoke}>
                  <SkeletonPlaceholder.Item
                    height={verticalScale(10)}
                    width={'80%'}
                    borderRadius={20}
                    marginTop={'5%'}
                  />
                </SkeletonPlaceholder>
                <SkeletonPlaceholder
                  highlightColor={COLORS.border}
                  backgroundColor={COLORS.gunsmoke}>
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
                    {playingVideo?.videos?.[0]?.title}
                  </Text>
                  <Text style={styles.dateTxt}>
                    {playingVideo?.videos?.[0]?.date}
                  </Text>
                </View>
                <Text style={styles.descrpTxt}>
                  {playingVideo?.videos?.[0]?.text}
                </Text>
              </>
            )}
          </ScrollView>
        </View>

        <View style={{flex: 0.5}}>
          {/* // # Youtube Videos List */}
          <View style={styles.historyCont(cardColor)}>
            {shimmer?.text ? (
              Array(3)
                .fill(3)
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
                            highlightColor={COLORS.border}
                            backgroundColor={COLORS.gunsmoke}>
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
                              highlightColor={COLORS.border}
                              backgroundColor={COLORS.gunsmoke}>
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
                              highlightColor={COLORS.border}
                              backgroundColor={COLORS.gunsmoke}>
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
                              highlightColor={COLORS.border}
                              backgroundColor={COLORS.gunsmoke}>
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
                data={videosData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item?.id}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <Text style={[styles.histDateTxt]}>{item?.day}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          playingVideo?.videos?.[0]?.id !==
                            item?.videos?.[0]?.id && setPlayingVideo(item);
                        }}
                        activeOpacity={0.7}
                        style={styles.historyVideoCont}>
                        <Image
                          source={{
                            uri: item?.videos[0]?.thumbnail_url,
                          }}
                          style={styles.histImgStyle}
                        />
                        <View style={styles.histVideoTitleCont}>
                          <Text style={[styles.videoTitle, styles.width100Per]}>
                            {item?.videos[0]?.title}
                          </Text>
                          <Text numberOfLines={2} style={styles.descrpTxt}>
                            {item?.videos[0]?.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  );
                }}
                ListEmptyComponent={NoDataFound}
              />
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default FolkVideos;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  historyCont: bgColor => ({
    backgroundColor: bgColor || COLORS.card,
    width: '100%',
    alignSelf: 'center',
    ...MyStyles.paddingHor10,
    borderRadius: moderateScale(15),
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    marginTop: '5%',
    marginBottom: '2%',
  }),
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
