import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';


const SettingsScreen: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>This is your settings menu!</Text>
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

export default SettingsScreen
