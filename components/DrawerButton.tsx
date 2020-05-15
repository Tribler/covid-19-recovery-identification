import React from 'react'
import { Button, Title } from 'react-native-paper'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { View } from 'react-native'

const DrawerButton:React.FC = () => {
    const navigation = useNavigation()
    return(
        <Button 
            style = {{
                position: "absolute", 
                top: 0,
                left: 0,
            }}

            mode = "outlined" 
            icon = "menu" 
            onPress = {() => {navigation.dispatch(DrawerActions.openDrawer())}}>
            Menu
        </Button>
    )
}


export default DrawerButton