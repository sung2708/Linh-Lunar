import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const storyMoments = [
  {
    id: 1,
    image: "/images/journey-1.jpg",
    title: "Khởi Đầu",
    description: "Ngày đầu tiên gặp nhau, định mệnh đã sắp đặt"
  },
  {
    id: 2,
    image: "/images/journey-2.jpg",
    title: "Những Bước Chân",
    description: "Mỗi bước đi cùng nhau là một kỷ niệm đẹp, lần đầu đi ăn, lần đầu nắm tay, lần đầu của những cái ôm và lần đầu của tình yêu... Tất cả đều là những khoảnh khắc em trân trọng và nhớ mãi"
  },
  {
    id: 3,
    image: "/images/journey-3.jpg",
    title: "Lần đầu của những lần đâu",
    description: "Lần đầu tiên đi chơi cùng nhau, lần đầu tiên em thấy em không tách rời được chị, lần đầu tiên em cảm nhận được tình yêu thật sự, lần đầu chúng ta vượt qua những giới hạn và quấn lấy nhau :( "
  },
  {
    id: 4,
    image: "/images/journey-4.jpg",
    title: "Cùng Nhau",
    description: "Vượt qua mọi thử thách, tay trong tay"
  },
  {
    id: 5,
    image: "/images/journey-5.jpg",
    title: "Tương Lai",
    description: "Hành trình vẫn tiếp tục, mãi bên nhau bây giờ và mãi mãi"
  }
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sử dụng useScroll với cấu hình mượt hơn cho mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Thêm useSpring để các chuyển động mượt mà, không bị khựng trên điện thoại
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-black via-red-950/10 to-black py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Câu Chuyện Của Chúng Ta
        </h2>
        <p className="text-yellow-100/70 text-base md:text-xl font-light px-4"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          Những khoảnh khắc đáng nhớ cùng Diệu Linh
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-24 md:space-y-40">
        {storyMoments.map((moment, index) => {
          const isEven = index % 2 === 0;

          // Giảm biên độ di chuyển y trên mobile (từ 100 xuống 30) để tránh lệch bố cục
          const y = useTransform(smoothProgress, [0, 1], [30 * index, -30 * index]);

          return (
            <div
              key={moment.id}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full md:w-1/2"
                style={{ y }} // Chỉ áp dụng parallax nhẹ cho ảnh
              >
                <div className="relative group px-2 md:px-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-red-600/40 to-yellow-600/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative">
                    <img
                      src={moment.image}
                      alt={moment.title}
                      // Chiều cao ảnh linh hoạt: h-[250px] cho mobile, h-[400px] cho desktop
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl shadow-2xl border border-yellow-500/30"
                      loading="lazy"
                    />
                    <motion.div
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute inset-0 bg-gradient-to-tr from-yellow-400/5 to-transparent rounded-2xl"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}
              >
                <div className="bg-gradient-to-br from-red-950/30 to-black/80 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-yellow-500/10 shadow-xl">
                  <h3
                    className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4 md:mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {moment.title}
                  </h3>

                  <p className="text-yellow-100/80 text-base md:text-xl font-light italic leading-relaxed"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    "{moment.description}"
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className={`h-[1px] bg-gradient-to-r ${isEven ? 'from-yellow-400 to-transparent' : 'from-transparent to-yellow-400'} mt-6 md:mt-8 mx-auto ${isEven ? 'md:ml-0' : 'md:mr-0'} opacity-40`}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}