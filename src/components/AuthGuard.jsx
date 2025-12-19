
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthGuard = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default AuthGuard
