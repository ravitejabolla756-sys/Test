import { WebClient } from '@slack/web-api';

export function getSlackClient(): WebClient {
  return new WebClient(process.env.SLACK_BOT_TOKEN ?? 'xoxb-fixture-placeholder-token');
}

export async function postSlackMessage(slack: WebClient, channel: string, text: string) {
  return slack.chat.postMessage({
    channel,
    text
  });
}
