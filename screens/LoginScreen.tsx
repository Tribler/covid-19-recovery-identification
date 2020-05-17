import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const LoginScreen: React.FC = () => {
    return (
        //TODO This View component causes an error.
        <View style={styles.container}>
            <img  src={require("./logo.png")} />
            <br />
            <br />
            <br />
            <Text style={{fontWeight: "bold", color:"#0f0" } }>   sign in as patient</Text>
            <form style={{ alignItems: "center" }}>
                <label>
                   
                    <input type="password" name="Password" placeholder="Password" />                </label>
                <br/>
                </form>
                <br/>
                <Text style={{fontWeight: "bold", color:"#0f0"}}> sign in as health expert</Text>
            <form style={{ alignItems: "center" }}>
                
                <label>
         
                <input type="password" name="Password" placeholder="Password" />                </label>
            </form>
            <br/>
            <input type="submit" value="Submit"  style={{ alignItems: "center" }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //TODO This style configuration causes an error.
        // backgroundImage: "url(" + require("./background.jpeg") + ")",
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
        
    }
});

export default LoginScreen
