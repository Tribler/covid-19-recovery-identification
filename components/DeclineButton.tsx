import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useTrackedState } from "../Store";

interface DeclineProps {
  attester: string,
  listID: number,
  deleteCert: Function,
}


const deleteCertificate = (state: any, attester : string) => {
  // we have to uri encode our attester string
  const url = state.serverURL + "/attestation/certificate?type=delete&mid=" + encodeURIComponent(attester) 
  const data = {method: 'POST', headers: {}, body: ""}
  console.log(encodeURIComponent(attester))
  return fetch(url,data)
  .then((response) => {
            console.log(
                response
            )
        })
  .catch((error) => {
    console.error(error);
  });
}

const DeclineButton: React.FC<DeclineProps> = ({ attester, listID, deleteCert }: DeclineProps) => {
  const state = useTrackedState()

  return (
    <TouchableOpacity
      onPress={() =>{
         deleteCertificate(state, attester);
         deleteCert(listID)}} //if pressed, delete the certficiate with the id which this button is attached to
    >
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 4,
          position: "relative",
          marginRight: 200,
          bottom: 9,
          right: 3,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            width: 150,
            height: 35,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          DECLINE
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeclineButton;
