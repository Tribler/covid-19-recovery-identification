import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import DrawerButton from '../components/DrawerButton';

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation()
    
    return(
        <View style={styles.container}>
         
            <h1 style={{fontWeight: "bold", verticalAlign:'top', fontSize:60, fontFamily:"Sans-serif"}}>Settings</h1>
            <Text style={styles.setting}>Push Notifications <Text style={styles.option}><Text onPress={()=> console.log("enabled")}>Enabled</Text> / <Text onPress={()=> console.log("disabled")}>Disabled</Text></Text></Text>
            <Text style={styles.setting}>Theme <Text style={styles.option1}><Text onPress={()=> console.log("light")}>Light</Text> / <Text onPress={()=> console.log("dark")}>Dark</Text> / <Text onPress={()=> console.log("corona")}>Corona</Text></Text><br/><br/><br/><br/><br/><br/><br/><br/></Text>
          
            <Text style={styles.settingred} onPress={()=> console.log("delete cert")}>Delete a Certificate</Text>
            <Text style={styles.settingred} onPress={()=> console.log("delete acc")}>Delete your Account</Text>
            
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
        top:150,
        right:80,
        textAlign:"left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif",
        
    },
    option: {
        position: "relative",
        left:150,
        textAlign:"left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    option1: {
        position: "relative",
        left:200,
        textAlign:"left",
        paddingVertical: 8,
        color: "#20232a",
        fontSize: 20,
        fontFamily: "Sans-serif"
    },
    settingred: {
        position: "relative",
        top:200,
        right:161,
        textAlign:"left",
        paddingVertical: 8,
        color: "#FF0000",
        fontSize: 20,
        fontFamily: "Sans-serif"
    }
});

export default SettingsScreen