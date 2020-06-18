import React, { useState, useEffect } from 'react'
import { View, Modal, Image, Text, StyleSheet } from 'react-native'
import { Dialog, Button, Portal } from 'react-native-paper'
import { useTrackedState } from '../Store'



interface DialogueProps {
  verificationResponse: any
  visible: boolean
  setVisible: Function
}


const VerificationDialogue: React.FC<DialogueProps> = ({ verificationResponse, visible, setVisible }: DialogueProps) => {
  const [verified, setVerified] = useState(false)
  const [verifiedOutput, setVerifiedOutput] = useState([])
  const state = useTrackedState()

  useEffect(() => {
    const url = state.serverURL + "/attestation?type=verification_output"
    const data = { method: 'GET', headers: { "Authorization": state.jwt }, body: "" }
    fetch(url, data)
      .then((response) => response.json())
      .then((json) => setVerifiedOutput(json))
      .then(() => checkVerified)
      .catch((error) => console.error(error));
  })

  const checkVerified = (attributeHash: string) => {
    const output =  verifiedOutput.filter((item) => item[0] == attributeHash)
    setVerified(Math.round(output[1]) > 98)
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      onDismiss={() => setVisible(false)}
    >
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ alignItems: 'center' }}>
        <Dialog.Title accessibilityStates>Verification</Dialog.Title>
        <Dialog.Content>
          <Text>Hash: {verificationResponse} </Text>
          {verified ?
            <View style={{ alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                style={styles.validityImage}
                source={require('../assets/check_mark.png')}>
              </Image>
              <Text style={{ fontWeight: 'bold', borderColor: 'green', color: 'green', borderWidth: 1, padding: 5 }}>VERIFIED</Text>
            </View>
            :
            <View style={{ alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                style={styles.validityImage}
                source={require('../assets/cross_mark.png')}>
              </Image>
              <Text style={{ fontWeight: 'bold', borderColor: 'red', color: 'red', borderWidth: 1, padding: 5 }}>NOT VERIFIED</Text>
            </View>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button accessibilityStates mode='contained' style={{ width: 80, backgroundColor: 'dodgerblue' }} onPress={() => setVisible(false)}>CLOSE</Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  )
}

const styles = StyleSheet.create({
  validityImage: {
    height: 200,
    width: 200,
    margin: 5
  }
})

export default VerificationDialogue

