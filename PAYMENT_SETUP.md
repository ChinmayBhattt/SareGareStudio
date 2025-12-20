# Payment Gateway Configuration

This file documents the payment gateway integration setup for the SareGare Studio marketplace.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Razorpay Configuration (for INR payments)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Stripe Configuration (for global payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Razorpay Setup

1. Create an account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings > API Keys
3. Generate Test/Live API keys
4. Add the Key ID to your `.env` file
5. Note: Key Secret should be stored securely on the backend

### Test Cards for Razorpay
- **Success**: 4111 1111 1111 1111
- **Failure**: 4012 8888 8888 1881
- Any future CVV and expiry date

## Stripe Setup

1. Create an account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers > API keys
3. Copy the Publishable key (starts with `pk_`)
4. Add to your `.env` file

### Test Cards for Stripe
- **Success**: 4242 4242 4242 4242
- **3D Secure**: 4000 0027 6000 3184
- Any future CVV and expiry date

## Webhook Configuration

### Razorpay Webhooks
1. Go to Razorpay Dashboard > Settings > Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
3. Select events: `payment.authorized`, `payment.captured`, `payment.failed`
4. Note the webhook secret

### Stripe Webhooks
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Note the webhook signing secret

## Supabase Edge Functions

Create Edge Functions to handle:

1. **Payment Signature Verification** (`/functions/verify-payment`)
   - Verify Razorpay signature
   - Verify Stripe webhook signature
   - Update order status

2. **Webhook Handler** (`/functions/payment-webhook`)
   - Handle payment gateway webhooks
   - Update transaction records
   - Send notifications

3. **Generate Signed URLs** (`/functions/generate-download-url`)
   - Verify payment completion
   - Generate time-limited signed URLs for file downloads
   - Track downloads

## Implementation Steps

### 1. Backend Setup (Supabase)
```sql
-- Already created tables: products, orders, transactions
-- Apply the schema from supabase_schema.sql
```

### 2. Frontend Integration
- ✅ Marketplace page created
- ✅ Product cards with audio preview
- ✅ Checkout modal with payment gateway selection
- ✅ Payment gateway utility functions

### 3. Security Considerations
- Never expose API secrets on the frontend
- Always verify payments on the backend
- Use signed URLs for file downloads
- Implement rate limiting on payment endpoints
- Log all transactions for audit

## File Structure
```
src/
├── pages/
│   └── Marketplace.jsx          # Main marketplace page
├── components/
│   ├── ProductCard.jsx          # Individual product card
│   └── CheckoutModal.jsx        # Payment checkout modal
└── lib/
    └── paymentGateway.js        # Payment gateway utilities
```

## Testing

### Test Mode
1. Use test API keys from both gateways
2. Use test card numbers provided above
3. Monitor webhook events in respective dashboards

### Production Checklist
- [ ] Switch to live API keys
- [ ] Configure production webhook URLs
- [ ] Set up proper error logging
- [ ] Implement transaction monitoring
- [ ] Set up notification system
- [ ] Add analytics tracking

## Support

For issues:
- Razorpay: https://razorpay.com/docs/
- Stripe: https://stripe.com/docs
- Supabase: https://supabase.com/docs
