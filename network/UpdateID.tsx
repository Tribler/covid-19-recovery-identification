import {State} from '../Store'; // eslint-disable-line no-unused-vars

const updateID = (state: State, updateIDHook: any, jwt: string): any => {
  const data = {method: 'GET', headers: {'Authorization': jwt}, body: ''};

  return fetch(state.serverURL + '/attestation/id', data)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        updateIDHook(json.id);
        console.log('Returning ID: ' + json.id);
        return json.id;
      })
      .catch((error) => console.error(error));
};

export default updateID;
