import dprCover from '../components/Music/Assets/dpr.jpg';
import dprAudio from '../components/Music/Assets/dpr_ka_chora.mp3';

export const songs = [
  {
    id: 1,
    title: "Dungarpur Ka Chora",
    artist: "SareGare Studio Originals",
    cover: dprCover,
    audio: dprAudio,
    color: "from-amber-900 via-orange-600 to-yellow-500",
    lyrics: [
      { time: 0, text: "[Intro Music]" },
      { time: 14, text: "O dungarpur ka chora hoon main" },
      { time: 18, text: "Dil se hoon main desi" },
      { time: 24, text: "Sapne mere hai rangeen" },
      { time: 28, text: "Jaise ho koi kheti" },
      { time: 34, text: "[Instrumental Break]" },
      { time: 45, text: "Mitti ki khushboo aati hai" },
      { time: 52, text: "Jab main gaaon mein chalta hoon" },
      { time: 60, text: "Sabse pyaara mera desh" },
      { time: 66, text: "Mera Dungarpur hai vishesh" }
    ]
  },
  {
    id: 2,
    title: "YamRaj",
    artist: "Cyber Vibe",
    cover: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    audio: "",
    color: "from-fuchsia-900 via-purple-600 to-cyan-500",
    comingSoon: true,
    lyrics: []
  },
  {
    id: 3,
    title: "Celestial Voyage",
    artist: "Star Walker",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
    audio: "",
    color: "from-slate-900 via-blue-800 to-indigo-500",
    comingSoon: true,
    lyrics: []
  }
];
