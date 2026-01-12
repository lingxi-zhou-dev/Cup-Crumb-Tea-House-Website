# Cup & Crumb Tea House - Next.js Frontend

A modern e-commerce frontend for your tea business, built with Next.js and integrated with Shopify Storefront API.

## 🚀 Features

- **Home Page**: Marketing landing page with featured collections
- **Tea Products Page**: Browse and shop tea products from Shopify
- **Accessories Page**: Browse and shop accessories from Shopify
- **Shopping Cart**: Client-side cart management with Zustand
- **Checkout**: Redirects to Shopify checkout experience
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 📋 Project Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout with header/footer
│   ├── globals.css              # Global styles
│   ├── products/
│   │   └── page.tsx             # Tea products listing
│   ├── accessories/
│   │   └── page.tsx             # Accessories listing
│   ├── cart/
│   │   └── page.tsx             # Shopping cart page
│   └── checkout/
│       └── page.tsx             # Checkout redirect
├── lib/
│   ├── shopify/
│   │   ├── client.ts            # Shopify API client
│   │   └── queries.ts           # GraphQL queries and mutations
│   └── store/
│       └── cart.ts              # Zustand cart store
├── components/                  # Reusable React components (ready for expansion)
├── hooks/                       # Custom React hooks (ready for expansion)
└── public/                      # Static assets
```

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Shopify store with a paid plan (required for Storefront API access)
- Shopify admin access to create API credentials

### 2. Get Shopify Credentials

1. Go to your Shopify admin dashboard
2. Navigate to **Settings** → **Apps and integrations** → **Develop apps**
3. Click **Create an app**
4. Name it "Cup & Crumb Frontend" and confirm
5. Go to the **Configuration** tab
6. Under **Admin API scopes**, enable:
   - `read_products`
   - `read_collections`
7. Click **Save** and **Reinstall app**
8. Go to the **API credentials** tab and copy:
   - **Access token** (Storefront API token)
   - Your store URL (appears in the request headers section)

### 3. Environment Setup

1. Open `.env.local` in the project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SHOPIFY_STORE_URL=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token-here
```

### 4. Create Shopify Collections

You need two collections in Shopify for the products to show up:

1. **Create "Teas" Collection**:
   - Go to **Products** → **Collections**
   - Click **Create collection**
   - Title: `Teas`
   - Handle: `teas` (must be lowercase)
   - Add your tea products to this collection
   - Save

2. **Create "Accessories" Collection**:
   - Repeat above with Title: `Accessories` and Handle: `accessories`
   - Add your accessory products to this collection

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Dependencies

- **Next.js 14+**: React framework with App Router
- **React 19**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **Zustand**: Lightweight state management for cart
- **GraphQL**: For Shopify Storefront API queries

## 🛒 Current Implementation Status

### ✅ Completed
- Home page with hero and featured collections
- Products page with collection fetching
- Accessories page with collection fetching
- Cart store setup with Zustand
- Checkout page redirect to Shopify
- Navigation layout with header and footer
- TypeScript configuration
- Environment variable setup

### 🔄 To Implement Next
- **Add to Cart functionality**: Wire up the button to add items to cart
- **Cart quantity management**: Update/remove items from cart
- **Product detail pages**: Individual product page with variants
- **Search functionality**: Search products across collections
- **User authentication**: Shopify customer accounts
- **Order tracking**: Historical order viewing
- **Wishlist**: Save favorite products
- **Reviews**: Product review system
- **Payment methods**: Multiple payment options beyond Shopify checkout

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SHOPIFY_STORE_URL`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
5. Deploy

### Other Hosting Options
- Netlify
- AWS Amplify
- Self-hosted with Node.js

## 🔐 Security Notes

- Never expose your Storefront Access Token in client-side code (it's safe here because it's prefixed with `NEXT_PUBLIC_` and has limited read-only permissions)
- For sensitive operations, create backend API routes
- Keep your full Admin API token secure on the server only

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 💡 Next Steps

1. Customize the design in [app/globals.css](app/globals.css)
2. Update company name and branding throughout
3. Implement the "Add to Cart" button logic
4. Create individual product detail pages
5. Add more complex features like filtering and search

## 🐛 Troubleshooting

### Products not showing?
- Verify collections are named correctly (`teas` and `accessories` in lowercase)
- Check that products are added to the collections
- Verify Shopify credentials in `.env.local`
- Check browser console for GraphQL errors

### Cart not persisting?
- Ensure browser allows localStorage
- Check that Zustand is properly initialized
- Verify cart store is being used in components

### API errors?
- Double-check your Shopify Store URL format
- Verify access token is correct and has required permissions
- Check that GraphQL queries use correct API version

## 📄 License

This project is open source and available for personal use.
