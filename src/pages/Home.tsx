import { useNavigate } from 'react-router-dom'
import { brands } from '../lib/drinks'
import { useEffect, useRef } from 'react'
import { useTheme } from '../lib/ThemeContext'

function Home() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }[] = []

    const colors = isDark
      ? ['#f59e0b', '#8b5cf6', '#00bfff', '#ffffff']
      : ['#f59e0b', '#8b5cf6', '#00bfff', '#000000']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = isDark ? '#ffffff' : '#000000'
            ctx.globalAlpha = 0.05
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isDark])

  return (
    <div className="relative min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 px-8 py-16">
        <div className="text-center mb-16">
          <img
            src="/assets/energy-vault-logo.png"
            alt="EnergyVault"
            className="h-25 object-contain mx-auto mb-4"
          />
          <p className={`text-xl max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover, rate, and review your favorite energy drinks from the past, present, and future!
          </p>
        </div>

        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          🏷️ Brands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {brands.map(brand => (
            <div
              key={brand.slug}
              onClick={() => navigate(`/brand/${brand.slug}`)}
              className={`relative overflow-hidden rounded-2xl h-48 cursor-pointer group border transition-all hover:border-yellow-400 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="absolute inset-0 w-full h-full object-contain opacity-20 group-hover:opacity-30 transition-opacity scale-110"
              />
              <div className={`absolute inset-0 opacity-70 ${isDark ? 'bg-gray-900' : 'bg-white'}`} />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h3 className={`font-bold text-3xl mb-2 drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {brand.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {brand.description}
                </p>
                <div className={`mt-4 px-4 py-1 rounded-full text-sm font-bold transition-all ${isDark ? 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white' : 'bg-gray-900 bg-opacity-10 hover:bg-opacity-20 text-gray-900'}`}>
                  View All Flavors →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home