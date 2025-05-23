import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {MyStyles} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';

const Accommodation = props => {
  const {setGlobalState} = useAppContext();
  const {navigation} = props;
  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);
  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={screenNames.accommodation}
      />
      {/* // # Contents */}
      <View style={MyStyles.contentCont}>
        <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} />
      </View>

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

export default Accommodation;

const styles = StyleSheet.create({});
