import {Certificate, State} from '../Store';

/**
 * Sends a request to the backend that creates a certificate for an attestee to accept or decline.
 */
const CreateCertificate = (certificate: Certificate, state: State) => {
  const url = state.serverURL + '/attestation/certificate?type=send&mid=' + encodeURIComponent(certificate.holderID) + '&certificate_id=' + certificate.type;

  fetch(url, {
    method: 'POST',
  }).then((response) => console.log('got response: ' + response))
      .catch((error) => {
        console.error(error);
      });
};

export default CreateCertificate;
