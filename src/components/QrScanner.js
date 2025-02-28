import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, horizontalScale, SIZES} from '../styles/MyStyles';

const QrScanner = ({navigation}) => {
  const [flash, setFlash] = useState(false);
  const onSuccess = e => {
    console.log('QR Code Scanned:', e.data);
    // Handle scanned data
  };

  return (
    // <QRCodeScanner
    //   onRead={scan => console.log('SCANNED', scan)}
    //   bottomContent={
    //     <TouchableOpacity
    //       onPress={() => setOpenScanner(false)}
    //       style={styles.buttonTouchable}>
    //       <Text style={styles.buttonText}>Cancel</Text>
    //       <MaterialCommunityIcons name="close" size={25} color={COLORS.white} />
    //     </TouchableOpacity>
    //   }
    //   containerStyle={{backgroundColor: 'red'}}
    //   flashMode={
    //     flash
    //       ? RNCamera.Constants.FlashMode.torch
    //       : RNCamera.Constants.FlashMode.off
    //   }
    //   cameraContainerStyle={{
    //     backgroundColor: COLORS.white,
    //     overflow: 'hidden',
    //     alignSelf: 'center',
    //     width: '90%',
    //     borderRadius: 20,
    //     marginBottom: '10%',
    //   }}
    //   topContent={<Text >akdjfh;akjfha;fgkj</Text>}
    //   topViewStyle={{backgroundColor: 'pink', height: 20}}
    // />

    <View style={styles.container}>
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '3%',
        }}>
        <TouchableOpacity style={styles.flashIcon}>
          <Ionicons name="flash-outline" size={30} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.title}>Scan QR</Text>

        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.scanText}>
        Scan the QR code to{'\n'}Mark your Attendance
      </Text>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        reactivate={true}
        reactivateTimeout={2000}
        // showMarker={true}
        // customMarker={
        //   <Image
        //     source={{
        //       uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KKhJ74RQdx2e_HACS-0NMYiia0UfqwG9mg&s',
        //     }}
        //     style={styles.marker}
        //   />
        // }
        cameraStyle={styles.camera}
        cameraContainerStyle={{
          height: horizontalScale(200),
          width: horizontalScale(300),
        }}
      />
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashIcon: {},
  title: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxxl,
    color: COLORS.white,
  },
  closeIcon: {},
  camera: {
    height: horizontalScale(100),
    width: horizontalScale(300),
    alignSelf: 'center',
  },
  marker: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },
  scanText: {
    fontSize: SIZES.xl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    position: 'absolute',
    textAlign: 'center',
    top: '13%',
  },
});
