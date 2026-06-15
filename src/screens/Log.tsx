import { useState } from "react";
import {
  Plus,
  Activity,
  Frown,
  Cookie,
  Wind,
  Wine,
  Droplet,
  Moon,
  Utensils,
  Monitor,
  EyeOff,
  Sun,
  Ear,
  Hand,
  Zap,
  CloudRain,
  MoonStar,
  Volume2,
} from "lucide-react";
import { LOG_GROUPS, SYMPTOM_CATEGORIES } from "../data";
import BottomNav from "../components/BottomNav";
import type {
  TriggerTag,
  SymptomCategoryId,
  LogGroup,
  LogEntry,
} from "../types";
import "./Log.css";

const SYMPTOM_ICON_MAP: Record<string, React.ReactNode> = {
  activity: <Activity size={14} />,
  frown: <Frown size={14} />,
  cookie: <Cookie size={14} />,
  wind: <Wind size={14} />,
  wine: <Wine size={14} />,
  droplet: <Droplet size={14} />,
  moon: <Moon size={14} />,
  utensils: <Utensils size={14} />,
  monitor: <Monitor size={14} />,
  "eye-off": <EyeOff size={14} />,
  sun: <Sun size={14} />,
  ear: <Ear size={14} />,
  hand: <Hand size={14} />,
  zap: <Zap size={14} />,
  "cloud-rain": <CloudRain size={14} />,
  "moon-star": <MoonStar size={14} />,
  "volume-2": <Volume2 size={14} />,
};

// Maps a symptom category to the resulting log tag when selected
const CATEGORY_TO_TAG: Record<SymptomCategoryId, TriggerTag> = {
  hormonal: "trigger",
  lifestyle: "trigger",
  aura: "symptom",
  attack: "symptom",
};

// Build a lookup from symptom id -> label, for composing the note text
const SYMPTOM_LABEL_MAP: Record<string, string> = {};
SYMPTOM_CATEGORIES.forEach((cat) => {
  cat.symptoms.forEach((s) => {
    SYMPTOM_LABEL_MAP[s.id] = s.label;
  });
});

// Build a lookup from symptom id -> category id, for deriving the tag
const SYMPTOM_CATEGORY_MAP: Record<string, SymptomCategoryId> = {};
SYMPTOM_CATEGORIES.forEach((cat) => {
  cat.symptoms.forEach((s) => {
    SYMPTOM_CATEGORY_MAP[s.id] = cat.id;
  });
});

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minStr} ${ampm}`;
}

export default function Log() {
  const [composing, setComposing] = useState(false);
  const [note, setNote] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set(),
  );
  const [logGroups, setLogGroups] = useState<LogGroup[]>(LOG_GROUPS);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Derive the overall tag from selected symptoms, falling back to "note"
  const deriveTag = (): TriggerTag => {
    if (selectedSymptoms.size === 0) return "note";
    let hasSymptomCategory = false;
    let hasTriggerCategory = false;
    selectedSymptoms.forEach((id) => {
      const cat = SYMPTOM_CATEGORY_MAP[id];
      const tag = CATEGORY_TO_TAG[cat];
      if (tag === "symptom") hasSymptomCategory = true;
      if (tag === "trigger") hasTriggerCategory = true;
    });
    if (hasSymptomCategory) return "symptom";
    if (hasTriggerCategory) return "trigger";
    return "note";
  };

  const derivedTag = deriveTag();

  const buildNoteText = (): string => {
    const symptomLabels = Array.from(selectedSymptoms).map(
      (id) => SYMPTOM_LABEL_MAP[id],
    );
    if (note.trim() && symptomLabels.length > 0) {
      return `${symptomLabels.join(", ")} — ${note.trim()}`;
    }
    if (symptomLabels.length > 0) {
      return symptomLabels.join(", ");
    }
    return note.trim();
  };

  const save = () => {
    if (!note.trim() && selectedSymptoms.size === 0) return;

    const entry: LogEntry = {
      time: formatTime(new Date()),
      note: buildNoteText(),
      tag: derivedTag,
    };

    setLogGroups((prev) => {
      const next = [...prev];
      if (next.length > 0 && next[0].date === "today") {
        next[0] = { ...next[0], entries: [entry, ...next[0].entries] };
      } else {
        next.unshift({ date: "today", entries: [entry] });
      }
      return next;
    });

    setNote("");
    setSelectedSymptoms(new Set());
    setComposing(false);
  };

  return (
    <div className="log">
      <div className="log__inner">
        <div className="log__header">
          <h1>Log</h1>
          <button
            className="log__add-btn"
            onClick={() => setComposing((c) => !c)}
          >
            <Plus size={16} />
          </button>
        </div>

        {composing && (
          <div className="log__compose">
            <div className="symptom-picker">
              {SYMPTOM_CATEGORIES.map((category) => (
                <div key={category.id} className="symptom-category">
                  <div className="symptom-category__title">
                    {category.title}
                  </div>
                  <div className="symptom-category__grid">
                    {category.symptoms.map((symptom) => {
                      const selected = selectedSymptoms.has(symptom.id);
                      return (
                        <div
                          key={symptom.id}
                          className={`symptom-chip ${selected ? "symptom-chip--selected" : ""}`}
                          onClick={() => toggleSymptom(symptom.id)}
                        >
                          <span className="symptom-chip__icon">
                            {SYMPTOM_ICON_MAP[symptom.icon]}
                          </span>
                          {symptom.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <textarea
              className="compose-textarea"
              placeholder="what do you want to remember?"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {(note.trim() || selectedSymptoms.size > 0) && (
              <div className="compose-preview">
                <span className="compose-preview__label">will be tagged</span>
                <span className={`log-tag log-tag--${derivedTag}`}>
                  {derivedTag}
                </span>
              </div>
            )}

            <button
              className="btn-primary"
              style={{
                fontSize: 12,
                padding: 12,
                opacity: note.trim() || selectedSymptoms.size > 0 ? 1 : 0.4,
              }}
              onClick={save}
            >
              save entry
            </button>
          </div>
        )}

        <div className="log__entries">
          {logGroups.map(({ date, entries }) => (
            <div key={date}>
              <div className="log-date-label">{date}</div>
              {entries.map((entry, i) => (
                <div key={i} className="log-entry">
                  <div className="log-entry__time">{entry.time}</div>
                  <div className="log-entry__body">
                    <p>{entry.note}</p>
                    <span className={`log-tag log-tag--${entry.tag}`}>
                      {entry.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="s-log" />
    </div>
  );
}
