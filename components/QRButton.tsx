import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const HelpButton: React.FC = () => {
    const navigation = useNavigation()
    return (
        <Button
            accessibilityStates =""
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
            mode="outlined"
            icon="help"
            onPress={() => {
                navigation.navigate('Help')
            }}> Help </Button>
    )
}

export default HelpButton
