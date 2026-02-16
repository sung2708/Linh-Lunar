import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AmbientEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Giảm số lượng đèn lồng xuống còn 5 để không làm rối màn hình nhỏ của điện thoại
  const [lanterns] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8, // Tăng tốc độ bay một chút cho sinh động
    }))
  );

  useEffect(() => {
    let particleId = 0;

    // Hàm tạo hạt tại vị trí chạm/di chuyển
    const createParticle = (x: number, y: number) => {
      const newParticle = {
        id: particleId++,
        x: x,
        y: y,
      };
      // Giữ ít hạt hơn (15 hạt) để mượt hơn trên đt
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    // Xử lý di chuyển chuột (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.8) createParticle(e.clientX, e.clientY);
    };

    // Xử lý chạm màn hình (Mobile)
    const handleTouchMove = (e: TouchEvent) => {
      if (Math.random() > 0.5) { // Tỉ lệ cao hơn trên mobile để thấy rõ hiệu ứng
        const touch = e.touches[0];
        createParticle(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* Hiệu ứng hạt lấp lánh (Sparkles) */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 0.8 }}
              animate={{
                y: particle.y - 80,
                opacity: 0,
                scale: 0,
                rotate: 180
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setParticles((prev) => prev.filter((p) => p.id !== particle.id));
              }}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full"
              style={{
                boxShadow: '0 0 8px rgba(250, 204, 21, 0.8)',
                left: 0,
                top: 0,
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Đèn lồng bay (Lanterns) */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {lanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ y: '110vh', x: `${lantern.x}%`, opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.8, 0.8, 0],
              x: [`${lantern.x}%`, `${lantern.x + (Math.random() * 10 - 5)}%`] // Thêm hiệu ứng đưa nhẹ theo gió
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
          >
            {/* Thu nhỏ đèn lồng trên mobile: w-8 h-10 */}
            <div className="relative w-8 h-10 md:w-12 md:h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-5 h-2 bg-yellow-600 rounded-t-full"></div>
              <div className="absolute inset-1 border border-yellow-500/40 rounded"></div>
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400 opacity-20 rounded-lg blur-md"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lớp phủ Gradient tạo chiều sâu (Vignette) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"
        style={{ mixBlendMode: 'multiply' }}
      ></div>
    </>
  );
}