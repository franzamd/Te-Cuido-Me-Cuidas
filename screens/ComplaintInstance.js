import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { SIZES, FONTS, images } from '../constants';

const ComplaintScreenInstance = ({ appTheme, navigation }) => {
  return (
    <View style={{
      marginTop: SIZES.radius,
    }}>
      <View
        style={{
          alignItems: 'center',
          padding: SIZES.padding
        }}
      >
        <Image
          source={images.procosi_logo}
          resizeMode="contain"
          style={{
            height: 100,
            width: 100,
            borderRadius: SIZES.radius,
          }} />
        <Text
          style={{
            marginTop: SIZES.radius,
            color: appTheme.textColor,
            textAlign: 'center',
            ...FONTS.body3,
          }}
        >Para ver las denuncias debe acceder desde el Panel de Administración de la Aplicación Te Cuido Me Cuidas</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintScreenInstance)