import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { songs } from '../data/music';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

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
  }, []);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    const audio = audioRef.current;
    audio.src = song.audio;
    audio.volume = volume;
    audio.play();

    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      if (!currentSong) return;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (isFinite(time)) {
      audio.currentTime = time;
      setProgress(time);
    }
  };

  const changeVolume = (val) => {
    const audio = audioRef.current;
    audio.volume = val;
    setVolume(val);
  };

  const nextSong = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const prevSong = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const closePlayer = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setCurrentSong(null);
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      volume,
      progress,
      duration,
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
    }}>
      {children}
    </MusicContext.Provider>
  );
};
