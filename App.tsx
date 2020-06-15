import React from 'react';
import { Provider } from "./Store";
import DrawerMenu from './components/DrawerMenu';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

//Main entry point for the app runtime.

const changeBar = () =>{StatusBar.setBackgroundColor('dodgerblue')}

export default function App() {

  changeBar()
  { /*The provider allows for props to be automatically passed down the component tree*/ }
  return (
    <Provider>
      <NavigationContainer>
        <DrawerMenu />
      </NavigationContainer>
    </Provider>
  );
}
