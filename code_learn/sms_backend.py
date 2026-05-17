from phone_verify.backends.base import BaseBackend
from phone_verify.models import SMSVerification
from sms_ir import SmsIr


class SMSBackend(BaseBackend):
    def __init__(self, **options):
        super().__init__(**options)
        options = {key.lower(): value for key, value in options.items()}
        self._key = options.get('key')
        self._from = options.get('from')
        self.client = SmsIr(self._key, self._from)

    def send_sms(self, number, message):
        self.client.send_sms(number, message)

    def send_bulk_sms(self, numbers, message):
        self.client.send_bulk_sms(numbers, message)


class SMSSandboxBackend(BaseBackend):
    def __init__(self, **options):
        super().__init__(**options)
        options = {key.lower(): value for key, value in options.items()}
        self._key = options.get('sandbox_key')
        self._from = options.get('from')
        self._token = options.get("sandbox_token")
        # fake client
        # self.client = SmsIr(self._key, self._from)

    def generate_message(self, security_code, context=None):
        return f"[SANDBOX] Your code is {security_code}"

    def send_sms(self, number, message):
        # fakeclient.fake_send_sms(self, number, message)
        print(message)

    def send_bulk_sms(self, numbers, message):
        # fakeclient.send_bulk_sms(numbers, message)
        print(message)

    def generate_security_code(self):
        return self._token

    def validate_security_code(self, security_code, phone_number, session_token):
        return SMSVerification.objects.none(), self.SECURITY_CODE_VALID