import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import CertificateView from '../components/CertificateView';
import { Certificate } from '../Store';


const InboxScreen: React.FC = () => {
    const mockCert : Certificate = {
        creatorID : "0",
        holderID : "1",
        type: "covid-immunity"
    }

    return(
        <View style={styles.container}>
            <Text>This is your inbox!</Text>
            <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
            <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
            <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
            <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
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
});

export default InboxScreen