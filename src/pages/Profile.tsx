import { useEffect, useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useTheme } from '../lib/ThemeContext'
import { supabase } from '../lib/supabase'
import { drinks } from '../lib/drinks'

type Badge = {
  id: string
  name: string
  description: string
  icon_url: string | null
}

type UserBadge = {
  badge_id: string
  earned_at: string
  badges: Badge
}

type Review = {
  id: string
  drink_id: string
  rating: number
  comment: string
  created_at: string
}

function Profile() {
  const { user, signOut } = useAuth()
  const { isDark } = useTheme()
  const [userBadges, setUserBadges] = useState<UserBadge[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [allBadges, setAllBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchProfileData()
  }, [user])

  const fetchProfileData = async () => {
    setLoading(true)

    const [{ data: ubData }, { data: rData }, { data: bData }] = await Promise.all([
      supabase.from('user_badges').select('badge_id, earned_at, badges(id, name, description, icon_url)').eq('user_id', user!.id),
      supabase.from('reviews').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }),
      supabase.from('badges').select('*'),
    ])

    setUserBadges((ubData as unknown as UserBadge[]) ?? [])
    setReviews(rData ?? [])
    setAllBadges(bData ?? [])
    setLoading(false)
  }

  const earnedBadgeIds = new Set(userBadges.map(b => b.badge_id))
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 'N/A'
  const brandsReviewed = new Set(reviews.map(r => drinks.find(d => d.id === r.drink_id)?.brandSlug).filter(Boolean)).size

  const card = `border rounded-2xl p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`
  const label = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`
  const value = `text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`

  if (loading) return <div className="text-center py-20 text-gray-500">Loading profile...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className={`${card} mb-6 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-black">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.email}</h1>
            <p className={label}>Member since {new Date(user?.created_at ?? '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className={`text-sm px-4 py-2 rounded-xl border transition-colors ${isDark ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'border-gray-300 text-gray-500 hover:text-gray-900'}`}
        >
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Reviews', value: reviews.length },
          { label: 'Avg Rating', value: avgRating },
          { label: 'Brands Tried', value: brandsReviewed },
          { label: 'Badges', value: userBadges.length },
        ].map(stat => (
          <div key={stat.label} className={`${card} text-center`}>
            <p className={value}>{stat.value}</p>
            <p className={label}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className={`${card} mb-6`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Badges <span className="text-yellow-400">({userBadges.length}/{allBadges.length})</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allBadges.map(badge => {
            const earned = earnedBadgeIds.has(badge.id)
            return (
              <div
                key={badge.id}
                className={`rounded-xl p-4 text-center border transition-all ${earned
                  ? isDark ? 'border-yellow-400 bg-yellow-400/10' : 'border-yellow-400 bg-yellow-50'
                  : isDark ? 'border-gray-700 opacity-40' : 'border-gray-200 opacity-40'
                }`}
              >
                {badge.icon_url ? (
                  <img src={badge.icon_url} alt={badge.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
                ) : (
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-400/20 flex items-center justify-center text-2xl">
                    {earned ? '🏅' : '🔒'}
                  </div>
                )}
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{badge.name}</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className={card}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Reviews</h2>
        {reviews.length === 0 ? (
          <p className={label}>No reviews yet. Go try some drinks!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.slice(0, 5).map(review => {
              const drink = drinks.find(d => d.id === review.drink_id)
              return (
                <div key={review.id} className={`rounded-xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{drink?.flavor ?? review.drink_id}</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} style={{ color: star <= review.rating ? '#f59e0b' : '#4b5563' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{review.comment}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile