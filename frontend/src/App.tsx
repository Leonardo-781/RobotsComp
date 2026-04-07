import { useCallback, useEffect, useMemo, useState } from "react";
import { ControlPanel } from "./components/ControlPanel";
import { Hero } from "./components/Hero";
import { RentalConfigurator } from "./components/RentalConfigurator";
import { TelemetryPanel } from "./components/TelemetryPanel";
import { useKeyboardControl } from "./hooks/useKeyboardControl";
import { ArenaSimulation } from "./scenes/ArenaSimulation";
import { useMvpStore } from "./stores/useMvpStore";
import { ControlInput, Telemetry } from "./types";

export default function App() {
  const {
    models,
    selectedModelId,
    setSelectedModelId,
    rentalMinutes,
    setRentalMinutes,
    connected,
    setConnected,
    controlInput,
    setControlInput,
    telemetry,
    setTelemetry,
    rentalSummary,
    selectedModel,
  } = useMvpStore();

  const [sessionActive, setSessionActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(rentalMinutes * 60);

  const activeUsers = useMemo(() => 124 + (connected ? 3 : 0), [connected]);

  useEffect(() => {
    if (!sessionActive) {
      setRemainingSeconds(rentalMinutes * 60);
    }
  }, [rentalMinutes, sessionActive]);

  useEffect(() => {
    if (!sessionActive || !connected) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          setSessionActive(false);
          setConnected(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [connected, sessionActive, setConnected]);

  const sessionProgress = useMemo(() => {
    const total = rentalMinutes * 60;
    if (total <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(100, (remainingSeconds / total) * 100));
  }, [remainingSeconds, rentalMinutes]);

  const onControlChange = useCallback(
    (next: ControlInput) => {
      setControlInput(next);
    },
    [setControlInput],
  );

  const onTelemetry = useCallback(
    (next: Telemetry) => {
      setTelemetry(next);
    },
    [setTelemetry],
  );

  useKeyboardControl({ connected, onControlChange });

  return (
    <div className="app-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-grid" />

      <main className="layout">
        <Hero
          activeUsers={activeUsers}
          sessionActive={sessionActive}
          hasIntegratedCamera={selectedModel.hasIntegratedCamera}
        />

        <section className="layout__main-grid">
          <ArenaSimulation
            connected={connected}
            controlInput={controlInput}
            onTelemetry={onTelemetry}
          />

          <div className="layout__side">
            <ControlPanel
              connected={connected}
              onConnectedChange={setConnected}
              controlInput={controlInput}
              onControlChange={onControlChange}
            />
            <TelemetryPanel telemetry={telemetry} />
          </div>
        </section>

        <RentalConfigurator
          models={models}
          selectedModelId={selectedModelId}
          onSelectModel={setSelectedModelId}
          rentalMinutes={rentalMinutes}
          onRentalMinutesChange={setRentalMinutes}
          rentalSummary={rentalSummary}
          sessionActive={sessionActive}
          onSessionToggle={() => {
            if (!connected) {
              setConnected(true);
            }
            setSessionActive((current) => !current);
          }}
          remainingSeconds={remainingSeconds}
          sessionProgress={sessionProgress}
        />
      </main>
    </div>
  );
}
