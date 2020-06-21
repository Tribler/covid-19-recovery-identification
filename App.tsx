import React from 'react';
import {Provider} from './Store';
import DrawerMenu from './components/DrawerMenu';
import {NavigationContainer} from '@react-navigation/native';

/**
 * Entry point for the app
 * @return {Provider} the app
 */
export default function App() {
  {
    /* The provider allows for props to be automatically passed down the component tree*/
  }
  return (
    <Provider>
      <NavigationContainer>
        <DrawerMenu />
      </NavigationContainer>
    </Provider>
  );
}
