import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useTrackedState, State} from '../Store';
import { useToggleDark} from '../hooks/useToggleDark';
import { useToggleLight } from '../hooks/useToggleLight';
import { useToggleLogout } from '../hooks/useToggleLogout';

const SettingsScreen: React.FC = () => {
    const state = useTrackedState()
    const toggleDark = useToggleDark()
    const toggleLight = useToggleLight()
    const logout = useToggleLogout()

    return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <Text style={state.darkMode ? styles.darktext : styles.lighttext}>Settings</Text>
            <Text style={state.darkMode ? styles.settingDark : styles.setting}>Push Notifications</Text>
            <Text style={state.darkMode ? styles.optionDark : styles.option}><Text onPress={() => Alert.alert("on")}>On</Text> / <Text onPress={() => Alert.alert("off")}>Off</Text></Text>
            <Text style={state.darkMode ? styles.setting1Dark : styles.setting1}>Theme</Text>
            <Text style={state.darkMode ? styles.option1Dark : styles.option1}><Text onPress={() => toggleLight()}>Light</Text> / <Text onPress={() => toggleDark()}>Dark</Text></Text>
            <Text style={styles.settingred} onPress={() => Alert.alert("delete cert")}>Delete a Certificate</Text>
            <Text style={state.darkMode ? styles.logoutDark : styles.logout} onPress={() => logout()}>Log out</Text>
            <DrawerButton/>
            <HelpButton/> 
        </View>
    )
}

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
    dark: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    darktext: {
        position: "relative",
        marginTop: "15%",
        marginBottom: "3%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        marginTop: "15%",
        marginBottom: "3%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    setting: {
        position: "relative",
        marginTop: "7%",
        marginRight: "48%",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    settingDark: {
        position: "relative",
        marginTop: "7%",
        marginRight: "48%",
        fontSize: 20,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    setting1: {
        position: "relative",
        marginTop: "8%",
        marginRight: "72.5%",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    setting1Dark: {
        position: "relative",
        marginTop: "8%",
        marginRight: "72.5%",
        fontSize: 20,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    option: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "63%",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    optionDark: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "63%",
        fontSize: 20,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    option1: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "61%",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    option1Dark: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "61%",
        fontSize: 20,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    settingred: {
        position: "relative",
        marginTop: "15%",
        color: "#FF0000",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    logout: {
        position: "relative",
        marginTop: "69%",
        marginLeft: "72%",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    logoutDark: {
        position: "relative",
        marginTop: "69%",
        marginLeft: "72%",
        fontSize: 20,
        fontFamily: "Sans-serif",
        color: "#fff"
    }
});

export default SettingsScreen
