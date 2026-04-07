import { RentalSummary, RobotModel } from "../types";

const CAMERA_ARENA_FEE_PER_MINUTE = 0.9;

export function calculateRental(model: RobotModel, minutes: number): RentalSummary {
  const subtotal = Number((model.basePricePerMinute * minutes).toFixed(2));
  const cameraFee = model.hasIntegratedCamera
    ? 0
    : Number((CAMERA_ARENA_FEE_PER_MINUTE * minutes).toFixed(2));
  const total = Number((subtotal + cameraFee).toFixed(2));

  return {
    modelName: model.name,
    minutes,
    subtotal,
    cameraFee,
    total,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
