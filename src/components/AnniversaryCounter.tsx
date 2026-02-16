import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function AnniversaryCounter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Ngày bắt đầu yêu nhau
    const startDate = new Date('2025-08-15T00:00:00').getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const diff = now - startDate;

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center flex-1 min-w-[75px] md:min-w-[140px]"
    >
      <div className="relative w-full">
        <div className="bg-gradient-to-br from-red-900 to-black border-2 md:border-4 border-yellow-500 rounded-xl md:rounded-2xl p-3 md:p-6 shadow-[0_0_20px_rgba(185,28,28,0.3)] mb-2">
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            /* FIX: Thêm leading-none và py-2 để không bị mất nét chữ trên Desktop */
            className="text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-600 text-center leading-none py-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            }}
          >
            {String(value).padStart(2, '0')}
          </motion.div>
        </div>

        {/* Chấm tròn trang trí */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 bg-yellow-400 rounded-full shadow-[0_0_10px_#fbbf24]"
        ></motion.div>
      </div>

      <span
        className="text-yellow-200 text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium mt-1"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-14 h-14 md:w-24 md:h-24 text-red-600 fill-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
          </motion.div>

          <h2
            className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-600 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hành Trình Yêu Thương
          </h2>

          <p
            className="text-yellow-100/60 text-base md:text-2xl font-light tracking-widest italic"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            "Chúng ta đã cùng nhau đi qua..."
          </p>
        </motion.div>

        {/* Counter Grid: Luôn 4 cột trên 1 hàng */}
        <div className="flex justify-center gap-2 md:gap-8 mb-16 max-w-3xl mx-auto px-2">
          <TimeUnit value={time.days} label="Ngày" />
          <TimeUnit value={time.hours} label="Giờ" />
          <TimeUnit value={time.minutes} label="Phút" />
          <TimeUnit value={time.seconds} label="Giây" />
        </div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-block relative">
            <p
              className="text-yellow-400/90 text-xl md:text-3xl italic font-serif"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mỗi giây phút bên Heo Linh đều là món quà vô giá
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              className="h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-4"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}