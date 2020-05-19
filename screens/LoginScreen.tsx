import React from 'react'
import { ImageBackground, StyleSheet, Text, View,TextInput, Button, Alert } from 'react-native';
import { Input , Image, } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';
 
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
         {/* <Text>{"\n"}</Text> */}
         {/* { <Image source={require("../assets/logo.png")} style={styles.im2} />} */}
         <Text>{"\n"}</Text> 
        <TextInput
        style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2, borderRadius:4, backgroundColor:"white"}}
        placeholder=" Enter Your Password"          
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        secureTextEntry={true}
        />
            
           
           <Text>{"\n"}</Text> 
            <Button
          title="Submit"
          color="grey"
          
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Text>{"\n"}</Text> 
            <Text>{"\n"}</Text>
            <Text style={{ fontWeight: "bold", color: "#74d14c", fontSize:20}}> Sign in as health expert</Text>
            {/* <Text>{"\n"}</Text> */}
            <Text>{"\n"}</Text>
      <TextInput    
        style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2, borderRadius:4, backgroundColor:"white"}}
        placeholder=" Enter Your Password"          
        underlineColorAndroid="transparent"
        placeholderTextColor="#74d14c"
    
        secureTextEntry={true}
        />
            
                
               
          <Text>{"\n"}</Text>
            <Button
          title="Submit"
          color ="grey"
         
          
          onPress={() => Alert.alert('Simple Button pressed')}
        />
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
       top: 350,
       right:20
       
    },
    im2:{
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
        bottom: 250,
        right: 20
    },
    sbutton:{
        color:"#0f0"

    }
});

export default LoginScreen
