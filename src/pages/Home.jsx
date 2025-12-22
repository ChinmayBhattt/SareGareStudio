import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MusicShowcase from '../components/Music/MusicShowcase';
import About from '../components/About';
import Services from '../components/Services';
import PartnerCTA from '../components/PartnerCTA';
import Events from '../components/Events';
import Sponsors from '../components/Sponsors';
import JoinCTA from '../components/JoinCTA';
import Footer from '../components/Footer';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            window.scrollTo(0, 0);
        } else if (location.pathname === '/about') {
            const element = document.getElementById('about');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname === '/services') {
            const element = document.getElementById('services');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname === '/events') {
            const element = document.getElementById('events');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname === '/contact') {
            const element = document.getElementById('contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname === '/sponsors') {
            const element = document.getElementById('sponsors');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <>
            <Helmet>
                <title>SareGare Studio | Music & Film Production | Powered by Hacker's Unity</title>
                <meta name="description" content="SareGare Studio: Top music label & film production house by Chinmay Bhatt. Empowering artists with Hacker's Unity to create masterpieces. Join the creative revolution." />
                <meta name="keywords" content="SareGare Studio, Chinmay Bhatt, Music Label, Film Production, Event Management, Hacker's Unity, Music Distribution, Audio Recording, Mixing and Mastering, Video Production, Content Creation, Indian Artists, Music Studio India, Independent Filmmakers, Creative Arts, Sound Engineering, Artist Promotion, Music Events India, Bollywood Production, Indie Music Label, Digital Content, Studio Services, Professional Recording, Film Editing" />
                <link rel="canonical" href="https://saregarestudio.vercel.app/" />
            </Helmet>

            <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-purple selection:text-white">
                <Navbar />
                <main>
                    <Hero />
                    <MusicShowcase />
                    <Events />
                    <Services />
                    <PartnerCTA />
                    <About />
                    <Sponsors />
                    <JoinCTA />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;
