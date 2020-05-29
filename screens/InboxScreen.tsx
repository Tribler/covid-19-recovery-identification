import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DrawerButton from "../components/DrawerButton";
import CertificateView from "../components/CertificateView";
import { useTrackedState } from "../Store";
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
            return certificates.filter((certificate) => certificate[0] + certificate[1] !== id);
        });
    };

    return (
        <View style={styles.light}>
            <View style = {styles.header}>
                <Text style = {styles.lighttext}>My Inbox</Text>
                <Text style = {styles.subtitle}>Here you can see the data that an attester wants to add to your chain</Text>
            </View>
            <View>
                <FlatList                   // we use FlatList to provide list functionality
                    data={certificates}
                    keyExtractor={(item) => item[0] + item[1]}
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
            <HelpButton />
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
    subtitle: {
        fontSize: 15,
        margin:5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default InboxScreen;
