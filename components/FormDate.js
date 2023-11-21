import React from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';

import { FONTS, SIZES, COLORS } from '../constants';

const FormDate = ({
  containerStyle,
  label,
  labelStyle,
  errorMsg = '',
  onChange,
  value,
  open,
  onCancel,
  appendComponent,
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

      {/* Input */}
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: appTheme?.inputText,
            }}>
            {moment(value).format('DD/MM/YYYY')}
          </Text>
        </View>
        <DatePicker
          mode="date"
          modal
          textColor={appTheme?.textColor}
          open={open}
          date={value}
          onConfirm={date => onChange(date)}
          onCancel={() => onCancel()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormDate);
