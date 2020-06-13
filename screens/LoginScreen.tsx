import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useTrackedState } from '../Store';
import { PostLogin } from '../network/NetworkCalls';

/**
 * The login screen for logging in as a health expert or as a patient.
 * Will be prompted every time a user opens the app.
 */
const LoginScreen: React.FC = ({navigation}) => {
    const state = useTrackedState()
    const [password, setPassword] = useState("")
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.im}
                source={require('../assets/background.jpeg')}>
            </ImageBackground>
            <ImageBackground
                resizeMode="cover"
                style={styles.im2}
                source={require('../assets/logo.png')}>
            </ImageBackground>
            <Text style={{ fontWeight: "bold", color: "#74d14c", fontSize: 20 }}> Sign in as patient</Text>
            <Text>{"\n"}</Text>
            <TextInput
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Enter Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true} 
                onChangeText={input => setPassword(input)}/>
            <TouchableOpacity onPress={() => PostLogin(state, password)}>
                <View style={{
                    backgroundColor: '#74d14c', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 7, marginTop: 20
                }} >
                    <Text style={{ fontWeight: "bold", color: 'white', width: 150, height: 25, textAlign: "center", textAlignVertical: "center" }}>Submit</Text>
                </View>
            </TouchableOpacity>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text style={{ fontWeight: "bold", color: "#74d14c", fontSize: 20 }}> Sign in as health expert</Text>
            <Text>{"\n"}</Text>
            <TextInput
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Enter Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true} 
                onChangeText={input => setPassword(input)}/>
            <TouchableOpacity onPress={() => PostLogin(state, password)}>
                <View style={{
                    zIndex: 1, backgroundColor: '#74d14c', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 7, marginTop: 20
                }}>
                    <Text style={{ fontWeight: "bold", color: 'white', width: 150, height: 25, textAlign: "center", textAlignVertical: "center" }}>Submit</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ color: "#1d5", top: 20 }}>Don't have an account?</Text>
            <Button style={{ top: 20 }} onPress={() => navigation.navigate("Register")}> Sign up  </Button>
        </View>
    )
}

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
        bottom: 270
    },
    im: {
        width: "110%",
        height: "117%",
        flexDirection: "column",
        resizeMode: "cover",
        top: 325,
        right: 20
    },
    im2: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
        bottom: 250,
        right: 20
    },
    sbutton: {
        color: "#0f0"
    }
});

export default LoginScreen
