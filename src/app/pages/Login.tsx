import { GoogleLogin } from '@react-oauth/google';
import { FitnessIcon } from '../components/FitnessIcon';
import { motion } from 'motion/react';
import { useState } from 'react';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('登入成功！', credentialResponse);
    setIsLoading(true);
    
    // 這裡可以解析 JWT token
    // const decoded = jwt_decode(credentialResponse.credential);
    // console.log('用戶資料：', decoded);
    
    // 模擬載入
    setTimeout(() => {
      alert('登入成功！歡迎使用 Timeless');
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleError = () => {
    console.log('登入失敗');
    alert('登入失敗，請重試');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative">
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
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
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
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

          {/* 心率線動畫 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <svg 
              className="w-full h-16" 
              viewBox="0 0 400 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0 30 L80 30 L100 10 L120 50 L140 30 L400 30"
                stroke="url(#heartbeat-gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  pathLength: { duration: 2, ease: "easeInOut" },
                  opacity: { duration: 2, times: [0, 0.1, 0.9, 1] },
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <defs>
                <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 0.5 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Google 登入按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            {/* 自訂 Google 登入按鈕樣式 */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  // 這裡應該觸發 Google OAuth 流程
                  // 由於需要 Client ID，我們先顯示一個模擬按鈕
                  console.log('Google 登入點擊');
                }}
                disabled={isLoading}
                className="group relative w-full max-w-sm bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? '登入中...' : '使用 Google 繼續'}
              </button>
            </div>

            {/* 分隔線 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-slate-500">或</span>
              </div>
            </div>

            {/* 手機號碼登入按鈕（備選） */}
            <button
              disabled
              className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-400 font-medium py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border border-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-lg">📱</span>
              使用手機號碼（即將推出）
            </button>
          </motion.div>

          {/* 底部說明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
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
            <p className="text-xs text-slate-600 mt-2">
              ⚠️ Figma Make 不建議收集 PII 或敏感數據
            </p>
          </motion.div>
        </div>

        {/* 底部裝飾 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600 text-sm">
            還沒有帳號？登入後自動為您創建
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
