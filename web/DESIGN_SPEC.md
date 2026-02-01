# Timeless App - Design System Specification

> 完整的設計系統規範文件 - 科技霓虹風格健康追蹤應用

---

## 📱 品牌識別

### App 名稱
**Timeless**

### Slogan
- 🇺🇸 **英文**: Strive on your timeless journey
- 🇹🇼 **繁中**: 在你的永恆旅程中努力
- 🇨🇳 **簡中**: 在你的永恒旅程中努力
- 🇯🇵 **日文**: あなたの永遠の旅で努力する
- 🇰🇷 **韓文**: 당신의 영원한 여정에서 노력하세요

### 設計風格
- **主題**: 科技霓虹風格
- **氛圍**: 現代、未來感、活力
- **核心視覺**: 紫色調 + 發光效果 + 白色背景

---

## 🎨 色彩系統 (Color Palette)

### 主色調 - 科技紫 (Primary - Tech Purple)
用於主要操作、品牌識別

| 等級 | Hex Code | 用途 |
|------|----------|------|
| Primary 50 | `#f5f3ff` | 淺背景 |
| Primary 100 | `#ede9fe` | 淺背景 |
| Primary 200 | `#ddd6fe` | 邊框 |
| Primary 300 | `#c4b5fd` | Hover 狀態 |
| **Primary 400** | **`#a78bfa`** | **次要元素** |
| **Primary 500** | **`#8b5cf6`** | **主要使用** ⭐ |
| **Primary 600** | **`#7c3aed`** | **按鈕深色** |
| Primary 700 | `#6d28d9` | 深色強調 |
| Primary 800 | `#5b21b6` | 深色文字 |
| Primary 900 | `#4c1d95` | 最深背景 |

### 強調色 - 霓虹粉紫 (Accent - Neon Pink)
用於強調、通知、特殊狀態

| 等級 | Hex Code | 用途 |
|------|----------|------|
| Accent 50 | `#fdf4ff` | 淺背景 |
| Accent 100 | `#fae8ff` | 淺背景 |
| Accent 200 | `#f5d0fe` | 邊框 |
| Accent 300 | `#f0abfc` | Hover 狀態 |
| **Accent 400** | **`#e879f9`** | **主要使用** ⭐ |
| Accent 500 | `#d946ef` | 強調元素 |
| Accent 600 | `#c026d3` | 深色強調 |
| Accent 700 | `#a21caf` | 深色文字 |

### 輔助色 - 電光藍 (Secondary - Cyan)
用於輔助資訊、連結、次要操作

| 等級 | Hex Code | 用途 |
|------|----------|------|
| Secondary 50 | `#ecfeff` | 淺背景 |
| Secondary 100 | `#cffafe` | 淺背景 |
| Secondary 200 | `#a5f3fc` | 邊框 |
| Secondary 300 | `#67e8f9` | Hover 狀態 |
| **Secondary 400** | **`#22d3ee`** | **主要使用** ⭐ |
| Secondary 500 | `#06b6d4` | 深色元素 |
| Secondary 600 | `#0891b2` | 深色強調 |

### 中性色 (Neutral)
用於文字、邊框、背景

| 等級 | Hex Code | 用途 |
|------|----------|------|
| Neutral 50 | `#f8fafc` | 淺背景 |
| Neutral 100 | `#f1f5f9` | 卡片背景 |
| Neutral 200 | `#e2e8f0` | 邊框 |
| Neutral 300 | `#cbd5e1` | 分隔線 |
| Neutral 600 | `#475569` | 次要文字 |
| Neutral 700 | `#334155` | 主要文字 |
| Neutral 900 | `#0f172a` | 標題文字 |

---

## 🌈 漸層系統 (Gradients)

### Primary Gradient
```css
background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%);
```
**用途**: 主要按鈕、Hero Section

### Accent Gradient
```css
background: linear-gradient(135deg, #e879f9 0%, #d946ef 50%, #c026d3 100%);
```
**用途**: 特殊按鈕、強調區塊

### Secondary Gradient
```css
background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%);
```
**用途**: 輔助按鈕、資訊卡片

### Neon Gradient ⭐ (特色)
```css
background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #22d3ee 100%);
```
**用途**: 品牌特色元素、Hero Banner

### Tech Gradient
```css
background: linear-gradient(135deg, #6d28d9 0%, #a21caf 50%, #0891b2 100%);
```
**用途**: 深色模式、科技感背景

### Background Gradient
```css
background: linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #ecfeff 100%);
```
**用途**: 頁面背景、淺色區域

---

## ✨ 陰影 & 發光效果 (Shadows & Glows)

### 標準陰影
```css
/* Small */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Medium */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

/* Large */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

/* XL */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);

/* 2XL */
box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### 科技感發光效果 ⭐
```css
/* Glow */
box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);

/* Neon Purple */
box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 
            0 0 40px rgba(139, 92, 246, 0.3);

/* Neon Pink */
box-shadow: 0 0 20px rgba(217, 70, 239, 0.6), 
            0 0 40px rgba(217, 70, 239, 0.3);

/* Neon Cyan */
box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 
            0 0 40px rgba(34, 211, 238, 0.3);
```

**使用場景**: 懸停狀態、重要 CTA、品牌元素

---

## 📏 間距系統 (Spacing)

| Token | Value | Pixels | 使用場景 |
|-------|-------|--------|----------|
| `xs` | 0.25rem | 4px | 小間距、icon 邊距 |
| `sm` | 0.5rem | 8px | 元素內間距 |
| **`md`** | **1rem** | **16px** | **標準間距** ⭐ |
| `lg` | 1.5rem | 24px | 區塊間距 |
| `xl` | 2rem | 32px | 大區塊間距 |
| `2xl` | 3rem | 48px | Section 間距 |
| `3xl` | 4rem | 64px | 頁面間距 |

---

## 🔘 圓角系統 (Border Radius)

| Token | Value | Pixels | 使用場景 |
|-------|-------|--------|----------|
| `none` | 0 | 0px | 方形元素 |
| `sm` | 0.375rem | 6px | 小元素 |
| `md` | 0.5rem | 8px | 輸入框 |
| `lg` | 0.75rem | 12px | 小卡片 |
| `xl` | 1rem | 16px | 中卡片 |
| **`2xl`** | **1.5rem** | **24px** | **大卡片** ⭐ |
| `3xl` | 1.75rem | 28px | iOS Icon 標準 |
| **`full`** | **9999px** | **圓形** | **按鈕、頭像** ⭐ |

---

## 🔤 字體系統 (Typography)

### 字體大小 (Font Size)

| Token | Value | Pixels | 使用場景 |
|-------|-------|--------|----------|
| `xs` | 0.75rem | 12px | 輔助文字、註解 |
| `sm` | 0.875rem | 14px | 次要文字 |
| **`base`** | **1rem** | **16px** | **正文** ⭐ |
| `lg` | 1.125rem | 18px | 小標題 |
| `xl` | 1.25rem | 20px | 標題 |
| `2xl` | 1.5rem | 24px | 大標題 |
| `3xl` | 1.875rem | 30px | 頁面標題 |
| `4xl` | 2.25rem | 36px | Hero 標題 |

### 字重 (Font Weight)

| Token | Value | 使用場景 |
|-------|-------|----------|
| `normal` | 400 | 正文 |
| **`medium`** | **500** | **按鈕、次要標題** ⭐ |
| `semibold` | 600 | 標題 |
| `bold` | 700 | 重要標題 |

### 行高建議
- 正文: `1.5` (150%)
- 標題: `1.2` (120%)
- 按鈕: `1` (100%)

---

## 🧩 元件規範 (Component Specs)

### Button (按鈕)

#### Variants (變體)

**1. Primary Button**
```css
background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%);
color: white;
border-radius: 9999px;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```
- 用途: 主要操作（登入、提交、確認）
- 每個頁面最多 1 個

**2. Secondary Button**
```css
background: transparent;
color: #8b5cf6;
border: 2px solid #8b5cf6;
border-radius: 9999px;
```
- 用途: 次要操作（取消、跳過）

**3. Outline Button**
```css
background: transparent;
color: #475569;
border: 1px solid #cbd5e1;
border-radius: 9999px;
```
- 用途: 第三優先操作

**4. Ghost Button**
```css
background: transparent;
color: #8b5cf6;
border: none;
```
- 用途: 文字連結式操作

#### Sizes (尺寸)

| Size | Padding | Font Size | 使用場景 |
|------|---------|-----------|----------|
| Small | `py-2 px-4` | 14px | 表單、卡片內 |
| **Medium** | **`py-3 px-6`** | **16px** | **標準** ⭐ |
| Large | `py-4 px-8` | 18px | Hero、CTA |

#### States (狀態)

- **Normal**: 預設狀態
- **Hover**: `opacity: 0.9` + 發光效果
- **Active**: `scale: 0.98`
- **Disabled**: `opacity: 0.5` + `cursor: not-allowed`
- **Loading**: 顯示 spinner + 禁用點擊

---

### Card (卡片)

#### 標準樣式
```css
background: white;
border-radius: 1.5rem; /* 24px */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
padding: 1.5rem; /* 24px */
```

#### Padding Variants

| Size | Value | 使用場景 |
|------|-------|----------|
| Small | `1rem` (16px) | 小資訊卡 |
| **Medium** | **`1.5rem` (24px)** | **標準** ⭐ |
| Large | `2rem` (32px) | 大內容區 |

---

### Input (輸入框)

#### 標準樣式
```css
border: 2px solid #e2e8f0;
border-radius: 0.75rem; /* 12px */
padding: 0.75rem 1rem;
font-size: 1rem;
transition: border-color 0.3s;
```

#### States
- **Normal**: `border-color: #e2e8f0`
- **Focus**: `border-color: #8b5cf6` + `outline: none`
- **Error**: `border-color: #ef4444`
- **Disabled**: `background: #f1f5f9` + `opacity: 0.6`

---

## 📱 App Icon 規範

### iOS 尺寸標準

| 裝置 | 尺寸 | 用途 |
|------|------|------|
| iPhone @2x | 120×120 px | iPhone 標準 |
| **iPhone @3x** | **180×180 px** | **最常用** ⭐ |
| iPad @2x | 152×152 px | iPad 標準 |
| iPad Pro | 167×167 px | iPad Pro |
| App Store | 1024×1024 px | 商店展示 |

**圓角**: 28px (`border-radius: 1.75rem`)

### Android 尺寸標準

| 密度 | 尺寸 | 用途 |
|------|------|------|
| mdpi | 48×48 px | 低密度 |
| hdpi | 72×72 px | 中密度 |
| xhdpi | 96×96 px | 高密度 |
| xxhdpi | 144×144 px | 超高密度 |
| **xxxhdpi** | **192×192 px** | **最常用** ⭐ |

**形狀**: 圓形 (`border-radius: 50%`)

### Icon 設計準則
- ✅ 使用漸層增加立體感
- ✅ 保持簡潔，避免細節過多
- ✅ 確保在小尺寸下可識別
- ✅ 背景透明或純色
- ✅ 中心圖形佔 60-70% 空間

---

## ⏱️ 動畫規範 (Animation)

### 時長 (Duration)

| Token | Value | 使用場景 |
|-------|-------|----------|
| `fast` | 150ms | Hover 效果 |
| **`normal`** | **300ms** | **標準過渡** ⭐ |
| `slow` | 500ms | 頁面切換 |

### 緩動函數 (Easing)

```css
/* 預設 */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* In */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

/* Out */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* In-Out */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

### 常用動畫

**淡入淡出**
```css
transition: opacity 300ms ease;
```

**滑動進入**
```css
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(0);
```

**縮放**
```css
transition: transform 150ms ease;
transform: scale(0.98); /* Active */
```

**發光效果**
```css
transition: box-shadow 300ms ease;
box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); /* Hover */
```

---

## 🌐 多語言支援

### 支援語言
- 🇹🇼 繁體中文 (zh-TW)
- 🇨🇳 簡體中文 (zh-CN)
- 🇺🇸 英文 (en)
- 🇯🇵 日文 (ja)
- 🇰🇷 韓文 (ko)

### 翻譯檔案
位置: `/src/app/utils/i18n.ts`

### 文字長度考量
- 英文通常最短
- 中文次之
- 日文、韓文較長
- 設計時預留 1.5 倍空間

---

## 📐 版面配置 (Layout)

### 最大寬度
```css
max-width: 448px; /* 28rem, mobile-first */
max-width: 672px; /* 42rem, tablet */
max-width: 1536px; /* 96rem, desktop */
```

### 內容間距
- 頁面左右: `1.5rem` (24px)
- 頁面上下: `4rem` (64px)
- Section 間距: `3rem` (48px)
- 元素間距: `1rem` (16px)

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (min-width: 768px)

/* Desktop */
@media (min-width: 1024px)
```

---

## 🎯 使用指南

### 如何使用 Design Tokens

```typescript
import { tokens } from './src/app/design-system/tokens';

// 使用顏色
const primaryColor = tokens.colors.primary[500];

// 使用漸層
const gradient = tokens.gradients.neon;

// 使用間距
const padding = tokens.spacing.lg;

// 使用陰影
const shadow = tokens.shadows.neonPurple;
```

### 如何使用 Components

```typescript
import { Button } from './src/app/design-system/components/Button';
import { Card } from './src/app/design-system/components/Card';

function MyApp() {
  return (
    <Card title="我的卡片" padding="lg">
      <Button variant="primary" size="md">
        主要操作
      </Button>
      <Button variant="secondary" size="md">
        次要操作
      </Button>
    </Card>
  );
}
```

---

## 🎨 設計檢查清單

### ✅ 顏色使用
- [ ] 主要操作使用 Primary 色
- [ ] 強調元素使用 Accent 色
- [ ] 連結使用 Secondary 色
- [ ] 文字使用 Neutral 色
- [ ] 避免使用純黑 (#000) 和純白背景

### ✅ 間距一致性
- [ ] 使用 Design Token 定義的間距
- [ ] 保持垂直韻律一致
- [ ] 元素之間留白充足

### ✅ 字體階層
- [ ] 標題使用 semibold/bold
- [ ] 正文使用 normal/medium
- [ ] 輔助文字使用 xs/sm 尺寸

### ✅ 互動反饋
- [ ] Hover 狀態明顯
- [ ] Loading 狀態清晰
- [ ] 錯誤訊息易讀
- [ ] 動畫流暢不卡頓

### ✅ 可訪問性
- [ ] 顏色對比度 ≥ 4.5:1
- [ ] 按鈕最小尺寸 44×44 px
- [ ] 支援鍵盤操作
- [ ] 提供替代文字

---

## 📦 資源輸出

### Figma 外掛建議
- **Stark** - 對比度檢查
- **Figmotion** - 動畫原型
- **Iconify** - Icon 庫

### 設計交付物
- [ ] Design Tokens (JSON/CSS)
- [ ] Component Library (Figma)
- [ ] App Icons (All sizes)
- [ ] Style Guide (PDF)
- [ ] Interactive Prototype

---

## 🔗 相關檔案

| 檔案 | 路徑 | 說明 |
|------|------|------|
| Design Tokens | `/src/app/design-system/tokens.ts` | 完整 Token 定義 |
| 設計系統頁面 | `/src/app/pages/DesignSystem.tsx` | 視覺化展示 |
| 翻譯檔 | `/src/app/utils/i18n.ts` | 多語言支援 |
| 按鈕元件 | `/src/app/design-system/components/Button.tsx` | Button 實作 |
| 卡片元件 | `/src/app/design-system/components/Card.tsx` | Card 實作 |

---

## 📝 版本紀錄

| 版本 | 日期 | 更新內容 |
|------|------|----------|
| 1.0.0 | 2024-12-18 | 初版發布 - 完整設計系統 |

---

**Made with 💜 for Timeless App**

> 這份文件是活的，會隨著產品演進持續更新。如有任何問題或建議，歡迎提出！
