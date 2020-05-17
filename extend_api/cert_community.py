from pyipv8.ipv8.community import Community
from pyipv8.ipv8.keyvault.crypto import ECCrypto
from pyipv8.ipv8.lazy_community import lazy_wrapper
from pyipv8.ipv8.messaging.lazy_payload import VariablePayload
from pyipv8.ipv8.peer import Peer


class MyMessage(VariablePayload):
    format_list = ['64s']  # When reading data, we unpack an unsigned integer from it.
    names = ["certificate"]  # We will name this unsigned integer "clock"


class CertCommunity(Community):

    """
    Community for sharing Certificates.
    """

    master_peer = Peer(ECCrypto().generate_key(u"medium"))

    def __init__(self, my_peer, endpoint, network):
        super(CertCommunity, self).__init__(my_peer, endpoint, network)
        # Register the message handler for messages with the identifier "1".
        self.add_message_handler(1, self.on_message)
        # Store the certificates as a peer -> certificate key-value pair
        self.certificates = {}

    def send_certificate(self, peer, certificate_name):
        """
        Send a certificate to a peer
        """

        self.endpoint.send(peer.address, self.ezr_pack(1, MyMessage(certificate_name)))

    @lazy_wrapper(MyMessage)
    def on_message(self, peer, payload):
        """
        Add the certificate as peer -> certificate
        """
        self.certificates[peer] = payload.certificate