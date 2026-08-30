import { useAppData } from '../../context/AppDataContext.jsx'

export default function Header() {
  const { streak } = useAppData()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="mb-6">
      <h1 className="font-greeting font-semibold text-3xl sm:text-4xl text-ink">{greeting}, Kenzie!</h1>
      <p className="text-tan-deep font-medium mt-1">
        streak: {streak} {streak === 1 ? 'day' : 'days'}
      </p>
    </header>
  )
}
