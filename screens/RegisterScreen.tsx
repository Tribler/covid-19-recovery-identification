import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const RegisterScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <img src={require("../assets/logo.png")} />
            <br />
            <br />
            <br />
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> register as patient</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <br />
            </form>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Confirm Password" placeholder="Confirm Password" />
                </label>
                <br />
            </form>
            <br />
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
                <br />
            </form>
            <br />
            <input type="submit" value="register" style={{ alignItems: "center" }} />
            <br />
            <p>Already have an account? <a href="LoginScreen.tsx">Sign in</a>!</p>
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
    }
});


export default RegisterScreen
