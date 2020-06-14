import jwt
import json
import bcrypt
from aiohttp.web_middlewares import middleware
from base64 import b64decode
from os import urandom, path

from user import UserStorage
from ipv8.REST.base_endpoint import Response


def directory():  # pragma: no cover
    try:
        from com.chaquo.python import Python
        return str(
            Python.getPlatform().getApplication().getFilesDir()) + \
               '/certificates/credentials.txt'
    except ModuleNotFoundError as e:
        if str(e) != "No module named 'com'":
            raise
        else:
            return './credentials.txt'


JWT_SECRET = urandom(32).hex()
JWT_ALGORITHM = 'HS256'
working_directory = directory()


@middleware
async def auth_middleware(request, handler):
    """
    Middleware that gets the JWT token in the "authorization" header. Checks
    if this JWT token is valid and not
    expired. Passes the result to the login_required_middleware.
    """
    request.user = None
    auth_type = request.headers.get('WWW-Authorization', None)
    jwt_token = request.headers.get('Authorization', None)
    if jwt_token and not auth_type == 'Basic':
        try:
            jwt.decode(jwt_token, JWT_SECRET,
                       algorithms=[JWT_ALGORITHM])
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return Response({'message': 'Token is invalid'},
                            status=400)

        request.user = UserStorage.get_storage()
    return await handler(request)


@middleware
async def login_required_middleware(request, handler):
    """
    Middleware that checks if you are authenticated. Depending on the result
    of auth_middleware, one either passes
    the request to the actual handler or gives an 401 error. The login
    handler is exempted from this check.
    """

    if (request.path == '/attestation/login') or \
            (request.path == '/attestation/register'):
        return await handler(request)
    if not request.user:
        return Response({'message': 'Auth required'}, status=401)
    return await handler(request)


async def login(request):
    """
    Login handler which fetches the password from the body and compares it
    to the saved password. If they match up,
    returns a JWT token.
    """
    read_credentials_file()
    auth = request.headers.get('Authorization')
    auth = b64decode(auth.encode('utf-8')).decode('utf-8').split(':')
    user = UserStorage.get_storage()
    if (user is None) or (user.match_password(auth[1]) is False):
        return Response({'message': 'Wrong credentials'}, status=400)

    payload = {
            'user_id': user.id,
            'is_attester': user.is_attester
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return Response({'token': jwt_token.decode('utf-8')})


async def register(request):
    """
    Register handler. Checks if you already registered, if not persist the
    user. Registration is done by checking the x-registration header. It is in
    the form password:is_attester in base64 form.
    """
    if UserStorage.registered():
        return Response({'message': 'Already registered'}, status=400)
    cred = request.headers.get('x-registration')
    cred = b64decode(cred.encode('utf-8')).decode('utf-8').split(':')
    pwd = cred[0].encode('utf8')
    hashed_pw = bcrypt.hashpw(pwd, bcrypt.gensalt()).decode("utf-8")
    UserStorage.create_user("user", hashed_pw, cred[1])
    write_credentials_file()
    return Response({'success': True})


def read_credentials_file():
    """
    Put credentials in User Storage.
    """
    # Check if the file exists.
    if path.exists(working_directory):
        # Write your credentials to User.UserStorage.
        UserStorage.set_storage(json.load(open(working_directory)))


def write_credentials_file():
    """
    Write credentials to file.
    """
    f = open(working_directory, 'w')
    # To serialize a simple class  to JSON in python, we can call __dict__.
    f.write(json.dumps(UserStorage.get_storage().__dict__))
    f.close()
