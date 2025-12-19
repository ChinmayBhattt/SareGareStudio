import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Animation */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-purple mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-blue mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-gold mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-brand-purple font-medium tracking-widest mb-4 uppercase text-sm md:text-base">
                        Premium Music Production
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-6 leading-tight">
                        Amplifying the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-gold animate-gradient-x">
                            Sound of Future
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                        Your gateway to professional music production and distribution.
                        We turn your raw talent into a masterpiece.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/services" className="px-8 py-4 rounded-full bg-white text-brand-dark font-bold hover:bg-gray-100 transition-all flex items-center gap-2 group">
                            Explore Services
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/contact" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
