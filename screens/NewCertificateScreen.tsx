import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DrawerButton from '../components/DrawerButton';
import { useTrackedState, Certificate, State } from '../Store';
import CreateCertificate from '../network/CreateCertificate';
//import { DropdownMenu } from 'react-native-dropdown-menu';
 import { Dropdown } from 'react-native-material-dropdown';

// const options = [
//     { value: "select-certificate", label: "Select Certificate..." },
//     { value: "covid-immunity", label: "COVID-19 Immunity" }
// ]


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
    const options = [
        { value: "select-certificate" },
        { value: "covid-immunity" }
    ]
    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>New Certificate</Text>
            <View style={styles.dropdown} >
                
               <Dropdown 
               data ={options}
               label="Choose..."
                ></Dropdown>

              
            </View>
            <TextInput
                style={styles.textInput}
                value={holderID.toString()}
                //onChangeText={value => changeHolderId(value, setHolderID)}
                label="Holder ID">
            </TextInput>
            <Button style={{ top: 200 }} mode="contained" onPress={() => createNewCertificate(state.ID, holderID, certificateType, state)}>CREATE CERTIFICATE</Button>
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
        justifyContent: 'center',
        top: 200,
        width: 200
    },
    textInput: {
        margin: 10,
        top: 200,
        width: 200,
        height: 50
    },
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",

        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        top: 80,
        fontWeight: "bold",

        fontSize: 40,
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
