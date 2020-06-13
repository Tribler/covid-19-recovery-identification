import os
from asyncio import sleep
from base64 import b64encode
from sys import modules

import bcrypt
from aiohttp import ClientSession

from certificate_endpoint import CertificateEndpoint
from ipv8.attestation.identity.community import IdentityCommunity
from ipv8.attestation.wallet.community import AttestationCommunity
from ipv8.test.REST.rest_base import RESTTestBase, partial_cls
from user import UserStorage

root = modules["ipv8.REST.root_endpoint"]
root.AttestationEndpoint = CertificateEndpoint
modules["ipv8.REST.rest_manager"].RootEndpoint = root.RootEndpoint


class RESTTestCert(RESTTestBase):
    def __init__(self, method_name):
        super(RESTTestCert, self).__init__(method_name)
        self.jwt = None
        self.user = 'user'
        self.password = 'password'

    async def make_request(self, node, endpoint, request_type,
                           arguments, json_response=True):
        url = 'http://127.0.0.1:%d/%s' % (node.rest_port, endpoint)
        headers = {'User-Agent': 'aiohttp'}
        if self.jwt:
            headers.update({'Authorization': self.jwt})
        else:
            cred = f'{self.user}:{self.password}'.encode("utf-8")
            encoded = b64encode(cred).decode("utf-8")
            headers.update({'WWW-Authorization': 'Basic'})
            headers.update({'Authorization': encoded})

        async with ClientSession() as session:
            async with session.request(request_type, url, params=arguments,
                                       headers=headers) as response:
                return await response.json(
                        content_type=None) if json_response else await \
                    response.read()

    async def log_in(self, node):
        """
        Forward a request for return of ID of a peer.
        """
        response = await self.make_request(node, 'attestation/login',
                                           'POST', {})
        self.jwt = response['token']
        return response


class TestCertificateEndpoint(RESTTestCert):
    """
    Class for testing the REST API of the CertificateEndpoint.
    """

    async def setUp(self):
        super(TestCertificateEndpoint, self).setUp()
        if os.path.exists('resource/credentials.txt'):
            os.remove('resource/credentials.txt')
        await self.initialize([partial_cls(AttestationCommunity,
                                           working_directory=':memory:'),
                               partial_cls(IdentityCommunity,
                                           working_directory=':memory:')], 2)
        hashed_pw = bcrypt.hashpw('password'.encode('utf-8'),
                                  bcrypt.gensalt()).decode("utf-8")
        UserStorage.create_user(id='user', password=hashed_pw)  # nosec
        await self.log_in(self.nodes[0])

    async def wait_for_peers(self, node):
        """
        Wait until this peer receives a non-empty list of fellow peers in
        the network
        """
        peer_list = await self.make_request(node, 'attestation', 'get',
                                            {'type': 'peers'})
        while not peer_list:
            await sleep(.1)
            peer_list = await self.make_request(node, 'attestation', 'get',
                                                {'type': 'peers'})
        return peer_list

    async def make_id(self, node):
        """
        Forward a request for return of ID of a peer.
        """
        return await self.make_request(node, 'attestation/id',
                                       'GET', {})

    async def test_get_id(self):
        """
        Test the (GET : id) request type.
        """
        result = await self.make_id(self.nodes[0])
        self.assertTrue(
                result["id"] == b64encode(self.nodes[0].my_peer.mid).decode(
                        'utf-8'),
                "The returned peer ID is not equal to your own peer ID.")
