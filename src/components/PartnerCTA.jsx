import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight } from 'lucide-react';

const PartnerCTA = () => {
    return (
        <section className="py-20 bg-black relative overflow-hidden flex items-center justify-center border-t border-white/10">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-brand-purple/10 via-transparent to-brand-blue/5 opacity-50"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
                        <Handshake size={24} />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Become Our <span className="text-brand-gold">Partner</span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Join forces with SareGare Studio. Whether you are a brand, an event organizer, or a content creator, let's build something extraordinary together.
                    </p>

                    <Link to="/partner-with-us">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-gray-600 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-3 mx-auto"
                        >
                            PARTNER WITH US <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PartnerCTA;
