import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import api from '../api/axios.js'

type User = {
  id: string
  email: string
  role: 'admin' | 'user'
}

type AuthContextType = {
  isAuth: boolean
  user: User | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const checkAuth = async (): Promise<void> => {
    try {
      const res = await api.get<User>('/auth/me')
      setIsAuth(true)
      setUser(res.data)
    } catch {
      setIsAuth(false)
      setUser(null)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const logout = async (): Promise<void> => {
    await api.post('/logout')
    setIsAuth(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
