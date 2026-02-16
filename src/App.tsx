/* import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import EnvelopeReveal from './components/EnvelopeReveal';
import HaiLocGame from './components/HaiLocGame';
import AnniversaryCounter from './components/AnniversaryCounter';
import ScrollStory from './components/ScrollStory';
import LiXiGift from './components/LiXiGift';
import AmbientEffects from './components/AmbientEffects';
import MusicPlayer from './components/MusicPlayer';

type AppState = 'landing' | 'revealing' | 'main';

/**
 * Đảm bảo bạn đã thêm dòng này vào file index.html để font hiển thị đúng:
 * <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
 */

function App() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
      {/* Container chính: Căn giữa màn hình */}
      <div className="relative max-w-2xl w-full flex flex-col items-center">

        {/* Khung ảnh */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-600/50 shadow-[0_0_30px_rgba(202,138,4,0.3)] bg-black/20 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
          <a
            href="https://lixi.momo.vn/lixi/km2OrN6OyaODpeA"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/images/lixi.jpg"
              alt="Special Memory"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </a>
        </div>

        {/* Dòng chữ :(( nằm dưới tấm ảnh */}
        <div className="mt-6 text-center">
          <p className="text-yellow-600 text-4xl md:text-5xl font-serif tracking-widest animate-pulse">
            :((
          </p>
          <span className="text-black-600/40 text-xs uppercase tracking-[0.2em] mt-2 block">
            Tap image to open
          </span>
        </div>

      </div>
    </div>
  );
}

export default App;