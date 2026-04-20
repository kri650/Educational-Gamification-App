import './Skeleton.css'

export default function Skeleton({ width = '100%', height = '16px', borderRadius = '6px', style = {} }) {
  return <div className="skeleton" style={{ width, height, borderRadius, ...style }} />
}
