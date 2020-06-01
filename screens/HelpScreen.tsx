
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import DrawerButton from "../components/DrawerButton";
import { useTrackedState } from "../Store";

const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

const HelpScreen: React.FC = () => {
    const state = useTrackedState()
    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Help</Text>
            </View>
            <View style={{ margin: 10 }}>
                <Title>Key Terms</Title>
                <Paragraph>
                    <B>Holder {state.attester ? "" : "(you)"}</B>: the person who will receive the document proving something. {"\n\n"}
                    <B>Attester {state.attester ? "(you)" : ""}</B>: the professional issuing the document.{"\n\n"}
                    <B>Verifier</B>: the person/organization checking the document validity.{"\n\n"}
                    <B>Chain</B>: the Holder's stored data{"\n"}
                </Paragraph>
                <Title>The Holder Process {state.attester ? "" : "(you)"}</Title>
                <Paragraph>
                    1. An <B>Attester</B> will send you a request to add data to your <B>Chain</B>, this request shows up in your <B>Inbox</B>. {"\n\n"}
                    2. You can decide wheter to add that data to your <B>Chain</B>, if you choose to add it the <B>Attester</B> will be sent a request to sign the data.{"\n\n"}
                    3. Once the Attester signs the data you can find the proof in your <B>Dashboard</B>.{"\n\n"}
                    4. You can click a proof on your <B>Dashboard</B> in order to send it to a <B>Verifier</B>.{"\n\n"}
                </Paragraph>
                {state.attester ? <><Title>The Attester Process {state.attester ? "(you)" : ""}</Title>
                <Paragraph>
                    1. Once you have data you want to add to a <B>Holder's</B> <B>chain</B> go to the <B>New Certificate</B> screen, choose certificate type and enter the Holder's ID,
                        the <B>Holder</B> will be notified as soon as you create a certificate . {"\n\n"}
                    2. If the <B>Holder</B> chooses to add that data to their <B>chain</B> you will get a notification asking you to sign the data.{"\n\n"}
                    3. Once you sign the data the <B>Holder</B> will get notified and they can show that data to a <B>Verifier</B>.{"\n\n"}
                </Paragraph></> : <></>}
            </View>
            <DrawerButton />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    title: {
        position: "relative",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Sans-serif",
        color: "#000"
    },
    subtitle: {
        fontSize: 15,
        margin: 5,
        fontFamily: "Sans-serif",
        color: "#000",
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default HelpScreen;