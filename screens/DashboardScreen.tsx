import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal} from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useTrackedState} from '../Store';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CertificateViewDashboard from '../components/CertificateViewDashboard';
import { Button } from 'react-native-paper';
import BasicQRModal from '../components/BasicQRModal';
import QRScannerModal from '../components/QRScannerModal';
import CertificationDialogue from '../components/CertificationDialgoue';

/*
 * The Dashboard is the entry point to the app and displays the user's stored proofs
*/

const getAttributes = (url : string, setAttributes: Function) => {
    fetch(url)
        .then((response) => response.json())
        .then((json) => setAttributes(json))
        .catch((error) => console.error(error));
}

const Dashboard: React.FC = () => {
    const [attributes, setAttributes] = useState([{id: "covid-19-immunity", signed: "bobbymcfly", hash:'XYZ'}, {id: "answers", signed: "themachine", hash:'DEF'}]);
    const [verificationVisible, setVerificationVisible] = useState(false)
    const [certData, setCertData] = useState({type:"0",attester:""}) //this states what data will show up in the confirmation dialogue after a scan
    const [scannerVisible, setScannerVisible] = useState(false)
    const [selected, setSelected] = useState({holderID:"", creatorID:"",type:"", hash:""})
    const [dialogueVisible, setDialogueVisible] = useState(true)
    const state = useTrackedState()

    const url = state.serverURL + "/attestation?type=attributes"


    const handleQRScan = (dataString:string) => {
        const data = JSON.parse(dataString)
        console.log(data)
        setCertData({type:data.type, attester:data.attestater})
        setDialogueVisible(true)
        
    }
    //useEffect(() => {getAttributes(url, setAttributes)})

    return (
        <View style={styles.light}>
            <ScrollView>
                <View style = {styles.header}>
                    <Text style={styles.lighttext}>My Dashboard</Text>
                    <Text style={styles.instructions} >You can find your earned badges below</Text>
                    <Button accessibilityStates color='black' mode='outlined' onPress={()=>setScannerVisible(true)}>GET CERTIFICATE</Button>
                </View>

                {attributes.length > 0 ? 
                <View>
                    <View style = {{minHeight: 200}}>
                        <FlatList // we use FlatList to provide list functionality
                            data={attributes}
                            keyExtractor={(item) => item.id} // 
                            renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                                <CertificateViewDashboard
                                    certificate={{creatorID:item.signed, holderID: state.ID, type: item.id, hash: item.hash}}
                                    modalVisible = {setVerificationVisible}
                                    setSelected= {setSelected}
                                />
                            )}
                        />
                    </View>
                </View>
                
                : <Text>You have no signed attributes yet</Text>}
                 
                <CertificationDialogue type={certData.type} attester={certData.attester} visible={dialogueVisible} setVisible={setDialogueVisible}/>
                <BasicQRModal data={JSON.stringify({holderID:selected.holderID, hash:selected.hash})} visible={verificationVisible} setVisible={setVerificationVisible}/>
                <QRScannerModal visible={scannerVisible} setVisible={setScannerVisible} onRead={handleQRScan}/>
            </ScrollView>
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
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center',
        alignItems: "center"
    },
    locked: {
        width: 130,
        height: 120,
        opacity: 0.4,
        margin:20
    },
    unlocked: {
        width: 130,
        height: 120,
        margin:20
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
