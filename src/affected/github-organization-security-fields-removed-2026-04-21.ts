// MY OWL FIXTURE
// Provider: GitHub
// Rule: github-organization-security-fields-removed-2026-04-21
// Expected MY OWL classification: AFFECTED

import Client from '@octokit/rest';

const client = new Client({});

export async function validate(): Promise<unknown> {
  const response = await client["get an organization and update an organization REST API endpoints"].create({});
  return response.advanced_security_enabled_for_new_repositories;
}
