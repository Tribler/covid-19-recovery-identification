import sys
from binascii import hexlify

from ipv8.keyvault.crypto import ECCrypto

# This script generates a curve25519 key and prints it in hex format
if '--public' in sys.argv:
    print(hexlify(ECCrypto().generate_key(u"curve25519").pub().key_to_bin()))
else:
    print(hexlify(ECCrypto().generate_key(u"curve25519").key_to_bin()))
