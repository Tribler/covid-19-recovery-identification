import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import CertificateView from '../components/CertificateView';
import { Certificate } from '../Store';


const InboxScreen: React.FC = () => {
    const mockCert : Certificate = {
        creatorID : "0",
        holderID : "1",
        type: "covid-immunity",
    }

    return(
        <View style={styles.light}>
            <Text style={styles.lighttext}> My Inbox <br/><br/><br/></Text>
            <div style = {{float:"left", margin: 1}}>
                <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
                <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
                <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
                <CertificateView certificate = {mockCert} onClick = {() => console.log("wooow")}/>
            </div>
            <DrawerButton/>
        </View>

       
    )
}

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily:"Sans-serif",
        color:"#000",
        borderWidth: 1,
        margin:15,
        padding: 5,
        justifyContent: 'center'
      },
  
      textInput: {
          margin: 10
      },
      darktext: {
          position: "relative",
          top:30,
  
          fontWeight: "bold",
          verticalAlign:'top',
          fontSize:60,
          fontFamily:"Sans-serif",
          color:"#fff"
      },
      lighttext: {
          position: "relative",
          top:30,
  
          fontWeight: "bold",
          verticalAlign:'top',
          fontSize:60,
          fontFamily:"Sans-serif",
          color:"#000"
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