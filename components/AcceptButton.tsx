import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useTrackedState } from "../Store";

interface AcceptProps {
  attester: string
  deleteCert: Function,
  listID : number,
  type : string
}



const postCertificate = (state: any, attester : string, type: string) => {
  const url = state.serverURL + "/attestation?type=request&mid=" + encodeURIComponent(attester) + "&attribute_name=" + type
  const data = {method: 'POST', headers: {}, body: ""}
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

const AcceptButton: React.FC<AcceptProps> = ({attester, deleteCert, listID, type} : AcceptProps) => {
  const state = useTrackedState()

  return (
    <TouchableOpacity onPress={() => {
      postCertificate(state, attester, type); // send an attestation request to creator of certificate
      deleteCert(listID)                      // and then delete it from the list
    }}>
      <View
        style={{
          backgroundColor: "#74d14c",
          borderRadius: 4,
          position: "relative",
          marginLeft: 2,
          bottom: 9,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            width: 145,
            height: 35,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          ACCEPT
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default AcceptButton;
