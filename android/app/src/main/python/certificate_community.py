import json
from base64 import b64encode
from binascii import unhexlify
from os import path, stat

from ipv8.community import Community
from ipv8.lazy_community import lazy_wrapper
from ipv8.messaging.payload_headers import BinMemberAuthenticationPayload, \
    GlobalTimeDistributionPayload
from ipv8.peer import Peer

from certificate_payload import CertificatePayload
from user import UserStorage


class CertCommunity(Community):
    """
    Community for sharing Certificates.
    """
    master_peer = Peer(
        unhexlify(
            "4c69624e61434c504b3a2ae61adf85aa3bf223c4180632912a92f1094bae64495ff47e50e1447771"  # noqa
            "7739a917700b7af02d382bcdb0ccc4f5c81341066ffd0062a3cc45f0d8d74e566092"))  # noqa

    def __init__(self, *args, **kwargs):
        self.working_directory = kwargs.pop('working_directory', '')
        super(CertCommunity, self).__init__(*args, **kwargs)
        # Register the message handler for messages with the identifier "1".
        self.add_message_handler(20, self.on_certificate)
        # Store the certificates as a peer -> certificate key-value pair.
        self.certificates = {}
        # Example certificates which can be added later on the road if wanted.
        self.certificate_map = {
            1: "cv19-i",
            2: "hepB-v"
        }
        self.read_certificates_file(self.working_directory)
        self.read_credentials_file(self.working_directory)

    def send_certificate(self, peer, own_peer, certificate_id):
        """
        Send a certificate to a peer.
        """
        global_time = self.claim_global_time()
        auth = BinMemberAuthenticationPayload(
            self.my_peer.public_key.key_to_bin()).to_pack_list()
        payload = CertificatePayload(certificate_id, own_peer).to_pack_list()
        dist = GlobalTimeDistributionPayload(global_time).to_pack_list()
        packet = self._ez_pack(self._prefix, 20, [auth, dist, payload])
        self.endpoint.send(peer.address, packet)

    @lazy_wrapper(GlobalTimeDistributionPayload, CertificatePayload)
    async def on_certificate(self, peer, dist, payload):
        """
        Add the certificate as peer -> certificate.
        """
        peer_id = b64encode(payload.peer_id).decode('utf-8')
        self.certificates[
            peer_id + self.certificate_map[payload.certificate]] = \
            (peer_id, self.certificate_map[payload.certificate])
        # Persist the certificates with every new certificate received.
        self.write_certificates_file(self.working_directory)

    def on_delete_certificate(self, key):
        """
        Delete the certificate in the certificates dictionary.
        """
        self.certificates.pop(key, None)
        # Persist the certificates after deleting certificate.
        self.write_certificates_file(self.working_directory)

    def read_certificates_file(self, working_directory):
        """
        Read the certificate.txt in the working directory, or create a new one.
        """
        filepath = working_directory + "/certificates.txt"
        # Check if the file exist and if it is not empty.
        if path.exists(filepath) and stat(filepath).st_size != 0:
            # Overwrite your certificates variable to the certificates in
            # this file.
            self.certificates = json.load(open(filepath))
        else:
            open(filepath, "w").close()

    def write_certificates_file(self, working_directory):
        """
         Write your certificates to the certificate.txt in the working
         directory.
         """
        filepath = working_directory + "/certificates.txt"
        f = open(filepath, 'w')
        f.write(json.dumps(self.certificates))
        f.close()

    def read_credentials_file(self, working_directory):
        """
        Put credentials in User Storage.
        """
        filepath = working_directory + "/credentials.txt"
        # Check if the file exists.
        if path.exists(filepath) and stat(filepath).st_size != 0:
            # Write your credentials to User.UserStorage.
            UserStorage.set_storage(json.load(open(filepath)))
        else:
            open(filepath, "w").close()

    def write_credentials_file(self):
        """
        Write credentials to file.
        """
        filepath = self.working_directory + "/credentials.txt"
        f = open(filepath, 'w')
        # To serialize a simple class  to JSON in python, we can call __dict__.
        f.write(json.dumps(UserStorage.get_storage().__dict__))
        f.close()
