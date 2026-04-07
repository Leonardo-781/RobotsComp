import { RobotModel, RentalSummary } from "../types";
import { formatCurrency } from "../utils/pricing";
import { CSSProperties } from "react";

interface RentalConfiguratorProps {
  models: RobotModel[];
  selectedModelId: string;
  onSelectModel: (id: string) => void;
  rentalMinutes: number;
  onRentalMinutesChange: (minutes: number) => void;
  rentalSummary: RentalSummary;
  sessionActive: boolean;
  onSessionToggle: () => void;
  remainingSeconds: number;
  sessionProgress: number;
}

export function RentalConfigurator({
  models,
  selectedModelId,
  onSelectModel,
  rentalMinutes,
  onRentalMinutesChange,
  rentalSummary,
  sessionActive,
  onSessionToggle,
  remainingSeconds,
  sessionProgress,
}: RentalConfiguratorProps) {
  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");

  return (
    <section className="panel panel--glow">
      <h2>Configurar Sessao</h2>
      <p className="panel__subtitle">Escolha modelo, tempo e recursos de camera.</p>

      <div className="model-grid">
        {models.map((model) => {
          const selected = model.id === selectedModelId;
          return (
            <button
              key={model.id}
              className={`model-card ${selected ? "is-selected" : ""}`}
              onClick={() => onSelectModel(model.id)}
              style={{ "--model-accent": model.accent } as CSSProperties}
              type="button"
            >
              <div className="model-card__top">
                <strong>{model.name}</strong>
                <span>{model.category === "VEHICLE" ? "Veiculo" : "Robo"}</span>
              </div>
              <p>{model.description}</p>
              <div className="model-card__meta">
                <span>Velocidade {model.maxSpeed} km/h</span>
                <span>Blindagem {model.armorLevel}%</span>
                <span>
                  {model.hasIntegratedCamera
                    ? "Camera integrada"
                    : "Camera da arena"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <label className="minutes-range">
        <span>Tempo de combate: {rentalMinutes} min</span>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={rentalMinutes}
          onChange={(event) => onRentalMinutesChange(Number(event.target.value))}
        />
      </label>

      <div className="summary-grid">
        <div>
          <span>Modelo</span>
          <strong>{rentalSummary.modelName}</strong>
        </div>
        <div>
          <span>Subtotal</span>
          <strong>{formatCurrency(rentalSummary.subtotal)}</strong>
        </div>
        <div>
          <span>Taxa de camera</span>
          <strong>{formatCurrency(rentalSummary.cameraFee)}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>{formatCurrency(rentalSummary.total)}</strong>
        </div>
      </div>

      <div className="session-row">
        <button
          type="button"
          className={`session-button ${sessionActive ? "is-live" : ""}`}
          onClick={onSessionToggle}
        >
          {sessionActive ? "Pausar simulacao" : "Iniciar simulacao"}
        </button>
        <div className="session-timer">
          <span>Tempo restante</span>
          <strong>
            {minutes}:{seconds}
          </strong>
        </div>
      </div>

      <div className="session-progress">
        <div style={{ width: `${sessionProgress}%` }} />
      </div>
    </section>
  );
}
