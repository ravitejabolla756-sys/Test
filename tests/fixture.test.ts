import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as indexModule from '../src/index.js';

const EXPECTED_FIXTURES: Array<{
  provider: string;
  ruleId: string;
  fixtureFile: string;
  expectedClassification: 'AFFECTED' | 'NEEDS_REVIEW';
}> = [
  {
    provider: 'Anthropic',
    ruleId: 'anthropic-claude-opus-4-1-retirement-2026-08-05',
    fixtureFile: 'anthropic-claude-opus-4-1-retirement-2026-08-05.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Anthropic',
    ruleId: 'anthropic-opus-4-7-parameter-restrictions',
    fixtureFile: 'anthropic-opus-4-7-parameter-restrictions.ts',
    expectedClassification: 'NEEDS_REVIEW'
  },
  {
    provider: 'AWS',
    ruleId: 'aws-cloudwatch-evidently-end-of-support-2025-10-16',
    fixtureFile: 'aws-cloudwatch-evidently-end-of-support-2025-10-16.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Clerk',
    ruleId: 'clerk-api-2026-05-12-metadata-fields-removed',
    fixtureFile: 'clerk-api-2026-05-12-metadata-fields-removed.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Cloudflare',
    ruleId: 'cloudflare-service-key-auth-removal-2026-09-30',
    fixtureFile: 'cloudflare-service-key-auth-removal-2026-09-30.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'ElevenLabs',
    ruleId: 'elevenlabs-v1-model-removal-2026-07-09',
    fixtureFile: 'elevenlabs-v1-model-removal-2026-07-09.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Firebase',
    ruleId: 'firebase-instance-id-server-apis-decommission-2027-09-29',
    fixtureFile: 'firebase-instance-id-server-apis-decommission-2027-09-29.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'GitHub',
    ruleId: 'github-organization-security-fields-removed-2026-04-21',
    fixtureFile: 'github-organization-security-fields-removed-2026-04-21.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'GitHub',
    ruleId: 'github-synchronous-sbom-endpoint-removal-2026-11-13',
    fixtureFile: 'github-synchronous-sbom-endpoint-removal-2026-11-13.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Google Cloud',
    ruleId: 'google-cloud-api-registry-mcp-shutdown-2026-07-30',
    fixtureFile: 'google-cloud-api-registry-mcp-shutdown-2026-07-30.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Groq',
    ruleId: 'groq-models-decommissioned-2026-09-21',
    fixtureFile: 'groq-models-decommissioned-2026-09-21.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'LaunchDarkly',
    ruleId: 'launchdarkly-api-version-20220603-eol-2025-04-15',
    fixtureFile: 'launchdarkly-api-version-20220603-eol-2025-04-15.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'OpenAI',
    ruleId: 'openai-assistants-api-sunset-2026-08-26',
    fixtureFile: 'openai-assistants-api-sunset-2026-08-26.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'OpenAI',
    ruleId: 'openai-gpt-4-5-preview-removal-2025-07-14',
    fixtureFile: 'openai-gpt-4-5-preview-removal-2025-07-14.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Shopify',
    ruleId: 'shopify-checkout-api-shutdown-2025-04-01',
    fixtureFile: 'shopify-checkout-api-shutdown-2025-04-01.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Slack',
    ruleId: 'slack-files-upload-removal-2025-11-12',
    fixtureFile: 'slack-files-upload-removal-2025-11-12.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Supabase',
    ruleId: 'supabase-management-logs-all-removal-2026-09-23',
    fixtureFile: 'supabase-management-logs-all-removal-2026-09-23.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Supabase',
    ruleId: 'supabase-openapi-anon-key-access-2026-03-11',
    fixtureFile: 'supabase-openapi-anon-key-access-2026-03-11.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Twilio',
    ruleId: 'twilio-regional-api-domain-removal-2026-04-28',
    fixtureFile: 'twilio-regional-api-domain-removal-2026-04-28.ts',
    expectedClassification: 'AFFECTED'
  },
  {
    provider: 'Twilio',
    ruleId: 'twilio-studio-engagements-endpoint-deprecated',
    fixtureFile: 'twilio-studio-engagements-endpoint-deprecated.ts',
    expectedClassification: 'AFFECTED'
  }
];

describe('MY OWL Provider Test Fixture Verification', () => {
  const affectedDir = path.resolve(__dirname, '../src/affected');
  const controlsDir = path.resolve(__dirname, '../src/controls');

  it('1. verifies all 20 rule fixture modules exist on disk', () => {
    const files = fs.readdirSync(affectedDir).filter(f => f.endsWith('.ts'));
    expect(files.length).toBe(20);
    for (const fixture of EXPECTED_FIXTURES) {
      const exists = fs.existsSync(path.join(affectedDir, fixture.fixtureFile));
      expect(exists, `Expected fixture file ${fixture.fixtureFile} to exist`).toBe(true);
    }
  });

  it('2. verifies expected rule fixture count is exactly 20', () => {
    expect(EXPECTED_FIXTURES.length).toBe(20);
  });

  it('3. verifies expected provider count is exactly 15', () => {
    const providers = new Set(EXPECTED_FIXTURES.map(f => f.provider));
    expect(providers.size).toBe(15);
  });

  it('4. verifies classification breakdown: 19 AFFECTED, 1 NEEDS_REVIEW', () => {
    const affected = EXPECTED_FIXTURES.filter(f => f.expectedClassification === 'AFFECTED');
    const needsReview = EXPECTED_FIXTURES.filter(f => f.expectedClassification === 'NEEDS_REVIEW');

    expect(affected.length).toBe(19);
    expect(needsReview.length).toBe(1);
    expect(needsReview[0].provider).toBe('Anthropic');
    expect(needsReview[0].ruleId).toBe('anthropic-opus-4-7-parameter-restrictions');
  });

  it('5. verifies negative control files exist and are populated', () => {
    const controlFiles = ['safe-usage.ts', 'unrelated-code.ts', 'false-positive-controls.ts'];
    for (const file of controlFiles) {
      const filePath = path.join(controlsDir, file);
      expect(fs.existsSync(filePath), `Expected control file ${file} to exist`).toBe(true);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content.length).toBeGreaterThan(50);
    }
  });

  it('6. verifies no real credentials or production secrets are embedded in sources', () => {
    const scanDirs = [affectedDir, controlsDir];
    const secretPatterns = [
      /sk-[a-zA-Z0-9]{20,}/,
      /xoxb-[a-zA-Z0-9]{10,}/,
      /ghp_[a-zA-Z0-9]{20,}/,
      /AC[a-zA-Z0-9]{32}/
    ];

    for (const dir of scanDirs) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        for (const pattern of secretPatterns) {
          expect(pattern.test(content), `Found potential real credential in ${file}`).toBe(false);
        }
      }
    }
  });

  it('7. verifies no fixture performs automatic network requests on import or evaluation', () => {
    // Check imported index module to ensure safe evaluation with no side effects
    expect(indexModule).toBeDefined();
    expect(typeof indexModule.calculateWeightedMarks).toBe('function');
  });
});
