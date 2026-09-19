'use client';

import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1918] text-white pt-16 pb-12 border-t border-[#C2A675]/20 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* 品牌區 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="oriental-seal text-base py-0.5 px-2 bg-white border-[#8C2D19] text-[#8C2D19]">
                文人藏寶
              </div>
              <span className="text-xl font-bold tracking-widest text-[#F7F6F2]">
                雅集典藏
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              專門銷售高單價宜興紫砂壺、緬甸老坑翡翠與天然琥珀之現代典藏藝品館。秉持文人雅致氣息，提供一物一拍孤品鑑定與專車保運服務。
            </p>
          </div>

          {/* 三大主題 */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[#C2A675] font-bold text-sm">雅集特展分類</h4>
            <ul className="space-y-2 text-stone-300 font-sans">
              <li><a href="#" className="hover:text-[#C2A675]">宜興黃龍山原礦紫砂壺</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">緬甸老坑玻璃種/冰種翡翠</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">天然緬甸金藍珀與血珀</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">名家全手工孤品拍賣專區</a></li>
            </ul>
          </div>

          {/* 藏家服務 */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[#C2A675] font-bold text-sm">尊榮藏家服務</h4>
            <ul className="space-y-2 text-stone-300 font-sans">
              <li><a href="#" className="hover:text-[#C2A675]">權威防偽證書雙重查驗</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">LINE 專人一對一品相品評</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">恆溫防震專車全程保價遞送</a></li>
              <li><a href="#" className="hover:text-[#C2A675]">開壺、養壺與保養專業建議</a></li>
            </ul>
          </div>

          {/* 門市與聯絡 */}
          <div className="space-y-3 text-xs font-sans text-stone-300">
            <h4 className="text-[#C2A675] font-serif font-bold text-sm">實體雅集旗艦展示館</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#8C2D19] shrink-0 mt-0.5" />
              <span>台北市大安區仁愛路四段 88 號典藏大樓 12 樓</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8C2D19] shrink-0" />
              <span>預約專線：(02) 2700-8888</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#8C2D19] shrink-0" />
              <span>vip@oriental-art-gallery.tw</span>
            </div>
          </div>
        </div>

        {/* 底部版權 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <p>© 2026 雅集典藏 Oriental Luxury Gallery. 版權所有，轉載必究。</p>
          <div className="flex items-center gap-4 font-serif">
            <span>隱私權條款</span>
            <span>服務條款</span>
            <span>防偽認證聲明</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
