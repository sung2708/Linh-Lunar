import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Decor - Tối ưu cho cả Mobile */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-yellow-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4 w-full max-w-4xl"
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          // Hạ size chữ trên mobile (text-3xl), tăng line-height và padding-top để không mất dấu
          className="text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 mb-6 md:mb-8 pt-6 leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Chào Nguyễn Diệu Linh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          // Size chữ linh hoạt 1rem (text-base) cho mobile, 1.5rem (text-2xl) cho desktop
          className="text-base md:text-2xl text-yellow-100/90 mb-10 md:mb-12 max-w-2xl mx-auto italic font-light px-2"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          Mở bao lì xì, thấy cả trời xuân.<br className="hidden md:block" />
          Chúc tình mình năm Bính Ngọ mãi bền lâu.
        </motion.p>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8, type: 'spring' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="inline-block cursor-pointer touch-manipulation"
        >
          {/* Bao lì xì nhỏ hơn trên mobile (w-36 h-48) */}
          <div className="relative w-36 h-48 md:w-48 md:h-64 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] border-2 md:border-4 border-yellow-500/50 overflow-hidden group">

            <motion.div
              animate={{
                boxShadow: [
                  'inset 0 0 15px rgba(212, 175, 55, 0.2)',
                  'inset 0 0 35px rgba(212, 175, 55, 0.5)',
                  'inset 0 0 15px rgba(212, 175, 55, 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            ></motion.div>

            <div className="absolute inset-2 border border-yellow-400/20 rounded-lg"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-2">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mx-auto mb-3 md:mb-4" />
              <p
                className="text-yellow-400 text-xl md:text-2xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Lì Xì<br />Đặc Biệt
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-yellow-500/50 mt-10 md:mt-12 text-[10px] md:text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          — Bính Ngọ An Yên —
        </motion.p>
      </motion.div>
    </div>
  );
}