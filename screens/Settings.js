import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { TERMS_AND_CONDITIONS } from '@env'

import { toggleTheme } from '../stores/themeActions';
import { logout, deleteAccount } from '../stores/authActions';
import { IconButton, TextButton, SettingValue } from '../components';
import { SIZES, FONTS, icons, COLORS, images, constants } from '../constants';

const Settings = ({
  appTheme,
  toggleTheme,
  logout,
  userLogin,
  navigation,
  deleteAccount
}) => {
  const { userInfo, errors } = userLogin

  // Handler
  function toggleThemeHandler() {
    if (appTheme?.name == 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  }

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

  function handleDeleteAccount() {
    Alert.alert(
      constants.alertMsg.title,
      'Al confirmar esta acción, su cuenta y todos los datos e información asociados serán eliminados de manera permanente de nuestra base de datos. ¿Está seguro de que desea proceder con la eliminación de su cuenta?',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Eliminar Cuenta',
          onPress: () => {
            deleteAccount()
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

        {/* Toggle Theme */}
        {/* <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: appTheme?.tintColor,
          }}
          onPress={() => toggleThemeHandler()}
        /> */}

        {/* Logo */}
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              width: 170,
              alignSelf: 'flex-end',
              position: 'absolute',
            }}
          >
            <Image
              source={images.logo_aec_procosi}
              resizeMode="contain"
              style={{
                height: 40,
                width: '100%',
                borderRadius: SIZES.padding,
              }}
            />
          </View>
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
              color: appTheme?.textColor3,
              ...FONTS.body4,
            }}
          >
            {userInfo?.role ? userInfo?.role.charAt(0).toUpperCase() + userInfo?.role.slice(1) : 'Usuario'}
          </Text>
          {userInfo?.profile?.municipality && userInfo.profile?.department && (
            <Text
              style={{
                color: appTheme?.textColor3,
                ...FONTS.body5,
              }}
            >
              {`${userInfo.profile.municipality.name}, ${userInfo.profile.department.name}`}
            </Text>
          )}
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

  function renderMenuTermsAndConditions() {
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
          icon={icons.terms_and_conditions}
          value="Términos y Condiciones"
          onPress={async () => {
            const supported = await Linking.canOpenURL(TERMS_AND_CONDITIONS)
            if (supported) {
              Linking.openURL(TERMS_AND_CONDITIONS)
            }
          }}
        />
      </View>
    );
  }

  function renderMenuDeleteUser() {
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
          icon={icons.close}
          value="Eliminar Cuenta"
          onPress={handleDeleteAccount}
        />
      </View>
    );
  }

  function renderMenuLogout() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <TextButton
          label="Cerrar Sesión"
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              appTheme?.name === 'dark' ? COLORS.primary2 : COLORS.primary2,
          }}
          labelStyle={{
            color: COLORS.white
          }}
          onPress={handleLogout}
        />
      </View>
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

        {/* Menu Update Profile */}
        {renderMenuTermsAndConditions()}

        {/* Menu Delete User */}
        {renderMenuDeleteUser()}

        {/* Logout */}
        {renderMenuLogout()}

        {/* Error Message */}
        {Boolean(errors?.error) && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'center'
            }}>
            <Text
              style={{
                color: COLORS.error,
                ...FONTS.body4
              }}>
              {errors?.error}
            </Text>
          </View>
        )}
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
    toggleTheme: themeType => dispatch(toggleTheme(themeType)),
    logout: () => dispatch(logout()),
    deleteAccount: () => dispatch(deleteAccount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);