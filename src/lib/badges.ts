import { supabase } from './supabase'

export async function checkAndAwardBadges(userId: string) {
  // Fetch all reviews by this user
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating, drink_id, brandSlug:drink_id')
    .eq('user_id', userId)

  if (!reviews) return

  // Import drinks to get brand info
  const { drinks } = await import('./drinks')

  const totalReviews = reviews.length
  const fiveStars = reviews.filter(r => r.rating === 5).length
  const oneStars = reviews.filter(r => r.rating === 1).length

  const reviewedDrinkIds = reviews.map(r => r.drink_id)
  const reviewedDrinks = drinks.filter(d => reviewedDrinkIds.includes(d.id))
  const brandsReviewed = new Set(reviewedDrinks.map(d => d.brandSlug)).size
  const ghostReviews = reviewedDrinks.filter(d => d.brandSlug === 'ghost').length
  const bumReviews = reviewedDrinks.filter(d => d.brandSlug === 'bum').length

  const badgesToCheck = [
    { id: 'first-sip', condition: totalReviews >= 1 },
    { id: 'critic', condition: totalReviews >= 10 },
    { id: 'connoisseur', condition: totalReviews >= 25 },
    { id: 'five-star', condition: fiveStars >= 1 },
    { id: 'harsh-critic', condition: oneStars >= 1 },
    { id: 'variety-pack', condition: brandsReviewed >= 3 },
    { id: 'ghost-hunter', condition: ghostReviews >= 1 },
    { id: 'bum-squad', condition: bumReviews >= 1 },
  ]

  // Fetch already earned badges
  const { data: earned } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set(earned?.map(b => b.badge_id) ?? [])

  // Award any new badges
  for (const badge of badgesToCheck) {
    if (badge.condition && !earnedIds.has(badge.id)) {
      await supabase
        .from('user_badges')
        .insert([{ user_id: userId, badge_id: badge.id }])
    }
  }
}