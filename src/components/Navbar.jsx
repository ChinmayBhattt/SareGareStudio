import React, { useState, useEffect } from 'react';
import { Menu, X, Music, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'About', path: '/about' },
        { name: 'Sponsors', path: '/sponsors' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-tr from-brand-purple to-brand-blue rounded-lg group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300">
                        <Music className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-heading font-bold tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                        SareGare <span className="text-brand-purple">Studio</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-gray-300 hover:text-white font-medium transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-purple after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <Link to="/account" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300">
                            <User size={18} />
                            Account
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                                Log In
                            </Link>
                            <Link to="/signup" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold shadow-lg hover:shadow-brand-purple/50 hover:scale-105 transition-all duration-300">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white text-lg font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <Link to="/account" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold flex justify-center items-center gap-2">
                                    <User size={18} />
                                    Account
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-gray-300 hover:text-white font-medium">
                                        Log In
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold flex justify-center">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
