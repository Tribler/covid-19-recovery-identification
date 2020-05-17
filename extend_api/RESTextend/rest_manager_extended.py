from aiohttp import web

from aiohttp_apispec import setup_aiohttp_apispec

from pyipv8.ipv8.REST.rest_manager import RESTManager
from RESTextend.root_endpoint_extended import RootEndpointExtended


@web.middleware
async def cors_middleware(request, handler):
    preflight_cors = request.method == "OPTIONS" and 'Access-Control-Request-Method' in request.headers
    if not preflight_cors:
        return await handler(request)

    response = web.StreamResponse()
    # For now, just allow all methods
    response.headers['Access-Control-Allow-Methods'] = "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Max-Age'] = str(86400)
    return response


class RESTManagerExtended(RESTManager):
    async def start(self, port=8085, host='127.0.0.1'):
        """
        Starts the HTTP API with the listen port as specified in the session configuration.
        """
        root_endpoint = RootEndpointExtended(middlewares=[cors_middleware])
        root_endpoint.initialize(self.session)
        setup_aiohttp_apispec(
            app=root_endpoint.app,
            title="IPv8 REST API documentation",
            version="v1.9",
            url="/docs/swagger.json",
            swagger_path="/docs",
        )

        from apispec.core import VALID_METHODS_OPENAPI_V2
        if 'head' in VALID_METHODS_OPENAPI_V2:
            VALID_METHODS_OPENAPI_V2.remove('head')

        runner = web.AppRunner(root_endpoint.app, access_log=None)
        await runner.setup()
        # If localhost is used as hostname, it will randomly either use 127.0.0.1 or ::1
        self.site = web.TCPSite(runner, host, port)
        await self.site.start()
