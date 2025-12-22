import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

const MusicCard = ({ song, index }) => {
    const { playSong, currentSong, isPlaying } = useMusic();
    const isCurrent = currentSong?.id === song.id;
    const isLocked = song.comingSoon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={!isLocked ? { 
                scale: 1.05,
                rotateY: 5,
                z: 50,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            } : {}}
            className={`relative group w-[300px] h-[400px] flex-shrink-0 perspective-1000 ${isLocked ? 'cursor-not-allowed grayscale-[0.8] opacity-70' : 'cursor-pointer'}`}
            onClick={() => !isLocked && playSong(song)}
        >
            <div className={`w-full h-full rounded-2xl overflow-hidden relative shadow-2xl transition-all duration-300 border border-white/10 ${isCurrent ? 'ring-2 ring-purple-500' : ''}`}>
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${song.cover})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${song.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Shine Effect */}
                {!isLocked && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />}

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                    
                    {/* Coming Soon Badge */}
                    {isLocked && (
                        <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Coming Soon</span>
                        </div>
                    )}

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold font-display mb-1 drop-shadow-lg">{song.title}</h3>
                        <p className="text-white/80 font-medium mb-4 backdrop-blur-sm self-start px-2 py-0.5 rounded-md bg-white/10 inline-block">{song.artist}</p>
                    </motion.div>

                    {/* Play Button Overlay */}
                    {!isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
                                <Play className={`w-8 h-8 text-white ${isCurrent && isPlaying ? 'fill-white' : 'fill-transparent'}`} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MusicCard;
