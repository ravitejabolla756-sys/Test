// MY OWL FIXTURE
// Provider: Cloudflare
// Rule: cloudflare-service-key-auth-removal-2026-09-30
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import 'cloudflare';

export async function validate(): Promise<unknown> {
  return fetch('https://api.cloudflare.com/v1/validation', {
    headers: { 'X-Auth-User-Service-Key': 'static-class-evidence' }
  });
}
