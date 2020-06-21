import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Certificate} from '../Store'; // eslint-disable-line no-unused-vars
import CertificateView from './CertificateView';

interface CertificateProps {
  certificate: Certificate;
  modalVisible: Function;
  setSelected: Function;
}

const CertificateViewDashboard: React.FC<CertificateProps> = ({
  certificate,
  modalVisible,
  setSelected,
}: CertificateProps) => {
  return (
    <View style={styles.container}>
      <CertificateView certificate={certificate} />
      <Button
        title="Show Proof"
        onPress={() => {
          setSelected(certificate);
          modalVisible(true);
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPair: {
    left: 35,
    flexDirection: 'row',
    top: 20,
  },
  container: {
    margin: 10,
  },
  labelDivision: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'gray',
    padding: 3,
    paddingVertical: 0,
  },
});

export default CertificateViewDashboard;
