import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import backgroundMusic from '../assets/music/bg.mp3';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="relative w-16 h-16 bg-gradient-to-br from-red-900 to-red-700 rounded-full shadow-2xl border-2 border-yellow-600 flex items-center justify-center overflow-hidden"
      >
        <motion.div
          animate={{ rotate: rotation }}
          className="absolute inset-1 rounded-full border-2 border-yellow-500 opacity-30"
        ></motion.div>
        <div className="absolute inset-3 bg-black/20 rounded-full"></div>
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-yellow-400 relative z-10" />
        ) : (
          <VolumeX className="w-6 h-6 text-yellow-400 relative z-10" />
        )}
      </motion.button>
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>
    </div>
  );
}
