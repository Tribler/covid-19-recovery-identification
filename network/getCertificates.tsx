import {State} from '../Store'; // eslint-disable-line no-unused-vars

const GetCertificates = (state: State) => {
  const xhr = new XMLHttpRequest();
  const url = state.serverURL + '/attestation/certificate/recent';
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const dataJSON = '';
  console.log(dataJSON);
  xhr.send(dataJSON);
};

export default GetCertificates;
