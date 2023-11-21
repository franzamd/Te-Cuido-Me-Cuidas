import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { FONTS, SIZES, COLORS } from '../constants';

const FormInput = ({
  value,
  containerStyle,
  label,
  labelStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  editable = true,
  appTheme,
}) => {
  return (
    <View
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
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray10,
          borderWidth: 1,
          borderColor: Boolean(errorMsg) ? COLORS.error : COLORS.gray10
        }}>
        {prependComponent}

        <TextInput
          editable={editable}
          style={{
            flex: 1,
            color: appTheme?.inputText,
            ...inputStyle,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray10}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChange(text)}
        />

        {appendComponent}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
