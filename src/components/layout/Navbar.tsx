import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-gray-900 px-8 py-4 flex justify-between items-center border-b border-gray-800">
      <h1
        onClick={() => navigate('/')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img
          src="/assets/energy-vault-logo.png"
          alt="EnergyVault"
          className="h-12 object-contain"
          />
      </h1>
      <div className="flex items-center gap-6">
        <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
        <a href="/browse" className="text-gray-300 hover:text-white transition-colors">Browse</a>
        <a href="/top-rated" className="text-gray-300 hover:text-white transition-colors">Top Rated</a>
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              👤 Profile
            </button>
            <button
              onClick={signOut}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl text-white text-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar