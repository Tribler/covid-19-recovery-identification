import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {  Button, Divider, TextInput } from 'react-native-paper';
import DrawerButton from '../components/DrawerButton';
import Dropdown from 'react-dropdown';
import { useTrackedState, Certificate, State } from '../Store';
import createCertificate from '../network/createCertificate';

const options = [
    {value: "covid-immunity", label: "COVID-19 Immunity"}
]

const createNewCertificate = (creator: string, holder: string, certType : string, state : State) => {
    const certificate : Certificate = {
        creatorID: creator,
        holderID: holder,
        type: certType

    }
    createCertificate(certificate, state)
}

const changeHolderId = (text : string, setHolderID : Function) => {
    if(!isNaN(text as any)){
        setHolderID(text)
    }
}

const NewCertificateScreen: React.FC = () => {
    const [certificateType, setCertificateType] = useState("covid-immunity")
    const [holderID, setHolderID] = useState("")
    const state = useTrackedState()

    return(
        <View style={styles.container }>
            <Text style = {styles.title}>This is the new certificate screen!</Text>
            <View style = {styles.dropdown} >
                <Text>Choose a certificate type: </Text>
                <Dropdown 
                    value = {certificateType} 
                    options = {options} 
                    placeholder = "Choose certificate type" 
                    onChange = {(selection) => setCertificateType(selection.value)}></Dropdown>
            </View>
            <TextInput
                style = {styles.textInput}
                value = {holderID.toString()} 
                onChangeText = {value => changeHolderId(value, setHolderID)}
                label = "Holder ID">
            </TextInput>
            <Button mode = "contained" onPress = {() =>createNewCertificate(state.ID, holderID, certificateType, state)}>CREATE CERTIFICATE</Button>

            <DrawerButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },

    dropdown: {
      backgroundColor: '#fff',
      fontSize: 15,
      borderWidth: 1,
      margin:15,
      padding: 5
    },

    textInput: {
        margin: 10
    }
});



export default NewCertificateScreen