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

// MY OWL compatibility certification fixture.
// Intentionally contains reviewed legacy API usage.
// Expected rule: twilio-twiml-namespace-casing
export function buildLegacyVoiceResponse(): unknown {
  const twilioClient = getTwilioClient();
  // Target symbol: Twiml.VoiceResponse
  const response = new (twilioClient as any).Twiml.VoiceResponse();
  return response.toString();
}

