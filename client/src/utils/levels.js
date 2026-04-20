export const LEVELS = [
  { level: 1, name: 'Novice',     minPoints: 0 },
  { level: 2, name: 'Apprentice', minPoints: 100 },
  { level: 3, name: 'Scholar',    minPoints: 250 },
  { level: 4, name: 'Expert',     minPoints: 500 },
  { level: 5, name: 'Master',     minPoints: 1000 },
  { level: 6, name: 'Champion',   minPoints: 2000 },
  { level: 7, name: 'Legend',     minPoints: 5000 },
]

export function getLevelInfo(totalPoints) {
  let current = LEVELS[0]
  let next = LEVELS[1]
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalPoints >= LEVELS[i].minPoints) {
      current = LEVELS[i]
      next = LEVELS[i + 1] || null
    }
  }
  const currentXP = totalPoints - current.minPoints
  const xpToNext = next ? next.minPoints - current.minPoints : 0
  const percentage = next ? Math.min(100, Math.round((currentXP / xpToNext) * 100)) : 100
  return { level: current.level, levelName: current.name, currentXP, xpToNext, percentage }
}
