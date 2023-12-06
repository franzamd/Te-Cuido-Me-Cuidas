import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { SIZES, COLORS, FONTS } from '../constants';

const ButtonCard = ({
  disabled,
  infoItem,
  appTheme,
  onPress
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: SIZES.width,
        paddingHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        style={{
          width: SIZES.width * 0.88,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.gray20,
          backgroundColor: disabled ? COLORS.transparentDark : null
        }}
        onPress={onPress}
      >
        {/* Background Image */}
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          {/* Title */}
          <View
            style={{
              width: '50%',
              height: 100
            }}
          >
            <View
              style={{
                flex: 1,
                left: SIZES.padding,
                alignItems: 'flex-start',
                marginVertical: SIZES.radius,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                }}
              >
                {infoItem.title}
              </Text>
            </View>
          </View>
          {/* Image */}
          <View
            style={{
              width: '50%',
            }}
          >
            <ImageBackground
              source={infoItem.image}
              resizeMode="center"
              style={{
                width: "auto",
                height: "100%",
                borderRadius: SIZES.radius
              }}
              borderRadius={5}
              imageStyle={{ opacity: disabled ? 0.3 : 1 }}
            />
          </View>
        </View>

      </TouchableOpacity >
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCard);
