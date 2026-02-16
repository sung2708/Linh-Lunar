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

                    <div className="relative overflow-hidden rounded-xl border-2 border-yellow-600 shadow-xl mb-6">
                      <img
                        src="https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Special Memory"
                        className="w-full h-64 md:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
                        Gửi Diệu Linh Yêu Dấu
                      </h3>

                      <div className="space-y-4 md:space-y-6 text-base md:text-xl leading-relaxed font-light text-justify"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <p className="italic text-yellow-400/80">Năm Bính Ngọ 2026 đã đến,</p>
                        <p>Anh muốn gửi đến em những lời chúc tốt đẹp nhất. Qua bao ngày tháng bên nhau, em đã là nguồn động lực, là ánh sáng dẫn đường cho anh.</p>
                        <p>Năm mới này, anh chúc em luôn rạng rỡ như những cánh hoa mai đầu xuân, mạnh mẽ như chú ngựa Bính Ngọ phi nước đại. Chúc em luôn vui vẻ, khỏe mạnh và đạt được mọi ước mơ.</p>

                        <div className="py-6 text-center">
                          <p className="text-2xl md:text-4xl text-yellow-400 font-bold"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            Yêu em nhiều lắm! ❤️
                          </p>
                        </div>

                        <p className="text-right italic text-yellow-500 mt-4 text-sm md:text-base">
                          — Người luôn yêu em —
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