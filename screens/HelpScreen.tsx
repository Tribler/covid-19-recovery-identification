import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DrawerButton from '../components/DrawerButton';
import {Paragraph, Title} from 'react-native-paper';
import {useTrackedState} from '../Store';
import {ScrollView} from 'react-native-gesture-handler';

const B = (props: any) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

/**
 * The help screen. Functions as a screen which explains the various terms we use.
 * May also contain contact details in the future and/or an opportunity to ask a question.
 */
const HelpScreen: React.FC = () => {
  const state = useTrackedState();
  return (
    <ScrollView style={state.darkMode ? styles.dark : styles.light}>
      <View style={state.darkMode ? styles.darktext : styles.lighttext}>
        <Text style={state.darkMode ? styles.titleDark : styles.title}>Help</Text>
      </View>
      <View style={state.darkMode ? styles.bodytextDark : styles.bodytext}>
        <Title style={state.darkMode ? styles.darkColor : styles.lightColor}>Key Terms</Title>
        <Paragraph style={state.darkMode ? styles.darkColor : styles.lightColor}>
          <B>Holder {state.attester ? '' : '(you)'}</B>: the person who will receive the document
          proving something. {'\n\n'}
          <B>Attester {state.attester ? '(you)' : ''}</B>: the professional issuing the document.
          {'\n\n'}
          <B>Verifier</B>: the person/organization checking the document validity.{'\n\n'}
          <B>Chain</B>: the Holder's stored data{'\n'}
          <B>Proof</B>: the data that a Verifier uses to check if someone signed your attribute.
          {'\n'}
        </Paragraph>
        <Title style={state.darkMode ? styles.darkColor : styles.lightColor}>
          The Holder Process
        </Title>
        <Paragraph style={state.darkMode ? styles.darkColor : styles.lightColor}>
          1. An <B>Attester</B> will show you a QR Code, you can click the `&quot;`Add Proof`&quot;`
          button on the <B>Dashboard</B> to request adding that data to your <B>Chain</B>. {'\n\n'}
          2. Once the attester signs the data you can find the proof in your <B>Dashboard</B>.
          {'\n\n'}
          3. You can click the `&quot;`SHOW PROOF`&quot;` button under an attribute on your{' '}
          <B>dashboard</B> in order to create a QR Code proof that a <B>Verifier</B> can scan.
          {'\n\n'}
        </Paragraph>
        {state.attester ? (
          <>
            <Title style={state.darkMode ? styles.darkColor : styles.lightColor}>
              The Attester Process
            </Title>
            <Paragraph style={state.darkMode ? styles.darkColor : styles.lightColor}>
              1. Once you have data you want to add to a <B>Holder's</B> <B>chain</B> go to the{' '}
              <B>New Certificate</B> screen, choose certificate type and click `&quot;`GENERATE QR
              CODE`&quot;`. {'\n\n'}
              2. The <B>Holder</B> can scan that QR Code and, if they acceot, you will get a request
              asking you to sign the data, this request shows up in the <B>Outstanding Screen</B>.
              {'\n\n'}
              3. Once you sign the data the <B>Holder</B> will get notified and they can show that
              data to a <B>Verifier</B>.{'\n\n'}
            </Paragraph>
          </>
        ) : (
          <></>
        )}

        <>
          <Title style={state.darkMode ? styles.darkColor : styles.lightColor}>
            The Verifier Process
          </Title>
          <Paragraph style={state.darkMode ? styles.darkColor : styles.lightColor}>
            1. A <B>Holder</B> can show you a QR Code proof of an attribute signed by an{' '}
            <B>Attester</B>.{'\n\n'}
            2. Open the <B>Verififaction Screen</B> and click `&quot;`VERIFY`&quot;` to scan this
            code.{'\n\n'}
            3. After scanning you will see a dialogue that states whether an <B>Attester</B> has
            signed that attribute for that <B>Holder</B> or not.{'\n\n'}
          </Paragraph>
        </>
      </View>

      <DrawerButton />
    </ScrollView>
  );
};

/**
 * Various styles for use in various situations. For example, white text in
 * dark mode or black text in light mode. These styles are for taking care of
 * the placing of objects.
 */
const styles = StyleSheet.create({
  darkColor: {
    color: '#fff',
  },
  lightColor: {
    color: '#000',
  },
  bodytext: {
    margin: 10,
    color: '#000',
  },
  bodytextDark: {
    margin: 10,
    marginTop: 75,
    color: '#fff',
  },
  dark: {
    backgroundColor: '#222',
  },
  light: {
    backgroundColor: '#fff',
  },
  darktext: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '15%',
    marginBottom: '-13%',
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Sans-serif',
    color: '#fff',
  },
  lighttext: {
    alignItems: 'center',
    position: 'relative',
    marginTop: '15%',
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
});

export default HelpScreen;
