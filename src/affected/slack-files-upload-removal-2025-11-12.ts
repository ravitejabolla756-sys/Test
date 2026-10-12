// MY OWL FIXTURE
// Provider: Slack
// Rule: slack-files-upload-removal-2025-11-12
// Expected MY OWL classification: AFFECTED

import Client from '@slack/web-api';

const client = new Client(process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key");

export async function validate(): Promise<unknown> {
  return client.files.upload({});
}
