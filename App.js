import React, { useState, useEffect } from 'react';
import {
  View,
  LogBox,
  StatusBar,
  Appearance,
} from 'react-native';
// import {API_URL} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { persistReducer, persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
// import SplashScreen from 'react-native-splash-screen';

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
import { COLORS } from './constants';
import { Loading } from './components';

// console.log('API_URL', API_URL);

const Stack = createNativeStackNavigator();

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['theme'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Offline
// export const reduxStore = () => {
//   let store = createStore(persistedReducer, applyMiddleware(thunk));
//   let persistor = persistStore(store);
//   return { store, persistor };
// };

// Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

// Ignore logs
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [loading, setLoading] = useState(true);
  // const { store, persistor } = reduxStore();

  useEffect(() => {
    // Hide SplashScreen
    // SplashScreen.hide();
    setLoading(false);
  }, []);

  // Splashscreen loading
  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
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
        {/* </PersistGate> */}
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
