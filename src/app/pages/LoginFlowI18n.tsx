import { FitnessIcon } from '../components/FitnessIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { detectLanguage, t, type Language, supportedLanguages, saveLanguage } from '../utils/i18n';
import { fetchHealthGoals, type HealthGoalItem } from '../utils/cmsData';

interface UserData {
  name: string;
  email: string;
  picture: string;
}

type FlowStep = 'login' | 'welcome' | 'biometric' | 'setup-profile' | 'complete';
type Platform = 'ios' | 'android' | 'web';

const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/android/i.test(userAgent)) return 'android';
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios';
  return 'web';
};

export function LoginFlowI18n() {
  const [platform, setPlatform] = useState<Platform>('web');
  const [language, setLanguage] = useState<Language>('zh-TW');
  const [currentStep, setCurrentStep] = useState<FlowStep>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [healthGoals, setHealthGoals] = useState<HealthGoalItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreGoals, setHasMoreGoals] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [longPressedGoal, setLongPressedGoal] = useState<string | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  useEffect(() => {
    setPlatform(detectPlatform());
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    console.log('🌍 使用語言:', detectedLang);
    
    // 檢查是否為第一次登入
    const hasProfile = localStorage.getItem('hasUserProfile');
    const savedBiometric = localStorage.getItem('biometricEnabled');
    if (hasProfile) {
      setIsFirstTimeUser(false);
      if (savedBiometric === 'true') {
        setBiometricEnabled(true);
      }
      console.log('👤 歡迎回來！');
    } else {
      console.log('🆕 第一次登入');
    }

    // 載入第一頁的健康目標
    loadInitialGoals();
  }, []);

  // 載入初始健康目標
  const loadInitialGoals = async () => {
    const goals = await fetchHealthGoals(0, 6);
    setHealthGoals(goals);
    setCurrentPage(0);
    if (goals.length < 6) {
      setHasMoreGoals(false);
    }
  };

  // 載入更多健康目標（無限滾動）
  const loadMoreGoals = async () => {
    if (isLoadingMore || !hasMoreGoals) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const newGoals = await fetchHealthGoals(nextPage, 6);
    
    if (newGoals.length > 0) {
      setHealthGoals(prev => [...prev, ...newGoals]);
      setCurrentPage(nextPage);
    }
    
    if (newGoals.length < 6) {
      setHasMoreGoals(false);
    }
    
    setIsLoadingMore(false);
  };

  // 監聽滾動事件
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // 當滾動到底部附近時載入更多
    if (scrollHeight - scrollTop - clientHeight < 100) {
      loadMoreGoals();
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveLanguage(newLang);
    setShowLanguageSelector(false);
    console.log('🌍 切換語言至:', newLang);
  };

  const biometricType = platform === 'ios' 
    ? t('faceID', language) 
    : t('fingerprint', language);

  // 語言選擇器
  const LanguageSelector = () => (
    <AnimatePresence>
      {showLanguageSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLanguageSelector(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
          >
            <h3 className="text-xl font-medium mb-4 text-gray-900">選擇語言 / Select Language</h3>
            <div className="space-y-2">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                    language === lang.code
                      ? 'bg-violet-100 text-violet-900 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <svg className="w-5 h-5 ml-auto text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Android 登入頁面
  const AndroidLoginStep = () => (
    <motion.div
      key="login"
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
          >
            {t('appName', language)}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-center mb-8"
          >
            {t('tagline', language)}
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
                    name: language === 'en' ? 'John Doe' : language === 'ja' ? '山田太郎' : language === 'ko' ? '김철수' : '張小明',
                    email: 'user@gmail.com',
                    picture: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYxOTkyNTR8MA&ixlib=rb-4.1.0&q=80&w=400'
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
              {isLoading ? t('loggingIn', language) : t('continueWithGoogle', language)}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-xs text-gray-500"
        >
          {t('termsAndPrivacy', language)}{' '}
          <a href="#" className="text-violet-600 underline">{t('terms', language)}</a>
          {' '}{t('and', language)}{' '}
          <a href="#" className="text-violet-600 underline">{t('privacy', language)}</a>
        </motion.div>
      </div>
    </motion.div>
  );

  // 歡迎頁面
  const WelcomeStep = () => (
    <motion.div
      key="welcome"
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
              <div className="w-28 h-28 rounded-full border-4 border-violet-200 shadow-lg overflow-hidden bg-white">
                <FitnessIcon size={112} />
              </div>
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
            <h2 className="text-3xl font-medium mb-3 text-gray-900">
              {t('welcomeTitle', language, { name: userData?.name || '' })}
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
          </motion.div>

          {isFirstTimeUser ? (
            // 第一次登入：建立個人資料
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 text-center mb-8"
              >
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-violet-900 font-medium">{t('loginSuccess', language)}</p>
                <p className="text-violet-700 text-sm mt-2">
                  {language === 'zh-TW' && '讓我們開始設定你的個人資料'}
                  {language === 'zh-CN' && '让我们开始设置你的个人资料'}
                  {language === 'en' && "Let's set up your profile"}
                  {language === 'ja' && 'プロフィールを設定しましょう'}
                  {language === 'ko' && '프로필을 설정해봅시다'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <button
                  onClick={() => setCurrentStep('biometric')}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all"
                >
                  {language === 'zh-TW' && '開始設定'}
                  {language === 'zh-CN' && '开始设置'}
                  {language === 'en' && 'Get Started'}
                  {language === 'ja' && '設定を開始'}
                  {language === 'ko' && '시작하기'}
                </button>

                <button
                  onClick={() => {
                    // 跳過設定流程，標記為已有個人資料，直接進入完成頁面
                    localStorage.setItem('hasUserProfile', 'true');
                    setCurrentStep('complete');
                  }}
                  className="w-full text-violet-600 py-3 font-medium hover:bg-violet-50 rounded-full transition-all"
                >
                  {language === 'zh-TW' && '跳過設定'}
                  {language === 'zh-CN' && '跳过设置'}
                  {language === 'en' && 'Skip Setup'}
                  {language === 'ja' && 'スキップ'}
                  {language === 'ko' && '건너뛰기'}
                </button>
              </motion.div>
            </>
          ) : (
            // 再次登入：歡迎回來
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 mb-8"
              >
                <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">👋</div>
                  <p className="text-violet-900 font-medium text-lg">
                    {language === 'zh-TW' && '歡迎回來！'}
                    {language === 'zh-CN' && '欢迎回来！'}
                    {language === 'en' && 'Welcome back!'}
                    {language === 'ja' && 'おかえりなさい！'}
                    {language === 'ko' && '다시 오신 것을 환영합니다！'}
                  </p>
                </div>

                {/* 顯示用戶的統計資料 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-violet-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-violet-600">7</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'zh-TW' && '天'}
                      {language === 'zh-CN' && '天'}
                      {language === 'en' && 'Days'}
                      {language === 'ja' && '日'}
                      {language === 'ko' && '일'}
                    </div>
                  </div>
                  <div className="bg-fuchsia-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-fuchsia-600">12.5k</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'zh-TW' && '步數'}
                      {language === 'zh-CN' && '步数'}
                      {language === 'en' && 'Steps'}
                      {language === 'ja' && '歩数'}
                      {language === 'ko' && '걸음'}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {language === 'zh-TW' && '目標'}
                      {language === 'zh-CN' && '目标'}
                      {language === 'en' && 'Goal'}
                      {language === 'ja' && '目標'}
                      {language === 'ko' && '목표'}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  // 再次登入直接進入 Dashboard
                  setTimeout(() => {
                    alert(language === 'zh-TW' ? '進入主畫面...' : 
                          language === 'zh-CN' ? '进入主画面...' : 
                          language === 'en' ? 'Entering Dashboard...' : 
                          language === 'ja' ? 'ダッシュボードに入る...' : 
                          '대시보드로 이동...');
                  }, 300);
                }}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all"
              >
                {language === 'zh-TW' && '開始使用'}
                {language === 'zh-CN' && '开始使用'}
                {language === 'en' && 'Continue'}
                {language === 'ja' && '続ける'}
                {language === 'ko' && '계속하기'}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  // 生物辨識頁面
  const BiometricStep = () => (
    <motion.div
      key="biometric"
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
              {platform === 'ios' ? '👤' : '👆'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-medium mb-3 text-gray-900">
              {platform === 'ios' ? t('enableFaceID', language) : t('enableFingerprint', language)}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('biometricDescriptionShort', language, { type: biometricType })}
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
                <p className="text-gray-900 font-medium">{t('quickLogin', language)}</p>
                <p className="text-gray-600 text-sm">{t('quickLoginDesc', language)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">{t('highSecurity', language)}</p>
                <p className="text-gray-600 text-sm">{t('highSecurityDesc', language)}</p>
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
                  localStorage.setItem('biometricEnabled', 'true');
                  setCurrentStep('setup-profile');
                }, 2000);
              }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? t('setting', language) : t('enableBiometric', language, { type: biometricType })}
            </button>

            <button
              onClick={() => {
                localStorage.setItem('biometricEnabled', 'false');
                setCurrentStep('setup-profile');
              }}
              disabled={isLoading}
              className="w-full text-violet-600 py-3 font-medium"
            >
              {t('skipSetup', language)}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-500 text-center mt-6"
          >
            {t('securityNote', language, { type: biometricType })}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );

  // 個人資料設定頁面
  const SetupProfileStep = () => {
    const toggleGoal = (goalId: string) => {
      if (selectedGoals.includes(goalId)) {
        setSelectedGoals(selectedGoals.filter(id => id !== goalId));
      } else {
        setSelectedGoals([...selectedGoals, goalId]);
      }
    };

    // 長按處理
    const handleLongPressStart = (goalId: string) => {
      longPressTimerRef.current = setTimeout(() => {
        setLongPressedGoal(goalId);
      }, 500); // 500ms 觸發長按
    };

    const handleLongPressEnd = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
      setLongPressedGoal(null);
    };

    const handleLongPressCancel = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };

    // 將健康目標分為已選擇和未選擇兩組
    const selectedGoalItems = healthGoals.filter(goal => selectedGoals.includes(goal.id));
    const unselectedGoalItems = healthGoals.filter(goal => !selectedGoals.includes(goal.id));

    return (
      <motion.div
        key="profile"
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
          >
            {t('setupProfile', language)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mb-8"
          >
            {t('setupProfileDesc', language)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg space-y-5"
          >
            {/* Birthdate Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">{t('birthdate', language)}</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Weight Field with Unit Toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-gray-700 font-medium">{t('weightKg', language)}</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setWeightUnit('kg')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      weightUnit === 'kg' 
                        ? 'bg-white text-violet-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('kg', language)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeightUnit('lbs')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      weightUnit === 'lbs' 
                        ? 'bg-white text-violet-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('lbs', language)}
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder={weightUnit === 'kg' ? (language === 'zh-TW' || language === 'zh-CN' ? '例如：70' : language === 'ja' ? '例：70' : language === 'ko' ? '예: 70' : 'e.g. 70') : (language === 'zh-TW' || language === 'zh-CN' ? '例如：154' : language === 'ja' ? '例：154' : language === 'ko' ? '예: 154' : 'e.g. 154')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors"
                  step={weightUnit === 'kg' ? '0.1' : '0.5'}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  {weightUnit}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3 font-medium">{t('healthyChoice', language)}</label>
              <p className="text-xs text-gray-500 mb-3">{t('healthyChoiceDesc', language)}</p>
              
              {/* 已選擇的項目 - 顯示在頂部 */}
              <AnimatePresence mode="popLayout">
                {selectedGoalItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b-2 border-violet-100">
                      {selectedGoalItems.map((goal) => (
                        <motion.div key={goal.id} className="relative">
                          <motion.button
                            layoutId={`goal-${goal.id}`}
                            onClick={() => toggleGoal(goal.id)}
                            onMouseDown={() => handleLongPressStart(goal.id)}
                            onMouseUp={handleLongPressCancel}
                            onMouseLeave={handleLongPressCancel}
                            onTouchStart={() => handleLongPressStart(goal.id)}
                            onTouchEnd={handleLongPressEnd}
                            onTouchCancel={handleLongPressCancel}
                            className="relative w-14 h-14 rounded-xl border-2 border-violet-500 bg-violet-50 transition-all hover:bg-violet-100 flex items-center justify-center"
                          >
                            <motion.div layout="position" className="text-2xl">{goal.icon}</motion.div>
                            
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center shadow-md"
                            >
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          </motion.button>
                          
                          {/* 長按顯示標題 */}
                          <AnimatePresence>
                            {longPressedGoal === goal.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                              >
                                <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                                  {goal.translations[language]}
                                  {/* 三角形箭頭 */}
                                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* 未選擇的項目 - 可滾動列表 */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-gray-100"
              >
                {unselectedGoalItems.map((goal, index) => (
                  <motion.button
                    key={goal.id}
                    layoutId={`goal-${goal.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleGoal(goal.id)}
                    className="relative p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-violet-300 transition-all"
                    onMouseDown={() => handleLongPressStart(goal.id)}
                    onMouseUp={handleLongPressEnd}
                    onMouseLeave={handleLongPressCancel}
                    onTouchStart={() => handleLongPressStart(goal.id)}
                    onTouchEnd={handleLongPressEnd}
                    onTouchCancel={handleLongPressCancel}
                  >
                    <motion.div layout="position" className="text-3xl mb-2">{goal.icon}</motion.div>
                    <motion.div layout="position" className="text-sm font-medium text-gray-700">
                      {goal.translations[language]}
                    </motion.div>
                  </motion.button>
                ))}

                {/* 載入更多指示器 */}
                {isLoadingMore && (
                  <div className="col-span-2 flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* 沒有更多項目的提示 */}
                {!hasMoreGoals && healthGoals.length > 0 && (
                  <div className="col-span-2 text-center py-3 text-xs text-gray-400">
                    {language === 'zh-TW' && '已顯示所有選項'}
                    {language === 'zh-CN' && '已显示所有选项'}
                    {language === 'en' && 'All options shown'}
                    {language === 'ja' && 'すべて表示'}
                    {language === 'ko' && '모든 옵션 표시됨'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 space-y-3"
          >
            <button
              onClick={() => {
                // 儲存個人資料設定完成的狀態
                localStorage.setItem('hasUserProfile', 'true');
                setCurrentStep('complete');
              }}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full shadow-lg active:scale-[0.98] transition-all"
            >
              {t('completeSetup', language)}
            </button>
            <button
              onClick={() => {
                // 即使跳過，也標記為已有個人資料
                localStorage.setItem('hasUserProfile', 'true');
                setCurrentStep('complete');
              }}
              className="w-full text-violet-600 py-3 font-medium"
            >
              {t('setupLaterButton', language)}
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // 完成頁面
  const CompleteStep = () => (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 flex items-center justify-center p-6"
    >
      <div className="text-center">
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
          <h1 className="text-5xl mb-4 text-white font-bold">
            {t('allSet', language)}
          </h1>
          <p className="text-violet-100 text-xl mb-8">
            {t('allSetMessage', language, { name: userData?.name || '' })}
          </p>

          {biometricEnabled && (
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-8 inline-block">
              <p className="text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('biometricEnabled', language, { type: biometricType })}
              </p>
            </div>
          )}

          <button
            onClick={() => alert('Dashboard')}
            className="bg-white text-violet-600 px-10 py-4 rounded-full text-lg font-medium shadow-2xl active:scale-[0.98] transition-all"
          >
            {t('startUsing', language)}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* 語言與平台指示器 */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
        <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
          {platform === 'ios' && '🍎 iOS'}
          {platform === 'android' && '🤖 Android'}
          {platform === 'web' && '🌐 Web'}
        </div>
        <button
          onClick={() => setShowLanguageSelector(true)}
          className="bg-black/70 hover:bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur transition-all flex items-center gap-2"
        >
          <span>🌍</span>
          <span>{supportedLanguages.find(l => l.code === language)?.name}</span>
        </button>
        
        {/* 重置按鈕 - 測試第一次登入流程 */}
        <button
          onClick={() => {
            localStorage.removeItem('hasUserProfile');
            localStorage.removeItem('biometricEnabled');
            setIsFirstTimeUser(true);
            setBiometricEnabled(false);
            setCurrentStep('login');
            console.log('🔄 已重置為第一次登入狀態');
          }}
          className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur transition-all"
          title="重置為第一次登入"
        >
          🔄 重置
        </button>
      </div>

      <LanguageSelector />

      <AnimatePresence mode="wait">
        {currentStep === 'login' && <AndroidLoginStep />}
        {currentStep === 'welcome' && <WelcomeStep />}
        {currentStep === 'biometric' && <BiometricStep />}
        {currentStep === 'setup-profile' && <SetupProfileStep />}
        {currentStep === 'complete' && <CompleteStep />}
      </AnimatePresence>
    </div>
  );
}