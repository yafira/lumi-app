import type { DayData, LogGroup, ActionItem, TriggerRow } from './types'

export const DAY_DATA: Record<string, DayData> = {
  '1':  { hrv: 68, temp: 36.5, sleep: '7.8h', stress: 'Low',    note: 'Rested day. No symptoms.',                              migraine: false },
  '2':  { hrv: 61, temp: 36.7, sleep: '6.9h', stress: 'Medium', note: 'Mild neck tension in evening.',                         migraine: false },
  '3':  { hrv: 28, temp: 37.4, sleep: '5.1h', stress: 'High',   note: 'Migraine onset 2pm. Took sumatriptan.',                 migraine: true  },
  '4':  { hrv: 55, temp: 36.8, sleep: '6.2h', stress: 'Medium', note: 'Recovery day after migraine.',                          migraine: false },
  '5':  { hrv: 64, temp: 36.5, sleep: '7.4h', stress: 'Low',    note: 'Good day. Went for a walk.',                            migraine: false },
  '6':  { hrv: 70, temp: 36.4, sleep: '8.1h', stress: 'Low',    note: 'Best sleep this week.',                                 migraine: false },
  '7':  { hrv: 66, temp: 36.6, sleep: '7.0h', stress: 'Low',    note: 'Normal day.',                                           migraine: false },
  '8':  { hrv: 72, temp: 36.6, sleep: '7.2h', stress: 'Low',    note: 'Feeling well. Good hydration.',                         migraine: false },
}

export const LOG_GROUPS: LogGroup[] = [
  {
    date: 'today',
    entries: [
      { time: '7:14 am', note: 'skipped coffee, drank 2 glasses of water before breakfast', tag: 'note' },
      { time: '6:02 am', note: 'slept 7.5 hrs, woke rested — no neck tension', tag: 'prevention' },
    ],
  },
  {
    date: 'yesterday',
    entries: [
      { time: '9:40 pm', note: 'neck tension near base of skull, went to bed early', tag: 'symptom' },
      { time: '2:30 pm', note: 'stressful meeting, noticed slight light sensitivity afterward', tag: 'trigger' },
    ],
  },
  {
    date: 'jun 5',
    entries: [
      { time: '10:15 am', note: 'Aura caught early warning — took sumatriptan, no full migraine', tag: 'prevention' },
    ],
  },
]

export const ACTIONS: ActionItem[] = [
  { id: 'medication', label: 'Take medication',  sublabel: 'If prescribed, take now.',     icon: 'pill'      },
  { id: 'hydrate',    label: 'Hydrate now',       sublabel: 'Drink 500ml of water.',        icon: 'droplets'  },
  { id: 'light',      label: 'Reduce light',      sublabel: 'Dim your screens.',            icon: 'sun-dim'   },
  { id: 'rest',       label: 'Rest if you can',   sublabel: 'Lie down in a quiet space.',   icon: 'bed'       },
]

export const TRIGGER_ROWS: TriggerRow[] = [
  { icon: 'moon',    name: 'Sleep Loss',  pct: 78 },
  { icon: 'droplet', name: 'Dehydrated', pct: 42 },
  { icon: 'zap',     name: 'Stress',     pct: 61 },
]

export const MIGRAINE_DAYS = ['3']
export const TODAY = '8'
export const FUTURE_START = 9
