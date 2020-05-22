from base64 import b64encode
from asyncio import set_event_loop, new_event_loop, ensure_future, get_event_loop
from com.chaquo.python import Python

from ipv8.configuration import get_default_configuration
from ipv8.REST.rest_manager import RESTManager
from ipv8_service import IPv8


async def start_communities():
    # Launch an IPv8 service. We run REST endpoints for this service on:
    # - http://localhost:14411/
    # This script also prints the peer ids for reference with:
    # - http://localhost:14411/attestation?type=peers
    # For now we are using just the basic configuration.
    configuration = get_default_configuration()

    # On Android we need the complete path when new files are created.
    files_dir = str(Python.getPlatform().getApplication().getFilesDir())
    configuration['keys'] = [
            {'alias': "anonymous id", 'generation': u"curve25519",
             'file': files_dir + u"/ec_multichain.pem"},
            {'alias': "my peer", 'generation': u"medium",
             'file': files_dir + u"/ec.pem"}
    ]
    # Only load the basic communities.
    requested_overlays = ['DiscoveryCommunity', 'AttestationCommunity', 'IdentityCommunity']
    configuration['overlays'] = [o for o in configuration['overlays']
                                 if o['class'] in requested_overlays]

    # Give a working directory.
    working_directory_overlays = ['AttestationCommunity', 'IdentityCommunity']
    for overlay in configuration['overlays']:
        if overlay['class'] in working_directory_overlays:
            overlay['initialize'] = {'working_directory': files_dir + '/certificates'}

    # Start the attestation service.
    ipv8 = IPv8(configuration)
    await ipv8.start()
    rest_manager = RESTManager(ipv8)
    await rest_manager.start(14411)

    # Print the peer for reference
    print("Starting peer", b64encode(ipv8.keys["anonymous id"].mid))


def main():
    # This method is needed, since Chaquopy's bridge
    # can only run methods of modules.
    # There is no thread available before this line.
    set_event_loop(new_event_loop())
    ensure_future(start_communities())
    get_event_loop().run_forever()

def stop():
    get_event_loop().stop()
