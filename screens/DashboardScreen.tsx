import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { Button } from 'react-native-paper';
import GetCertificates from '../network/getCertificates';
import { State, useTrackedState } from '../Store';

/*
 * The Dashboard is the entry point to the app and displays the user's stored proofs
*/
const Dashboard: React.FC = () => {
    const state = useTrackedState()

    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Dashboard</Text>
            <Text style={styles.instructions} >You can find your earned badges below</Text>
            <View style={styles.badges}>
                <Image
                    resizeMode="cover"
                    style={styles.star}
                    source={require('../assets/star.png')}>
                </Image>
                <Image
                    resizeMode="cover"
                    style={styles.lock1}
                    source={require('../assets/Lock_icon.png')}>
                </Image>
                <Image
                    resizeMode="cover"
                    style={styles.lock2}
                    source={require('../assets/Lock_icon.png')}>
                </Image>
                <Image
                    resizeMode="cover"
                    style={styles.lock3}
                    source={require('../assets/Lock_icon.png')}>
                </Image>
                <Text style={styles.badgeText}>Immunity</Text>
            </View>
            <View style={styles.rectangle} ></View>
            <View style={styles.rectangle2}></View>
            <View style={styles.rectangle3}></View>
            <View style={styles.rectangle4}></View>
            <DrawerButton/>
            <HelpButton/>
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
        top: 70,
        fontWeight: "bold",
        fontSize: 40,
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
        top: 100,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#fffffb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Sans-serif"
    },
    twelvePointBurstMain: {
        width: 100,
        height: 100,
        backgroundColor: "#74d14c",
        top: 250,
        right: 75,
        borderColor: "black"
    },
    twelvePointBurst30: {
        width: 100,
        height: 100,
        position: 'absolute',
        backgroundColor: '#74d14c',
        borderColor: "black",
        top: 250,
        right: 105,
        transform: [
            { rotate: '30deg' }
        ],
    },
    twelvePointBurst60: {
        width: 100,
        height: 100,
        position: 'absolute',
        backgroundColor: '#74d14c',
        top: 250,
        right: 105,
        borderColor: "black",
        transform: [
            { rotate: '60deg' }
        ]
    },
    badgeText: {
        bottom: 180,
        right: 55,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    instructions: {
        top: 80
    },
    rectangle: {
        width: 150,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.1,
        bottom: 280,
        right: 90
    },
    rectangle2: {
        width: 150,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.1,
        bottom: 480,
        left: 90
    },
    rectangle3: {
        width: 150,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.1,
        bottom: 460,
        left: 90
    },
    rectangle4: {
        width: 150,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.1,
        bottom: 660,
        right: 90
    },
    badges: {
    },
    lock1: {
        width: 130,
        height: 120,
        top: 130,
        left: 90,
        opacity: 0.4
    },
    lock2: {
        width: 130,
        height: 120,
        top: 230,
        left: 90,
        opacity: 0.4
    },
    lock3: {
        width: 130,
        height: 120,
        top: 115,
        right: 90,
        opacity: 0.4
    },
    star: {
        width: 130,
        height: 120,
        top: 260,
        right: 90,
    }
});

export default Dashboard
