import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import OutstandingView from '../components/OutstandingView'
import DrawerButton from '../components/DrawerButton';

const OutstandingScreen: React.FC = () => {
    const [outstanding, setOutstanding] = useState([])

    useEffect(() => {
        fetch('http://localhost:14411/attestation?type=outstanding')
            .then((response) => response.json())
            .then((json) => setOutstanding(json))
            .catch((error) => console.error(error));
    }, []);

    const deleteOutstanding = (id: number) => {
        setOutstanding((outsList) => {
            return outsList.filter((out) => out.id !== id);
        });
    };



    return (
        <View>
            <FlatList
                data={outstanding}
                renderItem={({ item }) => (
                    <OutstandingView
                        listID={item.index}
                        outstanding={{ creatorID: item[0], type: item[1] }}
                        deleteOutstanding={deleteOutstanding}
                    />
                )}
            />
            <DrawerButton />
        </View>
    )


}

export default OutstandingScreen;