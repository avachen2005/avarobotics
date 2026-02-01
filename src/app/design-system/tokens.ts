// Design Tokens - 設計系統的基礎變數

export const tokens = {
  // 色彩系統
  colors: {
    // 主色調 - 科技感紫色（偏藍紫、霓虹感）
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#3b0764",
    },

    // 強調色 - 霓虹粉紫（科技感）
    accent: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
    },

    // 輔助色 - 電光藍（科技感輔助）
    secondary: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },

    // 中性色
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
  },

  // 漸層 - 科技感
  gradients: {
    primary:
      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%)",
    accent:
      "linear-gradient(135deg, #e879f9 0%, #d946ef 50%, #c026d3 100%)",
    secondary:
      "linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)",
    background:
      "linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #ecfeff 100%)",
    neon: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #22d3ee 100%)",
    tech: "linear-gradient(135deg, #6d28d9 0%, #a21caf 50%, #0891b2 100%)",
  },

  // 圓角
  radius: {
    none: "0",
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    "3xl": "1.75rem", // 28px (iOS icon 圓角)
    full: "9999px",
  },

  // 陰影 - 科技感發光效果
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    glow: "0 0 30px rgba(139, 92, 246, 0.5)",
    neonPurple:
      "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
    neonPink:
      "0 0 20px rgba(217, 70, 239, 0.6), 0 0 40px rgba(217, 70, 239, 0.3)",
    neonCyan:
      "0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3)",
  },

  // 間距
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // 字體大小
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // 字重
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Icon 尺寸標準
  iconSizes: {
    ios: {
      iphone2x: 120,
      iphone3x: 180,
      ipad2x: 152,
      ipadPro: 167,
      appStore: 1024,
    },
    android: {
      mdpi: 48,
      hdpi: 72,
      xhdpi: 96,
      xxhdpi: 144,
      xxxhdpi: 192,
    },
  },

  // 動畫時間
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  // 緩動函數
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export type Tokens = typeof tokens;