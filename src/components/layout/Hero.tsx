function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-6xl font-bold text-white mb-4">
        ⚡ EnergyVault
      </h1>
      <p className="text-gray-400 text-xl mb-8 max-w-lg">
        Discover, rate, and review your favorite energy drinks. Find your next boost.
      </p>
      <div className="flex gap-4">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full transition-colors">
          Browse Drinks
        </button>
        <button className="border border-gray-600 hover:border-white text-white font-bold px-8 py-3 rounded-full transition-colors">
          Add a Review
        </button>
      </div>
    </div>
  )
}

export default Hero