'use client';

import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, ShoppingBag, MessageCircle, ChevronRight, Play, 
  Award, FileCheck, Info, Sparkles, CheckCircle2, ArrowLeft, ZoomIn 
} from 'lucide-react';
import { Product } from '../types/product';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  onCheckoutNow: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onBack,
  onCheckoutNow
}) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0); // 0,1,2=Images, 3=Video
  const [activeTab, setActiveTab] = useState<'cert' | 'artist' | 'care'>('cert');

  // 微距放大鏡鏡頭狀態 (Magnifier Lens)
  const [magnifierState, setMagnifierState] = useState({
    show: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // 計算百分比位移
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setMagnifierState({
      show: true,
      x,
      y,
      bgX,
      bgY
    });
  };

  const isVideoSelected = selectedMediaIndex === 3 && Boolean(product.videoUrl);
  const currentImageUrl = product.images[selectedMediaIndex] || product.images[0];

  return (
    <div className="bg-[#F7F6F2] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按鈕 */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-serif text-[#73716B] hover:text-[#8C2D19] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回典藏藝品清單</span>
        </button>

        {/* 主鑑賞區（左圖右文） */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-10 rounded-xl border border-stone-200 shadow-oriental">
          {/* 左側多媒體沈浸區 (7 欄) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 主媒體視窗 */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMagnifierState((prev) => ({ ...prev, show: false }))}
              className="relative aspect-square rounded-lg overflow-hidden bg-stone-100 border border-stone-200 cursor-crosshair shadow-inner"
            >
              {isVideoSelected ? (
                <video
                  src={product.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={currentImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* 懸浮微距放大鏡效果 (Magnifier Lens Overlay) */}
                  {magnifierState.show && (
                    <div
                      className="absolute w-44 h-44 rounded-full border-2 border-[#C2A675] shadow-2xl pointer-events-none overflow-hidden z-20"
                      style={{
                        top: `${magnifierState.y - 88}px`,
                        left: `${magnifierState.x - 88}px`,
                        backgroundImage: `url(${currentImageUrl})`,
                        backgroundPosition: `${magnifierState.bgX}% ${magnifierState.bgY}%`,
                        backgroundSize: '350%'
                      }}
                    >
                      <div className="absolute inset-0 bg-[#C2A675]/10 rounded-full" />
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-serif flex items-center gap-1.5 pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C2A675]" />
                    <span>滑鼠懸停啟動微距放大鏡鑑賞細節</span>
                  </div>
                </>
              )}
            </div>

            {/* 縮圖與影片切換導覽 */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMediaIndex(idx)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedMediaIndex === idx
                      ? 'border-[#8C2D19] shadow'
                      : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`縮圖 ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* 短影片縮圖入口 */}
              {product.videoUrl && (
                <button
                  onClick={() => setSelectedMediaIndex(3)}
                  className={`aspect-square rounded-md overflow-hidden border-2 bg-stone-900 flex flex-col items-center justify-center text-white transition-all ${
                    selectedMediaIndex === 3
                      ? 'border-[#8C2D19] shadow'
                      : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Play className="w-5 h-5 text-[#C2A675] fill-[#C2A675]" />
                  <span className="text-[10px] font-serif mt-1">短影片</span>
                </button>
              )}
            </div>
          </div>

          {/* 右側規格與購買行動區 (5 欄) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 孤品與編號標頭 */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="gold-badge">
                獨家一物一拍孤品
              </span>
              <span className="font-mono text-xs text-[#8C2D19] font-bold bg-[#8C2D19]/10 px-2.5 py-1 rounded">
                孤品編號 #{product.code}
              </span>
            </div>

            {/* 品名 */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#262524] leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-[#73716B] font-serif mt-2">
                【{product.specs.origin}】
              </p>
            </div>

            {/* 價格區 */}
            <div className="bg-[#F7F6F2] p-4 rounded-lg border border-stone-200/80">
              <span className="text-xs text-[#73716B] font-serif block">藏家典藏專屬價</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-serif font-bold text-[#8C2D19]">
                  NT$ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#73716B] line-through font-serif">
                    原價 NT$ {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* 詳細規格表格 */}
            <div className="space-y-2 text-xs font-sans border-y border-stone-200 py-4 text-[#262524]">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#73716B] font-serif">泥料 / 種水：</span>
                <span className="col-span-2 font-bold">{product.specs.origin}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#73716B] font-serif">容量 / 尺寸：</span>
                <span className="col-span-2 font-bold">{product.specs.dimensions}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#73716B] font-serif">淨重數據：</span>
                <span className="col-span-2 font-bold">{product.specs.weight}</span>
              </div>
              {product.specs.artist && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#73716B] font-serif">作工大師：</span>
                  <span className="col-span-2 font-bold text-[#8C2D19]">{product.specs.artist}</span>
                </div>
              )}
              {product.specs.certificateNo && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#73716B] font-serif">鑑定字號：</span>
                  <span className="col-span-2 font-mono font-bold">{product.specs.certificateNo}</span>
                </div>
              )}
            </div>

            {/* 核心購買按鈕組 */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="py-3.5 px-4 bg-[#1A1918] hover:bg-[#262524] disabled:bg-stone-400 text-white font-serif text-xs sm:text-sm rounded shadow transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C2A675]" />
                  <span>加入購物車</span>
                </button>

                <button
                  onClick={() => onCheckoutNow(product)}
                  disabled={!product.inStock}
                  className="py-3.5 px-4 bg-[#8C2D19] hover:bg-[#A3341D] disabled:bg-stone-400 text-white font-serif text-xs sm:text-sm rounded shadow transition-colors flex items-center justify-center gap-2 border border-[#C2A675]/30 font-bold"
                >
                  <span>立即結帳認購</span>
                </button>
              </div>

              {/* LINE 專人一對一諮詢 */}
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-serif text-xs rounded transition-colors flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#06C755]" />
                <span>LINE 專人一對一諮詢品相細節</span>
              </a>
            </div>

            {/* 信任標章小欄 */}
            <div className="bg-[#F7F6F2] p-3 rounded flex items-center justify-around text-[11px] font-serif text-[#73716B] border border-stone-200">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C2D19]" /> 一物一證
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#C2A675]" /> 名家親傳
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 全額保價運送
              </span>
            </div>
          </div>
        </div>

        {/* 下方折疊規格與名家介紹 Accordion / Tabs */}
        <div className="mt-12 bg-white rounded-xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          {/* Tab 控制按鈕 */}
          <div className="flex border-b border-stone-200 space-x-8 font-serif text-sm">
            <button
              onClick={() => setActiveTab('cert')}
              className={`pb-3 font-bold transition-colors border-b-2 ${
                activeTab === 'cert'
                  ? 'border-[#8C2D19] text-[#8C2D19]'
                  : 'border-transparent text-[#73716B] hover:text-[#262524]'
              }`}
            >
              權威鑑定證書與詳情
            </button>
            <button
              onClick={() => setActiveTab('artist')}
              className={`pb-3 font-bold transition-colors border-b-2 ${
                activeTab === 'artist'
                  ? 'border-[#8C2D19] text-[#8C2D19]'
                  : 'border-transparent text-[#73716B] hover:text-[#262524]'
              }`}
            >
              作者背景與造物故事
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 font-bold transition-colors border-b-2 ${
                activeTab === 'care'
                  ? 'border-[#8C2D19] text-[#8C2D19]'
                  : 'border-transparent text-[#73716B] hover:text-[#262524]'
              }`}
            >
              保養與開壺指南
            </button>
          </div>

          {/* Tab 內容區 */}
          <div className="py-8">
            {activeTab === 'cert' && (
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-[#F7F6F2] rounded border border-stone-200">
                  <FileCheck className="w-8 h-8 text-[#8C2D19] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#262524]">
                      國家級珠寶與工藝美術檢驗證書防偽聲明
                    </h4>
                    <p className="text-xs text-[#73716B] font-sans mt-1">
                      本藏品字號【{product.specs.certificateNo || 'NGTC-2026-8801'}】已登錄於權威資料庫，隨貨附贈實體鑑定證書卡與官方防偽鋼印。
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="border border-stone-200 p-4 rounded text-xs space-y-2">
                    <h5 className="font-serif font-bold text-[#8C2D19] text-sm mb-2">藝術品詳細敘述</h5>
                    <p className="text-[#73716B] leading-relaxed">{product.description}</p>
                  </div>
                  <div className="border border-stone-200 p-4 rounded text-xs space-y-2 bg-stone-50">
                    <h5 className="font-serif font-bold text-[#262524] text-sm mb-2">工藝與製作履歷</h5>
                    <div><strong>工藝工序：</strong>{product.specs.craftType || '純手工創作'}</div>
                    <div><strong>收藏等級：</strong>{product.specs.rarityLevel || '博物館級典藏孤品'}</div>
                    <div><strong>防偽驗證：</strong>支援手機 NFC 晶片與二維碼雙重查驗</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'artist' && (
              <div className="space-y-4 text-xs font-sans leading-relaxed text-[#262524]">
                <h4 className="font-serif text-lg font-bold text-[#8C2D19]">
                  {product.specs.artist || '大師工坊傳承'}
                </h4>
                <p>
                  {product.story || '本作品傳承東方經典美學脈絡，從選料、陳腐、創作到成型皆由大師全程親製。歷經多道繁複工序，將文人雅致氣息完美融入作品之中。'}
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 text-xs font-sans leading-relaxed text-[#262524]">
                <h4 className="font-serif text-base font-bold text-[#262524] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#8C2D19]" />
                  <span>典藏品專業保養與使用注意事項</span>
                </h4>
                <p>
                  {product.careGuide || '請避免高溫灼燙與化學試劑接觸。洗滌時請使用純淨溫水與棉布輕柔擦拭，並置於恆溫乾燥環境中妥善保存。'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
