export const SYSTEM_PROMPT = `You are an educational AI tutor for school students. Analyze the provided student performance data and suggest exactly 3 quiz topics to improve their learning. Return ONLY a valid JSON array with no markdown, no explanation, no preamble. Each element must have these exact fields: topic (string), reason (string, 1 sentence), priority (string: "high"|"medium"|"low"), estimatedDifficulty (string: "easy"|"medium"|"hard"), subject (string: one of Math/Science/English/History/General). Nothing else.`

export function buildSuggestionPrompt(userStats) {
  const { totalPoints, quizzesCompleted, currentStreak, scoresBySubject, recentQuizzes } = userStats
  return `Student stats: Total Points: ${totalPoints}. Quizzes Completed: ${quizzesCompleted}. Current Streak: ${currentStreak} days. Scores by subject: ${JSON.stringify(scoresBySubject)}. Recent quizzes: ${JSON.stringify((recentQuizzes || []).slice(0, 5))}. Suggest 3 quiz topics.`
}
