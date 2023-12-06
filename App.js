import React, { useEffect } from 'react';
import {
  View,
  LogBox,
  StatusBar,
  Appearance,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore, } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';

import rootReducer from './stores';
import {
  MainLayout,
  SignIn,
  SignUp,
  ComplaintHistory,
  ComplaintDetails,
  CreateComplaintAssisted,
  UpdateProfile
} from './screens';
import { COLORS, config } from './constants';


const { API_URL } = config
console.log('API connected:', API_URL);

const Stack = createNativeStackNavigator();

// Offline
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['complaint', 'department'], // Things you want to persist
  blacklist: ['theme', 'tab', 'userLogin', 'municipality', 'establishment', 'community', 'user'], // Things you don't want to persist
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const reduxStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

// Redux
// Internet connection
// const store = createStore(rootReducer, applyMiddleware(thunk));

// Ignore logs
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  // Offline
  const { store, persistor } = reduxStore();

  // Hide SplashScreen
  useEffect(() => {
    // persistor.flush()
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* Active for change url api server with localhost  */}
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <StatusBar
              barStyle={
                Appearance.getColorScheme() === 'dark'
                  ? 'light-content'
                  : 'dark-content'
              }
              backgroundColor={
                Appearance.getColorScheme() === 'dark'
                  ? COLORS.gray85
                  : COLORS.white
              }
            />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  useNativeDriver: true,
                  headerShown: false,
                }}
                initialRouteName={'Home'}
                detachInactiveScreens={false}>
                <Stack.Screen name="Home" component={MainLayout} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ComplaintHistory" component={ComplaintHistory} />
                <Stack.Screen name="ComplaintDetails" component={ComplaintDetails} />
                <Stack.Screen name="CreateComplaintAssisted" component={CreateComplaintAssisted} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
