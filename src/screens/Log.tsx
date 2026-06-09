import { useState } from 'react'
import { Plus } from 'lucide-react'
import { LOG_GROUPS } from '../data'
import { useApp } from '../context/useApp'
import BottomNav from '../components/BottomNav'
import type { TriggerTag } from '../types'
import './Log.css'

const TAGS: TriggerTag[] = ['note', 'symptom', 'trigger', 'prevention']

export default function Log() {
  const {} = useApp()
  const [composing, setComposing] = useState(false)
  const [note, setNote] = useState('')
  const [activeTag, setActiveTag] = useState<TriggerTag>('note')

  const save = () => {
    if (!note.trim()) return
    setNote('')
    setComposing(false)
  }

  return (
    <div className="log">
      <div className="log__inner">
        <div className="log__header">
          <h1>Log</h1>
          <button className="log__add-btn" onClick={() => setComposing(c => !c)}>
            <Plus size={16} />
          </button>
        </div>

        {composing && (
          <div className="log__compose">
            <div className="compose-tags">
              {TAGS.map(t => (
                <span
                  key={t}
                  className={`compose-tag ${activeTag === t ? 'compose-tag--active' : ''}`}
                  onClick={() => setActiveTag(t)}
                >
                  {t}
                </span>
              ))}
            </div>
            <textarea
              className="compose-textarea"
              placeholder="what do you want to remember?"
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              autoFocus
            />
            <button
              className="btn-primary"
              style={{ fontSize: 12, padding: 12, opacity: note.trim() ? 1 : 0.4 }}
              onClick={save}
            >
              save entry
            </button>
          </div>
        )}

        <div className="log__entries">
          {LOG_GROUPS.map(({ date, entries }) => (
            <div key={date}>
              <div className="log-date-label">{date}</div>
              {entries.map((entry, i) => (
                <div key={i} className="log-entry">
                  <div className="log-entry__time">{entry.time}</div>
                  <div className="log-entry__body">
                    <p>{entry.note}</p>
                    <span className={`log-tag log-tag--${entry.tag}`}>{entry.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="s-log" />
    </div>
  )
}
