import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  CFCallback,
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {COLORS} from '../styles/MyStyles';
import Swiper from 'react-native-deck-swiper';

const PAYMENT = () => {
  useEffect(() => {
    return () => CFPaymentGatewayService.removeCallback();
  }, []);

  const sets = [
    [
      'https://images4.alphacoders.com/124/1242710.jpg',
      'https://images.theconversation.com/files/210123/original/file-20180313-30983-1bk88tb.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcsC6nyYPFI1FtQzSR81ysz-a5CcDZuKLULkVbwVwtuQFRFwu2b3MptXRdU7dvuPl-qI&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
    [
      'https://m.media-amazon.com/images/I/81IScK02z0L._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81vwOo6rGLL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrDegDzXZf-TkHDKx4oCrgo1KSvEpDZ6sAIw6--cvgCwSnTdx2fGTxOPKAh29Wy4IIkk&usqp=CAU',
    ],
  ];

  const startPayment = () => {
    try {
      CFPaymentGatewayService.setCallback({
        onVerify(orderID) {
          console.log('ON_VERIFY', orderID);
        },
        onError(error, orderID) {
          console.log('ON_ERROR', error, 'OD_ID', orderID);
        },
      });

      const session = new CFSession(
        'session_DgVhvfqb4v_PWJsxhmmJEUJJ2vV4W_FuVFcPUzP1MGgYOJ0vbouciC1Y_k3dOXQzaj8ZfQcyQIIb64yn5ObRhOigHDJNMcZcCNSu-eehg_EqX-adrnPqAT_Gngpaymentpayment',
        'order_105263592uhdkQkEtYWfR1T5YJHfeG1Z8Pt',
        CFEnvironment.SANDBOX,
      );

      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.UPI)
        .build();

      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor(COLORS.header)
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor(COLORS.atlantis)
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();

      const dropdown = new CFDropCheckoutPayment(session, paymentModes, theme);

      CFPaymentGatewayService.doPayment(dropdown);
    } catch (e) {
      console.log('ERR1234', e.message);
    }
  };

  return (
    <View>
      <Text>PAYMENT</Text>

      <TouchableOpacity
        onPress={() => startPayment()}
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 30,
          alignSelf: 'center',
          marginTop: '30%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>cashFree</Text>
      </TouchableOpacity>
      <ScrollView>
        {Array(7)
          .fill(7)
          .map((_, index) => (
            <View style={{marginTop: index > 0 ? '60%' : 0}}>
              <Swiper
                cards={sets[index]}
                renderCard={card => {
                  return (
                    <View style={styles.card}>
                      <ImageBackground
                        source={{uri: card}}
                        style={styles.image}>
                        {/* Buttons: Like and Share */}
                        <View style={styles.buttonsContainer}>
                          <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Like</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Share</Text>
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                }}
                onSwiped={cardIndex => {
                  console.log(cardIndex);
                }}
                onSwipedAll={() => {
                  console.log('onSwipedAll');
                }}
                cardIndex={0}
                backgroundColor={'#0000'}
                animateCardOpacity
                disableBottomSwipe
                disableTopSwipe
                stackSeparation={-30}
                stackScale={6}
                horizontalSwipe
                infinite
                stackSize={3}></Swiper>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default PAYMENT;

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
