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

const FolkUpdates = ({navigation, route}) => {
  const [imageDimensions, setImageDimensions] = useState({});
  const [shimmer, setShimmer] = useState(true);

  const [quotesImg, setQuotesImg] = useState(
    'https://pbs.twimg.com/media/Ft_jtRaagAM_PJD.jpg:large',
  );

  useEffect(() => {
    // Fetch the dimensions of the image
    Image.getSize(
      quotesImg,
      (width, height) => {
        setImageDimensions({width: width, height: height});
      },
      error => {
        console.error('Error fetching image dimensions:', error);
      },
    );
  }, [quotesImg]);

  const {title} = route?.params;

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
              // data={}
              // keyExtractor={item=>item?.id}
              renderItem={({item, index}) => {
                return (
                  <>
                    <Text style={[MyStyles.subTitleText, MyStyles.marTop3Per]}>
                      Today
                    </Text>

                    <View style={styles.quotesImgCont(imageDimensions)}>
                      <Image
                        style={MyStyles.quotesImg}
                        source={{
                          uri: 'https://pbs.twimg.com/media/FtJ9xsCaMAAvEsM.jpg:large',
                        }}
                      />
                    </View>

                    <View style={[MyStyles.updatesTextCont]}>
                      <LinearGradient
                        start={{x: 0.3, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#353a5f', '#9ebaf3']}
                        style={[MyStyles.gradient, MyStyles.marTop10]}>
                        <View style={{padding: moderateScale(10)}}>
                          <Text style={MyStyles.updateTitle}>
                            Welcome to Folk App
                          </Text>
                          <Text
                            style={[MyStyles.updateTxt, {fontSize: SIZES.xl}]}>
                            Vaikunta Ekadasi,
                          </Text>
                          <Text style={MyStyles.updateTxt}>
                            Vaikuntha Ekadashi is an important festival
                            celebrated every year. Ekadashi is the eleventh day
                            of the fortnight of the waxing or waning moon and
                            occurs twice a month. But the Ekadashi that occurs
                            in the month of Margashirsha (December – January)
                            during the fortnight of the waxing moon is of
                            special significance and is glorified as Vaikuntha
                            Ekadashi. On this day, the gates of Vaikuntha (the
                            Lord’s abode) open to His ardent devotees. This is a
                            major festival of South India celebrated in all the
                            temples of Lord Vishnu.
                          </Text>
                        </View>
                      </LinearGradient>
                    </View>
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
  quotesImgCont: imageDimensions => ({
    width: windowWidth,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    aspectRatio:
      (imageDimensions?.width || 135) / (imageDimensions?.height || 76),
    borderRadius: moderateScale(15),
    ...MyStyles.paddingHor10,
  }),
});
