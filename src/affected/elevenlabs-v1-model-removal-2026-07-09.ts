// MY OWL FIXTURE
// Provider: ElevenLabs
// Rule: elevenlabs-v1-model-removal-2026-07-09
// Expected MY OWL classification: AFFECTED

import Client from '@elevenlabs/elevenlabs-js';

const client = new Client({
  apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
});

export async function validate(): Promise<unknown> {
  return client.messages.create({
    model: 'eleven_monolingual_v1'
  });
}
