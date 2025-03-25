/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Router from './src/navigation/Router';
import FlashMessage from 'react-native-flash-message';


import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './configureStore';
import LogoutModal from './src/components/common/LogoutModal'


type SectionProps = PropsWithChildren<{
  title: string;
}>;




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        {/* <LogoutModal/> */}
        <FlashMessage
         animationDuration={500}
          duration={3500}
          floating={true}
          position="top"
          icon="auto"
          style={{ marginTop: '10%'}}
        />
      </PersistGate>
    </Provider>
  );
}


export default App;
