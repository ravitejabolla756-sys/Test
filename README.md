# MY OWL Provider Compatibility Test Fixture

> **WARNING:**
> Some source files intentionally use obsolete or compatibility-sensitive third-party APIs. Do not copy these examples into production applications.

## Purpose

This repository is **NOT** a production application.

It is a purpose-built, deterministic test fixture containing realistic application integrations and third-party SDK/API usages designed for end-to-end integration testing of **MY OWL**, an API/SDK compatibility monitoring product. MY OWL scans source code using AST analysis and compares detected API/SDK usage against its provider compatibility and breaking-change registry.

This fixture enables MY OWL to:
1. Discover provider dependencies.
2. Build an API inventory across multiple SDK providers.
3. Detect reviewed breaking and deprecated API patterns.
4. Produce compatibility findings with exact AST and endpoint evidence.
5. Provide source-file and line-level evidence references.
6. Distinguish affected code from unaffected/negative control code.
7. Exercise a complete **GitHub App → repository → scan → finding** workflow.

---

## Safety Constraints

- **No Real API Keys:** All credentials use placeholder values (e.g. `process.env.STRIPE_SECRET_KEY ?? "sk_test_fixture_placeholder_key"`).
- **No Network Execution:** Fixture functions are exported definitions; none execute upon import or module loading.
- **Offline Determinism:** All tests run strictly locally and offline with client stubs/mocks.
- **No Destructive Operations:** Zero external infrastructure or live billing/payment transactions.
- **Public Repository Safe:** Safe for hosting on public GitHub repositories without secret exposure.

---

## Providers & Integrations

The repository contains isolated integrations under `src/providers/`:

| Provider | Integration File | SDK / Package | Description |
| :--- | :--- | :--- | :--- |
| **Stripe** | `src/providers/stripe.ts` | `stripe` | Subscriptions, customer billing, and intentional legacy coupon parameter fixture |
| **OpenAI** | `src/providers/openai.ts` | `openai` | Chat completions with standard parameters and deprecated model parameter fixture |
| **GitHub** | `src/providers/github.ts` | `@octokit/rest` | Octokit repository metadata retrieval, PR listing, and issue commenting |
| **AWS** | `src/providers/aws.ts` | `@aws-sdk/client-s3` | AWS SDK v3 S3 client with `ListObjectsV2Command` and `GetObjectCommand` |
| **Twilio** | `src/providers/twilio.ts` | `twilio` | Twilio SMS notification dispatch integration |
| **Slack** | `src/providers/slack.ts` | `@slack/web-api` | WebClient channel message posting |
| **SendGrid** | `src/providers/sendgrid.ts` | `@sendgrid/mail` | Transactional email transmission |

---

## Intentional Compatibility Fixtures

### 1. Stripe Subscription Coupon Parameter (Key Test Case)
In [`src/providers/stripe.ts`](src/providers/stripe.ts#L30-L45):
```typescript
export async function createLegacySubscriptionWithCoupon(
  stripe: Stripe,
  customerId: string,
  priceId: string
) {
  // MY OWL compatibility fixture.
  // Intentionally preserved legacy API usage for scanner testing.
  return stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId
      }
    ],
    coupon: 'legacy_coupon'
  });
}
```

### 2. OpenAI Deprecated Model Identifier
In [`src/providers/openai.ts`](src/providers/openai.ts#L20-L28):
```typescript
export async function createDeprecatedModelRequest(openai: OpenAI) {
  // MY OWL compatibility fixture.
  // Intentionally preserved legacy model identifier usage for scanner testing.
  return (openai as any).messages.create({
    model: 'gpt-4.5-preview'
  });
}
```

### 3. Comprehensive Multi-Provider Rule Catalog
Additionally, 20 reviewed rule fixtures are organized in `src/affected/` covering Anthropic, AWS, Clerk, Cloudflare, ElevenLabs, Firebase, GitHub, Google Cloud, Groq, LaunchDarkly, OpenAI, Shopify, Slack, Supabase, and Twilio.

---

## Negative Controls (False-Positive Prevention)

Under `src/controls/`:
- `src/controls/safe-usage.ts`: Modern, supported provider calls.
- `src/controls/unrelated-code.ts`: Application business logic without external provider SDK dependencies.
- `src/controls/false-positive-controls.ts`: Local mock classes, string literals containing API paths, and comments containing deprecated method names.

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
│   ├── providers/
│   │   ├── stripe.ts
│   │   ├── openai.ts
│   │   ├── github.ts
│   │   ├── aws.ts
│   │   ├── twilio.ts
│   │   ├── slack.ts
│   │   └── sendgrid.ts
│   ├── affected/
│   │   └── ... (20 reviewed rule fixtures)
│   ├── controls/
│   │   ├── false-positive-controls.ts
│   │   ├── safe-usage.ts
│   │   └── unrelated-code.ts
│   ├── types/
│   │   └── providers.d.ts
│   └── index.ts
└── tests/
    ├── providers.test.ts
    └── fixture.test.ts
```

---

## Local Development & Quality Gates

### 1. Installation
Install dependencies using `pnpm` (or `npm install`):
```bash
pnpm install
```

### 2. Type Checking
Validate strict TypeScript compilation:
```bash
pnpm typecheck
```

### 3. Automated Testing
Run offline Vitest tests:
```bash
pnpm test
```

### 4. Build
Compile TypeScript project:
```bash
pnpm build
```
