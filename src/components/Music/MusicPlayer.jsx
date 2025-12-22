import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, X } from 'lucide-react';
import { useMusic, useMusicProgress } from '../../context/MusicContext';
import LyricsView from './LyricsView';

const MusicPlayer = () => {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        volume,
        changeVolume,
        isPlayerVisible,
        isExpanded,
        toggleExpanded,
        closePlayer
    } = useMusic();

    const { progress, duration } = useMusicProgress();

    // Local state for smooth scrubbing
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragTime, setDragTime] = React.useState(0);

    // Sync dragTime with progress when not dragging
    React.useEffect(() => {
        if (!isDragging) {
            setDragTime(progress);
        }
    }, [progress, isDragging]);

    const handleSeekStart = () => {
        setIsDragging(true);
    };

    const handleSeekChange = (e) => {
        setDragTime(Number(e.target.value));
    };

    const handleSeekEnd = (e) => {
        seek(Number(e.target.value));
        setIsDragging(false);
    };

    if (!isPlayerVisible || !currentSong) return null;

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <AnimatePresence>
                {isPlayerVisible && !isExpanded && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
                    >
                        <div className="max-w-screen-xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 md:gap-8">
                            {/* Song Info */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <img
                                    src={currentSong.cover}
                                    alt={currentSong.title}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shadow-lg"
                                />
                                <div className="flex flex-col min-w-0 pointer-events-none md:pointer-events-auto" onClick={toggleExpanded}>
                                    <h4 className="text-white font-bold truncate cursor-pointer hover:underline">{currentSong.title}</h4>
                                    <p className="text-gray-400 text-xs md:text-sm truncate">{currentSong.artist}</p>
                                </div>
                            </div>

                            {/* Controls - Center */}
                            <div className="flex flex-col items-center flex-[2] gap-2">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <button onClick={prevSong} className="text-gray-400 hover:text-white transition-colors">
                                        <SkipBack size={20} />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform text-black"
                                    >
                                        {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                                    </button>
                                    <button onClick={nextSong} className="text-gray-400 hover:text-white transition-colors">
                                        <SkipForward size={20} />
                                    </button>
                                </div>

                                {/* Progress Bar (Desktop) */}
                                <div className="hidden md:flex items-center gap-3 w-full max-w-md">
                                    <span className="text-xs text-gray-500 font-mono w-10 text-right">{formatTime(isDragging ? dragTime : progress)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 100}
                                        value={isDragging ? dragTime : progress}
                                        onMouseDown={handleSeekStart}
                                        onChange={handleSeekChange}
                                        onMouseUp={handleSeekEnd}
                                        onTouchStart={handleSeekStart}
                                        onTouchEnd={handleSeekEnd}
                                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                                    />
                                    <span className="text-xs text-gray-500 font-mono w-10">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Volume & Expand (Desktop) */}
                            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
                                <div className="flex items-center gap-2 group">
                                    <Volume2 size={18} className="text-gray-400" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => changeVolume(Number(e.target.value))}
                                        className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                                    />
                                </div>
                                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                                    <button onClick={toggleExpanded} className="text-gray-400 hover:text-white transition-colors" aria-label="Expand player">
                                        <Maximize2 size={20} />
                                    </button>
                                    <button onClick={closePlayer} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Close player">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Info/Controls */}
                            <div className="flex md:hidden items-center gap-3">
                                <button onClick={toggleExpanded} className="text-gray-400 hover:text-white">
                                    <Maximize2 size={24} />
                                </button>
                                <button onClick={closePlayer} className="text-gray-400 hover:text-red-500">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full Screen Lyrics View */}
            <AnimatePresence>
                {isExpanded && <LyricsView />}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;
