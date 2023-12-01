import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { COLORS, FONTS, SIZES, icons } from '../constants';

const SettingValue = ({ appTheme, icon, value, onPress, activeIconRight }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: appTheme?.backgroundColor1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: appTheme?.backgroundColor1,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </View>

      {/* Label & Value */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: appTheme?.textColor,
          }}
        >
          {value}
        </Text>
      </View>

      {/* Icon */}
      {activeIconRight && (
        <Image
          source={icons.right_circle}
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingValue);
