'use client';

import React, { useState } from 'react';
import { 
  Radio, Calendar, Sparkles, Image as ImageIcon, Link as LinkIcon, 
  Plus, Edit, Trash2, CheckCircle2, Play, Video, Users 
} from 'lucide-react';
import { MOCK_HERO_SCHEDULES, MOCK_LIVE_EVENTS } from '../../data/adminMockData';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { HeroBannerSchedule, LiveEventConfig } from '../../types/admin';

export const MarketingLiveModule: React.FC = () => {
  const [heroSchedules, setHeroSchedules] = useState<HeroBannerSchedule[]>(MOCK_HERO_SCHEDULES);
  const [liveConfig, setLiveConfig] = useState<LiveEventConfig>(MOCK_LIVE_EVENTS[0]);

  const handleToggleBannerActive = (id: string) => {
    setHeroSchedules(prev => prev.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item));
  };

  const handleToggleFeaturedProduct = (productId: string) => {
    setLiveConfig(prev => {
      const exists = prev.featuredProductIds.includes(productId);
      const updated = exists
        ? prev.featuredProductIds.filter(id => id !== productId)
        : [...prev.featuredProductIds, productId];
      return { ...prev, featuredProductIds: updated };
    });
  };

  return (
    <div className="space-y-10 font-sans text-[#F7F6F2]">
      {/* 標頭 */}
      <div className="border-b border-[#C2A675]/20 pb-4">
        <span className="oriental-seal text-xs py-0.5 px-2 bg-[#8C2D19] border-[#C2A675] text-[#F7F6F2] font-serif shadow-sm">
          行銷與拍賣控台
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
          首頁特展輪播排程與 FB 直播綁定控台
        </h1>
      </div>

      {/* 1. 首頁 Hero 輪播活動排程 */}
      <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#C2A675]" />
              <span>首頁 Hero 主視覺輪播檔期排程</span>
            </h3>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              設定各大節慶特展主視覺起訖時間、跳轉連結與啟動狀態。
            </p>
          </div>

          <button
            onClick={() => alert('開啟新增 Banner 檔期彈窗')}
            className="px-4 py-2 bg-[#8C2D19] hover:bg-[#A3341D] text-white text-xs font-serif rounded-lg shadow flex items-center gap-1.5 font-bold border border-[#C2A675]/30"
          >
            <Plus className="w-4 h-4 text-[#C2A675]" />
            <span>新增特展輪播</span>
          </button>
        </div>

        {/* 檔期清單 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heroSchedules.map((banner) => (
            <div
              key={banner.id}
              className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                banner.isActive ? 'bg-[#0D0C0B] border-[#C2A675]/30 shadow-lg' : 'bg-[#0D0C0B]/60 border-stone-800 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-stone-700">
                  <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#8C2D19] text-white text-[10px] px-2 py-0.5 rounded font-serif shadow-md">
                    {banner.tag}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-white text-base">{banner.title}</h4>
                  <p className="text-xs text-stone-400 font-sans mt-0.5 line-clamp-1">{banner.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400 border-t border-stone-800 pt-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C2A675]" />
                  <span>檔期時間：{banner.startDate} ～ {banner.endDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                <button
                  onClick={() => handleToggleBannerActive(banner.id)}
                  className={`px-3 py-1 rounded-md text-xs font-serif font-bold transition-colors ${
                    banner.isActive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-[#22201D] text-stone-500 border border-stone-800'
                  }`}
                >
                  {banner.isActive ? '進行中 (Active)' : '已停用 (Inactive)'}
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <a href={banner.targetLink} target="_blank" className="text-stone-400 hover:text-[#C2A675]">
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Facebook 直播與多選商品綁定 */}
      <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
        <div className="border-b border-stone-800 pb-4">
          <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#8C2D19] animate-pulse" />
            <span>Facebook 直播嵌入控制與本場推薦商品綁定</span>
          </h3>
          <p className="text-xs text-stone-400 font-sans mt-0.5">
            切換前台直播狀態、設定 FB Live 內嵌網址，並多選綁定本場直播右側推薦孤品。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左側直播狀態 */}
          <div className="lg:col-span-6 space-y-4 bg-[#0D0C0B] p-5 rounded-xl border border-stone-800">
            <h4 className="font-serif font-bold text-white text-sm">直播狀態控制 (Status Control)</h4>

            <div className="grid grid-cols-3 gap-2 text-xs font-serif">
              {[
                { id: 'upcoming', label: '未開始 (預告倒數)' },
                { id: 'live', label: 'LIVE 直播中' },
                { id: 'ended', label: '直播結束 (回放歸檔)' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setLiveConfig({ ...liveConfig, status: st.id as any })}
                  className={`py-2.5 px-2 rounded-lg font-bold border transition-colors ${
                    liveConfig.status === st.id
                      ? 'bg-[#8C2D19] text-white border-[#C2A675]'
                      : 'bg-[#161513] text-stone-400 border-stone-800'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-serif">FB 直播嵌入網址 / URL</label>
                <input
                  type="text"
                  value={liveConfig.streamUrl}
                  onChange={(e) => setLiveConfig({ ...liveConfig, streamUrl: e.target.value })}
                  className="w-full bg-[#161513] border border-stone-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-serif">下一次直播時間 (Scheduled Date & Time)</label>
                <input
                  type="datetime-local"
                  value="2026-09-22T20:00"
                  onChange={() => {}}
                  className="w-full bg-[#161513] border border-stone-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* 右側多選商品綁定 */}
          <div className="lg:col-span-6 space-y-4 bg-[#0D0C0B] p-5 rounded-xl border border-stone-800">
            <div className="flex justify-between items-center">
              <h4 className="font-serif font-bold text-white text-sm">
                多選綁定「本場推薦商品」({liveConfig.featuredProductIds.length} 件)
              </h4>
              <span className="text-[10px] text-[#C2A675] font-serif">勾選之商品將顯示於前端直播視窗右側</span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {MOCK_PRODUCTS.map((product) => {
                const isBound = liveConfig.featuredProductIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => handleToggleFeaturedProduct(product.id)}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors text-xs ${
                      isBound
                        ? 'bg-[#8C2D19]/20 border-[#8C2D19] text-white'
                        : 'bg-[#161513] border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded border border-stone-700" />
                      <div>
                        <span className="font-mono text-[10px] text-[#C2A675]">#{product.code}</span>
                        <h5 className="font-serif font-bold text-white text-xs">{product.name}</h5>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-serif">
                      <span className="font-mono font-bold text-[#8C2D19]">NT$ {product.price.toLocaleString()}</span>
                      <span className={`px-2.5 py-1 rounded text-[10px] ${isBound ? 'bg-[#8C2D19] text-white font-bold' : 'bg-stone-800 text-stone-400'}`}>
                        {isBound ? '已綁定直播現場 ✓' : '點擊綁定'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
