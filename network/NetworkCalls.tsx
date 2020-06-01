import {State} from "../Store"


/**
 * Sends a request to the backend to request attestation for a certain attribute of the attester.
 */

const PostCertificate = (state: any, attester: string, type: string) => {
  // we have to uri encode our attester string
  const url = state.serverURL + "/attestation?type=request&mid=" + encodeURIComponent(attester) + "&attribute_name=" + type
  const data = { method: 'POST', headers: {}, body: "" }
  return fetch(url, data)
    .then((response) => {
      console.log(
        response
      )
    })
    .catch((error) => {
      console.error(error);
    });
}


/**
 * Sends a request to the backend to attest to a certain attribute with a certain value for the attestee.
 */

const PostOutstanding = (state: any, attestee: string, type: string, value: string) => {
  // we have to uri encode our attester string and base64 + uri encode our value
  const b64value = encodeURIComponent(Base64.encode(value))
  const url = state.serverURL + "/attestation?type=attest&mid=" + encodeURIComponent(attestee) + "&attribute_name=" + type + "&attribute_value=" + b64value
  const data = { method: 'POST', headers: {}, body: "" }
  return fetch(url, data)
    .then((response) => {
      console.log(
        response
      )
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Sends a request to the backend to delete a certificate from local storage.
 */
const DeleteCertificate = (state: State, listID : string) => {
    // we have to uri encode our attester string
    const url = state.serverURL + "/attestation/certificate?type=delete&mid=" + encodeURIComponent(listID) 
    const data = {method: 'POST', headers: {}, body: ""}
    return fetch(url,data)
    .then((response) => {
              console.log(
                  response
              )
          })
    .catch((error) => {
      console.error(error);
    });
  }

  export {DeleteCertificate, PostCertificate, PostOutstanding}