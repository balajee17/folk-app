import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../components/Container';
import {screenHeight} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';
import WebView from 'react-native-webview';
import Spinner from '../components/Spinner';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect} from '@react-navigation/native';

const YFHForm = props => {
  // const [formValues, setFormValues] = useState({});
  const {globalState, setGlobalState} = useAppContext();
  const {mobileNumber} = globalState;

  const [loader, setLoader] = useState(true);
  const [YFHLink, setYFHLink] = useState('');

  const {navigation, route} = props;

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getYFHLink();
    }, [route?.params?.titleName]),
  );

  // # API Get YFH Form Link
  const getYFHLink = async () => {
    try {
      const response = await API.getYFHLink({mobile: mobileNumber});
      const {link, successCode, message} = response?.data;
      if (successCode === 1) {
        console.log('YFH_Link_res', link);
        setYFHLink(link);
        !!link && setLoader(false);
      } else {
        setYFHLink('');
        toastMsg(message, 'warning');
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-YFH', err);
    }
  };

  const handleChange = (key, value) => {
    setFormValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={route?.params?.titleName}
        id={route?.params?.id}
      />
      <Spinner spinnerVisible={loader} />
      {/* // # WebView YFH FORM */}
      {YFHLink && (
        <WebView
          showsVerticalScrollIndicator={false}
          source={{
            uri: YFHLink,
          }}
          style={{
            flex: 1,
            maxHeight: screenHeight * 0.78,
          }}
          onNavigationStateChange={event => {
            console.log('EVENT_WEBVIEW', event);
          }}
          onLoad={() => setLoader(false)}
        />
      )}

      {/* // @ Personal Details */}
      {/* <Text
            style={[
              MyStyles.subTitleText,
              MyStyles.marTop3Per,
              {marginTop: '4%'},
            ]}>
            Personal Details
          </Text>
          {/* // # Whatsapp */}
      {/* <FloatingInput
            label={'WhatsApp Number'}
            value={formValues?.whatsapp}
            onChangeText={value => handleChange('whatsapp', value)}
            rightIcon={
              <MaterialCommunityIcons
                name={'whatsapp'}
                color={COLORS.btIcon}
                size={25}
              />
            }
            rightIconStyle={{
              alignItems: 'center',
              justifyCenter: 'center',
            }}
          />
          {/* // # Communication Address */}
      {/* <FloatingInput
            label={'Communication Address'}
            value={formValues?.address}
            onChangeText={value => handleChange('address', value)}
          />

          {/* // @ Educational Details */}
      {/* <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
            Educational Details
          </Text>
          {/* // # Highest Qualification */}
      {/* <FloatingInput
            type="dropdown"
            label={'Highest Qualification'}
            value={formValues?.qualification}
            onChange={item => {
              handleChange('qualification', item);
            }}
            renderRightIcon={() => (
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={COLORS.btIcon}
                size={25}
              />
            )}
            data={[
              {id: 1, label: 'first', value: 'first'},
              {id: 2, label: 'escond', value: 'first1'},

              {id: 3, label: 'dfdh', value: 'first2'},

              {id: 4, label: 'fidfhdhrst', value: 'first3'},
            ]}
            rightIconStyle={{
              alignItems: 'center',
              justifyCenter: 'center',
            }}
          /> */}
      {/* <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} /> */}
      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={''}
        setSelIcon={value => {
          if (value) {
            navigation.navigate(screenNames.switcherScreen);
            setGlobalState(prev => ({...prev, btTab: value, current: value}));
          }
        }}
      />
    </Container>
  );
};

export default YFHForm;

const styles = StyleSheet.create({});
