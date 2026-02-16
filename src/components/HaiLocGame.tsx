import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Memory {
  id: number;
  caption: string;
  imageUrl: string;
}

const memories: Memory[] = [
  {
    id: 1,
    caption: "Ngày đầu tiên anh gặp em, ánh mắt em đã làm tim anh rung động",
    imageUrl: "https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    caption: "Những buổi chiều cùng nhau đi dạo, mỗi bước chân là một kỷ niệm",
    imageUrl: "https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    caption: "Nụ cười em tỏa sáng như ánh dương đầu xuân",
    imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    caption: "Cùng nhau vượt qua mọi thử thách, tình yêu mỗi ngày một lớn",
    imageUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    caption: "Mãi mãi bên nhau, đến tận cuối con đường",
    imageUrl: "https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function HaiLocGame() {
  const [openedEnvelopes, setOpenedEnvelopes] = useState<number[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleEnvelopeClick = (id: number) => {
    if (!openedEnvelopes.includes(id)) {
      setOpenedEnvelopes([...openedEnvelopes, id]);
      const memory = memories.find(m => m.id === id);
      if (memory) setSelectedMemory(memory);
    }
  };

  // Tọa độ đã tối ưu cho mobile (dùng % để co giãn tốt hơn)
  const envelopePositions = [
    { top: '10%', left: '15%' },
    { top: '22%', right: '10%' },
    { top: '38%', left: '20%' },
    { top: '55%', right: '15%' },
    { top: '70%', left: '25%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/30 to-black py-10 md:py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8 md:mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Hái Lộc Đầu Xuân
        </h2>
        <p className="text-yellow-200/80 text-base md:text-lg font-light max-w-md mx-auto"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Chạm vào bao lì xì trên cây để khám phá kỷ niệm
        </p>
      </motion.div>

      {/* Container của cây: Tự co giãn theo màn hình */}
      <div className="relative max-w-lg mx-auto h-[500px] md:h-[700px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid meet">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            d="M200,650 Q180,500 200,350 Q220,200 200,50"
            fill="none"
            stroke="#92400e"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {[...Array(20)].map((_, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            >
              <circle
                cx={200 + (Math.sin(i) * 120)}
                cy={100 + i * 25}
                r="6"
                fill="#fbbf24"
                opacity="0.8"
              />
            </motion.g>
          ))}
        </svg>

        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1 + index * 0.2, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEnvelopeClick(memory.id)}
            className="absolute cursor-pointer z-10"
            style={envelopePositions[index]}
          >
            {/* Kích thước bao lì xì nhỏ hơn trên mobile: w-14 h-20 */}
            <div className={`w-14 h-20 md:w-20 md:h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl border-2 border-yellow-500 flex items-center justify-center transition-all ${
                openedEnvelopes.includes(memory.id) ? 'opacity-40 grayscale-[0.5]' : ''
              }`}>
              <motion.div
                animate={!openedEnvelopes.includes(memory.id) ? {
                  boxShadow: [
                    '0 0 5px rgba(212, 175, 55, 0.5)',
                    '0 0 15px rgba(212, 175, 55, 1)',
                    '0 0 5px rgba(212, 175, 55, 0.5)',
                  ],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs md:text-lg font-bold text-yellow-400 text-center px-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {openedEnvelopes.includes(memory.id) ? '✓' : 'Lì Xì'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-yellow-400 text-sm md:text-lg tracking-widest font-medium"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          ĐÃ MỞ: {openedEnvelopes.length}/5
        </p>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm md:max-w-2xl w-full"
            >
              <div className="bg-gradient-to-br from-red-950 via-red-900 to-black p-5 md:p-8 rounded-2xl border-2 md:border-4 border-yellow-500 shadow-2xl">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute -top-12 right-0 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <X className="w-10 h-10" />
                </button>

                <div className="mb-4 md:mb-6 overflow-hidden rounded-lg border-2 border-yellow-600 shadow-xl">
                  <img
                    src={selectedMemory.imageUrl}
                    alt="Memory"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-100 text-lg md:text-xl text-center italic leading-relaxed"
                  style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  "{selectedMemory.caption}"
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}