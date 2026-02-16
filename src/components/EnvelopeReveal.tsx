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
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#FFD700', '#FFA500', '#8B0000'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
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
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.5, 0], rotate: [0, 180, 360], opacity: [1, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.5, 1] }}
        className="relative"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 100px rgba(212, 175, 55, 1)',
              '0 0 200px rgba(255, 215, 0, 1)',
              '0 0 300px rgba(212, 175, 55, 1)',
            ],
          }}
          transition={{ duration: 1, repeat: 2 }}
          className="w-64 h-80 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg"
        ></motion.div>
      </motion.div>

      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-b from-red-950 via-black to-black"
      ></motion.div>
    </div>
  );
}
