// Simple original placeholder line-art, standing in for the user's real
// illustration assets until those are dropped into src/assets/decorative.
export default function Flower({ className = 'h-16 w-16', color = '#B58DC0' }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none">
      <path d="M50 140V60" stroke="#AEBB8D" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 95c-10-4-16-2-22 6" stroke="#AEBB8D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 75c10-3 16-1 21 7" stroke="#AEBB8D" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="34"
          rx="9"
          ry="16"
          fill={color}
          opacity="0.85"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="7" fill="#E4D2BB" />
    </svg>
  )
}
