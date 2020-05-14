import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';

// <Text style={styles.option}><Text onPress={()=> console.log("light")}>Light</Text> / <Text onPress={()=> console.log("dark")}>Dark</Text> / <Text onPress={()=> console.log("corona")}>Corona</Text></Text>
// <Text style={styles.option}><Text onPress={()=> console.log("enabled")}>Enabled</Text> / <Text onPress={()=> console.log("disabled")}>Disabled</Text></Text>
const SettingsScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <h1 style={{fontWeight: "bold", verticalAlign:'top', fontSize:60, fontFamily:"Sans-serif"}}>Settings</h1>
            <Text style={styles.setting}>Push Notifications</Text>
            <Text style={styles.setting}>Theme<br/><br/><br/><br/><br/><br/><br/><br/></Text>
            <Text style={styles.setting}>Delete a Certificate</Text>
            <Text style={styles.setting}>Delete your Account</Text>
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
        top:50,
        right:250,
        textAlign:"left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
});

export default SettingsScreen