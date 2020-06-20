import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useTrackedState } from '../Store';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CertificateViewDashboard from '../components/CertificateViewDashboard';
import { Button } from 'react-native-paper';
import BasicQRModal from '../components/BasicQRModal';
import QRScannerModal from '../components/QRScannerModal';
import CertificationDialogue from '../components/CertificationDialgoue';

/**
 * Used to toggle the dark theme for the app.
 * @param darkTheme whether to set it to dark or light depending on the option clicked.
 * @param state the state, details can be found in Store.tsx
 */

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
                <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>My Dashboard</Text>
                <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight} >You can find your signed proofs below</Text>
            </View>
            <Button accessibilityStates color='white' style={{backgroundColor:'dodgerblue'}} mode='outlined' onPress={() => setScannerVisible(true)}>ADD PROOF</Button>
            <ScrollView style={{ minWidth: '100%', alignContent: 'center', alignSelf: 'center', marginVertical:0.03*height }}>
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
                                            creatorID: JSON.parse(JSON.stringify(item[3])),
                                            holderID: state.ID,
                                            type: JSON.parse(JSON.stringify(item[0])),
                                            hash: JSON.parse(JSON.stringify(item[1]))
                                        }}
                                        modalVisible={setVerificationVisible}
                                        setSelected={setSelected}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    : <Text style={state.darkMode? styles.noProofDark : styles.noProofLight}>You have no signed proofs yet. {"\n"}To add a proof click "Add Proof" and scan an Attester's QR code, then wait for them to accept </Text>}

                <CertificationDialogue type={certData.type} attester={certData.attester} visible={dialogueVisible} setVisible={setDialogueVisible} />
                <BasicQRModal data={JSON.stringify({ holderID: selected.holderID, hash: selected.hash })} visible={verificationVisible} setVisible={setVerificationVisible} />
                <QRScannerModal visible={scannerVisible} setVisible={setScannerVisible} onRead={handleQRScan} />
            </ScrollView>
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

var {height, width} = Dimensions.get('window');

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
    titleDark: {
        marginTop: .005*height,
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    titleLight: {
        marginTop: .005*height,
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
    instructionsLight: {
        marginVertical: .005*height,
        fontSize:16
    },
    instructionsDark: {
        marginTop: .005*height,
        fontSize:16,
        color: "#fff"
    },
    header: {
        alignItems: 'center',
        marginTop: .05*height,
        padding: "1.2%"
    },
    noProofLight:{
        fontSize:20,
        alignSelf:'center', 
        borderWidth:2, 
        borderColor:'black',
        paddingHorizontal:5, 
        textAlign:'center', 
        marginHorizontal:5
    },
    noProofDark:{
        fontSize:20,
        alignSelf:'center', 
        borderWidth:2, 
        borderColor:'white',
        color:'white',
        paddingHorizontal:5, 
        textAlign:'center', 
        marginHorizontal:5
    }
});

export default Dashboard
