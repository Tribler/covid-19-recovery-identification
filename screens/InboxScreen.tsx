import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
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
        <View style={styles.light}>
            <Text style={styles.lighttext}> My Inbox <br /><br /><br /></Text>
            <div style={{ float: "left", margin: 1 }}>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <button style={{
                    color: "green",
                    position: "relative",
                    left: 20,
                    bottom: 10,
                    height: 50,
                    width: 150
                }}>Accept</button>
                <button
                    style={{
                        color: "red",
                        position: "relative",
                        left: 17,
                        bottom: 10,
                        height: 50,
                        width: 150
                    }}>Decline</button>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <button style={{
                    color: "green",
                    position: "relative",
                    left: 20,
                    bottom: 10,
                    height: 50,
                    width: 150
                }}>Accept</button>
                <button
                    style={{
                        color: "red",
                        position: "relative",
                        left: 17,
                        bottom: 10,
                        height: 50,
                        width: 150
                    }}>Decline</button>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <button style={{
                    color: "green",
                    position: "relative",
                    left: 20,
                    bottom: 10,
                    height: 50,
                    width: 150
                }}>Accept</button>
                <button
                    style={{
                        color: "red",
                        position: "relative",
                        left: 17,
                        bottom: 10,
                        height: 50,
                        width: 150
                    }}>Decline</button>
                <CertificateView certificate={mockCert} onClick={() => console.log("wooow")} />
                <button style={{
                    color: "green",
                    position: "relative",
                    left: 20,
                    bottom: 10,
                    height: 50,
                    width: 150
                }}>Accept</button>
                <button
                    style={{
                        color: "red",
                        position: "relative",
                        left: 17,
                        bottom: 10,
                        height: 50,
                        width: 150
                    }}>Decline</button>
            </div>
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

export default InboxScreen
