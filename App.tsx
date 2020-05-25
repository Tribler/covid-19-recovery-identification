import React from 'react';
import { Provider } from "./Store";
import DrawerMenu from './components/DrawerMenu';

//Main entry point for the app runtime.

export default function App() {
  return (
    <Provider> {/*The provider allows for props to be automatically passed down the component tree*/ }
      <DrawerMenu/>
    </Provider>
  );
}
