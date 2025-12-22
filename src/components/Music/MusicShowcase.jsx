import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { songs } from '../../data/music';
import MusicCard from './MusicCard';

const MusicShowcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section ref={containerRef} className="py-24 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 mb-4">
                        Sonic <span className="text-purple-500">Experiences</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Listen to our original compositions. Immersive soundscapes designed to take you on a journey.
                    </p>
                </motion.div>

                {/* Carousel Area - Centered */}
                <div className="relative w-full flex items-center justify-center pb-12">
                    <motion.div
                        className="flex gap-8 px-4 overflow-x-visible items-center justify-center flex-wrap md:flex-nowrap"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {songs.map((song, index) => (
                            <MusicCard key={song.id} song={song} index={index} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MusicShowcase;
