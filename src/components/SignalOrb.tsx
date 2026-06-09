import './SignalOrb.css'

interface Props {
  level?: number
  size?: number
  animate?: boolean
}

export default function SignalOrb({ level = 0.2, size = 120, animate = true }: Props) {
  const stateClass = level >= 0.7 ? 'orb--high' : level >= 0.35 ? 'orb--medium' : 'orb--low'

  return (
    <div
      className={`orb ${stateClass} ${animate ? 'orb--pulse' : ''}`}
      style={{ '--orb-size': `${size}px` } as React.CSSProperties}
      aria-label={`signal level ${Math.round(level * 100)}%`}
    >
      <div className="orb__core" />
      <div className="orb__ring orb__ring--1" />
      <div className="orb__ring orb__ring--2" />
    </div>
  )
}
