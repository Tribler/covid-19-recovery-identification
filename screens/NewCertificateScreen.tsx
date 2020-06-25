import React, { useState } from 'react';
import { StyleSheet, Text, View, YellowBox, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import DrawerButton from '../components/DrawerButton';
import { useTrackedState, attributeTypeMap } from '../Store';
import BasicQRModal from '../components/BasicQRModal';
import { useFocusEffect } from '@react-navigation/native';
import OutstandingView from '../components/OutstandingView';

YellowBox.ignoreWarnings(['componentWill', 'Failed prop type', 'Animated']);

/*
 * The New Certificate screen is accessible only to attesters and
 they use it to inform an attestee of the data they want to add to
 the attestee's chain
 */

const B = (props: any) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;

const NewCertificateScreen: React.FC = () => {
  const [certificateType, setCertificateType] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const state = useTrackedState();

  const options = attributeTypeMap;

  const [outstanding, setOutstanding] = useState([]);
  const url = state.serverURL + '/attestation?type=outstanding';
  const data = {method: 'GET', headers: {Authorization: state.jwt}, body: ''};
  const updateInterval = 500; // how many milliseconds between api calls

  useFocusEffect(() => {
    const interval = setInterval(() => {
      fetch(url, data)
          .then((response) => response.json())
          .then((json) => setOutstanding(json))
          .catch((error) => console.error(error));
    }, updateInterval);

    return () => clearInterval(interval);
  });

  const deleteOutstanding = (id: string) => {
    setOutstanding((outsList) => {
      return outsList.filter((out) => out[0] + '' + out[1] !== id);
    });
  };

  return (
    <View>
      <View style={state.darkMode ? styles.dark : styles.light}>
          <View style={styles.header}>
            <Text style={state.darkMode ? styles.titleDark : styles.titleLight}>Create Certificate</Text>
          </View>

          <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
            Pick a <B>Certificate</B> type from the dropdown menu below. Click <B>GENERATE QR
            CODE</B> and show the QR code to your <B>Patient</B>.
          </Text>
          <View style={{width: '95%'}}>
            <Dropdown
              data={options}
              label="Certificates..."
              fontSize={20}
              onChangeText={(value: string, index: number) => setCertificateType(value)}
              baseColor={state.darkMode ? 'white' : 'black'}
            ></Dropdown>
          </View>

          <Button
            accessibilityStates
            mode="contained"
            style={{ backgroundColor: 'dodgerblue', marginVertical: 5 }}
            onPress={() => {
              if (certificateType == "") throw alert('You have not picked a certificate type yet!');
              else setCodeVisible(true);
            }}
          >
            GENERATE QR CODE
          </Button>
      </View>

      <View style={state.darkMode ? styles.dark : styles.light}>
        <Text style={state.darkMode ? styles.instructionsDark : styles.instructionsLight}>
              After your <B>Patient</B> scans the QR code and accepts the <B>Certificate</B>,
              a confirmation request will show up below.
        </Text>
        <ScrollView>
          <FlatList
            data={outstanding}
            keyExtractor={(item) => item[0] + '' + item[1]}
            renderItem={({ item }) => (
              <OutstandingView
                listID={item[0] + '' + item[1]}
                outstanding={{ creatorID: item[0], type: item[1] }}
                deleteOutstanding={deleteOutstanding}
              />
            )}
          />
        </ScrollView>
      </View>

      <BasicQRModal
        data={JSON.stringify({ id: state.ID, type: certificateType })}
        visible={codeVisible}
        setVisible={setCodeVisible}
      />
      
      <DrawerButton />
    </View>
  );
};

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
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
    backgroundColor: '#222',
    alignItems: 'center',
    height: '50%'
  },
  light: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '50%'
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 15,
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
