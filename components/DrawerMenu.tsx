import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen'
import NewCertificateScreen from '../screens/NewCertificateScreen'
import SettingsScreen from '../screens/SettingsScreen';
import InboxScreen from '../screens/InboxScreen';
import LoginScreen from '../screens/LoginScreen';
import AttestationScreen from '../screens/AttestationScreen';
import { useTrackedState } from '../Store';

const Drawer = createDrawerNavigator();

const DrawerMenu: React.FC = () => {
  const state = useTrackedState()
  return (
    state.loggedIn ?
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="My Dashboard">
          <Drawer.Screen name="My Dashboard" component={DashboardScreen} />
          {state.attester ? <Drawer.Screen name="New Certificate" component={NewCertificateScreen} /> : <></>}
          <Drawer.Screen name="Inbox" component={InboxScreen} />
          <Drawer.Screen name="Attestations" component={AttestationScreen}/>
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer> : <LoginScreen />
  )
}

export default DrawerMenu
