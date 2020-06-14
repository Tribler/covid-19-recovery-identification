import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Snackbar} from "react-native-paper";
import DrawerButton from "../components/DrawerButton";
import {useTrackedState } from "../Store";
import HelpButton from "../components/HelpButton";


const getPeers = (url : string, setCertificates : Function) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setCertificates(json))
      .catch((error) => console.error(error));
  }
/*
 * The Peer Screen contains all the other users connected to the network. After being opened the screen automatically checks for new peers every 5 seconds.
*/

const PeerScreen: React.FC = () => {

    const [certificates, setCertificates] = useState([]);
    const [snackbar, setSnackbar] = useState(false)
    const state = useTrackedState()
    const url = state.serverURL + '/attestation?type=peers'

    const updateInterval = 5000; //how many milliseconds between checking for new peers
    
    useEffect(() => {
        const interval = setInterval(() => {            
            getPeers(url, setCertificates)
        }, updateInterval);
        return () => clearInterval(interval);
      }, []);

    return (
        <View style = {state.darkMode ? styles.dark : styles.light}>
            <View style = {state.darkMode ? styles.headerDark : styles.header}>
                <Text style = {state.darkMode ? styles.darktext : styles.lighttext}>Peers</Text>
                <Text style = {state.darkMode ? styles.subtitleDark : styles.subtitle}>Here you can see all the other users detected on the network. (It can take several minutes for a new user to be detected)</Text>
            </View>
            <View>
                <Button accessibilityStates onPress = {() => getPeers(url, setCertificates)}>REFRESH</Button>
                {certificates.length == 0 ? <Text style = {state.darkMode ? styles.darkColor : styles.lightColor}>NO PEERS FOUND</Text> :
                <FlatList                   // we use FlatList to provide list functionality
                    data={certificates}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => ( // we render every item in the certificates as a Certificateview
                        <Text
                        style = {state.darkMode ? styles.darkColor : styles.lightColor}
                        onPress={() => {
                            console.log("Copied ID")
                            // // Clipboard.setString(item)
                            // setSnackbar(true)
                        }}>{item}</Text>
                    )}
                />
                }
            <Snackbar
                accessibilityStates = {true}
                visible={snackbar}
                onDismiss={() => {setSnackbar(false)}}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        console.log("Undoing");
                    },
                }}>
              Copied peer ID</Snackbar>
            </View>
            <DrawerButton />
            <HelpButton />
        </View>
    );
};

const styles = StyleSheet.create({
    darkColor: {
        color: "#fff",
        margin:5,
    },
    lightColor: {
        color: "#000",
        margin:5,
    },
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
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff",
    },
    lighttext: {
        position: "relative",
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
        margin:5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    },
    subtitleDark: {
        fontSize: 15,
        margin:5,
        fontFamily: "Sans-serif",
        color: "#fff",
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default PeerScreen;
