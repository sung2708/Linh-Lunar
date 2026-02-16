import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function AnniversaryCounter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Mốc thời gian bắt đầu yêu nhau: 15/08/2025
    const startDate = new Date('2025-08-15T00:00:00').getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const diff = now - startDate;

      // Nếu hiện tại chưa đến ngày 15/08/2025, bộ đếm sẽ hiển thị 0
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="bg-gradient-to-br from-red-900 to-black border-4 border-yellow-500 rounded-2xl p-6 shadow-2xl mb-3 min-w-[100px]">
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {String(value).padStart(2, '0')}
          </motion.div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg"
        ></motion.div>
      </div>
      <span
        className="text-yellow-200 text-sm md:text-base uppercase tracking-[0.2em] font-medium"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
      >
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center py-20 px-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-20 h-20 text-red-600 fill-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          </motion.div>

          <h2
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hành Trình Yêu Thương
          </h2>

          <p
            className="text-yellow-100/70 text-lg md:text-xl font-light tracking-wide"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            Chúng ta đã cùng nhau đi qua
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 px-4">
          <TimeUnit value={time.days} label="Ngày" />
          <TimeUnit value={time.hours} label="Giờ" />
          <TimeUnit value={time.minutes} label="Phút" />
          <TimeUnit value={time.seconds} label="Giây" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center"
        >
          <p
            className="text-yellow-200/90 text-xl md:text-2xl italic mb-6 px-4 leading-relaxed"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            "Mỗi giây phút bên em đều là một món quà vô giá"
          </p>
          <div className="text-red-500 text-6xl">❤️</div>
        </motion.div>
      </div>
    </div>
  );
}