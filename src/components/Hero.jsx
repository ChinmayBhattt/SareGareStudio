import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Play, Music, Mic, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax Effects for scrolling
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const springConfig = { stiffness: 100, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark perspective-1000"
        >
            {/* Background Animation & Noise - Optimized */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <motion.div style={{ y: y1, x: -50 }} className="absolute top-0 -left-4 w-[500px] h-[500px] bg-brand-purple/30 filter blur-[80px] opacity-20 animate-blob will-change-transform"></motion.div>
                <motion.div style={{ y: y2, x: 50 }} className="absolute top-0 -right-4 w-[500px] h-[500px] bg-brand-blue/30 filter blur-[80px] opacity-20 animate-blob animation-delay-2000 will-change-transform"></motion.div>
                <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-brand-gold/20 filter blur-[100px] opacity-10 animate-blob animation-delay-4000 will-change-transform"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                        <span className="text-brand-purple text-xs font-bold tracking-widest uppercase">Premium Production House</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 leading-[1.1]">
                        Amplifying the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-gold relative">
                            Sound of Future
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                                className="absolute -bottom-2 path-no-fill w-full right-0"
                                viewBox="0 0 300 12"
                                fill="none"
                                width="300"
                                height="12"
                            >
                                <path d="M1 9C50 9 100 3 150 3C200 3 250 9 299 9" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
                            </motion.svg>
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
                        Your gateway to professional music production, mixing, stunning visuals, and global distribution.
                        We turn your raw talent into a masterpiece.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/services" className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-bold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2 group transform hover:-translate-y-1">
                            Explore Services
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/contact" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2 transform hover:-translate-y-1">
                            Start a Project
                        </Link>
                    </div>
                </motion.div>

                {/* 3D Floating Elements */}
                <motion.div
                    style={{ rotateX, rotateY, z: 100 }}
                    className="relative hidden lg:block h-[600px] w-full perspective-1000"
                >
                    {/* Central Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 glass-card rounded-3xl p-6 border border-white/20 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center text-white">
                                <Music size={24} />
                            </div>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["30%", "60%", "45%", "80%"] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                    className="h-full bg-brand-purple"
                                ></motion.div>
                            </div>
                            <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["50%", "20%", "70%", "40%"] }}
                                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
                                    className="h-full bg-brand-blue"
                                ></motion.div>
                            </div>
                            <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["40%", "80%", "30%", "60%"] }}
                                    transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                                    className="h-full bg-brand-gold"
                                ></motion.div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold text-xl mb-1">Production Hub</h3>
                            <p className="text-gray-400 text-xs">Dolby Atmos • 8K Video • Hi-Res Audio</p>
                        </div>
                    </motion.div>

                    {/* Floating Element 1 - Microphone */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 w-24 h-24 glass rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md z-10 will-change-transform"
                    >
                        <Mic className="text-brand-blue w-10 h-10" />
                    </motion.div>

                    {/* Floating Element 2 - Layers */}
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-32 left-0 w-20 h-20 glass rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md z-30 will-change-transform"
                    >
                        <Layers className="text-brand-gold w-8 h-8" />
                    </motion.div>

                    {/* Decorative Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full z-0 animate-spin-slow"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-brand-purple/20 rounded-full z-0 animate-reverse-spin-slow"></div>

                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            >
                <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ height: ["20%", "80%", "20%"], y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 bg-white rounded-full"
                    ></motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
