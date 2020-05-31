
import React, {useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import DrawerButton from "../components/DrawerButton";
import Attribute from "../components/Attribute";
import HelpButton from "../components/HelpButton";

const AttestationScreen: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:14411/attestation?type=attributes')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
      }, []);

    return (
        <View>
            <View style = {styles.lighttext}>
                <Text style = {styles.title}>Attestations</Text>
            </View>

            <Text> Hello World </Text>
            {console.log(data[0])}
            <FlatList 
            data={data}
            renderItem={({ item }) => (
                <Attribute 
                    attributeName={JSON.stringify(item[0])}
                    attester={JSON.stringify(item[3])}
                    attributeValue = {JSON.stringify(item[1])}
                />
              )}
            />
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
    darktext: {
        alignItems: "center",
        position: "relative",
        marginTop: "15%",
        marginBottom: "5%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        alignItems: "center",
        position: "relative",
        marginTop: "15%",
        marginBottom: "5%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
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
        margin: "1%",
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default AttestationScreen;