// MY OWL FIXTURE
// Provider: Anthropic
// Rule: anthropic-opus-4-7-parameter-restrictions
// Expected MY OWL classification: NEEDS_REVIEW

import Client from '@anthropic-ai/sdk';

const temperature = Number(process.env.MY_OWL_AMBIGUOUS_TEMPERATURE ?? "1");
const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client.messages.create({
    temperature,
    model: 'claude-opus-4-7'
  });
}
