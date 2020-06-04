import React, { useState } from 'react'
import { View, Button} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { TouchableOpacity} from 'react-native'
import { Certificate } from '../Store'



interface VerificationModalProps {
    attribute: Certificate
    setModalOpen: Function
  }

const closeshit = (setClosed: Function) => {
    console.log("Closing shit");
    setClosed(true)
}

const VerificationModal: React.FC<VerificationModalProps> = ({attribute, setModalOpen}:VerificationModalProps) => {
    const [verifierID,setVerifierID] = useState("")

    return (
        <TouchableOpacity
            onPress={() => setModalOpen(false)}
            style={{height:'100%', width:'100%', justifyContent:'center'}}
            
          >
            <View style = {{margin: 10}}>
                    <TextInput
                        accessibilityStates={true}
                        value={verifierID}
                        onChangeText={input => setVerifierID(input)}
                        label="Verifier ID">
                    </TextInput>

                    <Button
                        onPress={() => {
                            console.log("sending to verifier: " + verifierID);
                            setModalOpen(false)

                        }}
                        title={"SEND "+ attribute.type+ " PROOF"} >
                    </Button>
                </View>

            
        </TouchableOpacity>
    )
}

const modalStyle = {
    borderRadius:10,
    margin:10,
    backgroundColor:'green',
    justifyContent: "center",
    flex:1
}

export default VerificationModal

