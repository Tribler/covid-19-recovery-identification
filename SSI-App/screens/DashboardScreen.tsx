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
            <Text style={styles.certificate}>&nbsp;&nbsp;Certificate: immunity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <br/>
            <Text style={styles.certificate}>&nbsp;&nbsp;Certificate: health care proffesional &nbsp;&nbsp;</Text>
            <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
      
    },
    certificate: {
        position: "relative",
        top:100,
        right:350,

        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
      }
});

export default Dashboard