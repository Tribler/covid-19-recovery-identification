import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import NewCertificateScreen from '../screens/NewCertificateScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import OutstandingScreen from '../screens/OutstandingScreen';
import { useTrackedState } from '../Store';
import HelpScreen from '../screens/HelpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import { StatusBar, AsyncStorage } from 'react-native';
import { useToggleDark, useToggleLight } from '../hooks/useToggleDarkMode';
import { useToggleRegister } from '../hooks/useToggleRegister';

const Drawer = createDrawerNavigator();

const DrawerMenu: React.FC = () => {
  const state = useTrackedState();

  const toggleDark = useToggleDark();
  const toggleLight = useToggleLight();
  const toggleRegister = useToggleRegister();

  useEffect(() => {
    StatusBar.setBackgroundColor('dodgerblue'); // set the status bar's background color
    AsyncStorage.getItem('darkmode_enabled', (error, result) => {
      result === 'true' ? toggleDark() : toggleLight();
    }); // remember whether user chose dark mode or light mode
    AsyncStorage.getItem('registered', (error, result) => {
      if (result === 'true') toggleRegister();
    }); // remember whether user registered or not
  }, []);

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      {state.loggedIn ? (
        <>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          {state.attester ? (
            <Drawer.Screen name="New Certificate" component={NewCertificateScreen} />
          ) : (
              <></>
            )}
          {state.attester ? (
            <Drawer.Screen name="Outstanding" component={OutstandingScreen} />
          ) : (
              <></>
            )}
          <Drawer.Screen name="Verification" component={VerificationScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Help" component={HelpScreen} />
        </>
      ) : (
          <>
            {state.registered ? (
              <>
                <Drawer.Screen name="Login" component={LoginScreen} />
              </>
            ) : (
                <>
                  <Drawer.Screen name="Register" component={RegisterScreen} />
                </>
              )}
          </>
        )}
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
