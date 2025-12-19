import React, { useState } from 'react';
import { Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique violation code
                    toast.error('You are already subscribed!');
                } else {
                    console.error('Subscription error:', error);
                    toast.error('Failed to subscribe. Please try again.');
                }
            } else {
                toast.success('Successfully subscribed to the newsletter!');
                setEmail('');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer id="contact" className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Info */}
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">
                            SareGare <span className="text-brand-purple">Studio</span>
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Amplify your sound with the best production studio in town. We bring your musical vision to life.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/saregarestudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-purple transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com/saregarestudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-blue transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Services', 'Account', 'Sponsors'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item === 'Home' ? '' : item.toLowerCase().replace('artists', 'about')}`} className="text-gray-400 hover:text-brand-gold transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-brand-purple shrink-0" />
                                <a href="mailto:saregarestudio@gmail.com" className="hover:text-white transition-colors break-all">saregarestudio@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brand-purple shrink-0" />
                                <span>+91 8852924002</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brand-purple shrink-0" />
                                <span>+91 80002 08653</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Join the Movement</h3>
                        <p className="text-gray-400 mb-4">Subscribe for updates on new beats and offers.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 rounded-lg bg-brand-purple text-white font-bold hover:bg-brand-purple/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} SareGare Studio. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Powered by</span>
                        <a
                            href="https://hackersunity.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-blue hover:text-white transition-colors font-medium border-b border-brand-blue/30 hover:border-brand-blue"
                        >
                            Hacker's Unity
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
