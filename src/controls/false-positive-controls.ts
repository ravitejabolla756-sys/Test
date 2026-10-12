// CONTROL FIXTURE: False Positive Controls
// Expected MY OWL classification: CLEAN / UNAFFECTED
// Tests that AST matchers distinguish between actual SDK usages and coincident strings/methods.

// 1. Strings mentioning provider endpoints or deprecated methods
export const logStringOne = "Calling deprecated https://iid.googleapis.com/iid/info or https://api.twilio.com/Engagements";
export const logStringTwo = "Warning: files.upload and gpt-4.5-preview are retired";
export const logStringThree = "Configured header X-Auth-User-Service-Key";

// 2. Comments mentioning deprecated APIs
// Check if client.messages.create({ model: 'eleven_monolingual_v1' }) is matched in comment
/*
  client["Amazon CloudWatch Evidently"].create({})
  client["Assistants API"].create({})
  client.files.upload({})
*/

// 3. User-defined local object resembling SDK methods
export class LocalMockClient {
  public files = {
    upload: (options: { path?: string }) => {
      return { status: "local-mock-upload", path: options.path };
    }
  };

  public messages = {
    create: (options: { model?: string }) => {
      return { status: "local-mock-message", model: options.model };
    }
  };
}

export function runLocalMock(): { uploadStatus: string; messageStatus: string } {
  const localClient = new LocalMockClient();
  const up = localClient.files.upload({ path: "/tmp/test" });
  const msg = localClient.messages.create({ model: "custom-local-model" });
  return {
    uploadStatus: up.status,
    messageStatus: msg.status
  };
}
