import { ControlInput } from "../types";

interface ControlPanelProps {
  connected: boolean;
  onConnectedChange: (value: boolean) => void;
  controlInput: ControlInput;
  onControlChange: (next: ControlInput) => void;
}

function applyButtonPress(
  controlInput: ControlInput,
  key: keyof ControlInput,
  pressed: boolean,
  onControlChange: (next: ControlInput) => void,
) {
  onControlChange({
    ...controlInput,
    [key]: pressed,
  });
}

export function ControlPanel({
  connected,
  onConnectedChange,
  controlInput,
  onControlChange,
}: ControlPanelProps) {
  return (
    <section className="panel">
      <div className="panel__heading-row">
        <h2>Controle Remoto</h2>
        <button
          type="button"
          className={`connect-button ${connected ? "is-on" : ""}`}
          onClick={() => onConnectedChange(!connected)}
        >
          {connected ? "Conectado" : "Conectar"}
        </button>
      </div>

      <p className="panel__subtitle">
        Teclado: WASD / Setas para mover, Shift para boost.
      </p>

      <div className="control-pad">
        <button
          type="button"
          onPointerDown={() => applyButtonPress(controlInput, "forward", true, onControlChange)}
          onPointerUp={() => applyButtonPress(controlInput, "forward", false, onControlChange)}
          onPointerLeave={() => applyButtonPress(controlInput, "forward", false, onControlChange)}
        >
          Frente
        </button>
        <button
          type="button"
          onPointerDown={() => applyButtonPress(controlInput, "left", true, onControlChange)}
          onPointerUp={() => applyButtonPress(controlInput, "left", false, onControlChange)}
          onPointerLeave={() => applyButtonPress(controlInput, "left", false, onControlChange)}
        >
          Esquerda
        </button>
        <button
          type="button"
          onPointerDown={() => applyButtonPress(controlInput, "right", true, onControlChange)}
          onPointerUp={() => applyButtonPress(controlInput, "right", false, onControlChange)}
          onPointerLeave={() => applyButtonPress(controlInput, "right", false, onControlChange)}
        >
          Direita
        </button>
        <button
          type="button"
          onPointerDown={() => applyButtonPress(controlInput, "backward", true, onControlChange)}
          onPointerUp={() => applyButtonPress(controlInput, "backward", false, onControlChange)}
          onPointerLeave={() => applyButtonPress(controlInput, "backward", false, onControlChange)}
        >
          Re
        </button>
        <button
          type="button"
          className="boost"
          onPointerDown={() => applyButtonPress(controlInput, "boost", true, onControlChange)}
          onPointerUp={() => applyButtonPress(controlInput, "boost", false, onControlChange)}
          onPointerLeave={() => applyButtonPress(controlInput, "boost", false, onControlChange)}
        >
          Boost
        </button>
      </div>

      <div className="control-state">
        <span>F:{controlInput.forward ? "1" : "0"}</span>
        <span>B:{controlInput.backward ? "1" : "0"}</span>
        <span>L:{controlInput.left ? "1" : "0"}</span>
        <span>R:{controlInput.right ? "1" : "0"}</span>
        <span>Turbo:{controlInput.boost ? "1" : "0"}</span>
      </div>
    </section>
  );
}
