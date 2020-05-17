from base64 import b64encode, b64decode

from cert_community import CertCommunity
from pyipv8.ipv8.REST.attestation_endpoint import AttestationEndpoint

from aiohttp import web

from pyipv8.ipv8.REST import json_util as json
from pyipv8.ipv8.REST.base_endpoint import BaseEndpoint, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, Response
from pyipv8.ipv8.attestation.identity.community import IdentityCommunity
from pyipv8.ipv8.attestation.wallet.community import AttestationCommunity
from pyipv8.ipv8.messaging.lazy_payload import VariablePayload


class CertificateEndpoint(BaseEndpoint):
    """
    This endpoint is responsible for handing all requests regarding Certificates.
    """
    def __init__(self):
        super(CertificateEndpoint, self).__init__()
        self.certificate_overlay = self.attestation_overlay = self.identity_overlay = None


    def initialize(self, session):
        """
        We initialize the AttestationCommunity,IdentityCommunity and CertificateCommunity
        """
        super(CertificateEndpoint, self).initialize(session)
        self.attestation_overlay = next((overlay for overlay in session.overlays
                                         if isinstance(overlay, AttestationCommunity)), None)
        self.identity_overlay = next((overlay for overlay in session.overlays
                                      if isinstance(overlay, IdentityCommunity)), None)
        self.certificate_overlay = next((overlay for overlay in session.overlays
                                         if isinstance(overlay, CertCommunity)), None)

    def setup_routes(self):
        """
        The paths that are available for REST calls.
        """
        self.app.add_routes([web.get('/recent', self.certificate_get),
                             web.get('/id', self.id_get),
                             web.post('', self.post_certificate)])


    async def certificate_get(self, request):
        return Response({"certificate": "this"}, status=200)

    async def id_get(self, request):
        """
        Returns the ID of the own peer.
        """
        peerID = self.identity_overlay.my_peer.mid
        return Response({"id": b64encode(peerID).decode('utf-8')}, status=200)

    async def post_certificate(self, request):
        """
        Send a certificate to a peer.
        """
        if not self.attestation_overlay or not self.identity_overlay:
            return Response({"error": "attestation or identity community not found"}, status=HTTP_NOT_FOUND)

        args = request.query
        if not args or 'type' not in args:
            return Response({"error": "parameters or type missing"}, status=HTTP_BAD_REQUEST)

        if args['type'] == 'send':
            mid_b64 = args['mid']
            certificate_name = args['certificate_name']
            peer = self.get_peer_from_mid(mid_b64)

            if peer:
                self.certificate_overlay.send_certificate(peer, certificate_name)
                return Response({"success": True})
            else:
                return Response({"error": "peer unknown"}, status=HTTP_BAD_REQUEST)

    def get_peer_from_mid(self, mid_b64):
        """
        Find a peer by base64 encoded mid.
        """
        mid = b64decode(mid_b64)
        peers = self.session.network.verified_peers
        matches = [p for p in peers if p.mid == mid]
        return matches[0] if matches else None
