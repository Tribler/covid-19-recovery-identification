import React from 'react'
import { ImageBackground, StyleSheet, Text, View,TextInput, Button, Alert, Linking } from 'react-native';
import { Input , Image, } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';
import { useNavigation } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
 
//import PasswordField from 'ract-native-password-field';


const LoginScreen: React.FC = () => {
    return (
       
        <View style={styles.container}>
          
        
        
         <ImageBackground  
            style={styles.im}
            source={require('../assets/background.jpeg')}
        ></ImageBackground>

        <ImageBackground  
            resizeMode = "cover"
            style={styles.im2}
            source={require('../assets/logo.png')}
        ></ImageBackground>
        
        <Text style={{ fontWeight: "bold", color: "#74d14c",fontSize:20 }}> Sign in as patient</Text>
         <Text>{"\n"}</Text>
         {/* { <Image source={require("../assets/logo.png")} style={styles.im2} />} */}
        <TextInput
        style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2, borderRadius:4}}
        placeholder=" Enter Your Password"          
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        secureTextEntry={true}
        />
            
           
           <Text>{"\n"}</Text> 
            <Button
          title="Login"
          color="blue"
          
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Text>{"\n"}</Text> 
            <Text style={{ fontWeight: "bold", color: "#74d14c", fontSize:20}}> Sign in as health expert</Text>
            {/* <Text>{"\n"}</Text> */}
            <Text>{"\n"}</Text>
      <TextInput    
        style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2, borderRadius:4}}
        placeholder=" Enter Your Password"          
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        secureTextEntry={true}
        />
            
                
               
          <Text>{"\n"}</Text>
            <Button
          title="Login"
          color ="blue"
         
          
          onPress={() => Alert.alert('Simple Button pressed')}
        />
            {
            }
            <Text style={{ fontWeight: "bold", color: "#1d5", top: 20 }}>No account?</Text><Button title="Make one" onPress={() => <RegisterScreen/>}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //TODO This style configuration causes an error.
        //  ImageBackground: "url(" + require("../assets/background.jpeg") + ")",
        // backgroundPosition: "center",
       
        // backgroundRepeat: "no-repeat",
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
        bottom: 300
      
    },
    im:{
      
       width: "110%",
       height: "117%",
       flexDirection: "column",
       resizeMode: "cover",
       top: 370,
       right:20
       
    },
    im2:{
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
        bottom: 210,
        right: 20
    },
    sbutton:{
        color:"#0f0"

    }
});

export default LoginScreen
