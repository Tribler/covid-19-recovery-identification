import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {OutstandingRequest, useTrackedState} from '../Store'; // eslint-disable-line no-unused-vars
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import {deleteOutstandingRequest} from '../hooks/NetworkCalls';

/**
 * OutstandingView is an element for the FlatList in OutstandingScreen.
 */

interface OutstandingProps {
  listID: string;
  outstanding: OutstandingRequest;
  deleteOutstanding: Function;
}

const OutstandingView: React.FC<OutstandingProps> = ({
  listID,
  outstanding,
  deleteOutstanding,
}: OutstandingProps) => {
  const state = useTrackedState();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{outstanding.type} Request</Text>
      <View style={styles.buttonPair}>
        <AcceptButton
          attester={outstanding.creatorID}
          deleteCert={deleteOutstanding}
          listID={listID}
          type={outstanding.type}
          postType={1}
        />
        <DeclineButton listID={listID} deleteCert={() => {
          deleteOutstanding(listID);
          deleteOutstandingRequest(state, outstanding.creatorID, outstanding.type);
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPair: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  container: {
    margin: 10,
  },
  label: {
    width: '100%',
    fontSize: 20,
    paddingHorizontal: 5,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
  },
});

export default OutstandingView;
