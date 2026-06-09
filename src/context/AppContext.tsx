import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Screen, NavTab, Device, OnboardStep } from '../types'

interface AppContextValue {
  screen: Screen
  prevScreen: Screen | null
  darkMode: boolean
  onboardStep: OnboardStep
  selectedDevice: Device
  selectedDays: string[]
  checkedActions: Set<string>
  goTo: (s: Screen) => void
  setTab: (s: NavTab) => void
  toggleDark: () => void
  nextStep: () => void
  prevStep: () => void
  setDevice: (d: Device) => void
  selectDay: (day: string) => void
  clearDays: () => void
  checkAction: (id: string) => void
  resetAlert: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('s-welcome')
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [onboardStep, setOnboardStep] = useState<OnboardStep>(0)
  const [selectedDevice, setSelectedDevice] = useState<Device>('aura')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set(['medication']))

  const goTo = useCallback((s: Screen) => {
    setPrevScreen(screen)
    setScreen(s)
  }, [screen])

  const setTab = useCallback((s: NavTab) => {
    goTo(s)
  }, [goTo])

  const toggleDark = useCallback(() => {
    setDarkMode(d => {
      document.documentElement.classList.toggle('dark', !d)
      document.body.classList.toggle('dark', !d)
      return !d
    })
  }, [])

  const nextStep = useCallback(() => {
    if (onboardStep < 2) setOnboardStep(s => (s + 1) as OnboardStep)
    else goTo('s-home')
  }, [onboardStep, goTo])

  const prevStep = useCallback(() => {
    if (onboardStep > 0) setOnboardStep(s => (s - 1) as OnboardStep)
  }, [onboardStep])

  const setDevice = useCallback((d: Device) => setSelectedDevice(d), [])

  const selectDay = useCallback((day: string) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) return prev.filter(d => d !== day)
      if (prev.length < 2) return [...prev, day]
      return [prev[1], day]
    })
  }, [])

  const clearDays = useCallback(() => setSelectedDays([]), [])

  const checkAction = useCallback((id: string) => {
    setCheckedActions(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const resetAlert = useCallback(() => {
    setCheckedActions(new Set(['medication']))
    goTo('s-alert')
  }, [goTo])

  return (
    <AppContext.Provider value={{
      screen, prevScreen, darkMode, onboardStep, selectedDevice,
      selectedDays, checkedActions,
      goTo, setTab, toggleDark, nextStep, prevStep, setDevice,
      selectDay, clearDays, checkAction, resetAlert,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
