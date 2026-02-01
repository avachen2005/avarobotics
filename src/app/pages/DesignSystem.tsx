import { FitnessIcon } from "../components/FitnessIcon";
import { tokens } from "../design-system/tokens";
import { IconCard } from "../design-system/components/IconCard";
import { ColorSwatch } from "../design-system/components/ColorSwatch";
import { GradientSwatch } from "../design-system/components/GradientSwatch";
import { Button } from "../design-system/components/Button";
import { Card } from "../design-system/components/Card";

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
      {/* Hero Section - 科技感漸層 */}
      <div className="relative overflow-hidden">
        {/* 科技感背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100 opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217, 70, 239, 0.1) 0%, transparent 50%)'
        }} />
        
        <div className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700 text-white py-16 px-8 border-b border-violet-300">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="mb-4 drop-shadow-lg">
              運動 App 設計系統
            </h1>
            <p className="text-violet-100 text-lg mb-8">完整的 Design Tokens、Components 和 App Icon - 科技霓虹風格</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">下載資源</Button>
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20">
                查看文檔
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-16">
        {/* Design Tokens Section */}
        <section>
          <h2 className="text-slate-800 mb-8">📐 Design Tokens</h2>
          
          {/* Colors */}
          <div className="mb-12">
            <h3 className="text-slate-800 mb-6">色彩系統 - 科技霓虹風格</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Primary Colors */}
              <Card title="主色調 - 科技紫" className="border border-violet-200 shadow-lg shadow-violet-100">
                <div className="space-y-2">
                  <ColorSwatch color={tokens.colors.primary[400]} name="Primary 400" value="#a78bfa" />
                  <ColorSwatch color={tokens.colors.primary[500]} name="Primary 500" value="#8b5cf6" />
                  <ColorSwatch color={tokens.colors.primary[600]} name="Primary 600" value="#7c3aed" />
                  <ColorSwatch color={tokens.colors.primary[700]} name="Primary 700" value="#6d28d9" />
                </div>
              </Card>

              {/* Accent Colors */}
              <Card title="強調色 - 霓虹粉紫" className="border border-fuchsia-200 shadow-lg shadow-fuchsia-100">
                <div className="space-y-2">
                  <ColorSwatch color={tokens.colors.accent[400]} name="Accent 400" value="#e879f9" />
                  <ColorSwatch color={tokens.colors.accent[500]} name="Accent 500" value="#d946ef" />
                  <ColorSwatch color={tokens.colors.accent[600]} name="Accent 600" value="#c026d3" />
                  <ColorSwatch color={tokens.colors.accent[700]} name="Accent 700" value="#a21caf" />
                </div>
              </Card>

              {/* Secondary Colors */}
              <Card title="輔助色 - 電光藍" className="border border-cyan-200 shadow-lg shadow-cyan-100">
                <div className="space-y-2">
                  <ColorSwatch color={tokens.colors.secondary[300]} name="Secondary 300" value="#67e8f9" />
                  <ColorSwatch color={tokens.colors.secondary[400]} name="Secondary 400" value="#22d3ee" />
                  <ColorSwatch color={tokens.colors.secondary[500]} name="Secondary 500" value="#06b6d4" />
                  <ColorSwatch color={tokens.colors.secondary[600]} name="Secondary 600" value="#0891b2" />
                </div>
              </Card>
            </div>
          </div>

          {/* Gradients */}
          <div className="mb-12">
            <h3 className="text-slate-800 mb-6">漸層 - 科技感</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-violet-200 shadow-lg shadow-violet-100">
                <GradientSwatch gradient={tokens.gradients.primary} name="Primary Gradient" />
              </Card>
              <Card className="border border-fuchsia-200 shadow-lg shadow-fuchsia-100">
                <GradientSwatch gradient={tokens.gradients.accent} name="Accent Gradient" />
              </Card>
              <Card className="border border-cyan-200 shadow-lg shadow-cyan-100">
                <GradientSwatch gradient={tokens.gradients.secondary} name="Secondary Gradient" />
              </Card>
              <Card className="border border-violet-200 shadow-lg shadow-violet-100">
                <GradientSwatch gradient={tokens.gradients.neon} name="Neon Gradient" />
              </Card>
              <Card className="border border-fuchsia-200 shadow-lg shadow-fuchsia-100">
                <GradientSwatch gradient={tokens.gradients.tech} name="Tech Gradient" />
              </Card>
              <Card className="border border-slate-200 shadow-lg">
                <GradientSwatch gradient={tokens.gradients.background} name="Background Gradient" />
              </Card>
            </div>
          </div>

          {/* Spacing & Radius */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card title="間距系統" className="border border-violet-200 shadow-lg shadow-violet-100">
              <div className="space-y-3">
                {Object.entries(tokens.spacing).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-8 shadow-md"
                      style={{ width: value }}
                    />
                    <span className="text-slate-700 text-sm font-mono">{key}: {value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="圓角系統" className="border border-violet-200 shadow-lg shadow-violet-100">
              <div className="space-y-3">
                {Object.entries(tokens.radius).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="bg-gradient-to-br from-violet-500 to-fuchsia-500 w-12 h-12 shadow-md"
                      style={{ borderRadius: value }}
                    />
                    <span className="text-slate-700 text-sm font-mono">{key}: {value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Icon Sizes */}
          <Card title="App Icon 標準尺寸" className="mb-12 border border-violet-200 shadow-lg shadow-violet-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-800 mb-4">iOS</h4>
                <div className="space-y-2 font-mono text-sm">
                  {Object.entries(tokens.iconSizes.ios).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-slate-600">
                      <span>{key}</span>
                      <span className="text-violet-600">{value}x{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-slate-800 mb-4">Android</h4>
                <div className="space-y-2 font-mono text-sm">
                  {Object.entries(tokens.iconSizes.android).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-slate-600">
                      <span>{key}</span>
                      <span className="text-cyan-600">{value}x{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Components Section */}
        <section>
          <h2 className="text-slate-800 mb-8">🧩 Design Components</h2>
          
          {/* Buttons */}
          <Card title="按鈕元件" className="mb-8 border border-violet-200 shadow-lg shadow-violet-100">
            <div className="space-y-6">
              <div>
                <div className="text-slate-600 text-sm mb-3">Variants</div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>
              
              <div>
                <div className="text-slate-600 text-sm mb-3">Sizes</div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card title="Small Padding" padding="sm" className="border border-violet-200 shadow-lg shadow-violet-100">
              <p className="text-slate-600 text-sm">這是一個小間距的卡片範例</p>
            </Card>
            <Card title="Medium Padding" padding="md" className="border border-fuchsia-200 shadow-lg shadow-fuchsia-100">
              <p className="text-slate-600 text-sm">這是一個中間距的卡片範例</p>
            </Card>
            <Card title="Large Padding" padding="lg" className="border border-cyan-200 shadow-lg shadow-cyan-100">
              <p className="text-slate-600 text-sm">這是一個大間距的卡片範例</p>
            </Card>
          </div>

          {/* Icon Cards */}
          <Card title="Icon Card 元件" className="mb-8 border border-violet-200 shadow-lg shadow-violet-100">
            <div className="flex flex-wrap gap-8 justify-center">
              <IconCard size={120} variant="ios" label="180x180" sublabel="iPhone @3x">
                <FitnessIcon size={120} />
              </IconCard>
              <IconCard size={96} variant="android" label="192x192" sublabel="xxxhdpi">
                <FitnessIcon size={96} />
              </IconCard>
              <IconCard size={72} variant="ios" label="自訂尺寸" sublabel="可自由調整" downloadable={false}>
                <FitnessIcon size={72} />
              </IconCard>
            </div>
          </Card>
        </section>

        {/* App Icon Downloads */}
        <section>
          <h2 className="text-slate-800 mb-8">📱 App Icon 下載</h2>
          
          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 rounded-2xl p-6 mb-8 shadow-lg shadow-violet-100">
            <h3 className="text-violet-900 mb-3">💡 使用說明</h3>
            <p className="text-slate-700">在圖標上右鍵點擊「另存圖片為...」即可下載 PNG 格式。iOS 使用圓角方形，Android 使用圓形。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* iOS */}
            <Card title="iOS 尺寸" padding="lg" className="border border-violet-200 shadow-lg shadow-violet-100">
              <div className="space-y-6">
                <IconCard size={180} variant="ios" label="180x180 px" sublabel="iPhone @3x (最常用)">
                  <FitnessIcon size={180} />
                </IconCard>
                <IconCard size={120} variant="ios" label="120x120 px" sublabel="iPhone @2x">
                  <FitnessIcon size={120} />
                </IconCard>
                <IconCard size={167} variant="ios" label="167x167 px" sublabel="iPad Pro @2x">
                  <FitnessIcon size={167} />
                </IconCard>
                <IconCard size={152} variant="ios" label="152x152 px" sublabel="iPad @2x">
                  <FitnessIcon size={152} />
                </IconCard>
              </div>
            </Card>

            {/* Android */}
            <Card title="Android 尺寸" padding="lg" className="border border-cyan-200 shadow-lg shadow-cyan-100">
              <div className="space-y-6">
                <IconCard size={192} variant="android" label="192x192 px" sublabel="xxxhdpi">
                  <FitnessIcon size={192} />
                </IconCard>
                <IconCard size={144} variant="android" label="144x144 px" sublabel="xxhdpi">
                  <FitnessIcon size={144} />
                </IconCard>
                <IconCard size={96} variant="android" label="96x96 px" sublabel="xhdpi">
                  <FitnessIcon size={96} />
                </IconCard>
                <IconCard size={72} variant="android" label="72x72 px" sublabel="hdpi">
                  <FitnessIcon size={72} />
                </IconCard>
              </div>
            </Card>
          </div>
        </section>

        {/* Code Examples */}
        <section>
          <h2 className="text-slate-800 mb-8">💻 程式碼範例</h2>
          
          <Card title="如何使用 Design Tokens" className="mb-6 border border-violet-200 shadow-lg shadow-violet-100">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { tokens } from './design-system/tokens';

// 使用顏色
const primaryColor = tokens.colors.primary[600];

// 使用漸層
const gradient = tokens.gradients.primary;

// 使用間距
const padding = tokens.spacing.lg;`}
            </pre>
          </Card>

          <Card title="如何使用 Components" className="border border-violet-200 shadow-lg shadow-violet-100">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Button } from './design-system/components/Button';
import { Card } from './design-system/components/Card';
import { IconCard } from './design-system/components/IconCard';

function MyApp() {
  return (
    <Card title="我的卡片">
      <Button variant="primary">點擊我</Button>
      <IconCard size={120} variant="ios">
        <FitnessIcon size={120} />
      </IconCard>
    </Card>
  );
}`}
            </pre>
          </Card>
        </section>
      </div>
    </div>
  );
}
