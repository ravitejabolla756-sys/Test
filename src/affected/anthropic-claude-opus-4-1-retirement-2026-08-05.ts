// MY OWL FIXTURE
// Provider: Anthropic
// Rule: anthropic-claude-opus-4-1-retirement-2026-08-05
// Expected MY OWL classification: AFFECTED

import Client from '@anthropic-ai/sdk';

const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client.messages.create({
    model: 'claude-opus-4-1-20250805'
  });
}
