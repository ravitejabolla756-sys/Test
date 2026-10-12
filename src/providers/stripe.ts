import Stripe from 'stripe';

export function getStripeClient(): Stripe {
  const apiKey = process.env.STRIPE_SECRET_KEY ?? 'sk_test_fixture_placeholder_key';
  return new Stripe(apiKey, {
    apiVersion: '2023-10-16',
    typescript: true
  });
}

export async function createStandardSubscription(
  stripe: Stripe,
  customerId: string,
  priceId: string
) {
  // Normal modern subscription usage
  return stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId
      }
    ]
  });
}

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
