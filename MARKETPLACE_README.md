# Music Marketplace Implementation Guide

## Overview
This document provides a comprehensive guide to the music marketplace implementation for SareGare Studio. The marketplace allows artists to sell their music with different license types and enables buyers to purchase tracks securely using Razorpay or Stripe payment gateways.

## Features Implemented

### 1. Database Schema (Supabase)
- **Products Table**: Store music tracks with metadata
  - Title, description, genre, BPM, key
  - Audio URLs (preview and full file)
  - Three license pricing tiers (Basic, Premium, Exclusive)
  - Seller information and active status
  
- **Orders Table**: Track all purchases
  - Buyer and product relationship
  - License type and pricing
  - Order status (pending, processing, completed, failed, cancelled)
  - Payment gateway reference
  
- **Transactions Table**: Detailed payment tracking
  - Gateway transaction IDs
  - Payment status and method
  - Gateway response data (JSON)
  
- **Security**: Row Level Security (RLS) policies ensure data privacy

### 2. Frontend Components

#### Marketplace Page (`/marketplace`)
- Browse all active music products
- Filter by genre and price range
- Responsive grid layout
- Empty state messaging

#### Product Card
- Cover image or default music icon
- Audio preview with play/pause controls
- Real-time playback progress bar
- Display of metadata (Genre, BPM, Key)
- Multiple license options with pricing
- Buy Now buttons for each license

#### Checkout Modal
- Order summary with product details
- License information and benefits
- Payment gateway selection (Razorpay/Stripe)
- Security indicators
- Loading states

### 3. Payment Gateway Integration

#### Razorpay (INR Payments)
- Dynamic script loading
- Payment initialization with order data
- Success/failure callbacks
- Signature verification support

#### Stripe (Global Payments)
- Stripe.js integration ready
- Requires backend implementation for production
- Payment Intent creation needed

### 4. Navigation
- "Marketplace" link added to main navigation
- Accessible from all pages
- Mobile-responsive

## File Structure

```
SareGareStudio/
├── src/
│   ├── pages/
│   │   └── Marketplace.jsx          # Main marketplace page
│   ├── components/
│   │   ├── ProductCard.jsx          # Individual product display
│   │   ├── CheckoutModal.jsx        # Payment checkout modal
│   │   └── Navbar.jsx               # Updated with marketplace link
│   ├── lib/
│   │   └── paymentGateway.js        # Payment gateway utilities
│   └── App.jsx                      # Updated with /marketplace route
├── supabase_schema.sql              # Database schema with marketplace tables
├── PAYMENT_SETUP.md                 # Payment gateway configuration guide
└── MARKETPLACE_README.md            # This file
```

## Setup Instructions

### 1. Database Setup
1. Open your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL commands from `supabase_schema.sql`
4. Verify tables are created: `products`, `orders`, `transactions`
5. Check RLS policies are enabled

### 2. Environment Configuration
Create a `.env` file in the project root with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Gateway Configuration
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Usage Guide

### For Sellers (Future Implementation)
To add products, sellers will need to:
1. Navigate to seller dashboard (to be implemented)
2. Upload audio files to Supabase Storage
3. Fill product details (title, genre, BPM, key, etc.)
4. Set pricing for different license types
5. Publish the product

### For Buyers
1. Browse marketplace at `/marketplace`
2. Filter by genre or price range
3. Preview tracks using the play button
4. Click on a license type to purchase
5. Select payment gateway (Razorpay or Stripe)
6. Complete payment
7. Download purchased track (after backend implementation)

## Payment Flow

### Current Implementation (Frontend Only)
1. User selects product and license type
2. Order is created in database with 'pending' status
3. Payment gateway is initiated with order details
4. User completes payment on gateway's secure page
5. Success/failure callback is triggered

### Required Backend Implementation
The following needs to be implemented using Supabase Edge Functions:

#### 1. Payment Verification Function
```javascript
// /functions/verify-payment/index.ts
// Verify Razorpay signature
// Verify Stripe webhook signature
// Update order status to 'completed'
// Create transaction record
```

#### 2. Webhook Handler Function
```javascript
// /functions/payment-webhook/index.ts
// Receive webhook from Razorpay/Stripe
// Verify webhook signature
// Update order and transaction status
// Send confirmation emails
```

#### 3. Download URL Generator Function
```javascript
// /functions/generate-download-url/index.ts
// Verify user has purchased the product
// Generate time-limited signed URL
// Return secure download link
```

## Testing

### Test Cards

#### Razorpay
- **Success**: 4111 1111 1111 1111
- **Failure**: 4012 8888 8888 1881
- Use any future date and CVV

#### Stripe
- **Success**: 4242 4242 4242 4242
- **3D Secure**: 4000 0027 6000 3184
- Use any future date and CVV

### Test Scenario
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/marketplace`
3. If no products, add test data to Supabase
4. Click on a license type
5. Select payment gateway
6. Use test card numbers
7. Verify order creation in database

## Adding Test Products

Use Supabase SQL Editor to add test products:

```sql
-- Insert test product (replace user_id with actual user ID)
INSERT INTO products (
  seller_id,
  title,
  description,
  genre,
  bpm,
  key,
  audio_url,
  preview_url,
  file_url,
  cover_image_url,
  basic_price,
  premium_price,
  exclusive_price,
  duration_seconds,
  tags
) VALUES (
  'your-user-id-here',
  'Midnight Dreams',
  'A smooth hip-hop beat with jazzy piano chords',
  'hip-hop',
  90,
  'Am',
  'https://example.com/audio.mp3',
  'https://example.com/preview.mp3',
  'https://example.com/full.mp3',
  'https://example.com/cover.jpg',
  199900,  -- ₹1,999 (in cents)
  499900,  -- ₹4,999
  1999900, -- ₹19,999
  180,
  ARRAY['chill', 'lo-fi', 'jazzy']
);
```

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use test API keys** during development
3. **Verify payments on backend** before granting access
4. **Use signed URLs** for file downloads with expiration
5. **Implement rate limiting** on payment endpoints
6. **Log all transactions** for audit trails
7. **Set up webhook signature verification**

## Troubleshooting

### Products not showing
- Check Supabase connection
- Verify `is_active` is true in products table
- Check browser console for errors

### Payment gateway not loading
- Verify environment variables are set
- Check browser console for script loading errors
- Ensure payment gateway keys are correct

### Audio preview not working
- Verify audio URL is accessible
- Check CORS settings on audio file server
- Test audio URL in browser directly

## Next Steps

### Essential (Required for Production)
1. ✅ Database schema implemented
2. ✅ Frontend UI completed
3. ✅ Payment gateway integration scaffolded
4. ⏳ Implement Supabase Edge Functions for backend
5. ⏳ Set up webhook handlers
6. ⏳ Configure Supabase Storage for file uploads
7. ⏳ Implement signed URL generation

### Nice to Have (Future Enhancements)
- Seller dashboard for uploading products
- Sales analytics and reporting
- Email notifications
- Automatic royalty distribution
- Review and rating system
- Shopping cart functionality
- Discount codes and promotions

## Support

For issues or questions:
- Review `PAYMENT_SETUP.md` for payment configuration
- Check Supabase documentation: https://supabase.com/docs
- Razorpay docs: https://razorpay.com/docs/
- Stripe docs: https://stripe.com/docs

## License

This implementation is part of SareGare Studio project.
