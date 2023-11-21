import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';

import {
  COLORS
} from "../constants"

const IconButton = ({
  containerStyle,
  disabled,
  icon,
  iconStyle,
  onPress
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...containerStyle
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.white,
          ...iconStyle
        }}
      />
    </TouchableOpacity>
  )
}

export default IconButton