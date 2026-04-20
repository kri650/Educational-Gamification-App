const badgeMock = [
  { _id: 'badge_001', name: 'First Step',   description: 'Complete your first quiz',          iconName: 'star',      rarity: 'common',    requirement: { type: 'quizCount', value: 1  }, earned: true,  earnedAt: '2025-04-18' },
  { _id: 'badge_002', name: 'On Fire',      description: 'Maintain a 3-day streak',           iconName: 'flame',     rarity: 'rare',      requirement: { type: 'streak',    value: 3  }, earned: true,  earnedAt: '2025-04-20' },
  { _id: 'badge_003', name: 'Sharp Mind',   description: 'Score 100% on any quiz',            iconName: 'lightning', rarity: 'epic',      requirement: { type: 'perfectScore', value: 100 }, earned: true, earnedAt: '2025-04-19' },
  { _id: 'badge_004', name: 'Dedicated',    description: 'Complete 10 quizzes',               iconName: 'stack',     rarity: 'rare',      requirement: { type: 'quizCount', value: 10 }, earned: false, earnedAt: null },
  { _id: 'badge_005', name: 'Night Owl',    description: 'Study after 10 PM',                 iconName: 'moon',      rarity: 'common',    requirement: { type: 'timeOfDay', value: 22 }, earned: false, earnedAt: null },
  { _id: 'badge_006', name: 'Grandmaster',  description: 'Maintain a 7-day streak',           iconName: 'crown',     rarity: 'legendary', requirement: { type: 'streak',    value: 7  }, earned: false, earnedAt: null },
]

export default badgeMock
