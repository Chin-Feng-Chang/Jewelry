'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Users, Bell, ShoppingBag, Eye, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types/product';

interface FBLiveSectionProps {
  featuredProduct: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FBLiveSection: React.FC<FBLiveSectionProps> = ({
  featuredProduct,
  onAddToCart,
  onQuickView
}) => {
  const [isLive, setIsLive] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  // 倒數計時模擬 (針對預告狀態)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="live-section" className="py-16 bg-[#1A1918] text-white relative overflow-hidden border-y border-[#C2A675]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頂部控制標題與切換 Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-3">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8C2D19] text-white animate-pulse font-serif">
                  <Radio className="w-3.5 h-3.5" /> LIVE FB 直播鑑賞中
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-700 text-[#C2A675] font-serif">
                  <Calendar className="w-3.5 h-3.5" /> 直播特展預告
                </span>
              )}
              <span className="text-xs text-stone-400 font-sans">
                每週二、六晚間 20:00 專人線上講解孤品
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F6F2] mt-2">
              【FB 直播專區】名家紫砂與冰種翡翠 Live 典藏拍賣
            </h2>
          </div>

          {/* 狀態切換開關 (供藏家體驗兩種模式) */}
          <div className="flex items-center bg-stone-900 p-1.5 rounded-lg border border-stone-800 self-start md:self-auto">
            <button
              onClick={() => setIsLive(true)}
              className={`px-4 py-1.5 rounded-md text-xs font-serif transition-colors ${
                isLive ? 'bg-[#8C2D19] text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              狀態一：直播中
            </button>
            <button
              onClick={() => setIsLive(false)}
              className={`px-4 py-1.5 rounded-md text-xs font-serif transition-colors ${
                !isLive ? 'bg-[#C2A675] text-[#1A1918] font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              狀態二：預告倒數
            </button>
          </div>
        </div>

        {/* 狀態內容展演區 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 左側直播播放器視窗 (8 欄) */}
          <div className="lg:col-span-8 bg-stone-900 rounded-lg overflow-hidden border border-stone-800 flex flex-col shadow-2xl relative">
            {isLive ? (
              <div className="relative aspect-video w-full bg-black">
                {/* 模擬 嵌入式 FB / Stream 播放器 */}
                <iframe
                  className="w-full h-full object-cover opacity-90"
                  src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&controls=1&loop=1"
                  title="FB Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-sans text-white border border-white/10">
                  <Users className="w-3.5 h-3.5 text-[#8C2D19]" />
                  <span>1,428 人線上共鑑</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 rounded-lg">
                  <p className="text-sm font-serif text-[#C2A675] font-bold">
                    [即時直播中] 著名茶道名家沈秋遠老師 現場開壺示範
                  </p>
                  <p className="text-xs text-stone-300 font-sans mt-1">
                    當前展示：顧景舟款・原礦老紫泥仿古壺 (#ZS-2026-088)
                  </p>
                </div>
              </div>
            ) : (
              /* 預告狀態 UI */
              <div className="p-8 sm:p-12 flex flex-col justify-center items-center text-center h-full min-h-[380px] bg-gradient-to-b from-stone-900 via-[#1A1918] to-stone-950">
                <div className="oriental-seal mb-4 border-[#C2A675] text-[#C2A675]">
                  尊榮特展
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F6F2] font-bold">
                  【極致玻璃種・緬甸帕敢翡翠私密專場】
                </h3>
                <p className="text-sm text-stone-400 font-sans mt-2 max-w-lg">
                  特邀揭陽大師親臨現場解說，展示 2026 年最新公盤標王高貨翡翠孤品。
                </p>

                {/* 倒數計時器 */}
                <div className="my-8 flex items-center justify-center gap-4 text-center">
                  <div className="bg-stone-800/80 border border-stone-700/60 p-3 sm:p-4 rounded-lg min-w-[70px]">
                    <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#C2A675]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-stone-400 tracking-wider">時</span>
                  </div>
                  <span className="text-2xl font-serif text-stone-500">:</span>
                  <div className="bg-stone-800/80 border border-stone-700/60 p-3 sm:p-4 rounded-lg min-w-[70px]">
                    <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#C2A675]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-stone-400 tracking-wider">分</span>
                  </div>
                  <span className="text-2xl font-serif text-stone-500">:</span>
                  <div className="bg-stone-800/80 border border-stone-700/60 p-3 sm:p-4 rounded-lg min-w-[70px]">
                    <span className="block text-2xl sm:text-4xl font-serif font-bold text-[#8C2D19]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-stone-400 tracking-wider">秒</span>
                  </div>
                </div>

                {/* 預約開播提醒按鈕 */}
                <button
                  onClick={() => setSubscribed(!subscribed)}
                  className={`px-8 py-3 rounded-md font-serif text-sm tracking-wider flex items-center gap-2 transition-all ${
                    subscribed
                      ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40'
                      : 'bg-[#8C2D19] hover:bg-[#A3341D] text-white shadow-lg border border-[#C2A675]/40'
                  }`}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>已成功設定 LINE & FB 開播通知</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 text-[#C2A675]" />
                      <span>預約 FB/LINE 開播簡訊通知</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 右側本場主推商品 (4 欄) */}
          <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs font-serif text-[#C2A675] tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 本場直播主推大作
                </span>
                <span className="gold-badge">獨家一物一拍</span>
              </div>

              <div className="mt-4 group relative rounded-md overflow-hidden bg-stone-800">
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[#C2A675] text-[10px] px-2 py-0.5 rounded font-mono">
                  編號 {featuredProduct.code}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-serif text-lg text-white font-bold">
                  {featuredProduct.name}
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1 line-clamp-2">
                  {featuredProduct.description}
                </p>

                <div className="mt-3 bg-stone-800/60 p-3 rounded text-xs space-y-1 text-stone-300 font-sans border border-stone-700/50">
                  <div><strong>泥料產地：</strong>{featuredProduct.specs.origin}</div>
                  <div><strong>規格容量：</strong>{featuredProduct.specs.dimensions}</div>
                  <div><strong>名家作工：</strong>{featuredProduct.specs.artist}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-stone-400 font-serif">直播專屬典藏價</span>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-[#C2A675]">
                    NT$ {featuredProduct.price.toLocaleString()}
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="block text-xs text-stone-500 line-through">
                      原價 NT$ {featuredProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onQuickView(featuredProduct)}
                  className="px-3 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-serif text-xs rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>細節鑑賞</span>
                </button>

                <button
                  onClick={() => onAddToCart(featuredProduct)}
                  className="px-3 py-2.5 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-xs rounded transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C2A675]" />
                  <span>搶先認購孤品</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
