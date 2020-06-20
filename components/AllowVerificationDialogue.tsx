import React, { useState, useEffect } from 'react'
import { Dialog, Button } from 'react-native-paper'
import { Text, Modal} from 'react-native'
import { useTrackedState, State } from '../Store'
import {AllowVerification, DeclineVerification, GetVerificationRequests} from '../network/NetworkCalls'



interface DialogueProps {
    type: string
    verifier:string
  }

/*
  Sends a request to the backend to check if there are any pending verification requests, 
  if there are, then it sets the first one as the dialogue request and makes the dialogue visible */
const checkForRequests = (state:State, setRequest:Function, setVisible:Function) => {
  GetVerificationRequests(state, (response:any) => {
    if(response.length > 0) {
      setRequest(response[0])
      setVisible(true)
  }})  
}


const AllowVerificationDialogue: React.FC<DialogueProps> = () => {
  const state = useTrackedState()
  const [ visible, setVisible]= useState(false)
  const [ request, setRequest]= useState([])

  useEffect(() => checkForRequests(state, setRequest, setVisible))

  const allowVerification=() => {
      AllowVerification(state, request[0], request[1])
      setVisible(false)
  }

  const declineVerification = () => {
      DeclineVerification(state, request[0], request[1])
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
          <Dialog.Title accessibilityStates>Allow Verification?</Dialog.Title>
          <Dialog.Content>
            <Text style ={{fontWeight:'bold'}}>Allow user {request[0]} to verify attribute: {request[1]}? </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button accessibilityStates mode='contained' style={{width: 80, marginRight:50, backgroundColor:'green'}} onPress={allowVerification}>ALLOW</Button>
            <Button accessibilityStates mode='contained' style={{ backgroundColor:'red'}} onPress={declineVerification}>DO NOT ALLOW</Button>
          </Dialog.Actions>
        </Dialog>
    </Modal>
  )
}

export default AllowVerificationDialogue

