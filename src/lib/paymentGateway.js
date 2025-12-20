/**
 * Payment Gateway Integration Module
 * Handles Razorpay and Stripe payment integrations
 */

// Razorpay Configuration
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET;

// Stripe Configuration
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

/**
 * Initialize Razorpay payment
 * @param {Object} options - Payment options
 * @param {string} options.orderId - Order ID from database
 * @param {number} options.amount - Amount in cents
 * @param {string} options.productName - Product name
 * @param {string} options.licenseType - License type
 * @param {string} options.userEmail - User email
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onFailure - Failure callback
 */
export const initiateRazorpayPayment = async ({
  orderId,
  amount,
  productName,
  licenseType,
  userEmail,
  onSuccess,
  onFailure,
}) => {
  // Check if Razorpay script is loaded
  if (!window.Razorpay) {
    console.warn('Razorpay SDK not loaded. Loading now...');
    await loadRazorpayScript();
  }

  if (!RAZORPAY_KEY_ID) {
    console.error('Razorpay Key ID not configured');
    onFailure({ error: 'Payment gateway not configured' });
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount, // Amount in paise (cents)
    currency: 'INR',
    name: 'SareGare Studio',
    description: `${productName} - ${licenseType} License`,
    order_id: orderId, // This should be generated from backend
    handler: function (response) {
      // Payment successful
      console.log('Razorpay payment successful:', response);
      
      // Verify payment signature on backend (TODO: Implement webhook)
      const paymentData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        orderId: orderId,
      };
      
      onSuccess(paymentData);
    },
    prefill: {
      email: userEmail,
    },
    theme: {
      color: '#9333ea', // brand-purple
    },
    modal: {
      ondismiss: function () {
        console.log('Razorpay payment cancelled');
        onFailure({ error: 'Payment cancelled by user' });
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (error) {
    console.error('Error opening Razorpay:', error);
    onFailure(error);
  }
};

/**
 * Load Razorpay script dynamically
 */
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

/**
 * Initialize Stripe payment
 * @param {Object} options - Payment options
 * @param {string} options.orderId - Order ID from database
 * @param {number} options.amount - Amount in cents
 * @param {string} options.productName - Product name
 * @param {string} options.licenseType - License type
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onFailure - Failure callback
 */
export const initiateStripePayment = async ({
  orderId,
  amount,
  productName,
  licenseType,
  onSuccess,
  onFailure,
}) => {
  // Load Stripe.js
  if (!window.Stripe) {
    console.warn('Stripe SDK not loaded. Loading now...');
    await loadStripeScript();
  }

  if (!STRIPE_PUBLISHABLE_KEY) {
    console.error('Stripe Publishable Key not configured');
    onFailure({ error: 'Payment gateway not configured' });
    return;
  }

  try {
    const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    
    // TODO: Create payment intent on backend
    // In production, this should call a Supabase Edge Function to create a payment intent
    // and redirect to Stripe Checkout or use Stripe Elements
    console.log('Stripe payment initiated for order:', orderId);
    console.log('Amount:', amount, 'Product:', productName, 'License:', licenseType);
    
    // Alert user that Stripe integration needs backend implementation
    console.warn('Stripe payment requires backend implementation. Please configure Supabase Edge Functions.');
    onFailure({ 
      error: 'Stripe payment requires backend configuration. Please contact support or use Razorpay.' 
    });
  } catch (error) {
    console.error('Error initiating Stripe payment:', error);
    onFailure(error);
  }
};

/**
 * Load Stripe script dynamically
 */
const loadStripeScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

/**
 * Verify payment signature (to be called from backend/webhook)
 * This is a placeholder - actual verification should happen on server
 */
export const verifyPaymentSignature = async (paymentData) => {
  // TODO: Implement backend verification
  // This should call a Supabase Edge Function
  console.log('Payment verification:', paymentData);
  return { verified: true };
};

/**
 * Handle webhook notifications from payment gateways
 * This should be implemented as a Supabase Edge Function
 */
export const handlePaymentWebhook = async (webhookData) => {
  // TODO: Implement webhook handler in Supabase Edge Functions
  console.log('Webhook received:', webhookData);
  
  // Update order status based on webhook
  // Update transaction status
  // Send notifications to buyer/seller
};
