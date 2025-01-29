import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const DailyDarshan = ({navigation}) => {
  const [switchScreen, setSwitchSreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [shimmer, setShimmer] = useState(true);

  const sampleData = [
    {
      day: 'Today',
      images: [
        {
          id: 1,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
      ],
    },
    {
      day: '1 Day Ago',
      images: [
        {
          id: 2,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          id: 3,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
      ],
    },
    {
      day: '2 Day Ago',
      images: [
        {
          id: 4,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          id: 5,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 6,
          link: 'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
        },
      ],
    },
    {
      day: '3 Day Ago',
      images: [
        {
          id: 7,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          id: 8,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 9,
          link: 'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
        },
        {
          id: 10,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
      ],
    },
    {
      day: '4 Day Ago',
      images: [
        {
          id: 11,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          id: 12,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 13,
          link: 'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
        },
        {
          id: 14,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 15,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
      ],
    },
    {
      day: '5 Day Ago',
      images: [
        {
          id: 11,
          link: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          id: 12,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 13,
          link: 'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
        },
        {
          id: 14,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 15,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
        {
          id: 16,
          link: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
        },
      ],
    },
  ];

  return (
    <>
      {!switchScreen ? (
        <Container>
          <SafeAreaView style={MyStyles.flex1}>
            {/* // # Header */}
            <CustomHeader
              goBack={() => navigation.goBack()}
              titleName={screenNames.dailyDarshan}
            />
            {/* // # Contents */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={!shimmer}
              contentContainerStyle={[
                MyStyles.scrollView,
                MyStyles.paddingHor10,
              ]}>
              {/* // # Title */}
              {!shimmer
                ? sampleData.map((item, index) => (
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
                          {item?.images.length > 2 && (
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
                          {item?.images.length > 3 && (
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
                          {item?.images.length > 1 && (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedItem({
                                  ...item,
                                  activeIndex:
                                    item?.images.length === 2
                                      ? 1
                                      : item?.images.length === 3
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
                                    item?.images.length >= 4 ? '5%' : undefined,
                                },
                              ]}>
                              <ImageBackground
                                source={{
                                  uri:
                                    item?.images.length === 2
                                      ? item?.images[1]?.link
                                      : item?.images.length === 3
                                      ? item?.images[2]?.link
                                      : item?.images[3]?.link,
                                }}
                                imageStyle={[
                                  item?.images.length > 4 &&
                                    styles.blurImageStyle,
                                  {borderRadius: moderateScale(10)},
                                ]}
                                blurRadius={item?.images.length > 4 ? 4 : 0}
                                style={[
                                  styles.rightImg1,
                                  {
                                    height:
                                      item?.images.length === 2
                                        ? verticalScale(200)
                                        : verticalScale(190),
                                  },
                                ]}>
                                {item?.images.length > 4 && (
                                  <View style={styles.transBgCont}>
                                    <Text style={styles.countTxt}>
                                      {`+${item?.images.length - 4}`}
                                    </Text>
                                  </View>
                                )}
                              </ImageBackground>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </>
                  ))
                : Array(3)
                    .fill(3)
                    .map((_, index) => <DarshanShimmer key={index} />)}
            </ScrollView>
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
