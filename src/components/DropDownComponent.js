import {useState} from 'react';
import {Text, View} from 'react-native';
import {COLORS} from '../styles/MyStyles';

const DropDownComponent = ({
  placeholder,
  data,
  value,
  onChangeHandler,
  viewStyle,
  inputStyle,
  dropDownStyle,
  disable,
  labelStyle,
  maxHeight,
  placeholderStyle,
  selectedTextStyle,
  rightIconStyle,
  screen,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const renderLabel = () => {
    return (
      <Text
        style={[
          styles.focusedDrpDwnInptLbl,
          {fontFamily: fontMedium},
          labelStyle,
          (value || isFocused) && {opacity: 1},
          (value || isFocused) &&
            screen === ScreenNames.empPosition && {
              color: isFocused ? color.statusbar : color.suvaGrey,
              backgroundColor: 'white',
            },
        ]}>
        {placeholder}
      </Text>
    );
  };

  return (
    <View
      style={[
        {
          position: 'relative',
          borderRadius: 14,
          backgroundColor: COLORS.white,
        },

        viewStyle,
      ]}>
      {renderLabel()}
      <Dropdown
        statusBarIsTranslucent
        disable={disable}
        style={[
          {
            height: 52,
            marginStart: '4.5%',
          },
          inputStyle,
        ]}
        placeholderStyle={[
          value ? MyStyles.textFontSize14 : MyStyles.textFontSize16,
          {color: disable ? '#ccc' : color.black, fontFamily: fontMedium},
          placeholderStyle,
        ]}
        data={data}
        value={value}
        autoScroll={false}
        selectedTextStyle={[{color: color.black}, selectedTextStyle]}
        containerStyle={[
          screen !== ScreenNames.empPosition && styles.dropDownContainer,
          dropDownStyle,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        search={false}
        maxHeight={maxHeight ? maxHeight : 200}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? placeholder : '...'}
        onChange={onChangeHandler}
        showsVerticalScrollIndicator={false}
        renderItem={(item, isSelected) => (
          <Text
            style={[
              {
                padding: screen === ScreenNames.empPosition ? '3%' : '5%',
                fontSize: 14,
                color: color.black,
                borderRadius: 14,
              },
              {backgroundColor: isSelected ? '#ccc' + 3 : '#fff'},
              screen === ScreenNames.empPosition && {
                fontFamily: fontMedium,
              },
            ]}>
            {item.label}
            {/* {console.log('isSelected', isSelected, 'item.', item)} */}
          </Text>
        )}
        renderRightIcon={() => (
          <View style={rightIconStyle ? rightIconStyle : {}}>
            <MaterialCommunityIcons
              name={
                screen === ScreenNames.empPosition
                  ? 'chevron-down'
                  : 'menu-down'
              }
              size={24}
              style={{marginEnd: '3%'}}
              color={disable ? '#ccc' : '#000' + 8}
            />
          </View>
        )}
      />
    </View>
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({
  dropDownInput: {
    marginVertical: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    elevation: 15,
    backgroundColor: '#fff',
    padding: '2%',
    borderRadius: 14,
  },

  dropDownContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    elevation: 8,
    padding: 8,
    borderRadius: 14,
    marginTop: -10,
    marginTop: '1%',
  },

  focusedDrpDwnInptLbl: {
    opacity: 0,
    position: 'absolute',
    left: '4.5%',
    bottom: '78%',
    zIndex: 999,
    // paddingHorizontal: '1%',
    fontSize: 12,
    color: color.suvaGrey,
    fontFamily: fontMedium,
  },
});
