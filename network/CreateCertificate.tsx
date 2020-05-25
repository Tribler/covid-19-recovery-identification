import { Certificate, State } from "../Store"

const CreateCertificate = (certificate: Certificate, state: State) => {
    var xhr = new XMLHttpRequest();
    const url = state.serverURL + "/certificate?type=send&mid=" + encodeURIComponent(certificate.holderID) + "&certificate_id=" + certificate.type
    console.log("Sending to:"+ url)
    xhr.open("POST", url, true);
    xhr.send();
}

export default CreateCertificate
