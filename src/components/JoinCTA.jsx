import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const JoinCTA = () => {
    return (
        <section className="py-20 bg-brand-charcoal relative overflow-hidden flex items-center justify-center">
            {/* 3D Background Elements */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-80 h-80 bg-brand-purple/20 rounded-full blur-[80px]"
                ></motion.div>
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-blue/20 rounded-full blur-[80px]"
                ></motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto glass-card border border-white/10 rounded-3xl p-12 md:p-16 relative overflow-hidden group perspective-1000"
                >
                    {/* Floating shapes inside card */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-10 right-10 text-brand-gold opacity-50"
                    >
                        <Sparkles size={40} />
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">Innovate?</span>
                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        We are looking for the craziest minds in music, film, and tech.
                        If you have the passion, we have the platform.
                    </p>

                    <Link to="/join-team">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                rotateX: 10,
                                boxShadow: "0px 20px 40px rgba(124, 58, 237, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white text-brand-dark font-black text-xl rounded-full tracking-wide hover:bg-gray-100 transition-all flex items-center gap-3 mx-auto relative z-20"
                        >
                            JOIN THE TEAM <ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default JoinCTA;
