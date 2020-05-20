import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation, DrawerActions } from '@react-navigation/native'

// TODO Button?
const DrawerButton: React.FC = () => {
    const navigation = useNavigation()
    return (
        <Button
            style={{
                position: "absolute",
                top: 0,
                left: 0,
            }}
            mode="outlined"
            icon="menu"
            onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer())
            }}> Menu </Button>
    )
}

export default DrawerButton
