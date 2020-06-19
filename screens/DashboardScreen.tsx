import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { State, useTrackedState } from '../Store';
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

const probeVerifyRequests = (url:string, setVerificationVisible : Function) => {
    const requests = getRequests()
    const diff =  requests - old_requests
    if(diff.length > 0){
        setRequest(diff[0])
        setVerificationVisible(true)
    }
}

const Dashboard: React.FC = () => {
    const [attributes, setAttributes] = useState([["covid-19-immunity", , {}, "COFrKwAoUNGBc8uPI8vedoWhrao="]]);
    const [verificationVisible, setVerificationVisible] = useState(false)
    const [verifyRequestVisible, setVerifyRequestVisible] = useState(false)
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
    useEffect(() => { 
        getAttributes(url, setAttributes, state.jwt)
        probeVerifyRequests(url, setVerificationVisible)
    })

    return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <View style={styles.header}>
                <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>My Dashboard</Text>
                <Text style={state.darkMode ? styles.subtitleDark : styles.subtitleLight} >
                    You can find your signed proofs below</Text>
            </View>
            <Button accessibilityStates color='white' style={{backgroundColor:'dodgerblue'}} mode='outlined' onPress={() => setScannerVisible(true)}>ADD PROOF</Button>
            <ScrollView style={{ minWidth: '100%', alignContent: 'center', alignSelf: 'center', marginVertical:0.03*height }}>
                {attributes.length > 0 ?
                    <View>
                        <View>
                <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>In order to share an attribute wih a Verifier click "Show Proof" and let them scan your QR code.</Text>
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

                    : <Text style={state.darkMode? styles.instructionsDark : styles.instructionsLight}>You have no signed proofs yet. {"\n"}To add a proof click "Add Proof" and scan an Attester's QR code, then wait for them to accept </Text>}

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
    subtitleLight: {
        marginVertical: .005*height,
        fontSize:16,
        textAlign:'center'
    },
    subtitleDark: {
        marginTop: .005*height,
        fontSize:16,
        textAlign:'center',
        color: "#fff"
    },
    header: {
        alignItems: 'center',
        marginTop: .05*height,
        padding: "1.2%"
    },
    instructionsLight:{
        fontSize:20,
        alignSelf:'center', 
        borderWidth:2, 
        borderColor:'black',
        paddingHorizontal:5, 
        textAlign:'center', 
        marginHorizontal:5
    },
    instructionsDark:{
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
