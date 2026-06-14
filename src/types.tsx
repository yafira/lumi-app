export type Screen =
  | "s-welcome"
  | "s-onboard"
  | "s-home"
  | "s-alert"
  | "s-alert-done"
  | "s-patterns"
  | "s-log";

export type NavTab = "s-home" | "s-patterns" | "s-alert" | "s-log";

export type OnboardStep = 0 | 1 | 2;

export type Device = "aura" | "halo" | "nimbus";

export type TriggerTag = "note" | "symptom" | "trigger" | "prevention";

export type StressLevel = "Low" | "Medium" | "High";

export interface DayData {
  hrv: number;
  temp: number;
  sleep: string;
  stress: StressLevel;
  note: string;
  migraine: boolean;
}

export interface LogEntry {
  time: string;
  note: string;
  tag: TriggerTag;
}

export interface LogGroup {
  date: string;
  entries: LogEntry[];
}

export interface ActionItem {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface TriggerRow {
  icon: string;
  name: string;
  pct: number;
}

export type SymptomCategoryId = "hormonal" | "lifestyle" | "aura" | "attack";

export interface Symptom {
  id: string;
  label: string;
  icon: string;
}

export interface SymptomCategory {
  id: SymptomCategoryId;
  title: string;
  symptoms: Symptom[];
}

export interface QuickLogItem {
  id: string;
  label: string;
  icon: string;
}

export interface CycleCorrelation {
  headline: string;
  detail: string;
  dayRange: string;
}
