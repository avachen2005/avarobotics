import { FitnessIcon } from '../components/FitnessIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// 模擬用戶資料
interface UserData {
  name: string;
  email: string;
  picture: string;
}

type FlowStep = 'login' | 'welcome' | 'biometric' | 'setup-profile' | 'complete';
type Platform = 'ios' | 'android' | 'web';

// 偵測平台
const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent || navigator.vendor;
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios';
  }
  
  return 'web';
};

export function LoginFlowNative() {
  const [platform, setPlatform] = useState<Platform>('web');
  const [currentStep, setCurrentStep] = useState<FlowStep>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  // ============= iOS 風格組件 =============
  
  // iOS - 步驟 1: 登入
  const IOSLoginStep = () => (
    <motion.div
      key="ios-login"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-white flex flex-col items-center justify-between p-6"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="mb-8"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ width: 120, height: 120 }}>
            <FitnessIcon size={120} />
          </div>
        </motion.div>

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
        >
          開始你的健康旅程
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full space-y-3"
        >
          <button 
            onClick={() => {
              setIsLoading(true);
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
            className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-medium shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            {isLoading ? '登入中...' : '繼續使用 Apple'}
          </button>

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-safe"
      >
        <p className="text-xs text-gray-400 text-center">
          繼續即表示您同意我們的{' '}
          <a href="#" className="text-blue-500">服務條款</a>
          {' '}和{' '}
          <a href="#" className="text-blue-500">隱私政策</a>
        </p>
      </motion.div>
    </motion.div>
  );

  // iOS - 步驟 2: 歡迎
  const IOSWelcomeStep = () => (
    <motion.div
      key="ios-welcome"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-sm">
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
              className="w-28 h-28 rounded-full shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl mb-3 text-gray-900" style={{ fontFamily: '-apple-system' }}>
            歡迎，{userData?.name}
          </h2>
          <p className="text-gray-500 text-lg">{userData?.email}</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => setCurrentStep('biometric')}
          className="w-full bg-blue-500 text-white py-4 rounded-2xl shadow-md active:scale-[0.98] transition-transform"
          style={{ fontFamily: '-apple-system' }}
        >
          繼續
        </motion.button>
      </div>
    </motion.div>
  );

  // iOS - 步驟 3: Face ID
  const IOSBiometricStep = () => (
    <motion.div
      key="ios-biometric"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-white flex items-center justify-center p-6"
    >
      <div className="w-full max-w-sm text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-6xl shadow-xl">
            👤
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-3xl mb-4 text-gray-900" style={{ fontFamily: '-apple-system' }}>
            啟用 Face ID
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            使用 Face ID 快速安全地登入
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-10"
        >
          <div className="flex items-start gap-4 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">快速登入</p>
              <p className="text-gray-500 text-sm">一秒完成驗證</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">安全性高</p>
              <p className="text-gray-500 text-sm">只有你能存取</p>
            </div>
          </div>
        </motion.div>

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
              setTimeout(() => {
                setIsLoading(false);
                setCurrentStep('setup-profile');
              }, 2000);
            }}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-4 rounded-2xl shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
            style={{ fontFamily: '-apple-system' }}
          >
            {isLoading ? '設定中...' : '啟用 Face ID'}
          </button>

          <button
            onClick={() => setCurrentStep('setup-profile')}
            disabled={isLoading}
            className="w-full text-blue-500 py-3"
            style={{ fontFamily: '-apple-system' }}
          >
            稍後設定
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  // iOS - 步驟 4: 個人資料
  const IOSSetupProfileStep = () => (
    <motion.div
      key="ios-profile"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gray-50 p-6 pt-16"
    >
      <div className="max-w-sm mx-auto">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl mb-8 text-gray-900"
          style={{ fontFamily: '-apple-system' }}
        >
          設定你的目標
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2 text-sm">年齡</label>
            <input
              type="number"
              placeholder="25"
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">體重（公斤）</label>
            <input
              type="number"
              placeholder="70"
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">健康目標</label>
            <select className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none">
              <option>減重</option>
              <option>增肌</option>
              <option>維持健康</option>
              <option>提升體能</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">每日步數目標</label>
            <input
              type="number"
              placeholder="10000"
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-3"
        >
          <button
            onClick={() => setCurrentStep('complete')}
            className="w-full bg-blue-500 text-white py-4 rounded-2xl shadow-md active:scale-[0.98] transition-transform"
          >
            完成
          </button>
          <button
            onClick={() => setCurrentStep('complete')}
            className="w-full text-blue-500 py-3"
          >
            稍後設定
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  // iOS - 步驟 5: 完成
  const IOSCompleteStep = () => (
    <motion.div
      key="ios-complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-8xl mb-8"
        >
          ✨
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl mb-4 text-white"
          style={{ fontFamily: '-apple-system' }}
        >
          一切就緒
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-100 text-xl mb-10"
        >
          開始使用 Timeless
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white text-blue-600 px-10 py-4 rounded-2xl text-lg shadow-xl active:scale-[0.98] transition-transform"
        >
          開始
        </motion.button>
      </div>
    </motion.div>
  );

  // ============= Android 風格組件 =============
  
  // Android - 步驟 1: 登入
  const AndroidLoginStep = () => (
    <motion.div
      key="android-login"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="rounded-full overflow-hidden shadow-xl" style={{ width: 120, height: 120 }}>
              <FitnessIcon size={120} />
            </div>
          </motion.div>

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
          >
            追蹤你的健康數據
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={() => {
                setIsLoading(true);
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
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full flex items-center justify-center gap-3 font-medium shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              </svg>
              {isLoading ? '登入中...' : '使用 Google 帳戶登入'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">或</span>
              </div>
            </div>

            <button className="w-full border-2 border-violet-600 text-violet-600 py-4 rounded-full flex items-center justify-center gap-3 font-medium active:scale-[0.98] transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              使用電子郵件登入
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  // Android - 步驟 2: 歡迎
  const AndroidWelcomeStep = () => (
    <motion.div
      key="android-welcome"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
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
                className="w-28 h-28 rounded-full border-4 border-violet-200 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-medium mb-3 text-gray-900" style={{ fontFamily: 'Roboto' }}>
              嗨，{userData?.name}！
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 text-center mb-8"
          >
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-violet-900 font-medium">登入成功！</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setCurrentStep('biometric')}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all"
          >
            繼續設定
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Android - 步驟 3: 指紋辨識
  const AndroidBiometricStep = () => (
    <motion.div
      key="android-biometric"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-6xl shadow-2xl">
              👆
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-medium mb-3 text-gray-900" style={{ fontFamily: 'Roboto' }}>
              啟用指紋辨識
            </h2>
            <p className="text-gray-600 leading-relaxed">
              使用指紋快速安全地登入
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">極速登入</p>
                <p className="text-gray-600 text-sm">輕觸即可完成</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">安全保障</p>
                <p className="text-gray-600 text-sm">資料加密保護</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">靈活控制</p>
                <p className="text-gray-600 text-sm">隨時開關設定</p>
              </div>
            </div>
          </motion.div>

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
                setTimeout(() => {
                  setIsLoading(false);
                  setCurrentStep('setup-profile');
                }, 2000);
              }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? '設定中...' : '啟用指紋辨識'}
            </button>

            <button
              onClick={() => setCurrentStep('setup-profile')}
              disabled={isLoading}
              className="w-full text-violet-600 py-3 font-medium"
            >
              稍後再說
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-500 text-center mt-6"
          >
            🔒 指紋資料儲存在您的裝置上
          </motion.p>
        </div>
      </div>
    </motion.div>
  );

  // Android - 步驟 4: 個人資料
  const AndroidSetupProfileStep = () => (
    <motion.div
      key="android-profile"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 pt-16"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-10 h-1 bg-violet-600 rounded-full"></div>
          <div className="w-10 h-1 bg-violet-600 rounded-full"></div>
          <div className="w-10 h-1 bg-violet-300 rounded-full"></div>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-medium mb-2 text-gray-900"
          style={{ fontFamily: 'Roboto' }}
        >
          設定個人資料
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-8"
        >
          量身打造你的健康計畫
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">年齡</label>
            <input
              type="number"
              placeholder="25"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">體重（公斤）</label>
            <input
              type="number"
              placeholder="70"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">健康目標</label>
            <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors">
              <option>減重</option>
              <option>增肌</option>
              <option>維持健康</option>
              <option>提升體能</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">每日步數目標</label>
            <input
              type="number"
              placeholder="10000"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 space-y-3"
        >
          <button
            onClick={() => setCurrentStep('complete')}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all"
          >
            完成設定
          </button>
          <button
            onClick={() => setCurrentStep('complete')}
            className="w-full text-violet-600 py-3 font-medium"
          >
            稍後再設定
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  // Android - 步驟 5: 完成
  const AndroidCompleteStep = () => (
    <motion.div
      key="android-complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* 裝飾背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-5xl mb-4 text-white font-bold" style={{ fontFamily: 'Roboto' }}>
            一切就緒！
          </h1>
          <p className="text-violet-100 text-xl mb-8">
            {userData?.name}，準備好開始了嗎？
          </p>

          {biometricEnabled && (
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-8 inline-block">
              <p className="text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                指紋辨識已啟用
              </p>
            </div>
          )}

          <button
            onClick={() => alert('前往 Dashboard')}
            className="bg-white text-violet-600 px-10 py-4 rounded-full text-lg font-medium shadow-2xl active:scale-[0.98] transition-all"
          >
            開始使用 Timeless
          </button>
        </motion.div>
      </div>

      {/* Material Design FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center"
      >
        <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    </motion.div>
  );

  // 根據平台渲染對應的步驟
  const renderStep = () => {
    const isIOS = platform === 'ios';

    if (currentStep === 'login') {
      return isIOS ? <IOSLoginStep /> : <AndroidLoginStep />;
    }
    if (currentStep === 'welcome') {
      return isIOS ? <IOSWelcomeStep /> : <AndroidWelcomeStep />;
    }
    if (currentStep === 'biometric') {
      return isIOS ? <IOSBiometricStep /> : <AndroidBiometricStep />;
    }
    if (currentStep === 'setup-profile') {
      return isIOS ? <IOSSetupProfileStep /> : <AndroidSetupProfileStep />;
    }
    if (currentStep === 'complete') {
      return isIOS ? <IOSCompleteStep /> : <AndroidCompleteStep />;
    }
  };

  return (
    <div>
      {/* 平台指示器 */}
      <div className="fixed top-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
        {platform === 'ios' && '🍎 iOS'}
        {platform === 'android' && '🤖 Android'}
        {platform === 'web' && '🌐 Web (Android)'}
      </div>

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
