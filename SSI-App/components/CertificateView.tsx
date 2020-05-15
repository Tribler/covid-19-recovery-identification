import React, { useState } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import { Certificate, useTrackedState } from '../Store'
import { Text, Divider } from 'react-native-paper'

interface CertificateProps {
    certificate: Certificate,
    onClick: Function
}

const checkUserIsOwner = (userId: string, id: string) => {
    return (userId == id ? "You" : id) 
}

const CertificateView:React.FC<CertificateProps> = ({certificate, onClick}:CertificateProps) => {
    const navigation = useNavigation()
    const state = useTrackedState()

    const [dialogOpen, setDialogOpen] = useState(false)

    return(
        <div onClick = {() => onClick()} style = {certificateStyle}>
            <Divider style = {styles.container}>
                <Text style = {styles.labelDivision}>{"Type: " + certificate.type}</Text>
                <Text style = {styles.labelDivision}>{"Holder: " + checkUserIsOwner(state.ID, certificate.holderID)}</Text>
                <Text style = {styles.labelDivision}>{"Creator: " + checkUserIsOwner(state.ID, certificate.creatorID)}</Text>
            </Divider>
        </div>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },

    labelDivision: {
        borderWidth:  2,
        borderRadius: 1,
        borderColor: 'gray',
        padding: 3
    },
});

const certificateStyle =  {
    margin:20,
    innerHeight:10,
    font: 'Open Sans'
}


export default CertificateView