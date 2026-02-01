# Timeless App - Complete Technical Specification

> 完整的技術開發規格 - 為 AI Editor 準備的詳細文檔

**Project**: Timeless Health Tracking App  
**Version**: 1.0.0  
**Last Updated**: 2024-12-18  
**Tech Stack**: React 18.3.1 + TypeScript + Tailwind CSS 4.1.12 + Vite 6.3.5

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Dependencies](#tech-stack--dependencies)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Component API Reference](#component-api-reference)
6. [Data Models & Types](#data-models--types)
7. [i18n Implementation](#i18n-implementation)
8. [Page Specifications](#page-specifications)
9. [Development Guidelines](#development-guidelines)
10. [Build & Deployment](#build--deployment)

---

## 🎯 Project Overview

### App Description
**Timeless** 是一款現代化的健康追蹤應用，採用科技霓虹風格設計，支援多語言（繁中、簡中、英文、日文、韓文），並根據 iOS/Android 平台自動調整 UI 風格。

### Brand Identity
- **App Name**: Timeless
- **Slogan**: 
  - 🇺🇸 EN: "Strive on your timeless journey"
  - 🇹🇼 ZH-TW: "在你的永恆旅程中努力"
  - 🇨🇳 ZH-CN: "在你的永恒旅程中努力"
  - 🇯🇵 JA: "あなたの永遠の旅で努力する"
  - 🇰🇷 KO: "당신의 영원한 여정에서 노력하세요"

### Design Style
- **主題**: 科技霓虹風格（Tech Neon）
- **主色**: 科技紫 `#8b5cf6`
- **強調色**: 霓虹粉紫 `#e879f9`
- **輔助色**: 電光藍 `#22d3ee`
- **背景**: 白色 + 淺色漸層
- **特效**: 發光效果（Glow Effects）

---

## 🛠️ Tech Stack & Dependencies

### Core Framework
```json
{
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "vite": "6.3.5",
  "tailwindcss": "4.1.12",
  "@tailwindcss/vite": "4.1.12"
}
```

### UI Libraries
```json
{
  "@radix-ui/react-*": "^1.x.x - 2.x.x",  // 完整的 Radix UI 元件庫
  "@mui/material": "7.3.5",                // Material UI
  "@mui/icons-material": "7.3.5",          // Material Icons
  "lucide-react": "0.487.0",               // Lucide Icons
  "class-variance-authority": "0.7.1",     // CVA for variants
  "clsx": "2.1.1",                         // Classname utilities
  "tailwind-merge": "3.2.0"                // Tailwind class merging
}
```

### Animation & Motion
```json
{
  "motion": "12.23.24"  // Motion (Framer Motion 的新版本)
}
```

### Form Management
```json
{
  "react-hook-form": "7.55.0"
}
```

### Additional Libraries
```json
{
  "recharts": "2.15.2",                    // Charts
  "react-slick": "0.31.0",                 // Carousel
  "react-responsive-masonry": "2.7.1",     // Masonry grid
  "react-dnd": "16.0.1",                   // Drag & Drop
  "react-dnd-html5-backend": "16.0.1",
  "sonner": "2.0.3",                       // Toast notifications
  "@react-oauth/google": "^0.12.2"         // Google OAuth
}
```

### Development Tools
```json
{
  "@vitejs/plugin-react": "4.7.0"
}
```

---

## 📁 Project Structure

```
timeless-app/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── DESIGN_SPEC.md           # 設計規範文件
├── TECHNICAL_SPEC.md        # 技術規範文件（本文件）
│
├── src/
│   ├── app/
│   │   ├── App.tsx          # 主要入口元件
│   │   │
│   │   ├── components/      # 共用元件
│   │   │   ├── ui/          # shadcn/ui 元件庫
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── carousel.tsx
│   │   │   │   ├── chart.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   └── utils.ts
│   │   │   │
│   │   │   ├── figma/       # Figma 專用元件（受保護）
│   │   │   │   └── ImageWithFallback.tsx  # 不可修改
│   │   │   │
│   │   │   ├── TimelessIcon.tsx     # App Logo Icon
│   │   │   ├── FitnessIcon.tsx      # 健康圖示
│   │   │   └── YogaIcon.tsx         # 瑜伽圖示
│   │   │
│   │   ├── design-system/   # 設計系統
│   │   │   ├── tokens.ts    # Design Tokens
│   │   │   └── components/  # 設計系統元件
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── IconCard.tsx
│   │   │       ├── ColorSwatch.tsx
│   │   │       └── GradientSwatch.tsx
│   │   │
│   │   ├── pages/           # 頁面元件
│   │   │   ├── LoginFlowI18n.tsx      # 登入流程（主要）
│   │   │   ├── LoginFlowNative.tsx    # 原生風格登入流程
│   │   │   ├── LoginFlow.tsx          # 原始登入流程
│   │   │   ├── LoginNative.tsx        # 原生風格登入頁
│   │   │   └── DesignSystem.tsx       # 設計系統展示頁
│   │   │
│   │   ├── utils/           # 工具函數
│   │   │   └── i18n.ts      # 多語言翻譯
│   │   │
│   │   └── config/          # 設定檔
│   │       └── healthGoals.ts  # 健康目標資料（CMS 模擬）
│   │
│   └── styles/              # 全域樣式
│       ├── fonts.css        # 字體引入
│       └── theme.css        # 主題設定（Tailwind v4）
│
└── public/                  # 靜態資源
    └── (圖片、SVG 等)
```

### 檔案命名規範
- **元件**: PascalCase (e.g., `Button.tsx`, `LoginFlow.tsx`)
- **工具**: camelCase (e.g., `i18n.ts`, `tokens.ts`)
- **樣式**: kebab-case (e.g., `theme.css`, `fonts.css`)

---

## 🎨 Design System

### Design Tokens Location
**檔案**: `/src/app/design-system/tokens.ts`

### Token Structure

#### 1. Colors
```typescript
export const tokens = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',  // ⭐ 主要使用
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',  // ⭐ 主要使用
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
    },
    secondary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',  // ⭐ 主要使用
      500: '#06b6d4',
      600: '#0891b2',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      600: '#475569',
      700: '#334155',
      900: '#0f172a',
    },
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%)',
    accent: 'linear-gradient(135deg, #e879f9 0%, #d946ef 50%, #c026d3 100%)',
    secondary: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)',
    neon: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #22d3ee 100%)',  // ⭐ 特色
    tech: 'linear-gradient(135deg, #6d28d9 0%, #a21caf 50%, #0891b2 100%)',
    background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #ecfeff 100%)',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    
    // 發光效果 ⭐
    glow: '0 0 30px rgba(139, 92, 246, 0.5)',
    neonPurple: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)',
    neonPink: '0 0 20px rgba(217, 70, 239, 0.6), 0 0 40px rgba(217, 70, 239, 0.3)',
    neonCyan: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3)',
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px ⭐
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px ⭐
    '3xl': '1.75rem',// 28px (iOS Icon)
    full: '9999px',  // 圓形 ⭐
  },
  
  animation: {
    fast: '150ms',
    normal: '300ms',  // ⭐
    slow: '500ms',
  },
};
```

### Tailwind CSS Class Mapping

| Token | Tailwind Class | 值 |
|-------|----------------|-----|
| `colors.primary.500` | `bg-violet-600` | #8b5cf6 |
| `colors.accent.400` | `bg-fuchsia-400` | #e879f9 |
| `colors.secondary.400` | `bg-cyan-400` | #22d3ee |
| `spacing.md` | `p-4` | 16px |
| `spacing.lg` | `p-6` | 24px |
| `borderRadius.2xl` | `rounded-2xl` | 24px |
| `borderRadius.full` | `rounded-full` | 圓形 |
| `shadows.lg` | `shadow-lg` | 大陰影 |

---

## 📦 Component API Reference

### Button Component

**檔案**: `/src/app/design-system/components/Button.tsx`

#### Interface
```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}
```

#### Variants

**1. Primary** (預設)
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  主要按鈕
</Button>
```
- **樣式**: `bg-violet-600 text-white hover:bg-violet-700 shadow-md`
- **用途**: 主要操作（登入、提交）
- **規則**: 每頁最多 1 個

**2. Secondary**
```tsx
<Button variant="secondary" size="md">
  次要按鈕
</Button>
```
- **樣式**: `bg-pink-500 text-white hover:bg-pink-600 shadow-md`
- **用途**: 次要操作

**3. Outline**
```tsx
<Button variant="outline" size="md">
  外框按鈕
</Button>
```
- **樣式**: `border-2 border-violet-600 text-violet-600 hover:bg-violet-50`
- **用途**: 第三優先操作（取消、跳過）

**4. Ghost**
```tsx
<Button variant="ghost" size="sm">
  文字按鈕
</Button>
```
- **樣式**: `text-slate-600 hover:bg-slate-100`
- **用途**: 文字連結式操作

#### Sizes

| Size | Padding | Font Size | Tailwind Class |
|------|---------|-----------|----------------|
| `sm` | 16px/8px | 14px | `px-4 py-2 text-sm` |
| **`md`** ⭐ | **24px/10px** | **16px** | **`px-6 py-2.5 text-base`** |
| `lg` | 32px/12px | 18px | `px-8 py-3 text-lg` |

#### Complete Code
```tsx
// /src/app/design-system/components/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg',
    secondary: 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
```

---

### Card Component

**檔案**: `/src/app/design-system/components/Card.tsx`

#### Interface
```typescript
interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}
```

#### Padding Variants

| Size | Padding | Tailwind Class | 用途 |
|------|---------|----------------|------|
| `sm` | 16px | `p-4` | 小資訊卡 |
| **`md`** ⭐ | **24px** | **`p-6`** | **標準卡片** |
| `lg` | 32px | `p-8` | 大內容區 |

#### Usage
```tsx
<Card title="標題" padding="md">
  <p>卡片內容</p>
</Card>
```

#### Complete Code
```tsx
// /src/app/design-system/components/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, title, className = '', padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg ${paddings[padding]} ${className}`}>
      {title && <h3 className="text-slate-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
}
```

---

### IconCard Component

**檔案**: `/src/app/design-system/components/IconCard.tsx`

#### Interface
```typescript
interface IconCardProps {
  children: ReactNode;      // Icon SVG 內容
  size?: number;            // Icon 尺寸（預設 80）
  variant?: 'ios' | 'android';  // 平台風格
  className?: string;
}
```

#### Variants

**iOS Style**
- **圓角**: `rounded-[1.75rem]` (28px) - iOS 標準
- **尺寸**: 120×120 (@2x), 180×180 (@3x) ⭐

**Android Style**
- **圓角**: `rounded-full` (圓形)
- **尺寸**: 144×144 (xxhdpi), 192×192 (xxxhdpi) ⭐

#### Usage
```tsx
// iOS Icon
<IconCard variant="ios" size={180}>
  <svg>...</svg>
</IconCard>

// Android Icon
<IconCard variant="android" size={192}>
  <svg>...</svg>
</IconCard>
```

---

### ColorSwatch Component

**檔案**: `/src/app/design-system/components/ColorSwatch.tsx`

#### Interface
```typescript
interface ColorSwatchProps {
  color: string;   // Hex color code
  name: string;    // 顏色名稱
  value: string;   // 顏色數值（顯示用）
}
```

#### Usage
```tsx
<ColorSwatch 
  color="#8b5cf6" 
  name="Primary 500" 
  value="#8b5cf6"
/>
```

---

### GradientSwatch Component

**檔案**: `/src/app/design-system/components/GradientSwatch.tsx`

#### Interface
```typescript
interface GradientSwatchProps {
  gradient: string;  // CSS gradient string
  name: string;      // 漸層名稱
}
```

#### Usage
```tsx
<GradientSwatch 
  gradient="linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #22d3ee 100%)" 
  name="Neon Gradient"
/>
```

---

## 📊 Data Models & Types

### Language Type
**檔案**: `/src/app/utils/i18n.ts`

```typescript
export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';
```

### Translation Structure
```typescript
export const translations: Record<Language, TranslationKeys> = {
  'zh-TW': { /* ... */ },
  'zh-CN': { /* ... */ },
  'en': { /* ... */ },
  'ja': { /* ... */ },
  'ko': { /* ... */ },
};

interface TranslationKeys {
  // 登入頁面
  appName: string;
  tagline: string;
  continueWithApple: string;
  continueWithGoogle: string;
  continueWithEmail: string;
  loggingIn: string;
  or: string;
  termsAndPrivacy: string;
  terms: string;
  and: string;
  privacy: string;
  
  // 歡迎頁面
  welcomeTitle: string;        // 支援 {name} placeholder
  loginSuccess: string;
  welcomeMessage: string;
  continue: string;
  
  // 生物辨識頁面
  enableFaceID: string;
  enableFingerprint: string;
  biometricDescription: string;  // 支援 {type} placeholder
  biometricDescriptionShort: string;
  faceID: string;
  fingerprint: string;
  quickLogin: string;
  quickLoginDesc: string;
  highSecurity: string;
  highSecurityDesc: string;
  flexibleControl: string;
  flexibleControlDesc: string;
  securityNote: string;
  enableBiometric: string;
  skipForNow: string;
  setupLater: string;
  skipSetup: string;
  setting: string;
  
  // 個人資料頁面
  setupProfile: string;
  setupProfileDesc: string;
  setupGoals: string;
  age: string;
  ageExample: string;
  weight: string;
  weightExample: string;
  healthGoal: string;
  healthyChoice: string;
  healthyChoiceDesc: string;
  chooseGoal: string;
  loseWeight: string;
  gainMuscle: string;
  stayHealthy: string;
  improvePerformance: string;
  betterSleep: string;
  reduceStress: string;
  dailySteps: string;
  stepsExample: string;
  completeSetup: string;
  setupLaterButton: string;
  
  // 完成頁面
  allSet: string;
  allSetMessage: string;        // 支援 {name} placeholder
  allSetMessageShort: string;
  biometricEnabled: string;     // 支援 {type} placeholder
  startUsing: string;
  start: string;
  
  // 通用
  hi: string;
  ready: string;
}
```

### Health Goal Type
**檔案**: `/src/app/config/healthGoals.ts`

```typescript
export interface HealthGoal {
  id: string;
  icon: string;    // Emoji icon
  label: {
    'zh-TW': string;
    'zh-CN': string;
    'en': string;
    'ja': string;
    'ko': string;
  };
}

// 範例資料
export const healthGoals: HealthGoal[] = [
  {
    id: 'lose-weight',
    icon: '🏃',
    label: {
      'zh-TW': '減重',
      'zh-CN': '减重',
      'en': 'Lose Weight',
      'ja': '減量',
      'ko': '체중 감량',
    },
  },
  // ... 共 24 個目標
];
```

### User Profile Type (未來實作)
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  healthGoals: string[];  // HealthGoal id array
  dailyStepsGoal?: number;
  biometricEnabled: boolean;
  biometricType?: 'faceId' | 'fingerprint';
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🌐 i18n Implementation

### Translation File Location
**檔案**: `/src/app/utils/i18n.ts`

### Usage Example

#### 1. 基本翻譯
```tsx
import { translations, type Language } from '../utils/i18n';

function MyComponent() {
  const [language, setLanguage] = useState<Language>('zh-TW');
  const t = translations[language];
  
  return (
    <div>
      <h1>{t.appName}</h1>
      <p>{t.tagline}</p>
    </div>
  );
}
```

#### 2. 帶 Placeholder 的翻譯
```tsx
// 原始翻譯文字
translations['zh-TW'].welcomeTitle = '歡迎，{name}';

// 使用方式
const userName = 'John';
const welcomeText = t.welcomeTitle.replace('{name}', userName);
// 結果: "歡迎，John"
```

#### 3. 語言切換
```tsx
function LanguageSelector() {
  const languages: Language[] = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
  
  return (
    <select onChange={(e) => setLanguage(e.target.value as Language)}>
      {languages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}
```

### Translation Keys Summary

| 分類 | Key 數量 | 範例 |
|------|---------|------|
| 登入頁面 | 11 | `appName`, `tagline`, `continueWithApple` |
| 歡迎頁面 | 4 | `welcomeTitle`, `loginSuccess` |
| 生物辨識 | 16 | `enableFaceID`, `biometricDescription` |
| 個人資料 | 19 | `setupProfile`, `healthGoal` |
| 完成頁面 | 6 | `allSet`, `startUsing` |
| 通用 | 2 | `hi`, `ready` |
| **總計** | **58** | |

---

## 📄 Page Specifications

### 1. LoginFlowI18n (主要登入流程)

**檔案**: `/src/app/pages/LoginFlowI18n.tsx`

#### Features
- ✅ 多語言支援（5 種語言）
- ✅ iOS/Android 平台偵測
- ✅ 5 步驟流程
- ✅ 動畫過渡效果
- ✅ 健康目標選擇（24 個目標）
- ✅ 無限滾動載入

#### Flow Steps
1. **Login** - 登入頁面
2. **Welcome** - 歡迎頁面
3. **Biometric** - 生物辨識設定
4. **Setup Profile** - 個人資料設定
5. **Complete** - 完成頁面

#### State Management
```typescript
type Step = 'login' | 'welcome' | 'biometric' | 'setup-profile' | 'complete';

const [currentStep, setCurrentStep] = useState<Step>('login');
const [language, setLanguage] = useState<Language>('zh-TW');
const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
const [userName, setUserName] = useState<string>('');
const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

#### Platform Detection
```typescript
useEffect(() => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    setPlatform('ios');
  } else if (userAgent.includes('android')) {
    setPlatform('android');
  }
}, []);
```

#### Health Goals Selection Logic
```tsx
// 健康目標選擇
const handleGoalSelect = (goalId: string) => {
  setSelectedGoals(prev => 
    prev.includes(goalId)
      ? prev.filter(id => id !== goalId)  // 移除
      : [...prev, goalId]                  // 新增
  );
};

// 顯示未選擇的目標（已選的會移除）
const availableGoals = healthGoals.filter(
  goal => !selectedGoals.includes(goal.id)
);
```

#### Animation Specs
```tsx
import { motion } from 'motion/react';

// 淡入動畫
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

// 按鈕縮放
<button className="active:scale-[0.98] transition-all">
  Click me
</button>
```

---

### 2. DesignSystem (設計系統展示頁)

**檔案**: `/src/app/pages/DesignSystem.tsx`

#### Sections
1. **Colors** - 色彩系統展示
2. **Gradients** - 漸層展示
3. **Shadows & Glows** - 陰影與發光效果
4. **Buttons** - 按鈕變體
5. **Cards** - 卡片變體
6. **Icons** - App Icon 展示
7. **Typography** - 字體階層

#### Usage
```tsx
// 訪問設計系統頁面
<DesignSystem />
```

---

## 🔧 Development Guidelines

### 1. 元件開發規範

#### 檔案結構
```tsx
// 元件模板
import { ReactNode } from 'react';

interface MyComponentProps {
  children?: ReactNode;
  // ... 其他 props
}

export function MyComponent({ children }: MyComponentProps) {
  return (
    <div className="...">
      {children}
    </div>
  );
}
```

#### 命名規範
- **元件**: PascalCase
- **Props Interface**: `{ComponentName}Props`
- **函數**: camelCase
- **常數**: UPPER_SNAKE_CASE

#### Tailwind 使用規範
- ✅ **使用**: `bg-violet-600`, `p-4`, `rounded-2xl`
- ❌ **避免**: 自定義 CSS class（除非必要）
- ⚠️ **注意**: 不要覆蓋預設的 `text-*`, `font-*`, `leading-*`（除非特別要求）

---

### 2. 樣式指南

#### Button 樣式範例
```tsx
// 主要按鈕（登入頁面風格）
<button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full flex items-center justify-center gap-3 font-medium shadow-lg active:scale-[0.98] transition-all">
  主要操作
</button>

// 次要按鈕（外框）
<button className="w-full border-2 border-violet-600 text-violet-600 py-4 rounded-full font-medium active:scale-[0.98] transition-all">
  次要操作
</button>

// 文字按鈕
<button className="text-violet-600 font-medium hover:underline">
  連結操作
</button>
```

#### Card 樣式範例
```tsx
<div className="bg-white rounded-2xl shadow-lg p-6">
  {/* 卡片內容 */}
</div>
```

#### Input 樣式範例
```tsx
<input 
  type="text"
  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-violet-600 focus:outline-none transition-colors"
  placeholder="輸入文字"
/>
```

---

### 3. 動畫指南

#### Motion (Framer Motion) 使用
```tsx
import { motion } from 'motion/react';

// 淡入
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// 滑入
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.5 }}
/>

// 縮放
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

#### CSS Transition
```tsx
// 基本過渡
className="transition-all duration-300"

// Hover 效果
className="hover:shadow-lg transition-shadow duration-200"

// Active 效果
className="active:scale-[0.98] transition-transform duration-150"
```

---

### 4. 響應式設計

#### Breakpoints (Tailwind 預設)
```css
/* Mobile First */
/* Default: < 640px */

/* sm: >= 640px */
@media (min-width: 640px)

/* md: >= 768px */
@media (min-width: 768px)

/* lg: >= 1024px */
@media (min-width: 1024px)

/* xl: >= 1280px */
@media (min-width: 1280px)
```

#### Usage
```tsx
<div className="
  w-full           /* Mobile: 100% width */
  md:w-1/2         /* Tablet: 50% width */
  lg:w-1/3         /* Desktop: 33% width */
  p-4              /* Mobile: 16px padding */
  md:p-6           /* Tablet: 24px padding */
  lg:p-8           /* Desktop: 32px padding */
">
  響應式內容
</div>
```

---

### 5. 狀態管理建議

#### Local State (React useState)
適用於：單一元件的狀態

```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);
```

#### Prop Drilling
適用於：2-3 層元件傳遞

```tsx
<ParentComponent language={language}>
  <ChildComponent language={language}>
    <GrandchildComponent language={language} />
  </ChildComponent>
</ParentComponent>
```

#### Context API (未來擴展)
適用於：全域狀態（語言、主題、用戶）

```tsx
// 範例：語言 Context
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({ language: 'zh-TW', setLanguage: () => {} });
```

---

## 🚀 Build & Deployment

### Development
```bash
# 安裝依賴
npm install

# 開發模式（預設會自動啟動）
npm run dev
# 或
vite
```

### Build
```bash
# 生產建置
npm run build

# 輸出目錄: /dist
```

### Vite Config
**檔案**: `/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

### Tailwind v4 Config
**檔案**: `/src/styles/theme.css`

Tailwind v4 不再使用 `tailwind.config.js`，改用 CSS 檔案設定。

```css
@import "tailwindcss";

/* 自訂主題設定 */
@theme {
  /* 在這裡設定 */
}
```

---

## 📝 Code Examples for AI Editor

### Example 1: 建立新頁面

```tsx
// /src/app/pages/Dashboard.tsx
import { useState } from 'react';
import { translations, type Language } from '../utils/i18n';
import { Button } from '../design-system/components/Button';
import { Card } from '../design-system/components/Card';

export function Dashboard() {
  const [language, setLanguage] = useState<Language>('zh-TW');
  const t = translations[language];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          {t.appName} Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="統計資料" padding="lg">
            <p className="text-slate-600">內容區域</p>
          </Card>
          
          <Card title="每日目標" padding="lg">
            <p className="text-slate-600">內容區域</p>
          </Card>
          
          <Card title="健康分析" padding="lg">
            <p className="text-slate-600">內容區域</p>
          </Card>
        </div>
        
        <div className="mt-8 flex gap-4">
          <Button variant="primary" size="lg">
            主要操作
          </Button>
          <Button variant="outline" size="lg">
            次要操作
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

### Example 2: 使用 Motion 動畫

```tsx
import { motion } from 'motion/react';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold mb-4"
      >
        動畫標題
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600"
      >
        動畫內容
      </motion.p>
    </motion.div>
  );
}
```

---

### Example 3: 多語言元件

```tsx
import { useState } from 'react';
import { translations, type Language } from '../utils/i18n';

export function MultiLanguageComponent() {
  const [language, setLanguage] = useState<Language>('zh-TW');
  const t = translations[language];
  
  const languages: Array<{ code: Language; name: string }> = [
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
  ];
  
  return (
    <div>
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="border-2 border-slate-200 rounded-lg px-4 py-2"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      
      <div className="mt-4">
        <h1 className="text-3xl font-bold">{t.appName}</h1>
        <p className="text-lg text-slate-600 mt-2">{t.tagline}</p>
      </div>
    </div>
  );
}
```

---

### Example 4: 健康目標選擇器

```tsx
import { useState } from 'react';
import { healthGoals, type HealthGoal } from '../config/healthGoals';
import { translations, type Language } from '../utils/i18n';

export function GoalSelector() {
  const [language, setLanguage] = useState<Language>('zh-TW');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {healthGoals.map((goal) => {
        const isSelected = selectedGoals.includes(goal.id);
        
        return (
          <button
            key={goal.id}
            onClick={() => handleGoalToggle(goal.id)}
            className={`
              p-4 rounded-2xl border-2 transition-all
              ${isSelected 
                ? 'border-violet-600 bg-violet-50' 
                : 'border-slate-200 hover:border-violet-300'
              }
            `}
          >
            <div className="text-4xl mb-2">{goal.icon}</div>
            <div className="text-sm font-medium text-slate-700">
              {goal.label[language]}
            </div>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 🎯 AI Editor Implementation Checklist

使用這份 spec 開發時，請確保：

### ✅ 設計系統
- [ ] 使用 `/src/app/design-system/tokens.ts` 的 Design Tokens
- [ ] 優先使用 `/src/app/design-system/components/` 的元件
- [ ] 遵循色彩系統（Primary: violet, Accent: fuchsia, Secondary: cyan）
- [ ] 使用標準間距（4px, 8px, 16px, 24px, 32px）
- [ ] 使用標準圓角（24px for cards, full for buttons）

### ✅ 元件規範
- [ ] 按鈕使用 `rounded-full`
- [ ] 卡片使用 `rounded-2xl shadow-lg`
- [ ] 主要按鈕使用漸層背景
- [ ] 所有互動元素有 hover/active 狀態
- [ ] 動畫使用 300ms duration

### ✅ 多語言
- [ ] 所有文字使用 `translations[language].*`
- [ ] 支援 5 種語言切換
- [ ] Placeholder 正確替換（{name}, {type}）

### ✅ 響應式
- [ ] Mobile-first 設計
- [ ] 使用 Tailwind 響應式 class（sm:, md:, lg:）
- [ ] 在小螢幕上保持可用性

### ✅ 程式碼品質
- [ ] TypeScript strict mode
- [ ] 所有 props 有 interface 定義
- [ ] 元件有預設值
- [ ] 使用 `const` / `let`（不使用 `var`）
- [ ] 遵循 React Hooks 規則

### ✅ 效能
- [ ] 避免不必要的 re-render
- [ ] 使用 `useMemo` / `useCallback`（當需要時）
- [ ] 圖片使用適當尺寸
- [ ] 避免內聯大型物件

---

## 📚 Additional Resources

### Official Documentation
- [React 18 Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Motion (Framer Motion)](https://motion.dev/)
- [Radix UI](https://www.radix-ui.com/)

### Internal References
- `/DESIGN_SPEC.md` - 設計規範文件
- `/src/app/design-system/tokens.ts` - Design Tokens
- `/src/app/pages/DesignSystem.tsx` - 視覺化展示
- `/src/app/utils/i18n.ts` - 翻譯檔案

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-12-18 | Initial technical specification |

---

## 📞 Support

如有任何問題或需要更多資訊，請參考：
1. 本文件的相關章節
2. `/DESIGN_SPEC.md` 設計規範
3. 現有程式碼範例

---

**Made with 💜 for Timeless App**

> 這份技術規格是為 AI Editor 優化的完整開發文檔。包含所有必要的 API、範例程式碼、資料結構定義。可以直接提供給 AI 進行開發。
