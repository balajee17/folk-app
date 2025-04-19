import {
  Image,
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
} from '../styles/MyStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {screenNames} from '../constants/ScreenNames';

const ProfileDetails = ({shimmer, profileDetails, navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollCntStyle}>
      {/* // # Title and Edit Btn Container */}
      <View style={styles.titleEditCont}>
        {shimmer ? (
          <>
            <TitleShimmer
              height={horizontalScale(25)}
              width={horizontalScale(100)}
              alignSelf={'center'}
            />
            <ImageShimmer
              width={horizontalScale(75)}
              borderRadius={moderateScale(12)}
              height={horizontalScale(35)}
            />
          </>
        ) : (
          <>
            <Text numberOfLines={1} style={styles.titleTxt}>
              Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.editProfile, {
                  userData: profileDetails,
                });
              }}
              activeOpacity={0.8}
              style={styles.editIcnBtn}>
              <Text style={styles.editTxt}>Edit</Text>
              <FontAwesome6
                name="edit"
                size={moderateScale(15)}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* // # user details */}
      {shimmer &&
        Array(4)
          .fill(4)
          .map(_ => (
            <>
              <TitleShimmer
                marginTop={'6%'}
                height={horizontalScale(15)}
                width={horizontalScale(100)}
              />

              <ImageShimmer
                marginTop={'2%'}
                width={'100%'}
                borderRadius={moderateScale(12)}
                height={horizontalScale(40)}
              />
            </>
          ))}

      {!shimmer &&
        profileDetails?.map(
          (item, index) =>
            item?.Value && (
              <>
                <Text style={[styles.labelTxt, {marginTop: '6%'}]}>
                  {item?.Label}
                </Text>
                <View style={styles.valueBox}>
                  {/* // # id 12 is to show image (if you want to show image in list use Id 12) */}
                  {item?.Id === 12 ? (
                    <Image
                      style={{
                        width: horizontalScale(250),
                        height: horizontalScale(250),
                        borderRadius: moderateScale(20),
                        alignSelf: 'center',
                      }}
                      source={{
                        uri: item?.Value,
                      }}
                    />
                  ) : (
                    <Text style={styles.valueTxt}>{item?.Value}</Text>
                  )}
                </View>
              </>
            ),
        )}
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  scrollCntStyle: {
    paddingTop: '6%',
    padding: '4%',
  },
  titleEditCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcnBtn: {
    backgroundColor: COLORS.dolphin,
    width: horizontalScale(75),
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: moderateScale(12),
  },
  titleTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '60%',
  },
  editTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '50%',
  },
  labelTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.midGrey,
    width: '100%',
    marginTop: '3%',
  },
  valueBox: {
    marginTop: '2%',
    backgroundColor: COLORS.chromeWhite,
    width: '100%',
    borderRadius: moderateScale(12),
    padding: '4%',
  },
  valueTxt: {
    width: '100%',
    borderRadius: moderateScale(12),
    textAlignVertical: 'center',
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
  },
});
