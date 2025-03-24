import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ColorPicker from 'react-native-wheel-color-picker';

const WheelColor = () => {
  const [currentColor, setCurrentColor] = useState('#fff');
  console.log('currentColor', currentColor);
  return (
    <View style={{backgroundColor: 'pink', width: '85%', alignSelf: 'center'}}>
      <ColorPicker
        color={currentColor}
        onColorChange={color => setCurrentColor(color)}
        thumbSize={50}
        sliderSize={30}
        noSnap={true}
        row={false}
        swatchesLast={true} // Moves swatches to the end
        swatches={true} // Enables color swatches
        discrete={false}
        wheelLodingIndicator={<ActivityIndicator size={40} color="blue" />}
        sliderLodingIndicator={<ActivityIndicator size={20} color="green" />}
      />

      <View
        style={{
          marginTop: '90%',
          width: 100,
          height: 50,
          alignSelf: 'center',
          borderRadius: 30,
          backgroundColor: currentColor,
          borderWidth: 2,
        }}></View>
    </View>
  );
};

export default WheelColor;

const styles = StyleSheet.create({});
