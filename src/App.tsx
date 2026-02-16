import { useState } from 'react';
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
  const [appState, setAppState] = useState<AppState>('landing');

  const handleStart = () => {
    setAppState('revealing');
  };

  const handleRevealComplete = () => {
    setAppState('main');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <AmbientEffects />

      {appState !== 'landing' && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <LandingPage key="landing" onStart={handleStart} />
        )}

        {appState === 'revealing' && (
          <EnvelopeReveal key="revealing" onComplete={handleRevealComplete} />
        )}

        {appState === 'main' && (
          <div key="main" className="relative">
            <HaiLocGame />
            <AnniversaryCounter />
            <ScrollStory />
            <LiXiGift />

            <footer className="bg-black/80 backdrop-blur-md py-16 text-center border-t border-yellow-500/20">
              <p
                className="text-yellow-400 text-2xl mb-4 tracking-wider"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Bính Ngọ An Yên 2026
              </p>
              <p
                className="text-yellow-100/40 text-sm md:text-base font-light italic"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                Làm với tình yêu của em dành cho Chị
              </p>

              {/* Một biểu tượng nhỏ làm điểm kết thúc đẹp mắt */}
              <div className="mt-8 text-red-600/50 text-xl">🧧</div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;