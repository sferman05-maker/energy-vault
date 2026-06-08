import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { drinks, brands } from '../lib/drinks'
import { supabase } from '../lib/supabase'
import { useTheme } from '../lib/ThemeContext'

type DrinkRating = {
  drinkId: string
  avgRating: number
  totalReviews: number
}

function TopRated() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [drinkRatings, setDrinkRatings] = useState<DrinkRating[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reviews')
      .select('drink_id, rating')

    if (!error && data) {
      const grouped: Record<string, number[]> = {}
      data.forEach(r => {
        if (!grouped[r.drink_id]) grouped[r.drink_id] = []
        grouped[r.drink_id].push(r.rating)
      })

      const ratings: DrinkRating[] = Object.entries(grouped).map(([drinkId, ratings]) => ({
        drinkId,
        avgRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
        totalReviews: ratings.length
      }))

      ratings.sort((a, b) => b.avgRating - a.avgRating)
      setDrinkRatings(ratings)
    }
    setLoading(false)
  }

  // Top drinks
  const topDrinks = drinkRatings
    .map(r => ({
      ...r,
      drink: drinks.find(d => d.id === r.drinkId),
      brand: brands.find(b => b.slug === drinks.find(d => d.id === r.drinkId)?.brandSlug)
    }))
    .filter(r => r.drink && r.brand)
    .slice(0, 10)

  // Top brands
  const brandRatings = brands.map(brand => {
    const brandDrinkIds = drinks.filter(d => d.brandSlug === brand.slug).map(d => d.id)
    const brandReviews = drinkRatings.filter(r => brandDrinkIds.includes(r.drinkId))
    const totalReviews = brandReviews.reduce((a, b) => a + b.totalReviews, 0)
    const avgRating = brandReviews.length
      ? brandReviews.reduce((a, b) => a + b.avgRating, 0) / brandReviews.length
      : 0
    return { brand, avgRating, totalReviews }
  }).filter(b => b.totalReviews > 0).sort((a, b) => b.avgRating - a.avgRating)

  const card = `border rounded-2xl p-6 transition-all ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`
  const heading = `font-bold ${isDark ? 'text-white' : 'text-gray-900'}`
  const sub = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`

  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">
      <h1 className={`text-4xl font-bold mb-2 ${heading}`}>🏆 Top Rated</h1>
      <p className={`mb-12 ${sub}`}>The highest rated drinks and brands across all reviews</p>

      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading ratings...</div>
      ) : drinkRatings.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-4xl mb-3">⭐</p>
          <p className="text-lg">No reviews yet — be the first to rate a drink!</p>
        </div>
      ) : (
        <>
          {/* Top Brands */}
          {brandRatings.length > 0 && (
            <div className="mb-16">
              <h2 className={`text-2xl font-bold mb-6 ${heading}`}>🏷️ Top Brands</h2>
              <div className="flex flex-col gap-4">
                {brandRatings.map((b, i) => (
                  <div
                    key={b.brand.slug}
                    onClick={() => navigate(`/brand/${b.brand.slug}`)}
                    className={`${card} flex items-center gap-6 cursor-pointer hover:border-yellow-400`}
                  >
                    <span className={`text-3xl font-bold w-8 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                      #{i + 1}
                    </span>
                    <img src={b.brand.logo} alt={b.brand.name} className="h-12 w-24 object-contain" />
                    <div className="flex-1">
                      <p className={`font-bold text-lg ${heading}`}>{b.brand.name}</p>
                      <p className={sub}>{b.totalReviews} reviews</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 justify-end mb-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className="text-lg" style={{ color: star <= Math.round(b.avgRating) ? '#f59e0b' : '#4b5563' }}>★</span>
                        ))}
                      </div>
                      <p className={`text-sm font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {b.avgRating.toFixed(1)} / 5
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Drinks */}
          <h2 className={`text-2xl font-bold mb-6 ${heading}`}>🥤 Top Drinks</h2>
          <div className="flex flex-col gap-4">
            {topDrinks.map((r, i) => (
              <div
                key={r.drinkId}
                onClick={() => navigate(`/drink/${r.drinkId}`)}
                className={`${card} flex items-center gap-6 cursor-pointer hover:border-yellow-400`}
              >
                <span className={`text-3xl font-bold w-8 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                  #{i + 1}
                </span>
                <img src={r.drink!.image} alt={r.drink!.flavor} className="h-16 w-16 object-contain" />
                <div className="flex-1">
                  <p className={`font-bold text-lg ${heading}`}>{r.drink!.flavor}</p>
                  <p className={sub} style={{ color: r.brand!.color }}>{r.brand!.name}</p>
                  <p className={sub}>{r.totalReviews} {r.totalReviews === 1 ? 'review' : 'reviews'}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 justify-end mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-lg" style={{ color: star <= Math.round(r.avgRating) ? '#f59e0b' : '#4b5563' }}>★</span>
                    ))}
                  </div>
                  <p className={`text-sm font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {r.avgRating.toFixed(1)} / 5
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TopRated