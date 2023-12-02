import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { SIZES, COLORS, FONTS, icons } from '../constants';

const CardDetails = ({ infoItem }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Name */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}
        >
          {infoItem.name}
        </Text>
        <Image
          source={icons.right_circle}
          style={{
            width: 30,
            height: 30,
            marginRight: SIZES.base,
            tintColor: COLORS.gray10,
          }}
        />
      </View>
    </View>
  );
};

const CardInfo = ({ infoItem }) => {
  return (
    <View
      style={{
        ...styles.recipeCardContainer,
        backgroundColor: COLORS.transparentDark,
      }}
    >
      <CardDetails infoItem={infoItem} />
    </View>
  );
};

const MenuCard = ({ disabled, infoItem, onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: SIZES.width,
        paddingHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        style={{
          height: 120,
          width: SIZES.width * 0.88,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.gray20,
          backgroundColor: disabled ? COLORS.transparentDark : null,
        }}
        onPress={onPress}
      >
        {/* Background Image */}
        <Image
          source={infoItem.image}
          resizeMode="cover"
          style={{
            width: 'auto',
            height: '100%',
            borderRadius: SIZES.radius,
            opacity: disabled ? 0.3 : 1
          }}
        />

        {/* Optional Card Opacity */}
        <View
          style={{
            overflow: 'hidden',
            position: 'absolute',
            height: "100%",
            width: '100%',
            backgroundColor: COLORS.transparentSecondaryLight,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.base,
            borderRadius: SIZES.radius,
          }}
        />

        {/* Card Info */}
        <CardInfo infoItem={infoItem} />
      </TouchableOpacity >
    </View >
  );
};

const styles = StyleSheet.create({
  recipeCardContainer: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 50,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});

export default MenuCard;
