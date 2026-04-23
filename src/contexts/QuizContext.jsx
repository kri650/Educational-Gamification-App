/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const value = useMemo(
    () => ({
      weakAreas: ['Probability Trees', 'Cell Respiration', 'Motion Graphs'],
    }),
    [],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  return useContext(QuizContext)
}
