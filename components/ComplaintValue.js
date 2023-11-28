import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { COLORS, FONTS, SIZES, icons } from '../constants';

const ComplaintValue = ({
  appTheme,
  label,
  value,
  onPress = null,
  enableOnPress = false,
  icon,
  textStyle
}) => {
  return (
    <TouchableOpacity
      disabled={!enableOnPress}
      style={{
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {/* Label & Value */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        <Text
          style={{
            color: COLORS.gray30,
            ...FONTS.body4,
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: appTheme?.textColor,
            ...FONTS.body4,
            ...textStyle
          }}>
          {value}
        </Text>
      </View>

      {/* Icon */}
      {enableOnPress && (
        <Image
          source={icon}
          style={{
            width: 25,
            height: 25,
            tintColor: appTheme?.tintColor,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintValue);
