import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import { Certificate } from '../Store';
import CertificateView from '../components/CertificateView';


const InboxScreen: React.FC = () => {
    const mockCert: Certificate = {
        creatorID: "0",
        holderID: "1",
        type: "covid-immunity",
    }
    return (
        <View style={styles.light}><Text style={styles.lighttext}>My Inbox</Text>
            <View style={{ float: "left", margin: 1, top: 150 }}>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>

                <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
    <View style = {{backgroundColor: '#74d14c',borderRadius: 4, position:"relative",
    right:80, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:145, height:35, textAlign: "center", textAlignVertical:"center"}}>ACCEPT</Text>
    </View>
</TouchableOpacity>

                    <Text>{"\r"}</Text>
                    <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
 <View style = {{backgroundColor: 'red',borderRadius: 4, position:"relative",
    right:83, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:150, height:35, textAlign: "center", textAlignVertical:"center"}}>DECLINE</Text>
    </View>
</TouchableOpacity>
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>
                <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
    <View style = {{backgroundColor: '#74d14c',borderRadius: 4, position:"relative",
    right:80, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:145, height:35, textAlign: "center", textAlignVertical:"center"}}>ACCEPT</Text>
    </View>
</TouchableOpacity>

                    <Text>{"\r"}</Text>
                    <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
 <View style = {{backgroundColor: 'red',borderRadius: 4, position:"relative",
    right:83, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:150, height:35, textAlign: "center", textAlignVertical:"center"}}>DECLINE</Text>
    </View>
</TouchableOpacity>
                 
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <View style={styles.buttonPair}>
                <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
    <View style = {{backgroundColor: '#74d14c',borderRadius: 4, position:"relative",
    right:80, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:145, height:35, textAlign: "center", textAlignVertical:"center"}}>ACCEPT</Text>
    </View>
</TouchableOpacity>

                    <Text>{"\r"}</Text>
                    <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
 <View style = {{backgroundColor: 'red',borderRadius: 4, position:"relative",
    right:83, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:150, height:35, textAlign: "center", textAlignVertical:"center"}}>DECLINE</Text>
    </View>
</TouchableOpacity>
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>
                <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
    <View style = {{backgroundColor: '#74d14c',borderRadius: 4, position:"relative",
    right:80, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:145, height:35, textAlign: "center", textAlignVertical:"center"}}>ACCEPT</Text>
    </View>
</TouchableOpacity>

                    <Text>{"\r"}</Text>
                    <TouchableOpacity onPress = {() => Alert.alert('Simple Button pressed')}>
 <View style = {{backgroundColor: 'red',borderRadius: 4, position:"relative",
    right:83, bottom: 9}}
           >
        <Text style = {{fontWeight: "bold", color: 'white', width:150, height:35, textAlign: "center", textAlignVertical:"center"}}>DECLINE</Text>
    </View>
</TouchableOpacity>
                </View>
            </View>
            <DrawerButton />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPair: {
        left: 100,
        flexDirection: "row"
    },
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
        top: 100,
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

export default InboxScreen
