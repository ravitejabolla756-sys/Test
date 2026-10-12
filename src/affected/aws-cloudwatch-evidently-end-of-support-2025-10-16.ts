// MY OWL FIXTURE
// Provider: AWS
// Rule: aws-cloudwatch-evidently-end-of-support-2025-10-16
// Expected MY OWL classification: AFFECTED

import Client from 'aws-sdk';

const client = new Client({});

export async function validate(): Promise<unknown> {
  return client["Amazon CloudWatch Evidently"].create({});
}
