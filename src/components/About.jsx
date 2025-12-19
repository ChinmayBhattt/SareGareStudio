import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import chinmayImg from './images/chinmay.jpg';
import harshImg from './images/harsh.png';

const teamMembers = [
    {
        name: 'Chinmay Bhatt',
        role: 'Founder',
        image: chinmayImg,
        social: {
            twitter: 'https://twitter.com/chinmaybhattt',
            instagram: 'https://instagram.com/chinmaybhattt',
        }
    },
    // {
    //     name: 'Manya',
    //     role: 'CEO',
    //     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Placeholder
    //     social: {}
    // },
    {
        name: 'Harsh Mochi',
        role: 'Co-Founder & COO',
        image: harshImg,
        social: {
            instagram: 'https://instagram.com/goad.foryou',
        }
    }
];

const About = () => {
    return (
        <section id="about" className="py-20 bg-brand-charcoal relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        The Minds Behind <span className="text-gradient">The Music</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Met the passionate team driving SareGare Studio to new heights.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="glass-card rounded-2xl p-6 group hover:bg-brand-purple/10 transition-all duration-300"
                        >
                            <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                                    {member.social.twitter && (
                                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-blue hover:text-white transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    )}
                                    {member.social.instagram && (
                                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-purple hover:text-white transition-colors">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{member.name}</h3>
                                <p className="text-brand-purple font-medium">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
