import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

const AcceptButton: React.FC = () => {
  return (
    <TouchableOpacity onPress={() => Alert.alert("Accept Button pressed")}>
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
