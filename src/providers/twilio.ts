import twilio from 'twilio';

export function getTwilioClient(): twilio.Twilio {
  const accountSid = process.env.TWILIO_ACCOUNT_SID ?? 'AC00000000000000000000000000000000';
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? 'fixture_twilio_auth_token_placeholder';
  return twilio(accountSid, authToken);
}

export async function sendSmsNotification(
  client: twilio.Twilio,
  to: string,
  from: string,
  body: string
) {
  // SMS creation example (uninvoked during automated tests)
  return client.messages.create({
    to,
    from,
    body
  });
}
