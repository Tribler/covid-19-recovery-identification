import React, { useEffect } from 'react';
import { Provider } from "./Store";
import DrawerMenu from './components/DrawerMenu';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, AsyncStorage } from 'react-native';
import { useToggleDark, useToggleLight } from './hooks/useToggleDarkMode';

//Main entry point for the app runtime.

export default function App() {

{ /*The provider allows for props to be automatically passed down the component tree*/ }
return (
  <Provider>
    <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer>
  </Provider>
);
}
