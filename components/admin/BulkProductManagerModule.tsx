'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, Upload, CheckCircle2, AlertCircle, RefreshCw, 
  Trash2, Edit, Eye, Filter, Plus, ShieldCheck, Video, Image as ImageIcon,
  DollarSign, CheckSquare, Square
} from 'lucide-react';
import { Product } from '../../types/product';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { MOCK_BULK_IMPORT_RESULT } from '../../data/adminMockData';
import { BulkImportResult, BulkImportItem } from '../../types/admin';

export const BulkProductManagerModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'importer' | 'editor'>('list');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStock, setFilterStock] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [importResult, setImportResult] = useState<BulkImportResult>(MOCK_BULK_IMPORT_RESULT);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBatchMarkSoldOut = () => {
    if (selectedIds.length === 0) return alert('請先勾選欲操作之商品！');
    setProducts(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, inStock: false } : p));
    setSelectedIds([]);
    alert('已成功將勾選之孤品批次標記為已售完 (Sold Out)！');
  };

  const handleBatchPriceUpdate = () => {
    if (selectedIds.length === 0) return alert('請先勾選欲操作之商品！');
    const percent = prompt('請輸入批次調價百分比（例如 -10 代表 9 折，+5 代表調漲 5%）：', '-10');
    if (percent !== null) {
      const factor = 1 + Number(percent) / 100;
      setProducts(prev => prev.map(p => {
        if (selectedIds.includes(p.id)) {
          return { ...p, price: Math.round(p.price * factor) };
        }
        return p;
      }));
      setSelectedIds([]);
      alert(`已成功批次調整 ${selectedIds.length} 件孤品售價！`);
    }
  };

  const handleSimulateCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('CSV 批次解析與 Cloudflare R2 多媒體比對完成！');
    }, 1500);
  };

  const filteredProducts = products.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (filterStock === 'instock' && !p.inStock) return false;
    if (filterStock === 'soldout' && p.inStock) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-[#F7F6F2]">
      {/* 頁面標頭與子頁籤 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C2A675]/20 pb-4">
        <div>
          <span className="oriental-seal text-xs py-0.5 px-2 bg-[#8C2D19] border-[#C2A675] text-[#F7F6F2] font-serif shadow-sm">
            大數據管理 (2000+ SKU)
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            2,000+ 件傳世孤品批次匯入與庫存管理
          </h1>
        </div>

        <div className="flex items-center bg-[#161513] p-1 rounded-lg border border-[#C2A675]/30 text-xs font-serif shadow-sm">
          <button
            onClick={() => setActiveSubTab('list')}
            className={`px-4 py-2 rounded-md transition-all ${activeSubTab === 'list' ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
          >
            商品清單與批次操作
          </button>
          <button
            onClick={() => setActiveSubTab('importer')}
            className={`px-4 py-2 rounded-md transition-all ${activeSubTab === 'importer' ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
          >
            批次 CSV/S3 匯入工具
          </button>
        </div>
      </div>

      {/* SubTab: List */}
      {activeSubTab === 'list' && (
        <div className="space-y-6">
          {/* 工具控制列 */}
          <div className="bg-[#161513] border border-[#C2A675]/20 p-4 rounded-xl flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 shadow-xl">
            {/* 批次操作按鈕 */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 bg-[#22201D] hover:bg-stone-700 text-stone-200 text-xs font-serif rounded-lg transition-colors flex items-center gap-1.5 border border-stone-700"
              >
                {selectedIds.length === products.length ? <CheckSquare className="w-3.5 h-3.5 text-[#C2A675]" /> : <Square className="w-3.5 h-3.5" />}
                <span>{selectedIds.length === products.length ? '取消全選' : '全選項目'}</span>
              </button>

              <button
                onClick={handleBatchMarkSoldOut}
                disabled={selectedIds.length === 0}
                className="px-3 py-1.5 bg-[#22201D] hover:bg-stone-700 disabled:opacity-50 text-stone-200 text-xs font-serif rounded-lg transition-colors border border-stone-700"
              >
                批次標記已售完 ({selectedIds.length})
              </button>

              <button
                onClick={handleBatchPriceUpdate}
                disabled={selectedIds.length === 0}
                className="px-3 py-1.5 bg-[#8C2D19] hover:bg-[#A3341D] disabled:opacity-50 text-white text-xs font-serif rounded-lg transition-colors border border-[#C2A675]/40 flex items-center gap-1 shadow"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#C2A675]" />
                <span>批次更新售價 ({selectedIds.length})</span>
              </button>
            </div>

            {/* 篩選 */}
            <div className="flex items-center gap-3 text-xs font-serif">
              <select
                value={filterCategory}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#0D0C0B] border border-[#C2A675]/30 text-stone-200 rounded-lg px-3 py-1.5 focus:outline-none"
              >
                <option value="all">全部分類</option>
                <option value="zisha">紫砂壺</option>
                <option value="jade">翡翠</option>
                <option value="amber">琥珀</option>
              </select>

              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="bg-[#0D0C0B] border border-[#C2A675]/30 text-stone-200 rounded-lg px-3 py-1.5 focus:outline-none"
              >
                <option value="all">全部在庫狀態</option>
                <option value="instock">僅顯示在售</option>
                <option value="soldout">僅顯示已售完</option>
              </select>
            </div>
          </div>

          {/* 表格清單 */}
          <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#0D0C0B] text-[#C2A675] font-serif border-b border-stone-800">
                <tr>
                  <th className="p-3 w-10 text-center">勾選</th>
                  <th className="p-3">孤品主圖</th>
                  <th className="p-3">SKU 編號 / 品名</th>
                  <th className="p-3">類別 / 泥料產地</th>
                  <th className="p-3">典藏售價</th>
                  <th className="p-3">鑑定證書號</th>
                  <th className="p-3">在庫狀態</th>
                  <th className="p-3 text-right">編輯</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {filteredProducts.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`hover:bg-[#22201D] transition-colors ${isChecked ? 'bg-[#8C2D19]/10' : ''}`}>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(p.id)}
                          className="w-4 h-4 accent-[#8C2D19] rounded cursor-pointer"
                        />
                      </td>
                      <td className="p-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded border border-stone-700" />
                      </td>
                      <td className="p-3">
                        <div className="font-mono text-[10px] text-[#C2A675]">#{p.code}</div>
                        <div className="font-serif font-bold text-white text-xs">{p.name}</div>
                      </td>
                      <td className="p-3">
                        <span className="capitalize font-serif text-stone-300">{p.category}</span>
                        <div className="text-[10px] text-stone-500">{p.specs.origin}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-[#8C2D19]">
                        NT$ {p.price.toLocaleString()}
                      </td>
                      <td className="p-3 font-mono text-stone-400">
                        {p.specs.certificateNo || '權威鑑定'}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-serif font-bold ${p.inStock ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-[#0D0C0B] text-stone-500 border border-stone-800'}`}>
                          {p.inStock ? '在售孤品' : '已售完'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setActiveSubTab('editor');
                          }}
                          className="p-1.5 text-stone-300 hover:text-white bg-[#22201D] hover:bg-[#8C2D19] rounded transition-colors"
                          title="編輯"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#C2A675]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab: Importer */}
      {activeSubTab === 'importer' && (
        <div className="space-y-8">
          <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#C2A675]" />
                  <span>批次 CSV 上傳與 Cloudflare R2 / S3 預檢器 (Pre-flight Validator)</span>
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  支援 2,000+ 筆藝品規格檔批次匯入，自動檢驗 3 張細節圖與 1 支影片於雲端儲存空間之匹配狀態。
                </p>
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('已下載官方標準 CSV 匯入範本檔'); }}
                className="text-xs font-serif text-[#C2A675] hover:underline border border-[#C2A675]/40 px-3 py-1.5 rounded"
              >
                下載標準 CSV 範本檔
              </a>
            </div>

            {/* 拖拉區 */}
            <div className="border-2 border-dashed border-[#C2A675]/40 hover:border-[#C2A675] rounded-xl p-8 text-center bg-[#0D0C0B] transition-colors relative cursor-pointer">
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleSimulateCSVUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-12 h-12 text-[#C2A675] mx-auto mb-3" />
              <h4 className="font-serif font-bold text-white text-sm">
                點擊上傳或將 CSV 規格表拖曳至此處
              </h4>
              <p className="text-xs text-stone-400 font-sans mt-1">
                系統將自動進行「檔名預檢」、「欄位完整度」與「雲端 S3 圖片完整度」比對。
              </p>
              {isUploading && (
                <div className="mt-4 text-xs font-serif text-[#8C2D19] animate-pulse flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>正在解析 CSV 並對接 Cloudflare R2 雲端圖庫中...</span>
                </div>
              )}
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-[#0D0C0B] p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">解析總筆數</span>
                <div className="text-2xl font-serif font-bold text-white mt-1">
                  {importResult.totalRows.toLocaleString()} 筆
                </div>
              </div>

              <div className="bg-[#0D0C0B] p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">完全合格可上架</span>
                <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">
                  {importResult.validRows.toLocaleString()} 筆
                </div>
              </div>

              <div className="bg-[#0D0C0B] p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">欄位/規格錯誤</span>
                <div className="text-2xl font-serif font-bold text-rose-400 mt-1">
                  {importResult.errorRows} 筆
                </div>
              </div>

              <div className="bg-[#0D0C0B] p-4 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">S3 缺少圖片/影片檔</span>
                <div className="text-2xl font-serif font-bold text-[#8C2D19] mt-1">
                  {importResult.missingMediaCount} 筆標註警示
                </div>
              </div>
            </div>
          </div>

          {/* 明細比對 */}
          <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-4 shadow-xl">
            <h4 className="font-serif font-bold text-white text-base">
              Pre-flight 預檢詳細比對紀錄
            </h4>

            <div className="space-y-3 text-xs">
              {importResult.items.map((item) => (
                <div
                  key={item.rowNumber}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    item.imagesMatch && item.videoMatch
                      ? 'bg-[#0D0C0B] border-stone-800'
                      : 'bg-rose-950/20 border-rose-800/80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-stone-500">Row #{item.rowNumber}</span>
                      <span className="font-mono text-[#C2A675] font-bold">#{item.sku}</span>
                      <span className="font-serif font-bold text-white text-sm">{item.name}</span>
                      <span className="bg-[#22201D] text-stone-300 px-2 py-0.5 rounded text-[10px]">
                        {item.category}
                      </span>
                    </div>

                    {item.errors.length > 0 && (
                      <div className="text-rose-400 flex items-center gap-1 font-serif text-[11px] pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>警告原因：{item.errors.join('；')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded border ${item.imagesMatch ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800 font-bold'}`}>
                      <ImageIcon className="w-3 h-3" />
                      {item.imagesMatch ? 'S3 3張圖片匹配OK' : '圖片缺件'}
                    </span>

                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded border ${item.videoMatch ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'}`}>
                      <Video className="w-3 h-3" />
                      {item.videoMatch ? '影片匹配OK' : '缺少影片'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab: Editor */}
      {activeSubTab === 'editor' && editingProduct && (
        <div className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-stone-800 pb-4">
            <h3 className="font-serif font-bold text-lg text-white">
              編輯傳世孤品：{editingProduct.name} (#{editingProduct.code})
            </h3>
            <button onClick={() => setActiveSubTab('list')} className="text-xs font-serif text-stone-400 hover:text-white">
              ← 返回商品清單
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('已成功儲存此孤品數據與動態屬性！');
              setActiveSubTab('list');
            }}
            className="space-y-6 text-xs"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-400 mb-1 font-serif">孤品品名</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#0D0C0B] border border-stone-700 rounded-lg px-3 py-2 text-white font-serif font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-serif">典藏專屬售價 (NT$)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full bg-[#0D0C0B] border border-stone-700 rounded-lg px-3 py-2 text-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0D0C0B] p-4 rounded-xl border border-stone-800">
              <div>
                <label className="block text-[#C2A675] mb-1 font-serif font-bold">泥料 / 種水產地</label>
                <input
                  type="text"
                  value={editingProduct.specs.origin}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specs: { ...editingProduct.specs, origin: e.target.value } })}
                  className="w-full bg-[#161513] border border-stone-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#C2A675] mb-1 font-serif font-bold">作工大師</label>
                <input
                  type="text"
                  value={editingProduct.specs.artist || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specs: { ...editingProduct.specs, artist: e.target.value } })}
                  className="w-full bg-[#161513] border border-stone-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#C2A675] mb-1 font-serif font-bold">權威鑑定字號</label>
                <input
                  type="text"
                  value={editingProduct.specs.certificateNo || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specs: { ...editingProduct.specs, certificateNo: e.target.value } })}
                  className="w-full bg-[#161513] border border-stone-700 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1 font-serif">藝品詳細鑑賞說明</label>
              <textarea
                rows={4}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full bg-[#0D0C0B] border border-stone-700 rounded-lg p-3 text-white font-sans leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setActiveSubTab('list')}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg font-serif"
              >
                取消修改
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#8C2D19] text-white rounded-lg font-serif font-bold shadow border border-[#C2A675]/30"
              >
                儲存所有修改
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
