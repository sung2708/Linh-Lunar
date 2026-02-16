import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AmbientEffects() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [lanterns] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (Math.random() > 0.7) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };
        setParticles((prev) => [...prev.slice(-20), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
            animate={{
              y: particle.y - 100,
              opacity: 0,
              scale: 0,
              rotate: 360
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((p) => p.id !== particle.id));
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              left: 0,
              top: 0
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {lanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ y: '100vh', x: `${lantern.x}%`, opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
          >
            <div className="relative w-12 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-3 bg-yellow-600 rounded-t-full"></div>
              <div className="absolute inset-2 border border-yellow-500 rounded opacity-60"></div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400 opacity-30 rounded-lg blur-sm"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-black/10"
           style={{ mixBlendMode: 'multiply' }}></div>
    </>
  );
}
