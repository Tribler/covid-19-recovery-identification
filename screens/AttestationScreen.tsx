
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import DrawerButton from "../components/DrawerButton";
import Attribute from "../components/Attribute";
import HelpButton from "../components/HelpButton";
import { useTrackedState } from "../Store";

const AttestationScreen: React.FC = () => {
    const [data, setData] = useState([]);
    const state = useTrackedState()

    useEffect(() => {
        fetch(state.serverURL + '/attestation?type=attributes')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, []);

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Attestations</Text>
            </View>
            <Text> Hello World </Text>
            {console.log(data[0])}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Attribute
                        attributeName={JSON.stringify(item[0])}
                        attester={JSON.stringify(item[3])}
                        attributeValue={JSON.stringify(item[1])} />
                )} />
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
    }
})

export default AttestationScreen;
