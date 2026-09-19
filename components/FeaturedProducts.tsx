'use client';

import React, { useState } from 'react';
import { ShoppingBag, Eye, Video, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onProductClick
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#8C2D19] mb-2">
              <Sparkles className="w-4 h-4 text-[#8C2D19]" />
              <span>一物一拍・傳世珍藏</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#262524]">
              熱門典藏榜 (Featured Collection)
            </h2>
          </div>
          <p className="text-sm text-[#73716B] font-sans max-w-md">
            每一件孤品藝術品皆由專家團隊親自鑑賞、雙重鑑定，配備專屬證書與防偽標章。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isHovered = hoveredId === product.id;
            const currentImg = isHovered && product.images.length > 1
              ? product.images[1]
              : product.images[0];

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#F7F6F2] rounded-lg border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-oriental-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* 圖片展示區 */}
                  <div 
                    onClick={() => onProductClick(product)}
                    className="relative aspect-square overflow-hidden cursor-pointer bg-stone-100"
                  >
                    <img
                      src={currentImg}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* 頂部標籤列 */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      {product.inStock ? (
                        <span className="gold-badge shadow-sm">
                          在售孤品
                        </span>
                      ) : (
                        <span className="bg-stone-800 text-stone-300 text-[11px] px-2.5 py-0.5 font-serif rounded-sm shadow-sm">
                          已售完 (Sold Out)
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        {product.videoUrl && (
                          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                            <Video className="w-3 h-3 text-[#C2A675]" /> 影片
                          </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-sm text-[#262524] text-[10px] px-2 py-0.5 rounded font-mono font-bold shadow-sm">
                          #{product.code}
                        </span>
                      </div>
                    </div>

                    {/* 快捷操作浮動按鈕 */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="flex-1 py-2 bg-white/90 hover:bg-white text-[#262524] text-xs font-serif rounded shadow-md backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>快速鑑賞</span>
                      </button>

                      {product.inStock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="py-2 px-3 bg-[#8C2D19] hover:bg-[#A3341D] text-white text-xs font-serif rounded shadow-md flex items-center justify-center gap-1 transition-colors"
                          title="加入購物車"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C2A675]" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 文案介紹區 */}
                  <div className="p-5">
                    <div className="text-[11px] text-[#73716B] font-serif mb-1">
                      【{product.specs.origin}】
                    </div>
                    <h3 
                      onClick={() => onProductClick(product)}
                      className="font-serif text-lg font-bold text-[#262524] hover:text-[#8C2D19] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#73716B] font-sans mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* 底部價格與購買 */}
                <div className="p-5 pt-0 border-t border-stone-200/60 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#73716B] block font-serif">典藏專屬價</span>
                    <span className="text-xl font-serif font-bold text-[#8C2D19]">
                      NT$ {product.price.toLocaleString()}
                    </span>
                  </div>

                  {product.inStock ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 bg-[#1A1918] hover:bg-[#8C2D19] text-white text-xs font-serif rounded transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C2A675]" />
                      <span>認購孤品</span>
                    </button>
                  ) : (
                    <span className="text-xs text-stone-400 font-serif border border-stone-300 px-3 py-1.5 rounded">
                      藏家已被典藏
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
