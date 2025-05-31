import {
  FlatList,
  Image,
  Pressable,
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
import {CopyToClipboard} from '../components/CommonFunctionalities';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../../App';
import {DownloadImage} from '../components/FileDownloader';

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
      <View style={[MyStyles.contentContainer, {paddingHorizontal: 0}]}>
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
                      MyStyles.paddingHor10,
                      {marginTop: '4%'},
                    ]}>
                    {item?.day}
                  </Text>

                  {item?.updates?.map((updateItem, updateIndex) => {
                    return (
                      <View key={updateIndex}>
                        {!!updateItem?.link && !!updateItem?.text ? (
                          <View
                            key={updateItem?.id}
                            style={[styles.imgTxtCont, MyStyles.paddingHor10]}>
                            <View
                              style={{
                                width: windowWidth * 0.9,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                style={MyStyles.quotesImg}
                                source={{
                                  uri: updateItem?.link,
                                }}
                              />
                              {/*  // # Download Btn */}
                              <TouchableOpacity
                                onPress={async () => {
                                  const result = await DownloadImage(
                                    updateItem?.link,
                                  );

                                  if (!!result?.type) {
                                    toastMsg(
                                      result?.msg,
                                      result?.type === 'S'
                                        ? 'success'
                                        : 'error',
                                    );
                                  } else {
                                    toastMsg('Download failed.', 'error');
                                  }
                                }}
                                style={MyStyles.shareBtn}
                                activeOpacity={0.6}>
                                <MaterialCommunityIcons
                                  name="download"
                                  size={moderateScale(25)}
                                  color={COLORS.white}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              key={updateItem?.id}
                              style={[
                                MyStyles.updatesTextCont,
                                {
                                  marginTop: '2%',
                                },
                              ]}>
                              <Text
                                style={[
                                  MyStyles.announceTxt,
                                  {color: COLORS.black},
                                ]}>
                                {updateItem?.title}
                              </Text>

                              <Text
                                style={[
                                  MyStyles.updateTxt,
                                  {marginTop: '2%', color: COLORS.black},
                                ]}>
                                {updateItem?.text}
                              </Text>
                            </View>
                          </View>
                        ) : !!updateItem?.link ? (
                          <View
                            key={updateItem?.id}
                            style={[styles.quotesImgCont]}>
                            <Image
                              style={MyStyles.quotesImg}
                              source={{
                                uri: updateItem?.link,
                              }}
                            />
                            {/*  // # Download Btn */}
                            <TouchableOpacity
                              onPress={async () => {
                                const result = await DownloadImage(
                                  updateItem?.link,
                                );

                                if (!!result?.type) {
                                  toastMsg(
                                    result?.msg,
                                    result?.type === 'S' ? 'success' : 'error',
                                  );
                                } else {
                                  toastMsg('Download failed.', 'error');
                                }
                              }}
                              style={MyStyles.shareBtn}
                              activeOpacity={0.6}>
                              <MaterialCommunityIcons
                                name="download"
                                size={moderateScale(25)}
                                color={COLORS.white}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : !!updateItem?.text ? (
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
                              MyStyles.paddingHor10,
                              {
                                marginTop: '4%',
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
  },
  imgTxtCont: {
    marginTop: '4%',
    backgroundColor: COLORS.inptBg,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: windowWidth * 0.95,
    padding: '4%',
    borderRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  quotesImgCont: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
    ...MyStyles.paddingHor10,
  },
});
