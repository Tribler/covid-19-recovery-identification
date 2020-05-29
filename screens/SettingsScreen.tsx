import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';

const SettingsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.lighttext}>Settings</Text>
            <Text style={styles.setting}>Push Notifications</Text>
            <Text style={styles.option}><Text onPress={() => Alert.alert("on")}>On</Text> / <Text onPress={() => Alert.alert("off")}>Off</Text></Text>
            <Text style={styles.setting2}>Theme</Text>
            <Text style={styles.option1}><Text onPress={() => Alert.alert("light")}>Light</Text> / <Text onPress={() => Alert.alert("dark")}>Dark</Text></Text>
            <Text style={styles.settingred} onPress={() => Alert.alert("delete cert")}>Delete a Certificate</Text>
            <Text style={styles.logout} onPress={() => Alert.alert("logout")}>Log out</Text>
            <DrawerButton/>
            <HelpButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
    setting2: {
        position: "relative",
        marginTop: "8%",
        marginRight: "72.5%",
        fontSize: 20,
        fontFamily: "Sans-serif",
    },
    option: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "43%",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    option1: {
        position: "relative",
        marginTop: "-6.5%",
        marginLeft: "41%",
        fontSize: 20,
        fontFamily: "Sans-serif"
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
    }
});

export default SettingsScreen
