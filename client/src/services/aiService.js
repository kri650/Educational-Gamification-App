// TODO: aiService — owned by Harshdeep (feat/harsh-ai-frontend)
import api from '../utils/api'
import aiMock from '../mocks/aiMock'

export async function fetchAISuggestions(userStats) {
  const cached = localStorage.getItem('ai_suggestions')
  const cacheTime = localStorage.getItem('ai_suggestions_time')
  if (cached && (Date.now() - Number(cacheTime)) < 600000) return JSON.parse(cached)
  try {
    const { data } = await api.post('/api/ai/suggestions')
    localStorage.setItem('ai_suggestions', JSON.stringify(data.data))
    localStorage.setItem('ai_suggestions_time', Date.now())
    return data.data
  } catch {
    return aiMock
  }
}
