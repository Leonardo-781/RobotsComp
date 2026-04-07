export type ModelCategory = "VEHICLE" | "MECH";

export interface RobotModel {
  id: string;
  name: string;
  category: ModelCategory;
  description: string;
  basePricePerMinute: number;
  maxSpeed: number;
  armorLevel: number;
  hasIntegratedCamera: boolean;
  accent: string;
}

export interface RentalSummary {
  modelName: string;
  minutes: number;
  subtotal: number;
  cameraFee: number;
  total: number;
}

export interface ControlInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  boost: boolean;
}

export interface Telemetry {
  battery: number;
  signal: number;
  temperature: number;
  speedKmh: number;
  latencyMs: number;
}
