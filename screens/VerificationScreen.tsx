import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import HelpButton from '../components/HelpButton';
import { useTrackedState } from '../Store';
import { postVerification } from '../network/NetworkCalls';
import { Button } from 'react-native-paper';
import QRScannerModal from '../components/QRScannerModal';
import VerificationDialogue from '../components/VerificationDialogue';

const VerificationScreen: React.FC = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const state = useTrackedState();
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [verificationResponse, setVerificationResponse] = useState('');

  const handleQRScan = (qrdata: string) => {
    const data = JSON.parse(qrdata);
    postVerification(state, data.holderID, data.hash, openDialogue);
  };

  const openDialogue = (response: any, attributeHash: string) => {
    // gets called once the verification scan is complete
    setVerificationResponse(attributeHash);
    setDialogueVisible(true);
  };

  return (
    <View style={state.darkMode ? styles.dark : styles.light}>
      <View style={styles.header}>
        <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>Verification</Text>
      </View>

      <View>
        <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
          Click on &quot;VERIFY&quot; to scan a QR code
          proof and check if it was signed by an Attester.
        </Text>
        <Button
          accessibilityStates
          mode="contained"
          style={styles.verifyButton}
          icon="camera"
          onPress={() => {
            setScannerOpen(true);
          }}
        >
          Verify
        </Button>
      </View>

      <VerificationDialogue
        verificationResponse={verificationResponse}
        visible={dialogueVisible}
        setVisible={setDialogueVisible}
      />
      <QRScannerModal
        visible={scannerOpen}
        setVisible={setScannerOpen}
        onRead={handleQRScan}
      ></QRScannerModal>
      <DrawerButton />
      <HelpButton />
    </View>
  );
};

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  titleLight: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#000',
  },
  titleDark: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#fff',
  },
  verifyButton: {
    marginHorizontal: 10,
    backgroundColor: 'dodgerblue',
  },
  instructionsLight: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 5,
    textAlign: 'center',
    margin: 5,
  },
  instructionsDark: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 5,
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
  dark: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  light: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default VerificationScreen;
