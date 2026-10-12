// CONTROL FIXTURE: Safe Provider Usage
// Provider: Multiple
// Rule: safe-counterparts
// Expected MY OWL classification: CLEAN / UNAFFECTED

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import WebClient from '@slack/web-api';

// Safe modern OpenAI usage (using supported chat completions with gpt-4o instead of gpt-4.5-preview)
export async function safeOpenAiCall(): Promise<unknown> {
  const client = new OpenAI({
    apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
  });
  // Modern safe usage pattern
  return client.messages.create({
    model: "gpt-4o"
  });
}

// Safe modern Anthropic usage (using supported claude-3-5-sonnet model)
export async function safeAnthropicCall(): Promise<unknown> {
  const client = new Anthropic({
    apiKey: process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key"
  });
  return client.messages.create({
    model: "claude-3-5-sonnet-20241022"
  });
}

// Safe modern Slack usage (placeholder for modern files.getUploadURLExternal / files.completeUploadExternal)
export async function safeSlackCall(): Promise<unknown> {
  const client = new WebClient(process.env.TEST_PROVIDER_KEY ?? "fixture-not-a-real-key");
  // Demonstrates uninvoked safe client instantiation
  return client;
}
