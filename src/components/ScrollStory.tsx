import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const storyMoments = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1024998/pexels-photo-1024998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Khởi Đầu",
    description: "Ngày đầu tiên gặp nhau, định mệnh đã sắp đặt"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Những Bước Chân",
    description: "Mỗi bước đi cùng nhau là một kỷ niệm đẹp"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Nụ Cười",
    description: "Nụ cười em là ánh dương trong cuộc đời anh"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Cùng Nhau",
    description: "Vượt qua mọi thử thách, tay trong tay"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Tương Lai",
    description: "Hành trình vẫn tiếp tục, mãi bên nhau"
  }
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-black via-red-950/10 to-black py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6"
          // Thay đổi sang Playfair Display cho tiêu đề chương
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Câu Chuyện Của Chúng Ta
        </h2>
        <p className="text-yellow-100/70 text-lg md:text-xl font-light"
          // Thay đổi sang Be Vietnam Pro cho lời dẫn
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Những khoảnh khắc đáng nhớ cùng Diệu Linh
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-32">
        {storyMoments.map((moment, index) => {
          const isEven = index % 2 === 0;
          const y = useTransform(scrollYProgress, [0, 1], [100 * index, -100 * index]);

          return (
            <motion.div
              key={moment.id}
              style={{ y }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                className="w-full md:w-1/2"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-600 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative">
                    <img
                      src={moment.image}
                      alt={moment.title}
                      className="w-full h-[400px] object-cover rounded-2xl shadow-2xl border-2 border-yellow-500/50"
                    />
                    <motion.div
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-2xl"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
                className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}
              >
                <div className="bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-md p-10 rounded-3xl border border-yellow-500/20 shadow-xl">
                  <motion.h3
                    whileHover={{ x: isEven ? 10 : -10 }}
                    className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6"
                    // Font có chân cho tiêu đề nhỏ
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {moment.title}
                  </motion.h3>

                  <p className="text-yellow-100/80 text-lg md:text-xl font-light italic leading-relaxed"
                    // Font không chân cho nội dung mô tả
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    "{moment.description}"
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-[1px] bg-gradient-to-r ${isEven ? 'from-yellow-400 to-transparent' : 'from-transparent to-yellow-400'} mt-8 opacity-50`}
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}