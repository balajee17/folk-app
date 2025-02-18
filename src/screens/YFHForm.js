import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container';
import {COLORS, MyStyles} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import FloatingInput from '../components/FloatingInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const YFHForm = ({navigation}) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (key, value) => {
    setFormValues(prevState => ({
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
          titleName={screenNames.yfhForm}
        />
        {/* // # Contents */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[MyStyles.scrollView, MyStyles.paddingHor10]}>
          {/* // @ Personal Details */}
          <Text
            style={[
              MyStyles.subTitleText,
              MyStyles.marTop3Per,
              {marginTop: '4%'},
            ]}>
            Personal Details
          </Text>
          {/* // # Whatsapp */}
          <FloatingInput
            label={'WhatsApp Number'}
            value={formValues?.whatsapp}
            onChangeText={value => handleChange('whatsapp', value)}
            rightIcon={
              <MaterialCommunityIcons
                name={'whatsapp'}
                color={COLORS.charcoal}
                size={25}
              />
            }
            rightIconStyle={{
              alignItems: 'center',
              justifyCenter: 'center',
            }}
          />
          {/* // # Communication Address */}
          <FloatingInput
            label={'Communication Address'}
            value={formValues?.address}
            onChangeText={value => handleChange('address', value)}
          />

          {/* // @ Educational Details */}
          <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
            Educational Details
          </Text>
          {/* // # Highest Qualification */}
          <FloatingInput
            type="dropdown"
            label={'Highest Qualification'}
            value={formValues?.qualification}
            onChange={item => {
              handleChange('qualification', item);
            }}
            renderRightIcon={() => (
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={COLORS.charcoal}
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
          />
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default YFHForm;

const styles = StyleSheet.create({});
