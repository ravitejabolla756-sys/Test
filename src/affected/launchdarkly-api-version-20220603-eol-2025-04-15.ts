// MY OWL FIXTURE
// Provider: LaunchDarkly
// Rule: launchdarkly-api-version-20220603-eol-2025-04-15
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import 'launchdarkly-node-server-sdk';

export async function validate(): Promise<unknown> {
  return fetch('https://launchdarkly.com/v1/validation', {
    headers: { 'LD-API-Version': '20220603' }
  });
}
