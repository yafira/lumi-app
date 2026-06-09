import { useApp } from "../context/useApp";
import type { Device } from "../types";
import "./Onboard.css";

const TRIGGERS = [
  "Poor sleep",
  "Stress",
  "Hormones",
  "Bright light",
  "Caffeine",
  "Dehydration",
  "Strong smells",
  "Weather changes",
  "Skipped meals",
  "Screen time",
];

const DEFAULT_SELECTED_TRIGGERS = new Set([
  "Poor sleep",
  "Hormones",
  "Dehydration",
]);

const DEVICES: { id: Device; name: string; desc: string; hero?: boolean }[] = [
  {
    id: "aura",
    name: "Aura",
    desc: "Hair clip — clips where it hurts",
    hero: true,
  },
  { id: "halo", name: "Halo", desc: "Headband — wraps around" },
  { id: "nimbus", name: "Nimbus", desc: "Patch — sticks anywhere" },
];

import { useState } from "react";

export default function Onboard() {
  const { onboardStep, nextStep, prevStep, selectedDevice, setDevice } =
    useApp();
  const [selectedTriggers, setSelectedTriggers] = useState(
    DEFAULT_SELECTED_TRIGGERS,
  );

  const toggleTrigger = (t: string) => {
    setSelectedTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  };

  const pct = ((onboardStep + 1) / 3) * 100;

  return (
    <div className="onboard">
      <div className="onboard__inner">
        <div className="onboard__progress">
          <div
            className="onboard__progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>

        {onboardStep === 0 && (
          <div className="onboard__step">
            <div className="onboard__q">Which device do you have?</div>
            <div className="onboard__sub">
              Each device goes where your pain lives.
            </div>
            <div className="device-grid">
              {DEVICES.map(({ id, name, desc, hero }) => (
                <div
                  key={id}
                  className={`device-card ${selectedDevice === id ? "device-card--selected" : ""}`}
                  onClick={() => setDevice(id)}
                >
                  <div className={`device-icon device-icon--${id}`}>
                    <DeviceIcon id={id} />
                  </div>
                  <div className="device-info">
                    <h3>{name}</h3>
                    <p>{desc}</p>
                  </div>
                  {hero && <div className="device-badge">Hero</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {onboardStep === 1 && (
          <div className="onboard__step">
            <div className="onboard__q">What triggers your migraines?</div>
            <div className="onboard__sub">
              Select all that apply — Lumi learns your pattern over time.
            </div>
            <div className="trigger-grid">
              {TRIGGERS.map((t) => (
                <div
                  key={t}
                  className={`trigger-chip ${selectedTriggers.has(t) ? "trigger-chip--selected" : ""}`}
                  onClick={() => toggleTrigger(t)}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {onboardStep === 2 && (
          <div className="onboard__step onboard__step--ready">
            <div className="ready-orb" />
            <div className="onboard__q">
              You're all set,
              <br />
              <em>Yafira.</em>
            </div>
            <div className="onboard__sub">
              Lumi is now learning your patterns. Wear your Aura clip when you
              wake up and we'll do the rest.
            </div>
          </div>
        )}
      </div>

      <div className="onboard__nav">
        <button
          className="btn-secondary"
          style={{
            flex: 1,
            visibility: onboardStep === 0 ? "hidden" : "visible",
          }}
          onClick={prevStep}
        >
          Back
        </button>
        <button className="btn-primary" style={{ flex: 1 }} onClick={nextStep}>
          {onboardStep === 2 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

function DeviceIcon({ id }: { id: Device }) {
  if (id === "aura")
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="8"
          width="16"
          height="6"
          rx="3"
          stroke="var(--lav-deep)"
          strokeWidth="1.5"
        />
        <path
          d="M3 11 C3 13 5 14 7 14 C9 14 11 13 11 11"
          stroke="var(--lav-deep)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  if (id === "halo")
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 11 A7 7 0 1 1 18 11"
          stroke="#D45080"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="11" r="1.5" fill="#D45080" />
        <circle cx="4" cy="11" r="1.5" fill="#D45080" />
      </svg>
    );
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 4 C11 4 13 6.5 11 8 C9 6.5 11 4 11 4Z"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M11 4 C11 4 13 6.5 11 8 C9 6.5 11 4 11 4Z"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(72 11 11)"
      />
      <path
        d="M11 4 C11 4 13 6.5 11 8 C9 6.5 11 4 11 4Z"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(144 11 11)"
      />
      <path
        d="M11 4 C11 4 13 6.5 11 8 C9 6.5 11 4 11 4Z"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(216 11 11)"
      />
      <path
        d="M11 4 C11 4 13 6.5 11 8 C9 6.5 11 4 11 4Z"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(288 11 11)"
      />
      <circle
        cx="11"
        cy="11"
        r="1.5"
        stroke="#2A9D7A"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}
