import React from 'react';
import { View, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { FONTS, SIZES, COLORS } from '../constants';

const FormSelect = ({
  containerStyle,
  label,
  labelStyle,
  errorMsg = '',
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  onSelectItem,
  zIndex,
  zIndexInverse,
  disabled = false,
  onChangeValue = () => null,
}) => {
  const viewRef = React.useRef(null);

  // Config zIndex for ios devices
  if (Platform.OS === 'ios' && viewRef?.current) {
    viewRef.current.setNativeProps({
      zIndex,
    });
  }

  return (
    <View
      ref={viewRef}
      style={{
        ...containerStyle,
      }}>
      {/* Label & Error msg */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            ...labelStyle,
          }}>
          {label}
        </Text>
        <Text
          style={{
            color: COLORS.error,
            ...FONTS.body5,
          }}>
          {errorMsg}
        </Text>
      </View>

      {/* Text input */}
      <DropDownPicker
        disabled={disabled}
        zIndex={zIndex} // Android
        dropDownDirection="BOTTOM"
        zIndexInverse={zIndexInverse}
        onSelectItem={onSelectItem}
        listMode="SCROLLVIEW"
        style={{
          marginTop: SIZES.base,
          backgroundColor: disabled ? COLORS.gray30 : COLORS.gray10,
          borderRadius: SIZES.radius,
          borderColor: COLORS.gray10,
          borderWidth: 1,
          borderColor: Boolean(errorMsg) ? COLORS.error : COLORS.gray10
        }}
        dropDownContainerStyle={{
          borderColor: '#dfdfdf',
        }}
        maxHeight={150}
        placeholder="Seleccionar"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={value => onChangeValue(value)}
      />
    </View>
  );
};

export default FormSelect;
