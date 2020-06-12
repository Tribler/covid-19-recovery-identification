import os
from asyncio import sleep
from base64 import b64encode
from sys import modules

import bcrypt
from aiohttp import ClientSession

from certificate_endpoint import CertificateEndpoint
from certificate_community import CertCommunity
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
        if os.path.exists('resource/certificates.txt'):
            os.remove('resource/certificates.txt')
        await self.initialize([partial_cls(AttestationCommunity,
                                           working_directory=':memory:'),
                               partial_cls(IdentityCommunity,
                                           working_directory=':memory:'),
                               partial_cls(CertCommunity,
                                           working_directory='resource')], 2)
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
        return await self.make_request(node, 'attestation/certificate/id',
                                       'GET', {})

    async def make_outstanding_certificates(self, node):
        """
        Forward a request to fetch the outstanding certificates for a peer.
        """
        return await self.make_request(node,
                                       'attestation/certificate/recent',
                                       'GET', {})

    async def make_send_certificate(self, node, certificate_id, mid):
        """
        Forward a request to make a certificate.
        """
        return await self.make_request(node, 'attestation/certificate',
                                       'POST',
                                       {'type': 'send',
                                        'certificate_id': certificate_id,
                                        'mid': mid})

    async def make_delete_certificate(self, node, mid):
        """
        Forward a request to delete a certificate.
        """
        return await self.make_request(node, 'attestation/certificate',
                                       'POST', {'type': 'delete', 'mid': mid})

    async def create_certificate_request(self, node, certificate_id):
        """
        Helper method for test_post_certificate and test_get_certificate.
        """
        peer_list = await self.wait_for_peers(node)
        for mid in peer_list:
            await self.make_send_certificate(node, certificate_id, mid)

    async def wait_for_outstanding_certificates(self, node):
        """
        Wait until this peer receives a non-empty list of outstanding
        certificate requests.
        """
        outstanding_requests = await self.make_outstanding_certificates(node)
        while not outstanding_requests:
            await sleep(.1)
            outstanding_requests = await self.make_outstanding_certificates(
                    node)
        return [x for x in outstanding_requests]

    async def test_get_id(self):
        """
        Test the (GET : id) request type.
        """
        result = await self.make_id(self.nodes[0])
        self.assertTrue(
                result["id"] == b64encode(self.nodes[0].my_peer.mid).decode(
                        'utf-8'),
                "The returned peer ID is not equal to your own peer ID.")

    async def test_get_certificate(self):
        """
        Test the (GET: recent) request type.
        """
        await self.introduce_nodes()
        await self.create_certificate_request(self.nodes[1], 1)

        result = await self.wait_for_outstanding_certificates(self.nodes[0])
        mid = b64encode(self.nodes[1].my_peer.mid).decode('utf-8')
        self.assertEqual(result[0], {"id": mid + "cv19-i",
                                     "certificate": [mid, 'cv19-i']})

    async def test_post_send_certificate(self):
        """
        Test the (POST: send) request type.
        """
        outstanding_certificates = await self.make_outstanding_certificates(
                self.nodes[0])
        self.assertEqual(outstanding_certificates, [],
                         "Should be no outstanding certificates")

        await self.introduce_nodes()
        await self.create_certificate_request(self.nodes[1], 1)
        mid = b64encode(self.nodes[1].my_peer.mid).decode('utf-8')

        outstanding_certificates = await self.make_outstanding_certificates(
                self.nodes[0])
        self.assertEqual(outstanding_certificates, [
                {"id": mid + "cv19-i", "certificate": [mid, 'cv19-i']}],
                         "List of outstanding certificates should not be "
                         "empty")

        await self.create_certificate_request(self.nodes[1], 2)
        outstanding_certificates = await self.make_outstanding_certificates(
                self.nodes[0])
        self.assertEqual(outstanding_certificates, [
                {"id": mid + "cv19-i", "certificate": [mid, 'cv19-i']},
                {"id": mid + "hepB-v", "certificate": [mid, 'hepB-v']}
        ],
                         "List of outstanding certificates should include "
                         "two certificates.")

    async def test_post_delete_certificate(self):
        """
        Test the (POST: delete) request type.
        """
        await self.introduce_nodes()
        await self.create_certificate_request(self.nodes[1], 1)
        mid = b64encode(self.nodes[1].my_peer.mid).decode('utf-8')

        outstanding_certificates = await self.make_outstanding_certificates(
                self.nodes[0])
        self.assertEqual(outstanding_certificates, [
                {"id": mid + "cv19-i", "certificate": [mid, 'cv19-i']}],
                         "List of outstanding certificates should not be "
                         "empty")

        await self.make_delete_certificate(self.nodes[0], mid + "cv19-i")

        outstanding_certificates = await self.make_outstanding_certificates(
                self.nodes[0])
        self.assertEqual(outstanding_certificates, [],
                         "List of outstanding certificates should be deleted")

    async def test_post_certificate_wrong(self):
        """
        Test POST request with no args, no peer found.
        """
        result = await self.make_request(self.nodes[0],
                                         'attestation/certificate', 'POST', {})
        self.assertEqual(result, {'error': 'parameters or type missing'},
                         "No args should give error but didn't.")

        result2 = await self.make_send_certificate(self.nodes[0], 1, b64encode(
                b"notapeer").decode('utf-8'))
        self.assertEqual(result2, {'error': 'peer unknown'},
                         "Peer should not be known while post certificate.")

        await self.introduce_nodes()
        mid = b64encode(self.nodes[1].my_peer.mid).decode('utf-8')
        result3 = await self.make_request(self.nodes[0],
                                          'attestation/certificate',
                                          'POST', {'type': 'send',
                                                   'certificate_id': -1,
                                                   'mid': mid})

        self.assertEqual(result3, {'error': 'id not available'},
                         "certificate_id should not be a valid id.")
        result4 = await self.make_request(self.nodes[0],
                                          'attestation/certificate',
                                          'POST', {'type': 'notavalidtype',
                                                   'certificate_id': 1,
                                                   'mid': mid})

        self.assertEqual(result4, {'error': 'type argument incorrect'},
                         "Wrong type, should not be accepted.")


class TestCertificateEndpointWithoutCommunity(RESTTestCert):
    """
    Class for testing the rest API of the CertificateEndpoint without
    setting up the proper communities.
    """

    async def setUp(self):
        super(TestCertificateEndpointWithoutCommunity, self).setUp()
        if os.path.exists('resource/certificates.txt'):
            os.remove('resource/certificates.txt')

    async def test_post_certificate_wrong_no_id_community(self):
        await self.initialize(
                [partial_cls(CertCommunity, working_directory='resource')], 1)
        await self.log_in(self.nodes[0])
        await self.introduce_nodes()
        mid = b64encode(self.nodes[0].my_peer.mid).decode('utf-8')
        result = await self.make_request(self.nodes[0],
                                         'attestation/certificate', 'POST',
                                         {'type': 'send',
                                          'certificate_id': 1,
                                          'mid': mid})
        self.assertEqual(result, {
                'error': 'certificate or identity community not found'},
                         """One of the communities should
                         not have been initialized.""")
