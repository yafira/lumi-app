import { useEffect } from 'react'
import { Pill, Droplets, SunDim, BedDouble, Check } from 'lucide-react'
import { useApp } from '../context/useApp'
import { ACTIONS } from '../data'
import BottomNav from '../components/BottomNav'
import './Alert.css'

const ICON_MAP: Record<string, React.ReactNode> = {
  pill:     <Pill size={16} />,
  droplets: <Droplets size={16} />,
  'sun-dim': <SunDim size={16} />,
  bed:      <BedDouble size={16} />,
}

export default function Alert() {
  const { checkedActions, checkAction, goTo } = useApp()
  const doneCount = checkedActions.size
  const total = ACTIONS.length
  const pct = (doneCount / total) * 100
  const allDone = doneCount === total

  useEffect(() => {
    if (allDone) {
      const t = setTimeout(() => goTo('s-alert-done'), 700)
      return () => clearTimeout(t)
    }
  }, [allDone, goTo])

  return (
    <div className="alert-screen">
      <div className="alert-screen__inner">
        <div className="alert-badge">
          <div className="alert-dot" />
          Early warning
        </div>

        <h1 className="alert-title">
          A migraine<br />may be <em>coming.</em>
        </h1>
        <p className="alert-desc">HRV dropped 18% over 2 hours. Migraine likely in 3–5 hrs.</p>

        <div className="alert-timeline">
          <div className="timeline-label">Onset window</div>
          <div className="timeline-bar-bg">
            <div className="timeline-bar-fill" style={{ width: '55%' }} />
          </div>
          <div className="timeline-markers">
            <span>Now</span>
            <span className="timeline-now">3–5 hrs</span>
            <span>+6h</span>
          </div>
        </div>

        <div className="action-progress">
          <span className="action-progress__label">{doneCount} of {total} actions taken</span>
          <div className="action-progress__bar-bg">
            <div
              className={`action-progress__bar-fill ${allDone ? 'action-progress__bar-fill--full' : ''}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="action-list">
          {ACTIONS.map(({ id, label, sublabel, icon }) => {
            const done = checkedActions.has(id)
            return (
              <div
                key={id}
                className={`action-item ${done ? 'action-item--done' : ''}`}
                onClick={() => checkAction(id)}
              >
                <div className="action-item__icon">{ICON_MAP[icon]}</div>
                <div className="action-item__text">
                  <h4>{label}</h4>
                  <p>{sublabel}</p>
                  {done && <span className="action-item__confirm">done ✓</span>}
                </div>
                <div className="action-item__check">
                  {done && <Check size={11} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav active="s-alert" />
    </div>
  )
}
