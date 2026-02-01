import { GoogleLogin } from '@react-oauth/google';
import { FitnessIcon } from '../components/FitnessIcon';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

// 偵測平台（實際應用中會用更可靠的方式）
const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios';
  }
  
  return 'web';
};

export function LoginNative() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('登入成功！', credentialResponse);
    setIsLoading(true);
    
    setTimeout(() => {
      alert('登入成功！歡迎使用 Timeless');
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleError = () => {
    console.log('登入失敗');
    alert('登入失敗，請重試');
  };

  // iOS 風格的登入頁面
  const IOSLogin = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* iOS 風格：簡潔、大量留白、圓角 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* App Icon - iOS 圓角方形 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ width: 120, height: 120 }}>
            <FitnessIcon size={120} />
          </div>
        </motion.div>

        {/* 標題 - iOS 風格字體 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl mb-2 text-gray-900"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          Timeless
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-center mb-12"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
        >
          開始你的健康旅程
        </motion.p>

        {/* iOS 風格按鈕組 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full space-y-3"
        >
          {/* Apple 登入（iOS 優先） */}
          <button className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-medium shadow-md active:scale-[0.98] transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            繼續使用 Apple
          </button>

          {/* Google 登入 */}
          <button className="w-full bg-white border-2 border-gray-200 text-gray-900 py-4 rounded-2xl flex items-center justify-center gap-3 font-medium shadow-sm active:scale-[0.98] transition-transform">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            繼續使用 Google
          </button>
        </motion.div>
      </div>

      {/* 底部條款 - iOS 風格 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-safe"
      >
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          繼續即表示您同意我們的{' '}
          <a href="#" className="text-blue-500">服務條款</a>
          {' '}和{' '}
          <a href="#" className="text-blue-500">隱私政策</a>
        </p>
      </motion.div>
    </div>
  );

  // Android Material Design 風格的登入頁面
  const AndroidLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col items-center justify-center p-6">
      {/* Material Design 風格：色彩豐富、卡片陰影 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* App Icon - Android 圓形 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2 
            }}
            className="flex justify-center mb-6"
          >
            <div className="rounded-full overflow-hidden shadow-xl" style={{ width: 120, height: 120 }}>
              <FitnessIcon size={120} />
            </div>
          </motion.div>

          {/* 標題 - Material Design 風格 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-medium mb-2 text-gray-900 text-center"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            歡迎使用 Timeless
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-center mb-8"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            追蹤你的健康數據，活出精彩人生
          </motion.p>

          {/* Material Design 按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {/* Google 登入（Android 優先） */}
            <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl active:scale-[0.98] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              </svg>
              使用 Google 帳戶登入
            </button>

            {/* 分隔線 */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">或</span>
              </div>
            </div>

            {/* Email 登入 */}
            <button className="w-full border-2 border-violet-600 text-violet-600 py-4 rounded-full flex items-center justify-center gap-3 font-medium active:scale-[0.98] transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              使用電子郵件登入
            </button>
          </motion.div>

          {/* Material Design 文字連結 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              還沒有帳號？{' '}
              <a href="#" className="text-violet-600 font-medium">立即註冊</a>
            </p>
          </motion.div>
        </div>

        {/* 條款說明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gray-500 leading-relaxed">
            登入即表示您同意我們的{' '}
            <a href="#" className="text-violet-600 underline">服務條款</a>
            {' '}和{' '}
            <a href="#" className="text-violet-600 underline">隱私政策</a>
          </p>
        </motion.div>
      </motion.div>

      {/* Material Design Floating Action Button（裝飾用） */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-3xl active:scale-95 transition-all"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
    </div>
  );

  // 顯示平台資訊
  return (
    <div>
      {/* 平台指示器 */}
      <div className="fixed top-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
        {platform === 'ios' && '🍎 iOS'}
        {platform === 'android' && '🤖 Android'}
        {platform === 'web' && '🌐 Web'}
      </div>

      {/* 根據平台顯示不同的登入頁面 */}
      {platform === 'ios' && <IOSLogin />}
      {platform === 'android' && <AndroidLogin />}
      {platform === 'web' && <AndroidLogin />} {/* Web 預設使用 Android 風格 */}
    </div>
  );
}
