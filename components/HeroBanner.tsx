'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: '春泥溫潤・名家紫砂手作展',
    subtitle: '宜興黃龍山原礦老泥・國大師一脈全手工孤品典藏',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1600&auto=format&fit=crop',
    tag: '一物一拍・限時私藏',
    cta: '鑑賞名家紫砂壺'
  },
  {
    id: 2,
    title: '冰透澄澈・緬甸老坑翡翠極品展',
    subtitle: '翡翠公盤標王原石特裁・老坑玻璃種正陽綠傳家寶手鐲',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop',
    tag: 'GIA & 國家權威雙雙認證',
    cta: '探索翡翠臻品'
  },
  {
    id: 3,
    title: '億年淬鍊・緬甸金藍珀光影奇蹟',
    subtitle: '白堊紀自然遺留・暗光幽藍與自然金黃的幻彩共舞',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop',
    tag: '天然原礦無優化',
    cta: '鑑賞天然琥珀'
  }
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[520px] sm:h-[620px] bg-[#1A1918] overflow-hidden text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0"
        >
          {/* 背景大圖遮罩 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1918]/90 via-[#1A1918]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918] via-transparent to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* 文案區 */}
      <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <motion.div
            key={`tag-${slide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C2D19]/90 backdrop-blur-sm text-[#F7F6F2] text-xs tracking-wider rounded-sm font-serif"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C2A675]" />
            <span>{slide.tag}</span>
          </motion.div>

          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-wide text-white drop-shadow-md"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-stone-300 text-sm sm:text-lg font-sans font-light leading-relaxed max-w-xl"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            key={`cta-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4 flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={onExploreClick}
              className="group px-8 py-3.5 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-sm tracking-widest rounded-sm transition-all shadow-lg flex items-center gap-3 border border-[#C2A675]/30"
            >
              <span>{slide.cta}</span>
              <ChevronRight className="w-4 h-4 text-[#C2A675] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#C2A675] font-serif border-l border-stone-700 pl-4 py-1">
              <Sparkles className="w-4 h-4 text-[#C2A675]" />
              <span>線上即時品相高清 360° 預覽</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 輪播切換按鈕指示 */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-3">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all ${
              currentSlide === idx
                ? 'w-10 h-1.5 bg-[#C2A675]'
                : 'w-3 h-1.5 bg-stone-600 hover:bg-stone-400'
            } rounded-full`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
