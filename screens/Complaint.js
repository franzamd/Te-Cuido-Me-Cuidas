import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { USER_ROLE_DEFAULT, USER_ROLE_INSTANCE, USER_ROLE_INTERMEDIARY, USER_ROLE_ADMIN } from '@env';

import { IconButton, MenuCard } from '../components';
import { SIZES, FONTS, icons, constants } from '../constants';
import { ComplaintUser, ComplaintInstance } from '../screens';

const Complaint = ({
  appTheme,
  userLogin,
  navigation,
  isFocusedComponent
}) => {
  const { userInfo } = userLogin

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
          Denuncias
        </Text>

        {(userInfo?.role === USER_ROLE_DEFAULT || userInfo?.role === USER_ROLE_INTERMEDIARY) && (
          <IconButton
            icon={icons.help}
            iconStyle={{
              width: 30,
              height: 30,
              tintColor: appTheme?.tintColor,
            }}
            onPress={() => navigation.navigate('HelpComplaint')}
          />
        )}
      </View>
    );
  }

  function renderInterMenuSection() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
        }}
      >
        <FlatList
          data={constants.cardMenus}
          keyExtractor={(item) => `${item.id}`}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <MenuCard
                infoItem={item}
                onPress={() => navigation.navigate(item.screen)}
              />
            );
          }}
          ListFooterComponent={
            <View
              style={{
                height: 100,
              }}
            ></View>
          }
        />
      </View>
    );
  }

  function renderInstanceScreen() {
    return (
      <ComplaintInstance navigation={navigation} />
    )
  }

  function renderUserScreen() {
    return (
      <ComplaintUser navigation={navigation} isFocusedComponent={isFocusedComponent} />
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

      {/* Menu Section */}
      {/* User role instance and admin */}
      {(userInfo.role === USER_ROLE_INSTANCE || userInfo.role === USER_ROLE_ADMIN) && renderInstanceScreen()}

      {/* User role Intermediary */}
      {userInfo.role === USER_ROLE_INTERMEDIARY && renderInterMenuSection()}

      {/* User default */}
      {userInfo.role === USER_ROLE_DEFAULT && renderUserScreen()}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Complaint)