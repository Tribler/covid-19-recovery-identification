import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Modal} from 'react-native'
import { TouchableOpacity} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';



const QRModal: React.FC = () => {
    const [visible, setVisible] = useState(false)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
                }}
            onDismiss= {() => {
                setVisible(false)
                }}  
                >

            <QRCodeScanner
                    onRead={(e) => console.log(e)}
                    topContent={
                      <Text style={styles.centerText}>
                        Go to{' '}
                        <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                        your computer and scan the QR code.
                      </Text>
                    }
                    bottomContent={
                      <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                      </TouchableOpacity>
                    }
                  />
            <View style = {{margin: 10}}>
                
            </View>           
        </Modal>
        
    )
}

const modalStyle = {
    borderRadius:10,
    margin:10,
    backgroundColor:'green',
    justifyContent: "center",
    aligntItems:"center",
    flex:1
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default QRModal

