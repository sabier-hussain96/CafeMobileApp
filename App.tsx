import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
// Components
import SplashScreen from 'react-native-splash-screen';
import MyStatusBar from './src/components/MyStatusbar';
import StackNavigation from './src/navigation/StackNavigation';
import {store, persistor} from './store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  useEffect(() => {
    SplashScreen.hide();
    // logAsyncStorageData();
  }, []);

  // const logAsyncStorageData = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const items = await AsyncStorage.multiGet(keys);

  //     console.log('AsyncStorage Data:');
  //     items.forEach(([key, value]) => {
  //       console.log(`${key}: ${value}`);
  //     });
  //   } catch (error) {
  //     console.error('Error reading AsyncStorage:', error);
  //   }
  // };

  return (
    <Provider store={store}>
      <MyStatusBar />
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigation />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
