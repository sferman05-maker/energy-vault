type StarRatingProps = {
  rating: number
  size?: string
}

function StarRating({ rating, size = 'text-xl' }: StarRatingProps) {
  // Convert 0-10 rating to 0-5 stars for display
  const starsValue = rating / 2

  return (
    <div className={`flex gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map(star => {
        const diff = starsValue - star + 1
        let content = '☆'
        let color = '#4b5563'

        if (diff >= 1) {
          content = '★'
          color = '#f59e0b'
        } else if (diff >= 0.5) {
          content = '★'
          color = '#f59e0b'
        }

        return (
          <span key={star} style={{ color, position: 'relative', display: 'inline-block' }}>
            {diff >= 0.5 && diff < 1 ? (
              <span style={{ position: 'relative' }}>
                <span style={{ color: '#4b5563' }}>★</span>
                <span style={{ position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'hidden', color: '#f59e0b' }}>★</span>
              </span>
            ) : content}
          </span>
        )
      })}
    </div>
  )
}

export default StarRating