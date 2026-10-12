import { describe, it, expect, vi } from 'vitest';
import * as stripeProvider from '../src/providers/stripe.js';
import * as openaiProvider from '../src/providers/openai.js';
import * as githubProvider from '../src/providers/github.js';
import * as awsProvider from '../src/providers/aws.js';
import * as twilioProvider from '../src/providers/twilio.js';
import * as slackProvider from '../src/providers/slack.js';
import * as sendgridProvider from '../src/providers/sendgrid.js';

describe('Providers Offline Unit Tests', () => {
  it('1. Stripe: initializes client and executes subscription methods with stubs (no network call)', async () => {
    const fakeStripe = {
      subscriptions: {
        create: vi.fn().mockResolvedValue({ id: 'sub_fake_123', status: 'active' })
      }
    };

    const resStandard = await stripeProvider.createStandardSubscription(
      fakeStripe as any,
      'cus_test_123',
      'price_test_123'
    );
    expect(resStandard).toEqual({ id: 'sub_fake_123', status: 'active' });
    expect(fakeStripe.subscriptions.create).toHaveBeenCalledWith({
      customer: 'cus_test_123',
      items: [{ price: 'price_test_123' }]
    });

    const resCoupon = await stripeProvider.createLegacySubscriptionWithCoupon(
      fakeStripe as any,
      'cus_test_123',
      'price_test_123'
    );
    expect(resCoupon).toEqual({ id: 'sub_fake_123', status: 'active' });
    expect(fakeStripe.subscriptions.create).toHaveBeenCalledWith({
      customer: 'cus_test_123',
      items: [{ price: 'price_test_123' }],
      coupon: 'legacy_coupon'
    });
  });

  it('2. OpenAI: builds client and invokes completion methods with stubs', async () => {
    const fakeOpenAI = {
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({ choices: [{ message: { content: 'mock answer' } }] })
        }
      },
      messages: {
        create: vi.fn().mockResolvedValue({ id: 'msg_fake' })
      }
    };

    const chatRes = await openaiProvider.createChatCompletion(fakeOpenAI as any, 'Hello');
    expect(fakeOpenAI.chat.completions.create).toHaveBeenCalled();
    expect(chatRes).toBeDefined();

    const deprecatedRes = await openaiProvider.createDeprecatedModelRequest(fakeOpenAI as any);
    expect(fakeOpenAI.messages.create).toHaveBeenCalledWith({ model: 'gpt-4.5-preview' });
    expect(deprecatedRes).toEqual({ id: 'msg_fake' });
  });

  it('3. GitHub / Octokit: invokes repo & PR methods using stubs', async () => {
    const fakeOctokit = {
      rest: {
        repos: {
          get: vi.fn().mockResolvedValue({ data: { name: 'Test', full_name: 'test/test' } })
        },
        pulls: {
          list: vi.fn().mockResolvedValue({ data: [{ id: 1, title: 'Test PR' }] })
        },
        issues: {
          createComment: vi.fn().mockResolvedValue({ data: { id: 101, body: 'hello' } })
        }
      }
    };

    const repo = await githubProvider.getRepoMetadata(fakeOctokit as any, 'owner', 'repo');
    expect(repo.name).toBe('Test');

    const prs = await githubProvider.listRepoPullRequests(fakeOctokit as any, 'owner', 'repo');
    expect(prs.length).toBe(1);

    const comment = await githubProvider.createIssueComment(fakeOctokit as any, 'owner', 'repo', 1, 'comment');
    expect(comment.id).toBe(101);
  });

  it('4. AWS SDK v3: builds S3 commands and routes through client.send stub', async () => {
    const fakeS3 = {
      send: vi.fn().mockResolvedValue({ Contents: [{ Key: 'test.json' }] })
    };

    const listRes = await awsProvider.listBucketObjects(fakeS3 as any, 'my-test-bucket');
    expect(fakeS3.send).toHaveBeenCalled();
    expect(listRes).toBeDefined();

    await awsProvider.fetchBucketObject(fakeS3 as any, 'my-test-bucket', 'test.json');
    expect(fakeS3.send).toHaveBeenCalledTimes(2);
  });

  it('5. Twilio: handles SMS dispatch stub without network requests', async () => {
    const fakeTwilio = {
      messages: {
        create: vi.fn().mockResolvedValue({ sid: 'SM_fake_sid', status: 'queued' })
      }
    };

    const smsRes = await twilioProvider.sendSmsNotification(
      fakeTwilio as any,
      '+1234567890',
      '+0987654321',
      'Test SMS'
    );
    expect(fakeTwilio.messages.create).toHaveBeenCalledWith({
      to: '+1234567890',
      from: '+0987654321',
      body: 'Test SMS'
    });
    expect((smsRes as any).sid).toBe('SM_fake_sid');
  });

  it('6. Slack: handles message posting stub', async () => {
    const fakeSlack = {
      chat: {
        postMessage: vi.fn().mockResolvedValue({ ok: true, ts: '123456' })
      }
    };

    const slackRes = await slackProvider.postSlackMessage(fakeSlack as any, 'C123', 'Hello Slack');
    expect(fakeSlack.chat.postMessage).toHaveBeenCalledWith({
      channel: 'C123',
      text: 'Hello Slack'
    });
    expect(slackRes.ok).toBe(true);
  });

  it('7. SendGrid: handles transactional email dispatch stub', async () => {
    const fakeSg = {
      send: vi.fn().mockResolvedValue([{ statusCode: 202 }])
    };

    const emailRes = await sendgridProvider.sendTransactionalEmail(
      fakeSg as any,
      'recipient@example.com',
      'sender@example.com',
      'Subject',
      'Content'
    );
    expect(fakeSg.send).toHaveBeenCalledWith({
      to: 'recipient@example.com',
      from: 'sender@example.com',
      subject: 'Subject',
      text: 'Content'
    });
    expect(emailRes[0].statusCode).toBe(202);
  });
});
