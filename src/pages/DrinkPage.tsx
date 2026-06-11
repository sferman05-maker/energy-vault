import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { drinks, brands } from '../lib/drinks'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { checkAndAwardBadges } from '../lib/badges'
import StarRating from '../components/ui/StarRating'
import RatingInput from '../components/ui/RatingInput'

type Review = {
  id: string
  drink_id: string
  user_id: string
  author: string
  rating: number
  comment: string
  created_at: string
}

function DrinkPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const drink = drinks.find(d => d.id === id)
  const brand = brands.find(b => b.slug === drink?.brandSlug)

  const caffeine = drink?.caffeine ?? brand?.caffeine
  const calories = drink?.calories ?? brand?.calories

  const [reviews, setReviews] = useState<Review[]>([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    fetchReviews()
  }, [id])

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()
        .then(({ data }) => { if (data) setUsername(data.username) })
    }
  }, [user])

  const fetchReviews = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('drink_id', id)
      .order('created_at', { ascending: false })

    if (!error && data) setReviews(data)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!user || !comment || rating === 0) return
    setSubmitting(true)

    const { error } = await supabase
      .from('reviews')
      .insert([{ drink_id: id, user_id: user.id, author: username || user.email, rating, comment }])

    if (!error) {
      setComment('')
      setRating(0)
      fetchReviews()
      const earned = await checkAndAwardBadges(user.id)
      if (earned.length > 0) setNewBadges(earned)
    }
    setSubmitting(false)
  }

  if (!drink || !brand) {
    return (
      <div className="text-center text-white py-20">
        <h1 className="text-4xl font-bold">Drink not found</h1>
      </div>
    )
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A'

  return (
    <div className="px-8 py-12 max-w-4xl mx-auto">
      {/* Badge notification toasts */}
      {newBadges.length > 0 && (
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
          {newBadges.map((badge, i) => (
            <div
              key={i}
              className="bg-yellow-400 text-black px-6 py-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 animate-bounce"
            >
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-xs uppercase tracking-wide">Badge Unlocked!</p>
                <p className="text-lg">{badge}</p>
              </div>
              <button onClick={() => setNewBadges(prev => prev.filter((_, j) => j !== i))} className="ml-2 text-black/50 hover:text-black">✕</button>
            </div>
          ))}
        </div>
      )}
      {/* Back Button */}
      <button
        onClick={() => navigate(`/brand/${drink.brandSlug}`)}
        className="mb-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
      >
        ← Back to {brand.name}
      </button>

      {/* Drink Info */}
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <img
          src={drink.image}
          alt={drink.flavor}
          className="w-64 h-64 object-contain mx-auto md:mx-0"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold mb-1" style={{ color: brand.color }}>{brand.name}</p>
          <h1 className="text-4xl font-bold text-white mb-2">{drink.flavor}</h1>
          <p className="text-gray-400 mb-6">{drink.description}</p>
          <div className="flex gap-6">
            <div className="bg-gray-900 rounded-xl px-6 py-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{caffeine}mg</p>
              <p className="text-gray-400 text-sm">Caffeine</p>
            </div>
            <div className="bg-gray-900 rounded-xl px-6 py-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{calories}</p>
              <p className="text-gray-400 text-sm">Calories</p>
            </div>
            <div className="bg-gray-900 rounded-xl px-6 py-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{avgRating}/10</p>
              <p className="text-gray-400 text-sm">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form or Sign In Prompt */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10">
        {user ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Leave a Review</h2>

            <p className="text-gray-400 mb-2">Your Rating</p>
            <div className="mb-6">
              <RatingInput rating={rating} onChange={setRating} />
            </div>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-yellow-400 resize-none"
            />

            <button
              onClick={handleSubmit}
              disabled={!comment || rating === 0 || submitting}
              className="px-8 py-3 rounded-full font-bold text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: brand.color }}
            >
              {submitting ? 'Posting...' : 'Post Review'}
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-2xl mb-3">⚡</p>
            <h2 className="text-xl font-bold text-white mb-2">Want to leave a review?</h2>
            <p className="text-gray-400 mb-6">Sign in to share your thoughts on this drink.</p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <h2 className="text-2xl font-bold text-white mb-6">Reviews ({reviews.length})</h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <p>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-gray-900 rounded-2xl border border-gray-800">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-lg">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-bold">{review.author}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-yellow-400 font-bold">{review.rating.toFixed(1)}/10</span>
                </div>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DrinkPage