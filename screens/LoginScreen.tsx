import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import RegisterScreen from './RegisterScreen';

const LoginScreen: React.FC = () => {
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
                secureTextEntry={true} />
            <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
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
                secureTextEntry={true} />
            <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
                <View style={{
                    zIndex: 1, backgroundColor: '#74d14c', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 7, marginTop: 20
                }}>
                    <Text style={{ fontWeight: "bold", color: 'white', width: 150, height: 25, textAlign: "center", textAlignVertical: "center" }}>Submit</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ color: "#1d5", top: 20 }}>Don't have an account?</Text>
            <Button style={{ top: 20 }} onPress={() => <RegisterScreen />}> Sign up  </Button>
        </View>
    )
}

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
