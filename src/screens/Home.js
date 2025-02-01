import {
  FlatList,
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
  ParallexShimmer,
  YoutubeShimmer,
} from '../components/Shimmer';
import {API} from '../services/API';

const Home = props => {
  const {navigation} = props;

  const [homeData, setHomeData] = useState([
    {section: '1', title: 'Daily ', updates: [{id: 1, link: ''}]},
    {section: '2', title: 'Daily 2', updates: [{id: 1, link: ''}]},
    {section: '3', title: 'Daily 3', updates: [{id: 1, link: ''}]},
    {section: '4', title: 'Daily 4', updates: [{id: 1, link: ''}]},
  ]);
  const [playVideo, setPlayVideo] = useState(true);
  const [youtubeAudio, setYoutubeAudio] = useState(true);
  const [shimmer, setShimmer] = useState({content: true, video: true});

  useEffect(() => {
    getHomeScreenData();
  }, []);

  const getHomeScreenData = async () => {
    try {
      const response = await API.getHomeScreenData();

      console.log('response', response.data);
      const {data} = response;
      if (data.SuccessCode === 1) {
        // setHomeData(data);
        setHomeData([
          {
            section: 1,
            title: 'Daily D1',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 2,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 3,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 4,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 5,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 6,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 7,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 8,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 9,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 10,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
            ],
          },
          {
            section: 2,
            title: 'Daily D2',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
            ],
          },
          {
            section: 4,
            title: 'Daily D2',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
            ],
          },
          {
            section: 3,
            title: 'Daily D2',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 112,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 141,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 242461,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 261,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },

              {
                id: 12626,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 1135,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 11335,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 1315,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 17686,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 167,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 17,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 1676,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 16799,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
              {
                id: 1969,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 1959,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 1939,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 177,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 1789,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
              {
                id: 100,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
                text: 'ISKCON Sri Radha Krishna temple was inaugurated in the year 1997. It is not just a temple, but a cultural complex housing the temples dedicated to the Deities of Sri Sri Radha Krishnachandra, Sri Sri Krishna Balarama, Sri Sri Nitai Gauranga, Sri Srinivasa Govinda, Sri Prahlada Narasimha, Bhakta Hanuman, Garudadeva and Srila Prabhupada, Founder Acharya of ISKCON. ISKCON Bangalore is a charitable society with the objective of propagating Krishna Consciousness all over the world, as explained by Srila Prabhupada, whose teachings are based on Bhagavad-gita and Srimad Bhagavatam.',
              },
            ],
          },
        ]);
      } else {
        setHomeData([
          {
            section: 2,
            title: 'Daily D1',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
            ],
          },
          {
            section: 1,
            title: 'Daily D2',
            updates: [
              {
                id: 1,
                link: 'https://pbs.twimg.com/media/GE_c0W2XoAAmyUQ.jpg:large',
              },
            ],
          },
        ]);
      }
      setShimmer(prev => ({video: false, content: false}));
    } catch (err) {
      console.log('ERR-Home-screen', err);
    }
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlayVideo(false);
    }
  });

  const navigateScreen = (screen, params) => {
    navigation.navigate(screen, params);
  };

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
                      {
                        marginTop:
                          updateIndex === 0
                            ? verticalScale(10)
                            : verticalScale(20),
                      },
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
                          ? verticalScale(5)
                          : verticalScale(20),
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
          {shimmer?.content ? (
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
                // onReady={() => {
                //   setShimmer(prev => ({...prev, Video: false}));
                //   console.log('FIERSTSYFY');
                // }}
                // onError={() => {
                //   setShimmer(prev => ({...prev, Video: false}));
                //   console.log('FIERSTSYFY');
                // }}
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

  const renderItemsInOrder = (item, index) => {
    switch (String(item?.section)) {
      case '1':
        return <DailyDarshan key={index} data={item} index={index} />;
      case '2':
        return <Quotes key={index} data={item} index={index} />;

      case '3':
        return <FolkUpdates key={index} data={item} index={index} />;

      case '4':
        return <YoutubeVideos key={index} data={item} index={index} />;

      default:
        return null;
    }
  };

  console.log('HM_DATA', homeData);

  return (
    <Container>
      <SafeAreaView styles={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          toggleDrawer={() => navigation.openDrawer()}
          titleName={screenNames.home}
        />

        {/* // # Contents */}
        <View style={styles.contentCont}>
          <View style={styles.halfBg} />
          <FlatList
            data={homeData}
            keyExtractor={item => item?.section}
            contentContainerStyle={{minHeight: screenHeight}}
            renderItem={({item, index}) => {
              if (shimmer?.content || homeData?.length > 0) {
                return renderItemsInOrder(item, index);
              } else {
                return null;
              }
            }}
          />
        </View>
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
  contentCont: {backgroundColor: COLORS.paleYellow},
  dailyDarshanCont: {
    width: '100%',
    // position: 'relative',
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
