import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Certificate, useTrackedState } from '../Store'

interface CertificateProps {
    certificate: Certificate
}

const checkUserIsOwner = (userId: string, id: string) => {
    return (userId == id ? "You" : id)
}

const CertificateView: React.FC<CertificateProps> = ({certificate}: CertificateProps) => {
    const state = useTrackedState()
    return (
        <View style = {styles.container}>
            <Text style={styles.labelDivision}>{"Type: " + certificate.type}</Text>
            <Text style={styles.labelDivision}>{"Creator: " + checkUserIsOwner(state.ID, certificate.creatorID)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor:'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        maxWidth:'100%'
    },
    labelDivision: {
        borderWidth: 2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3,
        paddingVertical: 0,
        flexWrap:'wrap'
    },
});

export default CertificateView
