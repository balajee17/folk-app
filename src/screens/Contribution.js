import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../components/Container';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';

const Contribution = props => {
  const {globalState, setGlobalState} = useAppContext();
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
          titleName={screenNames.contribution}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} />
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Contribution;

const styles = StyleSheet.create({});
