import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Ticket, ArrowRight, Share2 } from 'lucide-react';
import dosteaImg from '../images/dostea.png';
// Using Unsplash placeholders for high-quality event visuals
const placeholders = {
    techno: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    jazz: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    festival: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    studio: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

const eventsData = [
    {
        id: 1,
        title: "Neon Horizon Festival",
        date: "Dec 31, 2025",
        location: "Mumbai Arena, India",
        image: placeholders.techno,
        category: "Music Festival",
        description: "Experience the future of sound at Neon Horizon. A multi-sensory journey featuring top global DJs, immersive 3D visuals, and a countdown like no other.",
        artists: ["DJ Snake", "Ritviz", "Nucleya"],
        sponsors: [dosteaImg]
    },
    {
        id: 2,
        title: "SareGare Jazz Night",
        date: "Jan 15, 2026",
        location: "The Royal Opera House",
        image: placeholders.jazz,
        category: "Live Concert",
        description: "An intimate evening of soulful jazz and blues. Witness master musicians weave magic in an acoustic setting designed for audiophiles.",
        artists: ["Louiz Banks", "Gary Lawyer"],
        sponsors: []
    },
    {
        id: 3,
        title: "Indie Films Showcase",
        date: "Feb 20, 2026",
        location: "PVR Icon, Mumbai",
        image: placeholders.studio,
        category: "Film Screening",
        description: "Celebrating the raw talent of independent filmmakers. Premiere screenings of 5 award-winning short films produced by SareGare Studio.",
        artists: ["Anurag Kashyap (Guest)", "Short Film Directors"],
        sponsors: [dosteaImg]
    }
];

const EventCard = ({ event, onClick }) => {
    return (
        <motion.div
            layoutId={`card-container-${event.id}`}
            onClick={() => onClick(event)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5, z: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative h-[400px] w-full rounded-3xl cursor-pointer overflow-hidden bg-brand-charcoal border border-white/5 shadow-2xl perspective-1000"
        >
            {/* Background Image with Parallax-like scaling on hover */}
            <motion.div
                layoutId={`card-image-${event.id}`}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <motion.span
                    layoutId={`card-category-${event.id}`}
                    className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-brand-purple uppercase bg-black/50 backdrop-blur-md rounded-full w-fit"
                >
                    {event.category}
                </motion.span>
                <motion.h3
                    layoutId={`card-title-${event.id}`}
                    className="text-3xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-brand-blue transition-colors"
                >
                    {event.title}
                </motion.h3>
                <motion.div
                    layoutId={`card-info-${event.id}`}
                    className="flex items-center gap-4 text-gray-300 text-sm"
                >
                    <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-brand-purple" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-brand-purple" />
                        <span>{event.location}</span>
                    </div>
                </motion.div>

                {/* Hover CTA */}
                <div className="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="flex items-center gap-2 text-white font-bold tracking-wide uppercase text-sm">
                        View Details <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const EventModal = ({ event, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-container-${event.id}`}
                className="relative w-full max-w-5xl bg-brand-charcoal overflow-hidden rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-brand-purple transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Image & Hero */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <motion.div layoutId={`card-image-${event.id}`} className="absolute inset-0 w-full h-full">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent md:bg-gradient-to-r"></div>
                    </motion.div>

                    <div className="absolute bottom-6 left-6 z-10 md:hidden">
                        <motion.h2 layoutId={`card-title-${event.id}`} className="text-3xl font-bold text-white mb-1">
                            {event.title}
                        </motion.h2>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-brand-dark/50">
                    <motion.span
                        layoutId={`card-category-${event.id}`}
                        className="hidden md:inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-brand-purple uppercase bg-white/5 rounded-full"
                    >
                        {event.category}
                    </motion.span>

                    <motion.h2
                        layoutId={`card-title-${event.id}`}
                        className="hidden md:block text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
                    >
                        {event.title}
                    </motion.h2>

                    <motion.div layoutId={`card-info-${event.id}`} className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><Calendar size={14} /> Date</p>
                            <p className="text-white font-semibold">{event.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1 flex items-center gap-2"><MapPin size={14} /> Location</p>
                            <p className="text-white font-semibold">{event.location}</p>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-3">About the Event</h4>
                            <p className="text-gray-300 leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Users size={18} className="text-brand-blue" /> Lineup</h4>
                            <div className="flex flex-wrap gap-2">
                                {event.artists.map((artist, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200">
                                        {artist}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {event.sponsors.length > 0 && (
                            <div>
                                <h4 className="text-lg font-bold text-white mb-3">Partners</h4>
                                <div className="flex items-center gap-4">
                                    {event.sponsors.map((logo, idx) => (
                                        <div key={idx} className="h-10 w-24 bg-white/5 rounded px-2 flex items-center justify-center">
                                            <img src={logo} alt="Sponsor" className="h-8 object-contain opacity-70" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex gap-4">
                        <button className="flex-1 py-4 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold rounded-xl shadow-lg shadow-brand-purple/20 transition-all flex items-center justify-center gap-2">
                            <Ticket size={20} />
                            Get Tickets
                        </button>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-all">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <section id="events" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-brand-blue uppercase tracking-[0.2em] text-sm font-bold mb-2 block">Global Experiences</span>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-4">
                            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">Events</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Immersive concerts, film premieres, and creative workshops. Be part of the moment.
                        </p>
                    </div>

                    <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-medium uppercase tracking-wider text-sm">
                        View All Archive
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event) => (
                        <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;
