import React from 'react'
import { Dialog, Button } from 'react-native-paper'
import { Text, Modal} from 'react-native'
import { useTrackedState, attributeTypeMap } from '../Store'
import { PostCertificate } from '../network/NetworkCalls'



interface DialogueProps {
    type: string
    verifier:string
    visible:boolean
    setVisible: Function
  }


const AllowVerificationDialogue: React.FC<DialogueProps> = ({type, verifier, visible, setVisible}:DialogueProps) => {
    const state= useTrackedState()
    const allowVerification=() => {
        console.error("NOT IMPLEMENTED YET")
        setVisible(false)
    }

    return (
      <Modal
        visible={visible}
        transparent={true}
        onDismiss={() => setVisible(false)}
      >
        <Dialog
             visible={visible}
             onDismiss={()=> setVisible(false)}
             style={{alignItems:'center'}}>
            <Dialog.Title accessibilityStates>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Text style ={{fontWeight:'bold'}}>Allow user {verifier} to verify attribute: {attributeTypeMap[parseInt(type)].value}? </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button accessibilityStates mode='contained' style={{width: 80, marginRight:50, backgroundColor:'green'}} onPress={allowVerification}>ALLOW</Button>
              <Button accessibilityStates mode='contained' style={{ backgroundColor:'red'}} onPress={() => setVisible(false) }>DO NOT ALLOW</Button>
            </Dialog.Actions>
          </Dialog>
      </Modal>
    )
}

export default AllowVerificationDialogue

