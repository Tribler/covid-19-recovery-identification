import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import LoginScreen from '../screens/LoginScreen';


const RegisterScreen: React.FC = () => {
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
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> register as patient</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <Text>{"\n"}</Text>
            </form>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Confirm Password" placeholder="Confirm Password" />
                </label>
                <Text>{"\n"}</Text>
            </form>
            <Text>{"\n"}</Text>
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> register as health expert</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
            </form>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Confirm Password" placeholder="Confirm Password" />
                </label>
                <Text>{"\n"}</Text>
            </form>
            <Text>{"\n"}</Text>
            <input type="submit" value="register" style={{ alignItems: "center" }} />
            <Text>{"\n"}</Text>
            <Text>Already have an account?</Text><Button title="Sign in" onPress={() => <RegisterScreen/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundImage: "url(" + require("../assets/background.jpeg") + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
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
});


export default RegisterScreen
