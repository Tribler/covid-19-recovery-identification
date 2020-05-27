from asyncio import ensure_future, get_event_loop, \
    new_event_loop, set_event_loop
from threading import Thread
from sys import modules

from com.chaquo.python import Python
from ipv8.REST.rest_manager import RESTManager
from ipv8.configuration import get_default_configuration
from ipv8_service import IPv8

from cert_community import CertCommunity
from certificate_endpoint import CertificateEndpoint


async def start_communities():
    # Launch an IPv8 service. We run REST endpoints for this service on:
    # - http://localhost:8085/
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

    # Start the attestation service.
    ipv8 = IPv8(configuration, extra_communities={'CertCommunity': CertCommunity})
    await ipv8.start()
    root = modules["ipv8.REST.root_endpoint"]
    root.AttestationEndpoint = CertificateEndpoint
    modules["ipv8.REST.rest_manager"].RootEndpoint = root.RootEndpoint
    rest_manager = RESTManager(ipv8)
    await rest_manager.start()


def start():
    set_event_loop(new_event_loop())
    ensure_future(start_communities())
    Thread(target=get_event_loop().run_forever).start()


def stop():
    get_event_loop().stop()
