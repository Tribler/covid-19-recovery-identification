import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface DeclineProps {
  listID: number,
  deleteCert: Function,
}

const DeclineButton: React.FC<DeclineProps> = ({ listID, deleteCert }: DeclineProps) => {
  return (
    <TouchableOpacity
      onPress={() => deleteCert(listID)} > {/* if pressed, delete the certficiate with the id which this button is attached to  */}
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 4,
          position: "relative",
          marginRight: 200,
          bottom: 9,
          right: 3,
        }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            width: 150,
            height: 35,
            textAlign: "center",
            textAlignVertical: "center",
          }}> DECLINE </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeclineButton;
