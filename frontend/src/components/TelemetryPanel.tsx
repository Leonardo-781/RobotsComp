import { Telemetry } from "../types";

interface TelemetryPanelProps {
  telemetry: Telemetry;
}

export function TelemetryPanel({ telemetry }: TelemetryPanelProps) {
  return (
    <section className="panel panel--dark">
      <h2>Telemetria ESP32 (simulada)</h2>
      <div className="telemetry-grid">
        <article>
          <span>Bateria</span>
          <strong>{telemetry.battery.toFixed(0)}%</strong>
        </article>
        <article>
          <span>Sinal</span>
          <strong>{telemetry.signal.toFixed(0)}%</strong>
        </article>
        <article>
          <span>Temperatura</span>
          <strong>{telemetry.temperature.toFixed(1)} C</strong>
        </article>
        <article>
          <span>Velocidade</span>
          <strong>{telemetry.speedKmh.toFixed(1)} km/h</strong>
        </article>
        <article>
          <span>Latencia</span>
          <strong>{telemetry.latencyMs.toFixed(0)} ms</strong>
        </article>
      </div>
    </section>
  );
}
