'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { TrafficAnalyticsModule } from './TrafficAnalyticsModule';
import { BulkProductManagerModule } from './BulkProductManagerModule';
import { OrdersPaymentsModule } from './OrdersPaymentsModule';
import { MarketingLiveModule } from './MarketingLiveModule';
import { ShieldCheck, Database, Key, Sliders, CheckCircle2, Sparkles } from 'lucide-react';

interface FullAdminDashboardProps {
  onBackToStore?: () => void;
}

export const FullAdminDashboard: React.FC<FullAdminDashboardProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#F7F6F2] font-sans flex flex-col md:flex-row">
      {/* 側邊欄 */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToStore={onBackToStore}
      />

      {/* 右側主內容區 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 頂部 Header */}
        <AdminHeader onSearchGlobal={(q) => console.log('Global search:', q)} />

        {/* 內容區塊 Switch */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <TrafficAnalyticsModule />
            </div>
          )}

          {activeTab === 'traffic' && (
            <TrafficAnalyticsModule />
          )}

          {activeTab === 'products' && (
            <BulkProductManagerModule />
          )}

          {activeTab === 'bulk' && (
            <BulkProductManagerModule />
          )}

          {activeTab === 'orders' && (
            <OrdersPaymentsModule />
          )}

          {activeTab === 'marketing' && (
            <MarketingLiveModule />
          )}

          {activeTab === 'settings' && (
            <div className="bg-[#161513] border border-[#C2A675]/30 rounded-xl p-8 space-y-6 max-w-3xl font-serif shadow-2xl">
              <div className="border-b border-stone-800 pb-4">
                <span className="oriental-seal text-xs py-0.5 px-2 border-[#C2A675] text-[#C2A675] mb-2">
                  權限控管
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                  <Sliders className="w-5 h-5 text-[#C2A675]" />
                  <span>系統權限與金流 API 設定 (System Settings)</span>
                </h2>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  管理綠界/藍新金流憑證、Cloudflare R2 雲端圖庫 Key 與多層級管理員權限。
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="bg-[#0D0C0B] p-5 rounded-xl border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-white text-sm text-[#C2A675] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Cloudflare R2 / AWS S3 雲端儲存配置
                  </h4>
                  <div><strong>Bucket Name：</strong><span className="font-mono text-stone-300">oriental-art-media-prod</span></div>
                  <div><strong>CDN 網址：</strong><span className="font-mono text-[#C2A675]">https://media.oriental-art.tw</span></div>
                </div>

                <div className="bg-[#0D0C0B] p-5 rounded-xl border border-stone-800 space-y-2">
                  <h4 className="font-serif font-bold text-white text-sm text-[#8C2D19] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> 綠界/藍新金流串接 API 密鑰 (Live)
                  </h4>
                  <div><strong>Merchant ID：</strong><span className="font-mono text-stone-300">3002199201</span></div>
                  <div><strong>HashKey：</strong><span className="font-mono text-stone-500">••••••••••••••••••••••••</span></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
