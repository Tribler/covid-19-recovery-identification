import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Certificate } from '../Store'
import CertificateView from './CertificateView';
import { Modal } from 'react-native';

interface CertificateProps {
    certificate: Certificate
    modalVisible: Function
    setSelected: Function
}

const CertificateViewDashboard: React.FC<CertificateProps> = ({certificate, modalVisible, setSelected}: CertificateProps) => {
    return (
        <View style = {styles.container}>
            <CertificateView certificate = {certificate}/>
            <Button title="Show Proof" onPress ={() =>{ 
                setSelected(certificate)
                modalVisible(true)}}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPair: {
        left: 35,
        flexDirection: "row",
        top: 20
    },
    container: {
        margin: 5
    },
    labelDivision: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3,
        paddingVertical: 0
    },
});


export default CertificateViewDashboard
