'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { FBLiveSection } from '../components/FBLiveSection';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { TrustSection } from '../components/TrustSection';
import { CatalogView } from '../components/CatalogView';
import { ProductDetailView } from '../components/ProductDetailView';
import { CartDrawer } from '../components/CartDrawer';
import { QuickViewModal } from '../components/QuickViewModal';
import { SearchModal } from '../components/SearchModal';
import { LoginModal } from '../components/LoginModal';
import { Footer } from '../components/Footer';

import { MOCK_PRODUCTS, LIVE_STREAM_DATA } from '../data/mockProducts';
import { Product, CartItem } from '../types/product';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'detail'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 購物車與彈窗狀態
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1, selectedAt: new Date().toISOString() }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 加購物車處理
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedAt: new Date().toISOString() }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // 點擊類別
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 點擊商品查看詳情
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 立即結帳
  const handleCheckoutNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      {/* 導覽列 */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          if (cat === 'all' && currentView === 'home') return;
          handleSelectCategory(cat);
        }}
      />

      {/* 視圖切換 */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 首頁 Hero 行銷輪播 */}
            <HeroBanner onExploreClick={() => handleSelectCategory('all')} />

            {/* FB 直播專區 */}
            <FBLiveSection
              featuredProduct={LIVE_STREAM_DATA.featuredProduct}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 三大主題分類 */}
            <CategorySection onSelectCategory={handleSelectCategory} />

            {/* 熱門典藏榜 */}
            <FeaturedProducts
              products={MOCK_PRODUCTS.filter((p) => p.isFeatured || p.inStock)}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onProductClick={handleProductClick}
            />

            {/* 品牌信任背書 */}
            <TrustSection />
          </>
        )}

        {currentView === 'catalog' && (
          <CatalogView
            products={MOCK_PRODUCTS}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onProductClick={handleProductClick}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentView('catalog')}
            onCheckoutNow={handleCheckoutNow}
          />
        )}
      </main>

      {/* 全站頁尾 */}
      <Footer />

      {/* 側邊購物車抽屜 */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert('感謝您的認購！已為您將高單價孤品保留，即將引導至專人全額保價結帳頁面。');
          setIsCartOpen(false);
        }}
      />

      {/* 快速預覽彈窗 */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={(p) => {
          setQuickViewProduct(null);
          handleProductClick(p);
        }}
      />

      {/* 搜尋彈窗 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={MOCK_PRODUCTS}
        onSelectProduct={handleProductClick}
      />

      {/* 登入彈窗 */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}
