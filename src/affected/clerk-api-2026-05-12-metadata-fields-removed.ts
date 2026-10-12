// MY OWL FIXTURE
// Provider: Clerk
// Rule: clerk-api-2026-05-12-metadata-fields-removed
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import '@clerk/backend';

export async function validate(): Promise<unknown> {
  return fetch('https://clerk.com/v1/users/{user_id}', {
    headers: {},
    body: { public_metadata: 1 }
  });
}
