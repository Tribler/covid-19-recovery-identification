import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import DrawerButton from "../components/DrawerButton";
import CertificateViewInbox from "../components/CertificateViewInbox";
import { Certificate, useTrackedState } from "../Store";
import HelpButton from "../components/HelpButton";

/*
 * The Inbox contains all certificates received by this attestee, the attestee can choose wheter to keep or discard (accept / decline) this data.
 * The certificates shown here are the ones that an attester wants to add the the attestee's chain.
*/

const InboxScreen: React.FC = () => {

    const [certificates, setCertificates] = useState([]);
    const state = useTrackedState()
    const url = state.serverURL + '/attestation/certificate/recent'

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setCertificates(json))
            .catch((error) => console.error(error));
    }, []);


    // function to remove certificates in the certificates list
    const deleteCert = (id: string) => {
        setCertificates((certificates) => {
            return certificates.filter((certificate) => certificate.id !== id);
        });
    };

    return (
        <View style={state.darkMode ? styles.dark : styles.light}>
            <View style = {state.darkMode ? styles.headerDark : styles.header}>
                <Text style = {state.darkMode ? styles.darktext : styles.lighttext}>My Inbox</Text>
                <Text style = {state.darkMode ? styles.subtitleDark : styles.subtitle}>Here you can inform a holder of what data you want to add to their chain</Text>
            </View>
            <View>
                <FlatList // we use FlatList to provide list functionality
                    data={certificates}
                    keyExtractor={(item, index) => item.id} // 
                    renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                         <CertificateViewInbox
                             listID={item.id} // the id of every certificate is used as identifier
                             certificate={{creatorID:item.certificate[0], holderID: "0", type: item.certificate[1]}}
                             deleteCert={deleteCert}
                         />
                    )}
                />
            </View>
            <DrawerButton />
            <HelpButton />
        </View>
    );
};

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
    textInput: {
        margin: 10,
    },
    textInputDark: {
        backgroundColor: "#222",
        margin: 10,
      },
    darktext: {
        position: "relative",
        marginTop: "3%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        marginTop: "3%",
        marginBottom: "5%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    dark: {
        flex: 1,
        backgroundColor: "#222",
        alignItems: "center",
    },
    light: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    headerDark: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
        color: "#fff"
    },
    subtitle: {
        fontSize: 15,
        margin: 5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    },
    subtitleDark: {
        fontSize: 15,
        margin:5,
        marginTop:25,
        fontFamily: "Sans-serif",
        color: "#fff",
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default InboxScreen;
