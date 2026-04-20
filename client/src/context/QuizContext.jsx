import { createContext, useContext, useReducer } from 'react'

const QuizContext = createContext(null)

const initialState = {
  quiz: null,
  currentQIndex: 0,
  answers: [],
  phase: 'idle', // idle | playing | answered | showFeedback | finished
  isSubmitting: false,
  result: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...initialState, quiz: action.quiz, phase: 'playing' }
    case 'SELECT_ANSWER':
      return { ...state, phase: 'answered', answers: [...state.answers, action.payload] }
    case 'SHOW_FEEDBACK':
      return { ...state, phase: 'showFeedback' }
    case 'NEXT_QUESTION':
      return { ...state, phase: 'playing', currentQIndex: state.currentQIndex + 1 }
    case 'FINISH':
      return { ...state, phase: 'finished' }
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value }
    case 'SET_RESULT':
      return { ...state, result: action.result }
    default:
      return state
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const startQuiz = (quizData) => dispatch({ type: 'START_QUIZ', quiz: quizData })
  const selectAnswer = (payload) => dispatch({ type: 'SELECT_ANSWER', payload })
  const advanceQuestion = () => {
    const isLast = state.currentQIndex >= state.quiz.questions.length - 1
    dispatch({ type: isLast ? 'FINISH' : 'NEXT_QUESTION' })
  }

  return (
    <QuizContext.Provider value={{ ...state, startQuiz, selectAnswer, advanceQuestion, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuizContext = () => useContext(QuizContext)
export default QuizContext
