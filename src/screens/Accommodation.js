import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';
import AccommodationCard from '../components/AccommodationCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const Accommodation = props => {
  const {setGlobalState} = useAppContext();

  const {navigation} = props;

  const [opnRequestBox, setOpnRequestBox] = useState(false);
  const [requestModal, setRequestModal] = useState({
    visible: true,
    date: moment().format('DD-MMM-YYYY'),
    reason: '',
  });
  const [requestLists, setRequestLists] = useState([
    {
      date: '01-July-2025',
      status: 'P',
      reason: 'REASON from folk boy',
      rejectedReason: '',
      bedNo: 'L22 ( 3rd Floor )',
      hostelName: 'FOLK Nivas',
    },
  ]);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);

  const closeModal = () => {
    setRequestModal(prev => ({...prev, visible: false}));
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={screenNames.accommodation}
        rightIcnAction={() => {
          setOpnRequestBox(true);
        }}
      />
      {/* // # Contents */}
      <View style={[MyStyles.contentCont, styles.mainContainer]}>
        {/* // # Request List Title and history Icn */}
        <View style={styles.titleIcnCont}>
          <Text style={styles.titleTxt}>Request Lists</Text>
          <MaterialIcons
            onPress={() => {}}
            name="history"
            size={moderateScale(22)}
            color={COLORS.black}
          />
        </View>

        {/* // # Request List card */}
        <FlatList
          data={requestLists}
          contentContainerStyle={{marginTop: '2%'}}
          renderItem={({item, index}) => (
            <AccommodationCard data={item} index={index} />
          )}
        />
      </View>

      {/* // @ Modal for Request */}
      <Modal
        transparent
        animationType="slide"
        visible={requestModal?.visible}
        onRequestClose={() => closeModal()}>
        <Pressable style={[MyStyles.modal, styles.modalStyle]}>
          <View style={styles.modalBox}>
            {/* // # Request Txt and Close Btn */}
            <View style={styles.titleIcnCont}>
              <Text style={[styles.titleTxt, {fontSize: SIZES.subTitle}]}>
                Request
              </Text>
              <AntDesign
                onPress={() => closeModal()}
                name="close"
                size={moderateScale(20)}
                color={COLORS.black}
              />
            </View>
          </View>
        </Pressable>
      </Modal>

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

const styles = StyleSheet.create({
  mainContainer: {
    padding: '4%',
  },
  titleIcnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
  },
  modalStyle: {justifyContent: 'center', alignItems: 'center'},
  modalBox: {
    backgroundColor: 'pink',
    borderRadius: moderateScale(20),
    width: '90%',
    height: 200,
    padding: '3%',
  },
});
