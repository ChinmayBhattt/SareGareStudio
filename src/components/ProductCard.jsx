import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function ProductCard({ product, onBuyNow }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPrice = (priceInCents) => {
    if (!priceInCents) return 'N/A';
    return `₹${(priceInCents / 100).toLocaleString('en-IN')}`;
  };

  const licenses = [
    { type: 'basic', price: product.basic_price, label: 'Basic' },
    { type: 'premium', price: product.premium_price, label: 'Premium' },
    { type: 'exclusive', price: product.exclusive_price, label: 'Exclusive' },
  ].filter((l) => l.price);

  return (
    <div className="glass rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20">
        {product.cover_image_url ? (
          <img
            src={product.cover_image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music size={64} className="text-brand-purple/30" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-brand-purple/90 flex items-center justify-center hover:bg-brand-purple transition-colors">
            {isPlaying ? (
              <Pause size={32} className="text-white" fill="white" />
            ) : (
              <Play size={32} className="text-white ml-1" fill="white" />
            )}
          </div>
        </button>

        {/* Audio Element */}
        <audio ref={audioRef} src={product.preview_url || product.audio_url} />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Genre */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {product.genre && (
              <span className="px-2 py-1 rounded-full bg-brand-purple/20 text-brand-purple">
                {product.genre}
              </span>
            )}
            {product.bpm && (
              <span className="flex items-center gap-1">
                <Zap size={14} />
                {product.bpm} BPM
              </span>
            )}
            {product.key && <span>Key: {product.key}</span>}
          </div>
        </div>

        {/* Progress Bar */}
        {isPlaying && duration > 0 && (
          <div className="mb-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Licenses */}
        <div className="space-y-2">
          {licenses.map((license) => (
            <motion.button
              key={license.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBuyNow(product, license.type)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300"
            >
              <span className="text-white font-medium">{license.label}</span>
              <span className="text-brand-gold font-bold">
                {formatPrice(license.price)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
