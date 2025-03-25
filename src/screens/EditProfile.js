import {
  SafeAreaView,
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
  MyStyles,
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

const EditProfile = ({navigation}) => {
  const {globalState} = useAppContext();
  const [loader, setLoader] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    country: 'India',
    city: 'Madurai',
    state: 'Tamil Nadu',
    address: 'uakyfkjhvkjhvjvhj jlhaglsfjhnn,ahafljhvh',
    highestQualification: '',
    occupation: '',
    designation: '',
    livingStatus: '',
    maritalStatus: '',
  });

  const [dropdownData, setDropdownData] = useState([
    {
      country: [
        {label: 'India', value: 'India'},
        {label: 'Sri Lanka', value: 'Sri Lanka'},
        {label: 'Russia', value: 'Russia'},
      ],
      state: ['Tamil Nadu', 'Kerala', 'Gujarat'],
      livingStatus: ['Independant', 'With Parents'],
      maritalStatus: ['Married', 'Single'],
      occupation: ['Student', 'Self-Employed'],
    },
  ]);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  // # Get Profile & Dropdown Data
  const getProfileDetails = async () => {
    try {
      const response = await API.getProfileDropdown();

      console.log('get Profile Dropdown_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setDropdownData(data);
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
      const params = profileDetails;
      const response = await API.sendEditProfileDetails(params);

      console.log('Edit Profile_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setProfileDetails(data);
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

  const getStateList = async () => {
    try {
      setLoader(true);
      const params = profileDetails;
      const response = await API.getStateLists(params);

      console.log('state List response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setDropdownData(prev => ({...prev, state: data}));
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-state List-screen', err);
    }
  };

  const handleChange = (key, value) => {
    setProfileDetails(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
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
            data={dropdownData?.[0]?.country}
            label={'Country'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.country}
            onChange={item => {
              handleChange('country', item);
              setDropdownData(prev => ({...prev, state: []}));
              handleChange('state', '');
              getStateList();
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
            data={dropdownData?.[0]?.state}
            label={'State'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.state}
            onChange={item => {
              handleChange('state', item);
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
            value={profileDetails?.city}
            onChange={item => {
              handleChange('state', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />

          {/* // # Address */}
          <FloatingInput
            label={'Address'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.address}
            onChange={item => {
              handleChange('address', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />
          {/* // # Living Status */}
          <FloatingInput
            type="dropdown"
            data={dropdownData?.[0]?.livingStatus}
            label={'Living Status'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.livingStatus}
            onChange={item => {
              handleChange('livingStatus', item);
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
            data={dropdownData?.[0]?.maritalStatus}
            label={'Marital Status'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.maritalStatus}
            onChange={item => {
              handleChange('maritalStatus', item);
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
            value={profileDetails?.highestQualification}
            onChange={item => {
              handleChange('highestQualification', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />

          {/* // # Occupation */}
          <FloatingInput
            type="dropdown"
            data={dropdownData?.[0]?.occupation}
            label={'Occupation'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.occupation}
            onChange={item => {
              handleChange('occupation', item);
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
          <FloatingInput
            label={'Designation'}
            drpdwnContStyle={styles.dropdownCntStyle}
            value={profileDetails?.designation}
            onChange={item => {
              handleChange('designation', item);
            }}
            cntnrStyle={styles.dropdownCont}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => sendEditProfile()}
            style={styles.submitBtn}>
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
    backgroundColor: COLORS.dropDownBg,
  },
  dropdownCntStyle: {
    backgroundColor: COLORS.dropDownBg,
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
});
