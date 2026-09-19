'use client';

import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Video, Eye, ShoppingBag, RotateCcw } from 'lucide-react';
import { Product, FilterState } from '../types/product';

interface CatalogViewProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  onProductClick
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: activeCategory || 'all',
    material: 'all',
    minPrice: 0,
    maxPrice: 500000,
    inStockOnly: false,
    sortBy: 'featured'
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 當外部類別切換時同步
  React.useEffect(() => {
    setFilterState((prev) => ({ ...prev, category: activeCategory }));
  }, [activeCategory]);

  // 過濾邏輯
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 類別過濾
      if (filterState.category !== 'all' && p.category !== filterState.category) {
        return false;
      }
      // 僅看在售
      if (filterState.inStockOnly && !p.inStock) {
        return false;
      }
      // 價格過濾
      if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
        return false;
      }
      // 泥料/種水
      if (filterState.material !== 'all') {
        const originText = p.specs.origin.toLowerCase();
        if (filterState.material === 'zini' && !originText.includes('紫泥')) return false;
        if (filterState.material === 'zhuni' && !originText.includes('朱泥')) return false;
        if (filterState.material === 'duanni' && !originText.includes('段泥')) return false;
        if (filterState.material === 'glass' && !originText.includes('玻璃種')) return false;
        if (filterState.material === 'ice' && !originText.includes('冰種')) return false;
        if (filterState.material === 'blue' && !originText.includes('金藍珀')) return false;
        if (filterState.material === 'blood' && !originText.includes('血珀')) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, filterState]);

  const resetFilters = () => {
    setFilterState({
      category: 'all',
      material: 'all',
      minPrice: 0,
      maxPrice: 500000,
      inStockOnly: false,
      sortBy: 'featured'
    });
    onSelectCategory('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 頁面標頭區 */}
      <div className="border-b border-stone-200 pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="oriental-seal font-serif mb-2">雅集大觀</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#262524]">
            全部典藏藝品鑑賞
          </h1>
        </div>

        {/* 排序與數量 */}
        <div className="flex items-center gap-4 text-xs font-serif">
          <span className="text-[#73716B]">
            共找到 <strong className="text-[#8C2D19]">{filteredProducts.length}</strong> 件珍稀孤品
          </span>
          <select
            value={filterState.sortBy}
            onChange={(e) => setFilterState({ ...filterState, sortBy: e.target.value as any })}
            className="bg-white border border-stone-300 rounded px-3 py-1.5 text-[#262524] focus:outline-none focus:border-[#8C2D19]"
          >
            <option value="featured">推薦排序</option>
            <option value="price-asc">價格：由低至高</option>
            <option value="price-desc">價格：由高至低</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側多維度篩選側邊欄 (3 欄) */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-8 sticky top-24">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h3 className="font-serif font-bold text-base text-[#262524] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8C2D19]" />
              <span>進階多維度篩選</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#73716B] hover:text-[#8C2D19] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> 重置
            </button>
          </div>

          {/* 1. 藝品種類 */}
          <div>
            <label className="block font-serif text-xs font-bold text-[#262524] mb-3">
              藝品類別 (Category)
            </label>
            <div className="space-y-2">
              {[
                { id: 'all', label: '全部類別' },
                { id: 'zisha', label: '宜興紫砂壺' },
                { id: 'jade', label: '緬甸翡翠' },
                { id: 'amber', label: '天然琥珀' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setFilterState({ ...filterState, category: c.id });
                    onSelectCategory(c.id);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                    filterState.category === c.id
                      ? 'bg-[#8C2D19] text-white font-bold'
                      : 'bg-[#F7F6F2] text-[#262524] hover:bg-stone-200'
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. 泥料/種水 */}
          <div>
            <label className="block font-serif text-xs font-bold text-[#262524] mb-3">
              泥料 / 種水質地 (Material & Grade)
            </label>
            <select
              value={filterState.material}
              onChange={(e) => setFilterState({ ...filterState, material: e.target.value })}
              className="w-full bg-[#F7F6F2] border border-stone-300 rounded px-3 py-2 text-xs text-[#262524] focus:outline-none focus:border-[#8C2D19]"
            >
              <option value="all">全部泥料與種水</option>
              <option value="zini">黃龍山原礦老紫泥</option>
              <option value="zhuni">小煤窯原礦朱泥</option>
              <option value="duanni">本山段泥</option>
              <option value="glass">老坑玻璃種翡翠</option>
              <option value="ice">老坑冰種翡翠</option>
              <option value="blue">天然緬甸金藍珀</option>
              <option value="blood">波羅的海血珀</option>
            </select>
          </div>

          {/* 3. 價格區間滑桿 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-serif text-xs font-bold text-[#262524]">
                典藏價格區間 (Price Range)
              </label>
              <span className="text-[11px] font-mono text-[#8C2D19] font-bold">
                ≤ NT$ {filterState.maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={10000}
              value={filterState.maxPrice}
              onChange={(e) => setFilterState({ ...filterState, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#8C2D19] cursor-pointer"
            />
          </div>

          {/* 4. 僅看在售 */}
          <div className="pt-4 border-t border-stone-200">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filterState.inStockOnly}
                onChange={(e) => setFilterState({ ...filterState, inStockOnly: e.target.checked })}
                className="w-4 h-4 accent-[#8C2D19] rounded"
              />
              <span className="text-xs font-serif font-bold text-[#262524]">
                僅顯示在庫可在售孤品
              </span>
            </label>
          </div>
        </aside>

        {/* 右側商品網格 (9 欄) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-lg border border-stone-200 text-center py-20">
              <SlidersHorizontal className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-[#262524]">
                未找到符合條件的孤品藝品
              </h3>
              <p className="text-xs text-[#73716B] font-sans mt-2">
                建議您重置篩選條件或聯絡 LINE 專人協助查詢私房藏品。
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-[#8C2D19] text-white font-serif text-xs rounded shadow hover:bg-[#A3341D] transition-colors"
              >
                重置所有篩選
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isHovered = hoveredId === product.id;
                const currentImg = isHovered && product.images.length > 1
                  ? product.images[1]
                  : product.images[0];

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-oriental-hover transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* 圖片區域 */}
                      <div 
                        onClick={() => onProductClick(product)}
                        className="relative aspect-square overflow-hidden cursor-pointer bg-stone-100"
                      >
                        <img
                          src={currentImg}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* 頂部標籤 */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-none">
                          {product.inStock ? (
                            <span className="gold-badge shadow-sm">
                              一物一拍
                            </span>
                          ) : (
                            <span className="bg-stone-800 text-white text-[10px] px-2 py-0.5 font-serif rounded">
                              售完
                            </span>
                          )}

                          <div className="flex items-center gap-1">
                            {product.videoUrl && (
                              <span className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Video className="w-2.5 h-2.5 text-[#C2A675]" /> 影片
                              </span>
                            )}
                            <span className="bg-white/90 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold text-[#262524]">
                              #{product.code}
                            </span>
                          </div>
                        </div>

                        {/* 懸浮按鈕 */}
                        <div className="absolute bottom-2.5 inset-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickView(product);
                            }}
                            className="flex-1 py-1.5 bg-white/90 hover:bg-white text-[#262524] text-[11px] font-serif rounded shadow flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>預覽</span>
                          </button>
                        </div>
                      </div>

                      {/* 文字簡介 */}
                      <div className="p-4">
                        <div className="text-[10px] text-[#73716B] font-serif mb-1 truncate">
                          {product.specs.origin}
                        </div>
                        <h3 
                          onClick={() => onProductClick(product)}
                          className="font-serif text-sm sm:text-base font-bold text-[#262524] hover:text-[#8C2D19] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-[#73716B] font-sans mt-1 line-clamp-1">
                          {product.specs.dimensions}
                        </p>
                      </div>
                    </div>

                    {/* 價格與加購物車 */}
                    <div className="p-4 pt-0 border-t border-stone-100 mt-1 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#73716B] block font-serif">典藏價</span>
                        <span className="text-base sm:text-lg font-serif font-bold text-[#8C2D19]">
                          NT$ {product.price.toLocaleString()}
                        </span>
                      </div>

                      {product.inStock && (
                        <button
                          onClick={() => onAddToCart(product)}
                          className="p-2 bg-[#1A1918] hover:bg-[#8C2D19] text-white rounded transition-colors"
                          title="加入購物車"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#C2A675]" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
