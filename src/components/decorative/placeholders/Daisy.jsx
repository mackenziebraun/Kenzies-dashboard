export default function Daisy({ className = 'h-14 w-14' }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none">
      <path d="M50 140V70" stroke="#AEBB8D" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 105c-9-3-14-1-19 6" stroke="#AEBB8D" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="38"
          rx="7"
          ry="14"
          fill="#F7F0E7"
          stroke="#E4D2BB"
          strokeWidth="1"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#9A806B" />
    </svg>
  )
}
