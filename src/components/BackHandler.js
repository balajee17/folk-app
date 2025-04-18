import {
  Alert,
  BackHandler,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, MyStyles, screenWidth, SIZES} from '../styles/MyStyles';
import {getImage} from '../utils/ImagePath';
import {toastThrottle} from './CommonFunctionalities';

let AndroidBackHandler = {
  // Control Back Handler i.e go back to pervious page
  setHandler(props) {
    console.log('Android Handler Props ', props);
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

export const CustomPopup = ({visible, onOkay, onCancel}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={getImage.alert}
            resizeMode="stretch"
            style={{width: 40, height: 40}}
          />
          <Text style={styles.modalText}>Do you want to exit App?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{...styles.button, backgroundColor: COLORS.errorPB}}
              onPress={onOkay}>
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.button,
                backgroundColor: COLORS.charcoal,
              }}
              onPress={onCancel}>
              <Text style={[styles.textStyle]}>No</Text>
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
    alignItems: 'center',
    width: screenWidth * 0.85,
    backgroundColor: COLORS.white,
    // ...MyStyles.boxShadow,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.black,
    marginTop: '3%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '5%',
  },
  button: {
    borderRadius: 6,
    width: 80,
    height: 35,
    marginTop: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistMedium,
    textAlign: 'center',
  },
});
