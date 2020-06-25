import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {Certificate} from '../Store'; // eslint-disable-line no-unused-vars

interface CertificateProps {
  certificate: Certificate
  modalVisible: Function
  setSelected: Function
}

const CertificateView: React.FC<CertificateProps> =
  ({certificate, modalVisible, setSelected}: CertificateProps) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{certificate.type}</Text>
        <Button title="Generate QR Code" onPress={() => {
          setSelected(certificate);
          modalVisible(true);
        }}></Button>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    width: '100%',
  },
});


export default CertificateView;
