import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Base64 } from "js-base64"
import { useTrackedState } from "../Store";

/**
 * Generic accept button for the CertificateView and Outstandingview.
 */

interface AcceptProps {
  attester: string
  deleteCert: Function,
  listID: number,
  type: string,
  postType: number
}

const postCertificate = (state: any, attester: string, type: string) => {
  // we have to uri encode our attester string
  const url = state.serverURL + "/attestation?type=request&mid=" + encodeURIComponent(attester) + "&attribute_name=" + type
  const data = { method: 'POST', headers: {}, body: "" }
  return fetch(url, data)
    .then((response) => {
      console.log(
        response
      )
    })
    .catch((error) => {
      console.error(error);
    });
}

const postOutstanding = (state: any, attestee: string, type: string, value: string) => {
  // we have to uri encode our attester string and base64 + uri encode our value
  const b64value = encodeURIComponent(Base64.encode(value))
  const url = state.serverURL + "/attestation?type=attest&mid=" + encodeURIComponent(attestee) + "&attribute_name=" + type + "&attribute_value=" + b64value
  const data = { method: 'POST', headers: {}, body: "" }
  return fetch(url, data)
    .then((response) => {
      console.log(
        response
      )
    })
    .catch((error) => {
      console.error(error);
    });
}

const AcceptButton: React.FC<AcceptProps> = ({ attester, deleteCert, listID, type, postType }: AcceptProps) => {
  const state = useTrackedState()
  return (
    <TouchableOpacity onPress={() => {
      if (postType == 0) postCertificate(state, attester, type);             // send an attestation request to creator of certificate
      if (postType == 1) postOutstanding(state, attester, type, "positive")  // or send a reply to an outstanding request
      deleteCert(listID)                                                     // and then delete it from the list
    }}>
      <View
        style={{
          backgroundColor: "#74d14c",
          borderRadius: 4,
          position: "relative",
          marginLeft: 2,
          bottom: 9,
        }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            width: 145,
            height: 35,
            textAlign: "center",
            textAlignVertical: "center",
          }}> ACCEPT </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AcceptButton;
