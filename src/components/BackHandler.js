import {
  BackHandler,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  screenWidth,
  SIZES,
} from '../styles/MyStyles';

let AndroidBackHandler = {
  // Control Back Handler i.e go back to pervious page
  setHandler(props) {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        props.navigation.goBack();
        return true;
      });
    }
  },

  // Stop Listening to Android Hardware
  removerHandler() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return true;
      });
    }
  },

  // Screen can't go back to previous page i.e in Splash Screen
  noGoingBack() {
    if (Platform.OS === 'android') {
      return true;
    }
  },
};

export default AndroidBackHandler;

export const CustomPopup = ({visible, onOkay, onCancel, content}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.cntTitle}>{content?.title}</Text>
          <Text style={styles.modalText}>{content?.text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.button, {backgroundColor: COLORS.logoutColor}]}
              onPress={() => onOkay()}>
              <Text style={styles.textStyle}>{content?.buttonName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => onCancel()}>
              <Text style={[styles.textStyle, {color: COLORS.gunsmoke}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    borderRadius: 15,
    padding: '5%',
    width: screenWidth * 0.85,
    backgroundColor: COLORS.white,
    // ...MyStyles.boxShadow,
  },
  modalText: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.xl,
    color: COLORS.black,
    marginTop: '6%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: moderateScale(12),
    width: horizontalScale(110),
    height: horizontalScale(40),
    marginTop: '10%',
    backgroundColor: COLORS.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.gunsmoke,
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistMedium,
    textAlign: 'center',
  },
  cntTitle: {
    color: COLORS.black,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
  },
});
