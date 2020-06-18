import { State } from "../Store"
import { Base64 } from "js-base64"
import UpdateID from "./UpdateID"

/**
 * Sends a request to the backend to request attestation for a certain attribute of the attester.
 */
const PostCertificate = (state: State, attester: string, type: string) => {
  // we have to uri encode our attester string
  const url = state.serverURL + "/attestation?type=request&mid=" + encodeURIComponent(attester) + "&attribute_name=" + type
  const data = { method: 'POST', headers: { "Authorization": state.jwt }, body: "" }
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
const PostOutstanding = (state: State, attestee: string, type: string, value: string) => {
  // we have to uri encode our attester string and base64 + uri encode our value
  const b64value = encodeURIComponent(Base64.encode(value))
  const url = state.serverURL + "/attestation?type=attest&mid=" + encodeURIComponent(attestee) + "&attribute_name=" + type + "&attribute_value=" + b64value
  const data = { method: 'POST', headers: { "Authorization": state.jwt }, body: "" }
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
const DeleteCertificate = (state: State, listID: string) => {
  // we have to uri encode our attester string
  const url = state.serverURL + "/attestation/certificate?type=delete&mid=" + encodeURIComponent(listID)
  const data = { method: 'POST', headers: { "Authorization": state.jwt }, body: "" }
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
 * Sends a request to the backend to login.
 */
const PostLogin = (state: State, updateLogin: any, updateJwt: any, updateIDHook: any, password: string) => {
  const url = state.serverURL + "/attestation/login"
  const data = {
    method: 'POST',
    headers: {
      "Authorization": Base64.encode("user:" + password),
      "WWW-Authorization": "Basic"
    },
    body: ""
  }
  return fetch(url, data)
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        if (response.status == 417) throw alert("Not registered")
        if (response.status == 403) throw alert("wrong credentials")
        else throw alert("Error while logging in")
      }
      return response.json()
    })
    .then((json) => {  // TODO wrong password handling
      updateJwt(json.token);
      return UpdateID(state, updateIDHook, json.token)
        .then(id => console.log(id))
        .catch((error) => console.error(error));

    })
    .then((json) => {
      updateLogin();
      return json;
    })
    .catch((error) => {
      // console.error(error)
    });
}

/**
 * Sends a request to register.
 */
const RegisterLogin = (state: State, password: string, isAttester: boolean) => {
  const url = state.serverURL + "/attestation/register"
  const data = {
    method: 'POST',
    headers: {
      "x-registration": Base64.encode(password + ":" + isAttester),
    },
    body: ""
  }
  return fetch(url, data)
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        if (response.status == 400) throw alert("Already registered")
        else throw alert("Error while registering")
      }
      return response.json()
    })
    .then((json) => {
      console.log(json)
    })
    .catch((error) => {
      //console.error(error);
    });
}

/**
 * Sends a request to the backend to request verification for a certain attribute of the holder.
 */
const PostVerification = (state: State, holderID: string, attributeHash: string, callback: Function) => {
  const url = state.serverURL + "/attestation?type=verify&mid=" + encodeURIComponent(holderID)
    + "&attribute_hash=" + encodeURIComponent(attributeHash) + "&attribute_values" + encodeURIComponent(Base64.encode("positive")) // TODO: hardcode value or let attester fill in?
  const data = { method: 'POST', headers: { "Authorization": state.jwt }, body: "" }
  return fetch(url, data)
    .then((response) => {
      console.log(response)
      callback(response, attributeHash)
    })
    .catch((error) => {
      console.error(error);
    });
}


/**
 * Sends a request to the backend to request verification for a certain attribute of the holder.
 */
const GetVerificationOutput = (state: State) => {
  const url = state.serverURL + "/attestation?type=verification_output" 
  const data = { method: 'GET', headers: { "Authorization": state.jwt }, body: "" }
  return fetch(url, data)
    .then((response) => {
    })
    .catch((error) => {
      console.error(error);
    });
}



export { DeleteCertificate, PostCertificate, PostOutstanding, PostLogin, RegisterLogin, PostVerification }
