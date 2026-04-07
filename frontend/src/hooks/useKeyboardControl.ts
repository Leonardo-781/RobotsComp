import { useEffect } from "react";
import { ControlInput } from "../types";

const KEYMAP: Record<string, keyof ControlInput> = {
  w: "forward",
  s: "backward",
  a: "left",
  d: "right",
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
  Shift: "boost",
};

interface UseKeyboardControlParams {
  connected: boolean;
  onControlChange: (nextControl: ControlInput) => void;
}

export function useKeyboardControl({
  connected,
  onControlChange,
}: UseKeyboardControlParams) {
  useEffect(() => {
    if (!connected) {
      return undefined;
    }

    const state: ControlInput = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      boost: false,
    };

    const updateState = (event: KeyboardEvent, pressed: boolean) => {
      const mapped = KEYMAP[event.key];
      if (!mapped) {
        return;
      }
      event.preventDefault();
      state[mapped] = pressed;
      onControlChange({ ...state });
    };

    const onKeyDown = (event: KeyboardEvent) => updateState(event, true);
    const onKeyUp = (event: KeyboardEvent) => updateState(event, false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [connected, onControlChange]);
}
