import React from 'react';
import {Dialog, Button} from 'react-native-paper';
import {Text, Modal} from 'react-native';
import {useTrackedState} from '../Store';
import {postCertificate} from '../hooks/NetworkCalls';

interface DialogueProps {
  type: string;
  attester: string;
  visible: boolean;
  setVisible: Function;
}

const CertificationDialogue: React.FC<DialogueProps> = ({
  type,
  attester,
  visible,
  setVisible,
}: DialogueProps) => {
  const state = useTrackedState();
  const addAttribute = () => {
    postCertificate(state, attester, type);
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} onDismiss={() => setVisible(false)}>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{alignItems: 'center'}}
      >
        <Dialog.Title accessibilityStates>Confirmation</Dialog.Title>
        <Dialog.Content>
          <Text style={{fontWeight: 'bold'}}>
            Are you sure you want to accept this {type}?
          </Text>
          <Text>
            If you accept this certificate, you need to wait for your Doctor to
            confirm, before you are able to see it on your dashboard.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            accessibilityStates
            mode="contained"
            style={{width: 80, marginRight: 50, backgroundColor: 'green'}}
            onPress={addAttribute}
          >
            ADD
          </Button>
          <Button
            accessibilityStates
            mode="contained"
            style={{backgroundColor: 'red'}}
            onPress={() => setVisible(false)}
          >
            DO NOT ADD
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
};

export default CertificationDialogue;
