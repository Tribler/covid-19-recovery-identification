from base64 import b64encode

from cert_community import CertCommunity
from pyipv8.ipv8.REST.attestation_endpoint import AttestationEndpoint

from aiohttp import web

from pyipv8.ipv8.REST import json_util as json
from pyipv8.ipv8.REST.base_endpoint import BaseEndpoint, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, Response
from pyipv8.ipv8.messaging.lazy_payload import VariablePayload


class CertificateEndpoint(BaseEndpoint):

    def __init__(self):
        super(CertificateEndpoint, self).__init__()
        self.certificate_overlay = None

    def initialize(self, session):
        super(CertificateEndpoint, self).initialize(session)
        self.certificate_overlay = next((overlay for overlay in session.overlays
                                         if isinstance(overlay, CertCommunity)), None)

    def setup_routes(self):
        self.app.add_routes([web.get('/recent', self.certificate_get),
                             web.get('/id', self.id_get),
                             web.post('', self.send_certificate)
                             ])

    async def certificate_get(self, request):
        return Response({"certificate": "this"}, status=200)

    async def id_get(self, request):
        peerID = self.identity_overlay.my_peer.mid
        return Response({"id": b64encode(peerID).decode('utf-8')}, status=200)

    def send_certificate(self, request):
        if not request.query or 'type' not in request.query:
            return Response({"error": "parameters or type missing"}, status=HTTP_BAD_REQUEST)

        args = request.query
        if args['type'] == 'send':
            mid_b64 = args['mid']
            certificate_name = args['certificate_name']
            peer = self.get_peer_from_mid(mid_b64)
            self.certificate_overlay.send_certificate(peer, certificate_name)
            return Response({"success": True})
