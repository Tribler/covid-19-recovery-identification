import React, { useState } from 'react'
import { StyleSheet, Text,  View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DrawerButton from '../components/DrawerButton';
import Dropdown from 'react-dropdown';
import { useTrackedState, Certificate, State } from '../Store';
import CreateCertificate from '../network/CreateCertificate';



const options = [
    { value: "select-certificate", label: "Select Certificate..." },
    { value: "covid-immunity", label: "COVID-19 Immunity" }
]

const createNewCertificate = (creator: string, holder: string, certType: string, state: State) => {
    const certificate: Certificate = {
        creatorID: creator,
        holderID: holder,
        type: certType
    }
    CreateCertificate(certificate, state)
}

const changeHolderId = (text: string, setHolderID: Function) => {
    if (!isNaN(text as any)) {
        setHolderID(text)
    }
}

const NewCertificateScreen: React.FC = () => {
    const [certificateType, setCertificateType] = useState("covid-immunity")
    const [holderID, setHolderID] = useState("")
    const state = useTrackedState()
    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>New Certificate {"\n"}{"\n"}{"\n"}</Text>
            <View style={styles.dropdown} >
                <Dropdown
                    options={options}
                    placeholder="Select Certificate..."
                    onChange={(selection) => setCertificateType(selection.value)}></Dropdown>
            </View>
            <TextInput
                style={styles.textInput}
                value={holderID.toString()}
                onChangeText={value => changeHolderId(value, setHolderID)}
                label="Holder ID">
            </TextInput>
            <Button mode="contained" onPress={() => createNewCertificate(state.ID, holderID, certificateType, state)}>CREATE CERTIFICATE</Button>
            <DrawerButton />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily: "Sans-serif",
        color: "#000",
        borderWidth: 1,
        margin: 15,
        padding: 5,
        justifyContent: 'center'
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
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
       
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    dark: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});


export default NewCertificateScreen
