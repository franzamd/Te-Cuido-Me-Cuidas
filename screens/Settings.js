import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { logout } from '../stores/authActions';
import { IconButton, TextButton } from '../components';
import { SIZES, FONTS, icons, COLORS } from '../constants';

const Emergency = ({ appTheme, logout, navigation }) => {
  // Render
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}
      >
        {/* Title */}
        <Text
          style={{
            ...FONTS.h1,
            color: appTheme?.textColor,
          }}
        >
          Ajustes
        </Text>

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <IconButton
            icon={icons.sun}
            iconStyle={{
              tintColor: appTheme?.tintColor,
            }}
          // onPress={() => toggleThemeHandler()}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor8,
      }}
    >
      {/* Header */}
      {renderHeader()}

      <View style={{
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.padding * 2
      }}>
        <TextButton
          label="Cerrar Sesión"
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              appTheme.name === 'dark' ? COLORS.primary2 : COLORS.primary2,
          }}
          labelStyle={{
            color: appTheme.name === 'dark' ? COLORS.black : COLORS.white,
          }}
          onPress={async () => await logout()}
        />
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Emergency);