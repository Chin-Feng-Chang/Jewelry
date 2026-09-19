'use client';

import React from 'react';
import { Search, ShoppingBag, User, Radio, Sparkles } from 'lucide-react';
import { CartItem } from '../types/product';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenSearch,
  onOpenLogin,
  activeCategory,
  onSelectCategory
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F7F6F2]/90 border-b border-stone-200/80 transition-all">
      {/* 頂部東方告示欄 */}
      <div className="bg-[#1A1918] text-[#C2A675] text-xs py-1.5 px-4 text-center flex items-center justify-between font-serif">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A675]" />
          <span>「名家傳世孤品・一物一拍一證」典藏滿 NT$100,000 即享恆溫防震專車送達</span>
        </div>
        <a
          href="/admin.html"
          target="_blank"
          className="text-[11px] bg-stone-800 hover:bg-[#8C2D19] text-[#C2A675] hover:text-white px-2.5 py-0.5 rounded transition-colors font-sans flex items-center gap-1 shrink-0"
        >
          <span>管理後台控台</span>
          <span>→</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* 品牌 Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectCategory('all')}
        >
          <div className="oriental-seal font-serif text-lg py-1 px-2.5 bg-white border-[#8C2D19] shadow-sm group-hover:bg-[#8C2D19] group-hover:text-white transition-colors">
            文人藏寶
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#262524]">
              雅集典藏
            </span>
            <span className="block text-[10px] text-[#73716B] tracking-wider uppercase font-sans">
              Oriental Luxury Gallery
            </span>
          </div>
        </div>

        {/* 主選單 */}
        <nav className="hidden md:flex items-center space-x-8 font-serif text-sm">
          {[
            { id: 'all', label: '全部鑑賞' },
            { id: 'zisha', label: '宜興紫砂' },
            { id: 'jade', label: '緬甸翡翠' },
            { id: 'amber', label: '天然琥珀' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative py-2 transition-colors ${
                activeCategory === cat.id
                  ? 'text-[#8C2D19] font-bold'
                  : 'text-[#262524] hover:text-[#8C2D19]'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8C2D19] rounded-full" />
              )}
            </button>
          ))}
          <a
            href="#live-section"
            className="flex items-center gap-1.5 text-[#8C2D19] bg-[#8C2D19]/10 px-3 py-1 rounded-full hover:bg-[#8C2D19]/20 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#8C2D19]" />
            <span>FB 直播專題</span>
          </a>
        </nav>

        {/* 右側工具列 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#262524] hover:text-[#8C2D19] hover:bg-stone-200/50 rounded-full transition-colors"
            title="即時搜尋"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLogin}
            className="p-2 text-[#262524] hover:text-[#8C2D19] hover:bg-stone-200/50 rounded-full transition-colors"
            title="藏家會員入口"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#1A1918] text-white hover:bg-[#8C2D19] rounded-full transition-colors shadow-md flex items-center justify-center"
            title="購物車抽屜"
          >
            <ShoppingBag className="w-4 h-4 text-[#C2A675]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C2D19] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F7F6F2] shadow">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
