import React from 'react';
import {View, Text} from 'react-native';

interface AttributeProps{
    attributeName : String
    attester : String
    attributeValue : String
}

const Attribute: React.FC<AttributeProps> = ({attributeName, attester, attributeValue}: AttributeProps) => {
  return (
    <View>
      <Text> Name= {attributeName}, Attester= {attester}, HashValue= {attributeValue} </Text>
    </View>
  );
};

export default Attribute;
