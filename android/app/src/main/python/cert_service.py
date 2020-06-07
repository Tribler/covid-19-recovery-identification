from asyncio import set_event_loop, get_event_loop, ensure_future, run_coroutine_threadsafe
from sys import modules
from threading import Thread

from com.chaquo.python import Python
from ipv8.REST.rest_manager import RESTManager
from ipv8.configuration import get_default_configuration
from ipv8_service import IPv8

from cert_community import CertCommunity
from certificate_endpoint import CertificateEndpoint


# Launch an IPv8 service. We run REST endpoints for this service on http://localhost:8085/
# Initial Service Configuration
configuration = get_default_configuration()

# On Android we need the complete path when new files are created!
files_dir = str(Python.getPlatform().getApplication().getFilesDir())

# Generate signature keys
configuration['keys'] = [
        {'alias': "anonymous id", 'generation': u"curve25519",
         'file': files_dir + u"/ec_multichain.pem"},
        {'alias': "my peer", 'generation': u"medium",
         'file': files_dir + u"/ec.pem"}
]

# Only load the basic communities.
requested_overlays = ['DHTDiscoveryCommunity', 'AttestationCommunity',
                      'IdentityCommunity']
configuration['overlays'] = [o for o in configuration['overlays']
                             if o['class'] in requested_overlays]

# Give a working directory.
working_directory_overlays = ['AttestationCommunity', 'IdentityCommunity']
for overlay in configuration['overlays']:
    if overlay['class'] in working_directory_overlays:
        overlay['initialize'] = {'working_directory': files_dir + '/certificates'}

# Add the new Certification Community to the Configuration
cert_community = {
        'class': 'CertCommunity',
        'key': "my peer",
        'walkers': [{
                'strategy': "RandomWalk",
                'peers': 10,
                'init': {
                        'timeout': 3.0
                }
        }],
        'initialize': {'working_directory': files_dir + '/certificates'},
        'on_start': []
}
configuration['overlays'].append(cert_community)

# Overriding one endpoint in the RootEndpoint
root_endpoint = modules["ipv8.REST.root_endpoint"]
root_endpoint.AttestationEndpoint = CertificateEndpoint
modules["ipv8.REST.rest_manager"].RootEndpoint = root_endpoint.RootEndpoint

# SetUp the certification service.
ipv8 = IPv8(configuration, extra_communities={'CertCommunity': CertCommunity})
rest_manager = RESTManager(ipv8)


def run_in_thread(loop):
    # Start the secondary thread which caries the heavy work.
    set_event_loop(loop)
    ensure_future(start_communities())
    loop.run_forever()


async def start_communities():
    # Start the certification service.
    await ipv8.start()
    await rest_manager.start()


def stop():
    # Stop the certification service.
    run_coroutine_threadsafe(rest_manager.stop(), get_event_loop())
    run_coroutine_threadsafe(ipv8.stop(), get_event_loop())


def start():
    # Service entry point.
    Thread(target=run_in_thread, args=(get_event_loop(), )).start()
