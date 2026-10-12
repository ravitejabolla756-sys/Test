# MY OWL Provider Compatibility Test Fixture

> **WARNING:**
> Some source files intentionally use obsolete or compatibility-sensitive third-party APIs. Do not copy these examples into production applications.

## Purpose

This repository is **NOT** a production application.

It is a purpose-built, deterministic test fixture containing realistic examples of third-party SDK and API usage designed for end-to-end testing of **MY OWL**, a read-only third-party API compatibility scanner.

This fixture enables MY OWL to:
1. Discover provider dependencies.
2. Build an API inventory across 15 reviewed providers.
3. Detect reviewed breaking and deprecated API patterns across 20 reviewed rules.
4. Produce compatibility findings with exact AST and endpoint evidence.
5. Provide source-file and line-level evidence references.
6. Distinguish affected code from unaffected/negative control code.
7. Exercise a complete **GitHub App → repository → scan → finding** workflow.

---

## Safety Constraints

- **No Real API Keys:** All credentials use placeholder values (e.g. `process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"`).
- **No Network Execution:** Fixture functions are exported definitions; none execute upon import or module loading.
- **Offline Determinism:** All tests run strictly locally and offline.
- **No Destructive Operations:** Zero external infrastructure or live billing/payment transactions.
- **Public Repository Safe:** Safe for hosting on public GitHub repositories without secret exposure.

---

## Reviewed Providers & Compatibility Rules

This fixture maps directly to MY OWL's current reviewed catalog of **15 providers** and **20 reviewed compatibility rules**.

| Provider | Rule ID | Fixture File | Expected Classification | Target Pattern / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Anthropic** | `anthropic-claude-opus-4-1-retirement-2026-08-05` | `src/affected/anthropic-claude-opus-4-1-retirement-2026-08-05.ts` | **AFFECTED** | `client.messages.create({ model: 'claude-opus-4-1-20250805' })` |
| **Anthropic** | `anthropic-opus-4-7-parameter-restrictions` | `src/affected/anthropic-opus-4-7-parameter-restrictions.ts` | **NEEDS_REVIEW** | `client.messages.create({ temperature, model: 'claude-opus-4-7' })` (dynamic temperature parameter) |
| **AWS** | `aws-cloudwatch-evidently-end-of-support-2025-10-16` | `src/affected/aws-cloudwatch-evidently-end-of-support-2025-10-16.ts` | **AFFECTED** | `client["Amazon CloudWatch Evidently"].create({})` |
| **Clerk** | `clerk-api-2026-05-12-metadata-fields-removed` | `src/affected/clerk-api-2026-05-12-metadata-fields-removed.ts` | **AFFECTED** | `fetch('https://clerk.com/v1/users/{user_id}', { body: { public_metadata: 1 } })` |
| **Cloudflare** | `cloudflare-service-key-auth-removal-2026-09-30` | `src/affected/cloudflare-service-key-auth-removal-2026-09-30.ts` | **AFFECTED** | `headers: { 'X-Auth-User-Service-Key': 'static-class-evidence' }` |
| **ElevenLabs** | `elevenlabs-v1-model-removal-2026-07-09` | `src/affected/elevenlabs-v1-model-removal-2026-07-09.ts` | **AFFECTED** | `client.messages.create({ model: 'eleven_monolingual_v1' })` |
| **Firebase** | `firebase-instance-id-server-apis-decommission-2027-09-29` | `src/affected/firebase-instance-id-server-apis-decommission-2027-09-29.ts` | **AFFECTED** | `fetch('https://iid.googleapis.com/iid/info')` |
| **GitHub** | `github-organization-security-fields-removed-2026-04-21` | `src/affected/github-organization-security-fields-removed-2026-04-21.ts` | **AFFECTED** | `response.advanced_security_enabled_for_new_repositories` |
| **GitHub** | `github-synchronous-sbom-endpoint-removal-2026-11-13` | `src/affected/github-synchronous-sbom-endpoint-removal-2026-11-13.ts` | **AFFECTED** | `fetch('https://api.github.com/owner/repo/dependency-graph/sbom')` |
| **Google Cloud** | `google-cloud-api-registry-mcp-shutdown-2026-07-30` | `src/affected/google-cloud-api-registry-mcp-shutdown-2026-07-30.ts` | **AFFECTED** | `client["API Registry MCP servers and tools"].create({})` |
| **Groq** | `groq-models-decommissioned-2026-09-21` | `src/affected/groq-models-decommissioned-2026-09-21.ts` | **AFFECTED** | `client.messages.create({ model: 'groq/compound' })` |
| **LaunchDarkly** | `launchdarkly-api-version-20220603-eol-2025-04-15` | `src/affected/launchdarkly-api-version-20220603-eol-2025-04-15.ts` | **AFFECTED** | `headers: { 'LD-API-Version': '20220603' }` |
| **OpenAI** | `openai-assistants-api-sunset-2026-08-26` | `src/affected/openai-assistants-api-sunset-2026-08-26.ts` | **AFFECTED** | `client["Assistants API"].create({})` |
| **OpenAI** | `openai-gpt-4-5-preview-removal-2025-07-14` | `src/affected/openai-gpt-4-5-preview-removal-2025-07-14.ts` | **AFFECTED** | `client.messages.create({ model: 'gpt-4.5-preview' })` |
| **Shopify** | `shopify-checkout-api-shutdown-2025-04-01` | `src/affected/shopify-checkout-api-shutdown-2025-04-01.ts` | **AFFECTED** | `client["Storefront Checkout mutations"].create({})` |
| **Slack** | `slack-files-upload-removal-2025-11-12` | `src/affected/slack-files-upload-removal-2025-11-12.ts` | **AFFECTED** | `client.files.upload({})` |
| **Supabase** | `supabase-management-logs-all-removal-2026-09-23` | `src/affected/supabase-management-logs-all-removal-2026-09-23.ts` | **AFFECTED** | `fetch('https://project.supabase.co/analytics/endpoints/logs.all')` |
| **Supabase** | `supabase-openapi-anon-key-access-2026-03-11` | `src/affected/supabase-openapi-anon-key-access-2026-03-11.ts` | **AFFECTED** | `headers: { 'anon key': 'static-class-evidence' }` |
| **Twilio** | `twilio-regional-api-domain-removal-2026-04-28` | `src/affected/twilio-regional-api-domain-removal-2026-04-28.ts` | **AFFECTED** | `fetch('https://api.ie1.twilio.com/v1/validation')` |
| **Twilio** | `twilio-studio-engagements-endpoint-deprecated` | `src/affected/twilio-studio-engagements-endpoint-deprecated.ts` | **AFFECTED** | `fetch('https://api.twilio.com/Engagements')` |

### Expected Findings Summary
- **Total Reviewed Compatibility Rules Represented:** 20
- **Expected AFFECTED Findings:** 19
- **Expected NEEDS_REVIEW Findings:** 1 (`anthropic-opus-4-7-parameter-restrictions`)
- **Negative Control / Clean Files:** 3
  - `src/controls/safe-usage.ts` (Modern, supported API invocations)
  - `src/controls/unrelated-code.ts` (Standard business logic with zero provider SDK dependencies)
  - `src/controls/false-positive-controls.ts` (Local methods, comments, and strings matching API terms)

---

## Repository Structure

```
my-owl-provider-test-fixture/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vitest.config.ts
├── src/
│   ├── affected/
│   │   ├── anthropic-claude-opus-4-1-retirement-2026-08-05.ts
│   │   ├── anthropic-opus-4-7-parameter-restrictions.ts
│   │   ├── aws-cloudwatch-evidently-end-of-support-2025-10-16.ts
│   │   ├── clerk-api-2026-05-12-metadata-fields-removed.ts
│   │   ├── cloudflare-service-key-auth-removal-2026-09-30.ts
│   │   ├── elevenlabs-v1-model-removal-2026-07-09.ts
│   │   ├── firebase-instance-id-server-apis-decommission-2027-09-29.ts
│   │   ├── github-organization-security-fields-removed-2026-04-21.ts
│   │   ├── github-synchronous-sbom-endpoint-removal-2026-11-13.ts
│   │   ├── google-cloud-api-registry-mcp-shutdown-2026-07-30.ts
│   │   ├── groq-models-decommissioned-2026-09-21.ts
│   │   ├── launchdarkly-api-version-20220603-eol-2025-04-15.ts
│   │   ├── openai-assistants-api-sunset-2026-08-26.ts
│   │   ├── openai-gpt-4-5-preview-removal-2025-07-14.ts
│   │   ├── shopify-checkout-api-shutdown-2025-04-01.ts
│   │   ├── slack-files-upload-removal-2025-11-12.ts
│   │   ├── supabase-management-logs-all-removal-2026-09-23.ts
│   │   ├── supabase-openapi-anon-key-access-2026-03-11.ts
│   │   ├── twilio-regional-api-domain-removal-2026-04-28.ts
│   │   └── twilio-studio-engagements-endpoint-deprecated.ts
│   ├── controls/
│   │   ├── false-positive-controls.ts
│   │   ├── safe-usage.ts
│   │   └── unrelated-code.ts
│   ├── types/
│   │   └── providers.d.ts
│   └── index.ts
└── tests/
    └── fixture.test.ts
```

---

## Local Development & Quality Gates

### 1. Installation
Install locked dependencies using `pnpm`:
```bash
pnpm install
```

### 2. Type Checking
Validate strict TypeScript compilation:
```bash
pnpm typecheck
```

### 3. Automated Testing
Run deterministic offline Vitest tests:
```bash
pnpm test
```

### 4. Build
Compile TypeScript project:
```bash
pnpm build
```

---

## Expected MY OWL End-to-End Test

To test MY OWL against this fixture:

1. Install the **MY OWL GitHub App** on your GitHub account.
2. Grant access **ONLY** to this fixture repository (`my-owl-provider-test-fixture`).
3. Sign into MY OWL dashboard.
4. Connect this repository.
5. Trigger the initial AST scan.
6. Verify that all 15 provider dependencies are discovered in the inventory.
7. Confirm reviewed compatibility findings:
   - **19 AFFECTED**
   - **1 NEEDS_REVIEW** (`anthropic-opus-4-7-parameter-restrictions`)
   - **0 False Positives** across `src/controls/`
8. Open individual findings to verify provider name, rule ID, and source line-level evidence references.
9. Verify that safe usage in `safe-usage.ts` and mock names in `false-positive-controls.ts` are cleanly ignored.
