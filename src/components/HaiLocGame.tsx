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

  const envelopePositions = [
    { top: '15%', left: '20%' },
    { top: '25%', right: '15%' },
    { top: '40%', left: '30%' },
    { top: '50%', right: '25%' },
    { top: '65%', left: '40%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/30 to-black py-20 px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"
          // Thay đổi sang Playfair Display
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Hái Lộc Đầu Xuân
        </h2>
        <p className="text-yellow-200/80 text-lg font-light"
          // Thay đổi sang Be Vietnam Pro
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Chạm vào các bao lì xì trên cây mai để khám phá những kỷ niệm đẹp
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto h-[800px]">
        {/* SVG Tree Trunk */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            d="M200,700 Q180,600 200,500 Q220,400 200,300 Q180,200 200,100"
            fill="none"
            stroke="#92400e"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {[...Array(30)].map((_, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            >
              <circle
                cx={200 + (Math.random() - 0.5) * 200}
                cy={100 + i * 25}
                r="8"
                fill="#fbbf24"
                opacity="0.8"
              />
              <circle
                cx={200 + (Math.random() - 0.5) * 200 + 5}
                cy={100 + i * 25 + 5}
                r="6"
                fill="#fcd34d"
                opacity="0.6"
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
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEnvelopeClick(memory.id)}
            className="absolute cursor-pointer"
            style={envelopePositions[index]}
          >
            <div className={`w-20 h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl border-2 border-yellow-500 flex items-center justify-center transition-all ${openedEnvelopes.includes(memory.id) ? 'opacity-50' : ''
              }`}>
              <motion.div
                animate={{
                  boxShadow: openedEnvelopes.includes(memory.id)
                    ? 'none'
                    : [
                      '0 0 10px rgba(212, 175, 55, 0.5)',
                      '0 0 20px rgba(212, 175, 55, 1)',
                      '0 0 10px rgba(212, 175, 55, 0.5)',
                    ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl font-bold text-yellow-400"
                // Dùng Playfair cho chữ Hán/Ký tự đặc biệt
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {openedEnvelopes.includes(memory.id) ? '✓' : 'Lì Xì'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-yellow-400 text-lg tracking-widest"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Đã mở: {openedEnvelopes.length}/5 lì xì
        </p>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <div className="bg-gradient-to-br from-red-900 via-red-800 to-black p-8 rounded-2xl border-4 border-yellow-500 shadow-2xl">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="mb-6 overflow-hidden rounded-lg border-4 border-yellow-600 shadow-xl">
                  <img
                    src={selectedMemory.imageUrl}
                    alt="Memory"
                    className="w-full h-80 object-cover"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-yellow-100 text-xl text-center italic leading-relaxed"
                  // Be Vietnam Pro cho phần caption dài
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