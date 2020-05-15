import React from 'react';
import { Provider, useTrackedState } from "./Store";
import DrawerMenu from './components/DrawerMenu';

export default function App() {
  return (
    <Provider>
      <DrawerMenu/>
    </Provider>
  );
}


