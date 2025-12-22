import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Briefcase, User, Mail, Phone, MapPin, Link as LinkIcon, Clock, Award, FileText, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JoinTeam = () => {
    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        role: 'Music Producer',
        custom_role: '',
        experience_level: 'Beginner',
        years_of_experience: '',
        portfolio_link: '',
        motivation: '',
        availability: 'Full-time',
        consent: false
    });

    const roles = [
        "Music Producer", "Singer / Vocalist", "Music Composer", "Lyricist",
        "Sound Engineer", "Video Editor", "Graphic Designer", "Social Media Manager",
        "Event Manager", "Marketing / PR", "Intern", "Other"
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
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            role: formData.role === 'Other' ? formData.custom_role : formData.role,
            experience_level: formData.experience_level,
            years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : null,
            portfolio_link: formData.portfolio_link,
            motivation: formData.motivation,
            availability: formData.availability
        };

        try {
            const { error } = await supabase
                .from('applications')
                .insert([applicationData]);

            if (error) {
                if (error.code === '23505') {
                    toast.error('You have already applied with this email.');
                } else {
                    console.error('Submission Error:', error);
                    toast.error('Failed to submit application. Please try again.');
                }
            } else {
                toast.success('Application submitted successfully! We will contact you soon.');
                setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    city: '',
                    role: 'Music Producer',
                    custom_role: '',
                    experience_level: 'Beginner',
                    years_of_experience: '',
                    portfolio_link: '',
                    motivation: '',
                    availability: 'Full-time',
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
                    <span className="text-brand-purple font-bold tracking-widest uppercase text-sm">Join Our Team</span>
                    <h1 className="text-5xl font-heading font-black mb-4">Work With <span className="text-gradient">SareGare Studio</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We are strictly looking for passionate, creative and dedicated individuals. If you live and breathe music and art, this is your home.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-brand-charcoal border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><User size={16} /> Full Name *</label>
                                <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Mail size={16} /> Email Address *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Phone size={16} /> Contact Number *</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><MapPin size={16} /> City / Location</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all" placeholder="Mumbai, India" />
                            </div>
                        </div>

                        <hr className="border-white/5" />

                        {/* Role & Experience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Briefcase size={16} /> Role Applying For *</label>
                                <select required name="role" value={formData.role} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all appearance-none text-gray-300">
                                    {roles.map(r => <option key={r} value={r} className="bg-brand-charcoal">{r}</option>)}
                                </select>
                                {formData.role === 'Other' && (
                                    <input required type="text" name="custom_role" value={formData.custom_role} onChange={handleChange} className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-brand-purple outline-none" placeholder="Specify your role" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Award size={16} /> Experience Level</label>
                                <select name="experience_level" value={formData.experience_level} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all appearance-none text-gray-300">
                                    <option value="Beginner" className="bg-brand-charcoal">Beginner</option>
                                    <option value="Intermediate" className="bg-brand-charcoal">Intermediate</option>
                                    <option value="Professional" className="bg-brand-charcoal">Professional</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Clock size={16} /> Years of Experience</label>
                                <input type="number" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all" placeholder="e.g. 2" min="0" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Clock size={16} /> Availability</label>
                                <select name="availability" value={formData.availability} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all appearance-none text-gray-300">
                                    <option value="Full-time" className="bg-brand-charcoal">Full-time</option>
                                    <option value="Part-time" className="bg-brand-charcoal">Part-time</option>
                                    <option value="Freelance" className="bg-brand-charcoal">Freelance</option>
                                    <option value="Internship" className="bg-brand-charcoal">Internship</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><LinkIcon size={16} /> Portfolio / Social Links</label>
                            <input type="url" name="portfolio_link" value={formData.portfolio_link} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all" placeholder="https://instagram.com/yourprofile" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><FileText size={16} /> Why do you want to work with us? *</label>
                            <textarea required name="motivation" value={formData.motivation} onChange={handleChange} rows="4" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-brand-purple outline-none transition-all resize-none" placeholder="Tell us about your passion..."></textarea>
                        </div>

                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                            <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="w-5 h-5 accent-brand-purple cursor-pointer" />
                            <label className="text-sm text-gray-400 cursor-pointer select-none">I confirm that all the information provided above is true and accurate.</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Submit Application <CheckCircle size={20} /></>
                            )}
                        </button>

                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default JoinTeam;
