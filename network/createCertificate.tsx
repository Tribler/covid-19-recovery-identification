import { Certificate, State } from "../Store"

const createCertificate = (certificate: Certificate, state: State) => {
    var xhr = new XMLHttpRequest();
    const url = state.serverURL + "/newCertificate"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    var dataJSON = JSON.stringify(certificate)
    console.log(dataJSON)
    xhr.send(dataJSON);
}

export default createCertificate
