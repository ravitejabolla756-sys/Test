// MY OWL FIXTURE
// Provider: Twilio
// Rule: twilio-regional-api-domain-removal-2026-04-28
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import 'twilio';

export async function validate(): Promise<unknown> {
  return fetch('https://api.ie1.twilio.com/v1/validation', {
    headers: {}
  });
}
