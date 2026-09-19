import { Product } from './product';

// 1. 流量來源模型 (Traffic Sources)
export interface TrafficSource {
  source: 'facebook_live' | 'google_seo' | 'line' | 'direct' | 'other';
  label: string;
  visits: number;
  percentage: number;
  conversionRate: number;
  color: string;
}

// 2. 商品瀏覽分析模型 (Product Analytics Item)
export interface ProductAnalyticsItem {
  id: string;
  sku: string;
  name: string;
  category: 'zisha' | 'jade' | 'amber';
  price: number;
  views: number; // 頁面瀏覽次數 PV
  cartAdds: number; // 加購物車次數
  inquiries: number; // LINE 品相諮詢點擊數
  salesCount: number; // 售出數量
  conversionRate: number; // 綜合轉換率 %
  image: string;
}

// 3. FB 直播排程與控台模型 (Live Event Config)
export interface LiveEventConfig {
  id: string;
  title: string;
  streamer: string;
  streamUrl: string; // FB Live 內嵌代碼或網址
  status: 'upcoming' | 'live' | 'ended';
  scheduledTime: string;
  featuredProductIds: string[]; // 關聯本場推薦商品 SKU/ID
  registeredUsersCount: number;
}

// 4. CSV/Excel 批次匯入預檢報告 (Bulk Import Result)
export interface BulkImportItem {
  rowNumber: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  videoUrl?: string;
  imagesMatch: boolean; // 是否成功比對 S3/R2 雲端圖片
  videoMatch: boolean; // 是否成功比對影片
  errors: string[];
}

export interface BulkImportResult {
  totalRows: number;
  validRows: number;
  errorRows: number;
  missingMediaCount: number;
  items: BulkImportItem[];
  progress: number;
}

// 5. 訂單與金流模型 (Admin Order)
export interface AdminOrder {
  id: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  totalAmount: number;
  depositAmount?: number; // 高單價預付定金
  remainingAmount?: number; // 面交/專車尾款
  paymentMethod: 'credit_card' | 'atm_virtual' | 'deposit_cash';
  paymentStatus: 'pending' | 'paid' | 'partial_deposit' | 'refunded';
  shippingStatus: 'preparing' | 'inspected' | 'shipped_in_transit' | 'delivered';
  certificateChecked: boolean; // 證書封箱複核標記
  insuranceTrackingNo?: string; // 全額保價物流單號
  ecpayTradeNo?: string; // 綠界/藍新交易序號
  createdAt: string;
}

// 6. 首頁 Hero 輪播活動排程 (Hero Banner Schedule)
export interface HeroBannerSchedule {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  targetLink: string;
  isActive: boolean;
  tag: string;
}
