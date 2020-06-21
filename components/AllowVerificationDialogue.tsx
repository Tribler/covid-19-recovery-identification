import React, {useState, useEffect} from 'react';
import {Dialog, Button} from 'react-native-paper';
import {Text, Modal} from 'react-native';
import {useTrackedState} from '../Store';
import {allowVerification, declineVerification} from '../network/NetworkCalls';

/*
  Sends a request to the backend to check if there are any pending verification requests,
  if there are, then it sets the first one as the dialogue request and makes the dialogue visible */
const checkForRequests = (data: any, setVisible: Function) => {
  if (data.length > 0) {
    setVisible(true);
    return data[0];
  }
  return data;
};

const AllowVerificationDialogue: React.FC = () => {
  const state = useTrackedState();
  const [visible, setVisible] = useState(false);
  const [request, setRequest] = useState([]);
  const updateInterval = 1000; // how many milliseconds between api calls

  useEffect(() => {
    const interval = setInterval(() => {
      if (!visible) {
        const url = state.serverURL + '/attestation?type=outstanding_verify';
        const data = {
          method: 'GET',
          headers: {Authorization: state.jwt},
          body: '',
        };
        fetch(url, data)
            .then((response) => response.json())
        // Map the object into an array
            .then((json) => setRequest(checkForRequests(json, setVisible)))
            .catch((error) => console.error(error));
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const allowVerificationHandler = () => {
    allowVerification(state, request[0], request[1], () => setRequest([]));
    setVisible(false);
  };

  const declineVerificationHandler = () => {
    declineVerification(state, request[0], request[1], () => setRequest([]));
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} onDismiss={() => setVisible(false)}>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{alignItems: 'center'}}
      >
        <Dialog.Title accessibilityStates>Allow Verification?</Dialog.Title>
        <Dialog.Content>
          <Text style={{fontWeight: 'bold'}}>
            Allow user {request[0]} to verify attribute: {request[1]}?{' '}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            accessibilityStates
            mode="contained"
            style={{width: 80, marginRight: 50, backgroundColor: 'green'}}
            onPress={allowVerificationHandler}
          >
            ALLOW
          </Button>
          <Button
            accessibilityStates
            mode="contained"
            style={{backgroundColor: 'red'}}
            onPress={declineVerificationHandler}
          >
            DO NOT ALLOW
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
};

export default AllowVerificationDialogue;
