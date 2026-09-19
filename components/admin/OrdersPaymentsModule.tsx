'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart, ShieldCheck, Truck, CreditCard, DollarSign, 
  CheckCircle2, Clock, AlertTriangle, FileCheck, ExternalLink, Filter, Sparkles 
} from 'lucide-react';
import { MOCK_ADMIN_ORDERS } from '../../data/adminMockData';
import { AdminOrder } from '../../types/admin';

export const OrdersPaymentsModule: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ADMIN_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackingModalOrder, setTrackingModalOrder] = useState<AdminOrder | null>(null);
  const [trackingNoInput, setTrackingNoInput] = useState('');

  const handleToggleCertCheck = (id: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === id) {
        const nextState = !ord.certificateChecked;
        alert(nextState ? `已核對並確認【${ord.orderNo}】證書與封箱鋼印！` : `取消【${ord.orderNo}】證書封箱確認。`);
        return { ...ord, certificateChecked: nextState };
      }
      return ord;
    }));
  };

  const handleSaveTrackingNo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModalOrder) return;
    setOrders(prev => prev.map(ord => {
      if (ord.id === trackingModalOrder.id) {
        return {
          ...ord,
          insuranceTrackingNo: trackingNoInput,
          shippingStatus: 'shipped_in_transit'
        };
      }
      return ord;
    }));
    setTrackingModalOrder(null);
    alert('已成功填寫保險物流單號並發送簡訊通知買家！');
  };

  const filteredOrders = orders.filter(ord => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'paid' && ord.paymentStatus === 'paid') return true;
    if (statusFilter === 'deposit' && ord.paymentStatus === 'partial_deposit') return true;
    if (statusFilter === 'shipped' && ord.shippingStatus === 'shipped_in_transit') return true;
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-[#F7F6F2]">
      {/* 標頭 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C2A675]/20 pb-4">
        <div>
          <span className="oriental-seal text-xs py-0.5 px-2 bg-[#8C2D19] border-[#C2A675] text-[#F7F6F2] font-serif shadow-sm">
            高單價專車保運
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            藏家訂單金流與保險專車送達管理
          </h1>
        </div>

        {/* 狀態過濾 */}
        <div className="flex items-center gap-2 bg-[#161513] p-1 rounded-lg border border-[#C2A675]/30 text-xs font-serif shadow-sm">
          {[
            { id: 'all', label: '全部訂單' },
            { id: 'paid', label: '全額已付' },
            { id: 'deposit', label: '定金/面交尾款' },
            { id: 'shipped', label: '保險專車運送中' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-md transition-all ${statusFilter === st.id ? 'bg-[#8C2D19] text-white font-bold shadow' : 'text-stone-400 hover:text-white'}`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 訂單清單 */}
      <div className="space-y-6">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="bg-[#161513] border border-[#C2A675]/20 rounded-xl p-6 space-y-6 shadow-xl relative overflow-hidden"
          >
            {/* 訂單頂部 */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#C2A675] font-bold">
                    #{ord.orderNo}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    建立時間：{ord.createdAt}
                  </span>
                  {ord.ecpayTradeNo && (
                    <span className="text-[10px] bg-[#0D0C0B] text-stone-400 px-2.5 py-0.5 rounded font-mono border border-stone-800">
                      綠界交易序號 {ord.ecpayTradeNo}
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-white text-lg mt-1">
                  買家：{ord.customerName} ({ord.customerPhone}) ｜ {ord.customerCity}
                </h3>
              </div>

              {/* 價格 */}
              <div className="text-right">
                <span className="text-xs text-stone-400 font-serif block">總訂單金額</span>
                <span className="text-2xl font-serif font-bold text-[#8C2D19]">
                  NT$ {ord.totalAmount.toLocaleString()}
                </span>
                {ord.depositAmount && (
                  <span className="text-xs text-[#C2A675] font-serif block mt-0.5">
                    (已付定金 NT$ {ord.depositAmount.toLocaleString()} ｜ 面交尾款 NT$ {ord.remainingAmount?.toLocaleString()})
                  </span>
                )}
              </div>
            </div>

            {/* 品項與檢核區 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* 7 欄品項 */}
              <div className="lg:col-span-7 space-y-3">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#0D0C0B] p-3 rounded-xl border border-stone-800">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded border border-stone-700" />
                    <div className="flex-1">
                      <div className="font-mono text-[10px] text-[#C2A675]">#{item.product.code}</div>
                      <h4 className="font-serif font-bold text-white text-sm">{item.product.name}</h4>
                      <span className="text-xs text-stone-400 font-sans">【{item.product.specs.origin}】</span>
                    </div>
                    <span className="font-serif font-bold text-[#8C2D19] text-sm">
                      NT$ {item.product.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* 5 欄檢核區 */}
              <div className="lg:col-span-5 bg-[#0D0C0B] p-4 rounded-xl border border-stone-800 space-y-4 text-xs font-serif">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className={`w-4 h-4 ${ord.certificateChecked ? 'text-emerald-400' : 'text-stone-500'}`} />
                    <span>權威證書與防偽鋼印封箱檢核：</span>
                  </div>

                  <button
                    onClick={() => handleToggleCertCheck(ord.id)}
                    className={`px-3 py-1 rounded-md text-xs transition-colors border font-bold ${
                      ord.certificateChecked
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {ord.certificateChecked ? '已完成複核 ✓' : '待檢核標記'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[11px]">全額保價專車物流單號：</span>
                    <span className="font-mono text-sm text-[#C2A675] font-bold">
                      {ord.insuranceTrackingNo || '尚未填寫單號'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setTrackingModalOrder(ord);
                      setTrackingNoInput(ord.insuranceTrackingNo || '');
                    }}
                    className="px-3 py-1.5 bg-[#8C2D19] hover:bg-[#A3341D] text-white rounded-lg text-xs transition-colors flex items-center gap-1 shadow border border-[#C2A675]/30"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#C2A675]" />
                    <span>{ord.insuranceTrackingNo ? '修改物流單號' : '回填保險單號'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 物流單號 Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setTrackingModalOrder(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <form onSubmit={handleSaveTrackingNo} className="relative bg-[#161513] border border-[#C2A675]/40 rounded-xl p-6 max-w-md w-full space-y-4 z-10 text-xs font-serif shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-white">
              回填專車保險物流單號 ({trackingModalOrder.orderNo})
            </h3>
            <p className="text-stone-400 font-sans">
              請輸入全額保價安保物流單號，儲存後將自動傳送出貨通知至買家手機。
            </p>

            <div>
              <label className="block text-[#C2A675] mb-1 font-bold">保險單號 (Insurance Tracking No)</label>
              <input
                type="text"
                required
                placeholder="例如：TAI-SEC-889099"
                value={trackingNoInput}
                onChange={(e) => setTrackingNoInput(e.target.value)}
                className="w-full bg-[#0D0C0B] border border-stone-700 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#8C2D19] text-white rounded-lg font-bold shadow border border-[#C2A675]/30"
              >
                確認出貨並發送簡訊
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
