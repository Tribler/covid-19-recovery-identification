import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import DrawerButton from "../components/DrawerButton";
import CertificateViewInbox from "../components/CertificateViewInbox";
import { Certificate, useTrackedState } from "../Store";
import HelpButton from "../components/HelpButton";
import { ScrollView } from "react-native-gesture-handler";

/*
 * The Inbox contains all certificates received by this attestee, the attestee can choose wheter to keep or discard (accept / decline) this data.
 * The certificates shown here are the ones that an attester wants to add the the attestee's chain.
*/

const getCertificates = (url : string, setCertificates: Function) => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setCertificates(json))
            .catch((error) => console.error(error));
}

const InboxScreen: React.FC = () => {

    const [certificates, setCertificates] = useState([]);
    const state = useTrackedState()
    const url = state.serverURL + '/attestation/certificate/recent'

    useEffect(() => {getCertificates(url, setCertificates)})


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
                <ScrollView>
                    <Button accessibilityStates color='dodgerblue' style = {{flex:1}} onPress = {() => getCertificates(url, setCertificates)}>REFRESH</Button>
                    {certificates.length > 0 ?
                    <View>
                        <FlatList // we use FlatList to provide list functionality
                            data={certificates}
                            keyExtractor={(item) => item[0]} //
                            renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                                <CertificateViewInbox
                                    listID={item[0]} // the id of every certificate is used as identifier
                                    certificate={{creatorID:item[0], holderID: state.ID, type: item[1]}}
                                    deleteCert={deleteCert}
                                />
                            )}
                        />
                    </View>
                    : <Text style={{fontSize:16, borderWidth:1,padding:5}}>There are no pending certificates</Text>}
                </ScrollView>
            <DrawerButton />
            <HelpButton />
        </View>
    );
};

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
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
        alignContent:'center',
    },
    light: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        alignContent:'center',
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
