import { useApp } from '../context/useApp'
import BottomNav from '../components/BottomNav'
import './AlertDone.css'

export default function AlertDone() {
  const { resetAlert } = useApp()

  return (
    <div className="alert-done">
      <div className="alert-done__inner">
        <div className="alert-done__orb" />
        <h1 className="alert-done__title">
          You've done<br />what you <em>can.</em>
        </h1>
        <p className="alert-done__body">
          Lumi is monitoring your signal. Rest now — you've given yourself the best chance.
        </p>
        <div className="alert-done__stats">
          <div className="alert-done__stat">
            <div className="alert-done__stat-val">4 / 4</div>
            <div className="alert-done__stat-label">actions taken</div>
          </div>
          <div className="alert-done__stat">
            <div className="alert-done__stat-val">↓</div>
            <div className="alert-done__stat-label">signal dropping</div>
          </div>
        </div>
        <button className="btn-secondary" onClick={resetAlert}>
          back to alert
        </button>
      </div>
      <BottomNav active="s-alert" />
    </div>
  )
}
