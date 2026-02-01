// 模擬從 CMS 取得的健康目標列表
// 實際應用中，這些資料會從 API 或 CMS 動態取得

import type { Language } from './i18n';

export interface HealthGoal {
  id: string;
  icon: string;
  translations: {
    'zh-TW': string;
    'zh-CN': string;
    'en': string;
    'ja': string;
    'ko': string;
  };
  order: number;
}

// 模擬 CMS 配置的健康目標
export const healthGoalsFromCMS: HealthGoal[] = [
  {
    id: 'loseWeight',
    icon: '⚖️',
    translations: {
      'zh-TW': '減重',
      'zh-CN': '减重',
      'en': 'Lose weight',
      'ja': '減量',
      'ko': '체중 감량',
    },
    order: 1,
  },
  {
    id: 'gainMuscle',
    icon: '💪',
    translations: {
      'zh-TW': '增肌',
      'zh-CN': '增肌',
      'en': 'Gain muscle',
      'ja': '筋肉増強',
      'ko': '근육 증가',
    },
    order: 2,
  },
  {
    id: 'stayHealthy',
    icon: '❤️',
    translations: {
      'zh-TW': '維持健康',
      'zh-CN': '保持健康',
      'en': 'Stay healthy',
      'ja': '健康維持',
      'ko': '건강 유지',
    },
    order: 3,
  },
  {
    id: 'improvePerformance',
    icon: '🏃',
    translations: {
      'zh-TW': '提升體能',
      'zh-CN': '提升体能',
      'en': 'Improve performance',
      'ja': 'パフォーマンス向上',
      'ko': '체력 향상',
    },
    order: 4,
  },
  {
    id: 'betterSleep',
    icon: '😴',
    translations: {
      'zh-TW': '改善睡眠',
      'zh-CN': '改善睡眠',
      'en': 'Better sleep',
      'ja': '睡眠改善',
      'ko': '수면 개선',
    },
    order: 5,
  },
  {
    id: 'reduceStress',
    icon: '🧘',
    translations: {
      'zh-TW': '減少壓力',
      'zh-CN': '减少压力',
      'en': 'Reduce stress',
      'ja': 'ストレス軽減',
      'ko': '스트레스 감소',
    },
    order: 6,
  },
  {
    id: 'improveFlexibility',
    icon: '🤸',
    translations: {
      'zh-TW': '提升柔軟度',
      'zh-CN': '提升柔韧性',
      'en': 'Improve flexibility',
      'ja': '柔軟性向上',
      'ko': '유연성 향상',
    },
    order: 7,
  },
  {
    id: 'increaseEnergy',
    icon: '⚡',
    translations: {
      'zh-TW': '增加活力',
      'zh-CN': '增加活力',
      'en': 'Increase energy',
      'ja': 'エネルギー増加',
      'ko': '에너지 증가',
    },
    order: 8,
  },
  {
    id: 'improvePosture',
    icon: '🧍',
    translations: {
      'zh-TW': '改善姿勢',
      'zh-CN': '改善姿势',
      'en': 'Improve posture',
      'ja': '姿勢改善',
      'ko': '자세 개선',
    },
    order: 9,
  },
  {
    id: 'boostImmunity',
    icon: '🛡️',
    translations: {
      'zh-TW': '增強免疫力',
      'zh-CN': '增强免疫力',
      'en': 'Boost immunity',
      'ja': '免疫力向上',
      'ko': '면역력 강화',
    },
    order: 10,
  },
  {
    id: 'mentalWellness',
    icon: '🧠',
    translations: {
      'zh-TW': '心理健康',
      'zh-CN': '心理健康',
      'en': 'Mental wellness',
      'ja': 'メンタルヘルス',
      'ko': '정신 건강',
    },
    order: 11,
  },
  {
    id: 'healthyEating',
    icon: '🥗',
    translations: {
      'zh-TW': '健康飲食',
      'zh-CN': '健康饮食',
      'en': 'Healthy eating',
      'ja': '健康的な食事',
      'ko': '건강한 식습관',
    },
    order: 12,
  },
  {
    id: 'stayActive',
    icon: '🚴',
    translations: {
      'zh-TW': '保持活躍',
      'zh-CN': '保持活跃',
      'en': 'Stay active',
      'ja': 'アクティブに',
      'ko': '활동적으로',
    },
    order: 13,
  },
  {
    id: 'improveBalance',
    icon: '⚖️',
    translations: {
      'zh-TW': '改善平衡',
      'zh-CN': '改善平衡',
      'en': 'Improve balance',
      'ja': 'バランス改善',
      'ko': '균형 개선',
    },
    order: 14,
  },
  {
    id: 'buildEndurance',
    icon: '🏋️',
    translations: {
      'zh-TW': '增強耐力',
      'zh-CN': '增强耐力',
      'en': 'Build endurance',
      'ja': '持久力向上',
      'ko': '지구력 강화',
    },
    order: 15,
  },
  {
    id: 'rehabilitation',
    icon: '🩺',
    translations: {
      'zh-TW': '復健治療',
      'zh-CN': '康复治疗',
      'en': 'Rehabilitation',
      'ja': 'リハビリ',
      'ko': '재활 치료',
    },
    order: 16,
  },
  {
    id: 'preventInjury',
    icon: '🦴',
    translations: {
      'zh-TW': '預防受傷',
      'zh-CN': '预防受伤',
      'en': 'Prevent injury',
      'ja': '怪我予防',
      'ko': '부상 예방',
    },
    order: 17,
  },
  {
    id: 'socialFitness',
    icon: '👥',
    translations: {
      'zh-TW': '社交健身',
      'zh-CN': '社交健身',
      'en': 'Social fitness',
      'ja': 'ソーシャルフィットネス',
      'ko': '소셜 피트니스',
    },
    order: 18,
  },
];

// 取得健康目標的翻譯文字
export const getHealthGoalLabel = (goal: HealthGoal, language: Language): string => {
  return goal.translations[language] || goal.translations['zh-TW'];
};

// 模擬從 API 載入更多項目（無限滾動）
export const loadMoreHealthGoals = async (page: number): Promise<HealthGoal[]> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 在實際應用中，這裡會呼叫 API
  // const response = await fetch(`/api/health-goals?page=${page}`);
  // return response.json();
  
  // 目前返回空陣列（因為我們已有 18 個項目）
  return [];
};
