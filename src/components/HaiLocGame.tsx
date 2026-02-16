import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Memory {
  id: number;
  caption: string;
  imageUrl: string;
}

const memories: Memory[] = [
  { id: 1, caption: "Lần đầu đi chung với nhau, có những thẹn thùng :3", imageUrl: "/images/lixi-1.jpg" },
  { id: 2, caption: "Những buổi chiều cùng nhau đi dạo, mỗi bước chân là một kỷ niệm", imageUrl: "/images/lixi-2.jpg" },
  { id: 3, caption: "Những lần nắm tay, mỗi giây phút đều là một khoảnh khắc đáng nhớ", imageUrl: "/images/lixi-3.jpg" },
  { id: 4, caption: "Những lúc mệt mõi, em sẽ luôn là bờ vai cho chị", imageUrl: "/images/lixi-4.jpg" },
  { id: 5, caption: "Những giây phút vô lo, vô nghĩ, chỉ cần bên chị là đủ", imageUrl: "/images/lixi-5.jpg" }
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
    { top: '12%', left: '15%' },
    { top: '25%', right: '10%' },
    { top: '42%', left: '20%' },
    { top: '58%', right: '15%' },
    { top: '75%', left: '25%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/30 to-black py-10 md:py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-20 relative"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Hái Lộc Đầu Xuân
        </h2>
        <p className="text-yellow-200/80 text-sm md:text-lg font-light max-w-xs md:max-w-md mx-auto"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Gói ghém tình yêu vào những lộc xuân, cùng ANH mở ra những thước phim ngọt ngào nhất của chúng mình.
        </p>
      </motion.div>

      {/* Vùng chứa cây mai: Ép chiều cao cố định để không bị ẩn trên mobile */}
      <div className="relative max-w-lg mx-auto h-[550px] md:h-[750px] flex justify-center items-center">

        {/* SVG Thân Cây Mai */}
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M200,650 Q180,500 200,350 Q220,200 200,50"
            fill="none"
            stroke="#92400e"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Render Hoa Mai dọc theo thân cây */}
          {[...Array(25)].map((_, i) => {
            const xPos = 200 + Math.sin(i * 1.5) * (30 + i * 2);
            const yPos = 620 - (i * 22);
            return (
              <motion.g
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.03, duration: 0.5 }}
              >
                <circle cx={xPos} cy={yPos} r={i % 3 === 0 ? "6" : "4"} fill="#fbbf24" />
                <circle cx={xPos} cy={yPos} r="1.5" fill="#f59e0b" />
              </motion.g>
            );
          })}
        </svg>

        {/* Lớp Bao Lì Xì */}
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1 + index * 0.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEnvelopeClick(memory.id)}
            className="absolute cursor-pointer z-10"
            style={envelopePositions[index]}
          >
            <div className={`w-14 h-20 md:w-20 md:h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl border-2 border-yellow-500 flex items-center justify-center transition-all ${openedEnvelopes.includes(memory.id) ? 'opacity-40 grayscale' : 'hover:scale-110'
              }`}>
              <div className="text-[10px] md:text-sm font-bold text-yellow-400 font-serif">
                {openedEnvelopes.includes(memory.id) ? '✓' : 'LÌ XÌ'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10 relative z-20">
        <p className="text-yellow-400 text-xs md:text-base tracking-[0.2em] uppercase font-medium">
          Đã mở: {openedEnvelopes.length} / 5
        </p>
      </div>

      {/* Modal hiển thị kỷ niệm */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm md:max-w-2xl w-full bg-gradient-to-br from-red-950 to-black p-5 md:p-8 rounded-2xl border-2 border-yellow-500 shadow-2xl"
            >
              <button onClick={() => setSelectedMemory(null)} className="absolute -top-12 right-0 text-yellow-400">
                <X className="w-8 h-8" />
              </button>
              <div className="mb-4 overflow-hidden rounded-lg border-2 border-yellow-600">
                <img src={selectedMemory.imageUrl} alt="Kỷ niệm" className="w-full h-60 md:h-80 object-cover" />
              </div>
              <p className="text-yellow-100 text-lg md:text-xl text-center italic font-light">
                "{selectedMemory.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}