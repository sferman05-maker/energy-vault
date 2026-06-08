import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { drinks, brands } from '../lib/drinks'

function Browse() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const filteredDrinks = drinks
    .filter(drink => {
      const brand = brands.find(b => b.slug === drink.brandSlug)
      const matchesSearch =
        drink.flavor.toLowerCase().includes(search.toLowerCase()) ||
        brand?.name.toLowerCase().includes(search.toLowerCase())
      const matchesBrand =
        selectedBrand === 'all' || drink.brandSlug === selectedBrand
      return matchesSearch && matchesBrand
    })
    .sort((a, b) => {
      const brandA = brands.find(br => br.slug === a.brandSlug)
      const brandB = brands.find(br => br.slug === b.brandSlug)
      const caffeineA = a.caffeine ?? brandA?.caffeine ?? 0
      const caffeineB = b.caffeine ?? brandB?.caffeine ?? 0
      const caloriesA = a.calories ?? brandA?.calories ?? 0
      const caloriesB = b.calories ?? brandB?.calories ?? 0

      if (sortBy === 'caffeine-high') return caffeineB - caffeineA
      if (sortBy === 'caffeine-low') return caffeineA - caffeineB
      if (sortBy === 'calories-low') return caloriesA - caloriesB
      return 0
    })

  return (
    <div className="px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Browse Drinks</h1>
      <p className="text-gray-400 mb-8">Search and filter across all brands</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by flavor or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
        />
        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
        >
          <option value="all">All Brands</option>
          {brands.map(brand => (
            <option key={brand.slug} value={brand.slug}>{brand.name}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
        >
          <option value="default">Sort By</option>
          <option value="caffeine-high">Caffeine: High to Low</option>
          <option value="caffeine-low">Caffeine: Low to High</option>
          <option value="calories-low">Calories: Low to High</option>
        </select>
      </div>

      <p className="text-gray-500 mb-6">{filteredDrinks.length} drinks found</p>

      {filteredDrinks.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg">No drinks found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrinks.map(drink => {
            const brand = brands.find(b => b.slug === drink.brandSlug)
            const caffeine = drink.caffeine ?? brand?.caffeine
            const calories = drink.calories ?? brand?.calories
            return (
              <div
                key={drink.id}
                onClick={() => navigate(`/drink/${drink.id}`)}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-yellow-400 transition-all hover:scale-105 cursor-pointer text-center"
              >
                <img
                  src={drink.image}
                  alt={drink.flavor}
                  className="w-full h-48 object-contain mb-4"
                />
                <p className="text-xs font-bold mb-1" style={{ color: brand?.color }}>{brand?.name}</p>
                <h3 className="text-white font-bold text-lg">{drink.flavor}</h3>
                <div
                  className="mt-4 inline-block px-4 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: brand?.color }}
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

export default Browse