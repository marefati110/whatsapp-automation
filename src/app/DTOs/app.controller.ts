export class LoginPayload {
  phoneNumber: string;
}

export class SendMessagePayload {
  sourcePhoneNumber: string;
  targetPhoneNumber: string;
  message: string;
}
