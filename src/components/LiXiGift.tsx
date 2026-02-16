import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';

export default function LiXiGift() {
  const [showGift, setShowGift] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);

  const handleStartPress = () => {
    setPressProgress(0);
    const interval = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowLetter(true);
          return 100;
        }
        return prev + 2.5; // Tăng tốc độ mở lên một chút cho mobile (khoảng 1.2s)
      });
    }, 30);
    setPressTimer(interval);
  };

  const handleEndPress = () => {
    if (pressTimer) {
      clearInterval(pressTimer);
      setPressTimer(null);
    }
    if (pressProgress < 100) {
      setPressProgress(0);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-black via-red-950/20 to-black py-12 md:py-20 px-4 md:px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Lì Xì Đặc Biệt
          </h2>
          <p className="text-yellow-200/80 text-base md:text-lg mb-8 md:mb-12 font-light px-4"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Một món quà dành riêng cho em
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGift(true)}
            className="bg-gradient-to-r from-red-600 to-red-800 text-yellow-400 px-8 py-4 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold shadow-2xl border-2 md:border-4 border-yellow-500 transition-all flex items-center gap-3 mx-auto active:brightness-125"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            <Gift className="w-6 h-6 md:w-8 md:h-8" />
            Nhận Lì Xì
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showGift && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md"
              onClick={() => {
                if (!showLetter) {
                  setShowGift(false);
                  setPressProgress(0);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full"
              >
                {!showLetter ? (
                  <div className="bg-gradient-to-br from-red-950 via-red-900 to-black p-5 md:p-8 rounded-2xl border-2 md:border-4 border-yellow-500 shadow-2xl">
                    <button
                      onClick={() => setShowGift(false)}
                      className="absolute top-2 right-2 md:top-4 md:right-4 text-yellow-400/70 p-2 z-10"
                    >
                      <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <div className="relative overflow-hidden rounded-xl border-2 border-yellow-600 shadow-xl mb-6 group">
                      {/* Bao bọc toàn bộ vùng ảnh bằng link MoMo */}
                      <a
                        href="https://lixi.momo.vn/lixi/km2OrN6OyaODpeA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative cursor-pointer"
                      >
                        <img
                          src="/images/lixi.jpg"
                          alt="Special Memory"
                          className="w-full h-64 md:h-96 object-contain bg-black/20 transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Lớp phủ gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                        {/* Nút bấm nhảy nhảy - Hiển thị trên cả Desktop và Mobile */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
                          <motion.div
                            animate={{
                              y: [0, -12, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="bg-[#A50064] text-white px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(165,0,100,0.5)] border border-pink-400 flex items-center gap-2 whitespace-nowrap"
                          >
                            <span className="text-xl">🧧</span>
                            <span className="text-sm md:text-base">NHẬN LÌ XÌ MOMO</span>
                          </motion.div>
                        </div>
                      </a>
                    </div>
                    <div className="relative">
                      <motion.button
                        onMouseDown={handleStartPress}
                        onMouseUp={handleEndPress}
                        onMouseLeave={handleEndPress}
                        onTouchStart={handleStartPress}
                        onTouchEnd={handleEndPress}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl text-lg font-bold shadow-xl relative overflow-hidden select-none active:scale-95 transition-transform"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-yellow-300"
                          style={{ width: `${pressProgress}%`, originX: 0 }}
                          transition={{ duration: 0.1 }}
                        ></motion.div>
                        <span className="relative z-10">
                          {pressProgress === 0 ? 'Giữ để xem thư tình' : 'Đang mở thư...'}
                        </span>
                      </motion.button>
                      <p className="text-yellow-300/60 text-xs md:text-sm mt-3 text-center" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        Chạm và giữ nút để khám phá bí mật
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-red-950 via-red-900 to-black p-6 md:p-10 rounded-2xl border-2 md:border-4 border-yellow-500 shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-hide">
                    <button
                      onClick={() => {
                        setShowGift(false);
                        setShowLetter(false);
                        setPressProgress(0);
                      }}
                      className="absolute top-3 right-3 text-yellow-400 p-2 z-20"
                    >
                      <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 text-yellow-100/90"
                    >
                      <h3 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6 text-center leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Gửi Diệu Linh của em!
                      </h3>

                      <div className="space-y-4 md:space-y-6 text-base md:text-xl leading-relaxed font-light text-justify"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <p className="italic text-yellow-400/80">Năm mới lại đến</p>
                        <p>Em muốn gửi đến chị những lời chúc tốt đẹp nhất. Qua bao ngày tháng bên nhau, chị đã là nguồn động lực, là ánh sáng dẫn đường cho em.</p>
                        <p>Năm mới này, em chúc chị luôn rạng rỡ như những cánh hoa mai đầu xuân, mạnh mẽ như chú ngựa Bính Ngọ phi nước đại. Chúc chị luôn vui vẻ, khỏe mạnh và đạt được mọi ước mơ, sẽ bớt ôm đồm, ích kỷ hơn một chút nhé, sẽ luôn là người em yêu thương và trân trọng.</p>

                        <div className="py-6 text-center">
                          <p className="text-2xl md:text-4xl text-yellow-400 font-bold"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            ANH YÊU EM NHIỀU LẮM ❤️
                          </p>
                        </div>

                        <p className="text-right italic text-yellow-500 mt-4 text-sm md:text-base">
                          — Người luôn yêu chị :3 —
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}