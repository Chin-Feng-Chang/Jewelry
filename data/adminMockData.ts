import { 
  TrafficSource, ProductAnalyticsItem, BulkImportResult, 
  AdminOrder, HeroBannerSchedule, LiveEventConfig 
} from '../types/admin';
import { MOCK_PRODUCTS } from './mockProducts';

// 1. 流量來源佔比
export const MOCK_TRAFFIC_SOURCES: TrafficSource[] = [
  { source: 'facebook_live', label: 'FB 直播導流 (Live & UTM)', visits: 18450, percentage: 42.5, conversionRate: 4.8, color: '#8C2D19' },
  { source: 'google_seo', label: 'Google 自然搜尋 (SEO)', visits: 11200, percentage: 25.8, conversionRate: 3.2, color: '#C2A675' },
  { source: 'line', label: 'LINE 官方帳號諮詢', visits: 7800, percentage: 18.0, conversionRate: 6.5, color: '#06C755' },
  { source: 'direct', label: '直接訪問 (老藏家)', visits: 4100, percentage: 9.4, conversionRate: 8.2, color: '#2563EB' },
  { source: 'other', label: '外部媒體與推薦', visits: 1850, percentage: 4.3, conversionRate: 1.9, color: '#73716B' }
];

// 2. 前 20 名熱門商品瀏覽與加車排行榜
export const MOCK_TOP_PRODUCT_ANALYTICS: ProductAnalyticsItem[] = [
  {
    id: 'zs-001',
    sku: 'ZS-2026-088',
    name: '顧景舟款・原礦老紫泥仿古壺',
    category: 'zisha',
    price: 188000,
    views: 4820,
    cartAdds: 312,
    inquiries: 145,
    salesCount: 1,
    conversionRate: 6.47,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'jd-001',
    sku: 'JD-2026-102',
    name: '緬甸老坑正陽綠玻璃種翡翠手鐲',
    category: 'jade',
    price: 368000,
    views: 3950,
    cartAdds: 218,
    inquiries: 189,
    salesCount: 1,
    conversionRate: 5.52,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ab-001',
    sku: 'AB-2026-055',
    name: '天然緬甸金藍珀・大顆粒圓珠手串',
    category: 'amber',
    price: 98000,
    views: 3110,
    cartAdds: 184,
    inquiries: 92,
    salesCount: 2,
    conversionRate: 5.91,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'zs-002',
    sku: 'ZS-2026-042',
    name: '黃龍山本山段泥・西施壺',
    category: 'zisha',
    price: 68000,
    views: 2840,
    cartAdds: 156,
    inquiries: 64,
    salesCount: 3,
    conversionRate: 5.49,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'jd-002',
    sku: 'JD-2026-077',
    name: '冰種飄翠花・觀音法相翡翠掛件',
    category: 'jade',
    price: 158000,
    views: 2450,
    cartAdds: 122,
    inquiries: 78,
    salesCount: 1,
    conversionRate: 4.98,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ab-002',
    sku: 'AB-2026-031',
    name: '波羅的海天然血珀・蓮花靜心雕件',
    category: 'amber',
    price: 52000,
    views: 2190,
    cartAdds: 98,
    inquiries: 45,
    salesCount: 1,
    conversionRate: 4.47,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=400&auto=format&fit=crop'
  }
];

// 3. 模擬 2,000+ 件批次匯入預檢結果
export const MOCK_BULK_IMPORT_RESULT: BulkImportResult = {
  totalRows: 2450,
  validRows: 2412,
  errorRows: 38,
  missingMediaCount: 14,
  progress: 100,
  items: [
    {
      rowNumber: 1,
      sku: 'ZS-2026-2001',
      name: '原礦朱泥大彬提梁壺',
      category: '紫砂',
      price: 158000,
      images: ['zs2001_1.jpg', 'zs2001_2.jpg', 'zs2001_3.jpg'],
      videoUrl: 'zs2001_video.mp4',
      imagesMatch: true,
      videoMatch: true,
      errors: []
    },
    {
      rowNumber: 2,
      sku: 'JD-2026-3012',
      name: '木那雪花棉滿綠帝王玉佩',
      category: '翡翠',
      price: 480000,
      images: ['jd3012_1.jpg', 'jd3012_2.jpg'],
      videoUrl: '',
      imagesMatch: false,
      videoMatch: false,
      errors: ['雲端 R2 缺少第 3 張細節圖', '缺少鑑賞短影片檔']
    },
    {
      rowNumber: 3,
      sku: 'AB-2026-1044',
      name: '緬甸多彩血蜜珀植物蟲珀',
      category: '琥珀',
      price: 125000,
      images: ['ab1044_1.jpg', 'ab1044_2.jpg', 'ab1044_3.jpg'],
      videoUrl: 'ab1044_video.mp4',
      imagesMatch: true,
      videoMatch: true,
      errors: []
    }
  ]
};

// 4. 訂單與高單價保險物流清單
export const MOCK_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNo: 'ORD-2026-0919-01',
    customerName: '台北張國強 董事長',
    customerPhone: '0912-345-678',
    customerCity: '台北市大安區',
    items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }],
    totalAmount: 188000,
    depositAmount: 50000,
    remainingAmount: 138000,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    shippingStatus: 'inspected',
    certificateChecked: true,
    insuranceTrackingNo: 'TAI-SEC-889021',
    ecpayTradeNo: 'ECP-20260919-8812',
    createdAt: '2026-09-19 14:30'
  },
  {
    id: 'ord-102',
    orderNo: 'ORD-2026-0919-02',
    customerName: '台中陳淑芬 女士',
    customerPhone: '0933-888-999',
    customerCity: '台中市七期重劃區',
    items: [{ product: MOCK_PRODUCTS[1], quantity: 1 }],
    totalAmount: 368000,
    paymentMethod: 'deposit_cash',
    paymentStatus: 'partial_deposit',
    shippingStatus: 'preparing',
    certificateChecked: true,
    insuranceTrackingNo: 'TAI-SEC-990112',
    ecpayTradeNo: 'ATM-20260919-7712',
    createdAt: '2026-09-19 16:15'
  }
];

// 5. 首頁 Hero 輪播活動排程
export const MOCK_HERO_SCHEDULES: HeroBannerSchedule[] = [
  {
    id: 'hero-1',
    title: '春泥溫潤・名家紫砂手作展',
    subtitle: '宜興黃龍山原礦老泥・國大師一脈全手工孤品典藏',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    targetLink: '/catalog?cat=zisha',
    isActive: true,
    tag: '一物一拍・限時私藏'
  },
  {
    id: 'hero-2',
    title: '冰透澄澈・緬甸老坑翡翠極品展',
    subtitle: '翡翠公盤標王原石特裁・老坑玻璃種正陽綠傳家寶手鐲',
    startDate: '2026-09-20',
    endDate: '2026-10-30',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    targetLink: '/catalog?cat=jade',
    isActive: true,
    tag: 'GIA & 國家雙證書'
  }
];

// 6. FB 直播排程與控台
export const MOCK_LIVE_EVENTS: LiveEventConfig[] = [
  {
    id: 'live-1',
    title: '春泥溫潤・名家紫砂手作展與現場開壺鑑賞',
    streamer: '著名茶道名家・沈秋遠 老師',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&controls=1&loop=1',
    status: 'live',
    scheduledTime: '2026-09-19T20:00:00+08:00',
    featuredProductIds: ['zs-001', 'jd-001'],
    registeredUsersCount: 1428
  },
  {
    id: 'live-2',
    title: '極致玻璃種・緬甸帕敢翡翠私密專場',
    streamer: '揭陽大師・林大巧 老師',
    streamUrl: '',
    status: 'upcoming',
    scheduledTime: '2026-09-22T20:00:00+08:00',
    featuredProductIds: ['jd-001', 'jd-002'],
    registeredUsersCount: 890
  }
];
