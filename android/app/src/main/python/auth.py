from datetime import datetime, timedelta

import jwt
from aiohttp.web_middlewares import middleware

from User import User
from ipv8.REST.base_endpoint import Response

JWT_SECRET = 'secretwoo'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 600

User.UserStorage.create_user(id='user', password='password')


@middleware
async def auth_middleware(request, handler):
    request.user = None
    jwt_token = request.headers.get('authorization', None)
    if jwt_token:
        try:
            payload = jwt.decode(jwt_token, JWT_SECRET,
                                 algorithms=[JWT_ALGORITHM])
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return Response({'message': 'Token is invalid'},
                            status=400)

        request.user = User.UserStorage.get(id=payload['user_id'])
    return await handler(request)


@middleware
async def login_required_middleware(request, handler):
    if handler == login:
        return await handler(request)
    if not request.user:
        return Response({'message': 'Auth required'}, status=401)
    return await handler(request)


async def login(request):
    post_data = await request.post()

    try:
        user = User.UserStorage.get(post_data['user_id'])
        user.match_password(post_data['password'])
    except (User.DoesNotExist, User.PasswordDoesNotMatch):
        return Response({'message': 'Wrong credentials'}, status=400)

    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return Response({'token': jwt_token.decode('utf-8')})

