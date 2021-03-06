import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useTrackedState} from '../Store';
import {postCertificate, postOutstanding} from '../hooks/NetworkCalls';

/**
 * Generic accept button for the CertificateView and Outstandingview.
 */

interface AcceptProps {
  attester: string;
  deleteCert: Function;
  listID: string;
  type: string;
  postType: number;
}

const AcceptButton: React.FC<AcceptProps> = ({
  attester,
  deleteCert,
  listID,
  type,
  postType,
}: AcceptProps) => {
  const state = useTrackedState();
  return (
    <TouchableOpacity
      onPress={() => {
        // send an attestation request to creator of certificate
        if (postType == 0) postCertificate(state, attester, type);
        // or send a reply to an outstanding request
        if (postType == 1) postOutstanding(state, attester, type, 'positive');
        deleteCert(listID); // and then delete it from the list
      }}
    >
      <View
        style={{
          backgroundColor: '#74d14c',
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
          {' '}ACCEPT{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AcceptButton;
