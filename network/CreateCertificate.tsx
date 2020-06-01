import { Certificate, State } from "../Store"

/**
 * Sends a request to the backend that creates a certificate for an attestee to accept or decline. 
 */
const CreateCertificate = (certificate: Certificate, state: State) => {
    var xhr = new XMLHttpRequest();
    const url = state.serverURL + "/attestation/certificate?type=send&mid=" + encodeURIComponent(certificate.holderID) + "&certificate_id=" + certificate.type
    console.log("Sending to:" + url)
    xhr.open("POST", url, true);
    xhr.send();
}

export default CreateCertificate
