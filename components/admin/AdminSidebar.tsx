'use client';

import React from 'react';
import { 
  LayoutDashboard, BarChart3, Package, FileSpreadsheet, 
  ShoppingCart, Radio, Settings, ArrowLeft, Sparkles, Shield
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onBackToStore?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  onBackToStore
}) => {
  const NAV_ITEMS = [
    { id: 'overview', label: '核心概覽', sub: 'Overview', icon: LayoutDashboard },
    { id: 'traffic', label: '流量與行為分析', sub: 'Traffic & Analytics', icon: BarChart3 },
    { id: 'products', label: '商品與多媒體管理', sub: 'Products & Media', icon: Package },
    { id: 'bulk', label: '批次 CSV/S3 匯入', sub: 'Bulk Importer (2000+)', icon: FileSpreadsheet },
    { id: 'orders', label: '訂單與金流保險', sub: 'Orders & Payments', icon: ShoppingCart },
    { id: 'marketing', label: '行銷與 FB 直播控台', sub: 'Marketing & Live', icon: Radio },
    { id: 'settings', label: '系統權限與 API', sub: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0D0C0B] border-r border-[#C2A675]/20 p-6 flex flex-col justify-between shrink-0 font-sans text-[#F7F6F2]">
      <div className="space-y-8">
        {/* 標頭 印章 Logo */}
        <div className="relative group">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="oriental-seal text-[11px] py-0.5 px-2 bg-[#8C2D19] border-[#C2A675] text-[#F7F6F2] shadow-md font-serif">
              十載架構師
            </div>
            <span className="font-serif font-bold text-xl text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#F7F6F2] via-[#C2A675] to-[#F7F6F2]">
              雅集控台
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#C2A675] font-mono border-t border-[#C2A675]/15 pt-2">
            <span>Zen Luxury Admin</span>
            <span className="gold-badge text-[9px] py-0 px-1">v3.0 Deluxe</span>
          </div>
        </div>

        {/* 主導覽選單 */}
        <nav className="space-y-2 font-serif text-xs">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8C2D19] to-[#691F10] text-white font-bold shadow-lg border border-[#C2A675]/40'
                    : 'text-stone-400 hover:bg-[#161513] hover:text-white border border-transparent hover:border-[#C2A675]/20'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#C2A675]" />
                )}
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#C2A675]' : 'text-stone-500 group-hover:text-[#C2A675]'}`} />
                <div>
                  <span className="block text-xs">{item.label}</span>
                  <span className="text-[9px] text-stone-500 font-sans block">{item.sub}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 底部導回前台按鈕 */}
      <div className="pt-6 border-t border-[#C2A675]/20">
        {onBackToStore ? (
          <button
            onClick={onBackToStore}
            className="w-full py-2.5 px-3 bg-[#161513] hover:bg-[#8C2D19] text-[#C2A675] hover:text-white text-xs font-serif rounded-lg transition-all flex items-center justify-center gap-2 border border-[#C2A675]/30 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2A675]" />
            <span>返回前台雅集展廳</span>
          </button>
        ) : (
          <a
            href="/"
            className="w-full py-2.5 px-3 bg-[#161513] hover:bg-[#8C2D19] text-[#C2A675] hover:text-white text-xs font-serif rounded-lg transition-all flex items-center justify-center gap-2 block text-center border border-[#C2A675]/30 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2A675]" />
            <span>返回前台雅集展廳</span>
          </a>
        )}
      </div>
    </aside>
  );
};
