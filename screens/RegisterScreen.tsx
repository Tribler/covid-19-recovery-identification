import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RegisterLogin } from '../network/NetworkCalls';
import { useTrackedState } from '../Store';

/**
 * The register screen which will be prompted on first startup and then never again.
 */
const RegisterScreen: React.FC = ({ navigation }) => {
    const state = useTrackedState()
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [passwordAttester, setPasswordAttester] = useState("")
    const [passwordAttesterConfirm, setPasswordAttesterConfirm] = useState("")

  
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
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> Register as patient</Text>
            <TextInput  //TODO fix this out of focus i think because goes above screen
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Enter Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true}
                value={password}
                onChangeText={input => setPassword(input)} />

            <TextInput
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Enter Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true}
                value={passwordConfirm}
                onChangeText={input => setPasswordConfirm(input)} />

            <TouchableOpacity onPress={() => {
                if (password == passwordConfirm) {
                    RegisterLogin(state, password, false)

                }
                else {
                    alert("Passwords don't match")
                }
                setPassword("")
                setPasswordConfirm("")
            }}>
                <View style={{
                    backgroundColor: '#74d14c', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 7, marginTop: 20
                }}>
                    <Text style={{ fontWeight: "bold", color: 'white', width: 150, height: 25, textAlign: "center", textAlignVertical: "center" }}>Submit</Text>
                </View>
            </TouchableOpacity>
            <Text>{"\n"}</Text>
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> Register as health expert</Text>
            <TextInput
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Enter Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true}
                value={passwordAttester}
                onChangeText={input => setPasswordAttester(input)} />
            <TextInput
                style={{ height: 45, width: "95%", borderColor: "gray", borderWidth: 2, borderRadius: 4, backgroundColor: "white" }}
                placeholder=" Confirm Your Password"
                underlineColorAndroid="transparent"
                placeholderTextColor="#32CD32"
                secureTextEntry={true}
                value={passwordAttesterConfirm}
                onChangeText={input => setPasswordAttesterConfirm(input)} />

            <TouchableOpacity onPress={() => {
                if (passwordAttester == passwordAttesterConfirm) {
                    RegisterLogin(state, passwordAttester, false)
                }
                else {
                    alert("Passwords don't match")
                }
                setPasswordAttester("")
                setPasswordAttesterConfirm("")
            }}>
                <View style={{
                    backgroundColor: '#74d14c', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 7, marginTop: 20
                }}>
                    <Text style={{ fontWeight: "bold", color: 'white', width: 150, height: 25, textAlign: "center", textAlignVertical: "center" }}>Submit</Text>
                </View>
            </TouchableOpacity>
            <Text>{"\n"}</Text>
            <Text>Already have an account?</Text><Button title="Sign in" onPress={() => navigation.navigate("Login")} />
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
        bottom: 300
    },
    im: {
        width: "110%",
        height: "117%",
        flexDirection: "column",
        resizeMode: "cover",
        top: 370,
        right: 20
    },
    im2: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
        bottom: 210,
        right: 20
    },
});

export default RegisterScreen
