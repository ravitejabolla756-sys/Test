# MY OWL Evidence-Based Provider Coverage & Certification Plan

## 1. Executive Summary & Purpose

This document defines the authoritative, evidence-based provider coverage and certification plan for **MY OWL** (an AST-based API compatibility scanner), established by directly inspecting the runtime source code of `MY-OWL-worker` (commit `89da07b6075c873d9ce6c77b551e8390073b0acc`).

---

## 2. Authoritative Provider Counts

Based on inspection of `packages/providers/src/`, `registry/`, and `apps/web/src/lib/server/scan-service.ts`:

- **REGISTERED_PROVIDERS = 2** (`stripe`, `twilio`)
- **DETECTABLE_PROVIDERS = 2** (`stripe`, `twilio`)
- **CERTIFICATION_FIXTURES = 2**
- **EXPECTED_TOTAL_FINDINGS = 2**

---

## 3. Real Provider Registry & Rule Audit

| Provider | Provider ID | SDK / Package | Reviewed Rules in Registry | Rule IDs | Target Symbols | Version Range | Detector Type | Existing Tests in MY OWL? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Stripe** | `stripe` | `stripe` | **9** | `stripe-subscription-coupon-removed`, `stripe-invoice-upcoming-removed`, `stripe-legacy-usage-methods`, `stripe-subscription-period-fields`, `stripe-subscriptions-del-deprecated`, `stripe-subscriptions-del-removed`, `stripe-account-link-type-changed`, `stripe-checkout-shipping-rates-renamed`, `stripe-context-type-renamed` | `subscriptions.create`, `subscriptions.update`, `invoices.retrieveUpcoming`, `subscriptionItems.createUsageRecord`, `subscriptions.del`, etc. | `>=17.0.0 <18.0.0`, `>=12.0.0 <13.0.0`, `>=9.14.0 <13.0.0` | AST (`TypeScriptRepositoryAnalyzer`) | **YES** (`tests/impact.test.ts`, `tests/phase2-analysis.test.ts`) |
| **Twilio** | `twilio` | `twilio` | **2** | `twilio-programmable-fax-removed`, `twilio-twiml-namespace-casing` | `fax.v1.faxes.create`, `Twiml.VoiceResponse` | `>=3.0.0 <5.0.0`, `>=3.0.0 <4.0.0` | AST (`TypeScriptRepositoryAnalyzer`) | **YES** (`tests/twilio.test.ts`) |

---

## 4. Provider Classification

- **Stripe**: **IMPLEMENTED + DETECTABLE** (9 active reviewed rules; proven end-to-end regression fixture in `src/providers/stripe.ts`).
- **Twilio**: **IMPLEMENTED + DETECTABLE** (2 active reviewed rules; wired into scanner in `scan-service.ts`).
- **OpenAI**: **IMPLEMENTED BUT NO ACTIVE DETECTION RULE** (No `OpenAIProvider` class exists in `packages/providers`; `scan-service.ts` does not instantiate or scan OpenAI).
- **GitHub / Octokit**: **IMPLEMENTED BUT NO ACTIVE DETECTION RULE** (GitHub is used exclusively for repository management and PR generation; no compatibility rules exist in `registry/`).
- **AWS**: **IMPLEMENTED BUT NO ACTIVE DETECTION RULE** (No AWS SDK v3 `ApiProvider` exists in MY OWL).
- **Slack**: **IMPLEMENTED BUT NO ACTIVE DETECTION RULE** (Slack is integrated as a notification channel for finding alerts, not as an AST scanned provider).
- **SendGrid**: **IMPLEMENTED BUT NO ACTIVE DETECTION RULE** (No SendGrid provider or rules exist in MY OWL).

---

## 5. Tracing the Proven Stripe Detection Path

The reference detection path for `stripe-subscription-coupon-removed`:
1. **Registry Loading**: `loadProviderRegistry('stripe')` reads `registry/stripe/stripe-subscription-coupon-removed.json` and parses it via `RegistryChangeSchema`.
2. **Package & Version Detection**: `detectDependencies(snapshot, 'stripe')` parses `package.json` and `pnpm-lock.yaml`, observing `stripe@14.25.0` (or `^16.0.0`).
3. **AST Traversal & Binding Resolution**: `detectUsages` in `packages/analyzers/src/typescript/usages.ts` traverses the AST with `ts-morph`. `BindingResolver` identifies `stripe.subscriptions.create(...)` as a call site bound to `stripe`.
4. **Argument Extraction**: `extractArguments` extracts literal and property parameters (`coupon: 'legacy_coupon'`).
5. **Rule Matching**: `matchRule` in `packages/providers/src/stripe/rule-evidence.ts` detects the exact argument index and path (`argumentIndex: 0`, `path: 'coupon'`, `condition: 'present'`).
6. **Finding Creation & Confidence Calculation**: `StripeProvider.matchImpact` matches the rule, verifies SDK version assessment (`assessVersion`), and computes confidence (0.7 for declared version).
7. **Persistence**: `runRepositoryScan` stores the finding in the `findings` table and returns finding summary.

---

## 6. Audit of Existing Test Repository Fixtures

| Fixture File | SDK Imported | API Call / Symbol | Recognized by MY OWL? | Matching Rule in Registry? | Expected Scan Outcome | Why? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/providers/stripe.ts` | `stripe` | `subscriptions.create({ coupon: ... })` | **YES** | **YES** (`stripe-subscription-coupon-removed`) | **FINDING_EXPECTED** (1 finding) | Matches `subscriptions.create` with `coupon` parameter on Stripe client. |
| `src/providers/twilio.ts` | `twilio` | `Twiml.VoiceResponse` | **YES** | **YES** (`twilio-twiml-namespace-casing`) | **FINDING_EXPECTED** (1 finding) | Matches legacy uppercase `Twiml.VoiceResponse` alias. |
| `src/providers/openai.ts` | `openai` | `messages.create({ model: 'gpt-4.5-preview' })` | **NO** | **NO** | **NO_FINDING_EXPECTED** | MY OWL does not have an `OpenAIProvider` registered in `packages/providers` or wired in `scan-service.ts`. |
| `src/providers/github.ts` | `@octokit/rest` | `repos.get`, `pulls.list` | **NO** | **NO** | **NO_FINDING_EXPECTED** | Octokit is not a scanned compatibility provider in MY OWL. |
| `src/providers/aws.ts` | `@aws-sdk/client-s3` | `ListObjectsV2Command` | **NO** | **NO** | **NO_FINDING_EXPECTED** | AWS SDK v3 is not a registered compatibility provider. |
| `src/providers/slack.ts` | `@slack/web-api` | `chat.postMessage` | **NO** | **NO** | **NO_FINDING_EXPECTED** | Slack SDK is not a registered compatibility provider. |
| `src/providers/sendgrid.ts` | `@sendgrid/mail` | `send` | **NO** | **NO** | **NO_FINDING_EXPECTED** | SendGrid is not a registered compatibility provider. |
| `src/controls/*` | Various | Mock / Unrelated | **NO** | **NO** | **NO_FINDING_EXPECTED** (0 findings) | Safe baseline and negative controls. |

---

## 7. Expected Total Scan Findings

- **Stripe Findings:** 1 (`stripe-subscription-coupon-removed`)
- **Twilio Findings:** 1 (`twilio-twiml-namespace-casing`)
- **Other Providers:** 0 (unsupported/no scanner rules)
- **Controls:** 0 (negative controls)
- **EXPECTED_TOTAL_FINDINGS = 2**
