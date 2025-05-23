import {
  Image,
  ImageBackground,
  ScrollView,
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
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradientBg from '../components/LinearGradientBg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {useToast} from 'react-native-toast-notifications';
import {
  CopyToClipboard,
  RedirectURL,
  toastThrottle,
} from '../components/CommonFunctionalities';
import {getImage} from '../utils/ImagePath';

const ConnectUs = ({apiData, shimmer}) => {
  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: '70%',
      }}>
      <LinearGradientBg />

      {/* // @ FOLK Guide Detail Box */}
      <View style={styles.FGDetailsBox}>
        {shimmer ? (
          <View style={{padding: '4%'}}>
            <ImageShimmer
              width={horizontalScale(150)}
              backgroundColor={COLORS.border}
              borderRadius={moderateScale(80)}
              height={horizontalScale(150)}
              alignSelf={'center'}
              justifyContent={'center'}
              alignItems={'center'}
            />

            <TitleShimmer
              marginTop={'2%'}
              height={verticalScale(15)}
              width={horizontalScale(250)}
              alignSelf={'center'}
            />

            <TitleShimmer
              marginTop={'2%'}
              height={verticalScale(13)}
              width={horizontalScale(125)}
              alignSelf={'center'}
            />

            <View style={[styles.phoneWhatsappCont, {marginTop: '20%'}]}>
              <ImageShimmer
                alignItems={'center'}
                justifyContent={'center'}
                width={horizontalScale(30)}
                height={horizontalScale(30)}
                borderRadius={moderateScale(20)}
              />

              <ImageShimmer
                alignItems={'center'}
                justifyContent={'center'}
                width={horizontalScale(30)}
                height={horizontalScale(30)}
                borderRadius={moderateScale(20)}
              />

              <ImageShimmer
                alignItems={'center'}
                justifyContent={'center'}
                width={horizontalScale(30)}
                height={horizontalScale(30)}
                borderRadius={moderateScale(20)}
              />
            </View>
          </View>
        ) : (
          <ImageBackground source={getImage.connectCard} style={styles.cdBgImg}>
            <View style={{padding: '4%'}}>
              {/* // # FG Image */}
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: apiData?.guideDetails?.PHOTO_PATH}}
                />
              </View>
              {/* // # Name, Mobile No, Email */}
              <Text numberOfLines={2} style={[styles.nameTxt]}>
                {apiData?.guideDetails?.NAME}
              </Text>
              <View style={styles.mobileCopyCont}>
                <Text numberOfLines={1} style={[styles.emailTxt]}>
                  {apiData?.guideDetails?.MOBILE}
                </Text>
                {apiData?.guideDetails?.MOBILE && (
                  <TouchableOpacity
                    onPress={() => {
                      if (CopyToClipboard(apiData?.guideDetails?.MOBILE)) {
                        toastMsg('Mobile number copied.', 'success');
                      } else {
                        toastMsg('Unable to copy the text', 'error');
                      }
                    }}
                    activeOpacity={0.6}>
                    <MaterialIcons
                      name="content-copy"
                      size={moderateScale(20)}
                      color={COLORS.btIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.mobileCopyCont}>
                <Text numberOfLines={2} style={[styles.emailTxt]}>
                  {apiData?.guideDetails?.MAIL}
                </Text>
                {apiData?.guideDetails?.MAIL && (
                  <TouchableOpacity
                    onPress={() => {
                      if (CopyToClipboard(apiData?.guideDetails?.MAIL)) {
                        toastMsg('Email copied.', 'success');
                      } else {
                        toastMsg('Unable to copy the text', 'error');
                      }
                    }}
                    activeOpacity={0.6}>
                    <MaterialIcons
                      name="content-copy"
                      size={moderateScale(20)}
                      color={COLORS.btIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* // # ICONS  */}
              <View style={styles.phoneWhatsappCont}>
                <TouchableOpacity
                  onPress={async () => {
                    const result = await RedirectURL(
                      apiData?.guideDetails?.MOBILE,
                      'phone',
                    );
                    if (!!result?.type) {
                      toastMsg(result?.message, result?.type);
                    }
                  }}
                  activeOpacity={0.8}
                  style={[styles.contactBtn, {backgroundColor: COLORS.infoPB}]}>
                  <FontAwesome
                    name="phone"
                    size={moderateScale(23)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    const result = await RedirectURL(
                      apiData?.guideDetails?.WHATSAPP,
                      'whatsapp',
                      apiData?.guideDetails?.WHATSAPP_Message,
                    );
                    if (!!result?.type) {
                      toastMsg(result?.message, result?.type);
                    }
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.contactBtn,
                    {backgroundColor: COLORS.whatsapp},
                  ]}>
                  <FontAwesome
                    name="whatsapp"
                    size={moderateScale(23)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    const result = await RedirectURL(
                      apiData?.guideDetails?.WEB,
                    );
                    if (!!result?.type) {
                      toastMsg(result?.message, result?.type);
                    }
                  }}
                  activeOpacity={0.8}
                  style={[styles.contactBtn, {backgroundColor: COLORS.purple}]}>
                  <MaterialCommunityIcons
                    name="web"
                    size={moderateScale(23)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
      {/* // @ Social Media Icons */}
      {shimmer ? (
        <TitleShimmer
          marginTop={'30%'}
          height={verticalScale(25)}
          width={horizontalScale(200)}
          marginLeft={'5%'}
        />
      ) : (
        <Text numberOfLines={1} style={styles.connectWithTxt}>
          Connect with us:
        </Text>
      )}

      <View style={[styles.socialMediaBox]}>
        {shimmer
          ? Array(4)
              .fill(4)
              .map((_, i) => {
                return (
                  <View key={i} style={styles.socialMediaBtn}>
                    <ImageShimmer
                      width={horizontalScale(40)}
                      height={horizontalScale(40)}
                      borderRadius={moderateScale(20)}
                    />
                  </View>
                );
              })
          : apiData?.links?.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={styles.socialMediaBtn}
                  onPress={async () => {
                    console.log('item?.URL', item?.URL);
                    const result = await RedirectURL(item?.URL);
                    if (!!result?.type) {
                      toastMsg(result?.message, result?.type);
                    }
                  }}>
                  <Image
                    style={styles.socialMediaImg}
                    source={{uri: item?.ICON}}
                  />
                </TouchableOpacity>
              );
            })}
      </View>
    </ScrollView>
  );
};

export default ConnectUs;

const styles = StyleSheet.create({
  FGDetailsBox: {
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(15),
    marginTop: verticalScale(20),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: horizontalScale(320),
    overflow: 'hidden',
  },
  imageContainer: {
    width: horizontalScale(150),
    backgroundColor: COLORS.border,
    borderRadius: moderateScale(80),
    height: horizontalScale(150),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: COLORS.warningPB,
  },
  cdBgImg: {width: '100%', height: '100%'},
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
    marginTop: '2%',
    textAlign: 'center',
    width: '100%',
  },
  mobileCopyCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  emailTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.xl,
    color: COLORS.textLabel,
    textAlign: 'center',
    marginTop: '1%',
    marginHorizontal: '3%',
  },
  phoneWhatsappCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
    marginTop: '8%',
  },
  contactBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: moderateScale(40),
  },
  connectWithTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.xxl,
    color: COLORS.black,
    width: '90%',
    alignSelf: 'center',
    marginTop: verticalScale(90),
    textAlign: 'center',
  },
  socialMediaBox: {
    width: '90%',
    marginTop: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: moderateScale(20),
    paddingHorizontal: '5%',
    alignSelf: 'center',
  },
  socialMediaBtn: {
    width: horizontalScale(45),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialMediaImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
