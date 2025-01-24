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
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import Container from '../components/Container';
import AlbumCarousel from '../components/AlbumCarousel';

const DailyDarshan = ({navigation}) => {
  const [switchScreen, setSwitchSreen] = useState(false);
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
              contentContainerStyle={[
                MyStyles.scrollView,
                MyStyles.paddingHor10,
              ]}>
              {/* // # Title */}
              <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                Today
              </Text>
              {/* // # Image Container */}
              <View style={styles.imageContainer}>
                {/* // # Left Container */}
                <View style={styles.leftImgCont}>
                  <Image
                    source={{
                      uri: 'https://m.media-amazon.com/images/I/81cekv1b3fL._AC_UF1000,1000_QL80_.jpg',
                    }}
                    style={styles.leftImg1}
                  />
                  <Image
                    source={{
                      uri: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
                    }}
                    style={[styles.leftImg1, styles.leftImg2]}
                  />
                </View>
                {/* // # Right Container */}
                <View style={styles.rightImgCont}>
                  <Image
                    source={{
                      uri: 'https://i.pinimg.com/474x/19/ee/4a/19ee4a3da8572531a7af9bd35900fef4.jpg',
                    }}
                    style={styles.rightImg1}
                  />
                  <TouchableOpacity
                    onPress={() => setSwitchSreen(true)}
                    activeOpacity={0.7}
                    style={styles.blurImgCont}>
                    <ImageBackground
                      source={{
                        uri: 'https://play-lh.googleusercontent.com/_W08xjfRDYn--aJ70Rn150uhcyoymvsUW-IosMRDAz83RR-Ojw7SkggNHzDdUGxLPOgw',
                      }}
                      imageStyle={styles.blurImageStyle}
                      blurRadius={4}
                      style={[styles.rightImg1, styles.rightImg2]}>
                      <View style={styles.transBgCont}>
                        <Text style={styles.countTxt}>{`+5`}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Container>
      ) : (
        <AlbumCarousel closeAlbum={() => setSwitchSreen(false)} />
      )}
    </>
  );
};

export default DailyDarshan;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1%',
    paddingVertical: '2%',
    width: '100%',
    paddingHorizontal: '3%',
  },
  leftImgCont: {
    width: '43%',
  },
  rightImgCont: {
    width: '54%',
  },
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
  blurImgCont: {width: '100%', marginTop: '5%'},
  blurImageStyle: {
    borderRadius: moderateScale(10),
    backgroundColor: 'rgba(56, 55, 55, 0.53)',
  },
  rightImg2: {
    height: verticalScale(190),
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
