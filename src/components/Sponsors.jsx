import React from 'react';
import { motion } from 'framer-motion';
import dosteaImg from '../images/dostea.png';
import trainzexImg from '../images/trainzexai.png';
import hackersUnityImg from '../images/Hacker_s_Unity.png';

const sponsors = [
    {
        name: 'Dostea',
        logo: dosteaImg,
        url: 'https://www.instagram.com/dostea07/',
    },
    {
        name: 'Trainzex Ai',
        logo: trainzexImg,
        url: 'https://trainzexai.in',
    },
    {
        name: "Hacker's Unity",
        logo: hackersUnityImg,
        url: 'https://hackersunity.vercel.app',
    },
    // Duplicate for seamless loop if needed, but framer motion handles repeat differently.
    // However, for a true seamless marquee with few items, repeating the list is often necessary.
    {
        name: 'Dostea',
        logo: dosteaImg,
        url: 'https://www.instagram.com/dostea07/',
    },
    {
        name: 'Trainzex Ai',
        logo: trainzexImg,
        url: 'https://trainzexai.in',
    },
    {
        name: "Hacker's Unity",
        logo: hackersUnityImg,
        url: 'https://hackersunity.vercel.app',
    },
];

const Sponsors = () => {
    return (
        <section id="sponsors" className="py-20 bg-brand-dark overflow-hidden relative">
            <div className="container mx-auto px-4 mb-12 text-center">
                <span className="text-brand-blue uppercase tracking-[0.2em] text-sm font-bold mb-4 block">Our Partners</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Backed by <span className="text-gradient">Amazing Sponsors</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    We're proud to partner with industry leaders who share our vision of empowering the next generation of developers and artists.
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    className="flex py-10"
                    animate={{
                        x: [0, -960],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Render the list 4 times to ensure it covers even large screens and loops smoothly */}
                    {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <div className="glass-card w-64 h-40 flex items-center justify-center p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 mx-8 cursor-pointer">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Gradient overlays for smooth fade at edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};

export default Sponsors;
