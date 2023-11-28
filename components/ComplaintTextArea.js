import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { COLORS, FONTS, SIZES, icons } from '../constants';

const ComplaintValue = ({
  appTheme,
  label,
  value = '',
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height:
          // Screens more height
          SIZES.height > 600
            ? value.length < 30
              ? 70
              : value.length < 50
                ? 80
                : value.length < 100
                  ? 90
                  : value.length < 150
                    ? 120
                    : 130
            : // Screens small height
            value.length < 30
              ? 60
              : value.length < 50
                ? 70
                : value.length < 100
                  ? 80
                  : value.length < 150
                    ? 90
                    : 100,
        alignItems: 'center',
      }}
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
          }}>
          {value}
        </Text>
      </View>
    </View>
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
