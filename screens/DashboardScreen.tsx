import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { State, useTrackedState} from '../Store';
import { FlatList } from 'react-native-gesture-handler';
import CertificateViewDashboard from '../components/CertificateViewDashboard';

/*
 * The Dashboard is the entry point to the app and displays the user's stored proofs
*/

const Dashboard: React.FC = () => {
    const [certificates, setCertificates] = useState([]);
    const state = useTrackedState()

    const url = state.serverURL + "/attestation?type=attributes"

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setCertificates(json))
          .catch((error) => console.error(error));
      }, []);

    return (
        <View style={styles.light}>
            <View style = {styles.header}>
                <Text style={styles.lighttext}>My Dashboard</Text>
                <Text style={styles.instructions} >You can find your earned badges below</Text>
                <Text style={styles.idtext}>{"Your ID is: " + state.ID}</Text>   
            </View>

            <View>
                <FlatList
                    data={certificates}
                    keyExtractor={(item) => item[0] + item[1]}
                    renderItem={({ item }) => (
                         <CertificateViewDashboard certificate={{creatorID:item[0], holderID: "0", type: item[1]}} />
                    )}
                />
            </View>
            
            <DrawerButton />
            <HelpButton />
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
        fontSize:15,
        fontWeight: '300'
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
    },
    header: {
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 30,
        padding:5
    },
    subtitle: {
        fontSize: 15,
        margin:5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    },
    idtext: {
        fontSize: 15,
        fontWeight: '400'
    }
});

export default Dashboard
