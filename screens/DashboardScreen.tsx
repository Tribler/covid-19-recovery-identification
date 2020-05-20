import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import DrawerButton from '../components/DrawerButton';


const Dashboard: React.FC = () => {
    return (
        <View style={styles.light}>
            <Text style={styles.lighttext}>My Dashboard</Text>
            <Text style ={styles.instructions} >you can find your earned badges below</Text>
        <View style={styles.badges}>
    
            <View style={styles.twelvePointBurst}>
        <View style={styles.twelvePointBurstMain} />
        <View style={styles.twelvePointBurst30} />
        <View style={styles.twelvePointBurst60} />
        <Text style ={styles.badgeText}>Immunity</Text>

      </View>   
      
      </View> 
      <View style={styles.rectangle} >  
      </View>
            {/* <View style= {styles.certificate}>
                <Text> Acquired proofs</Text>
                <Text>{"\n"}</Text>
                <Text> AIDS immunity</Text>
                <Text> COVID-19 immunity</Text>
            </View> */}
        <DrawerButton></DrawerButton>
        </View>
    )
}

const styles = StyleSheet.create({
    darktext: {
        position: "relative",
        top: 30,
        fontWeight: "bold",
       
        fontSize: 60,
        fontFamily: "Sans-serif",
        color: "#fff"
    },
    lighttext: {
        position: "relative",
        top: 70,
        fontWeight: "bold",
      
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    dark: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    certificate: {
        width: 300,
        top: 100,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#fffffb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Sans-serif"
    },
    twelvePointBurstMain: {
        width: 100,
        height: 100,
        backgroundColor: "#74d14c",
        top:200,
        right:100,
        borderColor:"black"
      },
      twelvePointBurst30: {
        width: 100, 
        height: 100,
        position: 'absolute',
        backgroundColor: '#74d14c',
        borderColor:"black",
        top: 200,
        right: 100,
        transform: [
          {rotate: '30deg'}
        ],
        
      },
      twelvePointBurst60: {
        width: 100, 
        height: 100,
        position: 'absolute',
        backgroundColor: '#74d14c',
        top: 200,
        right: 100,
        borderColor:"black",
        transform: [
          {rotate: '60deg'}
        ]
      },
      badgeText:{
        top:140,
        right:80,
        fontWeight:"bold",
        
        

      },
      instructions:{
        top:80
      },
      rectangle: {
        width: 150,
        height: 200,
        backgroundColor: 'grey',
        opacity: 0.1,
        top:30,  
        right: 100
    }
});

export default Dashboard
