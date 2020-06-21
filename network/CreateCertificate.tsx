import { Certificate, State } from '../Store'; // eslint-disable-line no-unused-vars

/**
 * Sends a request to the backend that creates a certificate for an attestee to accept or decline.
 * @param {Certificate} certificate The certificate to create.
 * @param {State} state the global state.
 */
const CreateCertificate = (certificate: Certificate, state: State) => {
  const url = state.serverURL + '/attestation/certificate?type=send&mid=' +
    encodeURIComponent(certificate.holderID) + '&certificate_id=' + certificate.type;

  fetch(url, {
    method: 'POST',
  }).then((response) => console.log('got response: ' + response))
    .catch((error) => {
      console.error(error);
    });
};

export default CreateCertificate;
