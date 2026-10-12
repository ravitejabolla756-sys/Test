// Type declarations for provider modules to ensure clean, strict TypeScript compilation
// without running real network calls or pulling incompatible/removed remote types.

declare module '@anthropic-ai/sdk' {
  export interface ClientOptions {
    apiKey?: string;
  }
  export default class Anthropic {
    constructor(options?: ClientOptions);
    messages: {
      create(params: Record<string, unknown>): Promise<unknown>;
    };
  }
}

declare module 'aws-sdk' {
  export interface ClientOptions {
    region?: string;
  }
  export default class AWS {
    constructor(options?: ClientOptions);
    [key: string]: any;
  }
}

declare module '@clerk/backend' {}

declare module 'cloudflare' {}

declare module '@elevenlabs/elevenlabs-js' {
  export interface ClientOptions {
    apiKey?: string;
  }
  export default class ElevenLabs {
    constructor(options?: ClientOptions);
    messages: {
      create(params: Record<string, unknown>): Promise<unknown>;
    };
  }
}

declare module 'firebase' {}

declare module '@octokit/rest' {
  export interface OctokitOptions {
    auth?: string;
  }
  export class Octokit {
    constructor(options?: OctokitOptions);
    [key: string]: any;
  }
  export default Octokit;
}

declare module 'googleapis' {
  export interface ClientOptions {
    auth?: string;
  }
  export default class Google {
    constructor(options?: ClientOptions);
    [key: string]: any;
  }
}

declare module 'groq-sdk' {
  export interface ClientOptions {
    apiKey?: string;
  }
  export default class Groq {
    constructor(options?: ClientOptions);
    messages: {
      create(params: Record<string, unknown>): Promise<unknown>;
    };
  }
}

declare module 'launchdarkly-node-server-sdk' {}

declare module 'openai' {
  export interface ClientOptions {
    apiKey?: string;
  }
  export default class OpenAI {
    constructor(options?: ClientOptions);
    messages: {
      create(params: Record<string, unknown>): Promise<unknown>;
    };
    [key: string]: any;
  }
}

declare module '@shopify/shopify-api' {
  export interface ClientOptions {
    apiKey?: string;
  }
  export default class Shopify {
    constructor(options?: ClientOptions);
    [key: string]: any;
  }
}

declare module '@slack/web-api' {
  export interface ClientOptions {
    token?: string;
  }
  export class WebClient {
    constructor(token?: string, options?: ClientOptions);
    files: {
      upload(params: Record<string, unknown>): Promise<unknown>;
    };
    [key: string]: any;
  }
  export default WebClient;
}

declare module '@supabase/supabase-js' {}

declare module 'twilio' {
  namespace twilio {
    export interface Twilio {
      messages: {
        create(params: Record<string, unknown>): Promise<unknown>;
      };
      [key: string]: any;
    }
  }
  function twilio(accountSid?: string, authToken?: string, opts?: any): twilio.Twilio;
  export = twilio;
}

