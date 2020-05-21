from ipv8.REST.attestation_endpoint import AttestationEndpoint
from ipv8.REST.dht_endpoint import DHTEndpoint
from ipv8.REST.isolation_endpoint import IsolationEndpoint
from ipv8.REST.network_endpoint import NetworkEndpoint
from ipv8.REST.noblock_dht_endpoint import NoBlockDHTEndpoint
from ipv8.REST.overlays_endpoint import OverlaysEndpoint
from ipv8.REST.root_endpoint import RootEndpoint
from ipv8.REST.trustchain_endpoint import TrustchainEndpoint
from ipv8.REST.tunnel_endpoint import TunnelEndpoint

from certificate_endpoint import CertificateEndpoint


class RootEndpointExtended(RootEndpoint):
    def setup_routes(self):
        endpoints = {'/attestation': AttestationEndpoint,
                     '/certificate': CertificateEndpoint,
                     '/dht': DHTEndpoint,
                     '/isolation': IsolationEndpoint,
                     '/network': NetworkEndpoint,
                     '/noblockdht': NoBlockDHTEndpoint,
                     '/overlays': OverlaysEndpoint,
                     '/trustchain': TrustchainEndpoint,
                     '/tunnel': TunnelEndpoint}
        for path, ep_cls in endpoints.items():
            self.add_endpoint(path, ep_cls())
