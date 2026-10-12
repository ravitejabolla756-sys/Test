// MY OWL FIXTURE
// Provider: Shopify
// Rule: shopify-checkout-api-shutdown-2025-04-01
// Expected MY OWL classification: AFFECTED

import Client from '@shopify/shopify-api';

const client = new Client({});

export async function validate(): Promise<unknown> {
  return client["Storefront Checkout mutations"].create({});
}
