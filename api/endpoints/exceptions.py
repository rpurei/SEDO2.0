class UserNotFound(Exception):
    """Raised when user not found"""
    pass


class UserNotActive(Exception):
    """Raised when user not active"""
    pass


class ObjectNotFound(Exception):
    """Raised when object not found"""
    pass


class AuthError(Exception):
    """Raised when authorization error occured"""
    pass


class NotPermitted(Exception):
    """Raised when not enough permissions"""
    pass
