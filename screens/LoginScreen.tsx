import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const LoginScreen: React.FC = () => {
    return (
        //TODO This View component causes an error.
        <View style={styles.container}>
            <img src={require("../assets/logo.png")} />
            <Text style={{ fontWeight: "bold", color: "#1d5" }}> sign in as patient</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <br />
            </form>
            <input type="submit" value="login" />
            <Text style={{ fontWeight: "bold", color: "#1d5" }}><br /> sign in as health expert</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                    <input type="password" name="Password" placeholder="Password" />
                </label>
                <br />
            </form>
            <input type="submit" value="login" />
            {//How do i link to the register screen???
            }
            <Text style={{ fontWeight: "bold", color: "#1d5" }}><br />No account? <a href="RegisterScreen.tsx">Make one</a>!</Text>
        </View>
    )
}

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
