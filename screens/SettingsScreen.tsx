import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useTrackedState, State} from '../Store';

/**
 * used to toggle the dark theme for the app
 * @param darkTheme whether to set it to dark or light depending on the option clicked.
 * @param state the state, details can be found in Store.tsx
 */
const toggleDark = (darkTheme:boolean, state:State) => {
    state.darkMode = darkTheme
}

const logout = (state:State) => {
    state.loggedIn = false
}

const SettingsScreen: React.FC = () => {
    const state = useTrackedState()
        return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <Text style={state.darkMode ? styles.darktext : styles.lighttext}>Settings</Text>
            <Text style={state.darkMode ? styles.settingDark : styles.setting}>Push Notifications</Text>
            <Text style={state.darkMode ? styles.optionDark : styles.option}><Text onPress={() => Alert.alert("on")}>On</Text> / <Text onPress={() => Alert.alert("off")}>Off</Text></Text>
            <Text style={state.darkMode ? styles.setting1Dark : styles.setting1}>Theme</Text>
            {/* <Text style={state.darkMode ? styles.option1Dark : styles.option1}><Text  onPress={() => toggleDark(false, state)}>Light</Text> / <Text  onPress={() => toggleDark(true, state)}>Dark</Text></Text> */}
            <Text style={state.darkMode ? styles.option1Dark : styles.option1}><Text onPress={() => state.darkMode = false}>Light</Text> / <Text onPress={() => state.darkMode = true}>Dark</Text></Text>
            <Text style={styles.settingred} onPress={() => Alert.alert("delete cert")}>Delete a Certificate</Text>
            <Text style={state.darkMode ? styles.logoutDark : styles.logout} onPress={() => logout(state)}>Log out</Text>
            <DrawerButton/>
            <HelpButton/>
        </View>
    )
}

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
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
