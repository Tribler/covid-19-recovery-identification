import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';


const SettingsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 40, fontFamily: "Sans-serif", top:50 }}>Settings</Text>
            <Text style={styles.setting}>Push Notifications</Text>
            <Text style={styles.option}><Text onPress={() => console.log("enabled")}>Enabled</Text> / <Text onPress={() => console.log("disabled")}>Disabled</Text></Text>
            <Text style={styles.setting}>Theme</Text>
            <Text style={styles.option1}><Text onPress={() => console.log("light")}>Light</Text> / <Text onPress={() => console.log("dark")}>Dark</Text></Text>
            <Text style={styles.settingred} onPress={() => console.log("delete cert")}>Delete a Certificate</Text>
            <Text style={styles.settingred} onPress={() => console.log("delete acc")}>Delete your Account</Text>
            <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    setting: {
        position: "relative",
        top: 100,
        right: 115,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    option: {
        position: "relative",
        top: 58,
        left: 115,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    option1: {
        position: "relative",
        top: 58,
        left: 109,
        textAlign: "left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    settingred: {
        position: "relative",
        top: 250,
        textAlign: "left",
        paddingVertical: 8,
        color: "#FF0000",
        fontSize: 20,
        fontFamily: "Sans-serif"
    }
});

export default SettingsScreen
