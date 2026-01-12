const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_STORE_URL || !STOREFRONT_ACCESS_TOKEN) {
  throw new Error(
    'Missing Shopify environment variables. Please set NEXT_PUBLIC_SHOPIFY_STORE_URL and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local'
  );
}

const endpoint = `https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`;

interface ShopifyRequestOptions {
  query: string;
  variables?: Record<string, any>;
}

export async function shopifyFetch<T = any>(
  options: ShopifyRequestOptions
): Promise<T> {
  const { query, variables } = options;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify GraphQL Error:', data.errors);
      throw new Error(`Shopify GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data.data as T;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}
