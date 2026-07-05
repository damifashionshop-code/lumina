// Theme → arcana map for the entertainment "theme activity index".
// Indices are symbolic and playful, never real probabilities.
export type ThemeKey = 'love' | 'fatefulMeeting' | 'marriage' | 'family' | 'children' | 'money' | 'career' | 'relocation' | 'creativity' | 'growth';

export const THEME_ARCANA: Record<ThemeKey, number[]> = {
  love: [2, 3, 6, 10, 14, 17, 18, 19, 21],
  fatefulMeeting: [2, 6, 10, 11, 14, 17, 19, 20, 21, 22],
  marriage: [3, 4, 5, 6, 8, 10, 14, 19, 20, 21],
  family: [3, 4, 5, 6, 10, 14, 19, 20, 21],
  children: [2, 3, 6, 14, 17, 19, 20],
  money: [1, 4, 7, 8, 10, 15, 17, 19, 21],
  career: [1, 4, 5, 7, 8, 10, 11, 15, 19, 20, 21],
  relocation: [7, 10, 16, 21, 22],
  creativity: [1, 3, 6, 12, 17, 18, 19, 22],
  growth: [5, 9, 12, 13, 14, 16, 20, 21],
};

// Career directions per arcana (symbolic ideas, not career advice)
export const CAREER_MAP: Record<number, { ru: string[]; en: string[] }> = {
  1: { ru: ['предпринимательство', 'стартапы', 'личный бренд', 'продажи', 'управление проектами'], en: ['entrepreneurship', 'startups', 'personal brand', 'sales', 'project management'] },
  2: { ru: ['аналитика', 'исследования', 'контент', 'консультирование', 'работа с информацией'], en: ['analytics', 'research', 'content', 'consulting', 'working with information'] },
  3: { ru: ['дизайн', 'beauty-сфера', 'творчество', 'сервис', 'проекты про эстетику'], en: ['design', 'beauty industry', 'creative work', 'service', 'aesthetics projects'] },
  4: { ru: ['управление', 'администрирование', 'недвижимость', 'строительство', 'операционный менеджмент'], en: ['management', 'administration', 'real estate', 'construction', 'operations'] },
  5: { ru: ['обучение', 'наставничество', 'образовательные проекты', 'юриспруденция', 'методология'], en: ['teaching', 'mentorship', 'education projects', 'law', 'methodology'] },
  6: { ru: ['HR', 'коммуникации', 'партнёрства', 'ивенты', 'сфера красоты и отношений'], en: ['HR', 'communications', 'partnerships', 'events', 'beauty and relationships'] },
  7: { ru: ['логистика', 'спорт', 'продажи', 'туризм', 'активные проекты'], en: ['logistics', 'sports', 'sales', 'travel', 'active projects'] },
  8: { ru: ['финансы', 'документы', 'юридические процессы', 'комплаенс', 'управление правилами'], en: ['finance', 'documentation', 'legal processes', 'compliance', 'governance'] },
  9: { ru: ['аналитика', 'IT', 'исследования', 'тексты', 'экспертная практика'], en: ['analytics', 'IT', 'research', 'writing', 'expert practice'] },
  10: { ru: ['бизнес', 'маркетинг', 'медиа', 'торговля', 'проекты с переменным ритмом'], en: ['business', 'marketing', 'media', 'trade', 'variable-rhythm projects'] },
  11: { ru: ['управление', 'спорт', 'сцена', 'личный бренд', 'лидерские роли'], en: ['management', 'sports', 'stage', 'personal brand', 'leadership roles'] },
  12: { ru: ['социальные проекты', 'помогающие практики', 'творчество', 'образование'], en: ['social projects', 'helping practices', 'creative work', 'education'] },
  13: { ru: ['трансформационные проекты', 'кризис-менеджмент', 'редизайн', 'обновление систем'], en: ['transformation projects', 'crisis management', 'redesign', 'system renewal'] },
  14: { ru: ['wellness', 'сервис', 'кулинария', 'гостеприимство', 'проекты про баланс'], en: ['wellness', 'service', 'culinary arts', 'hospitality', 'balance projects'] },
  15: { ru: ['бизнес', 'финансы', 'маркетинг', 'управление ресурсами', 'luxury-сегмент'], en: ['business', 'finance', 'marketing', 'resource management', 'luxury segment'] },
  16: { ru: ['инженерия', 'архитектура', 'недвижимость', 'безопасность', 'системные изменения'], en: ['engineering', 'architecture', 'real estate', 'security', 'systemic change'] },
  17: { ru: ['медиа', 'блогинг', 'дизайн', 'публичность', 'творческие индустрии'], en: ['media', 'blogging', 'design', 'public work', 'creative industries'] },
  18: { ru: ['кино', 'фото', 'музыка', 'искусство', 'креативные проекты'], en: ['film', 'photography', 'music', 'art', 'creative projects'] },
  19: { ru: ['образование', 'детские проекты', 'сцена', 'комьюнити', 'лидерство'], en: ['education', 'projects for children', 'stage', 'community', 'leadership'] },
  20: { ru: ['социальные проекты', 'госструктуры', 'образование', 'семейные проекты'], en: ['social projects', 'public sector', 'education', 'family projects'] },
  21: { ru: ['международные проекты', 'онлайн-бизнес', 'путешествия', 'языки', 'IT'], en: ['international projects', 'online business', 'travel', 'languages', 'IT'] },
  22: { ru: ['фриланс', 'стартапы', 'креатив', 'путешествия', 'нестандартные форматы'], en: ['freelance', 'startups', 'creative work', 'travel', 'unconventional formats'] },
};
