import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) return <Navigate to="/auth" replace />

  return <>{children}</>
}

export default ProtectedRoute