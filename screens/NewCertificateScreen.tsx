import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import DrawerButton from '../components/DrawerButton';
import {useTrackedState, attributeTypeMap} from '../Store';
import HelpButton from '../components/HelpButton';
import BasicQRModal from '../components/BasicQRModal';

/*
 * The New Certificate screen is accessible only to attesters and
 they use it to inform an attestee of the data they want to add to
 the attestee's chain
 */

const NewCertificateScreen: React.FC = () => {
  const [certificateType, setCertificateType] = useState(1);
  const [codeVisible, setCodeVisible] = useState(false);
  const state = useTrackedState();

  const options = attributeTypeMap;

  return (
    <View style={state.darkMode ? styles.dark : styles.light}>
      <View style={styles.header}>
        <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>New Certificate</Text>
        <Text style={state.darkMode ? styles.subtitleDark : styles.subtitleLight}>
          Here you can create certificates for Holders.
        </Text>
      </View>

      <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
        {' '}
        Choose an attribute type from the dropdown menu below and then click `&quot;`GENERATE QR
        CODE`&quot;`
      </Text>
      <View style={state.darkMode ? styles.dropdownDark : styles.dropdownLight}>
        <Dropdown
          data={options}
          label="Choose..."
          onChangeText={(value: string, index: number) => setCertificateType(index)}
        ></Dropdown>
      </View>

      <Button
        accessibilityStates
        mode="contained"
        style={{backgroundColor: 'dodgerblue', marginVertical: 5}}
        onPress={() => {
          setCodeVisible(true);
        }}
      >
        GENERATE QR CODE
      </Button>

      <BasicQRModal
        data={JSON.stringify({id: state.ID, type: certificateType})}
        visible={codeVisible}
        setVisible={setCodeVisible}
      />
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
  dropdownLight: {
    backgroundColor: '#fff',
    fontSize: 15,
    fontFamily: 'Sans-serif',
    color: '#000',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    width: 200,
  },
  dropdownDark: {
    backgroundColor: '#222',
    fontSize: 15,
    fontFamily: 'Sans-serif',
    color: '#000',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    width: 200,
  },
  titleDark: {
    position: 'relative',
    marginTop: '3%',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#fff',
  },
  titleLight: {
    position: 'relative',
    marginTop: '3%',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#000',
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
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  subtitleLight: {
    fontSize: 15,
    margin: 5,
    fontFamily: 'Sans-serif',
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
  },
  subtitleDark: {
    fontSize: 15,
    margin: 5,
    fontFamily: 'Sans-serif',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },

  instructionsLight: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 5,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  instructionsDark: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 5,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default NewCertificateScreen;
