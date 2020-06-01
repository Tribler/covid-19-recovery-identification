from ipv8.messaging.payload import Payload


class CertificatePayload(Payload):
    format_list = ['I']  # When reading data, we unpack an unsigned integer from it.
    optional_format_list = ['raw']  # And the remaining string, which is the peer_id of original sender.

    def __init__(self, certificate, peer_id):
        super(CertificatePayload, self).__init__()
        self.certificate = certificate
        self.peer_id = peer_id

    def to_pack_list(self):
        out = [('I', self.certificate)]
        if self.peer_id is not None:
            out += [('raw', self.peer_id)]
        return out

    @classmethod
    def from_unpack_list(cls, *args):
        return cls(*args)
