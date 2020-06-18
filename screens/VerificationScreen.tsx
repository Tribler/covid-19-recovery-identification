
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import DrawerButton from "../components/DrawerButton";
import HelpButton from "../components/HelpButton";
import { useTrackedState, State } from "../Store";
import { PostVerification } from "../network/NetworkCalls";
import {Button} from "react-native-paper" 
import QRScannerModal from "../components/QRScannerModal";
import VerificationDialogue from "../components/VerificationDialogue";

const VerificationScreen: React.FC = () => {
    const [scannerOpen, setScannerOpen] = useState(false)
    const state = useTrackedState()
    const [dialogueVisible, setDialogueVisible] = useState(false)
    const [verificationResponse, setVerificationResponse] = useState({attributeType:"covid-19-immunity", verified:false, id:"person"})

    
    const handleQRScan = (qrdata:string) =>{
        const data = JSON.parse(qrdata)
        PostVerification(state, data.holderID, data.hash, openDialogue)
    }

    const openDialogue = (response:any) => { //gets called once the verification scan is complete
        setVerificationResponse(response)
        setDialogueVisible(true)
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Verification</Text>
            </View>
            
            <Button 
                accessibilityStates 
                mode="contained" 
                style={styles.verifyButton} 
                onPress={()=> {
                    setVerificationResponse({attributeType:"covid-19-immunity", verified:true, id:"person"})
                    setScannerOpen(true)}}>
                Verify
            </Button>
                    
            <VerificationDialogue verificationResponse={verificationResponse} visible={dialogueVisible} setVisible={setDialogueVisible} />
            <QRScannerModal visible={scannerOpen} setVisible={setScannerOpen} onRead={handleQRScan}></QRScannerModal>
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
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    title: {
        position: "relative",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    subtitle: {
        fontSize: 15,
        margin: 5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    },
    verifyButton: {
        marginHorizontal:10,
        backgroundColor:'dodgerblue'
    }
})

export default VerificationScreen;
