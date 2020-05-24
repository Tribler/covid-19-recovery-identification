import React, { useEffect, useState } from "react";
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
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:14411/certificate/recent')
          .then((response) => response.json())
          .then((json) => setCertificates(json))
          .catch((error) => console.error(error));
      }, []);


    // function to remove certificates in the certificates list
    const deleteCert = (id: string) => {
        setCertificates((certificates) => {
            return certificates.filter((certificate) => certificate[0] + certificate[1] !== id);
        });
    };

    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Inbox</Text>
            <View style={{ float: "left", top: 150 }}>
                <FlatList                   // we use FlatList to provide list functionality
                    data={certificates}
                    keyExtractor={(item, index) => item[0] + item[1]}
                    renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                         <CertificateView
                             listID={item[0] + item[1]}
                             certificate={{creatorID:item[0], holderID: "0", type: item[1]}}
                             deleteCert={deleteCert}
                        //     // we pass the deleteCert function as a prop to the certificateview, which passes it to deletebutton
                        //     // TODO: Maybe refactor button? idk
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
