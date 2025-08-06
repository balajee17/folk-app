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
import {getImage} from '../utils/ImagePath';
import AnimatedCircularBorder from '../components/AnimatedCircularBorder';
import { 
  getIconByName, 
  getStyleByName, 
  getFieldValue,
  validateProfileData,
  transformProfileData,
  mergeUserDetailsWithProfileData 
} from '../utils/profileDataUtils';

// New JSON structure from backend
const profileDataStructure = {
  "primaryDetails": {
    "Profile_image": "http://localhost/FOLKDashboard/public/profileImages/1.png?t=1754391553",
    "Name": "Roshan",
    "Folk_id": null
  },
  "profileDetails": {
    "emailDetails": [
      {
        "label": "Email",
        "value": "new-email@example.com",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      }
    ],
    "personalDetails": [
      {
        "label1": "YFH ID",
        "value1": "",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Mobile",
        "value2": "7602012478",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Gender",
        "value1": "Female",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Level",
        "value2": "",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Spouse ID",
        "value1": "",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Occupation",
        "value2": "Student",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Designation",
        "value1": ":laravel developer",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Higher Qualification",
        "value2": "MBA",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Center",
        "value1": "Centre A",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "City",
        "value2": "madurai",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "State",
        "value1": "Karnataka",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Country",
        "value2": "India",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      }
    ],
    "familyDetails": [
      {
        "label1": "Father's Name",
        "value1": "kumar",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Father's Mobile No.",
        "value2": "1234567891",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Mother's Name",
        "value1": "kumari",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Mother's Mobile No.",
        "value2": "1234567891",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "label1": "Blood Group",
        "value1": "A+",
        "icon1": "http://localhost/FOLKDashboard/public/assets/icons/notification.png",
        "label2": "Emergency Contact",
        "value2": "1234567890",
        "icon2": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      }
    ],
    "locationDetail": {
      "label": "Location",
      "value": "sample",
      "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
    },
    "permanentAddressDetail": {
      "label": "Permanent Address",
      "value": "sample",
      "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
    },
    "passportPhotoDetail": {
      "Id": 12,
      "Label": "Official Photo",
      "Value": "http://localhost/FOLKDashboard/public/offical-photo/1.png?t=1754391553"
    }
  }
};

const ProfileDetails = ({
  shimmer,
  profileDetails,
  navigation,
  deleteAccount,
  deleteAction,
  userDetails, // New prop for dynamic user details
  profileData = profileDataStructure, // New prop for backend data structure
}) => {
  // Use the new data structure directly
  const profileInfo = profileData?.profileDetails || {};
  const primaryInfo = profileData?.primaryDetails || {};
  
  // Debug logging
  console.log('ProfileDetails - primaryInfo:', primaryInfo);
  console.log('ProfileDetails - Profile_image:', primaryInfo.Profile_image);
  
  // Helper function to fix localhost URLs for emulator
  const getImageUri = (imageUrl) => {
    if (!imageUrl) return null;
    // Replace localhost with your computer's IP address for emulator
    // Replace '192.168.1.100' with your actual IP address
    return imageUrl.replace('http://localhost', 'http://192.168.1.100');
  };

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
              backgroundColor={COLORS.gunsmoke}
            />
            {/* <ImageShimmer
              width={horizontalScale(75)}
              borderRadius={moderateScale(12)}
              height={horizontalScale(40)}
              backgroundColor={COLORS.gunsmoke}
            /> */}
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
              <FontAwesome6
                name="edit"
                size={moderateScale(15)}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* New Design Under Details */}
      <View style={styles.newDesignContainer}>
        <View style={{flex: 1}}>
          {/* Email Details */}
          {profileInfo.emailDetails?.map((emailDetail, idx) => (
            <View key={idx} style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: emailDetail.icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{emailDetail.label}</Text>
                  <Text style={styles.fieldValue}>{emailDetail.value}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Personal Details */}
          {profileInfo.personalDetails?.map((personalDetail, idx) => (
            <View key={idx} style={styles.horizontalFieldsContainer}>
              {/* First Field */}
              <View style={styles.horizontalFieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: personalDetail.icon1}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{personalDetail.label1}</Text>
                  <Text style={styles.fieldValue}>{personalDetail.value1}</Text>
                </View>
              </View>
              
              {/* Second Field */}
              <View style={styles.horizontalFieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: personalDetail.icon2}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{personalDetail.label2}</Text>
                  <Text style={styles.fieldValue}>{personalDetail.value2}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Family Details */}
          <View style={styles.additionalInfoContainer}>
            {profileInfo.familyDetails?.map((familyDetail, idx) => (
              <View key={idx} style={styles.horizontalFieldsContainer}>
                {/* First Field */}
                <View style={styles.horizontalFieldItem}>
                  <View style={styles.iconContainer}>
                    <Image source={{uri: familyDetail.icon1}} style={styles.gmailIcon} />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>{familyDetail.label1}</Text>
                    <Text style={styles.fieldValue}>{familyDetail.value1}</Text>
                  </View>
                </View>
                
                {/* Second Field */}
                <View style={styles.horizontalFieldItem}>
                  <View style={styles.iconContainer}>
                    <Image source={{uri: familyDetail.icon2}} style={styles.gmailIcon} />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>{familyDetail.label2}</Text>
                    <Text style={styles.fieldValue}>{familyDetail.value2}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Location Detail */}
          {profileInfo.locationDetail && (
            <View style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: profileInfo.locationDetail.icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{profileInfo.locationDetail.label}</Text>
                  <Text style={styles.fieldValue}>{profileInfo.locationDetail.value}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Permanent Address Detail */}
          {profileInfo.permanentAddressDetail && (
            <View style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: profileInfo.permanentAddressDetail.icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{profileInfo.permanentAddressDetail.label}</Text>
                  <Text style={styles.fieldValue}>{profileInfo.permanentAddressDetail.value}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Profile Image */}
          <View style={styles.personImageContainer}>
            {primaryInfo.Profile_image ? (
              <Image 
                source={{uri: getImageUri(primaryInfo.Profile_image)}} 
                style={styles.personImage}
                onError={(error) => {
                  console.log('Image loading error:', error.nativeEvent.error);
                  console.log('Original URI:', primaryInfo.Profile_image);
                  console.log('Modified URI:', getImageUri(primaryInfo.Profile_image));
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
            ) : (
              <Image 
                source={getImage.person} 
                style={styles.personImage}
                onError={(error) => console.log('Fallback image error:', error.nativeEvent.error)}
                onLoad={() => console.log('Fallback image loaded successfully')}
              />
            )}
          </View>
        </View>
      </View>
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
    backgroundColor: COLORS.gunsmoke,
    width: horizontalScale(35),
    padding: '3%',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    
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
    color: COLORS.textLabel,
    width: '100%',
    marginTop: '3%',
  },
  valueBox: {
    marginTop: '2%',
    backgroundColor: COLORS.inptBg,
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
    color: COLORS.textLabel,
  },
  deleteAccBtn: {
    width: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(6),
    marginVertical: '15%',
    padding: '2%',
    borderWidth: 0.5,
    borderColor: COLORS.errorPB,
  },
  // New Design Styles
  newDesignContainer: {
    marginTop: '6%',
  },
  verticalFieldsContainer: {
    marginBottom: '4%',
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  horizontalFieldsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: '4%',
  },
  horizontalFieldItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    // marginRight: '2%',
  },
  yfhPhoneContainer: {
    gap: horizontalScale(0), // Reduced gap between YFH and Phone Number
  },
  yfhPhoneItem: {
    flex: 0.48, // Slightly less than 0.5 to create smaller gap
  },
  singleFieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  row3Container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '4%',
  },
  spouseFlex: {
    flex: 1,
    marginRight: horizontalScale(0), // This controls the gap
  },
  occupationFlex: {
    flex: 1,
    // marginRight: horizontalScale(10), // This controls the gap
    // marginLeft: horizontalScale(-100), // This controls the gap
    // paddingLeft: horizontalScale(-100),
    // paddingRight: horizontalScale(100),
  },
  iconContainer: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(6),
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginRight: '3%',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  gmailIcon: {
    width: horizontalScale(22),
    height: horizontalScale(22),
    resizeMode: 'contain',
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: SIZES.l, // 14px
    fontFamily: FONTS.dmSansBold,
    color: COLORS.black,
    marginBottom: '1%',
    lineHeight: 20,
    fontWeight: '700',
  },
  fieldValue: {
    fontSize: SIZES.s, // 12px
    fontFamily: FONTS.dmSansRegular,
    color: COLORS.textLabel,
    lineHeight: 20,
    fontWeight: '400',
  },
  personImageContainer: {
    alignItems: 'center',
    marginTop: '6%',
    marginBottom: '4%',
    position: 'relative',
  },
  personImage: {
    width: 229,
    height: 244,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  additionalInfoContainer: {
    marginTop: '6%',
  },
});
