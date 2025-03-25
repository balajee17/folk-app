import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {MyStyles} from '../styles/MyStyles';
import {getImage} from '../utils/ImagePath';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import AndroidBackHandler from '../components/BackHandler';
import Container from '../components/Container';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';

const FolkMerchant = props => {
  const {setGlobalState} = useAppContext();

  const {navigation} = props;
  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);
  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          toggleDrawer={() => navigation.openDrawer()}
          titleName={screenNames.folkMerchant}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} />
        </View>
      </SafeAreaView>

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

export default FolkMerchant;

const styles = StyleSheet.create({});
