'use client';

import React, { useState } from 'react';
import { 
  Users, Eye, Clock, ShoppingCart, TrendingUp, TrendingDown, 
  Sparkles, Filter, Calendar, ExternalLink, ArrowUpRight 
} from 'lucide-react';
import { MOCK_TRAFFIC_SOURCES, MOCK_TOP_PRODUCT_ANALYTICS } from '../../data/adminMockData';

export const TrafficAnalyticsModule: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const KPI_METRICS = [
    {
      id: 'visitors',
      title: '總獨立訪客數 (Unique Visitors)',
      value: '43,400 人',
      change: '+18.4%',
      isPositive: true,
      sparkline: [35, 42, 38, 45, 40, 48, 52],
      color: '#8C2D19'
    },
    {
      id: 'views',
      title: '總瀏覽次數 (Page Views)',
      value: '186,520 次',
      change: '+22.1%',
      isPositive: true,
      sparkline: [120, 135, 140, 155, 160, 175, 186],
      color: '#C2A675'
    },
    {
      id: 'duration',
      title: '平均停留時間 (Avg Duration)',
      value: '4 分 38 秒',
      change: '+8.2%',
      isPositive: true,
      sparkline: [3.2, 3.8, 4.0, 4.2, 4.1, 4.5, 4.6],
      color: '#06C755'
    },
    {
      id: 'cartConv',
      title: '購物車意向轉換率 (Intent Conv)',
      value: '5.85 %',
      change: '-0.3%',
      isPositive: false,
      sparkline: [6.1, 6.0, 5.9, 5.8, 5.9, 5.8, 5.85],
      color: '#2563EB'
    }
  ];

  const filteredRanking = MOCK_TOP_PRODUCT_ANALYTICS.filter(
    item => categoryFilter === 'all' || item.category === categoryFilter
  );

  return (
    <div className="space-y-8 font-sans text-[#F7F6F2]">
      {/* 標題與時間選擇區 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C2A675]/20 pb-4">
        <div>
          <span className="oriental-seal text-xs py-0.5 px-2 bg-[#8C2D19] border-[#C2A675] text-[#F7F6F2] font-serif shadow-sm">
            行為大數據
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 tracking-wide">
            流量來源與商品瀏覽排行大數據分析
          </h1>
        </div>

        <div className="flex items-center bg-[#161513] p-1 rounded-lg border border-[#C2A675]/30 text-xs font-serif shadow-sm">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 rounded-md transition-all ${timeRange === 'today' ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
          >
            本日
          </button>
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1.5 rounded-md transition-all ${timeRange === '7days' ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
          >
            近 7 天
          </button>
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1.5 rounded-md transition-all ${timeRange === '30days' ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
          >
            近 30 天
          </button>
        </div>
      </div>

      {/* 1. 核心 KPI 指標卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_METRICS.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-[#161513] border border-[#C2A675]/20 hover:border-[#C2A675]/60 p-6 rounded-xl space-y-3 relative overflow-hidden shadow-xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-start text-xs font-serif text-stone-400">
              <span>{kpi.title}</span>
              <span className={`inline-flex items-center gap-1 font-mono font-bold ${kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {kpi.change}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#C2A675] transition-colors">
              {kpi.value}
            </div>

            {/* Sparkline */}
            <div className="h-10 w-full pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                <path
                  d={`M 0 ${30 - kpi.sparkline[0] * 0.4} ${kpi.sparkline.map((v, i) => `L ${(i / (kpi.sparkline.length - 1)) * 100} ${30 - v * 0.4}`).join(' ')}`}
                  fill="none"
                  stroke={kpi.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 2. 訪客流量來源佔比分析 */}
      <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C2A675]" />
              <span>訪客流量來源渠道與意向轉換佔比</span>
            </h3>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              即時統計 FB 直播導流、SEO 搜尋與 LINE 客戶專人諮詢量。
            </p>
          </div>
          <span className="gold-badge shadow-sm">
            FB 直播佔比居冠 (42.5%)
          </span>
        </div>

        {/* 視覺化進度條 */}
        <div className="w-full h-4 bg-[#0D0C0B] rounded-full overflow-hidden flex border border-stone-800 shadow-inner">
          {MOCK_TRAFFIC_SOURCES.map((src) => (
            <div
              key={src.source}
              style={{ width: `${src.percentage}%`, backgroundColor: src.color }}
              className="h-full transition-all duration-500 relative group"
              title={`${src.label}: ${src.percentage}%`}
            />
          ))}
        </div>

        {/* 渠道數據明細 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_TRAFFIC_SOURCES.map((src) => (
            <div key={src.source} className="bg-[#0D0C0B] border border-[#C2A675]/20 hover:border-[#C2A675]/50 p-4 rounded-xl space-y-2 transition-all">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: src.color }} />
                <span className="font-serif font-bold text-xs text-stone-200 truncate">{src.label}</span>
              </div>
              <div className="text-xl font-serif font-bold text-white">
                {src.visits.toLocaleString()} 人
              </div>
              <div className="flex justify-between text-[11px] text-stone-400 font-sans">
                <span>佔比: {src.percentage}%</span>
                <span className="text-[#C2A675] font-bold">轉換率 {src.conversionRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 前 20 名商品瀏覽與加車排行榜 */}
      <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">
              商品瀏覽與加車排行榜 (Top Viewed & Intent Ranking)
            </h3>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              顯示藏家瀏覽次數 (PV)、加入購物車次數與 LINE 品相諮詢點擊數據。
            </p>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#0D0C0B] border border-[#C2A675]/30 text-stone-200 rounded-lg px-3 py-1.5 text-xs font-serif focus:outline-none focus:border-[#C2A675]"
          >
            <option value="all">全部分類</option>
            <option value="zisha">宜興紫砂壺</option>
            <option value="jade">緬甸翡翠</option>
            <option value="amber">天然琥珀</option>
          </select>
        </div>

        {/* 數據排行榜表格 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-[#0D0C0B] text-[#C2A675] font-serif border-b border-stone-800">
              <tr>
                <th className="p-3">排名</th>
                <th className="p-3">藝品縮圖</th>
                <th className="p-3">SKU 編號 / 品名</th>
                <th className="p-3">分類</th>
                <th className="p-3">瀏覽次數 (PV)</th>
                <th className="p-3">加購物車次數</th>
                <th className="p-3">LINE 諮詢數</th>
                <th className="p-3">成交數量</th>
                <th className="p-3 text-right">綜合轉換率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredRanking.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[#22201D] transition-colors">
                  <td className="p-3 font-serif font-bold text-[#C2A675]">
                    #{idx + 1}
                  </td>
                  <td className="p-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded border border-stone-700" />
                  </td>
                  <td className="p-3">
                    <div className="font-mono text-[10px] text-[#C2A675]">#{item.sku}</div>
                    <div className="font-serif font-bold text-white text-xs">{item.name}</div>
                  </td>
                  <td className="p-3">
                    <span className="capitalize font-serif text-stone-300">
                      {item.category === 'zisha' ? '紫砂' : item.category === 'jade' ? '翡翠' : '琥珀'}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-stone-200">
                    {item.views.toLocaleString()} 次
                  </td>
                  <td className="p-3 font-mono text-[#C2A675] font-bold">
                    {item.cartAdds} 次
                  </td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">
                    {item.inquiries} 次
                  </td>
                  <td className="p-3 font-mono font-bold text-[#8C2D19]">
                    {item.salesCount} 件孤品
                  </td>
                  <td className="p-3 font-mono text-right font-bold text-emerald-400">
                    {item.conversionRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
