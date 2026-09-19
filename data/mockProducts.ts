import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'zs-001',
    name: '顧景舟款・原礦老紫泥仿古壺',
    category: 'zisha',
    price: 188000,
    originalPrice: 210000,
    code: 'ZS-2026-088',
    isUniquePiece: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-tea-from-a-teapot-43183-large.mp4',
    specs: {
      origin: '宜興黃龍山原礦老紫泥',
      dimensions: '容量 280cc / 長 14.2cm',
      weight: '310g',
      artist: '省級工藝美術大師・許逸民',
      certificateNo: 'YX-ZS-2026-9021A',
      craftType: '全手工拍打身筒、高溫還原燒製',
      rarityLevel: '名家孤品 / 典藏級'
    },
    description: '採宜興黃龍山四號井優質老紫泥，熟泥陳腐逾三十載。壺體骨肉亭勻，腹部飽滿舒展，線條簡練流暢。出水如柱，開壺後發茶性極佳，養成後呈明潤古璞之光澤。',
    story: '許逸民大師承襲國大師顧景舟一脈壺藝，歷時三個月手作而成。全壺未用任何模具輔助，壺蓋與壺口接縫嚴絲合縫，傾倒九十度而不落蓋，實乃紫砂壺中之神品。',
    careGuide: '【開壺指南】收到後請以溫水沖洗去微塵，再以沸水潤壺三次。建議定壺定茶，專壺專用（推薦沖洗熟普洱或老白茶），使茶油漸次滲入砂粒孔隙。',
    isFeatured: true
  },
  {
    id: 'jd-001',
    name: '緬甸老坑正陽綠玻璃種翡翠手鐲',
    category: 'jade',
    price: 368000,
    originalPrice: 398000,
    code: 'JD-2026-102',
    isUniquePiece: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475777-233cd7542488?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-sparkling-jewelry-41235-large.mp4',
    specs: {
      origin: '緬甸帕敢場口老坑料',
      dimensions: '圈口 56.5mm / 條寬 13.8mm / 厚度 8.2mm',
      weight: '62.4g',
      artist: '揭陽玉雕名家巨擘',
      certificateNo: 'GIA-JD-2026-88391',
      craftType: '手工圓條切割、頂級鏡面拋光',
      rarityLevel: '帝王珍藏級孤品'
    },
    description: '出自緬甸老坑帕敢場區，達到稀世玻璃種水。水頭足透，起瑩光且靈氣逼人。色彩呈現均勻濃郁之正陽綠，內部雪花棉微如晨霧，極具投資與傳家價值。',
    story: '本手鐲原料出自2021年緬甸翡翠公盤標王原石，經國家級玉雕大師歷時半年順紋琢磨而成。起瑩度高達98%，在微光下亦自發清透水光。',
    careGuide: '【保養須知】翡翠忌高溫與強酸鹼化學品。平時佩戴可由人體天然油脂滋養，若長期不佩戴，建議以純淨水浸泡半小時後，塗抹少許天然茶油密封保存。',
    isFeatured: true
  },
  {
    id: 'ab-001',
    name: '天然緬甸金藍珀・大顆粒圓珠手串',
    category: 'amber',
    price: 98000,
    originalPrice: 112000,
    code: 'AB-2026-055',
    isUniquePiece: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-amber-stones-41120-large.mp4',
    specs: {
      origin: '緬甸克欽邦天然礦區（一億年形成）',
      dimensions: '單珠直徑 18.5mm / 13顆',
      weight: '48.6g',
      artist: '緬甸琥珀傳承工坊',
      certificateNo: 'NGTC-AB-2026-7712',
      craftType: '全手工正圓磨珠、原礦正品',
      rarityLevel: '珍稀金藍珀 / 博物館級'
    },
    description: '自然光下呈現溫潤金黃琥珀光澤，在黑背景或日光紫光波長下展現極致高貴的天天空藍色。內部包體純淨無雜，蘊含千百萬年古老地質能量。',
    story: '緬甸琥珀是世界上最古老的琥珀品種之一，形成於白堊紀時期。金藍珀更是琥珀家族中最尊貴的品種，本手串每顆圓珠皆經過嚴格選料，色澤透度一氣呵成。',
    careGuide: '【保養須知】琥珀硬度較低，請避免與硬物碰撞摩擦。定期使用軟布蘸取少許橄欖油輕輕擦拭，可保持其金藍幽光的透明感。',
    isFeatured: true
  },
  {
    id: 'zs-002',
    name: '黃龍山本山段泥・西施壺',
    category: 'zisha',
    price: 68000,
    code: 'ZS-2026-042',
    isUniquePiece: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-tea-from-a-teapot-43183-large.mp4',
    specs: {
      origin: '宜興黃龍山本山段泥',
      dimensions: '容量 220cc',
      weight: '240g',
      artist: '高級工藝美術師・陳華',
      certificateNo: 'YX-ZS-2026-5510',
      craftType: '手工拍身筒'
    },
    description: '段泥顆粒質感分明，色呈米黃微溫潤，壺型宛若佳人，豐腴圓潤。泡飲綠茶或烏龍茶能完美襯托茶香清甜。',
    careGuide: '建議沖泡高香型烏龍茶或高山茶，切忌用深色黑茶開壺以防段泥吐黑。'
  },
  {
    id: 'jd-002',
    name: '冰種飄翠花・觀音法相翡翠掛件',
    category: 'jade',
    price: 158000,
    code: 'JD-2026-077',
    isUniquePiece: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-sparkling-jewelry-41235-large.mp4',
    specs: {
      origin: '緬甸莫西沙場口',
      dimensions: '長 58mm / 寬 36mm / 厚 7.5mm',
      weight: '34.2g',
      artist: '大師大巧玉雕作品',
      certificateNo: 'GIA-JD-2026-9912'
    },
    description: '玉質冰爽通透，靈動翠花隨意飄逸於觀音衣袂之間。觀音面相莊嚴慈悲，開臉線條洗練流暢，寓意平安祥和。'
  },
  {
    id: 'ab-002',
    name: '波羅的海天然血珀・蓮花靜心雕件',
    category: 'amber',
    price: 52000,
    code: 'AB-2026-031',
    isUniquePiece: true,
    inStock: false, // 售完孤品展示
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-amber-stones-41120-large.mp4',
    specs: {
      origin: '波羅的海海料原礦',
      dimensions: '高 45mm / 寬 32mm',
      weight: '21.5g',
      certificateNo: 'NGTC-AB-2026-1192'
    },
    description: '酒紅血珀晶瑩剔透，色如陳年紅酒般醇厚。精雕盛開蓮花，光線穿透時呈現絕美琥珀紅暈。目前已由台北藏家典藏售出。'
  }
];

export const LIVE_STREAM_DATA = {
  isLiveNow: true,
  title: '春泥溫潤・名家紫砂手作展與現場開壺鑑賞',
  streamer: '著名茶道名家・沈秋遠 老師',
  viewers: 1420,
  fbEmbedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_x5XG1OV2P6uZZ5FSM9Ttw',
  featuredProduct: MOCK_PRODUCTS[0],
  upcomingEvent: {
    title: '極致玻璃種・緬甸帕敢翡翠私密專場',
    startTime: '2026-09-22T20:00:00+08:00',
    description: '特邀揭陽大師親臨現場解說，展示2026年最新公盤標王高貨翡翠孤品。'
  }
};
