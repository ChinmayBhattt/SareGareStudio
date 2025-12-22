import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusic, useMusicProgress } from '../../context/MusicContext';

const LyricsView = () => {
    const {
        currentSong,
        toggleExpanded,
        isPlaying,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        color // Access song color or context color if needed
    } = useMusic();

    const { progress, duration } = useMusicProgress();

    const lyricsContainerRef = useRef(null);

    // Find current lyric index
    const currentLyricIndex = currentSong?.lyrics?.findIndex((line, index) => {
        const nextLine = currentSong.lyrics[index + 1];
        return progress >= line.time && (nextLine ? progress < nextLine.time : true);
    });

    // Auto-scroll to active lyric
    useEffect(() => {
        if (lyricsContainerRef.current && currentLyricIndex !== -1) {
            const activeElement = lyricsContainerRef.current.children[currentLyricIndex];
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentLyricIndex]);

    if (!currentSong) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-[60] bg-gradient-to-b ${currentSong.color} flex flex-col`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                <button
                    onClick={toggleExpanded}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ChevronDown className="text-white w-8 h-8" />
                </button>
                <div className="text-center">
                    <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Now Playing</p>
                    <p className="text-white font-bold">{currentSong.title}</p>
                </div>
                <div className="w-12" /> {/* Spacer */}
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-7xl mx-auto w-full overflow-hidden">

                {/* Album Art (Desktop Left / Mobile Top) */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <motion.img
                        src={currentSong.cover}
                        alt={currentSong.title}
                        className="w-64 h-64 md:w-[500px] md:h-[500px] rounded-2xl shadow-2xl object-cover"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                </div>

                {/* Lyrics Area */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] overflow-y-auto no-scrollbar mask-image-b relative" ref={lyricsContainerRef}>
                    <div className="flex flex-col gap-8 py-[30vh] px-4"> {/* Padding for center alignment */}
                        {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
                            currentSong.lyrics.map((line, index) => {
                                const isActive = index === currentLyricIndex;
                                const isPast = index < currentLyricIndex;
                                return (
                                    <motion.p
                                        key={index}
                                        animate={{
                                            scale: isActive ? 1.05 : 1,
                                            opacity: isActive ? 1 : isPast ? 0.4 : 0.6,
                                            color: isActive ? "#ffffff" : "#cccccc",
                                            y: isActive ? 0 : 0
                                        }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className={`text-2xl md:text-3xl font-bold leading-relaxed transition-all duration-300 cursor-pointer text-center md:text-left break-words max-w-full ${isActive ? 'text-white drop-shadow-md' : 'text-gray-400'}`}
                                        onClick={() => seek(line.time)}
                                    >
                                        {line.text}
                                    </motion.p>
                                );
                            })
                        ) : (
                            <p className="text-white/50 text-2xl font-bold text-center">Instrumental / Lyrics not available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-8 pb-12 bg-gradient-to-t from-black/40 to-transparent">
                {/* Progress Bar */}
                <div className="mb-6 flex items-center gap-4">
                    <span className="text-xs text-white/70 font-mono w-10 text-right">
                        {Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}
                    </span>
                    <div
                        className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative group"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            seek(percent * duration);
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100"
                            style={{ width: `${(progress / duration) * 100}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `${(progress / duration) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-white/70 font-mono w-10">
                        {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                    </span>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-10">
                    <button onClick={prevSong} className="text-white/70 hover:text-white transition-colors">
                        <SkipBack size={32} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                    >
                        {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                    </button>
                    <button onClick={nextSong} className="text-white/70 hover:text-white transition-colors">
                        <SkipForward size={32} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default LyricsView;
