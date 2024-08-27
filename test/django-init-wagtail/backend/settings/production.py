from .base import *  # noqa
from backend.utils import get_ec2_metadata

DEBUG = False

try:
    from .local import *  # noqa
except ImportError:
    pass

LOCAL_IPV4 = get_ec2_metadata()
ALLOWED_HOSTS.append(LOCAL_IPV4)  # noqa
