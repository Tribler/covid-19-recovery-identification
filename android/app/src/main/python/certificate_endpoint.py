from base64 import b64encode

from aiohttp import web

from auth import auth_middleware, login_required_middleware, login
from ipv8.REST.base_endpoint import HTTP_BAD_REQUEST, HTTP_NOT_FOUND, Response
from ipv8.REST.attestation_endpoint import AttestationEndpoint
from ipv8.util import cast_to_bin

from cert_community import CertCommunity


class CertificateEndpoint(AttestationEndpoint):
    """
    This endpoint is responsible for handing all requests regarding Certificates.
    """

    def __init__(self):
        super(CertificateEndpoint, self).__init__()
        self.certificate_overlay = self.identity_overlay = None

    def setup_routes(self):
        """
        The paths that are available for REST calls.
        """
        super(CertificateEndpoint, self).setup_routes()
        self.app.add_routes([web.get('/certificate/recent', self.certificate_get),
                             web.get('/certificate/id', self.id_get),
                             web.post('/certificate', self.post_certificate),
                             web.post('/login', login)])
        # this adds the authentication middleware to the aiohttp configuration. Might want to refactor into separate
        # endpoint maybe. 
        self.app.middlewares.extend([auth_middleware, login_required_middleware])

    def initialize(self, session):
        """
        We initialize the AttestationCommunity,IdentityCommunity and CertificateCommunity
        """
        super(CertificateEndpoint, self).initialize(session)
        self.certificate_overlay = next((overlay for overlay in session.overlays
                                         if isinstance(overlay, CertCommunity)), None)

    async def certificate_get(self, request):
        formatted = []
        for k, v in self.certificate_overlay.certificates.items():
            formatted.append([k, v])
        return Response([{"id": x, "certificate": y} for x, y in formatted], status=200)

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
        if not self.certificate_overlay or not self.identity_overlay:
            return Response({"error": "certificate or identity community not found"},
                            status=HTTP_NOT_FOUND)

        args = request.query
        if not args or 'type' not in args:
            return Response({"error": "parameters or type missing"}, status=HTTP_BAD_REQUEST)

        if args['type'] == 'send':
            own_peer = cast_to_bin(self.identity_overlay.my_peer.mid)
            mid_b64 = args['mid']
            certificate_id = int(args['certificate_id'])
            peer = self.get_peer_from_mid(mid_b64)
            if certificate_id not in self.certificate_overlay.certificate_map:
                return Response({"error": "id not available"})

            if peer:
                self.certificate_overlay.send_certificate(peer, own_peer, certificate_id)
                return Response({"success": True})
            else:
                return Response({"error": "peer unknown"}, status=HTTP_BAD_REQUEST)

        elif args['type'] == 'delete':
            mid_b64 = args['mid']
            self.certificate_overlay.on_delete_certificate(mid_b64)
            return Response({"success": True})

        else:
            return Response({"error": "type argument incorrect"}, status=HTTP_BAD_REQUEST)
