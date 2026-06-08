import { useTheme } from '../../lib/ThemeContext'

function Footer() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16 px-8 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        <div>
          <h3 className="text-white font-bold text-xl mb-3">⚡ EnergyVault</h3>
          <p className="text-gray-400 text-sm">
            The ultimate energy drink rating and review platform. Find your next boost.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Explore</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/browse" className="hover:text-white transition-colors">Browse Drinks</a></li>
            <li><a href="/top-rated" className="hover:text-white transition-colors">Top Rated</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li>
              <a href="mailto:goobersnots67@gmail.com" className="hover:text-white transition-colors">
                📧 goobersnots67@gmail.com
              </a>
            </li>
            <li>
              <a href="https://github.com/sferman05-maker" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                🐙 GitHub
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-gray-400 text-sm mb-2">Appearance</p>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-xl text-sm text-white"
            >
              {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
          </div>
        </div>

      </div>
      <div className="text-center text-gray-600 text-sm mt-10">
        © {new Date().getFullYear()} EnergyVault. Built with plenty of love and caffeine.
      </div>
    </footer>
  )
}

export default Footer