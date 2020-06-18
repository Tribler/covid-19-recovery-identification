import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { State, useTrackedState } from '../Store';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CertificateViewDashboard from '../components/CertificateViewDashboard';
import { Button } from 'react-native-paper';
import BasicQRModal from '../components/BasicQRModal';
import QRScannerModal from '../components/QRScannerModal';
import CertificationDialogue from '../components/CertificationDialgoue';
import AcceptButton from '../components/AcceptButton';

/**
 * Used to toggle the dark theme for the app.
 * @param darkTheme whether to set it to dark or light depending on the option clicked.
 * @param state the state, details can be found in Store.tsx
 */
const toggleDark = (darkTheme: boolean, state: State) => {
    state.darkMode = darkTheme
}

/*
 * The Dashboard is the entry point to the app and displays the user's stored proofs.
*/

const getAttributes = (url: string, setAttributes: Function, jwt: string) => {
    const data = { method: 'GET', headers: { "Authorization": jwt }, body: "" }
    fetch(url, data)
        .then((response) => response.json())
        .then((json) => setAttributes(json))
        .catch((error) => console.error(error));
}

const Dashboard: React.FC = () => {
    const [attributes, setAttributes] = useState([["hello", "kli9GyvPME2jh0uyyCqYfqBoUog=", {}, "COFrKwAoUNGBc8uPI8vedoWhrao="]]);
    const [verificationVisible, setVerificationVisible] = useState(false)
    const [certData, setCertData] = useState({ type: "0", attester: "" }) //this states what data will show up in the confirmation dialogue after a scan
    const [scannerVisible, setScannerVisible] = useState(false)
    const [selected, setSelected] = useState({ holderID: "", creatorID: "", type: "", hash: "" })
    const [dialogueVisible, setDialogueVisible] = useState(false)
    const state = useTrackedState()

    const url = state.serverURL + "/attestation?type=attributes"


    const handleQRScan = (dataString: string) => {
        const data = JSON.parse(dataString)
        console.log(data)
        setCertData({ type: data.type, attester: data.id })
        setDialogueVisible(true)

    }
    useEffect(() => { getAttributes(url, setAttributes, state.jwt) })

    return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <View style={styles.header}>
                <Text style={state.darkMode ? styles.darktext : styles.lighttext}>My Dashboard</Text>
                <Text style={state.darkMode ? styles.instructionsDark : styles.instructions} >You can find your signed proofs below</Text>
                <Button style={{backgroundColor:"dodgerblue"}} accessibilityStates color='white' mode='outlined' onPress={() => setScannerVisible(true)}>GET CERTIFICATE</Button>
                <Text> {'\n'}</Text> 
                <Text> {'\n'}</Text> 
            </View>
            <ScrollView style={{ minWidth: '100%', alignContent: 'center', alignSelf: 'center' }}>
                {attributes.length > 0 ?
                    <View>
                        <View>
                            <FlatList // we use FlatList to provide list functionality
                                style={{ maxWidth: '95%', alignSelf: 'center' }}
                                data={attributes}
                                keyExtractor={(item) => item.id} //
                                renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                                    <CertificateViewDashboard
                                        certificate={{
                                            creatorID: JSON.stringify(item[3]),
                                            holderID: state.ID,
                                            type: JSON.stringify(item[0]),
                                            hash: JSON.stringify(item[1])
                                        }}
                                        modalVisible={setVerificationVisible}
                                        setSelected={setSelected}
                                    />
                                )}
                            />
                        </View>
                    </View>
                      
                      : <Text style={{ fontSize:20,alignSelf:'center', borderWidth:2, borderColor:'black', paddingHorizontal:5, textAlign:'center', marginHorizontal:5}}>You have no signed proofs yet. {"\n"}To add a proof click "Add Proof" and scan an Attester's QR code, then wait for them to accept </Text>}

                <CertificationDialogue type={certData.type} attester={certData.attester} visible={dialogueVisible} setVisible={setDialogueVisible} />
                <BasicQRModal data={JSON.stringify({ holderID: selected.holderID, hash: selected.hash })} visible={verificationVisible} setVisible={setVerificationVisible} />
                <QRScannerModal visible={scannerVisible} setVisible={setScannerVisible} onRead={handleQRScan} />
            </ScrollView>
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
    darktext: {
        position: "relative",
        marginTop: "15%",
        marginBottom: "-13%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        marginTop: "15%",
        marginBottom: "-13%",
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
    badgeText: {
        bottom: "37%",
        right: "13%",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    instructions: {
        marginTop: "20%",
        marginBottom: "10%"
    },
    instructionsDark: {
        marginTop: "20%",
        marginBottom: "-44%",
        color: "#fff"
    },
    header: {
        alignItems: 'center',
        marginTop: "8.5%",
        marginBottom: "7.2%",
        padding: "1.2%"
    }
});

export default Dashboard
