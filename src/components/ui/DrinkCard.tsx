type DrinkCardProps = {
  name: string
  brand: string
  flavor: string
  caffeine: number
  rating: number
  color: string
}

function DrinkCard({ name, brand, flavor, caffeine, rating, color }: DrinkCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-yellow-400 transition-all hover:scale-105 cursor-pointer">
      <div className="w-full h-32 rounded-xl mb-4 flex items-center justify-center text-5xl" style={{ backgroundColor: color }}>
        ⚡
      </div>
      <h3 className="text-white font-bold text-lg">{name}</h3>
      <p className="text-gray-400 text-sm">{brand}</p>
      <p className="text-gray-500 text-sm mt-1">{flavor}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-400 text-sm font-bold">{caffeine}mg caffeine</span>
        <span className="text-white font-bold">{"⭐".repeat(rating)}</span>
      </div>
    </div>
  )
}

export default DrinkCard