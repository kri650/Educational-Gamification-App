/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const value = useMemo(
    () => ({
      user: {
        id: 'u9',
        name: 'You',
      },
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
