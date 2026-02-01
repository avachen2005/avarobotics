// 模擬 CMS 數據結構

export interface HealthGoalItem {
  id: string;
  icon: string;
  translations: {
    'zh-TW': string;
    'zh-CN': string;
    'en': string;
    'ja': string;
    'ko': string;
  };
  category?: string;
  order?: number;
}

// 模擬從 CMS 獲取的健康目標數據（可以無限擴展）
export const healthGoalsDatabase: HealthGoalItem[] = [
  // 第一頁
  {
    id: 'loseWeight',
    icon: '⚖️',
    translations: {
      'zh-TW': '減重',
      'zh-CN': '减重',
      'en': 'Lose weight',
      'ja': '減量',
      'ko': '체중 감량'
    },
    category: 'fitness'
  },
  {
    id: 'gainMuscle',
    icon: '💪',
    translations: {
      'zh-TW': '增肌',
      'zh-CN': '增肌',
      'en': 'Gain muscle',
      'ja': '筋肉増強',
      'ko': '근육 증가'
    },
    category: 'fitness'
  },
  {
    id: 'stayHealthy',
    icon: '❤️',
    translations: {
      'zh-TW': '維持健康',
      'zh-CN': '保持健康',
      'en': 'Stay healthy',
      'ja': '健康維持',
      'ko': '건강 유지'
    },
    category: 'wellness'
  },
  {
    id: 'improvePerformance',
    icon: '🏃',
    translations: {
      'zh-TW': '提升體能',
      'zh-CN': '提升体能',
      'en': 'Improve performance',
      'ja': 'パフォーマンス向上',
      'ko': '체력 향상'
    },
    category: 'fitness'
  },
  {
    id: 'betterSleep',
    icon: '😴',
    translations: {
      'zh-TW': '改善睡眠',
      'zh-CN': '改善睡眠',
      'en': 'Better sleep',
      'ja': '睡眠改善',
      'ko': '수면 개선'
    },
    category: 'wellness'
  },
  {
    id: 'reduceStress',
    icon: '🧘',
    translations: {
      'zh-TW': '減少壓力',
      'zh-CN': '减少压力',
      'en': 'Reduce stress',
      'ja': 'ストレス軽減',
      'ko': '스트레스 감소'
    },
    category: 'mental'
  },
  
  // 第二頁（滾動後加載）
  {
    id: 'increaseFlexibility',
    icon: '🤸',
    translations: {
      'zh-TW': '增加柔軟度',
      'zh-CN': '增加柔韧性',
      'en': 'Increase flexibility',
      'ja': '柔軟性向上',
      'ko': '유연성 증가'
    },
    category: 'fitness'
  },
  {
    id: 'improvePosture',
    icon: '🧍',
    translations: {
      'zh-TW': '改善姿勢',
      'zh-CN': '改善姿势',
      'en': 'Improve posture',
      'ja': '姿勢改善',
      'ko': '자세 개선'
    },
    category: 'wellness'
  },
  {
    id: 'boostEnergy',
    icon: '⚡',
    translations: {
      'zh-TW': '提升活力',
      'zh-CN': '提升活力',
      'en': 'Boost energy',
      'ja': 'エネルギー向上',
      'ko': '에너지 증진'
    },
    category: 'wellness'
  },
  {
    id: 'betterFocus',
    icon: '🎯',
    translations: {
      'zh-TW': '提升專注力',
      'zh-CN': '提升专注力',
      'en': 'Better focus',
      'ja': '集中力向上',
      'ko': '집중력 향상'
    },
    category: 'mental'
  },
  {
    id: 'healthyEating',
    icon: '🥗',
    translations: {
      'zh-TW': '健康飲食',
      'zh-CN': '健康饮食',
      'en': 'Healthy eating',
      'ja': '健康的な食事',
      'ko': '건강한 식습관'
    },
    category: 'nutrition'
  },
  {
    id: 'hydration',
    icon: '💧',
    translations: {
      'zh-TW': '補充水分',
      'zh-CN': '补充水分',
      'en': 'Stay hydrated',
      'ja': '水分補給',
      'ko': '수분 보충'
    },
    category: 'nutrition'
  },
  
  // 第三頁
  {
    id: 'buildEndurance',
    icon: '🏋️',
    translations: {
      'zh-TW': '增強耐力',
      'zh-CN': '增强耐力',
      'en': 'Build endurance',
      'ja': '持久力向上',
      'ko': '지구력 향상'
    },
    category: 'fitness'
  },
  {
    id: 'improveBalance',
    icon: '⚖️',
    translations: {
      'zh-TW': '改善平衡',
      'zh-CN': '改善平衡',
      'en': 'Improve balance',
      'ja': 'バランス改善',
      'ko': '균형 개선'
    },
    category: 'fitness'
  },
  {
    id: 'mentalWellness',
    icon: '🧠',
    translations: {
      'zh-TW': '心理健康',
      'zh-CN': '心理健康',
      'en': 'Mental wellness',
      'ja': 'メンタルヘルス',
      'ko': '정신 건강'
    },
    category: 'mental'
  },
  {
    id: 'socialConnection',
    icon: '👥',
    translations: {
      'zh-TW': '社交聯繫',
      'zh-CN': '社交联系',
      'en': 'Social connection',
      'ja': '社会的つながり',
      'ko': '사회적 연결'
    },
    category: 'social'
  },
  {
    id: 'immuneSystem',
    icon: '🛡️',
    translations: {
      'zh-TW': '增強免疫力',
      'zh-CN': '增强免疫力',
      'en': 'Boost immunity',
      'ja': '免疫力向上',
      'ko': '면역력 강화'
    },
    category: 'wellness'
  },
  {
    id: 'painRelief',
    icon: '💊',
    translations: {
      'zh-TW': '緩解疼痛',
      'zh-CN': '缓解疼痛',
      'en': 'Pain relief',
      'ja': '痛み緩和',
      'ko': '통증 완화'
    },
    category: 'wellness'
  },
  {
    id: 'ageWell',
    icon: '🌟',
    translations: {
      'zh-TW': '健康老化',
      'zh-CN': '健康老化',
      'en': 'Age well',
      'ja': '健康的な加齢',
      'ko': '건강한 노화'
    },
    category: 'wellness'
  },
  {
    id: 'heartHealth',
    icon: '💓',
    translations: {
      'zh-TW': '心臟健康',
      'zh-CN': '心脏健康',
      'en': 'Heart health',
      'ja': '心臓の健康',
      'ko': '심장 건강'
    },
    category: 'wellness'
  },
  {
    id: 'breathingTechniques',
    icon: '🌬️',
    translations: {
      'zh-TW': '呼吸練習',
      'zh-CN': '呼吸练习',
      'en': 'Breathing practice',
      'ja': '呼吸法',
      'ko': '호흡 연습'
    },
    category: 'mental'
  },
  {
    id: 'mindfulness',
    icon: '🕉️',
    translations: {
      'zh-TW': '正念冥想',
      'zh-CN': '正念冥想',
      'en': 'Mindfulness',
      'ja': 'マインドフルネス',
      'ko': '마음챙김'
    },
    category: 'mental'
  },
];

// 模擬 API 呼叫 - 分頁加載
export const fetchHealthGoals = async (page: number, pageSize: number = 6): Promise<HealthGoalItem[]> => {
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  
  return healthGoalsDatabase.slice(startIndex, endIndex);
};

// 獲取總數
export const getTotalHealthGoals = () => healthGoalsDatabase.length;
