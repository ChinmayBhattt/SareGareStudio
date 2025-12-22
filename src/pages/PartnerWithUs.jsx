import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Building, User, Mail, Phone, Handshake, MessageSquare, CheckCircle, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PartnerWithUs = () => {
    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        partnership_type: 'Content Collaboration',
        message: '',
        consent: false
    });

    const partnershipTypes = [
        "Sponsorship",
        "Content Collaboration",
        "Distribution Partner",
        "Event Partner",
        "Equipment Supplier",
        "Brand Ambassador",
        "Other"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.consent) {
            toast.error("Please confirm the information provided is true.");
            return;
        }

        setLoading(true);

        const applicationData = {
            full_name: formData.full_name,
            company_name: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            partnership_type: formData.partnership_type,
            message: formData.message
        };

        try {
            const { error } = await supabase
                .from('partnership_applications')
                .insert([applicationData]);

            if (error) {
                console.error('Submission Error:', error);
                toast.error('Failed to submit application. Please try again.');
            } else {
                toast.success('Partnership request submitted! We will contact you soon.');
                setFormData({
                    full_name: '',
                    company_name: '',
                    email: '',
                    phone: '',
                    partnership_type: 'Content Collaboration',
                    message: '',
                    consent: false
                });
            }
        } catch (err) {
            console.error('Unexpected Error:', err);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-dark min-h-screen text-white">
            <Navbar />

            <main className="pt-24 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-brand-gold font-bold tracking-widest uppercase text-sm">Grow With Us</span>
                    <h1 className="text-5xl font-heading font-black mb-4">Become A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Partner</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Let's collaborate to create impactful experiences. Fill out the form below and start your journey with SareGare Studio.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-brand-charcoal border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background blob */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">

                        {/* Partner Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><User size={16} /> Contact Person Name *</label>
                                <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Building size={16} /> Company / Brand Name</label>
                                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="Acme Inc." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Mail size={16} /> Email Address *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="partner@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Phone size={16} /> Phone Number *</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <hr className="border-white/5" />

                        {/* Partnership Type & Message */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Handshake size={16} /> Partnership Type *</label>
                                <select required name="partnership_type" value={formData.partnership_type} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-all appearance-none text-gray-300">
                                    {partnershipTypes.map(type => <option key={type} value={type} className="bg-brand-charcoal">{type}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><MessageSquare size={16} /> Message / Proposal *</label>
                                <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-all resize-none" placeholder="Tell us how you would like to partner with us..."></textarea>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="w-5 h-5 accent-brand-gold cursor-pointer" />
                            <label className="text-sm text-gray-400 cursor-pointer select-none">I agree to SareGare Studio's terms and privacy policy.</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-brand-gold to-yellow-600 rounded-xl font-bold text-lg text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Submit Proposal <CheckCircle size={20} /></>
                            )}
                        </button>

                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PartnerWithUs;
