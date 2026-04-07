import { useEffect, useRef } from "react";
import { ControlInput, Telemetry } from "../types";

interface ArenaSimulationProps {
  connected: boolean;
  controlInput: ControlInput;
  onTelemetry: (telemetry: Telemetry) => void;
}

interface BotState {
  x: number;
  y: number;
  angle: number;
  speed: number;
}

export function ArenaSimulation({
  connected,
  controlInput,
  onTelemetry,
}: ArenaSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerRef = useRef<BotState>({ x: 140, y: 140, angle: 0, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    let animationFrame = 0;
    let last = performance.now();
    const obstacle = { x: 320, y: 180, r: 46 };
    const enemy = { x: 520, y: 280, r: 20 };

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const drawArena = (deltaSeconds: number) => {
      const player = playerRef.current;

      const turn = (controlInput.right ? 1 : 0) - (controlInput.left ? 1 : 0);
      const thrust = (controlInput.forward ? 1 : 0) - (controlInput.backward ? 1 : 0);
      const speedBase = controlInput.boost ? 160 : 110;

      if (connected) {
        player.angle += turn * 2.3 * deltaSeconds;
        player.speed = thrust * speedBase;
      } else {
        player.speed *= 0.88;
      }

      player.x += Math.cos(player.angle) * player.speed * deltaSeconds;
      player.y += Math.sin(player.angle) * player.speed * deltaSeconds;

      player.x = clamp(player.x, 24, canvas.width - 24);
      player.y = clamp(player.y, 24, canvas.height - 24);

      context.clearRect(0, 0, canvas.width, canvas.height);

      const bg = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "#060d1d");
      bg.addColorStop(1, "#101f27");
      context.fillStyle = bg;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "rgba(255,255,255,0.08)";
      context.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 28) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }

      context.fillStyle = "#8dff52";
      context.beginPath();
      context.arc(obstacle.x, obstacle.y, obstacle.r, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#ff6262";
      context.beginPath();
      context.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.translate(player.x, player.y);
      context.rotate(player.angle);
      context.fillStyle = connected ? "#48e3ff" : "#8ca5c9";
      context.fillRect(-18, -12, 36, 24);
      context.fillStyle = "#02131e";
      context.fillRect(6, -5, 10, 10);
      context.restore();

      const simulatedSpeed = Math.abs(player.speed) * 0.33;
      const battery = clamp(100 - simulatedSpeed * 0.05, 20, 100);
      const signal = connected ? clamp(95 - simulatedSpeed * 0.06, 54, 99) : 0;
      const temp = clamp(30 + simulatedSpeed * 0.06, 28, 68);
      const latency = connected ? clamp(18 + simulatedSpeed * 0.2, 18, 76) : 0;

      onTelemetry({
        battery,
        signal,
        temperature: temp,
        speedKmh: simulatedSpeed,
        latencyMs: latency,
      });
    };

    const loop = (now: number) => {
      const deltaSeconds = (now - last) / 1000;
      last = now;
      drawArena(deltaSeconds);
      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [connected, controlInput, onTelemetry]);

  return (
    <section className="panel panel--arena">
      <div className="panel__heading-row">
        <h2>Arena Simulada</h2>
        <span className={`status ${connected ? "on" : "off"}`}>
          {connected ? "Streaming ativo" : "Streaming pausado"}
        </span>
      </div>
      <p className="panel__subtitle">
        Simulacao de camera da arena para validar o fluxo antes da integracao real.
      </p>
      <canvas ref={canvasRef} className="arena-canvas" width={760} height={380} />
    </section>
  );
}
