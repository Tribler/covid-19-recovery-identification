import React from 'react';
import {Provider} from '../Store';
import DrawerMenu from '../components/DrawerMenu';
import {NavigationContainer} from '@react-navigation/native';
import ServiceModule from 'ipv8-service';

export default function App() {
  React.useEffect(() => {
    ServiceModule.initService();
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        <DrawerMenu />
      </NavigationContainer>
    </Provider>
  );
}
