import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { OutstandingRequest } from '../Store'

interface outstandingProps {
    listID: number
    outstanding: OutstandingRequest
    deleteOutstanding: Function

}

const outstandingView: React.FC<outstandingProps> = ({ listID, outstanding, deleteOutstanding }: outstandingProps) => {
    return (
        <View >
            <Text >{"Type: " + outstanding.type}</Text>
            <Text >{"Creator: " + outstanding.creatorID}</Text>
        </View>
    )
}

export default outstandingView;