from base64 import b64encode, b64decode

from aiohttp import web
from ipv8.REST.base_endpoint import BaseEndpoint, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, Response
from ipv8.attestation.identity.community import IdentityCommunity
from ipv8.attestation.wallet.community import AttestationCommunity

from cert_community import CertCommunity


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
        formatted = []
        for k, v in self.certificate_overlay.certificates.items():
            formatted.append([k, v])
        print(formatted)
        return Response([(x, y) for x, y in formatted], status=200)

    async def id_get(self, request):
        """
        Returns the ID of the own peer.
        """
        peer_id = b64encode(self.identity_overlay.my_peer.mid).decode('utf-8')
        return Response({"id": peer_id}, status=200)

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
            certificate_id = int(args['certificate_id'])
            peer = self.get_peer_from_mid(mid_b64)
            if certificate_id not in self.certificate_overlay.certificate_map:
                return Response({"error": "id not available"})

            if peer:
                self.certificate_overlay.send_certificate(peer, certificate_id)
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