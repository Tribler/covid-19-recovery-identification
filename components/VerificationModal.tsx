import React, { useState } from 'react'
import { View, Button, Modal} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { TouchableOpacity} from 'react-native'
import { Certificate } from '../Store'
import QRCode from "react-qr-code"



interface VerificationModalProps {
    attribute: Certificate
    visible:boolean
    setVisible: Function
  }

const getHash = (attribute:Certificate) => {
    //const hash = attribute.hash ? attribute.hash : console.error("ATTRIBUTE IS NOT VERIFIED")
    return attribute.hash  
}

const VerificationModal: React.FC<VerificationModalProps> = ({attribute, visible, setVisible}:VerificationModalProps) => {
    const [verifierID,setVerifierID] = useState("")

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
            <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{height:'100%', width:'100%', justifyContent:'center'}}
                
            >
                <View style = {{margin: 10}}>

                    <QRCode value={JSON.stringify({holderID:attribute.holderID, hash:attribute.hash})} />

                    <TextInput
                        accessibilityStates={true}
                        value={verifierID}
                        onChangeText={input => setVerifierID(input)}
                        label="Verifier ID">
                    </TextInput>

                    <Button
                        onPress={() => {
                            console.log("sending to verifier: " + verifierID);
                            setVisible(false)

                        }}
                        title={"SEND "+ attribute.type+ " PROOF"} >
                    </Button>
                </View>                
            </TouchableOpacity>
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

export default VerificationModal

