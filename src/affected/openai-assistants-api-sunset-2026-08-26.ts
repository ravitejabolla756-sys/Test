// MY OWL FIXTURE
// Provider: OpenAI
// Rule: openai-assistants-api-sunset-2026-08-26
// Expected MY OWL classification: AFFECTED

import Client from 'openai';

const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client["Assistants API"].create({});
}
