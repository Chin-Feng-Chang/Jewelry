'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (catId: string) => void;
}

const CATEGORIES = [
  {
    id: 'zisha',
    title: '宜興紫砂',
    english: 'Yixing Zisha Teapots',
    subtitle: '黃龍山老泥・名家全手工拍打壺',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop',
    count: '38 件傳世孤品'
  },
  {
    id: 'jade',
    title: '緬甸翡翠',
    english: 'Burmese Imperial Jade',
    subtitle: '老坑玻璃種・正陽綠大師雕琢佩飾',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
    count: '24 件尊榮寶藏'
  },
  {
    id: 'amber',
    title: '天然琥珀',
    english: 'Natural Amber & Burmite',
    subtitle: '億年金藍珀・波羅的海自然血珀',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    count: '19 件奇蹟遺產'
  }
];

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="oriental-seal font-serif mb-3">三大雅集主題</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#262524]">
            精選東方藝術品分類
          </h2>
          <p className="text-sm text-[#73716B] font-sans mt-3">
            靜心感受千百年歲月淬鍊與文人匠心，每一件皆具備一物一拍孤品鑑定證書。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-oriental hover:shadow-oriental-hover transition-all duration-500 border border-stone-200"
            >
              {/* 背景圖 */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/40 to-transparent group-hover:from-[#1A1918]/95 transition-colors" />

              {/* 頂部標籤 */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <span className="bg-white/90 backdrop-blur-sm text-[#1A1918] text-xs font-serif px-3 py-1 rounded-sm shadow-sm">
                  {cat.count}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#8C2D19] group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-[#C2A675]" />
                </div>
              </div>

              {/* 底部文案 */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-sans tracking-widest text-[#C2A675] uppercase block mb-1">
                  {cat.english}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C2A675] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans mt-2 line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-serif text-[#C2A675]">
                  <span>立即入館鑑賞</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
