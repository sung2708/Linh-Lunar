import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface EnvelopeRevealProps {
  onComplete: () => void;
}

export default function EnvelopeReveal({ onComplete }: EnvelopeRevealProps) {
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    // Tăng zIndex để pháo giấy luôn nằm trên cùng của mobile layer
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 40 * (timeLeft / duration);

      // Điều chỉnh origin x hẹp lại cho mobile (0.2 - 0.8 thay vì 0.1 - 0.9)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#FFD700', '#FFA500', '#8B0000'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#FFD700', '#FFA500', '#8B0000'],
      });
    }, 250);

    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{
          scale: [0.8, 1.2, 0],
          rotate: [0, 180, 360],
          opacity: [1, 1, 0]
        }}
        transition={{ duration: 2.5, times: [0, 0.6, 1], ease: "easeInOut" }}
        className="relative px-4"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 50px rgba(212, 175, 55, 0.8)',
              '0 0 100px rgba(255, 215, 0, 1)',
              '0 0 50px rgba(212, 175, 55, 0.8)',
            ],
          }}
          transition={{ duration: 0.8, repeat: 3 }}
          // Thu nhỏ kích thước bao lì xì trên mobile (w-48 h-64) và to lên trên desktop (md:w-64 md:h-80)
          className="w-48 h-64 md:w-64 md:h-80 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl flex items-center justify-center"
        >
          <span className="text-red-700 text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            🧧
          </span>
        </motion.div>
      </motion.div>

      {/* Lớp phủ chuyển cảnh (Curtain effect) */}
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.2, duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-b from-red-950 via-black to-black z-[110]"
      ></motion.div>
    </div>
  );
}