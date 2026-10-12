// MY OWL FIXTURE
// Provider: Groq
// Rule: groq-models-decommissioned-2026-09-21
// Expected MY OWL classification: AFFECTED

import Client from 'groq-sdk';

const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client.messages.create({
    model: 'groq/compound'
  });
}
