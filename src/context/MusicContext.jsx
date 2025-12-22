import React, { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { songs } from '../data/music';

const MusicContext = createContext();
const MusicProgressContext = createContext();

export const useMusic = () => useContext(MusicContext);
export const useMusicProgress = () => useContext(MusicProgressContext);

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // For full screen modal

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []); // Empty dependency array as we want this to run once on mount

  const playSong = useCallback((song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    const audio = audioRef.current;
    audio.src = song.audio;
    audio.volume = volume;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsPlayerVisible(true);
      })
      .catch(e => console.error("Error playing audio:", e));

    setCurrentSong(song);
  }, [currentSong, volume]); // Added dependencies

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!currentSong) return;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Error resuming audio:", e));
    }
  }, [isPlaying, currentSong]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (isFinite(time)) {
      audio.currentTime = time;
      setProgress(time);
    }
  }, []);

  const changeVolume = useCallback((val) => {
    const audio = audioRef.current;
    audio.volume = val;
    setVolume(val);
  }, []);

  const nextSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  }, [currentSong, playSong]);

  const prevSong = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  }, [currentSong, playSong]);

  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setCurrentSong(null);
  }, []);

  const value = useMemo(() => ({
    currentSong,
    isPlaying,
    volume,
    isPlayerVisible,
    isExpanded,
    playSong,
    togglePlay,
    seek,
    changeVolume,
    nextSong,
    prevSong,
    toggleExpanded,
    closePlayer
  }), [
    currentSong,
    isPlaying,
    volume,
    isPlayerVisible,
    isExpanded,
    playSong,
    togglePlay,
    seek,
    changeVolume,
    nextSong,
    prevSong,
    toggleExpanded,
    closePlayer
  ]);

  const progressValue = useMemo(() => ({
    progress,
    duration
  }), [progress, duration]);

  return (
    <MusicContext.Provider value={value}>
      <MusicProgressContext.Provider value={progressValue}>
        {children}
      </MusicProgressContext.Provider>
    </MusicContext.Provider>
  );
};
