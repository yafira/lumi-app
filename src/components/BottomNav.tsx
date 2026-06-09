import { Home, BarChart2, Bell, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { NavTab } from '../types'
import './BottomNav.css'

interface Tab {
  id: NavTab
  label: string
  Icon: React.FC<{ size: number }>
}

const TABS: Tab[] = [
  { id: 's-home',     label: 'Home',     Icon: Home      },
  { id: 's-patterns', label: 'Patterns', Icon: BarChart2  },
  { id: 's-alert',    label: 'Alert',    Icon: Bell       },
  { id: 's-log',      label: 'Log',      Icon: BookOpen   },
]

interface Props {
  active: NavTab
}

export default function BottomNav({ active }: Props) {
  const { setTab } = useApp()

  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => (
        <div
          key={id}
          className={`nav-item ${active === id || (active === 's-alert' && id === 's-alert') ? 'active' : ''}`}
          onClick={() => setTab(id)}
        >
          <Icon size={20} />
          <span className="nav-label">{label}</span>
        </div>
      ))}
    </nav>
  )
}
