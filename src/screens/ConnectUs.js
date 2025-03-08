import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ConnectUs = () => {
  const socialMediaIcons = [
    require('../assets/images/youtube.png'),
    require('../assets/images/Instagram.png'),
    require('../assets/images/twitter.png'),
    require('../assets/images/facebook.png'),
  ];

  const openLink = url => {
    try {
      Linking.openURL(url);
    } catch (err) {
      console.log('ERR_Redirect', err);
    }
  };

  return (
    // @ Container
    <View style={[MyStyles.contentCont, styles.mainContainer]}>
      {/* // @ Image Circle */}
      <View style={styles.imageBgCircle}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/folkGuide.png')}
          />
        </View>
      </View>

      {/* // @ Name And Email */}
      <Text style={[styles.txtStyle, styles.nameTxt]}>Kanhu Charan Gowda</Text>
      <Text style={[styles.txtStyle, styles.emailTxt]}>
        kanhucharan01@iskconbangalore.org
      </Text>

      {/* // @ Social Media Link Box  */}
      <LinearGradient
        colors={['#606c88', '#3f4c6b']}
        style={styles.socialMediaBox}>
        {/* // # Visit website Link */}
        <Text style={styles.visitWebTxt}>Visit our website</Text>
        <Text
          onPress={() => {
            openLink('https://folknet.in');
          }}
          style={styles.webLink}>
          https://folknet.in
        </Text>

        {/* // # Phone and whatsapp Btn  */}
        <View style={styles.phoneWhatsappCont}>
          <TouchableOpacity activeOpacity={0.8} style={styles.contactBtn}>
            <FontAwesome
              style={styles.phoneIcn}
              name="phone"
              size={moderateScale(15)}
              color={COLORS.white}
            />
            <Text numberOfLines={1} style={styles.mobileNoTxt}>
              9876543210
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.contactBtn}>
            <FontAwesome
              style={[styles.phoneIcn, {backgroundColor: COLORS.whatsapp}]}
              name="whatsapp"
              size={moderateScale(15)}
              color={COLORS.white}
            />
            <Text numberOfLines={1} style={styles.mobileNoTxt}>
              9876543210
            </Text>
          </TouchableOpacity>
        </View>

        {/* // # Social Media Icons */}
        <View style={[styles.phoneWhatsappCont, {width: '100%'}]}>
          {socialMediaIcons.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index + 1}
                style={styles.socialMediaBtn}>
                <Image style={styles.socialMediaImg} source={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

export default ConnectUs;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(70),
    borderTopLeftRadius: moderateScale(60),
    borderTopRightRadius: moderateScale(60),
  },
  imageBgCircle: {
    width: horizontalScale(150),
    height: horizontalScale(150),
    borderRadius: moderateScale(80),
    backgroundColor: COLORS.white,
    position: 'absolute',
    alignSelf: 'center',
    top: '-8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: horizontalScale(135),
    backgroundColor: COLORS.highLightColor,
    borderRadius: moderateScale(70),
    height: horizontalScale(135),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(70),

    resizeMode: 'contain',
  },
  nameTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
    marginTop: '25%',
  },
  emailTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.xl,
    color: COLORS.dolphin,
  },
  txtStyle: {
    marginTop: '1%',
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  socialMediaBox: {
    width: '90%',
    marginTop: '10%',
    alignSelf: 'center',
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  visitWebTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
    width: '100%',
  },
  webLink: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxxl,
    color: COLORS.link,
    textDecorationLine: 'underline',
    width: '100%',
    marginTop: '2%',
  },
  phoneWhatsappCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6%',
  },
  contactBtn: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '2%',
    width: '42%',
    borderRadius: moderateScale(20),
  },
  phoneIcn: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(15),
    backgroundColor: COLORS.dodger,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mobileNoTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
    color: COLORS.black,
    textAlign: 'center',
    width: '72%',
  },
  socialMediaBtn: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialMediaImg: {
    width: horizontalScale(80),
    height: verticalScale(80),
    resizeMode: 'contain',
  },
});
