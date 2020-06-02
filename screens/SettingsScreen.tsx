import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useToggleDark } from '../hooks/useToggleDark';
import { useTrackedState } from '../Store';

const SettingsScreen: React.FC = () => {
    const state = useTrackedState()
    const toggleDark = useToggleDark()

    return (
        <View style={state.darkMode ? styles.dark : styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 40, fontFamily: "Sans-serif", top: 80 }}>Settings</Text>
            <Text style={styles.setting}>Push Notifications</Text>
            <Text style={styles.option}><Text onPress={() => Alert.alert("enabled")}>Enabled</Text> / <Text onPress={() => Alert.alert("disabled")}>Disabled</Text></Text>
            <Text style={styles.setting2}>Theme</Text>
            <Text style={styles.option1}><Text onPress={() => toggleDark()}>Light</Text> / <Text onPress={() => toggleDark()}>Dark</Text></Text>
            <Text style={styles.settingred2} onPress={() => Alert.alert("delete cert")}>Delete a Certificate</Text>
            <Text style={styles.settingred} onPress={() => Alert.alert("delete acc")}>Delete your Account</Text>
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    dark: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    setting: {
        position: "relative",
        top: 300,
        left: 80,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    setting2: {
        position: "relative",
        top: 290,
        left: 130,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    option: {
        position: "relative",
        top: 110,
        left: 80,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    option1: {
        position: "relative",
        top: 100,
        left: 109,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    settingred: {
        position: "relative",
        top: 400,
        textAlign: "left",
        paddingVertical: 8,
        right: 100,
        color: "#FF0000",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    settingred2: {
        position: "relative",
        top: 400,
        textAlign: "left",
        paddingVertical: 8,
        right: 105,
        color: "#FF0000",
        fontSize: 20,
        fontFamily: "Sans-serif"
    }
});

export default SettingsScreen
