import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { OutstandingRequest } from '../Store'
import AcceptButton from './AcceptButton'
import DeclineButton from './DeclineButton'

/**
 * OutstandingView is an element for the FlatList in OutstandingScreen.
 */

interface OutstandingProps {
    listID: number
    outstanding: OutstandingRequest
    deleteOutstanding: Function

}

const OutstandingView: React.FC<OutstandingProps> = ({ listID, outstanding, deleteOutstanding }: OutstandingProps) => {
    return (
        <View >
            <Text >Type: {outstanding.type}, Creator: {outstanding.creatorID}</Text>
            <View style={styles.buttonPair}>
                    <AcceptButton
                     attester={outstanding.creatorID}
                     deleteCert={deleteOutstanding}
                     listID={listID}
                     type={outstanding.type}
                     postType={1}
                    />
                    <Text>{"\r"}</Text>
                    <DeclineButton
                     listID={listID} 
                     deleteCert={deleteOutstanding} // we pass the deleteCert function from inboxscreen to the declinebutton
                     />  
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonPair: {
        left: 35,
        flexDirection: "row",
        top: 20
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    labelDivision: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3,
        paddingVertical: 0
    },
});

export default OutstandingView;