import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, ShoppingCart, Filter } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import CheckoutModal from '../components/CheckoutModal';
import { toast } from 'react-hot-toast';

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filters, setFilters] = useState({
    genre: 'all',
    priceRange: 'all',
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (product, licenseType) => {
    if (!user) {
      toast.error('Please login to purchase');
      return;
    }
    setSelectedProduct(product);
    setSelectedLicense(licenseType);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
    setSelectedLicense(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-gold bg-clip-text text-transparent">
              Music Marketplace
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover premium beats, tracks, and exclusive licenses from talented producers
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-brand-gold">
              <Filter size={20} />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <select
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className="glass-input px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              <option value="all">All Genres</option>
              <option value="hip-hop">Hip Hop</option>
              <option value="trap">Trap</option>
              <option value="pop">Pop</option>
              <option value="rnb">R&B</option>
              <option value="electronic">Electronic</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="glass-input px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              <option value="all">All Prices</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-5000">₹1,000 - ₹5,000</option>
              <option value="5000+">₹5,000+</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <section className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-12 text-center"
          >
            <Music size={64} className="mx-auto mb-4 text-brand-purple/50" />
            <h3 className="text-2xl font-bold mb-2 text-white">No Products Yet</h3>
            <p className="text-gray-400">
              Products will appear here once sellers start listing their music.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} onBuyNow={handleBuyNow} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {showCheckout && selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          licenseType={selectedLicense}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
}

export default Marketplace;
