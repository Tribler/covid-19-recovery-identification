import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
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
            <View style={{ float: "left", margin: 1, top: 50 }}>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>
                    <Button
                        color= "green"
                        title= "Accept"
                        margin= "10"
                    />
                    <Text>{"\r"}</Text>
                    <Button
                        color= "red"
                        title= "Decline"
                        margin= "10"
                    />
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>
                    <Button
                        color= "green"
                        title= "Accept"
                    />
                    <Button
                        color= "red"
                        title= "Decline"
                    />
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <View style={styles.buttonPair}>
                    <Button
                        color= "green"
                        title= "Accept"
                    />
                    <Button
                        color= "red"
                        title= "Decline"
                    />
                </View>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")}/>
                <View style={styles.buttonPair}>
                    <Button
                        color= "green"
                        title= "Accept"
                    />
                    <Button
                        color= "red"
                        title= "Decline"
                    />
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

export default InboxScreen
