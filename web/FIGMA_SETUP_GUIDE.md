# Timeless App - Figma 設定指南

> 如何在 Figma 中設定 Timeless App 的完整設計系統

**更新日期**: 2024-12-18  
**適用於**: Figma Desktop / Web

---

## 📋 目錄

1. [快速開始](#快速開始)
2. [匯入 Design Tokens](#匯入-design-tokens)
3. [建立色彩樣式](#建立色彩樣式)
4. [建立文字樣式](#建立文字樣式)
5. [建立元件](#建立元件)
6. [設定 Auto Layout](#設定-auto-layout)
7. [App Icon 設定](#app-icon-設定)
8. [檢視 Spec](#檢視-spec)
9. [匯出給開發者](#匯出給開發者)

---

## 🚀 快速開始

### 方法 1: 使用 Figma Tokens Plugin ⭐ **推薦**

這是**最快速**的方法，可以一鍵匯入所有 Design Tokens。

#### 步驟：

1. **安裝 Plugin**
   - 在 Figma 中按 `Cmd/Ctrl + /`
   - 搜尋 "Figma Tokens"
   - 安裝 **Figma Tokens** plugin

2. **匯入 Tokens**
   - 打開 Figma Tokens plugin
   - 點擊 "Settings" (右上角齒輪圖示)
   - 選擇 "Import" → "From JSON"
   - 上傳 `/figma-design-tokens.json` 檔案
   - 點擊 "Import"

3. **套用 Tokens**
   - 回到 Tokens 主頁面
   - 你會看到所有的 colors, spacing, borderRadius 等
   - 這些可以直接套用到你的設計中

4. **建立 Figma Styles**
   - 在 plugin 中點擊 "Create Styles"
   - 選擇要建立的 style 類型（Colors, Text, Effects）
   - 點擊 "Create"
   - 完成！所有 styles 會自動建立

---

### 方法 2: 手動建立（適合不用 Plugin）

如果你不想用 plugin，可以手動建立。

---

## 🎨 建立色彩樣式

### 1. 開啟 Color Styles 面板

- 點擊右側面板的 **Fill** 色塊
- 點擊 **Color Styles** 圖示（四個圓點）
- 點擊 **+** 按鈕建立新樣式

---

### 2. 建立 Primary Colors（科技紫）

依序建立以下色彩樣式：

| Style Name | Hex Code | 用途 |
|------------|----------|------|
| `Primary/50` | `#f5f3ff` | 淺背景 |
| `Primary/100` | `#ede9fe` | 淺背景 |
| `Primary/200` | `#ddd6fe` | 邊框 |
| `Primary/300` | `#c4b5fd` | Hover |
| `Primary/400` | `#a78bfa` | 次要 |
| **`Primary/500`** ⭐ | **`#8b5cf6`** | **主要使用** |
| `Primary/600` | `#7c3aed` | 深色 |
| `Primary/700` | `#6d28d9` | 深色強調 |
| `Primary/800` | `#5b21b6` | 深色文字 |
| `Primary/900` | `#4c1d95` | 最深 |

**建立方式**：
1. 畫一個矩形（Rectangle）
2. 填充顏色 `#8b5cf6`
3. 點擊 Fill → Color Styles → `+`
4. 命名為 `Primary/500`
5. 新增 Description: "⭐ 主要使用 - 科技紫"
6. 點擊 "Create Style"

---

### 3. 建立 Accent Colors（霓虹粉紫）

| Style Name | Hex Code | 用途 |
|------------|----------|------|
| `Accent/50` | `#fdf4ff` | 淺背景 |
| `Accent/100` | `#fae8ff` | 淺背景 |
| `Accent/200` | `#f5d0fe` | 邊框 |
| `Accent/300` | `#f0abfc` | Hover |
| **`Accent/400`** ⭐ | **`#e879f9`** | **主要使用** |
| `Accent/500` | `#d946ef` | 強調 |
| `Accent/600` | `#c026d3` | 深色 |
| `Accent/700` | `#a21caf` | 深色文字 |

---

### 4. 建立 Secondary Colors（電光藍）

| Style Name | Hex Code | 用途 |
|------------|----------|------|
| `Secondary/50` | `#ecfeff` | 淺背景 |
| `Secondary/100` | `#cffafe` | 淺背景 |
| `Secondary/200` | `#a5f3fc` | 邊框 |
| `Secondary/300` | `#67e8f9` | Hover |
| **`Secondary/400`** ⭐ | **`#22d3ee`** | **主要使用** |
| `Secondary/500` | `#06b6d4` | 深色 |
| `Secondary/600` | `#0891b2` | 深色強調 |

---

### 5. 建立 Neutral Colors（中性色）

| Style Name | Hex Code | 用途 |
|------------|----------|------|
| `Neutral/50` | `#f8fafc` | 淺背景 |
| `Neutral/100` | `#f1f5f9` | 卡片背景 |
| `Neutral/200` | `#e2e8f0` | 邊框 |
| `Neutral/300` | `#cbd5e1` | 分隔線 |
| `Neutral/600` | `#475569` | 次要文字 |
| `Neutral/700` | `#334155` | 主要文字 |
| `Neutral/900` | `#0f172a` | 標題文字 |

---

### 6. 建立漸層樣式

Figma 不直接支援「漸層樣式」，但可以這樣做：

**方法 A: 建立為 Component**

1. 畫一個矩形
2. 設定漸層填充：
   ```
   類型: Linear (135°)
   Color Stops:
   - 0%: #8b5cf6 (Primary/500)
   - 50%: #6d28d9 (Primary/700)
   - 100%: #5b21b6 (Primary/800)
   ```
3. 轉換為 Component（Cmd/Ctrl + Alt + K）
4. 命名為 `Gradient/Primary`

重複以上步驟建立：
- `Gradient/Accent` - `#e879f9` → `#d946ef` → `#c026d3`
- `Gradient/Secondary` - `#22d3ee` → `#06b6d4` → `#0891b2`
- `Gradient/Neon` ⭐ - `#8b5cf6` → `#d946ef` → `#22d3ee`

**方法 B: 使用 Figma Tokens Plugin**

Plugin 可以自動建立漸層效果（推薦）。

---

## 🔤 建立文字樣式

### 1. 開啟 Text Styles 面板

- 選擇一個文字物件
- 點擊右側面板的 **Text** 區域
- 點擊 **Text Styles** 圖示
- 點擊 **+** 建立新樣式

---

### 2. 建立文字階層

#### Display（Hero 標題）
```
Style Name: Display
Font: SF Pro / Inter (選擇你的字體)
Size: 36px
Weight: Bold (700)
Line Height: 44px (122%)
```

#### Headings（標題）
| Style Name | Size | Weight | Line Height | 用途 |
|------------|------|--------|-------------|------|
| `Heading/H1` | 30px | Semibold (600) | 36px (120%) | 大標題 |
| `Heading/H2` | 24px | Semibold (600) | 30px (125%) | 中標題 |
| `Heading/H3` | 20px | Semibold (600) | 26px (130%) | 小標題 |

#### Body（正文）
| Style Name | Size | Weight | Line Height | 用途 |
|------------|------|--------|-------------|------|
| `Body/Large` | 18px | Regular (400) | 27px (150%) | 大正文 |
| **`Body/Medium`** ⭐ | **16px** | **Regular (400)** | **24px (150%)** | **標準正文** |
| `Body/Small` | 14px | Regular (400) | 21px (150%) | 小正文 |

#### Label（標籤/按鈕）
| Style Name | Size | Weight | Line Height | 用途 |
|------------|------|--------|-------------|------|
| `Label/Large` | 14px | Medium (500) | 20px (143%) | 按鈕文字 |
| `Label/Small` | 12px | Regular (400) | 16px (133%) | 輔助文字 |

---

### 3. 建立步驟（範例：Body/Medium）

1. 建立一個 Text 物件，輸入 "範例文字"
2. 設定屬性：
   - Font: Inter / SF Pro
   - Size: 16px
   - Weight: Regular (400)
   - Line Height: 24px
3. 點擊 Text Styles → `+`
4. 命名為 `Body/Medium`
5. Description: "⭐ 標準正文 - 16px"
6. 點擊 "Create Style"

---

## 🧩 建立元件

### Button Component（按鈕）

#### Primary Button（主要按鈕）

1. **建立 Frame**
   - 按 `F` 建立 Frame
   - 命名為 `Button/Primary/Large`
   - 寬度: Auto（稍後設定 Auto Layout）

2. **加入文字**
   - 按 `T` 加入文字
   - 輸入 "登入"
   - 套用 Text Style: `Label/Large`
   - 顏色: `#ffffff` (白色)

3. **設定 Auto Layout**
   - 選擇 Frame
   - 按 `Shift + A` 啟用 Auto Layout
   - 設定 Padding:
     ```
     Horizontal (左右): 32px
     Vertical (上下): 12px
     Gap: 8px (如果有 icon)
     ```

4. **設定背景漸層**
   - 選擇 Frame
   - Fill → Linear Gradient (135°)
   - Color Stops:
     ```
     0%: #8b5cf6 (Primary/500)
     50%: #6d28d9 (Primary/700)
     100%: #5b21b6 (Primary/800)
     ```

5. **設定圓角**
   - Border Radius: `999` (完全圓角)

6. **加入陰影**
   - Effects → `+` → Drop Shadow
   - 設定:
     ```
     X: 0
     Y: 4
     Blur: 6
     Spread: -1
     Color: #000000 @ 10% opacity
     ```

7. **轉為 Component**
   - 選擇 Frame
   - 按 `Cmd/Ctrl + Alt + K`
   - 命名為 `Button/Primary/Large`
   - Description: "⭐ 主要按鈕 - Large size"

---

#### 建立 Variants（按鈕變體）

1. **複製 Primary Button**
   - 複製剛建立的 Component
   - 建立 3 個版本：Large, Medium, Small

2. **調整 Padding**
   | Size | Horizontal | Vertical |
   |------|------------|----------|
   | Small | 16px | 8px |
   | Medium ⭐ | 24px | 10px |
   | Large | 32px | 12px |

3. **合併為 Variants**
   - 選擇所有 3 個 buttons
   - 右鍵 → "Combine as Variants"
   - 設定 Property Name: `Size`
   - Values: `Small`, `Medium`, `Large`

4. **建立其他 Variants（Outline, Secondary）**
   - 複製整個 Variant set
   - 修改背景（Outline = 透明 + 邊框）
   - 設定 Property Name: `Variant`
   - Values: `Primary`, `Secondary`, `Outline`, `Ghost`

---

### Card Component（卡片）

1. **建立 Frame**
   - 命名為 `Card/Medium`
   - 寬度: 343px (iPhone 寬度 - 2×16px padding)

2. **設定內容區**
   - 加入標題 Text（套用 `Heading/H3`）
   - 加入內容 Text（套用 `Body/Medium`）

3. **設定 Auto Layout**
   - Padding: 24px (全部)
   - Gap: 16px (標題與內容間距)
   - Direction: Vertical

4. **設定樣式**
   - Background: `#ffffff` (White)
   - Border Radius: `24px`
   - Shadow:
     ```
     X: 0
     Y: 10
     Blur: 15
     Spread: -3
     Color: #000000 @ 10% opacity
     ```

5. **轉為 Component**
   - 按 `Cmd/Ctrl + Alt + K`
   - 命名為 `Card/Medium`

6. **建立 Padding Variants**
   - 建立 Small (16px), Large (32px) 版本
   - 合併為 Variants

---

## 📱 App Icon 設定

### iOS App Icon

1. **建立 Frame**
   - Frame Size: `1024 × 1024` (App Store size)
   - 命名為 `App Icon/iOS`

2. **設定圓角**
   - Border Radius: `227` 
   - (1024 × 0.2223 = 227.5，iOS 標準圓角比例)

3. **設計 Icon**
   - 建議使用漸層背景 (`Gradient/Neon`)
   - 中心圖形佔 60-70% 空間
   - 保持簡潔，避免細節過多

4. **匯出尺寸**
   - 在 Export 設定中加入所有需要的尺寸：
   ```
   @3x: 180×180 (iPhone)
   @2x: 120×120 (iPhone)
   iPad @2x: 152×152
   iPad Pro: 167×167
   App Store: 1024×1024
   ```

---

### Android App Icon

1. **建立 Frame**
   - Frame Size: `512 × 512` (Play Store size)
   - 命名為 `App Icon/Android`

2. **設定圓角**
   - Border Radius: `256` (完全圓形)
   - 或使用 Google 的 Adaptive Icon 模板

3. **匯出尺寸**
   ```
   xxxhdpi: 192×192 (最常用)
   xxhdpi: 144×144
   xhdpi: 96×96
   hdpi: 72×72
   mdpi: 48×48
   ```

---

## 🔍 檢視 Spec（Inspect Mode）

### 在 Figma 中查看元件屬性

1. **切換到 Dev Mode**
   - 點擊右上角 "Dev Mode" 按鈕
   - 或按快捷鍵 `Shift + D`

2. **選擇元件**
   - 點擊任何元件（Button, Card 等）
   - 右側會顯示完整的屬性

3. **查看 Code**
   - 在 Dev Mode 右側面板
   - 切換到 "Code" tab
   - 選擇平台：iOS (SwiftUI) / Android (Compose)
   - 複製程式碼片段

---

### 設定 Code Snippets

讓開發者可以直接複製對應的原生程式碼：

1. **安裝 Plugin**
   - 搜尋並安裝 "Code Snippets" plugin

2. **加入自訂程式碼**
   
   **對 Primary Button 加入 SwiftUI 程式碼**：
   ```swift
   PrimaryButton("登入", 
     variant: .primary, 
     size: .large) {
       // Action
   }
   ```
   
   **加入 Compose 程式碼**：
   ```kotlin
   PrimaryButton(
       text = "登入",
       onClick = { /* Action */ },
       variant = ButtonVariant.Primary,
       size = ButtonSize.Large
   )
   ```

3. **附加到 Component**
   - 選擇 Component
   - 開啟 Code Snippets plugin
   - 貼上程式碼
   - 儲存

---

## 📤 匯出給開發者

### 方法 1: 使用 Figma Dev Mode

開發者可以直接：
- 開啟你的 Figma 檔案
- 切換到 Dev Mode
- 查看所有 spacing, colors, fonts
- 複製程式碼片段

**需要做的**：
- 確保所有元件都使用 Styles（不要用 hard-coded values）
- 加入詳細的 descriptions

---

### 方法 2: 匯出 Design Tokens

1. **使用 Figma Tokens Plugin**
   - 開啟 plugin
   - 點擊 "Export" → "JSON"
   - 下載 JSON 檔案
   - 給開發者直接使用

2. **手動建立 Spec 文件**
   - 參考已建立的 `/DESIGN_SPEC.md`
   - 加入 Figma 檔案連結

---

### 方法 3: 匯出圖片資源

**App Icons**:
- 選擇 Icon Frame
- Export Settings:
  ```
  iOS:
  - @3x (180×180)
  - @2x (120×120)
  
  Android:
  - xxxhdpi (192×192)
  - xxhdpi (144×144)
  ```

**其他圖片**:
- 如果有插圖、logo 等
- 匯出 @1x, @2x, @3x (iOS)
- 匯出各種 dpi (Android)

---

## ✅ 完整檢查清單

### 基本設定
- [ ] 安裝 Figma Tokens plugin
- [ ] 匯入 `figma-design-tokens.json`
- [ ] 建立所有 Color Styles
- [ ] 建立所有 Text Styles
- [ ] 建立漸層 Components

### 元件建立
- [ ] Button Component (4 variants × 3 sizes)
- [ ] Card Component (3 padding sizes)
- [ ] Input Component
- [ ] App Icon (iOS + Android)

### 頁面建立
- [ ] Login Screen
- [ ] Welcome Screen
- [ ] Biometric Setup Screen
- [ ] Profile Setup Screen
- [ ] Complete Screen

### 開發者交付
- [ ] 啟用 Dev Mode
- [ ] 加入 Code Snippets
- [ ] 匯出 Design Tokens JSON
- [ ] 匯出 App Icons (所有尺寸)
- [ ] 分享 Figma 檔案連結

---

## 🎯 快速參考

### 常用快捷鍵

| 功能 | Mac | Windows |
|------|-----|---------|
| Frame | `F` | `F` |
| Text | `T` | `T` |
| Rectangle | `R` | `R` |
| Auto Layout | `Shift + A` | `Shift + A` |
| Component | `Cmd + Alt + K` | `Ctrl + Alt + K` |
| Dev Mode | `Shift + D` | `Shift + D` |
| Copy Properties | `Cmd + Alt + C` | `Ctrl + Alt + C` |
| Paste Properties | `Cmd + Alt + V` | `Ctrl + Alt + V` |

---

### 推薦 Plugins

| Plugin | 用途 |
|--------|------|
| **Figma Tokens** ⭐ | 匯入/匯出 Design Tokens |
| **Code Snippets** | 加入自訂程式碼 |
| **Stark** | 檢查顏色對比度 (Accessibility) |
| **Iconify** | Icon 庫 |
| **Content Reel** | 填充假資料 |
| **Unsplash** | 填充圖片 |

---

## 📚 參考資源

### 官方文件
- [Figma Design Systems](https://www.figma.com/best-practices/components-styles-and-shared-libraries/)
- [Figma Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://m3.material.io/)

### 相關檔案
- `/figma-design-tokens.json` - Design Tokens JSON
- `/DESIGN_SPEC.md` - 完整設計規範
- `/NATIVE_APP_SPEC.md` - 原生 App 技術規範

---

## 🆘 常見問題

### Q: 為什麼我的漸層無法建立為 Style？
**A**: Figma 目前不支援直接建立「漸層樣式」，但可以：
1. 使用 Figma Tokens plugin（自動處理）
2. 建立為 Component（手動方式）
3. 使用 Color Styles 搭配透明度

---

### Q: 如何讓開發者看到正確的程式碼？
**A**: 
1. 確保使用 Auto Layout（Figma 會自動轉換為 SwiftUI/Compose）
2. 使用 Styles 而非 hard-coded values
3. 使用 Code Snippets plugin 加入自訂程式碼

---

### Q: App Icon 的圓角怎麼算？
**A**: 
- **iOS**: `borderRadius = iconSize × 0.2223`
  - 1024px icon = 227.5px radius
  - 180px icon = 40px radius
- **Android**: 通常是完全圓形 (50%) 或使用 Adaptive Icon

---

### Q: 如何匯出多種尺寸的圖片？
**A**: 
1. 選擇 Frame/Component
2. 右側 Export 區域
3. 點擊 `+` 加入多個尺寸
4. 例如：`@1x`, `@2x`, `@3x`
5. 點擊 "Export"

---

## 🎉 完成！

現在你已經可以在 Figma 中：
- ✅ 查看完整的 Design Tokens
- ✅ 檢視元件屬性（padding, border-radius 等）
- ✅ 複製對應的程式碼（iOS/Android）
- ✅ 匯出給開發者使用

**下一步**：
1. 建立完整的 Login Flow 頁面
2. 加入互動原型（Prototype）
3. 分享給開發團隊

---

**Made with 💜 for Timeless App**

> 有任何問題歡迎參考 Figma 官方文件或聯繫團隊！
