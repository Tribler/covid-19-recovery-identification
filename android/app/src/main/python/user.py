import bcrypt


class User:

    def __init__(self, id, password, is_doc):
        self.id = id
        self.password = password
        self.is_doc = is_doc

    def match_password(self, password):
        """
        bcrypt checks if the given password is equal to the hashed password.
        If the password is incorrect,
        it might take a long time as bcrypt is intentionally slow.
        """
        result = bcrypt.checkpw(password.encode("utf8"),
                                self.password.encode("utf8"))
        return result


class UserStorage:
    # Should only be one user.
    _storage = None

    @classmethod
    def create_user(cls, id, password, is_doc=False):
        cls._storage = User(id, password, is_doc)

    @classmethod
    def get(cls, id):
        return cls._storage

    @classmethod
    def registered(cls):
        return cls._storage is not None

    @classmethod
    def get_storage(cls):
        return cls._storage

    @classmethod
    def set_storage(cls, storage):
        """
        Read the JSON imported file into a User object.
        """
        cls._storage = User(storage['id'],
                            storage['password'],
                            storage['is_doc'])

    @classmethod
    def clear_storage(cls):
        cls._storage = None
