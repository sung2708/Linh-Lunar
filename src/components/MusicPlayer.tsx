import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Logic tự động phát nhạc
  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Chờ người dùng chạm để phát nhạc..."));
      }
    };

    // Thử phát ngay
    attemptPlay();

    // Lắng nghe sự kiện click/touch đầu tiên để kích hoạt nhạc
    window.addEventListener('click', attemptPlay, { once: true });
    window.addEventListener('touchstart', attemptPlay, { once: true });

    return () => {
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    /* THAY ĐỔI VỊ TRÍ:
       - Mobile: bottom-6 right-4 (Tránh che chữ Nguyễn Diệu Linh ở trên)
       - Desktop: top-6 right-6
    */
    <div className="fixed bottom-6 right-4 md:bottom-auto md:top-6 md:right-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-900 via-red-700 to-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border-2 border-yellow-600 flex items-center justify-center overflow-hidden"
      >
        {/* Vòng quay lấp lánh khi hát */}
        <motion.div
          animate={{ rotate: rotation }}
          className="absolute inset-1 rounded-full border border-yellow-500 opacity-20"
        ></motion.div>

        {/* Trạng thái phát nhạc */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-yellow-400/50 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hiệu ứng sóng nhạc nhỏ khi đang phát */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-yellow-500 rounded-full"
          ></motion.div>
        )}
      </motion.button>

      <audio ref={audioRef} loop preload="auto">
        <source src="https://res.cloudinary.com/dvqsoe9nx/video/upload/v1771253094/ud2xlioddzzjm5yp5o1f.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}