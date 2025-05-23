import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  FONTS,
  moderateScale,
  screenHeight,
  screenWidth,
  SIZES,
} from '../styles/MyStyles';
import {API} from '../services/API';
import {useAppContext} from '../../App';
import {useToast} from 'react-native-toast-notifications';
import {getImage} from '../utils/ImagePath';
import {useStatusBarHeight} from './StatusBarComponent';
import AndroidBackHandler from './BackHandler';
import Container from './Container';
import {Camera} from 'react-native-camera-kit';

const QrScanner = props => {
  const {globalState, setGlobalState} = useAppContext();
  const {profileId} = globalState;
  const statusBarHeight = useStatusBarHeight();

  const [flash, setFlash] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [scanBarCode, setScanBarCode] = useState(true);

  const {navigation, route} = props;
  const {eventId = ''} = route?.params;

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      AndroidBackHandler.noGoingBack,
    );
    return () => backHandler.remove();
  }, []);

  const onSuccess = e => {
    console.log('QR Code Scanned:', e.nativeEvent.codeStringValue);
    const scannedData = e.nativeEvent.codeStringValue;
    setScanBarCode(false);
    if (!!scannedData) {
      sendEventAttendance(scannedData);
    } else {
      setTimeout(() => {
        setScanBarCode(true);
      }, 2500);
      toastMsg('Invalid Qr Code.', 'error');
    }
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
        await setGlobalState(prev => ({
          ...prev,
          reloadEventList: 'Y',
          activeEventTab: 1,
        }));
        setScanBarCode(true);
        navigation.goBack();
      } else {
        toastMsg(message, 'warning');
        setScanBarCode(true);
      }
      setLoader(false);
    } catch (err) {
      console.log('ERR-Event-Attendance-screen', err);
      setLoader(false);
      toastMsg('', 'error');
      setScanBarCode(true);
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        {/* // @ Header - Flash Icn, Title, Close Icn  */}
        <View style={styles.header(statusBarHeight)}>
          <TouchableOpacity
            onPress={() => setFlash(!flash)}
            activeOpacity={0.8}
            style={styles.flashIcon}>
            <Ionicons
              name="flash"
              size={30}
              color={flash ? COLORS.citrine : COLORS.white}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Scan QR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.closeIcon}
            onPress={() => {
              setCameraActive(false);
              navigation.goBack();
            }}>
            <Ionicons name="close" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        {/* // @ Sub Title */}
        <Text style={styles.scanText}>
          Scan the QR code to{'\n'}Mark your Attendance
        </Text>
        {/* // @ Qr Scanner */}
        <View style={[styles.camContainer]}>
          {cameraActive && (
            <Camera
              scanBarcode={scanBarCode}
              onReadCode={event => onSuccess(event)}
              showFrame={false}
              flashMode={flash ? 'on' : 'off'}
              cameraType="back"
              style={{width: screenWidth * 0.7, height: screenHeight * 0.5}}
              maxZoom={5}
            />
          )}
        </View>
        {/* // @ Camera outer border img */}
        <View pointerEvents="none" style={styles.outerBorderImg}>
          <Image source={getImage.scanner} style={styles.marker} />
        </View>
      </View>
    </Container>
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
    height: screenWidth * 0.7,
    width: screenWidth * 0.7,
    borderRadius: moderateScale(30),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  outerBorderImg: {
    position: 'absolute',
  },
  marker: {
    height: screenWidth * 0.9,
    width: screenWidth * 0.9,
    resizeMode: 'contain',
    zIndex: 99,
  },
  tapScanCont: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapScanTxt: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxl,
  },
});
