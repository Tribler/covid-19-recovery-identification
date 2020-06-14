import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import DrawerButton from '../components/DrawerButton';
import Attribute from '../components/Attribute';
import HelpButton from '../components/HelpButton';
import {useTrackedState} from '../Store';

const AttestationScreen: React.FC = () => {
  const [data, setData] = useState([]);
  const state = useTrackedState();

  useEffect(() => {
    fetch(state.serverURL + '/attestation?type=attributes')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error));
  }, []);


  return (
    <View style = {state.darkMode ? styles.dark : styles.light}>
      <View style = {state.darkMode ? styles.darktext : styles.lighttext}>
        <Text style = {state.darkMode ? styles.titleDark : styles.title}>Attestations</Text>
      </View>

      <Text style = {state.darkMode ? styles.darkColor : styles.lightColor}> Hello World </Text>
      {console.log(data[0])}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Attribute
            attributeName={JSON.stringify(item[0])}
            attester={JSON.stringify(item[3])}
            attributeValue = {JSON.stringify(item[1])}
          />
        )}
      />
      <DrawerButton />
      <HelpButton />
    </View>
  );
};

/**
 * various styles for use in various situations. For example, white text in a potential
 * dark mode or black text in the current light mode.
 */
const styles = StyleSheet.create({
  dark: {
    flex: 1,
    backgroundColor: '#222',
  },
  light: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkColor: {
    color: '#fff',
  },
  lightColor: {
    color: '#000',
  },
  darktext: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '15%',
    marginBottom: '5%',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#fff',
  },
  lighttext: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '15%',
    marginBottom: '5%',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#000',
  },
  title: {
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
  subtitle: {
    fontSize: 15,
    margin: '1%',
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
});

export default AttestationScreen;
