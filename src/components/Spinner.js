import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Spinner = ({spinnerVisible}) => {
  return (
    <Modal visible={spinnerVisible} transparent statusBarTranslucent>
      <View style={styles.indicator}>
        <ActivityIndicator animating size="large" />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
});
