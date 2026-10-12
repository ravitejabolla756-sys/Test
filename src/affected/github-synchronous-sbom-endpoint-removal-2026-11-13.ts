// MY OWL FIXTURE
// Provider: GitHub
// Rule: github-synchronous-sbom-endpoint-removal-2026-11-13
// Expected MY OWL classification: AFFECTED

const fetch = (...args: unknown[]) => Promise.resolve(args);
import '@octokit/rest';

export async function validate(): Promise<unknown> {
  return fetch('https://api.github.com/owner/repo/dependency-graph/sbom', {
    headers: {}
  });
}
