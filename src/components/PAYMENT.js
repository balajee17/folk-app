import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {COLORS} from '../styles/MyStyles';

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
        .setButtonBackgroundColor(COLORS.button)
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
    </View>
  );
};

export default PAYMENT;

const styles = StyleSheet.create({});
