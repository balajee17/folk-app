import {
  Image,
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
import { CaptureImage, ChooseImage, ImageUploadModal } from '../components/CommonFunctionalities';

const EditProfile = ({navigation,route}) => {
  const {globalState,setGlobalState} = useAppContext();

  const {userData} = route?.params;

  const [loader, setLoader] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    country: {label:'',value:''},
    city: '',
    state: {label:'',value:''},
    address: '',
    highestQualification: '',
    occupation: {label:'',value:''},
    designation: '',
    livingStatus: {label:'',value:''},
    maritalStatus: {label:'',value:''},
    passportPhoto:''
  });
  const [imagePicker, setImagePicker] = useState({visible:false,path:''});
  const [dropdownData, setDropdownData] = useState(
    {
      country: [],
      state: [],
      livingStatus: [],
      maritalStatus: [],
      occupation: [],
    }
  );

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
        setDropdownData(data?.dropdown);
        setProfileDetails(data?.profileDetails);
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
      const params = {
        country:profileDetails?.country?.value,
        city: profileDetails?.city,
        state:profileDetails?.state?.value,
        address: profileDetails?.address,
        highestQualification: profileDetails?.highestQualification,
        occupation:profileDetails?.occupation?.value,
        designation: profileDetails?.designation,
        livingStatus:profileDetails?.livingStatus?.value,
        maritalStatus:profileDetails?.maritalStatus?.value,
        passportPhoto:profileDetails?.passportPhoto
      };
      const response = await API.sendEditProfileDetails(params);

      console.log('Edit Profile_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setProfileDetails(data);
        await setGlobalState((prev)=>({...prev,reloadProfile:'Y'}));
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

  // # Upload Type 
  const uploadType=async(type)=>{
  
    const result = type==='C' ? await CaptureImage() : await ChooseImage();
  
    if(typeof result === 'object' && Object.keys(result).length > 0){
      setImagePicker({visible:false,path:result?.path});
    }
    else{ 
      setImagePicker({visible:false,path:''});
    }
  }

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
            data={dropdownData?.country}
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
            data={dropdownData?.state}
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
            data={dropdownData?.livingStatus}
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
            data={dropdownData?.maritalStatus}
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
            data={dropdownData?.occupation}
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

          {/* // # Passport size photo */}
<View style={styles.passportCont}>
          {!!profileDetails?.passportPhoto?
          <>
          <Image
            style={styles.passportImg}
            source={{
              uri: profileDetails?.passportPhoto,
            }}
          />
          <TouchableOpacity onPress={()=>setImagePicker((prev)=>({...prev,visible:true}))} activeOpacity={0.8} style={styles.changeBtn}>
            <Text style={styles.submitTxt}>Change</Text>
          </TouchableOpacity>
          </>
           :
          <TouchableOpacity  onPress={()=>setImagePicker((prev)=>({...prev,visible:true}))} activeOpacity={0.8} style={styles.addPhotoBtn}>
            <MaterialCommunityIcons name='plus' color={COLORS.osloGrey} size={moderateScale(25)} />
            <Text style={styles.addPhototTxt}>Upload Passport size photo</Text>
          </TouchableOpacity>
          }
          </View>

       {/* // # Submit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => sendEditProfile()}
            style={styles.submitBtn}>
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* // @ Pick Image upload */}
        <ImageUploadModal visible={imagePicker?.visible} uploadType={uploadType} closeModal={()=>setImagePicker((prev)=>({...prev,visible:false}))} />
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
  passportCont:{  
    marginTop: "5%",
    backgroundColor: COLORS.dropDownBg,
    width: "90%",
    borderRadius: moderateScale(10),
    alignSelf:'center',
    justifyContent:'center',alignItems:'center',
    padding: "4%"
  },
  passportImg:{
    width: horizontalScale(200),
    height: horizontalScale(200),
    borderRadius: moderateScale(20),
  },
  changeBtn:{backgroundColor:COLORS.atlantis,width:horizontalScale(70),height:horizontalScale(30),borderRadius:moderateScale(6),alignItems:'center',justifyContent:'center',marginTop:'10%'},
  addPhotoBtn:{width:horizontalScale(100),height:horizontalScale(100),borderRadius:moderateScale(6), borderWidth:1,borderStyle:'dashed',borderColor:COLORS.osloGrey,justifyContent:'center',alignItems:'center'},
  addPhototTxt:{fontFamily:FONTS.urbanistRegular,fontSize:SIZES.s,color:COLORS.osloGrey,marginTop:'10%',textAlign:'center'}
});
