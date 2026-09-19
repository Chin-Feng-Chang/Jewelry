export interface ProductSpecs {
  origin: string; // 產地 / 泥料 / 種水
  dimensions: string; // 尺寸 / 容量
  weight: string; // 重量
  artist?: string; // 作者 / 工藝師
  certificateNo?: string; // 鑑定證書字號
  craftType?: string; // 工藝工序
  rarityLevel?: string; // 收藏等級
}

export interface Product {
  id: string;
  name: string;
  category: 'zisha' | 'jade' | 'amber';
  price: number;
  originalPrice?: number;
  code: string; // 孤品編號, e.g. #ZS-2026-088
  isUniquePiece: boolean; // 是否為一物一拍的孤品
  inStock: boolean;
  images: string[];
  videoUrl: string;
  specs: ProductSpecs;
  description: string;
  story?: string; // 藝品造物背景與名家生平
  careGuide?: string; // 養壺與保養說明
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAt: string;
}

export interface FilterState {
  category: string; // 'all' | 'zisha' | 'jade' | 'amber'
  material: string; // 泥料/種水: 'all' | 'zini' | 'zhuni' | 'duanni' | 'glass' | 'ice' | 'waxy' | 'blue' | 'blood'
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
