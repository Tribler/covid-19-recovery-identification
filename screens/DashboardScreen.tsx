import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-paper'
import DrawerButton from '../components/DrawerButton';


const Dashboard: React.FC = () => {
    return(
        <View style={styles.container}>
            <Text>This is your Dashboard!</Text>
            <Button mode = "contained" onPress = {() => console.log("Hello World")}> "Press me to start your SSI adventure!" </Button>
            <DrawerButton></DrawerButton>
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

export default Dashboard
