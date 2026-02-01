// 模擬從 CMS 獲取的健康目標配置
// 在實際應用中，這些資料會從 API 動態獲取

export interface HealthGoal {
  id: string;
  icon: string;
  labels: {
    'zh-TW': string;
    'zh-CN': string;
    'en': string;
    'ja': string;
    'ko': string;
  };
  order: number;
  isActive: boolean;
}

// 模擬 CMS 資料
export const healthGoalsConfig: HealthGoal[] = [
  {
    id: 'loseWeight',
    icon: '⚖️',
    labels: {
      'zh-TW': '減重',
      'zh-CN': '减重',
      'en': 'Lose weight',
      'ja': '減量',
      'ko': '체중 감량',
    },
    order: 1,
    isActive: true,
  },
  {
    id: 'gainMuscle',
    icon: '💪',
    labels: {
      'zh-TW': '增肌',
      'zh-CN': '增肌',
      'en': 'Gain muscle',
      'ja': '筋肉増強',
      'ko': '근육 증가',
    },
    order: 2,
    isActive: true,
  },
  {
    id: 'stayHealthy',
    icon: '❤️',
    labels: {
      'zh-TW': '維持健康',
      'zh-CN': '保持健康',
      'en': 'Stay healthy',
      'ja': '健康維持',
      'ko': '건강 유지',
    },
    order: 3,
    isActive: true,
  },
  {
    id: 'improvePerformance',
    icon: '🏃',
    labels: {
      'zh-TW': '提升體能',
      'zh-CN': '提升体能',
      'en': 'Improve performance',
      'ja': 'パフォーマンス向上',
      'ko': '체력 향상',
    },
    order: 4,
    isActive: true,
  },
  {
    id: 'betterSleep',
    icon: '😴',
    labels: {
      'zh-TW': '改善睡眠',
      'zh-CN': '改善睡眠',
      'en': 'Better sleep',
      'ja': '睡眠改善',
      'ko': '수면 개선',
    },
    order: 5,
    isActive: true,
  },
  {
    id: 'reduceStress',
    icon: '🧘',
    labels: {
      'zh-TW': '減少壓力',
      'zh-CN': '减少压力',
      'en': 'Reduce stress',
      'ja': 'ストレス軽減',
      'ko': '스트레스 감소',
    },
    order: 6,
    isActive: true,
  },
  {
    id: 'improveFlexibility',
    icon: '🤸',
    labels: {
      'zh-TW': '提升柔軟度',
      'zh-CN': '提升柔韧性',
      'en': 'Improve flexibility',
      'ja': '柔軟性向上',
      'ko': '유연성 향상',
    },
    order: 7,
    isActive: true,
  },
  {
    id: 'boostEnergy',
    icon: '⚡',
    labels: {
      'zh-TW': '增強活力',
      'zh-CN': '增强活力',
      'en': 'Boost energy',
      'ja': 'エネルギー増強',
      'ko': '활력 증진',
    },
    order: 8,
    isActive: true,
  },
  {
    id: 'improvePosture',
    icon: '🧍',
    labels: {
      'zh-TW': '改善姿勢',
      'zh-CN': '改善姿势',
      'en': 'Improve posture',
      'ja': '姿勢改善',
      'ko': '자세 개선',
    },
    order: 9,
    isActive: true,
  },
  {
    id: 'buildEndurance',
    icon: '🚴',
    labels: {
      'zh-TW': '增強耐力',
      'zh-CN': '增强耐力',
      'en': 'Build endurance',
      'ja': '持久力向上',
      'ko': '지구력 향상',
    },
    order: 10,
    isActive: true,
  },
  {
    id: 'improveBalance',
    icon: '⚖️',
    labels: {
      'zh-TW': '提升平衡',
      'zh-CN': '提升平衡',
      'en': 'Improve balance',
      'ja': 'バランス向上',
      'ko': '균형 개선',
    },
    order: 11,
    isActive: true,
  },
  {
    id: 'betterDigestion',
    icon: '🍎',
    labels: {
      'zh-TW': '改善消化',
      'zh-CN': '改善消化',
      'en': 'Better digestion',
      'ja': '消化改善',
      'ko': '소화 개선',
    },
    order: 12,
    isActive: true,
  },
  {
    id: 'improveCardio',
    icon: '❤️‍🔥',
    labels: {
      'zh-TW': '強化心肺',
      'zh-CN': '强化心肺',
      'en': 'Improve cardio',
      'ja': '心肺機能向上',
      'ko': '심폐 기능 강화',
    },
    order: 13,
    isActive: true,
  },
  {
    id: 'boostImmunity',
    icon: '🛡️',
    labels: {
      'zh-TW': '提升免疫',
      'zh-CN': '提升免疫',
      'en': 'Boost immunity',
      'ja': '免疫力向上',
      'ko': '면역력 증진',
    },
    order: 14,
    isActive: true,
  },
  {
    id: 'mentalClarity',
    icon: '🧠',
    labels: {
      'zh-TW': '提升專注',
      'zh-CN': '提升专注',
      'en': 'Mental clarity',
      'ja': '集中力向上',
      'ko': '집중력 향상',
    },
    order: 15,
    isActive: true,
  },
  {
    id: 'betterMood',
    icon: '😊',
    labels: {
      'zh-TW': '改善心情',
      'zh-CN': '改善心情',
      'en': 'Better mood',
      'ja': '気分改善',
      'ko': '기분 개선',
    },
    order: 16,
    isActive: true,
  },
  {
    id: 'increaseAgility',
    icon: '🤺',
    labels: {
      'zh-TW': '提升敏捷',
      'zh-CN': '提升敏捷',
      'en': 'Increase agility',
      'ja': '敏捷性向上',
      'ko': '민첩성 향상',
    },
    order: 17,
    isActive: true,
  },
  {
    id: 'buildStrength',
    icon: '🏋️',
    labels: {
      'zh-TW': '增強力量',
      'zh-CN': '增强力量',
      'en': 'Build strength',
      'ja': '筋力向上',
      'ko': '근력 강화',
    },
    order: 18,
    isActive: true,
  },
  {
    id: 'improveBreathing',
    icon: '🌬️',
    labels: {
      'zh-TW': '改善呼吸',
      'zh-CN': '改善呼吸',
      'en': 'Improve breathing',
      'ja': '呼吸改善',
      'ko': '호흡 개선',
    },
    order: 19,
    isActive: true,
  },
  {
    id: 'healthyHabits',
    icon: '📅',
    labels: {
      'zh-TW': '養成習慣',
      'zh-CN': '养成习惯',
      'en': 'Healthy habits',
      'ja': '習慣化',
      'ko': '습관 형성',
    },
    order: 20,
    isActive: true,
  },
];

// 模擬從 API 獲取資料
export const fetchHealthGoals = async (): Promise<HealthGoal[]> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 返回啟用的目標，按順序排序
  return healthGoalsConfig
    .filter(goal => goal.isActive)
    .sort((a, b) => a.order - b.order);
};

// 根據語言獲取標籤
export const getGoalLabel = (goal: HealthGoal, language: string): string => {
  return goal.labels[language as keyof typeof goal.labels] || goal.labels['en'];
};
