// MY OWL FIXTURE
// Provider: Firebase
// Rule: firebase-instance-id-server-apis-decommission-2027-09-29
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import 'firebase';

export async function validate(): Promise<unknown> {
  return fetch('https://iid.googleapis.com/iid/info', {
    headers: {}
  });
}
