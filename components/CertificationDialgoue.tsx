import React, { useState } from 'react'
import { View, Modal} from 'react-native'
import { TextInput, Dialog, Button } from 'react-native-paper'
import { TouchableOpacity,Text} from 'react-native'
import { Certificate } from '../Store'



interface QRModalProps {
    data: string
    visible:boolean
    setVisible: Function
  }

const CertificationDialogue: React.FC<QRModalProps> = ({data, visible, setVisible}:QRModalProps) => {

    return (
        <Dialog
             visible={visible}
             onDismiss={()=> setVisible(false)}
             style={{alignItems:'center'}}>
            <Dialog.Title accessibilityStates>Confirmation</Dialog.Title>
            <Dialog.Content>
                <Text style ={{fontWeight:'bold'}}>Are you sure you want to add {data} to your chain? </Text>
                <Text>Data in your chain is only accessible through your explicit authorization</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button accessibilityStates mode='contained' style={{width: 80, marginRight:50, backgroundColor:'green'}} onPress={() => setVisible(false)}>ADD</Button>
              <Button accessibilityStates mode='contained' style={{ backgroundColor:'red'}} onPress={() => setVisible(false)}>DO NOT ADD</Button>
            </Dialog.Actions>
          </Dialog>
    )
}

export default CertificationDialogue

