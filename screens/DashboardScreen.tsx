import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';


const Dashboard: React.FC = () => {
    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Dashboard</Text>
            <View style= {styles.certificate}>
                <Text> Acquired proofs</Text>
                <Text>{"\n"}</Text>
                <Text> AIDS immunity</Text>
                <Text> COVID-19 immunity</Text>
            </View>
        <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
       
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
      
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    dark: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    certificate: {
        width: 300,
        top: 50,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#fffffb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Sans-serif"
    }
});

export default Dashboard
