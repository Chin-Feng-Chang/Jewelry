'use client';

import React from 'react';
import { X, ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';
import { Product } from '../types/product';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewDetails
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-white rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-stone-200 grid grid-cols-1 md:grid-cols-2">
        {/* 左側大圖 */}
        <div className="relative aspect-square bg-stone-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="gold-badge">獨家孤品</span>
          </div>
        </div>

        {/* 右側資訊 */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] text-[#73716B] font-serif block">
                  【{product.specs.origin}】
                </span>
                <h3 className="font-serif text-xl font-bold text-[#262524]">
                  {product.name}
                </h3>
              </div>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2 text-xs font-sans border-b border-stone-100 text-[#73716B]">
              <div><strong>孤品編號：</strong>#{product.code}</div>
              <div><strong>規格尺寸：</strong>{product.specs.dimensions}</div>
              <div><strong>重量數據：</strong>{product.specs.weight}</div>
              {product.specs.artist && (
                <div><strong>名家作工：</strong><span className="text-[#8C2D19] font-bold">{product.specs.artist}</span></div>
              )}
            </div>

            <p className="text-xs text-[#73716B] font-sans mt-3 line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#73716B] font-serif">典藏價</span>
              <span className="text-2xl font-serif font-bold text-[#8C2D19]">
                NT$ {product.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewDetails(product)}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-[#262524] font-serif text-xs rounded transition-colors flex items-center justify-center gap-1"
              >
                <span>完整鑑賞頁</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="py-2.5 px-3 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-xs rounded transition-colors flex items-center justify-center gap-1 shadow"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C2A675]" />
                <span>加入購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
