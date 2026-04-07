import { useMemo, useState } from "react";
import { ROBOT_MODELS } from "../data/models";
import { calculateRental } from "../utils/pricing";
import { ControlInput, Telemetry } from "../types";

const DEFAULT_TELEMETRY: Telemetry = {
  battery: 100,
  signal: 95,
  temperature: 32,
  speedKmh: 0,
  latencyMs: 19,
};

const DEFAULT_CONTROL: ControlInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  boost: false,
};

export function useMvpStore() {
  const [selectedModelId, setSelectedModelId] = useState(ROBOT_MODELS[0].id);
  const [rentalMinutes, setRentalMinutes] = useState(15);
  const [connected, setConnected] = useState(false);
  const [controlInput, setControlInput] = useState<ControlInput>(DEFAULT_CONTROL);
  const [telemetry, setTelemetry] = useState<Telemetry>(DEFAULT_TELEMETRY);

  const selectedModel = useMemo(() => {
    return (
      ROBOT_MODELS.find((model) => model.id === selectedModelId) ?? ROBOT_MODELS[0]
    );
  }, [selectedModelId]);

  const rentalSummary = useMemo(
    () => calculateRental(selectedModel, rentalMinutes),
    [selectedModel, rentalMinutes],
  );

  return {
    models: ROBOT_MODELS,
    selectedModel,
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
  };
}
