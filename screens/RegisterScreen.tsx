import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import {registerLogin} from '../network/NetworkCalls';
import {useTrackedState} from '../Store';
import {useToggleRegister} from '../hooks/useToggleRegister';

/**
 * In the register screen, a user can sign up for the app and thereby create an account
 * The register screen will be prompted on first startup and then never again.
 * @return {Component} the Register Screen component.
 */
const RegisterScreen: React.FC = () => {
  const state = useTrackedState();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordAttester, setPasswordAttester] = useState('');
  const [passwordAttesterConfirm, setPasswordAttesterConfirm] = useState('');
  const toggleRegister = useToggleRegister();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.im}
        source={require('../assets/background.jpeg')}
      ></ImageBackground>
      <ImageBackground
        resizeMode="cover"
        style={styles.im2}
        source={require('../assets/logo.png')}
      ></ImageBackground>
      <Text style={styles.role}> Sign up as patient</Text>
      <TextInput // TODO fix this out of focus i think because goes above screen
        style={styles.textInput}
        placeholder=" Enter Your Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="#32CD32"
        secureTextEntry={true}
        value={password}
        onChangeText={(input) => setPassword(input)}
      />

      <TextInput
        style={styles.textInput}
        placeholder=" Enter Your Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="#32CD32"
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(input) => setPasswordConfirm(input)}
      />

      <TouchableOpacity
        onPress={() => {
          if (password == passwordConfirm && password.length > 0) {
            registerLogin(state, password, false);
            toggleRegister();
          } else {
            alert('Passwords don\'t match or are empty');
          }
          setPassword('');
          setPasswordConfirm('');
        }}
      >
        <View style={styles.submitButton}>
          <Text style={styles.submitText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <Text style={styles.role}> Sign up as health expert</Text>
      <TextInput
        style={styles.textInput}
        placeholder=" Enter Your Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="#32CD32"
        secureTextEntry={true}
        value={passwordAttester}
        onChangeText={(input) => setPasswordAttester(input)}
      />
      <TextInput
        style={styles.textInput}
        placeholder=" Confirm Your Password"
        underlineColorAndroid="transparent"
        placeholderTextColor="#32CD32"
        secureTextEntry={true}
        value={passwordAttesterConfirm}
        onChangeText={(input) => setPasswordAttesterConfirm(input)}
      />

      <TouchableOpacity
        onPress={() => {
          if (passwordAttester == passwordAttesterConfirm && passwordAttester.length > 0) {
            registerLogin(state, passwordAttester, true);
            toggleRegister();
          } else {
            alert('Passwords don\'t match or are empty');
          }
          setPasswordAttester('');
          setPasswordAttesterConfirm('');
        }}
      >
        <View style={styles.submitButton}>
          <Text style={styles.submitText}>Sign Up</Text>
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
    padding: 24,
    justifyContent: 'center',
    bottom: '42%',
  },
  im: {
    width: '110%',
    height: '117%',
    flexDirection: 'column',
    resizeMode: 'cover',
    top: '64%',
    right: '5.8%',
  },
  im2: {
    flex: 1,
    width: '80%',
    height: 250,
    resizeMode: 'contain',
    bottom: '30%',
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

export default RegisterScreen;
