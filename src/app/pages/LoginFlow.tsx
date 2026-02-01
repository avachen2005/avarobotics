import { FitnessIcon } from '../components/FitnessIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// 模擬用戶資料
interface UserData {
  name: string;
  email: string;
  picture: string;
}

type FlowStep = 'login' | 'welcome' | 'biometric' | 'setup-profile' | 'complete';

export function LoginFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // 步驟 1: 登入頁面
  const LoginStep = () => (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative"
    >
      {/* 霓虹背景動畫 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* 網格背景 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 登入卡片 */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-violet-500/20">
          {/* App Icon 與標題 */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 
              }}
              className="mb-6"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))'
              }}
            >
              <FitnessIcon size={120} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl mb-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Timeless
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-center"
            >
              開始你的健康旅程
            </motion.p>
          </div>

          {/* Google 登入按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => {
                setIsLoading(true);
                // 模擬 Google 登入
                setTimeout(() => {
                  setUserData({
                    name: '張小明',
                    email: 'user@gmail.com',
                    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                  });
                  setIsLoading(false);
                  setCurrentStep('welcome');
                }, 1500);
              }}
              disabled={isLoading}
              className="group relative w-full bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? '登入中...' : '使用 Google 繼續'}
            </button>
          </motion.div>

          {/* 底部說明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-slate-500">
              登入即表示您同意我們的{' '}
              <a href="#" className="text-violet-400 hover:text-violet-300 underline">
                服務條款
              </a>
              {' '}和{' '}
              <a href="#" className="text-violet-400 hover:text-violet-300 underline">
                隱私政策
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // 步驟 2: 歡迎頁面（顯示用戶資訊）
  const WelcomeStep = () => (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* 用戶頭像 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <img 
                src={userData?.picture} 
                alt={userData?.name}
                className="w-24 h-24 rounded-full border-4 border-violet-200"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* 歡迎訊息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl mb-2 text-gray-900">
              嗨，{userData?.name}！ 👋
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
          </motion.div>

          {/* 成功動畫 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-violet-900">登入成功！</p>
              <p className="text-violet-700 text-sm mt-1">歡迎來到 Timeless</p>
            </div>
          </motion.div>

          {/* 繼續按鈕 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setCurrentStep('biometric')}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            繼續設定
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // 步驟 3: 生物辨識設定
  const BiometricStep = () => {
    // 偵測裝置類型
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const biometricType = isIOS ? 'Face ID' : '指紋辨識';
    const biometricIcon = isIOS ? '👤' : '👆';

    return (
      <motion.div
        key="biometric"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center p-6"
      >
        <div className="w-full max-w-md">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-violet-500/20">
            {/* 生物辨識圖示 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-6xl shadow-2xl">
                {biometricIcon}
              </div>
            </motion.div>

            {/* 標題 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl mb-3 text-white">
                啟用 {biometricType}？
              </h2>
              <p className="text-slate-400 leading-relaxed">
                下次登入時，只需要 {biometricType} 驗證，<br/>
                更快速、更安全
              </p>
            </motion.div>

            {/* 好處說明 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-start gap-3 text-slate-300">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">快速登入</p>
                  <p className="text-sm text-slate-400">一秒完成驗證</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">更高安全性</p>
                  <p className="text-sm text-slate-400">只有你能存取資料</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">隨時可關閉</p>
                  <p className="text-sm text-slate-400">在設定中調整</p>
                </div>
              </div>
            </motion.div>

            {/* 按鈕組 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <button
                onClick={() => {
                  setBiometricEnabled(true);
                  setIsLoading(true);
                  // 模擬生物辨識設定
                  setTimeout(() => {
                    setIsLoading(false);
                    setCurrentStep('setup-profile');
                  }, 2000);
                }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isLoading ? '設定中...' : `啟用 ${biometricType}`}
              </button>

              <button
                onClick={() => setCurrentStep('setup-profile')}
                disabled={isLoading}
                className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 py-4 rounded-full transition-all border border-slate-700"
              >
                暫時跳過
              </button>
            </motion.div>

            {/* 安全說明 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-slate-500 text-center mt-6"
            >
              🔒 {biometricType} 資料儲存在您的裝置上，<br/>
              Timeless 無法存取
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  };

  // 步驟 4: 設定個人資料
  const SetupProfileStep = () => (
    <motion.div
      key="setup-profile"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* 進度指示器 */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-8 h-2 bg-violet-600 rounded-full"></div>
            <div className="w-8 h-2 bg-violet-600 rounded-full"></div>
            <div className="w-8 h-2 bg-violet-300 rounded-full"></div>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl mb-2 text-gray-900 text-center"
          >
            快速設定個人資料
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center mb-8 text-sm"
          >
            幫助我們為你量身打造健康計畫
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* 年齡 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">年齡</label>
              <input
                type="number"
                placeholder="例如：25"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
              />
            </div>

            {/* 體重 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">體重（公斤）</label>
              <input
                type="number"
                placeholder="例如：70"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
              />
            </div>

            {/* 目標 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">健康目標</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors">
                <option>選擇你的目標</option>
                <option>減重</option>
                <option>增肌</option>
                <option>維持健康</option>
                <option>提升體能</option>
              </select>
            </div>

            {/* 每日步數目標 */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">每日步數目標</label>
              <input
                type="number"
                placeholder="例如：10000"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* 按鈕 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-3"
          >
            <button
              onClick={() => setCurrentStep('complete')}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              完成設定
            </button>
            <button
              onClick={() => setCurrentStep('complete')}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-900 transition-colors"
            >
              稍後再設定
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // 步驟 5: 完成頁面
  const CompleteStep = () => (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 flex items-center justify-center p-6"
    >
      <div className="text-center">
        {/* 慶祝動畫 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="text-9xl mb-4">🎉</div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3, delay: 0.5 }}
            className="text-6xl"
          >
            ✨
          </motion.div>
        </motion.div>

        {/* 完成訊息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-5xl mb-4 text-white">一切就緒！</h1>
          <p className="text-violet-100 text-xl mb-8">
            {userData?.name}，準備好開始你的健康之旅了嗎？
          </p>

          {biometricEnabled && (
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-8 inline-block">
              <p className="text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                生物辨識已啟用
              </p>
            </div>
          )}

          <button
            onClick={() => alert('前往 Dashboard（待實作）')}
            className="bg-white text-violet-600 px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all"
          >
            開始使用 Timeless
          </button>
        </motion.div>

        {/* 裝飾元素 */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 text-6xl opacity-50"
        >
          💪
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0] 
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 text-6xl opacity-50"
        >
          🏃
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'login' && <LoginStep />}
      {currentStep === 'welcome' && <WelcomeStep />}
      {currentStep === 'biometric' && <BiometricStep />}
      {currentStep === 'setup-profile' && <SetupProfileStep />}
      {currentStep === 'complete' && <CompleteStep />}
    </AnimatePresence>
  );
}
