import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';

export default function LiXiGift() {
  const [showGift, setShowGift] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);

  const handleMouseDown = () => {
    setPressProgress(0);
    const interval = setInterval(() => {
      setPressProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowLetter(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    setPressTimer(interval);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearInterval(pressTimer);
      setPressTimer(null);
    }
    if (pressProgress < 100) {
      setPressProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8"
            // Đổi sang Playfair Display
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Lì Xì Đặc Biệt
          </h2>
          <p className="text-yellow-200/80 text-lg mb-12 font-light"
            // Đổi sang Be Vietnam Pro
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Một món quà dành riêng cho em
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGift(true)}
            className="bg-gradient-to-r from-red-600 to-red-800 text-yellow-400 px-12 py-6 rounded-full text-xl font-bold shadow-2xl border-4 border-yellow-500 hover:from-red-700 hover:to-red-900 transition-all flex items-center gap-4 mx-auto"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
          >
            <Gift className="w-8 h-8" />
            Nhận Lì Xì
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showGift && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 backdrop-blur-md"
              onClick={() => {
                if (!showLetter) {
                  setShowGift(false);
                  setPressProgress(0);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.5, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: 180 }}
                transition={{ type: 'spring', duration: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full"
              >
                {!showLetter ? (
                  <div className="bg-gradient-to-br from-red-900 via-red-800 to-black p-8 rounded-2xl border-4 border-yellow-500 shadow-2xl">
                    <button
                      onClick={() => setShowGift(false)}
                      className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors z-10"
                    >
                      <X className="w-8 h-8" />
                    </button>

                    <div className="relative overflow-hidden rounded-lg border-4 border-yellow-600 shadow-xl mb-6">
                      <img
                        src="https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Special Memory"
                        className="w-full h-96 object-cover"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-t from-yellow-400/30 to-transparent"
                      ></motion.div>
                    </div>

                    <div className="relative">
                      <motion.button
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchEnd={handleMouseUp}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full text-lg font-bold shadow-xl relative overflow-hidden"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-yellow-300"
                          style={{ width: `${pressProgress}%` }}
                          transition={{ duration: 0.1 }}
                        ></motion.div>
                        <span className="relative z-10">
                          {pressProgress === 0 ? 'Giữ để xem thư tình' : 'Đang mở thư...'}
                        </span>
                      </motion.button>
                      <p className="text-yellow-300/60 text-sm mt-3" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        Giữ nút trong vài giây để mở thư
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-red-950 via-red-900 to-black p-10 rounded-3xl border-4 border-yellow-500 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <button
                      onClick={() => {
                        setShowGift(false);
                        setShowLetter(false);
                        setPressProgress(0);
                      }}
                      className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors z-10"
                    >
                      <X className="w-8 h-8" />
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h3 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-8 text-center"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Gửi Diệu Linh Yêu Dấu
                      </h3>

                      <div className="space-y-6 text-yellow-100/90 text-lg md:text-xl leading-relaxed font-light"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <p className="italic text-yellow-400/80">
                          Năm Bính Ngọ 2026 đã đến,
                        </p>
                        <p>
                          Anh muốn gửi đến em những lời chúc tốt đẹp nhất. Qua bao ngày tháng bên nhau,
                          em đã là nguồn động lực, là ánh sáng dẫn đường cho anh. Mỗi nụ cười, mỗi cử chỉ
                          của em đều khiến cuộc sống của anh thêm ý nghĩa.
                        </p>
                        <p>
                          Năm mới này, anh chúc em luôn rạng rỡ như những cánh hoa mai đầu xuân,
                          mạnh mẽ như chú ngựa Bính Ngọ phi nước đại. Chúc em luôn vui vẻ, khỏe mạnh,
                          và đạt được mọi ước mơ trong trái tim.
                        </p>
                        <p>
                          Cảm ơn em đã luôn bên anh, đã cho anh những kỷ niệm đẹp nhất.
                          Anh hứa sẽ mãi yêu em, mãi trân trọng em, và sẽ luôn là chỗ dựa vững chắc
                          cho em trong mọi hoàn cảnh.
                        </p>

                        <div className="py-8 text-center">
                          <p className="text-3xl md:text-4xl text-yellow-400 font-bold"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            Yêu em nhiều lắm! ❤️
                          </p>
                        </div>

                        <p className="text-right italic text-yellow-500 mt-8 font-medium">
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