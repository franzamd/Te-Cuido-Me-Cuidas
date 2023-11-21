import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// actions
import { logout, loadUser } from '../stores/authActions';

// components
import { Onboarding } from './';
import { Loading, TextButton } from '../components';
import { COLORS, SIZES } from '../constants';

const MainLayout = ({
  appTheme,
  userLogin,
  logout,
  loadUser
}) => {
  // store
  const { userInfo, loading, errors } = userLogin

  // Load user from server or local storage
  useEffect(() => {
    (async () => {
      await loadUser()
    })()
  }, [])

  console.log(userInfo, loading, errors);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : userInfo ? (
        // Access screens app main layout
        <View
          style={{ flex: 1 }}
        >
          <Text>Access user logged</Text>

          {/* Errors TODO: Delete ! */}
          {Boolean(!errors) && (
            <React.Fragment>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    color: COLORS.error,
                  }}>
                  {errors?.error}
                </Text>
              </View>
              <View style={{
                paddingHorizontal: SIZES.padding
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
            </React.Fragment>
          )}
        </View>
      ) : (
        <Onboarding />
      )}
    </React.Fragment>
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
    logout: () => dispatch(logout()),
    loadUser: () => dispatch(loadUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
