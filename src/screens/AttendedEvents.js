import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, moderateScale, MyStyles, screenWidth} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {screenNames} from '../constants/ScreenNames';
import {useNavigation} from '@react-navigation/native';

const AttendedEvents = ({navigation}) => {
  useEffect(() => {
    console.log('REG');
  }, []);

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <View style={[MyStyles.flex1, {width: screenWidth}]}>
      {/*  // @ Events Card */}
      <TouchableOpacity
        onPress={() => {
          navigateTo(screenNames.eventDetails, {
            screen: 'Registered',
          });
        }}
        activeOpacity={0.9}
        style={MyStyles.card}>
        {/* // # Card image */}
        <Image
          style={MyStyles.cdImage}
          resizeMode="stretch"
          source={{
            uri: 'https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
        />
        {/* // # Date Mode Container */}
        <View style={MyStyles.dateModeCont}>
          <View style={MyStyles.dateCont}>
            <Text style={MyStyles.dateTxt}>15</Text>
            <Text style={MyStyles.monthTxt}>Jan</Text>
          </View>

          <View style={MyStyles.modeCont}>
            <Text style={MyStyles.modeTxt}>Offline</Text>
          </View>
        </View>

        {/* // # Content Container */}
        <View style={MyStyles.boxContentContainer}>
          <View style={{width: '80%'}}>
            <Text style={MyStyles.titleTxt}>The Journey of self Discovery</Text>
            <Text style={MyStyles.descripTxt}>
              The Journey of self Discovery
            </Text>
          </View>

          <View style={{width: '18%'}}>
            <Text style={MyStyles.amtTxt}>Free</Text>
          </View>
        </View>

        {/* // # Icon & Register Btn Container */}
        <View style={[MyStyles.boxContentContainer, {marginBottom: '1%'}]}>
          <View style={[MyStyles.iconsContainer, {width: '30%'}]}>
            <TouchableOpacity
              onPress={() => navigateTo(screenNames.scanner)}
              style={MyStyles.iconStyle}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={moderateScale(19)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo(screenNames.coupons)}
              style={MyStyles.iconStyle}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="ticket-percent-outline"
                size={moderateScale(22)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              // onPress={{}}
              style={MyStyles.iconStyle}
              activeOpacity={0.6}>
              <Entypo
                name="location-pin"
                size={moderateScale(25)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity> */}
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate(screenNames.eventDetails);
            }}
            style={[MyStyles.registerBtn,]}> */}
          <Text style={[MyStyles.registerTxt, {color: COLORS.candlelight}]}>
            Registered ✓
          </Text>
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AttendedEvents;

const styles = StyleSheet.create({});
