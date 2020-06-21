import {State} from '../Store';
import {Base64} from 'js-base64';
import UpdateID from './UpdateID';

/**
 * Sends a request to the backend to request attestation for a certain attribute of the attester.
 * @param state the global state.
 * @param attester the person creating the certificate.
 * @param type the type of certificate being created.
 */
const postCertificate = (state: State, attester: string, type: string) => {
  // we have to uri encode our attester string
  const url =
    state.serverURL +
    '/attestation?type=request&mid=' +
    encodeURIComponent(attester) +
    '&attribute_name=' +
    type;
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to attest to a certain attribute with a certain value for the attestee.
 * @param state the global state.
 * @param holder the person receiving the attribute.
 * @param type the type of certificate being created.
 * @param value additional parameters for the attribute.
 */
const postOutstanding = (state: State, holder: string, type: string, value: string) => {
  // we have to uri encode our attester string and base64 + uri encode our value
  const b64value = encodeURIComponent(Base64.encode(value));
  const url =
    state.serverURL +
    '/attestation?type=attest&mid=' +
    encodeURIComponent(holder) +
    '&attribute_name=' +
    type +
    '&attribute_value=' +
    b64value;
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to delete a certificate from local storage.
 * @param state the global state.
 * @param listID
 */
const peleteCertificate = (state: State, listID: string) => {
  // we have to uri encode our attester string
  const url =
    state.serverURL + '/attestation/certificate?type=delete&mid=' + encodeURIComponent(listID);
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to login.
 */
const postLogin = (
    state: State,
    updateLogin: any,
    updateJwt: any,
    updateIDHook: any,
    updateAttester: any,
    password: string,
) => {
  const url = state.serverURL + '/attestation/login';
  const data = {
    method: 'POST',
    headers: {
      'Authorization': Base64.encode('user:' + password),
      'WWW-Authorization': 'Basic',
    },
    body: '',
  };
  return fetch(url, data)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          if (response.status == 417) throw alert('Not registered');
          if (response.status == 403) throw alert('wrong credentials');
          else throw alert('Error while logging in');
        }
        return response.json();
      })
      .then((json) => {
      // TODO wrong password handling
        updateJwt(json.token);
        updateAttester(json.token);
        return UpdateID(state, updateIDHook, json.token)
            .then((id: any) => console.log(id))
            .catch((error: any) => console.error(error));
      })
      .then((json) => {
        updateLogin();
        return json;
      })
      .catch((error) => {
      // console.error(error)
      });
};

/**
 * Sends a request to register.
 */
const registerLogin = (state: State, password: string, isAttester: boolean) => {
  const url = state.serverURL + '/attestation/register';
  const data = {
    method: 'POST',
    headers: {
      'x-registration': Base64.encode(password + ':' + isAttester),
    },
    body: '',
  };
  return fetch(url, data)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          if (response.status == 400) throw alert('Already registered');
          else throw alert('Error while registering');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
      // console.error(error);
      });
};

/**
 * Sends a request to the backend to request verification for a certain attribute of the holder.
 */
const postVerification = (
    state: State,
    holderID: string,
    attributeHash: string,
    callback: Function,
) => {
  const url =
    state.serverURL +
    '/attestation?type=verify&mid=' +
    encodeURIComponent(holderID) +
    '&attribute_hash=' +
    encodeURIComponent(attributeHash) +
    '&attribute_values=' +
    encodeURIComponent(Base64.encode('positive')); // TODO: hardcode value or let attester fill in?
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        console.log(response);
        callback(response, attributeHash);
      })
      .catch((error) => {
        console.error(error);
      });
};

const getVerificationRequests = (state: State, callback?: Function) => {
  const url = state.serverURL + '/attestation?type=outstanding_verify';
  const data = {method: 'GET', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url)
      .then((response) => {
        response.json();
      })
      .then((json) => {
        if (callback) callback(json);
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to allow a Verifier to access an attribute.
 */
const allowVerification = (
    state: State,
    verifierID: string,
    attributeName: string,
    callback?: Function,
) => {
  const url =
    state.serverURL +
    '/attestation?type=allow_verify&mid=' +
    encodeURIComponent(verifierID) +
    '&attribute_name=' +
    encodeURIComponent(attributeName);
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        response.json();
      })
      .then((json) => {
        if (callback) callback(json);
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to decline a Verifier's request to access an attribute.
 */
const declineVerification = (
    state: State,
    verifierID: string,
    attributeName: string,
    callback?: Function,
) => {
  const url =
    state.serverURL +
    '/attestation/rm-outstanding?type=verify&mid=' +
    encodeURIComponent(verifierID) + // TODO: make sure this
    '&attribute_name=' +
    encodeURIComponent(attributeName);
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        response.json();
      })
      .then((json) => {
        if (callback) callback(json);
      })
      .catch((error) => {
        console.error(error);
      });
};

export {
  postCertificate,
  postOutstanding,
  postLogin,
  registerLogin,
  postVerification,
  getVerificationRequests,
  allowVerification,
  declineVerification,
};
