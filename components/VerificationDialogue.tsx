import React, { useState } from 'react';
import { View, Modal, Image, Text, StyleSheet } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import { useTrackedState } from '../Store';
import { useFocusEffect } from '@react-navigation/native';

interface DialogueProps {
  verificationResponse: any;
  visible: boolean;
  setVisible: Function;
}

const VerificationDialogue: React.FC<DialogueProps> = ({
  verificationResponse,
  visible,
  setVisible,
}: DialogueProps) => {
  const [verified, setVerified] = useState(false);
  const [, setInput] = useState([]);
  const state = useTrackedState();
  const updateInterval = 500; // how many milliseconds between api calls

  useFocusEffect(() => {
    const interval = setInterval(() => {
      if (visible) {
        // If visible and while the screen is in focus, we will fetch the output of verification.
        const url = state.serverURL + '/attestation?type=verification_output';
        const data = { method: 'GET', headers: { Authorization: state.jwt }, body: '' };
        fetch(url, data)
          .then((response) => response.json())
          // Map the object into an array
          .then((json) => setInput(checkVerified(Object.entries(json))))
          .catch((error) => console.error(error));
      }
    }, updateInterval);
    return () => clearInterval(interval);
  });

  const checkVerified = (data: any) => {
    // From the output, get the hash you want.
    const output = data.filter((item: any) => item[0] == verificationResponse);
    if (output.length > 0) {
      // check if the output is 0.99, thus correct.
      setVerified(Math.abs(1.0 - output[0][1][0][1]) < 0.1);
    }
    return output;
  };

  return (
    <Modal visible={visible} transparent={true} onDismiss={() => setVisible(false)}>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ alignItems: 'center' }}
      >
        <Dialog.Title accessibilityStates>Verification</Dialog.Title>
        <Dialog.Content>
          <Text>Hash: {verificationResponse} </Text>
          {verified ? (
            <View style={{ alignItems: 'center' }}>
              <Image
                resizeMode="cover"
                style={styles.validityImage}
                source={require('../assets/check_mark.png')}
              ></Image>
              <Text
                style={{
                  fontWeight: 'bold',
                  borderColor: 'green',
                  color: 'green',
                  borderWidth: 1,
                  padding: 5,
                }}
              >
                VERIFIED
              </Text>
            </View>
          ) : (
              <View style={{ alignItems: 'center' }}>
                <Image
                  resizeMode="cover"
                  style={styles.validityImage}
                  source={require('../assets/cross_mark.png')}
                ></Image>
                <Text
                  style={{
                    fontWeight: 'bold',
                    borderColor: 'red',
                    color: 'red',
                    borderWidth: 1,
                    padding: 5,
                  }}
                >
                  NOT VERIFIED
              </Text>
              </View>
            )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            accessibilityStates
            mode="contained"
            style={{ width: 80, backgroundColor: 'dodgerblue' }}
            onPress={() => setVisible(false)}
          >
            CLOSE
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
};

const styles = StyleSheet.create({
  validityImage: {
    height: 200,
    width: 200,
    margin: 5,
  },
});

export default VerificationDialogue;
