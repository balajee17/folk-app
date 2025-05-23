import {
  Platform,
  Pressable,
  ScrollView,
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
import {screenNames} from '../constants/ScreenNames';
import CustomHeader from '../components/CustomHeader';
import Container from '../components/Container';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {useAppContext} from '../../App';
import WheelColor from '../components/WheelColor';
import Spinner from '../components/Spinner';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const ChangeTheme = ({navigation}) => {
  const {globalState, setGlobalState} = useAppContext();
  const {buttonColor, profileId} = globalState;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  const [sections, setSections] = useState([]);
  const [userColors, setUserColors] = useState({});
  const [spinner, setSpinner] = useState(true);
  const [selSection, setSelSection] = useState({});
  const [openColorPick, setOpenColorPick] = useState(false);
  const [selColor, setSelColor] = useState('');

  useEffect(() => {
    getColorSections();
  }, []);

  useEffect(() => {
    if (
      selSection &&
      typeof selSection === 'object' &&
      Object.keys(selSection).length > 0
    ) {
      setOpenColorPick(true);
    }
  }, [selSection]);

  const getColorSections = async () => {
    try {
      const params = {
        profileId,
      };
      const response = await API.getColorTheme(params);

      console.log('response', response?.data);
      const {colors, successCode, message} = response?.data;
      if (successCode === 1) {
        setSections(colors);
        const getUserColors = [
          colors.reduce((acc, item) => {
            acc[item?.section] = item?.userColor;
            return acc;
          }, {}),
        ];

        setUserColors(getUserColors[0]);
      } else {
        setSections([]);
        toastMsg(message, 'warning');
      }
      setSpinner(false);
    } catch (err) {
      toastMsg('', 'error');
      console.log('ERR-Color-screen', err);
      setSpinner(false);
    }
  };

  const applyColorSections = async reset => {
    try {
      setSpinner(true);
      const params = {
        profileId,
        reset,
        colors: userColors,
      };
      const response = await API.updateColorTheme(params);

      console.log('Update response', response?.data);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
        storeColors();
        toastMsg(message, 'success');
      } else {
        toastMsg(message, 'warning');
      }
      setSpinner(false);
    } catch (err) {
      toastMsg('', 'error');
      console.log('ERR-Update Color-screen', err);
      setSpinner(false);
    }
  };

  const openPicker = selItem => {
    setSelSection(selItem);
  };

  const saveColor = chosenColorCode => {
    userColors[selSection?.section] = chosenColorCode;
    setUserColors({...userColors});
    setOpenColorPick(false);
    setSelSection({});
    setSelColor('');
  };

  const closePicker = () => {
    setSelSection({});
    setSelColor('');
    setOpenColorPick(false);
  };

  const storeColors = async () => {
    try {
      await setGlobalState(prev => ({
        ...prev,
        headerColor: userColors?.header,
        bottomTabColor: userColors?.bottomTab,
        buttonColor: userColors?.button,
        cardColor: userColors?.card,
        eventCardColor: userColors?.eventCard,
        announcementCardColor: userColors?.announcementCard,
        tabIndicatorColor: userColors?.tabIndicator,
      }));
      Platform.OS === 'android' &&
        (await changeNavigationBarColor(userColors?.header));
    } catch (e) {}
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        goBack={() => navigation.goBack()}
        titleName={screenNames.changeTheme}
      />
      <Spinner spinnerVisible={spinner} />
      {/* // # Contents */}
      <View style={[MyStyles.contentCont, styles.content]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headTxt}>Section</Text>

            <View style={styles.colorCont}>
              <Text style={[styles.headTxt, {textAlign: 'center'}]}>
                Default
              </Text>
              <Text style={[styles.headTxt, {textAlign: 'center'}]}>Yours</Text>
            </View>
          </View>

          {sections?.map((item, index) => (
            <View
              key={index}
              style={[styles.headerContainer, styles.valueContainer]}>
              <Text style={styles.sectTxt}>{item?.sectionText}</Text>

              <View style={styles.colorCont}>
                <View style={styles.colorCircleCont}>
                  <Pressable
                    style={[
                      styles.colorCircle,
                      {backgroundColor: item?.defaultColor},
                    ]}
                  />
                </View>

                <View style={styles.colorCircleCont}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => openPicker(item)}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor:
                          userColors[item?.section] || item?.userColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
          {Array.isArray(sections) && sections?.length > 0 && (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => applyColorSections('Y')}
                activeOpacity={0.8}
                style={styles.button(COLORS.shimmerBg)}>
                <Text style={styles.btnTxt}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => applyColorSections()}
                activeOpacity={0.8}
                style={styles.button(buttonColor)}>
                <Text style={styles.btnTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      {/* // # Color Picker */}
      <WheelColor
        openColorPick={openColorPick}
        selectedColor={colorCode => {
          saveColor(colorCode);
        }}
        closePicker={() => closePicker()}
        userColorCode={userColors?.[selSection?.section]}
      />
    </Container>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({
  content: {
    padding: '4%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.windowsBlue,
    width: '45%',
  },
  colorCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
  colorCircleCont: {width: '45%', alignItems: 'center'},
  colorCircle: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(30),
    borderWidth: 1.5,
  },
  valueContainer: {
    marginTop: '5%',
  },
  sectTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    width: '45%',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  button: buttonColor => ({
    width: horizontalScale(100),
    height: horizontalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    backgroundColor: buttonColor || COLORS.button,
  }),
  btnTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
});
