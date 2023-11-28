import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { logout } from '../stores/authActions';
import { IconButton, TextButton, SettingValue } from '../components';
import { SIZES, FONTS, icons, COLORS, images, constants } from '../constants';

const Settings = ({ appTheme, logout, userLogin, navigation }) => {
  const { userInfo } = userLogin

  function handleLogout() {
    Alert.alert(
      constants.alertMsg.title,
      '¿Estás seguro de que deseas cerrar la sesión en este dispositivo? Recuerda que siempre puedes volver a acceder a tus datos en cualquier momento.',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  }

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

  // Render
  function renderProfileCard() {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            paddingVertical: 20,
            borderRadius: SIZES.radius,
            backgroundColor: appTheme?.backgroundColor5,
          },
          styles.profileSectionContainer,
        ]}
      >
        {/* Profile Image */}
        <View
          style={{
            width: 60,
            height: 60,
          }}
        >
          <Image
            source={images.logo_ayuda_en_accion}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 40,
              borderWidth: 2,
              borderColor: COLORS.additionalColor4,
            }}
          />
        </View>

        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              color: COLORS.primary2,
              ...FONTS.h2,
            }}
          >
            {userInfo?.profile?.name || 'Usuario'}
          </Text>
          <Text
            style={{
              color: COLORS.gray90,
              ...FONTS.body4,
            }}
          >
            {userInfo?.role ? userInfo?.role.charAt(0).toUpperCase() + userInfo?.role.slice(1) : 'Usuario'}
          </Text>
        </View>
      </View>
    );
  }

  function renderMenuUpdateProfile() {
    return (
      <View
        style={[
          styles.profileSectionContainer,
          {
            backgroundColor: appTheme?.backgroundColor1,
          },
        ]}
      >
        <SettingValue
          icon={icons.edit_profile}
          value="Actualizar Perfil"
          onPress={() => navigation.navigate('UpdateProfile')}
        />
      </View>
    );
  }

  function renderMenuLogout() {
    return (
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
        onPress={handleLogout}
      />
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1,
      }}
    >
      {/* Header */}
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
      >
        {/* Settings Card */}
        {renderProfileCard()}

        {/* Menu Update Profile */}
        {renderMenuUpdateProfile()}

        {/* Logout */}
        {renderMenuLogout()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 2,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);