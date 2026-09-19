---
name: frontend-design
description: >-
  創建獨特、生產級且具備卓越設計品質的前端介面。當使用者要求建構 Web 元件、頁面、著陸頁、儀表板、React/Vue 元件、HTML/CSS 佈局，或美化/重構任何 Web UI 時使用此技能。生成富有創意、精緻且避免平庸 AI 美學的代碼與介面設計。
---

# Frontend Design Skill

此技能指導 AI 助手創建獨特且具備生產級水準的前端介面，避免平庸且重複的「AI 樣板」美學。注重實用且高效的代碼實現，同時高度關注美學細節、視覺層次與創意選擇。

## 適用時機 (When to Use)

當使用者發出以下需求時主動套用此技能：
- 建構 Web 元件、頁面或完整 Web 應用程式
- 創建產品著陸頁 (Landing Page)、儀表板 (Dashboard) 或行銷頁面
- 設計 React, Vue 或原生 HTML/CSS/JS 介面
- 美化、重構或重新設計現有的 Web UI
- 需要高品質視覺設計與獨特美學風格的前端專案

**核心關鍵字**: Web 元件、頁面、應用、網站、著陸頁、儀表板、React 元件、HTML/CSS、UI 設計、美化、前端樣式

---

## 核心設計原則

在編寫任何前端代碼之前，必須進行深入的設計思考。每個介面都應該是獨特、具備明確意圖且令人難忘的。

### 設計思考流程 (Design Thinking Process)

在實現代碼之前，先釐清以下四大維度：

#### 1. 目的與情境 (Purpose & Context)
- **核心問題**: 此介面解決什麼使用者痛點？
- **目標受眾**: 誰會使用它？在什麼情境下使用？
- **主要任務**: 使用者需要最順暢地完成什麼操作？

#### 2. 大膽風格方向 (Bold Style Direction)
選擇一個**明確且強烈**的美學風格，避免使用 generic/modern 這種模糊詞彙：

* **極簡主義 (Minimalism)**: 極度克制、大膽留白、精確排版與微妙質感。
* **復古未來主義 (Retro-Futurism)**: 霓虹色彩、網格背景、合成波 (Synthwave) 元素。
* **奢華與精緻 (Luxury & Elegance)**: 襯線字體、細緻金色/金屬點綴、深邃質感與高雅細節。
* **雜誌/編輯風格 (Editorial)**: 大膽的字體對比、巨型標題、非對稱網格。
* **賽博朋克 / 粗獷主義 (Brutalism / Cyberpunk)**: 高對比單色、高密度資訊、工業感、極硬邊框。
* **玻璃擬態 (Glassmorphism)**: 模糊背景 (Backdrop Blur)、半透明層次、微妙光影與流光。
* **新擬態 (Neumorphism)**: 柔和雙向陰影、浮雕質感、微妙深度。
* **有機自然 (Organic / Warm Nature)**: 流動曲面、柔和暖色調、大地色彩與親和力。

#### 3. 差異化與亮點 (Differentiation)
- **記憶點 (Hook)**: 什麼細節能讓使用者一眼記住？
- **微互動 (Micro-Interactions)**: 懸停、點擊或載入時是否有令人驚艷的視覺反饋？

---

## 前端美學與技術規範

### 1. 字體與排版 (Typography)

- ✅ **精選字體庫**: 標題選用具備獨特性格的字體（如 Google Fonts 的 *Outfit, Playfair Display, Space Grotesk, Syne* 等），內文選用高易讀性字體（如 *Inter, Plus Jakarta Sans, DM Sans*）。
- ✅ **層次與間距**: 控制 `letter-spacing` (字距) 與 `line-height` (行高)，運用 `font-weight` 建立鮮明的視覺層次。
- ❌ **避免通用樣板**: 不要預設使用 Arial、Helvetica 或沒有經過細緻調整的系統內建字體。

### 2. 色彩系統 (Color System)

- ✅ **主題變數**: 使用 CSS Custom Properties (`--color-primary`, `--color-accent` 等) 管理調色盤。
- ✅ **漸變與光影**: 使用雙色/多色漸變 (Gradients) 與質感陰影 (Layered Soft Shadows) 增加視覺深度。
- ✅ **對比與可存取性**: 確保色彩對比度符合 WCAG AA 標準（至少 4.5:1）。
- ❌ **避免套路色彩**: 不要盲目使用純白背景搭配預設紫/藍色漸變。

### 3. 動效與過渡 (Animation & Motion)

- ✅ **性能優先**: 優先使用 CSS `transform` 與 `opacity` 觸發 GPU 加速動畫。
- ✅ **進場與載入**: 使用 `animation-delay` 實現元素交錯登場 (Staggered Animations)。
- ✅ **微互動**: 為按鈕、卡片 hover 狀態加上流暢的 `cubic-bezier` 彈性過渡效果。
- ✅ **減弱動效支援**: 遵循 `prefers-reduced-motion` 媒體查詢以照顧敏感使用者。

### 4. 空間與佈局 (Spatial Layout)

- ✅ **網格與彈性**: 活用 CSS Grid 與 Flexbox 創建回應式 (Responsive) 佈局。
- ✅ **視覺節奏**: 混合使用寬鬆留白與精心控制的資訊密度，引導使用者視覺焦點。
- ✅ **流動回應**: 確保從行動裝置到大螢幕螢幕都有無縫的流動適應力。

---

## 驗證檢查清單 (Validation Checklist)

在交付前端代碼前，請自行評估：
1. **獨特性檢查**: 如果移除 Logo，這個介面是否依然具備辨識度？
2. **視覺震撼力**: 介面色彩、字體與細節是否能給使用者帶來驚艷感？
3. **響應與效能**: 在不同尺寸螢幕下是否有良好排版且動畫流暢無卡頓？
