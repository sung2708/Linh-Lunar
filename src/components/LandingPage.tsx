import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

/**
 * Lưu ý: Để font hiển thị, hãy đảm bảo bạn đã thêm dòng này vào file index.html hoặc CSS:
 * @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
 */

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-6"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 mb-8 p-4"
          // Đổi sang font Playfair Display cho tiêu đề sang trọng
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Chào Nguyễn Diệu Linh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xl md:text-2xl text-yellow-100/90 mb-12 max-w-2xl mx-auto italic font-light"
          // Đổi sang font Be Vietnam Pro để lời chúc không bao giờ lỗi dấu
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
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="inline-block cursor-pointer"
        >
          <div className="relative w-48 h-64 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] border-4 border-yellow-500/50 overflow-hidden group">
            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  'inset 0 0 20px rgba(212, 175, 55, 0.2)',
                  'inset 0 0 40px rgba(212, 175, 55, 0.5)',
                  'inset 0 0 20px rgba(212, 175, 55, 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            ></motion.div>

            <div className="absolute inset-3 border border-yellow-400/30 rounded-md"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <p
                className="text-yellow-400 text-2xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Lì Xì<br />Đặc Biệt
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-yellow-500/50 mt-12 text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          — Bính Ngọ An Yên —
        </motion.p>
      </motion.div>
    </div>
  );
}