import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen'
import NewCertificateScreen from '../screens/NewCertificateScreen'
import SettingsScreen from '../screens/SettingsScreen';
import InboxScreen from '../screens/InboxScreen';
import LoginScreen from '../screens/LoginScreen';
import OutstandingScreen from '../screens/OutstandingScreen'
import AttestationScreen from '../screens/AttestationScreen';
import { useTrackedState } from '../Store';
import HelpScreen from '../screens/HelpScreen';
import PeerScreen from '../screens/PeerScreen';

const Drawer = createDrawerNavigator();

const DrawerMenu: React.FC = () => {
  const state = useTrackedState()
  return (
    state.loggedIn ?
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          {state.attester ? <Drawer.Screen name="New Certificate" component={NewCertificateScreen} /> : <></>}
          <Drawer.Screen name="Inbox" component={InboxScreen} />
          {state.attester ? <Drawer.Screen name="Outstanding" component={OutstandingScreen} /> : <></>}
          <Drawer.Screen name="Attestations" component={AttestationScreen}/>
          <Drawer.Screen name="Peers" component={PeerScreen}/>
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Help" component={HelpScreen} />
        </Drawer.Navigator>
      </NavigationContainer> : <LoginScreen />
  )
}

export default DrawerMenu
