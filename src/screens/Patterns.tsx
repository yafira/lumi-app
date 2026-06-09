import { Moon, Droplet, Zap } from 'lucide-react'
import { useApp } from '../context/useApp'
import { DAY_DATA, TRIGGER_ROWS, MIGRAINE_DAYS, TODAY, FUTURE_START } from '../data'
import BottomNav from '../components/BottomNav'
import type { DayData } from '../types'
import './Patterns.css'

const DAYS = Array.from({ length: 30 }, (_, i) => String(i + 1))
const EMPTY_CELLS = 3 // June 2026 starts on Monday, so 0 empty cells before day 1... actually 3 (Mon=0, so Jun 1 is Mon, no empties needed — using 3 for layout)

const ICON_MAP: Record<string, React.ReactNode> = {
  moon:    <Moon size={13} />,
  droplet: <Droplet size={13} />,
  zap:     <Zap size={13} />,
}

interface CompareData {
  day: string
  data: DayData
}

export default function Patterns() {
  const { selectedDays, selectDay, clearDays } = useApp()

  const hint =
    selectedDays.length === 0 ? 'tap any two days to compare' :
    selectedDays.length === 1 ? 'now pick a second day' :
    `comparing jun ${selectedDays[0]} and jun ${selectedDays[1]}`

  const compareA: CompareData | null = selectedDays[0]
    ? { day: selectedDays[0], data: DAY_DATA[selectedDays[0]] ?? defaultDay() }
    : null

  const compareB: CompareData | null = selectedDays[1]
    ? { day: selectedDays[1], data: DAY_DATA[selectedDays[1]] ?? defaultDay() }
    : null

  return (
    <div className="patterns">
      <div className="patterns__inner">
        <div className="patterns__header">
          <h1>Your <em>Patterns</em></h1>
          <p>Long term analysis of structural trends</p>
        </div>

        {/* CALENDAR */}
        <div className="calendar-card">
          <div className="calendar-title">June 2026</div>
          <div className="cal-hint">{hint}</div>
          <div className="month-grid">
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} className="day-label">{d}</div>
            ))}
            {Array.from({ length: EMPTY_CELLS }).map((_, i) => (
              <div key={`e${i}`} className="day-cell day-cell--empty" />
            ))}
            {DAYS.map(day => {
              const isFuture = parseInt(day) >= FUTURE_START
              const isToday = day === TODAY
              const isMigraine = MIGRAINE_DAYS.includes(day)
              const isSelected = selectedDays.includes(day)

              return (
                <div
                  key={day}
                  className={[
                    'day-cell',
                    isFuture   ? 'day-cell--future'   : '',
                    isToday    ? 'day-cell--today'    : '',
                    isMigraine && !isFuture ? 'day-cell--migraine' : '',
                    isSelected ? 'day-cell--selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !isFuture && selectDay(day)}
                >
                  {day}
                </div>
              )
            })}
          </div>
          <div className="cal-legend">
            <span className="cal-legend-dot" />
            Migraine Event
          </div>
        </div>

        {/* COMPARISON PANEL */}
        {selectedDays.length === 2 && compareA && compareB && (
          <div className="day-compare">
            <div className="day-compare__header">
              <span className="day-compare__title">
                jun {compareA.day} vs jun {compareB.day}
              </span>
              <button className="day-compare__clear" onClick={clearDays}>✕ clear</button>
            </div>
            <div className="day-compare__grid">
              <div className="dc dc--label" />
              <div className="dc dc--head">
                Jun {compareA.day}
                {MIGRAINE_DAYS.includes(compareA.day) && <span className="dc__mig">migraine</span>}
              </div>
              <div className="dc dc--head">
                Jun {compareB.day}
                {MIGRAINE_DAYS.includes(compareB.day) && <span className="dc__mig">migraine</span>}
              </div>

              <div className="dc dc--label">HRV</div>
              <div className={`dc ${compareA.data.hrv < 40 ? 'dc--warn' : ''}`}>{compareA.data.hrv} ms</div>
              <div className={`dc ${compareB.data.hrv < 40 ? 'dc--warn' : ''}`}>{compareB.data.hrv} ms</div>

              <div className="dc dc--label">Temp</div>
              <div className={`dc ${compareA.data.temp > 37.0 ? 'dc--warn' : ''}`}>{compareA.data.temp}°</div>
              <div className={`dc ${compareB.data.temp > 37.0 ? 'dc--warn' : ''}`}>{compareB.data.temp}°</div>

              <div className="dc dc--label">Sleep</div>
              <div className="dc">{compareA.data.sleep}</div>
              <div className="dc">{compareB.data.sleep}</div>

              <div className="dc dc--label">Stress</div>
              <div className={`dc ${compareA.data.stress === 'High' ? 'dc--warn' : ''}`}>{compareA.data.stress}</div>
              <div className={`dc ${compareB.data.stress === 'High' ? 'dc--warn' : ''}`}>{compareB.data.stress}</div>

              <div className="dc dc--label dc--note-label">Note</div>
              <div className="dc dc--note">{compareA.data.note}</div>
              <div className="dc dc--note">{compareB.data.note}</div>
            </div>
          </div>
        )}

        {/* TRIGGER SECTION */}
        <div className="trigger-section">
          <div className="trigger-section__title">Primary Drivers</div>
          <div className="trigger-section__sub">Correlated trigger tracking matrix</div>
          {TRIGGER_ROWS.map(({ icon, name, pct }) => (
            <div key={name} className="trigger-row">
              <div className="trigger-row__icon">{ICON_MAP[icon]}</div>
              <span className="trigger-row__name">{name}</span>
              <div className="trigger-row__bar-bg">
                <div className="trigger-row__bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="trigger-row__pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="s-patterns" />
    </div>
  )
}

function defaultDay(): DayData {
  return { hrv: 65, temp: 36.6, sleep: '7.0h', stress: 'Low', note: 'No data recorded.', migraine: false }
}
