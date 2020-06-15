import React, { useState } from 'react'
import { View, Modal} from 'react-native'
import { TextInput, Text, Button } from 'react-native-paper'
import { TouchableOpacity} from 'react-native'
import { Certificate } from '../Store'
import QRCode from "react-qr-code"



interface QRModalProps {
    data: string
    visible:boolean
    setVisible: Function
  }

const BasicQRModal: React.FC<QRModalProps> = ({data, visible, setVisible}:QRModalProps) => {

    return (
        <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                  }}
                onDismiss= {() => {
                    setVisible(false)
                  }}  
                  >
            <TouchableOpacity
                onPressOut={() => setVisible(false)}
                style={{height:'100%', width:'100%', justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'rgba(1,1,1,0)'}}
                
            >
                <View style = {{margin: 10}}>
                    <QRCode value={data} />
                </View>                

                <Text accessibilityStates>Touch anywhere to close</Text>
            </TouchableOpacity>
        </Modal>
    )
}

export default BasicQRModal

