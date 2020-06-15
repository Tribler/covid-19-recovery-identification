import React from 'react'
import { Button } from 'react-native-paper'

const QRButton: React.FC = () => {
    return (
        <Button
            accessibilityStates =""
            style={{
                position: "absolute",
                top: 0
            }}
            mode="outlined"
            icon="qrcode"
            onPress={() => {
                console.log("qr");
                
            }}> QR </Button>
    )
}

export default QRButton
