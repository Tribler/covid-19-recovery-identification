import os
from base64 import b64encode
from sys import modules

import bcrypt
from aiohttp import ClientSession

import auth
from certificate_endpoint import CertificateEndpoint
from ipv8.attestation.identity.community import IdentityCommunity
from ipv8.attestation.wallet.community import AttestationCommunity
from ipv8.test.REST.rest_base import RESTTestBase, partial_cls
from user import UserStorage

root = modules["ipv8.REST.root_endpoint"]
root.AttestationEndpoint = CertificateEndpoint
modules["ipv8.REST.rest_manager"].RootEndpoint = root.RootEndpoint


class TestAuth(RESTTestBase):

    def __init__(self, method_name):
        super().__init__(method_name)
        self.hashed_pw = bcrypt.hashpw('password'.encode('utf-8'),
                                       bcrypt.gensalt()).decode("utf-8")

    async def setUp(self):
        super(TestAuth, self).setUp()
        UserStorage.clear_storage()
        await self.initialize([partial_cls(AttestationCommunity,
                                           working_directory=':memory:'),
                               partial_cls(IdentityCommunity,
                                           working_directory=':memory:')], 2)
        # await self.log_in(self.nodes[0])

    def tearDown(self):
        if os.path.exists('credentials.txt'):
            os.remove('credentials.txt')

    async def make_request(self, node, endpoint, request_type,
                           arguments, jwt=None, auth=None, register=None,
                           user=None, password=None, doc=None,
                           json_response=True):
        url = 'http://127.0.0.1:%d/%s' % (node.rest_port, endpoint)
        headers = {'User-Agent': 'aiohttp'}
        if jwt:
            headers.update({'Authorization': jwt})
        elif auth:
            cred = f'{user}:{password}'.encode("utf-8")
            encoded = b64encode(cred).decode("utf-8")
            headers.update({'WWW-Authorization': 'Basic'})
            headers.update({'Authorization': encoded})
        elif register:
            cred = f'{password}:{doc}'.encode("utf-8")
            encoded = b64encode(cred).decode("utf-8")
            headers.update({'x-registration': encoded})

        async with ClientSession() as session:
            async with session.request(request_type, url, params=arguments,
                                       headers=headers) as response:
                return await response.json(
                    content_type=None) if json_response else await \
                    response.read()

    async def test_without_auth(self):
        """
        Test a request without giving a JWT token.
        """
        response = await self.make_request(self.nodes[0], 'attestation',
                                           'GET', {})
        self.assertEqual(response, {'message': 'Auth required'},
                         "Authentication is required to access the API")

    async def test_with_wrong_token(self):
        """
        Test a request while giving an incorrect JWT token.
        """
        response = await self.make_request(self.nodes[0], 'attestation', 'GET',
                                           {}, jwt="wrongjwttoken")
        self.assertEqual(response, {'message': 'Token is invalid'},
                         "The given JWT token should be invalid.")

    async def test_login(self):
        """
        Test a (POST: login) request.
        """
        UserStorage.create_user(id='user', password=self.hashed_pw)
        auth.write_credentials_file()

        response = await self.make_request(self.nodes[0],  # nosec
                                           'attestation/login',
                                           'POST', {}, auth=True, user="user",
                                           password="password")
        self.assertTrue("token" in response,
                        "The given credentials should be valid.")

    async def test_with_wrong_password(self):
        """
        Test a (POST: login) request while giving wrong credentials.
        """
        UserStorage.create_user(id='user', password=self.hashed_pw)

        response = await self.make_request(self.nodes[0],  # nosec
                                           'attestation/login',
                                           'POST', {}, auth=True, user="user",
                                           password="wrongpassword")
        self.assertEqual(response, {'message': 'Wrong credentials'},
                         "The given credentials should be invalid.")

    async def test_not_registered(self):
        """
        Test a (POST: login) request while not registered yet.
        """
        response = await self.make_request(self.nodes[0],  # nosec
                                           'attestation/login',
                                           'POST', {}, auth=True, user="user",
                                           password="wrongpassword")
        self.assertEqual(response, {'message': 'Wrong credentials'},
                         "The user should not be registered yet.")

    async def test_register(self):
        """
        Test a (POST: register) request.
        """
        response = await self.make_request(self.nodes[0],  # nosec
                                           'attestation/register', 'POST', {},
                                           register=True,
                                           user="user",
                                           password="password", doc=0)
        self.assertEqual(response, {'success': True},
                         "The registration should be successful")

    async def test_already_registered(self):
        """
        Test a (POST : register) request while already registered.
        :return:
        """
        UserStorage.create_user(id='user', password="password")  # nosec

        response = await self.make_request(self.nodes[0],  # nosec
                                           'attestation/register', 'POST', {},
                                           register=True,
                                           user="user",
                                           password="password", doc=0)
        self.assertEqual(response, {'message': 'Already registered'},
                         "The user should already be registered.")
