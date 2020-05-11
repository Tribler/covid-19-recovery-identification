import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const LoginScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>Please Log In!</Text>
            <form style = {{alignItems: "center"}}>
                <label>
                    Username:
                    <input type="text" name="name" />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="Password" />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default LoginScreen