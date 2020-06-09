
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import DrawerButton from "../components/DrawerButton";
import HelpButton from "../components/HelpButton";
import { useTrackedState, State } from "../Store";
import QRModal from "../components/QRModal";
import { PostVerification } from "../network/NetworkCalls";
import {Button} from "react-native-paper" 

const verifyAttribute = (state: State, userId:string, attributeHash:string) => {
    PostVerification(state, userId, attributeHash)
}

const VerificationScreen: React.FC = () => {
    const [scannerOpen, setScannerOpen] = useState(false);
    const state = useTrackedState()


    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Verification</Text>
            </View>
            <Button accessibilityStates mode="contained" style={styles.verifyButton} onPress={()=> setScannerOpen(true)}> Verify</Button>

            <QRModal visible={scannerOpen} setVisible={setScannerOpen}></QRModal>
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

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
