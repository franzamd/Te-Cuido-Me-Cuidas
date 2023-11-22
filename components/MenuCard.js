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
            width: 20,
            height: 20,
            marginRight: SIZES.base,
            tintColor: COLORS.gray10,
          }}
        />
      </View>

      {/* Description */}
      {/* <Text
        style={{
          color: COLORS.white,
          ...FONTS.body4,
        }}
      >
        {infoItem.description}
      </Text> */}
    </View>
  );
};

const CardInfo = ({ infoItem }) => {
  return (
    <View
      style={{
        ...styles.recipeCardContainer,
        backgroundColor: COLORS.transparentDarkGray,
      }}
    >
      <CardDetails infoItem={infoItem} />
    </View>
  );
};

const MenuCard = ({ containerStyle, infoItem, onPress }) => {
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
        style={{
          height: 120,
          width: SIZES.width * 0.9,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          ...containerStyle,
        }}
        onPress={onPress}
      >
        {/* Background Image */}
        <Image
          source={infoItem.image}
          resizeMode="cover"
          style={{
            width: SIZES.width * 0.9,
            height: 120,
            borderRadius: SIZES.radius,
          }}
        />

        {/* Card Info */}
        <CardInfo infoItem={infoItem} />
      </TouchableOpacity>
    </View>
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
