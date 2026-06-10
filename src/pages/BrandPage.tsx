import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { brands, drinks } from '../lib/drinks'
import { useTheme } from '../lib/ThemeContext'
import { supabase } from '../lib/supabase'

function BrandPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const brand = brands.find(b => b.slug === slug)
  const brandDrinks = drinks.filter(d => d.brandSlug === slug)
  const [search, setSearch] = useState('')
  const [ratings, setRatings] = useState<Record<string, { avg: number; count: number }>>({})

  const filteredDrinks = brandDrinks.filter(drink =>
    drink.flavor.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    const { data, error } = await supabase.from('reviews').select('drink_id, rating')
    if (error || !data) return

    const grouped: Record<string, number[]> = {}
    data.forEach(r => {
      if (!grouped[r.drink_id]) grouped[r.drink_id] = []
      grouped[r.drink_id].push(r.rating)
    })

    const result: Record<string, { avg: number; count: number }> = {}
    Object.entries(grouped).forEach(([drinkId, ratingsArr]) => {
      const avg = ratingsArr.reduce((sum, r) => sum + r, 0) / ratingsArr.length
      result[drinkId] = { avg, count: ratingsArr.length }
    })

    setRatings(result)
  }

  if (!brand) {
    return (
      <div className="text-center text-white py-20">
        <h1 className="text-4xl font-bold">Brand not found</h1>
      </div>
    )
  }

  return (
    <div className="px-8 py-12">
      <div className="text-center mb-12">
        <img src={brand.logo} alt={brand.name} className="h-25 object-contain mx-auto mb-4" />
        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{brand.name}</h1>
        <p className={`text-lg max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{brand.description}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto">
          {brand.ingredients.map(i => (
            <span key={i.name} className={`px-10 py-3 rounded-full text-sm border ${isDark ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-700'}`}>
              <b style={{ color: brand.color }}>{i.name}</b> · {i.amount}
            </span>
          ))}
        </div>
        <a
          href={brand.website}
          target="_blank"
          rel="noreferrer"
          style={{ backgroundColor: brand.color }}
          className="inline-block mt-6 px-12 py-5 rounded-full text-white text-base font-bold transition-opacity hover:opacity-80"
        >
          🌐 Visit {brand.name} →
        </a>
      </div>

      <button
        onClick={() => navigate('/')}
        className={`mb-8 transition-colors flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
      >
        ← Back to Brands
      </button>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search flavors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`w-full border rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-yellow-400 ${isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
        />
      </div>

      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>All Flavors</h2>

      {filteredDrinks.length === 0 ? (
        <div className={`text-center py-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg">No flavors found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrinks.map(drink => {
            const rating = ratings[drink.id]
            return (
              <div
                key={drink.id}
                onClick={() => navigate(`/drink/${drink.id}`)}
                className={`border rounded-2xl p-6 hover:border-yellow-400 transition-all hover:scale-105 cursor-pointer text-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}
              >
                <img src={drink.image} alt={drink.flavor} className="w-full h-48 object-contain mb-4" />
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{drink.flavor}</h3>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {rating ? (
                    <>
                      <span className="text-yellow-400">★</span>
                      <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{rating.avg.toFixed(1)}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({rating.count})</span>
                    </>
                  ) : (
                    <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>No reviews yet</span>
                  )}
                </div>
                <div
                  className="mt-4 inline-block px-4 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: brand.color }}
                >
                  View Details →
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BrandPage