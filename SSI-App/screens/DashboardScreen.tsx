import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import DrawerButton from '../components/DrawerButton';


const Dashboard: React.FC = () => {
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <h1 style={{fontWeight: "bold", verticalAlign:'top', fontSize:60}}>This is your Dashboard!</h1>
            
            <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
      
    }
});

export default Dashboard