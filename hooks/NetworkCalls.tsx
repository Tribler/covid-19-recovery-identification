import {State} from '../Store'; // eslint-disable-line no-unused-vars
import {Base64} from 'js-base64';

const updateID = (state: State, updateIDHook: any, jwt: string): any => {
  const data = {method: 'GET', headers: {'Authorization': jwt}, body: ''};

  return fetch(state.serverURL + '/attestation/id', data)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        updateIDHook(json.id);
        return json.id;
      })
      .catch((error) => console.error(error));
};

/**
 * Sends a request to the backend to request attestation for a certain attribute of the attester.
 * @param {state} state global state.
 * @param {attester} attester person creating the certificate.
 * @param {type} type type of certificate being created.
 * @return {function} api call
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
 * Sends a request to the backend to attest to a attribute with a value for the attestee.
 * @param {state} state global state.
 * @param {holder} holder person receiving the attribute.
 * @param {type} type type of certificate being created.
 * @param {value} value the value given for the type.
 * @return {function} api call
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
 * Sends a request to the backend to delete an outstanding certificate.
 * @param {State} state global state.
 * @param {string} holderID the id whose request you want to delete.
 * @param {string} attributeName something?
 * @return {Function} api call
 */
const deleteOutstandingRequest = (
    state: State,
    holderID: string,
    attributeName: string,
) => {
  const url =
    state.serverURL +
    '/attestation/rm-outstanding?type=attest&mid=' +
    encodeURIComponent(holderID) +
    '&attribute_name=' +
    encodeURIComponent(attributeName);
  const data = {method: 'POST', headers: {Authorization: state.jwt}, body: ''};
  return fetch(url, data)
      .then((response) => {
        response.json();
      })
      .then((json) => {
      })
      .catch((error) => {
        console.error(error);
      });
};

/**
 * Sends a request to the backend to login.
 * @param {State} state global state.
 * @param {Function} updateLogin hook to update loggedIn state.
 * @param {Function} updateJwt hook to update the jwt state.
 * @param {Function} updateIDHook hook to update the id state.
 * @param {Function} updateAttester hook to update the attester state.
 * @param {string} password typed in password.
 * @return {Component} api call
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
        updateJwt(json.token);
        updateAttester(json.token);
        return updateID(state, updateIDHook, json.token)
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
 * Sends a request to the backend to register an account.
 * @param {State} state global state.
 * @param {string} password typed in password.
 * @param {boolean} isAttester if registered as an attester.
 * @return {Function} api call
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
 *
 * @param {state} state global state.
 * @param {holderID}  holderID id of the peer you want to verify an attribute of.
 * @param {attributeHash} attributeHash hash of the attribute you want to verify.
 * @param {callback} callback callback function to call after receiving the response.
 * @return {function} api call
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
    encodeURIComponent(Base64.encode('positive'));
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

/**
 *
 * @param {state} state global state
 * @param {callback} callback callback function to call after receiving the response.
 * @return {function} api call
 */
const getVerificationRequests = (state: State, callback?: Function) => {
  const url = state.serverURL + '/attestation?type=outstanding_verify';
  const data = {method: 'GET', headers: {Authorization: state.jwt}, body: ''};
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
 *
 * @param {state} state global state.
 * @param {verifierID} verifierID id of the peer who wants to verify an attribute.
 * @param {attributeName} attributeName name of the id that is requested to be verified.
 * @param {callback} callback callback function to call after receiving the response.
 * @return {function} api call
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
 *
 * @param {state} state global state.
 * @param {verifierID} verifierID id of the peer who wants to verify an attribute.
 * @param {attributeName} attributeName name of the id that is requested to be verified.
 * @param {callback} callback callback function to call after receiving the response.
 * @return {function} api call
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
  deleteOutstandingRequest,
  postCertificate,
  postOutstanding,
  postLogin,
  registerLogin,
  postVerification,
  getVerificationRequests,
  allowVerification,
  declineVerification,
};
