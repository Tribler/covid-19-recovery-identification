import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, View, Text } from 'react-native';
import OutstandingView from '../components/OutstandingView'
import DrawerButton from '../components/DrawerButton';
import { useTrackedState } from '../Store';
import HelpButton from '../components/HelpButton';

/**
 * OutstandingScreen shows a list of the outstanding attestation request for this peer.
 */

const OutstandingScreen: React.FC = () => {
    const [outstanding, setOutstanding] = useState([])
    const state = useTrackedState()
    const url = state.serverURL + '/attestation?type=outstanding'

    useEffect(() => {
        fetch(url)
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
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.lighttext}>Outstanding</Text>
                <Text style = {styles.subtitle}>Here you can see attestation requests from users of the network. If you accept a claim you will officially sign their request as true.</Text>
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

const styles = StyleSheet.create({
    container:{
        alignContent:'center',
        alignItems:'center'
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
    },header: {
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

export default OutstandingScreen;
