import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { View, Text, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

// actions
import { logout, loadUser } from '../stores/authActions';
import { setSelectedTab } from '../stores/tabActions';
import { COMPLAINT_CLEAR_ERROR } from '../stores/complaintActions';

// components
import { Onboarding, IndexComplaint, Settings, Emergency } from './';
import { Loading } from '../components';
import { COLORS, SIZES, icons, constants, FONTS } from '../constants';

const TabButton = ({
  label,
  icon,
  isFocused,
  outerContainerStyle,
  innerContainerStyle,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          outerContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: '80%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}
        >
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.gray80,
            }}
          />

          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({
  appTheme,
  userLogin,
  loadUser,
  setSelectedTab,
  tab,
  navigation
}) => {
  const dispatch = useDispatch();

  // store
  const { userInfo, loading } = userLogin
  const { selectedTab } = tab

  const flatListRef = React.useRef();
  // Reanimated Shared Value
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const helpTabFlex = useSharedValue(2);
  const helpTabColor = useSharedValue(COLORS.white);
  const settingsTabFlex = useSharedValue(3);
  const settingsTabColor = useSharedValue(COLORS.white);
  // complaints
  const [isDisabledButtonsPress, setIsDisabledButtonsPress] = useState(false)

  // Reanimated Animated Style
  const homeFlexStyle = useAnimatedStyle(() => {
    return { flex: homeTabFlex.value };
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const emergencyFlexStyle = useAnimatedStyle(() => {
    return { flex: helpTabFlex.value };
  });
  const emergencyColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: helpTabColor.value,
    };
  });

  const settingsFlexStyle = useAnimatedStyle(() => {
    return { flex: settingsTabFlex.value };
  });
  const settingsColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: settingsTabColor.value,
    };
  });

  // Load user from server or local storage
  useEffect(() => {
    (async () => {
      await loadUser()
      // Clear errors data store for redux store
      dispatch({ type: COMPLAINT_CLEAR_ERROR })
    })()
  }, [])

  // Tabs
  useEffect(() => {
    if (selectedTab === constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });

      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary2, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.emergency) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });

      helpTabFlex.value = withTiming(4, { duration: 500 });
      helpTabColor.value = withTiming(COLORS.primary2, { duration: 500 });
    } else {
      helpTabFlex.value = withTiming(1, { duration: 500 });
      helpTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab === constants.screens.settings) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });

      settingsTabFlex.value = withTiming(4, { duration: 500 });
      settingsTabColor.value = withTiming(COLORS.primary2, { duration: 500 });
    } else {
      settingsTabFlex.value = withTiming(1, { duration: 500 });
      settingsTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab]);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : userInfo ? (
        // Access screens app main layout
        <View
          style={{
            flex: 1,
            backgroundColor: appTheme?.backgroundColor1,
          }}
        >
          {/* Content */}
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              ref={flatListRef}
              horizontal
              scrollEnabled={false}
              pagingEnabled
              snapToAlignment="center"
              snapToInterval={SIZES.width}
              showsHorizontalScrollIndicator={false}
              data={constants.bottom_tabs}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      height: SIZES.height,
                      width: SIZES.width,
                    }}
                  >
                    {item.label === constants.screens.home && (
                      <IndexComplaint
                        navigation={navigation}
                        isFocusedComponent={selectedTab === constants.screens.home}
                        isDisabledButtonsPress={isDisabledButtonsPress}
                        setIsDisabledButtonsPress={setIsDisabledButtonsPress}
                      />
                    )}
                    {(item.label === constants.screens.emergency && userInfo.role === 'usuario') && (
                      <Emergency
                        navigation={navigation}
                        isFocusedComponent={selectedTab === constants.screens.emergency}
                        isDisabledButtonsPress={isDisabledButtonsPress}
                        setIsDisabledButtonsPress={setIsDisabledButtonsPress}
                      />
                    )}
                    {item.label === constants.screens.settings && (
                      <Settings
                        navigation={navigation}
                      />
                    )}
                  </View>
                );
              }}
            />
          </View>

          {/* Footer */}
          <View
            style={{
              height: 50,
              justifyContent: 'center',
            }}
          >
            {/* Shadow */}
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 4 }}
              colors={[COLORS.transparent, COLORS.lightGray1]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            />

            {/* Tabs */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: SIZES.radius,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 50,
                backgroundColor: appTheme?.backgroundColor5,
              }}
            >
              <TabButton
                label={constants.screens.home}
                icon={icons.home_principal}
                isFocused={selectedTab === constants.screens.home}
                outerContainerStyle={homeFlexStyle}
                innerContainerStyle={homeColorStyle}
                onPress={() => setSelectedTab(constants.screens.home)}
              />
              {userInfo.role === 'usuario' && (
                <TabButton
                  label={constants.screens.emergency}
                  icon={icons.emergency}
                  isFocused={selectedTab === constants.screens.emergency}
                  outerContainerStyle={emergencyFlexStyle}
                  innerContainerStyle={emergencyColorStyle}
                  onPress={() => setSelectedTab(constants.screens.emergency)}
                />
              )}
              <TabButton
                label={constants.screens.settings}
                icon={icons.settings}
                outerContainerStyle={settingsFlexStyle}
                innerContainerStyle={settingsColorStyle}
                isFocused={selectedTab === constants.screens.settings}
                onPress={() => setSelectedTab(constants.screens.settings)}
              />
            </View>
          </View>
        </View>
      ) : (
        <Onboarding />
      )}
    </React.Fragment >
  )
}

function mapStateToProps(state) {
  return {
    appTheme: state.theme.appTheme,
    userLogin: state.userLogin,
    tab: state.tab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    loadUser: () => dispatch(loadUser()),
    setSelectedTab: (tab) => dispatch(setSelectedTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
