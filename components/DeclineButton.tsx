import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

interface DeclineProps {
  listID: string;
  deleteCert: Function;
}

const DeclineButton: React.FC<DeclineProps> = ({deleteCert}: DeclineProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        deleteCert();
      }} // if pressed, delete the certficiate with the id which this button is attached to
    >
      <View
        style={{
          backgroundColor: 'red',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 25,
          }}
        >
          {' '}DECLINE{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeclineButton;
