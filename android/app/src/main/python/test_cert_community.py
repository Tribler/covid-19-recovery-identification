import json
import os

from cert_community import CertCommunity
from ipv8.test.base import TestBase
from ipv8.test.mocking.ipv8 import MockIPv8



class TestCertCommunity(TestBase):

    def setUp(self):
        super(TestCertCommunity, self).setUp()
        if os.path.exists('resource/certificates.txt'):
            os.remove('resource/certificates.txt')

    def create_node(self):
        return MockIPv8(u"curve25519", CertCommunity, working_directory=u"resource")

    def test_read_certificates_file(self):
        self.assertEqual(os.path.exists('resource/certificates.txt'), False, "Should not be a file here yet")
        self.initialize(CertCommunity, 2)
        self.create_node()
        self.assertEqual(os.path.exists('resource/certificates.txt'), True, "File should still be there")

    def test_read_certificates_file_already_there(self):
        self.assertEqual(os.path.exists('resource/certificates.txt'), False, "Should not be a file here yet")
        f = open('resource/certificates.txt', 'a')
        f.write(json.dumps({
            "peer1": "cv19"
        }))
        f.close()
        self.initialize(CertCommunity, 2)
        node = self.create_node()
        self.assertEqual(len(node.get_overlay(CertCommunity).certificates), 1, "empty certificates")
        self.assertEqual(os.path.exists('resource/certificates.txt'), True, "File should still be there")
