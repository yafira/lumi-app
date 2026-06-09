import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/useApp'
import './Welcome.css'

export default function Welcome() {
  const { goTo } = useApp()

  return (
    <div className="welcome">
      <div className="welcome__top">
        <div className="welcome__eyebrow">Migraine detection</div>
        <div className="welcome__title">Lu<em>mi</em></div>
        <div className="welcome__tagline">Your body knows before you do.</div>
        <div className="welcome__blob">
          <div className="blob blob--1" />
          <div className="blob blob--2" />
          <div className="blob blob--3" />
        </div>
      </div>
      <div className="welcome__bottom">
        <button className="btn-primary" onClick={() => goTo('s-onboard')}>
          Get started <ArrowRight size={16} />
        </button>
        <button className="btn-secondary" onClick={() => goTo('s-home')}>
          I already have an account
        </button>
      </div>
    </div>
  )
}
