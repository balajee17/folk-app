import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../components/CustomHeader';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {API} from '../services/API';

const FolkUpdates = ({navigation, route}) => {
  const [shimmer, setShimmer] = useState(true);
  const [folkUpdates, setFolkUpdates] = useState([]);

  const {title} = route?.params;

  useEffect(() => {
    getUpdatesHistory();
  }, []);

  // # API Call to get Updates History
  const getUpdatesHistory = async () => {
    try {
      const response = await API.getUpdatesHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode} = response?.data;
      if (SuccessCode === 1) {
        setFolkUpdates(history);
      } else {
        setFolkUpdates([]);
      }
      setShimmer(false);
    } catch (err) {
      console.log('ERR-Updates-screen', err);
    }
  };

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader goBack={() => navigation.goBack()} titleName={title} />
        {/* // # Contents */}
        <View style={MyStyles.contentContainer}>
          {shimmer ? (
            <>
              <View>
                {Array(2)
                  .fill(2)
                  .map(_ => {
                    return (
                      <>
                        <TitleShimmer />
                        <ImageShimmer
                          width={'100%'}
                          height={verticalScale(300)}
                          borderRadius={moderateScale(15)}
                          marginTop={verticalScale(10)}
                          alignSelf={'center'}
                        />
                        <ImageShimmer
                          width={'100%'}
                          height={verticalScale(120)}
                          borderRadius={moderateScale(15)}
                          marginTop={verticalScale(10)}
                          alignSelf={'center'}
                        />
                      </>
                    );
                  })}
              </View>
            </>
          ) : (
            <FlatList
              data={folkUpdates}
              keyExtractor={(_, index) => index}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Text
                      style={[MyStyles.subTitleText, {marginVertical: '5%'}]}>
                      {item?.day}
                    </Text>

                    {item?.updates?.map((image, index) => {
                      return (
                        <>
                          {!!image?.link && (
                            <View
                              style={[
                                styles.imageContainer,
                                {marginTop: index !== 0 ? '5%' : 0},
                              ]}
                              key={image?.id}>
                              <Image
                                style={MyStyles.quotesImg}
                                source={{
                                  uri: image?.link,
                                }}
                              />
                            </View>
                          )}

                          {!!image?.text && (
                            <View
                              style={[
                                MyStyles.updatesTextCont,
                                {
                                  marginTop: !!image?.link
                                    ? '2%'
                                    : index !== 0
                                    ? '5%'
                                    : 0,
                                },
                              ]}>
                              <LinearGradient
                                start={{x: 0.3, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={['#353a5f', '#9ebaf3']}
                                style={[MyStyles.gradient]}>
                                <View style={{padding: moderateScale(10)}}>
                                  <Text style={MyStyles.updateTxt}>
                                    {image?.text}
                                  </Text>
                                </View>
                              </LinearGradient>
                            </View>
                          )}
                        </>
                      );
                    })}
                  </>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default FolkUpdates;

const styles = StyleSheet.create({
  imageContainer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15),
    alignSelf: 'center',
    ...MyStyles.paddingHor10,
  },
});
