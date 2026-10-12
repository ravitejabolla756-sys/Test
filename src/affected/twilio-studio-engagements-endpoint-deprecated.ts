// MY OWL FIXTURE
// Provider: Twilio
// Rule: twilio-studio-engagements-endpoint-deprecated
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import 'twilio';

export async function validate(): Promise<unknown> {
  return fetch('https://api.twilio.com/Engagements', {
    headers: {}
  });
}
