import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import DrawerButton from "../components/DrawerButton";
import CertificateView from "../components/CertificateView";
import { Certificate } from "../Store";

const InboxScreen: React.FC = () => {
    const mockCert: Certificate = {
        creatorID: "SBut59tkgjrttqeTuvYeahQAcGE=",
        holderID: "1",
        type: "covid-immunity",
    };

    const mockCert2: Certificate = {
        creatorID: "0",
        holderID: "2",
        type: "covid-immunity",
    };

    const mockCert3: Certificate = {
        creatorID: "0",
        holderID: "3",
        type: "covid-immunity",
    };

    const mockCert4: Certificate = {
        creatorID: "0",
        holderID: "4",
        type: "covid-immunity",
    };

    const [certificates, setCertificates] = useState([
        { id: 0, cert: mockCert },
        { id: 1, cert: mockCert2 },
        { id: 2, cert: mockCert3 },
        { id: 3, cert: mockCert4 },
    ]);

    // function to remove certificates in the certificates list
    const deleteCert = (id: number) => {
        setCertificates((certificates) => {
            return certificates.filter((certificate) => certificate.id !== id);
        });
    };

    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Inbox</Text>
            <View style={{ float: "left", top: 150 }}>
                <FlatList                   // we use FlatList to provide list functionality
                    data={certificates}
                    renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                        <CertificateView
                            listID={item.id}
                            certificate={item.cert}
                            deleteCert={deleteCert}
                            // we pass the deleteCert function as a prop to the certificateview, which passes it to deletebutton
                            // TODO: Maybe refactor button? idk
                            onClick={() => console.log("wooow")}
                        />
                    )}
                />
            </View>
            <DrawerButton />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: "#fff",
        fontSize: 15,
        fontFamily: "Sans-serif",
        color: "#000",
        borderWidth: 1,
        margin: 15,
        padding: 5,
        justifyContent: "center",
    },
    textInput: {
        margin: 10,
    },
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#fff",
    },
    lighttext: {
        position: "relative",
        top: 100,
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000",
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
});

export default InboxScreen;
