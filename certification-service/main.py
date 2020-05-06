from base64 import b64encode

from asyncio import ensure_future, get_event_loop

from pyipv8.ipv8.configuration import get_default_configuration
from pyipv8.ipv8.REST.rest_manager import RESTManager
from pyipv8.ipv8_service import IPv8


async def start_communities():
    # Launch an IPv8 service. We run REST endpoints for this service on:
    # - http://localhost:14411/
    # This script also prints the peer ids for reference with:
    # - http://localhost:14411/attestation?type=peers
    # For now we are using just the basic configuration.
    configuration = get_default_configuration()
    ipv8 = IPv8(configuration)
    await ipv8.start()
    rest_manager = RESTManager(ipv8)
    await rest_manager.start(14411)

    # Print the peer for reference
    print("Starting peer", b64encode(ipv8.keys["anonymous id"].mid))


ensure_future(start_communities())
get_event_loop().run_forever()
