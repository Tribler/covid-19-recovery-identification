class User:

    def __init__(self, id, password, is_doc):
        self.id = id
        self.password = password
        self.is_doc = is_doc

    def match_password(self, password):
        if password != self.password:
            raise User.PasswordDoesNotMatch

    class DoesNotExist(BaseException):
        pass

    class TooManyObjects(BaseException):
        pass

    class PasswordDoesNotMatch(BaseException):
        pass

    class UserStorage:
        _storage = {}

        @classmethod
        def create_user(cls, id, password, is_doc=False):
            cls._storage[id] = User(id, password, is_doc)

        @classmethod
        def get(cls, id):
            return cls._storage[id]
