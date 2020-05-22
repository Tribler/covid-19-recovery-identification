
import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import DrawerButton from "../components/DrawerButton";
import Attribute from "../components/Attribute";

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
        </View>
    )
}

export default AttestationScreen;