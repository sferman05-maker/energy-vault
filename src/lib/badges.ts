import { supabase } from './supabase'

export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating, drink_id')
    .eq('user_id', userId)

  if (!reviews) return []

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
    { id: 'first-sip', name: 'First Sip', condition: totalReviews >= 1 },
    { id: 'critic', name: 'Critic', condition: totalReviews >= 10 },
    { id: 'connoisseur', name: 'Connoisseur', condition: totalReviews >= 25 },
    { id: 'five-star', name: 'Five Star', condition: fiveStars >= 1 },
    { id: 'harsh-critic', name: 'Harsh Critic', condition: oneStars >= 1 },
    { id: 'variety-pack', name: 'Variety Pack', condition: brandsReviewed >= 3 },
    { id: 'ghost-hunter', name: 'Ghost Hunter', condition: ghostReviews >= 1 },
    { id: 'bum-squad', name: 'BUM Squad', condition: bumReviews >= 1 },
  ]

  const { data: earned } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set(earned?.map(b => b.badge_id) ?? [])
  const newlyEarned: string[] = []

  for (const badge of badgesToCheck) {
    if (badge.condition && !earnedIds.has(badge.id)) {
      await supabase.from('user_badges').insert([{ user_id: userId, badge_id: badge.id }])
      newlyEarned.push(badge.name)
    }
  }

  return newlyEarned
}