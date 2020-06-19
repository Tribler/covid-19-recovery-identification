import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen'
import NewCertificateScreen from '../screens/NewCertificateScreen'
import SettingsScreen from '../screens/SettingsScreen';
import InboxScreen from '../screens/InboxScreen';
import LoginScreen from '../screens/LoginScreen';
import OutstandingScreen from '../screens/OutstandingScreen'
import { useTrackedState } from '../Store';
import HelpScreen from '../screens/HelpScreen';
import PeerScreen from '../screens/PeerScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';

const Drawer = createDrawerNavigator();

const DrawerMenu: React.FC = () => {
  const state = useTrackedState()

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      {state.loggedIn ?
        <>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          {state.attester ? <Drawer.Screen name="New Certificate" component={NewCertificateScreen} /> : <></>}
          {state.attester ? <Drawer.Screen name="Outstanding" component={OutstandingScreen} /> : <></>}
          <Drawer.Screen name="Verification" component={VerificationScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Help" component={HelpScreen} />
        </>
        :
        <>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
        </>
      }
    </Drawer.Navigator>
  )
}

export default DrawerMenu
