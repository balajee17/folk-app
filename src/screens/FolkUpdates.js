import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  moderateScale,
  MyStyles,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import NoDataFound from '../components/NoDataFound';
import AndroidBackHandler from '../components/BackHandler';
import {CopyToClipboard, ShareLink} from '../components/CommonFunctionalities';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../../App';

const FolkUpdates = props => {
  const [shimmer, setShimmer] = useState(true);
  const [folkUpdates, setFolkUpdates] = useState([]);
  const {navigation, route} = props;
  const {globalState} = useAppContext();
  const {announcementCardColor} = globalState;

  const {title} = route?.params;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getUpdatesHistory();
    return AndroidBackHandler.removerHandler();
  }, []);

  // # API Call to get Updates History
  const getUpdatesHistory = async () => {
    try {
      const response = await API.getUpdatesHistroy();

      console.log('response', response?.data);
      const {history, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setFolkUpdates(history);
      } else {
        setFolkUpdates([]);
        toastMsg(message, 'warning');
      }
      setShimmer(false);
    } catch (err) {
      toastMsg('', 'error');
      console.log('ERR-Updates-screen', err);
      setShimmer(false);
    }
  };

  return (
    <Container>
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
            contentContainerStyle={{
              paddingBottom: '5%',
            }}
            renderItem={({item, index}) => {
              return (
                <>
                  <Text
                    style={[
                      MyStyles.subTitleText,
                      {marginTop: '5%', marginBottom: '2%'},
                    ]}>
                    {item?.day}
                  </Text>

                  {item?.updates?.map((updateItem, updateIndex) => {
                    return (
                      <View key={updateIndex}>
                        {!!updateItem?.link && (
                          <View
                            key={updateItem?.id}
                            style={[styles.quotesImgCont]}>
                            <Image
                              style={MyStyles.quotesImg}
                              source={{
                                uri: updateItem?.link,
                              }}
                            />
                            {/*  // # Share Btn */}
                            <TouchableOpacity
                              onPress={() => {
                                const result = ShareLink(updateItem?.link);
                                if (!!result?.type) {
                                  toastMsg(result?.message, result?.type);
                                }
                              }}
                              style={MyStyles.shareBtn}
                              activeOpacity={0.6}>
                              <MaterialCommunityIcons
                                name="share"
                                size={moderateScale(25)}
                                color={COLORS.white}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                        {updateItem?.link && updateItem?.text ? (
                          <View
                            key={updateItem?.id}
                            style={[
                              MyStyles.updatesTextCont,
                              MyStyles.paddingHor10,
                              {
                                marginTop: '2%',
                              },
                            ]}>
                            <Text style={[MyStyles.announceTxt]}>
                              {updateItem?.title}
                            </Text>

                            <Text
                              style={[MyStyles.updateTxt, {marginTop: '2%'}]}>
                              {updateItem?.text}
                            </Text>
                          </View>
                        ) : updateItem?.text ? (
                          <Pressable
                            onLongPress={() => {
                              if (
                                CopyToClipboard(
                                  `${updateItem?.title}\n${updateItem?.text}`,
                                )
                              ) {
                                toastMsg('Message copied', 'success');
                              } else {
                                toastMsg('Unable to copy the text', 'error');
                              }
                            }}
                            key={updateItem?.id}
                            style={[
                              MyStyles.updatesTextCont,
                              {
                                marginTop: !!updateItem?.link
                                  ? '2%'
                                  : index !== 0
                                  ? '5%'
                                  : '1%',
                              },
                            ]}>
                            <View
                              style={MyStyles.noticeCard(
                                announcementCardColor,
                              )}>
                              <View
                                style={[
                                  MyStyles.announceIcnTxtCont,
                                  {
                                    width: '17%',
                                  },
                                ]}>
                                <Image
                                  source={{
                                    uri: updateItem?.icon,
                                  }}
                                  style={MyStyles.announceIcn}
                                />
                              </View>
                              <View style={{width: '80%'}}>
                                <Text style={[MyStyles.announceTxt]}>
                                  {updateItem?.title}
                                </Text>
                                <Text
                                  style={[
                                    MyStyles.updateTxt,
                                    {marginTop: '2%'},
                                  ]}>
                                  {updateItem?.text}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        ) : (
                          <></>
                        )}
                      </View>
                    );
                  })}
                </>
              );
            }}
            ListEmptyComponent={NoDataFound}
          />
        )}
      </View>
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
