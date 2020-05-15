from base64 import b64encode

from asyncio import ensure_future, get_event_loop

from pyipv8.ipv8.community import Community
from pyipv8.ipv8.configuration import get_default_configuration
from pyipv8.ipv8.REST.rest_manager import RESTManager
from pyipv8.ipv8.keyvault.crypto import ECCrypto
from pyipv8.ipv8.lazy_community import lazy_wrapper
from pyipv8.ipv8.messaging.lazy_payload import VariablePayload
from pyipv8.ipv8.peer import Peer
from pyipv8.ipv8_service import IPv8


class MyMessage(VariablePayload):
    format_list = ['I']  # When reading data, we unpack an unsigned integer from it.
    names = ["certificate"]  # We will name this unsigned integer "clock"


class MyCommunity(Community):
    master_peer = Peer(ECCrypto().generate_key(u"medium"))


    def __init__(self, my_peer, endpoint, network):
        super(MyCommunity, self).__init__(my_peer, endpoint, network)
        # Register the message handler for messages with the identifier "1".
        self.add_message_handler(1, self.on_message)
        # The Lamport clock this peer maintains.
        # This is for the example of global clock synchronization.
        self.lamport_clock = 0

    def started(self):
        async def start_communication():
            if not self.lamport_clock:
                # If we have not started counting, try boostrapping
                # communication with our other known peers.
                for p in self.get_peers():
                    self.send_message(p.address)
            else:
                self.cancel_pending_task("start_communication")
        self.register_task("start_communication", start_communication, interval=5.0, delay=0)

    def send_message(self, address):
        # Send a message with our digital signature on it.
        # We use the latest version of our Lamport clock.
        self.endpoint.send(address, self.ezr_pack(1, MyMessage(self.lamport_clock)))

    @lazy_wrapper(MyMessage)
    def on_message(self, peer, payload):
        # Update our Lamport clock.
        self.lamport_clock = max(self.lamport_clock, payload.clock) + 1
        print(self.my_peer, "current clock:", self.lamport_clock)
        # Then synchronize with the rest of the network again.
        self.send_message(peer.address)



async def start_communities():
    # Launch two IPv8 services.
    # We run REST endpoints for these services on:
    #  - http://localhost:14411/
    #  - http://localhost:14412/
    # This script also prints the peer ids for reference with:
    #  - http://localhost:1441*/attestation?type=peers
    for i in [1, 2]:
        configuration = get_default_configuration()
        configuration['logger']['level'] = "ERROR"
        configuration['keys'] = [
            {'alias': "anonymous id", 'generation': u"curve25519", 'file': u"ec%d_multichain.pem" % i},
            {'alias': "my peer", 'generation': u"medium", 'file': u"ec%d.pem" % i}
        ]

        # Only load the basic communities
        requested_overlays = ['DiscoveryCommunity', 'AttestationCommunity', 'IdentityCommunity']
        configuration['overlays'] = [o for o in configuration['overlays'] if o['class'] in requested_overlays]

        # Give each peer a separate working directory
        working_directory_overlays = ['AttestationCommunity', 'IdentityCommunity']
        for overlay in configuration['overlays']:
            if overlay['class'] in working_directory_overlays:
                overlay['initialize'] = {'working_directory': 'state_%d' % i}
        new_community = {
            'class': 'MyCommunity',
            'key': "my peer",
            'walkers': [{
                'strategy': "RandomWalk",
                'peers': 10,
                'init': {
                    'timeout': 3.0
                }
            }],
            'initialize': {},
            'on_start': [('started',)]
        }
        configuration['overlays'].update(new_community)

        # Start the IPv8 service
        ipv8 = IPv8(configuration, extra_communities={'MyCommunity': MyCommunity})
        await ipv8.start()
        rest_manager = RESTManager(ipv8)
        await rest_manager.start(14410 + i)

        # Print the peer for reference
        print("Starting peer", b64encode(ipv8.keys["anonymous id"].mid))


ensure_future(start_communities())
get_event_loop().run_forever()
