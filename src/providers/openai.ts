import OpenAI from 'openai';

export function getOpenAIClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? 'fixture-openai-dummy-key'
  });
}

export async function createChatCompletion(openai: OpenAI, prompt: string) {
  return openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });
}

export async function createDeprecatedModelRequest(openai: OpenAI) {
  // MY OWL compatibility fixture.
  // Intentionally preserved legacy model identifier usage for scanner testing.
  return (openai as any).messages.create({
    model: 'gpt-4.5-preview'
  });
}
