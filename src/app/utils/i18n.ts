// 多語言翻譯檔案

export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

export const translations = {
  'zh-TW': {
    // 登入頁面
    appName: 'Timeless',
    tagline: '在你的永恆旅程中努力',
    continueWithApple: '繼續使用 Apple',
    continueWithGoogle: '使用 Google 帳戶登入',
    continueWithEmail: '使用電子郵件登入',
    loggingIn: '登入中...',
    or: '或',
    termsAndPrivacy: '登入即表示您同意我們的',
    terms: '服務條款',
    and: '和',
    privacy: '隱私政策',
    
    // 歡迎頁面
    welcomeTitle: '歡迎，{name}',
    loginSuccess: '登入成功！',
    welcomeMessage: '歡迎來到 Timeless',
    continue: '繼續',
    
    // 生物辨識頁面
    enableFaceID: '啟用 Face ID',
    enableFingerprint: '啟用指紋辨識',
    biometricDescription: '下次登入時，只需要 {type} 驗證，更快速、更安全',
    biometricDescriptionShort: '使用 {type} 快速安全地登入',
    faceID: 'Face ID',
    fingerprint: '指紋辨識',
    quickLogin: '快速登入',
    quickLoginDesc: '一秒完成驗證',
    highSecurity: '更高安全性',
    highSecurityDesc: '只有你能存取資料',
    flexibleControl: '隨時可關閉',
    flexibleControlDesc: '在設定中調整',
    securityNote: '🔒 {type} 資料儲存在您的裝置上，Timeless 無法存取',
    enableBiometric: '啟用 {type}',
    skipForNow: '暫時跳過',
    setupLater: '稍後設定',
    skipSetup: '稍後再說',
    setting: '設定中...',
    
    // 個人資料頁面
    setupProfile: '設定個人資料',
    setupProfileDesc: '幫助我們為你量身打造健康計畫',
    setupGoals: '設定你的目標',
    age: '年齡',
    ageExample: '例如：25',
    birthdate: '生日',
    birthdateExample: '選擇你的生日',
    weight: '體重（公斤）',
    weightExample: '例如：70',
    weightKg: '體重',
    weightUnit: '單位',
    kg: '公斤',
    lbs: '磅',
    healthGoal: '健康目標',
    healthyChoice: '健康選擇',
    healthyChoiceDesc: '選擇一個或多個目標',
    chooseGoal: '選擇你的目標',
    loseWeight: '減重',
    gainMuscle: '增肌',
    stayHealthy: '維持健康',
    improvePerformance: '提升體能',
    betterSleep: '改善睡眠',
    reduceStress: '減少壓力',
    dailySteps: '每日步數目標',
    stepsExample: '例如：10000',
    completeSetup: '完成設定',
    setupLaterButton: '稍後再設定',
    
    // 完成頁面
    allSet: '一切就緒！',
    allSetMessage: '{name}，準備好開始你的健康之旅了嗎？',
    allSetMessageShort: '開始使用 Timeless',
    biometricEnabled: '{type} 已啟用',
    startUsing: '開始使用 Timeless',
    start: '開始',
    
    // 通用
    hi: '嗨',
    ready: '準備好了嗎？',
  },
  
  'zh-CN': {
    // 登入页面
    appName: 'Timeless',
    tagline: '在你的永恒旅程中努力',
    continueWithApple: '继续使用 Apple',
    continueWithGoogle: '使用 Google 账户登录',
    continueWithEmail: '使用电子邮件登录',
    loggingIn: '登录中...',
    or: '或',
    termsAndPrivacy: '登录即表示您同意我们的',
    terms: '服务条款',
    and: '和',
    privacy: '隐私政策',
    
    // 欢迎页面
    welcomeTitle: '欢迎，{name}',
    loginSuccess: '登录成功！',
    welcomeMessage: '欢迎来到 Timeless',
    continue: '继续',
    
    // 生物识别页面
    enableFaceID: '启用 Face ID',
    enableFingerprint: '启用指纹识别',
    biometricDescription: '下次登录时，只需要 {type} 验证，更快速、更安全',
    biometricDescriptionShort: '使用 {type} 快速安全地登录',
    faceID: 'Face ID',
    fingerprint: '指纹识别',
    quickLogin: '快速登录',
    quickLoginDesc: '一秒完成验证',
    highSecurity: '更高安全性',
    highSecurityDesc: '只有你能访问数据',
    flexibleControl: '随时可关闭',
    flexibleControlDesc: '在设置中调整',
    securityNote: '🔒 {type} 数据储存在您的设备上，Timeless 无法访问',
    enableBiometric: '启用 {type}',
    skipForNow: '暂时跳过',
    setupLater: '稍后设置',
    skipSetup: '稍后再说',
    setting: '设置中...',
    
    // 个人资料页面
    setupProfile: '设置个人资料',
    setupProfileDesc: '帮助我们为你量身打造健康计划',
    setupGoals: '设置你的目标',
    age: '年龄',
    ageExample: '例如：25',
    birthdate: '生日',
    birthdateExample: '选择你的生日',
    weight: '体重（公斤）',
    weightExample: '例如：70',
    weightKg: '体重',
    weightUnit: '单位',
    kg: '公斤',
    lbs: '磅',
    healthGoal: '健康目标',
    healthyChoice: '健康选择',
    healthyChoiceDesc: '选择一个或多個目标',
    chooseGoal: '选择你的目标',
    loseWeight: '减重',
    gainMuscle: '增肌',
    stayHealthy: '保持健康',
    improvePerformance: '提升体能',
    betterSleep: '改善睡眠',
    reduceStress: '减少压力',
    dailySteps: '每日步数目标',
    stepsExample: '例如：10000',
    completeSetup: '完成设置',
    setupLaterButton: '稍后再设置',
    
    // 完成页面
    allSet: '一切就绪！',
    allSetMessage: '{name}，准备好开始你的健康之旅了吗？',
    allSetMessageShort: '开始使用 Timeless',
    biometricEnabled: '{type} 已启用',
    startUsing: '开始使用 Timeless',
    start: '开始',
    
    // 通用
    hi: '嗨',
    ready: '准备好了吗？',
  },
  
  'en': {
    // Login page
    appName: 'Timeless',
    tagline: 'Strive on your timeless journey',
    continueWithApple: 'Continue with Apple',
    continueWithGoogle: 'Sign in with Google',
    continueWithEmail: 'Sign in with Email',
    loggingIn: 'Signing in...',
    or: 'or',
    termsAndPrivacy: 'By continuing, you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
    
    // Welcome page
    welcomeTitle: 'Welcome, {name}',
    loginSuccess: 'Login successful!',
    welcomeMessage: 'Welcome to Timeless',
    continue: 'Continue',
    
    // Biometric page
    enableFaceID: 'Enable Face ID',
    enableFingerprint: 'Enable Fingerprint',
    biometricDescription: 'Next time, just use {type} to sign in - faster and more secure',
    biometricDescriptionShort: 'Use {type} for quick and secure sign in',
    faceID: 'Face ID',
    fingerprint: 'fingerprint',
    quickLogin: 'Quick sign in',
    quickLoginDesc: 'Complete in one second',
    highSecurity: 'High security',
    highSecurityDesc: 'Only you can access',
    flexibleControl: 'Easy to disable',
    flexibleControlDesc: 'Change in settings',
    securityNote: '🔒 {type} data is stored on your device, Timeless cannot access it',
    enableBiometric: 'Enable {type}',
    skipForNow: 'Skip for now',
    setupLater: 'Set up later',
    skipSetup: 'Maybe later',
    setting: 'Setting up...',
    
    // Profile setup page
    setupProfile: 'Set up your profile',
    setupProfileDesc: 'Help us personalize your health plan',
    setupGoals: 'Set your goals',
    age: 'Age',
    ageExample: 'e.g. 25',
    birthdate: 'Birthdate',
    birthdateExample: 'Select your birthdate',
    weight: 'Weight (kg)',
    weightExample: 'e.g. 70',
    weightKg: 'Weight',
    weightUnit: 'Unit',
    kg: 'kg',
    lbs: 'lbs',
    healthGoal: 'Health goal',
    healthyChoice: 'Healthy choice',
    healthyChoiceDesc: 'Choose one or more goals',
    chooseGoal: 'Choose your goal',
    loseWeight: 'Lose weight',
    gainMuscle: 'Gain muscle',
    stayHealthy: 'Stay healthy',
    improvePerformance: 'Improve performance',
    betterSleep: 'Better sleep',
    reduceStress: 'Reduce stress',
    dailySteps: 'Daily steps goal',
    stepsExample: 'e.g. 10000',
    completeSetup: 'Complete setup',
    setupLaterButton: 'Set up later',
    
    // Complete page
    allSet: 'All set!',
    allSetMessage: '{name}, ready to start your health journey?',
    allSetMessageShort: 'Start using Timeless',
    biometricEnabled: '{type} enabled',
    startUsing: 'Start using Timeless',
    start: 'Start',
    
    // Common
    hi: 'Hi',
    ready: 'Ready?',
  },
  
  'ja': {
    // ログインページ
    appName: 'Timeless',
    tagline: 'あなたの永遠の旅で努力する',
    continueWithApple: 'Appleで続ける',
    continueWithGoogle: 'Googleでログイン',
    continueWithEmail: 'メールでログイン',
    loggingIn: 'ログイン中...',
    or: 'または',
    termsAndPrivacy: '続行することで、以下に同意したことになります',
    terms: '利用規約',
    and: 'と',
    privacy: 'プライバシーポリシー',
    
    // ウェルカムページ
    welcomeTitle: 'ようこそ、{name}さん',
    loginSuccess: 'ログイン成功！',
    welcomeMessage: 'Timelessへようこそ',
    continue: '続ける',
    
    // 生体認証ページ
    enableFaceID: 'Face IDを有効にする',
    enableFingerprint: '指紋認証を有効にする',
    biometricDescription: '次回から{type}でログイン - より速く、より安全に',
    biometricDescriptionShort: '{type}で素早く安全にログイン',
    faceID: 'Face ID',
    fingerprint: '指紋認証',
    quickLogin: 'クイックログイン',
    quickLoginDesc: '1秒で完了',
    highSecurity: '高セキュリティ',
    highSecurityDesc: 'あなただけがアクセス可能',
    flexibleControl: 'いつでも無効化',
    flexibleControlDesc: '設定で変更可能',
    securityNote: '🔒 {type}データはデバイスに保存され、Timelessはアクセスできません',
    enableBiometric: '{type}を有効にする',
    skipForNow: 'スキップ',
    setupLater: '後で設定',
    skipSetup: '後で',
    setting: '設定中...',
    
    // プロフィール設定ページ
    setupProfile: 'プロフィール設定',
    setupProfileDesc: 'あなたに合った健康プランを作成します',
    setupGoals: '目標を設定',
    age: '年齢',
    ageExample: '例：25',
    birthdate: '誕生日',
    birthdateExample: '誕生日を選択',
    weight: '体重（kg）',
    weightExample: '例：70',
    weightKg: '体重',
    weightUnit: '単位',
    kg: 'kg',
    lbs: 'ポンド',
    healthGoal: '健康目標',
    healthyChoice: '健康チョイス',
    healthyChoiceDesc: '1つ以上の目標を選択',
    chooseGoal: '目標を選択',
    loseWeight: '減量',
    gainMuscle: '筋肉増強',
    stayHealthy: '健康維持',
    improvePerformance: 'パフォーマンス向上',
    betterSleep: '睡眠改善',
    reduceStress: 'ストレス軽減',
    dailySteps: '1日の歩数目標',
    stepsExample: '例：10000',
    completeSetup: '設定完了',
    setupLaterButton: '後で設定',
    
    // 完了ページ
    allSet: '準備完了！',
    allSetMessage: '{name}さん、健康の旅を始める準備はできましたか？',
    allSetMessageShort: 'Timelessを使い始める',
    biometricEnabled: '{type}が有効になりました',
    startUsing: 'Timelessを使い始める',
    start: 'スタート',
    
    // 共通
    hi: 'こんにちは',
    ready: '準備OK？',
  },
  
  'ko': {
    // 로그인 페이지
    appName: 'Timeless',
    tagline: '당신의 영원한 여정에서 노력하세요',
    continueWithApple: 'Apple로 계속하기',
    continueWithGoogle: 'Google 계정으로 로그인',
    continueWithEmail: '이메일로 로그인',
    loggingIn: '로그인 중...',
    or: '또는',
    termsAndPrivacy: '계속하면 다음에 동의하게 됩니다',
    terms: '서비스 약관',
    and: '및',
    privacy: '개인정보 보호정책',
    
    // 환영 페이지
    welcomeTitle: '환영합니다, {name}님',
    loginSuccess: '로그인 성공!',
    welcomeMessage: 'Timeless에 오신 것을 환영합니다',
    continue: '계속',
    
    // 생체인증 페이지
    enableFaceID: 'Face ID 활성화',
    enableFingerprint: '지문 인식 활성화',
    biometricDescription: '다음에는 {type}로 로그인 - 더 빠르고 안전하게',
    biometricDescriptionShort: '{type}를 사용하여 빠르고 안전하게 로그인',
    faceID: 'Face ID',
    fingerprint: '지문 인식',
    quickLogin: '빠른 로그인',
    quickLoginDesc: '1초 만에 완료',
    highSecurity: '높은 보안',
    highSecurityDesc: '본인만 접근 가능',
    flexibleControl: '언제든지 비활성화',
    flexibleControlDesc: '설정에서 변경',
    securityNote: '🔒 {type} 데이터는 기기에 저장되며, Timeless는 접근할 수 없습니다',
    enableBiometric: '{type} 활성화',
    skipForNow: '건너뛰기',
    setupLater: '나중에 설정',
    skipSetup: '나중에',
    setting: '설정 중...',
    
    // 프로필 설정 페이지
    setupProfile: '프로필 설정',
    setupProfileDesc: '맞춤형 건강 계획을 만들어드립니다',
    setupGoals: '목표 설정',
    age: '나이',
    ageExample: '예: 25',
    birthdate: '생년월일',
    birthdateExample: '생년월일 선택',
    weight: '체중 (kg)',
    weightExample: '예: 70',
    weightKg: '체중',
    weightUnit: '단위',
    kg: 'kg',
    lbs: '파운드',
    healthGoal: '건강 목표',
    healthyChoice: '건강 선택',
    healthyChoiceDesc: '하나 이상의 목표를 선택하세요',
    chooseGoal: '목표 선택',
    loseWeight: '체중 감량',
    gainMuscle: '근육 증가',
    stayHealthy: '건강 유지',
    improvePerformance: '체력 향상',
    betterSleep: '수면 개선',
    reduceStress: '스트레스 감소',
    dailySteps: '일일 걸음 수 목표',
    stepsExample: '예: 10000',
    completeSetup: '설정 완료',
    setupLaterButton: '나중에 설정',
    
    // 완료 페이지
    allSet: '준비 완료!',
    allSetMessage: '{name}님, 건강 여정을 시작할 준비가 되셨나요?',
    allSetMessageShort: 'Timeless 사용 시작',
    biometricEnabled: '{type} 활성화됨',
    startUsing: 'Timeless 사용 시작',
    start: '시작',
    
    // 공통
    hi: '안녕하세요',
    ready: '준비되셨나요?',
  },
};

// 偵測用戶語言
export const detectLanguage = (): Language => {
  // 1. 優先使用用戶明確選擇的語言（localStorage）
  const savedLanguage = localStorage.getItem('userLanguage') as Language;
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }
  
  // 2. 使用瀏覽器語言設定
  const browserLang = navigator.language || (navigator as any).userLanguage;
  console.log('🌍 偵測到的瀏覽器語言:', browserLang);
  
  // 處理語言代碼
  if (browserLang.startsWith('zh')) {
    // 中文區分繁簡
    if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
      return 'zh-TW'; // 繁體中文（台灣、香港、澳門）
    }
    return 'zh-CN'; // 簡體中文
  }
  
  if (browserLang.startsWith('ja')) {
    return 'ja'; // 日文
  }
  
  if (browserLang.startsWith('ko')) {
    return 'ko'; // 韓文
  }
  
  if (browserLang.startsWith('en')) {
    return 'en'; // 英文
  }
  
  // 3. 預設使用繁體中文
  return 'zh-TW';
};

// 翻譯函數（支援變數替換）
export const t = (key: keyof typeof translations['zh-TW'], lang: Language, replacements?: Record<string, string>): string => {
  let text = translations[lang][key] || translations['zh-TW'][key] || key;
  
  // 替換變數，例如 {name} -> 實際名字
  if (replacements) {
    Object.keys(replacements).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
  }
  
  return text;
};

// 取得所有支援的語言
export const supportedLanguages = [
  { code: 'zh-TW' as Language, name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN' as Language, name: '简体中文', flag: '🇨🇳' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
];

// 儲存用戶選擇的語言
export const saveLanguage = (lang: Language) => {
  localStorage.setItem('userLanguage', lang);
};