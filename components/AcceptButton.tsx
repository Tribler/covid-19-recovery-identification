import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Base64 } from "js-base64"
import { useTrackedState } from "../Store";
import {DeleteCertificate, PostCertificate, PostOutstanding} from "../network/NetworkCalls"


/**
 * Generic accept button for the CertificateView and Outstandingview.
 */

interface AcceptProps {
  attester: string
  deleteCert: Function,
  listID: string,
  type: string,
  postType: number
}

const AcceptButton: React.FC<AcceptProps> = ({ attester, deleteCert, listID, type, postType }: AcceptProps) => {
  const state = useTrackedState()
  return (
    <TouchableOpacity onPress={() => {
      if (postType == 0) PostCertificate(state, attester, type);             // send an attestation request to creator of certificate
      if (postType == 1) PostOutstanding(state, attester, type, "positive")  // or send a reply to an outstanding request
      DeleteCertificate(state, listID)                                       // delete from local storage
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
