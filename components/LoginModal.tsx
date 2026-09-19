'use client';

import React, { useState } from 'react';
import { X, User, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-white max-w-md w-full rounded-xl overflow-hidden shadow-2xl z-10 border border-stone-200 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#262524]">
              尊榮藏家，歡迎回來
            </h3>
            <p className="text-xs text-[#73716B] font-sans">
              您已登入 VIP 藏家俱樂部，享有一物一拍優先保留與名家特展私密邀請權益。
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#8C2D19] text-white font-serif text-xs rounded shadow"
            >
              進入典藏展廳
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="oriental-seal mb-2">尊榮會籍</div>
              <h3 className="font-serif text-2xl font-bold text-[#262524]">
                藏家會員登入
              </h3>
              <p className="text-xs text-[#73716B] font-sans mt-1">
                請輸入手機號碼登入，即刻解鎖私密孤品與直播拍賣預約
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#262524] mb-1">
                  手機號碼 (Mobile Number)
                </label>
                <input
                  type="tel"
                  placeholder="0912-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-[#F7F6F2] border border-stone-300 rounded px-3 py-2.5 text-sm text-[#262524] focus:outline-none focus:border-[#8C2D19]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-[#262524] mb-1">
                  簡訊動態驗證碼 (SMS Code)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="請輸入 6 位數驗證碼"
                    defaultValue="888888"
                    className="flex-1 bg-[#F7F6F2] border border-stone-300 rounded px-3 py-2.5 text-sm text-[#262524] focus:outline-none focus:border-[#8C2D19]"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-[#262524] font-serif text-xs rounded"
                  >
                    發送驗證碼
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8C2D19] hover:bg-[#A3341D] text-white font-serif text-sm tracking-wider rounded shadow transition-colors font-bold border border-[#C2A675]/30"
              >
                登入 VIP 藏家會籍
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
