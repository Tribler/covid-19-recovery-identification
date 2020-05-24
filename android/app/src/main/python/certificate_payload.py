from ipv8.messaging.payload import Payload


class CertificatePayload(Payload):
    format_list = ['I']  # When reading data, we unpack an unsigned integer from it.

    def __init__(self, certificate):
        super(CertificatePayload, self).__init__()
        self.certificate = certificate

    def to_pack_list(self):
        out = [('I', self.certificate)]
        return out

    @classmethod
    def from_unpack_list(cls, certificate):
        return cls(certificate)
