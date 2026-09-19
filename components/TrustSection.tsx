'use client';

import React from 'react';
import { Award, ShieldCheck, Truck, Lock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const TRUST_ITEMS = [
    {
      icon: Award,
      title: '一物一拍・權威雙證書',
      desc: '每一件紫砂、翡翠或琥珀皆具備國家級權威機構（NGTC/GIA/宜興工藝美協）獨立防偽鑑定證書。'
    },
    {
      icon: ShieldCheck,
      title: '名家親傳・傳承脈絡清晰',
      desc: '直接對接國家級工藝美術大師與傳承人，保證純手工創作、泥料純正、歷史出處源流可考。'
    },
    {
      icon: Truck,
      title: '低溫恆溫・防震專車送達',
      desc: '採用客製化定制防震記憶海綿與高階錦盒打包，高單價珍品提供專人運送與全額保價運輸。'
    },
    {
      icon: Lock,
      title: '孤品防偽・智慧物聯驗證',
      desc: '內嵌高安全級防偽晶片，藏家手機輕觸即可隨時查閱藏品造物歷史履歷與傳奇故事。'
    }
  ];

  return (
    <section className="py-20 bg-[#1A1918] text-white border-t border-[#C2A675]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="oriental-seal mb-3 border-[#C2A675] text-[#C2A675]">
            信譽背書
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F6F2]">
            藏家信任與四大品質承諾
          </h2>
          <p className="text-sm text-stone-400 font-sans mt-3">
            我們秉持文人鑑賞之嚴謹態度，為每一位藏家提供最極致的收藏體驗。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-900/90 border border-stone-800 p-8 rounded-lg text-center hover:border-[#C2A675]/50 transition-colors group shadow-lg"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#8C2D19]/20 border border-[#8C2D19]/40 text-[#C2A675] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#8C2D19] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F7F6F2] group-hover:text-[#C2A675] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
