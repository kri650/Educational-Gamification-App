/* eslint-disable no-useless-catch */
import api from '../utils/api'

export const getAISuggestions = async () => {
  try {
    const res = await api.get('/ai/suggestions')
    return res.data.data
  } catch (err) {
    throw err
  }
}
