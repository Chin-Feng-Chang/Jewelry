'use client';

import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Product } from '../types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.specs.origin.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-white max-w-xl w-full rounded-xl overflow-hidden shadow-2xl z-10 border border-stone-200 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#262524]">
            <Search className="w-4 h-4 text-[#8C2D19]" />
            <span>雅集藝品即時搜尋</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 搜尋輸入框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="請輸入關鍵字（如：顧景舟、老紫泥、翡翠手鐲、琥珀...）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-[#F7F6F2] border border-stone-300 rounded-lg px-4 py-3 text-sm text-[#262524] placeholder-stone-400 focus:outline-none focus:border-[#8C2D19]"
          />
        </div>

        {/* 熱門關鍵字標籤 */}
        {!query && (
          <div>
            <span className="text-xs font-serif text-[#73716B] block mb-2">熱門搜尋標籤：</span>
            <div className="flex flex-wrap gap-2 text-xs font-serif">
              {['顧景舟紫砂', '老坑玻璃種', '緬甸金藍珀', '西施壺', '波羅的海血珀'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1 bg-[#F7F6F2] hover:bg-stone-200 text-[#262524] rounded-full border border-stone-200 transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 搜尋結果 */}
        {query && (
          <div className="max-h-64 overflow-y-auto space-y-3">
            {results.length === 0 ? (
              <p className="text-xs text-center py-6 text-[#73716B] font-serif">
                未查找到相關孤品藝品，請更換關鍵字重新搜尋。
              </p>
            ) : (
              results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2 rounded hover:bg-[#F7F6F2] cursor-pointer border border-transparent hover:border-stone-200 transition-colors"
                >
                  <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#262524] truncate">{p.name}</h4>
                    <span className="text-[10px] text-[#73716B] block">#{p.code} | {p.specs.origin}</span>
                  </div>
                  <span className="font-serif text-xs font-bold text-[#8C2D19]">
                    NT$ {p.price.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
