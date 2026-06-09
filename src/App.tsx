import { useEffect, useRef } from "react";
import { AppProvider } from "./context/AppContext";
import { useApp } from "./context/useApp";
import Phone from "./components/Phone";
import StatusBar from "./components/StatusBar";
import Welcome from "./screens/Welcome";
import Onboard from "./screens/Onboard";
import Home from "./screens/Home";
import Alert from "./screens/Alert";
import AlertDone from "./screens/AlertDone";
import Patterns from "./screens/Patterns";
import Log from "./screens/Log";

function ScreenManager() {
  const { screen } = useApp();
  const prevRef = useRef(screen);

  useEffect(() => {
    prevRef.current = screen;
  }, [screen]);

  const screens = [
    { id: "s-welcome", Component: Welcome },
    { id: "s-onboard", Component: Onboard },
    { id: "s-home", Component: Home },
    { id: "s-alert", Component: Alert },
    { id: "s-alert-done", Component: AlertDone },
    { id: "s-patterns", Component: Patterns },
    { id: "s-log", Component: Log },
  ];

  return (
    <>
      {screens.map(({ id, Component }) => (
        <div key={id} className={`screen ${screen === id ? "active" : ""}`}>
          <Component />
        </div>
      ))}
    </>
  );
}

function LumiApp() {
  return (
    <Phone>
      <StatusBar />
      <ScreenManager />
    </Phone>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LumiApp />
    </AppProvider>
  );
}
