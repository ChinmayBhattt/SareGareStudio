import { useState } from 'react';
import { X, CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { initiateRazorpayPayment, initiateStripePayment } from '../lib/paymentGateway';

function CheckoutModal({ product, licenseType, onClose }) {
  const [loading, setLoading] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState('razorpay');
  const { user } = useAuth();

  const getLicensePrice = () => {
    switch (licenseType) {
      case 'basic':
        return product.basic_price;
      case 'premium':
        return product.premium_price;
      case 'exclusive':
        return product.exclusive_price;
      default:
        return 0;
    }
  };

  const price = getLicensePrice();
  const priceInRupees = price / 100;

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    try {
      setLoading(true);

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          buyer_id: user.id,
          product_id: product.id,
          license_type: licenseType,
          amount: price,
          currency: 'INR',
          status: 'pending',
          payment_gateway: paymentGateway,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Initiate payment based on selected gateway
      if (paymentGateway === 'razorpay') {
        await initiateRazorpayPayment({
          orderId: order.id,
          amount: price,
          productName: product.title,
          licenseType: licenseType,
          userEmail: user.email,
          onSuccess: handlePaymentSuccess,
          onFailure: handlePaymentFailure,
        });
      } else if (paymentGateway === 'stripe') {
        await initiateStripePayment({
          orderId: order.id,
          amount: price,
          productName: product.title,
          licenseType: licenseType,
          onSuccess: handlePaymentSuccess,
          onFailure: handlePaymentFailure,
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    // TODO: Verify payment on backend and update order status
    // This should call a Supabase Edge Function to:
    // 1. Verify payment signature/webhook
    // 2. Update order status to 'completed'
    // 3. Create transaction record
    // 4. Send confirmation email
    toast.success('Payment successful! You can now download your track.');
    onClose();
    // Optionally refresh orders or redirect to downloads page
  };

  const handlePaymentFailure = (error) => {
    toast.error('Payment failed. Please try again.');
    console.error('Payment failure:', error);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-2xl max-w-md w-full p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Checkout</h2>
            <p className="text-gray-400 text-sm">
              Complete your purchase to get instant access
            </p>
          </div>

          {/* Product Details */}
          <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-2">{product.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {licenseType.charAt(0).toUpperCase() + licenseType.slice(1)} License
              </span>
              <span className="text-brand-gold font-bold text-lg">
                ₹{priceInRupees.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* License Information */}
          <div className="mb-6 p-4 rounded-lg bg-brand-blue/10 border border-brand-blue/30">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="mb-1">
                  <strong>What you'll get:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {licenseType === 'basic' && (
                    <>
                      <li>MP3 & WAV files</li>
                      <li>Non-exclusive rights</li>
                      <li>Unlimited streams</li>
                    </>
                  )}
                  {licenseType === 'premium' && (
                    <>
                      <li>MP3, WAV & Trackouts</li>
                      <li>Non-exclusive rights</li>
                      <li>Unlimited streams & sales</li>
                    </>
                  )}
                  {licenseType === 'exclusive' && (
                    <>
                      <li>MP3, WAV, Trackouts</li>
                      <li>Exclusive ownership rights</li>
                      <li>Unlimited distribution</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Gateway Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentGateway('razorpay')}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  paymentGateway === 'razorpay'
                    ? 'border-brand-purple bg-brand-purple/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-white font-medium">Razorpay</div>
                <div className="text-xs text-gray-400">INR Payments</div>
              </button>
              <button
                onClick={() => setPaymentGateway('stripe')}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  paymentGateway === 'stripe'
                    ? 'border-brand-blue bg-brand-blue/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-white font-medium">Stripe</div>
                <div className="text-xs text-gray-400">Global</div>
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Lock size={16} className="text-green-500" />
            <span>Secure payment powered by {paymentGateway === 'razorpay' ? 'Razorpay' : 'Stripe'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold hover:shadow-lg hover:shadow-brand-purple/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  <span>Pay ₹{priceInRupees.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CheckoutModal;
