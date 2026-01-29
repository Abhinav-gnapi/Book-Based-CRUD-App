import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'

type ProtectedRoutesProps = {
  children: ReactNode
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
