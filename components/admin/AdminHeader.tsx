'use client';

import React, { useState } from 'react';
import { Search, Bell, Shield, LogOut, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  onSearchGlobal?: (query: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onSearchGlobal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState<'super' | 'live' | 'warehouse'>('super');
  const [showNotifications, setShowNotifications] = useState(false);

  const NOTIFICATIONS = [
    { id: 1, text: '高單價孤品 #ZS-2026-088 已完成綠界 18.8 萬刷卡付款', time: '5 分鐘前', unread: true },
    { id: 2, text: 'FB 直播報名人數新增 128 人，累積 1,428 人', time: '30 分鐘前', unread: true },
    { id: 3, text: '批量匯入 2,450 筆 CSV：發現 14 筆缺少 Cloudflare R2 圖片檔', time: '1 小時前', unread: false }
  ];

  return (
    <header className="h-16 bg-[#0D0C0B]/90 border-b border-[#C2A675]/20 px-6 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 font-sans text-[#F7F6F2]">
      {/* 左側：全域搜尋 */}
      <div className="relative w-72 sm:w-96">
        <Search className="w-4 h-4 text-[#C2A675] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="全域搜尋 (SKU 編號 / 訂單號 / 客戶手機)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (onSearchGlobal) onSearchGlobal(e.target.value);
          }}
          className="w-full bg-[#161513] border border-[#C2A675]/30 rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#F7F6F2] placeholder-stone-500 focus:outline-none focus:border-[#C2A675] shadow-inner transition-colors"
        />
      </div>

      {/* 右側：工具列與角色切換 */}
      <div className="flex items-center space-x-4">
        {/* 管理員角色切換 */}
        <div className="flex items-center gap-2 bg-[#161513] px-3 py-1.5 rounded-lg border border-[#C2A675]/30 text-xs font-serif shadow-sm">
          <Shield className="w-3.5 h-3.5 text-[#C2A675]" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="bg-transparent text-stone-200 focus:outline-none cursor-pointer text-xs"
          >
            <option value="super" className="bg-[#0D0C0B]">超級全端架構師</option>
            <option value="live" className="bg-[#0D0C0B]">FB 直播現場導播</option>
            <option value="warehouse" className="bg-[#0D0C0B]">精品倉儲鑑定專員</option>
          </select>
        </div>

        {/* 通知中心 */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-stone-300 hover:text-white bg-[#161513] hover:bg-[#22201D] border border-[#C2A675]/30 rounded-full transition-colors relative shadow-sm"
            title="通知中心"
          >
            <Bell className="w-4 h-4 text-[#C2A675]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8C2D19] rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8C2D19] rounded-full border border-black" />
          </button>

          {/* 通知彈窗 */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#161513] border border-[#C2A675]/40 rounded-xl shadow-2xl p-4 z-50 space-y-3 font-serif">
              <div className="flex justify-between items-center border-b border-stone-800 pb-2 text-xs font-bold text-[#C2A675]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 即時控台通知中心
                </span>
                <span className="text-[10px] text-stone-500 cursor-pointer hover:text-[#C2A675]">全部已讀</span>
              </div>
              <div className="space-y-2 text-xs">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-[#0D0C0B] border border-stone-800 space-y-1">
                    <p className="text-stone-200 text-[11px] leading-snug">{n.text}</p>
                    <span className="text-[9px] text-stone-500 font-mono block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 管理員頭像 */}
        <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8C2D19] to-[#691F10] text-white font-serif font-bold text-xs flex items-center justify-center border border-[#C2A675]/50 shadow-md">
            藏
          </div>
          <button
            onClick={() => alert('已安全的登出後台權限')}
            className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
            title="登出"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
