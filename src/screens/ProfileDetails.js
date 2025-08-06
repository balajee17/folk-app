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
  "successCode": 1,
  "message": "Successful",
  "data": {
    "primaryDetails": {
      "Profile_image": "http://localhost/FOLKDashboard/public/profileImages/1.png?t=1754457517",
      "Name": "Roshan",
      "Folk_id": null
    },
    "profileDetails": [
      {
        "Label": "Mobile",
        "Value": "7602012478",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Whatsapp",
        "Value": "9876543210",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Email",
        "Value": "new-email@example.com",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Gender",
        "Value": "Female",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Centre",
        "Value": "Centre A",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Date Of Birth",
        "Value": "15-Aug-1995",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Address",
        "Value": "sample",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "FOLK Level",
        "Value": null,
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "City",
        "Value": "madurai",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "State",
        "Value": "Karnataka",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Country",
        "Value": "India",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Occupation",
        "Value": "Student",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Higher Qualification",
        "Value": "MBA",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Designation",
        "Value": ":laravel developer",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Spouse Id",
        "Value": "",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Living Status",
        "Value": "With Parents",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Course",
        "Value": "B.E",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Institute Name",
        "Value": "PBCE",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Organization",
        "Value": "ISKCON",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Blood Group",
        "Value": "A+",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Father Name",
        "Value": "kumar",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Father Mobile",
        "Value": "1234567891",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Mother Name",
        "Value": "kumari",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "Mother Mobile",
        "Value": "1234567891",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "E Name",
        "Value": "sample",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Label": "E Mobile",
        "Value": "1234567890",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      },
      {
        "Id": 12,
        "Label": "Official Photo",
        "Value": "http://localhost/FOLKDashboard/public/offical-photo/1.png?t=1754457517",
        "icon": "http://localhost/FOLKDashboard/public/assets/icons/notification.png"
      }
    ]
  },
  "deleteProfile": "N"
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
  const profileInfo = profileData?.data?.profileDetails || [];
  const primaryInfo = profileData?.data?.primaryDetails || {};
  
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

  // Helper functions to organize data into original layout categories
  const getEmailDetails = () => {
    return profileInfo.filter(item => item.Label === 'Email');
  };

  const getPersonalDetailsPairs = () => {
    const personalLabels = [
      'Mobile', 'Whatsapp',
      'Gender', 'Centre', 
      'Date Of Birth', 'FOLK Level',
      'City', 'State',
      'Country', 'Occupation',
      'Higher Qualification', 'Designation',
      'Spouse Id', 'Living Status',
      'Course', 'Institute Name',
      'Organization'
    ];
    const pairs = [];
    
    for (let i = 0; i < personalLabels.length; i += 2) {
      const item1 = profileInfo.find(item => item.Label === personalLabels[i]);
      const item2 = profileInfo.find(item => item.Label === personalLabels[i + 1]);
      
      if (item1 || item2) {
        pairs.push({
          label1: item1?.Label || '',
          value1: item1?.Value || '',
          icon1: item1?.icon || '',
          label2: item2?.Label || '',
          value2: item2?.Value || '',
          icon2: item2?.icon || ''
        });
      }
    }
    return pairs;
  };

  const getFamilyDetailsPairs = () => {
    const familyLabels = [
      'Father Name', 'Father Mobile', 
      'Mother Name', 'Mother Mobile', 
      'Blood Group', 'E Name',
      'E Mobile'
    ];
    const pairs = [];
    
    for (let i = 0; i < familyLabels.length; i += 2) {
      const item1 = profileInfo.find(item => item.Label === familyLabels[i]);
      const item2 = profileInfo.find(item => item.Label === familyLabels[i + 1]);
      
      if (item1 || item2) {
        pairs.push({
          label1: item1?.Label || '',
          value1: item1?.Value || '',
          icon1: item1?.icon || '',
          label2: item2?.Label || '',
          value2: item2?.Value || '',
          icon2: item2?.icon || ''
        });
      }
    }
    return pairs;
  };

  const getLocationDetail = () => {
    return profileInfo.find(item => item.Label === 'Address');
  };

  const getPermanentAddressDetail = () => {
    // You can map this to any other address field if needed
    return profileInfo.find(item => item.Label === 'Address');
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
          {getEmailDetails()?.map((emailDetail, idx) => (
            <View key={idx} style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: emailDetail.icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{emailDetail.Label}</Text>
                  <Text style={styles.fieldValue}>{emailDetail.Value}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Personal Details */}
          {getPersonalDetailsPairs()?.map((personalDetail, idx) => {
            // Only show container if at least one field has data
            const hasData = (personalDetail.label1 && personalDetail.value1) || (personalDetail.label2 && personalDetail.value2);
            if (!hasData) return null;
            
            return (
            <View key={idx} style={styles.horizontalFieldsContainer}>
              {/* First Field */}
              {personalDetail.label1 && personalDetail.value1 && (
                <View style={styles.horizontalFieldItem}>
                  <View style={styles.iconContainer}>
                    <Image source={{uri: personalDetail.icon1}} style={styles.gmailIcon} />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>{personalDetail.label1}</Text>
                    <Text style={styles.fieldValue}>{personalDetail.value1}</Text>
                  </View>
                </View>
              )}
              
              {/* Second Field */}
              {personalDetail.label2 && personalDetail.value2 && (
                <View style={styles.horizontalFieldItem}>
                  <View style={styles.iconContainer}>
                    <Image source={{uri: personalDetail.icon2}} style={styles.gmailIcon} />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>{personalDetail.label2}</Text>
                    <Text style={styles.fieldValue}>{personalDetail.value2}</Text>
                  </View>
                </View>
              )}
            </View>
            );
          })}

          {/* Family Details */}
          <View style={styles.additionalInfoContainer}>
            {getFamilyDetailsPairs()?.map((familyDetail, idx) => {
              // Only show container if at least one field has data
              const hasData = (familyDetail.label1 && familyDetail.value1) || (familyDetail.label2 && familyDetail.value2);
              if (!hasData) return null;
              
              return (
              <View key={idx} style={styles.horizontalFieldsContainer}>
                {/* First Field */}
                {familyDetail.label1 && familyDetail.value1 && (
                  <View style={styles.horizontalFieldItem}>
                    <View style={styles.iconContainer}>
                      <Image source={{uri: familyDetail.icon1}} style={styles.gmailIcon} />
                    </View>
                    <View style={styles.fieldContent}>
                      <Text style={styles.fieldLabel}>{familyDetail.label1}</Text>
                      <Text style={styles.fieldValue}>{familyDetail.value1}</Text>
                    </View>
                  </View>
                )}
                
                {/* Second Field */}
                {familyDetail.label2 && familyDetail.value2 && (
                  <View style={styles.horizontalFieldItem}>
                    <View style={styles.iconContainer}>
                      <Image source={{uri: familyDetail.icon2}} style={styles.gmailIcon} />
                    </View>
                    <View style={styles.fieldContent}>
                      <Text style={styles.fieldLabel}>{familyDetail.label2}</Text>
                      <Text style={styles.fieldValue}>{familyDetail.value2}</Text>
                    </View>
                  </View>
                )}
              </View>
              );
            })}
          </View>

          {/* Location Detail */}
          {getLocationDetail() && (
            <View style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: getLocationDetail().icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{getLocationDetail().Label}</Text>
                  <Text style={styles.fieldValue}>{getLocationDetail().Value}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Permanent Address Detail */}
          {getPermanentAddressDetail() && getLocationDetail()?.Label !== getPermanentAddressDetail()?.Label && (
            <View style={styles.verticalFieldsContainer}>
              <View style={styles.fieldItem}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: getPermanentAddressDetail().icon}} style={styles.gmailIcon} />
                </View>
                <View style={styles.fieldContent}>
                  <Text style={styles.fieldLabel}>{getPermanentAddressDetail().Label}</Text>
                  <Text style={styles.fieldValue}>{getPermanentAddressDetail().Value}</Text>
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
