import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native';
import OutstandingView from '../components/OutstandingView'
import DrawerButton from '../components/DrawerButton';
import { State, useTrackedState } from '../Store';
import HelpButton from '../components/HelpButton';

/**
 * OutstandingScreen shows a list of the outstanding attestation request for this peer.
 */

const OutstandingScreen: React.FC = () => {
    const [outstanding, setOutstanding] = useState([])
    const state = useTrackedState()
    const url = state.serverURL + '/attestation?type=outstanding'
    const data = { method: 'GET', headers: {"Authorization" : state.jwt}, body: "" }

    useEffect(() => {
        fetch(url,data)
            .then((response) => response.json())
            .then((json) => setOutstanding(json))
            .catch((error) => console.error(error));
    }, []);

    const deleteOutstanding = (id: string) => {
        setOutstanding((outsList) => {
            return outsList.filter((out) => out[0] + "" +  out[1] !== id);
        });
    };


    return (
        <View style = {state.darkMode ? styles.dark : styles.light}>
            <View style = {state.darkMode ? styles.darktext : styles.lighttext}>
                <Text style = {state.darkMode ? styles.titleDark : styles.title}>Outstanding</Text>
                <Text style = {state.darkMode ? styles.subtitleDark : styles.subtitle}>Here you can see attestation requests from users of the network. If you accept a claim you will officially sign their request as true.</Text>
            </View>
            {outstanding.length>0 ?
                <ScrollView>
                    <FlatList
                        data={outstanding}
                        keyExtractor={(item, index) => item[0] + "" + item[1]}
                        renderItem={({ item }) => (
                            <OutstandingView
                                listID={item[0] + "" + item[1]}
                                outstanding={{ creatorID: item[0], type: item[1] }}
                                deleteOutstanding={deleteOutstanding} />
                        )} />
            </ScrollView>:
            <Text style={{fontSize:16, borderWidth:1,padding:5}}>NO PENDING REQUESTS</Text>}
            <DrawerButton />
            <HelpButton />
        </View>
    )
}

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
    dark: {
        flex: 1,
        backgroundColor: "#222",
        alignContent:'center',
        alignItems:'center'
    },
    light: {
        flex: 1,
        backgroundColor: "#fff",
        alignContent:'center',
        alignItems:'center'
    },
    darkColor: {
        color: "#fff"
    },
    lightColor: {
        color: "#000"
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
        margin: 10
    },
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#fff",
        alignItems: "center"
    },
    lighttext: {
        position: "relative",
        top: 100,
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000",
        alignItems: "center"
    },
    title: {
        position: "relative",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    titleDark: {
        position: "relative",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
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

export default OutstandingScreen;
