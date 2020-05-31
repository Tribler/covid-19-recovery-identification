import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert, YellowBox} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import DrawerButton from '../components/DrawerButton';
import CreateCertificate from '../network/CreateCertificate';
import { useTrackedState, Certificate, State } from '../Store';
import HelpButton from '../components/HelpButton';

YellowBox.ignoreWarnings(['Animated:', 'Warning: component', 'Failed prop type']);

/*
 * The New Certificate screen is accessible only to attesters and they use it to inform an attestee of the data they want to add to the attestee's chain
*/

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
    if(holder){
    CreateCertificate(certificate, state);
    }
    else{
        Alert.alert(
            'Failure',
            'Please enter ID',
            [
              {
                text: 'Understood',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
    }
}



const NewCertificateScreen: React.FC = () => {
    const [certificateType, setCertificateType] = useState("1")
    const [holderID, setHolderID] = useState("")
    const state = useTrackedState()
    const options = [
        { value: "covid-immunity" }
    ]
    return (
        <View style={styles.light}>
            <View style = {styles.header}>
                <Text style = {styles.lighttext}>New Certificate</Text>
                <Text style = {styles.subtitle}>Here you can inform a holder of what data you want to add to their chain</Text>
            </View>

            <View style={styles.dropdown} >
                <Dropdown
                    data={options}
                    label="Choose..."
                    onChangeText = {(value:string, index:number) => setCertificateType((index +1).toString()) }
                >
                    
                </Dropdown>
            </View>
            <TextInput
                style={styles.textInput}
                value={holderID.toString()}
                onChangeText={input => setHolderID(input)}
                label="Holder ID">
            </TextInput>
            <Button
             mode="contained" 
             onPress={() => 
                {
                    createNewCertificate(state.ID, holderID, certificateType, state)
                    setHolderID("");
                }
            }>
              CREATE CERTIFICATE
              </Button>
            <DrawerButton />
            <HelpButton/>
        </View>
    )
}

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily: "Sans-serif",
        color: "#000",
        borderWidth: 1,
        margin: 0,
        padding: 5,
        justifyContent: 'center',
        width: 200
    },
    textInput: {
        margin: 10,
        width: 200,
        height: 100
    },
    darktext: {
        position: "relative",
        marginTop: "3%",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        marginTop: "3%",
        marginBottom: "5%",
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
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    subtitle: {
        fontSize: 15,
        margin: 5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    }
});

export default NewCertificateScreen
