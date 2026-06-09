import { Wifi, BatteryFull, Sun, Moon } from "lucide-react";
import { useApp } from "../context/useApp";
import "./StatusBar.css";

export default function StatusBar() {
  const { darkMode, toggleDark } = useApp();

  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>
      <div className="status-right">
        <button
          className="mode-btn"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <div className="status-icons">
          <Wifi size={14} />
          <BatteryFull size={14} />
        </div>
      </div>
    </div>
  );
}
