from base64 import b64encode
import json
from os import path, stat
from ipv8.community import Community
from ipv8.keyvault.crypto import ECCrypto
from ipv8.lazy_community import lazy_wrapper
from ipv8.messaging.lazy_payload import VariablePayload
from ipv8.peer import Peer


class MyMessage(VariablePayload):
    format_list = ['I']  # When reading data, we unpack an unsigned integer from it.
    names = ["certificate"]  # We will name this unsigned integer "certificate"


class CertCommunity(Community):
    """
    Community for sharing Certificates.
    """

    master_peer = Peer(ECCrypto().generate_key(u"medium"))

    def __init__(self, *args, **kwargs):
        self.working_directory = kwargs.pop('working_directory', '')
        super(CertCommunity, self).__init__(*args, **kwargs)
        # Register the message handler for messages with the identifier "1".
        self.add_message_handler(1, self.on_certificate)
        # Store the certificates as a peer -> certificate key-value pair
        self.certificates = {}
        # Example certificates which can be added later on the road if wanted
        self.certificate_map = {
            1: "cv19-i",
            2: "hepB-v"
        }
        self.read_certificates_file(self.working_directory)

    def send_certificate(self, peer, certificate_id):
        """
        Send a certificate to a peer
        """
        self.endpoint.send(peer.address, self.ezr_pack(1, MyMessage(certificate_id)))

    @lazy_wrapper(MyMessage)
    def on_certificate(self, peer, payload):
        """
        Add the certificate as peer -> certificate.
        """
        peer_id = b64encode(peer.mid).decode()
        self.certificates[peer_id] = self.certificate_map[payload.certificate]
        # Persist the certificates with every new certificate received.
        self.write_certificates_file(self.working_directory)

    def read_certificates_file(self, working_directory):
        """
        Read the certificate.txt in the working directory, or create a new one.
        """
        filepath = working_directory + "/certificates.txt"
        # Check if the file exist and if it is not empty.
        if path.exists(filepath) and stat(filepath).st_size != 0:
            # Overwrite your certificates variable to the certificates in this file
            self.certificates = json.load(open(filepath))
        else:
            open(filepath, "w").close()

    def write_certificates_file(self, working_directory):
        """
         Write your certificates to the certificate.txt in the working directory.
         """
        filepath = working_directory + "/certificates.txt"
        f = open(filepath, 'w')
        f.write(json.dumps(self.certificates))
