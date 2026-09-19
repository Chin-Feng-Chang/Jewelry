'use client';

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { CartItem } from '../types/product';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 遮罩背景 */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* 抽屜標頭 */}
          <div className="p-6 bg-[#1A1918] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C2A675]" />
              <h2 className="font-serif text-lg font-bold tracking-wide">
                雅集典藏購物車
              </h2>
              <span className="text-xs bg-[#8C2D19] px-2 py-0.5 rounded text-stone-100 font-mono">
                {cartItems.length} 件
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 滿額免運/恆溫專車進度條 */}
          <div className="bg-[#F7F6F2] p-4 border-b border-stone-200 text-xs">
            <div className="flex justify-between items-center text-[#262524] font-serif font-bold mb-1.5">
              <span className="flex items-center gap-1 text-[#8C2D19]">
                <Sparkles className="w-3.5 h-3.5" /> 尊榮滿額恆溫專車運送
              </span>
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 已達滿額標準
                  </span>
                ) : (
                  <span>還差 NT$ {(freeShippingThreshold - subtotal).toLocaleString()}</span>
                )}
              </span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#C2A675] to-[#8C2D19] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 購物車商品列表 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-[#73716B]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#8C2D19]" />
                <p className="font-serif text-base font-bold text-[#262524]">
                  購物車內暫無選購藝品
                </p>
                <p className="text-xs font-sans mt-1">
                  挑選一件極致孤品，感受千百年歲月與匠心傳承。
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-[#F7F6F2] rounded-lg border border-stone-200 relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded border border-stone-300"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#262524] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-[#8C2D19] transition-colors p-1"
                          title="移除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#73716B] font-mono block">
                        #{item.product.code}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif font-bold text-sm text-[#8C2D19]">
                        NT$ {item.product.price.toLocaleString()}
                      </span>

                      {/* 孤品提示標記 */}
                      <span className="text-[10px] text-[#C2A675] font-serif border border-[#C2A675]/40 px-1.5 py-0.5 rounded">
                        一物一拍孤品
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* 孤品唯一性警示 */}
            {cartItems.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded text-amber-900 text-xs flex items-start gap-2 font-serif">
                <ShieldAlert className="w-4 h-4 text-[#8C2D19] shrink-0 mt-0.5" />
                <div>
                  <strong>孤品典藏提示：</strong>高單價藝品皆為唯一獨家孤品，請盡快完成結帳認購程序以確保保留權益。
                </div>
              </div>
            )}
          </div>

          {/* 底部金額小計與結帳區 */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
              <div className="space-y-1.5 text-xs font-serif text-[#73716B]">
                <div className="flex justify-between">
                  <span>小計 Subtotal</span>
                  <span className="font-bold text-[#262524]">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>專車安全保運服務</span>
                  <span className="text-emerald-700 font-bold">
                    {subtotal >= freeShippingThreshold ? '免運送費' : '待結帳計算'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#8C2D19] pt-2 border-t border-stone-200">
                  <span>總計 Total</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-sm tracking-widest rounded shadow-lg flex items-center justify-center gap-2 border border-[#C2A675]/40 transition-colors font-bold"
              >
                <span>前往結帳認購</span>
                <ArrowRight className="w-4 h-4 text-[#C2A675]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
