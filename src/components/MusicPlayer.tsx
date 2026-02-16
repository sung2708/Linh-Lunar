import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Hiệu ứng xoay đĩa khi đang phát nhạc
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cố gắng tự động phát nhạc khi component được nạp
  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Trình duyệt chặn tự động phát, đợi tương tác người dùng
            console.log("Autoplay blocked. Waiting for user interaction.");
          });
      }
    };

    attemptPlay();

    // Lắng nghe sự kiện click toàn trang để kích hoạt nhạc nếu autoplay bị chặn
    window.addEventListener('click', attemptPlay, { once: true });
    return () => window.removeEventListener('click', attemptPlay);
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra window
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
        {/* Đảm bảo tệp bg.mp3 nằm trong thư mục public/music/ */}
        <source src="/music/bg.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}