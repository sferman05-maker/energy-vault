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
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchProfileData()
  }, [user])

  const fetchProfileData = async () => {
    setLoading(true)

    const [{ data: ubData }, { data: rData }, { data: bData }, { data: pData }] = await Promise.all([
      supabase.from('user_badges').select('badge_id, earned_at, badges(id, name, description, icon_url)').eq('user_id', user!.id),
      supabase.from('reviews').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }),
      supabase.from('badges').select('*'),
      supabase.from('profiles').select('username').eq('id', user!.id).single(),
    ])

    setUserBadges((ubData as unknown as UserBadge[]) ?? [])
    setReviews(rData ?? [])
    setAllBadges(bData ?? [])
    if (pData) setUsername((pData as unknown as { username: string }).username)
    setLoading(false)
  }

  const earnedBadgeIds = new Set(userBadges.map(b => b.badge_id))
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—'
  const brandsReviewed = new Set(reviews.map(r => drinks.find(d => d.id === r.drink_id)?.brandSlug).filter(Boolean)).size

  const card = `border rounded-2xl p-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`
  const label = `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`
  const val = `text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`

  if (loading) return <div className="text-center py-20 text-gray-500">Loading profile...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className={`${card} mb-6 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-black">
            {username?.[0]?.toUpperCase() ?? user?.email?.[0].toUpperCase()}
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{username || user?.email}</h1>
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
          { label: 'Badges', value: `${userBadges.length}/${allBadges.length}` },
        ].map(stat => (
          <div key={stat.label} className={`${card} text-center`}>
            <p className={val}>{stat.value}</p>
            <p className={label}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges — always show all, locked/unlocked */}
      <div className={`${card} mb-6`}>
        <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Badges <span className="text-yellow-400">({userBadges.length}/{allBadges.length})</span>
        </h2>
        <p className={`${label} mb-4`}>Earn badges by reviewing drinks and exploring the vault.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allBadges.map(badge => {
            const earned = earnedBadgeIds.has(badge.id)
            return (
              <div
                key={badge.id}
                className={`rounded-xl p-4 text-center border transition-all ${earned
                  ? isDark ? 'border-yellow-400 bg-yellow-400/10' : 'border-yellow-400 bg-yellow-50'
                  : isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                {badge.icon_url ? (
                  <img
                    src={badge.icon_url}
                    alt={badge.name}
                    className={`w-12 h-12 mx-auto mb-2 object-contain ${!earned ? 'grayscale opacity-40' : ''}`}
                  />
                ) : (
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl ${earned ? 'bg-yellow-400/20' : isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    {earned ? '🏅' : '🔒'}
                  </div>
                )}
                <p className={`text-sm font-bold ${earned ? isDark ? 'text-white' : 'text-gray-900' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {badge.name}
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{badge.description}</p>
                {earned && <p className="text-xs text-yellow-400 font-bold mt-2">✓ Earned</p>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className={card}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Reviews</h2>
        {reviews.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-4xl mb-3">🥤</p>
            <p className={label}>No reviews yet. Go try some drinks!</p>
          </div>
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