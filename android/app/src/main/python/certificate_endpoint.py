from base64 import b64encode

from aiohttp import web
import auth
from ipv8.REST.base_endpoint import HTTP_BAD_REQUEST, Response
from ipv8.REST.attestation_endpoint import AttestationEndpoint


class CertificateEndpoint(AttestationEndpoint):
    """
    This endpoint is responsible for handing all requests regarding
    Certificates.
    """

    def __init__(self):
        super(CertificateEndpoint, self).__init__()

    def setup_routes(self):
        """
        The paths that are available for REST calls.
        """
        super(CertificateEndpoint, self).setup_routes()
        self.app.add_routes(
                [web.get('/id', self.id_get),
                 web.post('/login', self.login_handler),
                 web.post('/register', self.register_handler),
                 web.post('/rm-outstanding', self.remove_outstanding)])
        # this adds the authentication middleware to the aiohttp
        # configuration. Might want to refactor into separate
        # endpoint maybe.
        self.app.middlewares.extend(
                [auth.auth_middleware, auth.login_required_middleware])

    def initialize(self, session):
        """
        We initialize the AttestationCommunity,IdentityCommunity and
        CertificateCommunity.
        """
        super(CertificateEndpoint, self).initialize(session)

    async def id_get(self, request):
        """
        Returns the ID of the own peer.
        """
        peer_id = b64encode(self.identity_overlay.my_peer.mid).decode('utf-8')
        return Response({"id": peer_id}, status=200)

    async def remove_outstanding(self, request):
        """
        Removes outstanding attestation requests.
        """
        args = request.query
        if not args or 'type' not in args:
            return Response({"error": "parameters or type missing"},
                            status=HTTP_BAD_REQUEST)
        if args['type'] == 'attest':
            mid_b64 = args['mid']
            attribute_name = args['attribute_name']
            self.attestation_requests.pop((mid_b64, attribute_name))
        elif args['type'] == 'verify':
            mid_b64 = args['mid']
            attribute_name = args['attribute_name']
            self.verify_requests.pop((mid_b64, attribute_name))
        return Response({"success": True}, status=200)

    @staticmethod
    async def login_handler(request):
        return await auth.login(request)

    @staticmethod
    async def register_handler(request):
        return await auth.register(request)
