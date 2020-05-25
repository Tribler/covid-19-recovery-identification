import { Certificate, State } from "../Store"

/**
 * Sends a request to the backend that creates a certificate for an attestee to confirm. 
 */
const CreateCertificate = (certificate: Certificate, state: State) => {
    var xhr = new XMLHttpRequest();
    const url = state.serverURL + "/newCertificate"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    var dataJSON = JSON.stringify(certificate)
    console.log(dataJSON)
    xhr.send(dataJSON);
}

export default CreateCertificate
