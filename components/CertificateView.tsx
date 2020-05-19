import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Certificate, useTrackedState } from '../Store'
import { Text, Divider } from 'react-native-paper'


interface CertificateProps {
    certificate: Certificate,
    onClick: Function
}

const checkUserIsOwner = (userId: string, id: string) => {
    return (userId == id ? "You" : id)
}

const CertificateView: React.FC<CertificateProps> = ({ certificate, onClick }: CertificateProps) => {
    const state = useTrackedState()
    return (
        <View onClick={() => onClick()} style={certificateStyle}>
            <Divider style={styles.container}>
                <Text style={styles.labelDivision}>{"Type: " + certificate.type}</Text>
                <Text style={styles.labelDivision}>{"Holder: " + checkUserIsOwner(state.ID, certificate.holderID)}</Text>
                <Text style={styles.labelDivision}>{"Creator: " + checkUserIsOwner(state.ID, certificate.creatorID)}</Text>
            </Divider>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default CertificateView
