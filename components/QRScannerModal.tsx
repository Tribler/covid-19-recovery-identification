import React from 'react'
import { Text, StyleSheet, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
interface QRScannerModalProps {
  visible:boolean
  setVisible:Function
  onRead:Function
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({visible,setVisible, onRead}) => {
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
          <TouchableOpacity style={{backgroundColor:'white', flex:1}}
              onPressOut={() => setVisible(false)}>
              <QRCodeScanner 
                      onRead={(e) => { 
                        setVisible(false)
                        onRead(e.data)}}
                      bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable} onPressOut={() => setVisible(false)}>
                          <Text style={styles.buttonText}>CLOSE</Text>
                        </TouchableOpacity>
                      }
                    />
          </TouchableOpacity>    
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    buttonText: {
      fontSize: 21,
      color: 'white'
    },
    buttonTouchable: {
      padding: 16,
      backgroundColor: 'dodgerblue',
      borderRadius:5
    }
  });

export default QRScannerModal

