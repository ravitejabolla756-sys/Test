// MY OWL FIXTURE
// Provider: Google Cloud
// Rule: google-cloud-api-registry-mcp-shutdown-2026-07-30
// Expected MY OWL classification: AFFECTED

import Client from 'googleapis';

const client = new Client({});

export async function validate(): Promise<unknown> {
  return client["API Registry MCP servers and tools"].create({});
}
