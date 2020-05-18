import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { Input , Image, } from 'react-native-elements';
 
//import PasswordField from 'ract-native-password-field';


const LoginScreen: React.FC = () => {
    return (
       
        <View style={styles.container}>
          
        <Image source={require("../assets/logo.png")} />
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> sign in as patient</Text>
         
            <TextInput secureTextEntry={true}  value="abc" />
            
           
            <Input type="submit" value="login" />
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> sign in as health expert</Text>
           
              
                <TextInput secureTextEntry={true}  value="abc" />
                
               
          
            <Input type="submit" value="login" />
            {
            }
            
        </View>
    )
}
//<Text style={{ fontWeight: "bold", color: "#1d5" }}>No account? <a href="RegisterScreen.tsx">Make one</a>!</Text>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //TODO This style configuration causes an error.
        // backgroundImage: "url(" + require("../assets/background.jpeg") + ")",
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
    }
});

export default LoginScreen
