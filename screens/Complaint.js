import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { IconButton, MenuCard } from '../components';
import { SIZES, FONTS, icons, constants } from '../constants';

const Complaint = ({ appTheme, navigation }) => {
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

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <IconButton
            icon={icons.help}
            iconStyle={{
              width: 35,
              height: 35,
              tintColor: appTheme?.tintColor,
            }}
            onPress={() => navigation.navigate('HelpComplaint')}
          />
        </View>
      </View>
    );
  }

  function renderMenuSection() {
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
                onPress={() => navigation.navigate('CreateComplaint')}
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor8,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Menu Section */}
      {renderMenuSection()}
    </SafeAreaView>
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


export default connect(mapStateToProps, mapDispatchToProps)(Complaint)