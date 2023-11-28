import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

// actions
import { login, USER_CLEAR_ERRORS } from '../stores/authActions';

// components
import { IconButton } from '../components';
import { COLORS, FONTS, icons, SIZES, images } from '../constants';
import { utils } from '../utils';
import { FormInput, TextButton } from '../components';

const SignIn = ({
  navigation,
  userLogin,
  login,
  appTheme
}) => {
  const dispatch = useDispatch();

  // store
  const { userInfo, loading, errors } = userLogin

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);

  function isEnableSignIn() {
    return email != '' && password != '' && emailError == '';
  }

  // Granted access user
  useEffect(() => {
    if (userInfo && !loading) {
      navigation.popToTop();
    }
  }, [userInfo, loading])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_CLEAR_ERRORS })
    }
  }, [])

  async function onSubmit() {
    await login({ email, password });
  }

  // Render
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <IconButton
            icon={icons.back}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
            containerStyle={{
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
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
        }}
      >
        {/* App Icon */}
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={images.procosi_logo}
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Title & Subtitle */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: appTheme?.textColor,
              marginTop: SIZES.base,
              ...FONTS.body4,
            }}
          >
            Ingrese sus credenciales para acceder a la aplicación
          </Text>
        </View>

        {/* Input */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          errorMsg={emailError}
        />
        <FormInput
          label="Contraseña"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          labelStyle={{
            color: appTheme?.textColor,
          }}
          onChange={value => setPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray50,
                }}
              />
            </TouchableOpacity>
          }
        />
        {/* Error Message */}
        {Boolean(errors) && (
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

        {/* Sing In */}
        <TextButton
          label="Iniciar Sesión"
          disabled={loading || (isEnableSignIn() ? false : true)}
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary2
              : COLORS.transparentPrimary,
          }}
          onPress={() => onSubmit()}
        />

        <TextButton
          label="Registrarse"
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              appTheme.name === 'dark' ? COLORS.secondary : COLORS.secondary4,
          }}
          labelStyle={{
            color: appTheme.name === 'dark' ? COLORS.black : COLORS.white,
          }}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (formData) => dispatch(login(formData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);