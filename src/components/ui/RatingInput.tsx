type RatingInputProps = {
  rating: number
  onChange: (rating: number) => void
}

function RatingInput({ rating, onChange }: RatingInputProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min="0.5"
        max="10"
        step="0.5"
        value={rating}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="flex-1 accent-yellow-400"
      />
      <span className="text-2xl font-bold text-yellow-400 w-16 text-right">
        {rating > 0 ? rating.toFixed(1) : '—'}
      </span>
      <span className="text-gray-400">/ 10</span>
    </div>
  )
}

export default RatingInput