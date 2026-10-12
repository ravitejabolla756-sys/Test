// MY OWL FIXTURE
// Provider: OpenAI
// Rule: openai-gpt-4-5-preview-removal-2025-07-14
// Expected MY OWL classification: AFFECTED

import Client from 'openai';

const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client.messages.create({
    model: 'gpt-4.5-preview'
  });
}
