import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import { Certificate, useTrackedState } from '../Store'
import DeclineButton from '../components/DeclineButton';
import AcceptButton from '../components/AcceptButton';
import CertificateView from './CertificateView';

interface CertificateProps {
    certificate: Certificate
}

const checkUserIsOwner = (userId: string, id: string) => {
    return (userId == id ? "You" : id)
}

const CertificateViewDashboard: React.FC<CertificateProps> = ({certificate}: CertificateProps) => {
    const state = useTrackedState()
    return (
        <CertificateView certificate = {certificate}/>
    )
}

const styles = StyleSheet.create({
    buttonPair: {
        left: 35,
        flexDirection: "row",
        top: 20
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    labelDivision: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3,
        paddingVertical: 0
    },
});

const certificateStyle = {
    margin: 20,
    innerHeight: 10,
    font: 'Open Sans',
}

export default CertificateViewDashboard
