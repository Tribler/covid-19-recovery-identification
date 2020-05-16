from pyipv8.ipv8.REST.attestation_endpoint import AttestationEndpoint

from aiohttp import web

from pyipv8.ipv8.REST import json_util as json
from pyipv8.ipv8.REST.base_endpoint import BaseEndpoint, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, Response


class AttestationEndpointExtended(AttestationEndpoint):

    def __init__(self):
        super(AttestationEndpointExtended, self).__init__()
        self.certificates = {}


    def setup_routes(self):
        self.app.add_routes([web.get('/certificate', self.certificate_get),
                             web.get('', self.handle_get),
                             web.post('', self.handle_post)])

    async def certificate_get(self, request):
        return Response({"certificate": "this"}, status=200)