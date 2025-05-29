import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import Spinner from '../components/Spinner';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import FloatingInput from '../components/FloatingInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {
  CaptureImage,
  ChooseImage,
  ImageUploadModal,
} from '../components/CommonFunctionalities';
import AndroidBackHandler from '../components/BackHandler';

const EditProfile = props => {
  const {globalState, setGlobalState} = useAppContext();
  const {profileId, buttonColor} = globalState;

  const {navigation} = props;
  const [loader, setLoader] = useState(true);
  const [profileData, setProfileData] = useState({
    country: '',
    city: '',
    state: '',
    address: '',
    highestQualification: '',
    occupation: '',
    organisationName: '',
    designation: '',
    instituteName: '',
    course: '',
    livingStatus: '',
    maritalStatus: '',
    passportPhoto: '',
    passportPhotoBase64: '',
  });
  const [imagePicker, setImagePicker] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    country: [],
    state: [],
    livingStatus: [],
    maritalStatus: [],
    occupation: [],
  });

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    getProfileDetails();
    return AndroidBackHandler.removerHandler();
  }, []);

  // # Get Profile & Dropdown Data
  const getProfileDetails = async countryId => {
    try {
      const params = countryId
        ? {profileId: profileId, countryId}
        : {profileId: profileId};
      const response = await API.getProfileDropdown(params);

      console.log('get Profile Dropdown_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        if (countryId) {
          setDropdownData(prev => ({...prev, state: data?.dropdown?.state}));
        } else {
          setDropdownData(data?.dropdown);
          setProfileData(data?.profileDetails);
        }
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-get Profile Dropdown-screen', err);
    }
  };

  // # Edit Profile
  const sendEditProfile = async () => {
    try {
      setLoader(true);
      console.log('profileData', profileData);
      const {
        country,
        city,
        state,
        address,
        highestQualification,
        occupation,
        designation,
        livingStatus,
        maritalStatus,
        instituteName,
        course,
        organisationName,
        passportPhotoBase64,
      } = profileData;
      const params = {
        profileId: profileId,
        country: country ? country : null,
        city: city ? city : null,
        state: state ? state : null,
        address: address ? address : null,
        highestQualification: highestQualification
          ? highestQualification
          : null,
        occupation: occupation ? occupation : null,
        designation: occupation == 2 && !!designation ? designation : null,
        livingStatus: livingStatus ? livingStatus : null,
        maritalStatus: maritalStatus ? maritalStatus : null,
        passportPhoto: passportPhotoBase64 ? passportPhotoBase64 : null,
        instituteName:
          occupation == 1 && !!instituteName ? instituteName : null,
        course: occupation == 1 && !!course ? course : null,
        organisationName:
          occupation == 2 && !!organisationName ? organisationName : null,
      };
      const response = await API.sendEditProfileDetails(params);

      console.log('Edit Profile_response', response?.data);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
        toastMsg(message, 'success');
        await setGlobalState(prev => ({...prev, reloadProfile: 'Y'}));
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-Edit Profile-screen', err);
    }
  };

  const handleChange = (key, value) => {
    setProfileData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  // # Upload Type
  const uploadType = async type => {
    const result = type === 'C' ? await CaptureImage() : await ChooseImage();

    if (typeof result === 'object' && Object.keys(result).length > 0) {
      setImagePicker(false);
      setProfileData(prev => ({
        ...prev,
        passportPhoto: result?.path,
        passportPhotoBase64: result?.base64,
      }));
    } else {
      setImagePicker(false);
    }
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        goBack={() => navigation.goBack()}
        titleName={screenNames.editProfile}
      />
      <Spinner spinnerVisible={loader} />
      <ScrollView contentContainerStyle={{paddingBottom: '30%'}}>
        {/* // # Country */}
        <FloatingInput
          type="dropdown"
          data={dropdownData?.country}
          label={'Country'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.country}
          onChange={item => {
            if (item?.value !== profileData?.country) {
              handleChange('country', item?.value);
              setDropdownData(prev => ({...prev, state: []}));
              handleChange('state', '');
              setLoader(true);
              getProfileDetails(item?.value);
            }
          }}
          cntnrStyle={styles.dropdownCont}
          renderRightIcon={() => (
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={COLORS.black}
              size={25}
            />
          )}
        />
        {/* // # State */}
        <FloatingInput
          type="dropdown"
          data={dropdownData?.state}
          label={'State'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.state}
          onChange={item => {
            handleChange('state', item?.value);
          }}
          cntnrStyle={styles.dropdownCont}
          renderRightIcon={() => (
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={COLORS.black}
              size={25}
            />
          )}
        />

        {/* // # City */}
        <FloatingInput
          label={'City'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.city}
          onChangeText={item => {
            handleChange('city', item);
          }}
          cntnrStyle={styles.dropdownCont}
        />

        {/* // # Address */}
        <FloatingInput
          label={'Address'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.address}
          onChangeText={item => {
            handleChange('address', item);
          }}
          cntnrStyle={styles.dropdownCont}
        />
        {/* // # Living Status */}
        <FloatingInput
          type="dropdown"
          data={dropdownData?.livingStatus}
          label={'Living Status'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.livingStatus}
          onChange={item => {
            handleChange('livingStatus', item?.value);
          }}
          cntnrStyle={styles.dropdownCont}
          renderRightIcon={() => (
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={COLORS.black}
              size={25}
            />
          )}
        />
        {/* // # Marital Status */}
        <FloatingInput
          type="dropdown"
          data={dropdownData?.maritalStatus}
          label={'Marital Status'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.maritalStatus}
          onChange={item => {
            handleChange('maritalStatus', item?.value);
          }}
          cntnrStyle={styles.dropdownCont}
          renderRightIcon={() => (
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={COLORS.black}
              size={25}
            />
          )}
        />

        {/* // # Highest Qualification */}
        <FloatingInput
          label={'Highest Qualification'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.highestQualification}
          onChangeText={item => {
            handleChange('highestQualification', item);
          }}
          cntnrStyle={styles.dropdownCont}
        />

        {/* // # Occupation */}
        <FloatingInput
          type="dropdown"
          data={dropdownData?.occupation}
          label={'Occupation'}
          drpdwnContStyle={styles.dropdownCntStyle}
          value={profileData?.occupation}
          onChange={item => {
            handleChange('occupation', item?.value);
          }}
          cntnrStyle={styles.dropdownCont}
          renderRightIcon={() => (
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={COLORS.black}
              size={25}
            />
          )}
        />

        {/* // # Designation */}
        {profileData?.occupation == 2 && (
          <FloatingInput
            label={'Designation'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileData?.designation}
            onChangeText={item => {
              console.log('item', item);
              handleChange('designation', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />
        )}

        {/* // # Organisation Name */}
        {profileData?.occupation == 2 && (
          <FloatingInput
            label={'Organisation Name'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileData?.organisationName}
            onChangeText={item => {
              handleChange('organisationName', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />
        )}

        {/* // # Institute Name */}
        {profileData?.occupation == 1 && (
          <FloatingInput
            label={'Institute Name'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileData?.instituteName}
            onChangeText={item => {
              handleChange('instituteName', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />
        )}

        {/* // # Course Name */}
        {profileData?.occupation == 1 && (
          <FloatingInput
            label={'Course Name'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileData?.organisationName}
            onChangeText={item => {
              handleChange('course', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />
        )}

        {/* // # Passport size photo */}
        <View style={styles.passportCont}>
          {!!profileData?.passportPhoto ? (
            <>
              <Image
                style={styles.passportImg}
                source={{
                  uri: profileData?.passportPhoto,
                }}
              />
              <TouchableOpacity
                onPress={() => setImagePicker(true)}
                activeOpacity={0.8}
                style={styles.changeBtn}>
                <Text numberOfLines={1} style={styles.submitTxt}>
                  Change
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => setImagePicker(true)}
              activeOpacity={0.8}
              style={styles.addPhotoBtn}>
              <MaterialCommunityIcons
                name="plus"
                color={COLORS.gunsmoke}
                size={moderateScale(25)}
              />
              <Text style={styles.addPhototTxt}>
                Upload Passport size photo
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* // # Submit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => sendEditProfile()}
          style={[
            styles.submitBtn,
            {backgroundColor: buttonColor || COLORS.button},
          ]}>
          <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* // @ Pick Image upload */}
      <ImageUploadModal
        visible={imagePicker}
        uploadType={uploadType}
        closeModal={() => setImagePicker(false)}
      />
    </Container>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  dropdownCont: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: '4%',
    paddingRight: 0,
    height: verticalScale(48),
    marginTop: '5%',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.inptBg,
  },
  dropdownCntStyle: {
    backgroundColor: COLORS.inptBg,
    alignSelf: 'left',
  },
  submitBtn: {
    marginTop: '15%',
    width: horizontalScale(150),
    height: verticalScale(45),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.windowsBlue,
  },
  submitTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
    color: COLORS.white,
  },
  passportCont: {
    marginTop: '5%',
    backgroundColor: COLORS.inptBg,
    width: '90%',
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
  },
  passportImg: {
    width: horizontalScale(200),
    height: horizontalScale(200),
    borderRadius: moderateScale(20),
  },
  changeBtn: {
    backgroundColor: COLORS.button,
    width: horizontalScale(70),
    height: horizontalScale(30),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  addPhotoBtn: {
    width: horizontalScale(100),
    height: horizontalScale(100),
    borderRadius: moderateScale(6),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.gunsmoke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhototTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.s,
    color: COLORS.gunsmoke,
    marginTop: '10%',
    textAlign: 'center',
  },
});
