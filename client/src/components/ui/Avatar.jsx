import './Avatar.css'

const SIZES = { sm: 32, md: 44, lg: 60 }
const COLORS = ['#6C63FF','#10B981','#F59E0B','#EF4444','#3B82F6','#8B5CF6','#EC4899']

export default function Avatar({ name = '?', size = 'md' }) {
  const px = SIZES[size]
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const color = COLORS[name.charCodeAt(0) % COLORS.length]
  return (
    <div className="avatar" style={{ width: px, height: px, background: color, fontSize: px * 0.35 }}>
      {initials}
    </div>
  )
}
