import { User, Sparkles } from 'lucide-react'
import { useApp } from '../context/useApp'
import BottomNav from '../components/BottomNav'
import './Home.css'

export default function Home() {
  const { setTab } = useApp()

  return (
    <div className="home">
      <div className="home__inner">
        <header className="home__header">
          <div>
            <div className="home__greeting">Good morning</div>
            <div className="home__name">
              Yafira <Sparkles size={16} color="var(--lav-deep)" />
            </div>
          </div>
          <div className="home__avatar">
            <User size={20} />
          </div>
        </header>

        <div className="signal-card">
          <div className="signal-label">Your signal right now</div>
          <div className="signal-orb-wrap">
            <div className="signal-orb">
              <div className="signal-orb__ring" />
            </div>
            <div className="signal-text">
              <h3>Feeling calm.<br />All clear.</h3>
              <p>No abnormal activity detected. You are well within your regular baselines.</p>
            </div>
          </div>
          <div className="signal-stats">
            <div className="signal-stat">
              <div className="stat-val">72</div>
              <div className="stat-lbl">HRV</div>
            </div>
            <div className="signal-stat">
              <div className="stat-val">36.6°</div>
              <div className="stat-lbl">Temp</div>
            </div>
            <div className="signal-stat">
              <div className="stat-val">Low</div>
              <div className="stat-lbl">Risk</div>
            </div>
          </div>
        </div>

        <div className="section-title-row">
          <h2>Today's signals</h2>
        </div>

        <div className="insights-grid">
          <div className="insight-card insight-card--lavender">
            <div className="insight-val">7.2h</div>
            <div className="insight-lbl">Sleep</div>
          </div>
          <div className="insight-card insight-card--blush">
            <div className="insight-val">1.8L</div>
            <div className="insight-lbl">Hydration</div>
          </div>
          <div className="insight-card insight-card--mint">
            <div className="insight-val">Low</div>
            <div className="insight-lbl">Stress</div>
          </div>
          <div className="insight-card insight-card--sand">
            <div className="insight-val">Day 14</div>
            <div className="insight-lbl">Cycle</div>
          </div>
        </div>

        <div className="alert-teaser" onClick={() => setTab('s-alert')}>
          <div>
            <div className="alert-teaser__eyebrow">Early warning</div>
            <div className="alert-teaser__title">View alert details →</div>
          </div>
        </div>
      </div>

      <BottomNav active="s-home" />
    </div>
  )
}
