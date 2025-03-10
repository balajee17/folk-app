import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import Container from '../components/Container';
import AlbumCarousel from '../components/AlbumCarousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {DarshanShimmer} from '../components/Shimmer';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';

const DailyDarshan = ({navigation, route}) => {
  const [switchScreen, setSwitchSreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [shimmer, setShimmer] = useState(true);

  const [darshanData, setDarshanData] = useState([]);
  const {title} = route?.params;

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    getDarshanHistory();
  }, []);

  // # API Call to get Darshan History
  const getDarshanHistory = async () => {
    try {
      const response = await API.getDarshanHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setDarshanData(history);
      } else {
        setDarshanData([]);
        toastMsg(message, 'info');
      }
      setShimmer(false);
    } catch (err) {
      setDarshanData([]);
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-Darshan-screen', err);
    }
  };

  return (
    <>
      {!switchScreen ? (
        <Container>
          <SafeAreaView style={MyStyles.flex1}>
            {/* // # Header */}
            <CustomHeader
              goBack={() => navigation.goBack()}
              titleName={title}
            />
            {/* // # Contents */}
            <View style={MyStyles.contentContainer}>
              {shimmer ? (
                Array(3)
                  .fill(3)
                  .map((_, index) => <DarshanShimmer key={index} />)
              ) : (
                <FlatList
                  data={darshanData}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item?.id}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        <Text
                          style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                          {item?.day}
                        </Text>
                        {/* // # Image Container */}
                        <View style={MyStyles.imageContainer}>
                          {/* // # Left Container */}
                          <View style={MyStyles.leftImgCont}>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedItem({
                                  ...item,
                                  activeIndex: 0,
                                });
                                setSwitchSreen(true);
                              }}
                              activeOpacity={0.7}>
                              <Image
                                source={{
                                  uri: item?.images[0]?.link,
                                }}
                                style={styles.leftImg1}
                              />
                            </TouchableOpacity>
                            {item?.images?.length > 2 && (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedItem({
                                    ...item,
                                    activeIndex: 1,
                                  });
                                  setSwitchSreen(true);
                                }}
                                activeOpacity={0.7}>
                                <Image
                                  source={{
                                    uri: item?.images[1]?.link,
                                  }}
                                  style={[styles.leftImg1, styles.leftImg2]}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                          {/* // # Right Container */}
                          <View style={MyStyles.rightImgCont}>
                            {item?.images?.length > 3 && (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedItem({
                                    ...item,
                                    activeIndex: 2,
                                  });
                                  setSwitchSreen(true);
                                }}
                                activeOpacity={0.7}>
                                <Image
                                  source={{
                                    uri: item?.images[2]?.link,
                                  }}
                                  style={styles.rightImg1}
                                />
                              </TouchableOpacity>
                            )}
                            {item?.images?.length > 1 && (
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedItem({
                                    ...item,
                                    activeIndex:
                                      item?.images?.length === 2
                                        ? 1
                                        : item?.images?.length === 3
                                        ? 2
                                        : 3,
                                  });
                                  setSwitchSreen(true);
                                }}
                                activeOpacity={0.7}
                                style={[
                                  styles.blurImgCont,
                                  {
                                    marginTop:
                                      item?.images?.length >= 4
                                        ? '5%'
                                        : undefined,
                                  },
                                ]}>
                                <ImageBackground
                                  source={{
                                    uri:
                                      item?.images?.length === 2
                                        ? item?.images[1]?.link
                                        : item?.images?.length === 3
                                        ? item?.images[2]?.link
                                        : item?.images[3]?.link,
                                  }}
                                  imageStyle={[
                                    item?.images?.length > 4 &&
                                      styles.blurImageStyle,
                                    {borderRadius: moderateScale(10)},
                                  ]}
                                  blurRadius={item?.images?.length > 4 ? 4 : 0}
                                  style={[
                                    styles.rightImg1,
                                    {
                                      height:
                                        item?.images?.length === 2
                                          ? verticalScale(200)
                                          : verticalScale(190),
                                    },
                                  ]}>
                                  {item?.images?.length > 4 && (
                                    <View style={styles.transBgCont}>
                                      <Text style={styles.countTxt}>
                                        {`+${item?.images?.length - 4}`}
                                      </Text>
                                    </View>
                                  )}
                                </ImageBackground>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </>
                    );
                  }}
                />
              )}
            </View>
          </SafeAreaView>
        </Container>
      ) : (
        <AlbumCarousel
          selectedItem={selectedItem}
          activeIndex={selectedItem?.activeIndex}
          closeAlbum={() => {
            setSelectedItem({});
            setSwitchSreen(false);
          }}
        />
      )}
    </>
  );
};

export default DailyDarshan;

const styles = StyleSheet.create({
  leftImg1: {
    width: '100%',
    height: verticalScale(200),
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
  },
  leftImg2: {
    marginTop: '5%',
    height: verticalScale(112),
  },
  rightImg1: {
    width: '100%',
    height: verticalScale(122),
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
  },
  blurImgCont: {width: '100%'},
  blurImageStyle: {
    backgroundColor: 'rgba(56, 55, 55, 0.53)',
  },

  transBgCont: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(56, 55, 55, 0.33)',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTxt: {
    fontSize: SIZES.xxxl + SIZES.xs,
    color: COLORS.white,
    fontFamily: FONTS.ysabeauInfantBold,
  },
});
