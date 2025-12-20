import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sliders, Globe, Video, Music, Layers } from 'lucide-react';

const services = [
    {
        icon: <Mic className="w-8 h-8" />,
        title: 'Audio Recording',
        description: 'State-of-the-art recording equipment for crystal clear vocal and instrumental capture.'
    },
    {
        icon: <Sliders className="w-8 h-8" />,
        title: 'Mixing & Mastering',
        description: 'Professional mixing and mastering to bring your tracks to industry standards.'
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: 'Music Distribution',
        description: 'Get your music on all major platforms like Spotify, Apple Music, and Amazon Music.'
    },
    {
        icon: <Video className="w-8 h-8" />,
        title: 'Video Production',
        description: 'High-quality music videos, lyric videos, and promotional content.'
    },
    {
        icon: <Music className="w-8 h-8" />,
        title: 'Beat Production',
        description: 'Custom beats tailored to your style and genre by top producers.'
    },
    {
        icon: <Layers className="w-8 h-8" />,
        title: 'Artist Branding',
        description: 'Complete visual identity including logo, album art, and social media kits.'
    }
];

const Services = () => {
    return (
        <section id="services" className="py-20 bg-brand-dark relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Our <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Comprehensive solutions for every stage of your musical journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-brand-purple/30 group"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center text-brand-blue mb-6 group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:from-brand-purple group-hover:to-brand-blue">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
