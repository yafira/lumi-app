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

const DEVICES: {
  id: Device;
  name: string;
  desc: string;
  image: string;
  hero?: boolean;
}[] = [
  {
    id: "aura",
    name: "Aura",
    desc: "Hair clip — clips where it hurts",
    image: "/devices/aura.png",
    hero: true,
  },
  {
    id: "halo",
    name: "Halo",
    desc: "Headband — wraps around",
    image: "/devices/halo.png",
  },
  {
    id: "nimbus",
    name: "Nimbus",
    desc: "Patch — sticks anywhere",
    image: "/devices/nimbus.png",
  },
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
              {DEVICES.map(({ id, name, desc, image, hero }) => (
                <div
                  key={id}
                  className={`device-card ${selectedDevice === id ? "device-card--selected" : ""}`}
                  onClick={() => setDevice(id)}
                >
                  <div className={`device-image device-image--${id}`}>
                    <img src={image} alt={`${name} device`} />
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
