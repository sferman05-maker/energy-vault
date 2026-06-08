import { useAuth } from '../lib/AuthContext'
import { useTheme } from '../lib/ThemeContext'

function Profile() {
  const { user } = useAuth()
  const { isDark } = useTheme()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        👤 My Profile
      </h1>
      <div className={`border rounded-2xl p-6 ${isDark ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
        <p><span className="font-bold">Email:</span> {user?.email}</p>
        <p className="mt-2"><span className="font-bold">Member since:</span> {new Date(user?.created_at ?? '').toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default Profile