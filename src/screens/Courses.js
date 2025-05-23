import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';

const Courses = () => {
  const CARDS = [
    require('../assets/images/component1.png'),
    require('../assets/images/component2.png'),
    require('../assets/images/component3.png'),
    require('../assets/images/component4.png'),
    require('../assets/images/component5.png'),
  ];
  return (
    <View style={MyStyles.contentCont}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '25%'}}>
        {CARDS?.map((item, index) => (
          <View
            style={{
              alignSelf: 'center',
              width: windowWidth * 0.95,
              height: screenHeight * 0.2,
              marginTop: '4%',
            }}>
            <Image
              source={item}
              style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                // marginTop: '4%',
                resizeMode: 'stretch',
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({});
