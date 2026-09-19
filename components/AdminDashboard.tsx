'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Radio, ShoppingCart, Users, Plus, 
  Search, Edit, Trash2, CheckCircle2, AlertCircle, TrendingUp, 
  DollarSign, ArrowLeft, Video, Eye, ShieldCheck
} from 'lucide-react';
import { Product } from '../types/product';
import { MOCK_PRODUCTS, LIVE_STREAM_DATA } from '../data/mockProducts';

interface AdminDashboardProps {
  onBackToStore?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'live' | 'orders'>('overview');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [liveConfig, setLiveConfig] = useState(LIVE_STREAM_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  // 新增商品彈窗狀態
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'zisha',
    price: 100000,
    code: 'ZS-2026-999',
    isUniquePiece: true,
    inStock: true,
    images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop'],
    specs: {
      origin: '宜興原礦老紫泥',
      dimensions: '容量 250cc',
      weight: '280g',
      artist: '名家大師',
      certificateNo: 'NGTC-2026-999'
    },
    description: '經典全手工藝術孤品'
  });

  // 營運數據指標
  const totalSales = 1288000;
  const totalOrders = 8;
  const uniqueItemsCount = products.filter(p => p.isUniquePiece).length;
  const inStockCount = products.filter(p => p.inStock).length;

  const handleToggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('確定要下架並刪除此項典藏孤品嗎？')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `custom-${Date.now()}`,
      name: newProduct.name || '未命名藝術品',
      category: (newProduct.category as any) || 'zisha',
      price: Number(newProduct.price) || 88000,
      code: newProduct.code || `ZS-${Date.now().toString().slice(-4)}`,
      isUniquePiece: true,
      inStock: true,
      images: newProduct.images || ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop'],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-tea-from-a-teapot-43183-large.mp4',
      specs: newProduct.specs as any,
      description: newProduct.description || '典藏孤品'
    };
    setProducts([created, ...products]);
    setIsAddProductOpen(false);
    alert('已成功新增並上架新孤品！');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans flex flex-col md:flex-row">
      {/* 左側後台側邊選單 Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1918] border-r border-stone-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo 標頭 */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="oriental-seal text-xs py-0.5 px-2 border-[#C2A675] text-[#C2A675]">
                管理後台
              </span>
              <span className="font-serif font-bold text-lg text-white tracking-widest">
                雅集控台
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono block">
              Oriental Luxury Art Admin v1.0
            </span>
          </div>

          {/* 導覽功能項目 */}
          <nav className="space-y-1.5 font-serif text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#8C2D19] text-white font-bold shadow'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#C2A675]" />
              <span>營運數據總覽</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'products'
                  ? 'bg-[#8C2D19] text-white font-bold shadow'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 text-[#C2A675]" />
              <span>孤品藝品管理</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'live'
                  ? 'bg-[#8C2D19] text-white font-bold shadow'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-[#8C2D19] animate-pulse" />
              <span>FB 直播控台</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#8C2D19] text-white font-bold shadow'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-[#C2A675]" />
              <span>藏家訂單與專車</span>
            </button>
          </nav>
        </div>

        {/* 返回前台按鈕 */}
        <div className="pt-6 border-t border-stone-800">
          {onBackToStore ? (
            <button
              onClick={onBackToStore}
              className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif rounded transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-[#C2A675]" />
              <span>返回前台網站</span>
            </button>
          ) : (
            <a
              href="/"
              className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif rounded transition-colors flex items-center justify-center gap-2 block text-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#C2A675]" />
              <span>返回前台展廳</span>
            </a>
          )}
        </div>
      </aside>

      {/* 主內容區 Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* 1. 營運數據總覽 (Overview) */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                雅集典藏管理後台儀表板
              </h1>
              <p className="text-xs text-stone-400 font-sans mt-1">
                即時監控高單價孤品銷售金額、庫存轉換率與 FB 直播效益。
              </p>
            </div>

            {/* 四大 KPI 數據卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-lg">
                <div className="flex justify-between items-center text-stone-400 text-xs font-serif">
                  <span>本月總成交金額 (GMV)</span>
                  <DollarSign className="w-4 h-4 text-[#C2A675]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C2A675] mt-2">
                  NT$ {totalSales.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-400 font-sans mt-1 block">
                  ↑ 較上月增長 +24.8%
                </span>
              </div>

              <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-lg">
                <div className="flex justify-between items-center text-stone-400 text-xs font-serif">
                  <span>典藏認購訂單數</span>
                  <ShoppingCart className="w-4 h-4 text-[#8C2D19]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                  {totalOrders} 筆孤品
                </div>
                <span className="text-[10px] text-stone-400 font-sans mt-1 block">
                  平均客單價 NT$ 161,000
                </span>
              </div>

              <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-lg">
                <div className="flex justify-between items-center text-stone-400 text-xs font-serif">
                  <span>在庫在售孤品</span>
                  <Package className="w-4 h-4 text-[#C2A675]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 mt-2">
                  {inStockCount} 件在售
                </div>
                <span className="text-[10px] text-stone-400 font-sans mt-1 block">
                  已售完 {products.length - inStockCount} 件孤品
                </span>
              </div>

              <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-lg">
                <div className="flex justify-between items-center text-stone-400 text-xs font-serif">
                  <span>FB 直播在線觀看人數</span>
                  <Users className="w-4 h-4 text-[#8C2D19]" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                  1,428 人
                </div>
                <span className="text-[10px] text-emerald-400 font-sans mt-1 block">
                  ● 直播專題進行中
                </span>
              </div>
            </div>

            {/* 即時銷售動態與最新認購訂單 */}
            <div className="bg-stone-800/80 border border-stone-700 rounded-lg p-6">
              <h3 className="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C2A675]" />
                <span>最新孤品認購動態與專車送達狀態</span>
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  { time: '10 分鐘前', customer: '台北張藏家', item: '顧景舟款・原礦老紫泥仿古壺', price: 188000, status: '恆溫專車安排中' },
                  { time: '1 小時前', customer: '台中陳大師', item: '緬甸老坑正陽綠玻璃種翡翠手鐲', price: 368000, status: '專人親送出發' },
                  { time: '3 小時前', customer: '高雄高雄企業家', item: '天然緬甸金藍珀手串', price: 98000, status: '已送達完成簽收' }
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-stone-900 rounded border border-stone-700">
                    <div className="flex items-center gap-3">
                      <span className="text-stone-500 font-mono">{row.time}</span>
                      <span className="font-bold text-white">{row.customer}</span>
                      <span className="text-[#C2A675]">{row.item}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[#8C2D19] font-bold">NT$ {row.price.toLocaleString()}</span>
                      <span className="bg-stone-800 text-emerald-400 px-2.5 py-1 rounded text-[10px]">
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. 孤品藝品管理 (Products Management) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-800 pb-4">
              <div>
                <h1 className="font-serif text-2xl font-bold text-white">孤品藝品庫存與上架管理</h1>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  管理紫砂壺、翡翠與琥珀之一物一拍孤品編號與鑑定證書號。
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2.5 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-xs rounded shadow flex items-center gap-2 border border-[#C2A675]/30 font-bold"
              >
                <Plus className="w-4 h-4 text-[#C2A675]" />
                <span>新增孤品藝品</span>
              </button>
            </div>

            {/* 商品表格 */}
            <div className="bg-stone-800/80 border border-stone-700 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-900 text-[#C2A675] font-serif border-b border-stone-700">
                  <tr>
                    <th className="p-4">孤品主圖</th>
                    <th className="p-4">編號 / 品名</th>
                    <th className="p-4">類別 / 泥料產地</th>
                    <th className="p-4">典藏售價</th>
                    <th className="p-4">鑑定證書號</th>
                    <th className="p-4">在庫狀態</th>
                    <th className="p-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-700/40">
                      <td className="p-4">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded border border-stone-600" />
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-[10px] text-[#C2A675]">#{p.code}</div>
                        <div className="font-serif font-bold text-white text-sm">{p.name}</div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize text-stone-400">{p.category}</span>
                        <div className="text-[10px] text-stone-500">{p.specs.origin}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-[#8C2D19]">
                        NT$ {p.price.toLocaleString()}
                      </td>
                      <td className="p-4 font-mono text-stone-400">
                        {p.specs.certificateNo || '已鑑定'}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          className={`px-2.5 py-1 rounded text-[10px] font-serif font-bold transition-colors ${
                            p.inStock
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                              : 'bg-stone-900 text-stone-500 border border-stone-700'
                          }`}
                        >
                          {p.inStock ? '在售中 (In Stock)' : '已售完 (Sold Out)'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-stone-900 rounded"
                          title="下架刪除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. FB 直播控台 (Live Control Center) */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#8C2D19] animate-pulse" />
                <span>FB 直播專區中控台</span>
              </h1>
              <p className="text-xs text-stone-400 font-sans mt-1">
                即時切換前台直播狀態（直播中 / 預告模式）與設定本場主推拍賣商品。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 控制開關 */}
              <div className="bg-stone-800/80 p-6 rounded-lg border border-stone-700 space-y-4">
                <h3 className="font-serif font-bold text-white">前台展示狀態設定</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLiveConfig(prev => ({ ...prev, isLiveNow: true }))}
                    className={`flex-1 py-3 px-4 rounded font-serif text-xs font-bold transition-colors border ${
                      liveConfig.isLiveNow
                        ? 'bg-[#8C2D19] text-white border-[#C2A675]'
                        : 'bg-stone-900 text-stone-400 border-stone-700'
                    }`}
                  >
                    切換為：直播中 (LIVE NOW)
                  </button>

                  <button
                    onClick={() => setLiveConfig(prev => ({ ...prev, isLiveNow: false }))}
                    className={`flex-1 py-3 px-4 rounded font-serif text-xs font-bold transition-colors border ${
                      !liveConfig.isLiveNow
                        ? 'bg-[#C2A675] text-[#1A1918] border-[#C2A675]'
                        : 'bg-stone-900 text-stone-400 border-stone-700'
                    }`}
                  >
                    切換為：直播預告與倒數
                  </button>
                </div>

                <div className="pt-4 border-t border-stone-700 space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-400 mb-1">直播專題名稱</label>
                    <input
                      type="text"
                      value={liveConfig.title}
                      onChange={(e) => setLiveConfig({ ...liveConfig, title: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">主講大師與主講人</label>
                    <input
                      type="text"
                      value={liveConfig.streamer}
                      onChange={(e) => setLiveConfig({ ...liveConfig, streamer: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 本場主推孤品設定 */}
              <div className="bg-stone-800/80 p-6 rounded-lg border border-stone-700 space-y-4">
                <h3 className="font-serif font-bold text-white">本場直播主推孤品設定</h3>
                <div className="flex items-center gap-4 p-3 bg-stone-900 rounded border border-stone-700">
                  <img src={liveConfig.featuredProduct.images[0]} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <span className="text-[10px] text-[#C2A675]">#{liveConfig.featuredProduct.code}</span>
                    <h4 className="font-serif font-bold text-white text-sm">{liveConfig.featuredProduct.name}</h4>
                    <span className="font-serif font-bold text-[#8C2D19] text-xs">NT$ {liveConfig.featuredProduct.price.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">更換本場主推孤品</label>
                  <select
                    onChange={(e) => {
                      const found = products.find(p => p.id === e.target.value);
                      if (found) setLiveConfig({ ...liveConfig, featuredProduct: found });
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-xs text-white"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        #{p.code} - {p.name} (NT$ {p.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. 藏家訂單 (Orders) */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h1 className="font-serif text-2xl font-bold text-white">藏家訂單與恆溫專車送達紀錄</h1>
              <p className="text-xs text-stone-400 font-sans mt-1">
                所有滿金額孤品皆由專人與專車全程保價遞送。
              </p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 rounded-lg p-6 space-y-4">
              {[
                { orderNo: 'ORD-2026-0881', date: '2026-09-19 18:20', customer: '台北張藏家', item: '顧景舟款・原礦老紫泥仿古壺', price: 188000, status: '專車配送中', line: '已確認時間' },
                { orderNo: 'ORD-2026-0882', date: '2026-09-19 16:45', customer: '台中陳董事長', item: '緬甸老坑正陽綠玻璃種翡翠手鐲', price: 368000, status: '包裝保價中', line: '已加 LINE' }
              ].map((ord, idx) => (
                <div key={idx} className="p-4 bg-stone-900 rounded border border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#C2A675] font-bold">{ord.orderNo}</span>
                      <span className="text-xs text-stone-400">{ord.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-white text-base mt-1">{ord.item}</h4>
                    <span className="text-xs text-stone-400">買家：{ord.customer} | 專人一對一諮詢狀態：{ord.line}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-[#8C2D19] block">
                      NT$ {ord.price.toLocaleString()}
                    </span>
                    <span className="inline-block mt-1 px-3 py-1 bg-emerald-900/60 text-emerald-300 text-xs rounded border border-emerald-500/40">
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 新增孤品彈窗 Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddProductOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <form onSubmit={handleAddProductSubmit} className="relative bg-stone-900 border border-stone-700 rounded-xl p-6 max-w-lg w-full space-y-4 z-10 text-xs">
            <h3 className="font-serif font-bold text-lg text-[#C2A675]">新增傳世孤品藝品</h3>

            <div>
              <label className="block text-stone-400 mb-1">孤品名稱</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-400 mb-1">藝品類別</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white"
                >
                  <option value="zisha">宜興紫砂</option>
                  <option value="jade">緬甸翡翠</option>
                  <option value="amber">天然琥珀</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">典藏價格 (NT$)</label>
                <input
                  type="number"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-400 mb-1">孤品編號</label>
                <input
                  type="text"
                  value={newProduct.code}
                  onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">鑑定證書號</label>
                <input
                  type="text"
                  value={newProduct.specs?.certificateNo}
                  onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs!, certificateNo: e.target.value } })}
                  className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">泥料 / 種水產地</label>
              <input
                type="text"
                value={newProduct.specs?.origin}
                onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs!, origin: e.target.value } })}
                className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded hover:bg-stone-700"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#8C2D19] text-white rounded font-serif font-bold shadow"
              >
                確認新增並上架
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
