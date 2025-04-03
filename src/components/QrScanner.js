import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  screenHeight,
  SIZES,
  verticalScale,
  windowHeight,
  windowWidth,
} from '../styles/MyStyles';
import {API} from '../services/API';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {useToast} from 'react-native-toast-notifications';
import {getImage} from '../utils/ImagePath';
import {useStatusBarHeight} from './StatusBarComponent';
import AndroidBackHandler from './BackHandler';

const QrScanner = props => {
  const {globalState, setGlobalState} = useAppContext();
  const {profileId} = globalState;
  const statusBarHeight = useStatusBarHeight();

  const [flash, setFlash] = useState(false);
  const [loader, setLoader] = useState(false);

  const onSuccess = e => {
    console.log('QR Code Scanned:', e.data);
    sendEventAttendance(e.data);
  };
  const {navigation, route} = props;
  const {eventId} = route?.params;

  useEffect(() => {
    AndroidBackHandler.setHandler(props);


    return AndroidBackHandler.removerHandler();


  }, []);

 

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  // # API to mark attendance
  const sendEventAttendance = async code => {
    try {
      setLoader(true);
      const params = {profile_id: profileId, event_id: eventId, code: code};
      const response = await API.sendEventAttendance(params);

      console.log('Event_Attendance_response', response?.data);
      const {Data, successCode, message} = response?.data;
      if (successCode === 1) {
        await setGlobalState(prev => ({
          ...prev,
          current: 'B2',
          btTab: 'B2',
          activeEventTab: 1,
        }));
        toastMsg(message, 'success');
        await setGlobalState((prev)=>({...prev,reloadEventList:'Y',activeEventTab:1}));
        navigation.goBack();
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      console.log('ERR-Event-Attendance-screen', err);
      setLoader(false);
      toastMsg('', 'error');
    }
  };

  return (
    <View style={styles.container}>
      {/* // @ Header - Flash Icn, Title, Close Icn  */}
      <View style={styles.header(statusBarHeight)}>
        <TouchableOpacity
          onPress={() => setFlash(!flash)}
          activeOpacity={0.8}
          style={styles.flashIcon}>
          <Ionicons name="flash" size={30} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.title}>Scan QR</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.closeIcon}
          onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {/* // @ Sub Title */}

      <Text style={styles.scanText}>
        Scan the QR code to{'\n'}Mark your Attendance
      </Text>
      {/* // @ Qr Scanner */}
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        reactivate={true}
        reactivateTimeout={2000}
        cameraContainerStyle={styles.camContainer}
        cameraStyle={styles.cameraStyle}
      />
      {/* // @ Camera outer border img */}
      <View style={styles.outerBorderImg}>
        <Image source={getImage.scanner} style={styles.marker} />
      </View>
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.scannerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: statusBarHeight => ({
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '3%',
    // marginTop: '3%',
  }),
  title: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
  },
  scanText: {
    fontSize: SIZES.xxl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    position: 'absolute',
    textAlign: 'center',
    top: screenHeight * 0.15,
    zIndex: 99,
  },
  camContainer: {
    height: windowWidth * 0.75,
    width: windowWidth * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.scannerBg,
  },
  cameraStyle: {
    height: windowWidth * 0.7,
    width: windowWidth * 0.7,
    borderRadius: moderateScale(30),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  outerBorderImg: {
    position: 'absolute',
  },
  marker: {
    height: windowWidth * 0.9,
    width: windowWidth * 0.9,
    resizeMode: 'contain',
    zIndex: 99,
  },
});
