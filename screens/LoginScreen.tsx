import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useTrackedState} from '../Store';
import {postLogin} from '../hooks/NetworkCalls';
import {useToggleLogin} from '../hooks/useToggleAuth';
import {useToggleJwt} from '../hooks/useToggleJwt';
import {useToggleID} from '../hooks/useToggleID';
import {useToggleAttester} from '../hooks/useToggleAttester';

/**
 * The login screen for logging in as a health expert or as a patient.
 * Will be prompted every time a user opens the app.
 * @return {Component} the LoginScreen component.
 */
const LoginScreen: React.FC = () => {
  const state = useTrackedState();
  const updateLogin = useToggleLogin(); // a hook to change logged in state in the store.
  const updateJwt = useToggleJwt(); // a hook to change jwt in the store.
  const updateIDHook = useToggleID(); // a hook to change ID in state in the store.
  const updateAttester = useToggleAttester(); // a hook to change attester in state in the store.
  const [password, setPassword] = useState('');
  // const [password1, setPassword1] = useState("")

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.im}
        source={require('../assets/background.jpeg')}
      ></ImageBackground>
      <ImageBackground style={styles.im2} source={require('../assets/logo.png')}></ImageBackground>
      <Text style={styles.role}> Sign In</Text>
      <TextInput
        style={styles.textInput}
        placeholder=" Enter Your Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="#32CD32"
        secureTextEntry={true}
        value={password}
        onChangeText={(input) => setPassword(input)}
      />
      <TouchableOpacity
        onPress={() => {
          if (password.length > 0) {
            postLogin(state, updateLogin, updateJwt, updateIDHook, updateAttester, password);
          } else {
            throw alert('Password cannot be empty');
          }
          setPassword('');
        }}
      >
        <View style={styles.submitButton}>
          <Text style={styles.submitText}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '5.8%',
    justifyContent: 'center',
    bottom: '46%',
  },
  im: {
    width: '110%',
    height: '117%',
    flexDirection: 'column',
    resizeMode: 'cover',
    top: '62%',
    right: '6%',
  },
  im2: {
    flex: 1,
    width: '80%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    bottom: '31.95%',
  },
  textField: {
    backgroundColor: '#74d14c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
  },
  textInput: {
    height: 45,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  submitButton: {
    zIndex: 1,
    backgroundColor: '#74d14c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
  },
  submitText: {
    fontWeight: 'bold',
    color: 'white',
    width: 150,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  role: {
    fontWeight: 'bold',
    color: '#74d14c',
    fontSize: 20,
  },
});

export default LoginScreen;
