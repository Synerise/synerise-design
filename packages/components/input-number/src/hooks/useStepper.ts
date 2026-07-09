import { useCallback, useEffect, useRef } from 'react';

// antd/rc-input-number parity: holding a stepper repeats the step after an initial delay, then at a
// fixed interval; Shift multiplies the step by ten.
const STEP_DELAY = 600;
const STEP_INTERVAL = 200;
const DECUPLE = 10;

const countDecimals = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 0;
  }
  const text = String(value);
  if (text.includes('e-')) {
    return Number(text.split('e-')[1]);
  }
  return text.includes('.') ? text.split('.')[1].length : 0;
};

// Integer-scaled addition so e.g. 0.1 + 0.2 yields 0.3 rather than 0.30000000000000004.
const scaledAdd = (a: number, b: number): number => {
  const factor = Math.pow(10, Math.max(countDecimals(a), countDecimals(b)));
  return (Math.round(a * factor) + Math.round(b * factor)) / factor;
};

const clamp = (value: number, min?: number, max?: number): number => {
  let next = value;
  if (max !== undefined && next > max) {
    next = max;
  }
  if (min !== undefined && next < min) {
    next = min;
  }
  return next;
};

const applyPrecision = (value: number, precision?: number): number =>
  precision === undefined ? value : Number(value.toFixed(precision));

type UseStepperArgs = {
  value: number | null | undefined;
  step?: number | string;
  min?: number;
  max?: number;
  /** Display precision floor (from valueFormatOptions); the step's own decimals are added on top. */
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  onStep: (next: number, info: { offset: number; type: 'up' | 'down' }) => void;
};

type UseStepperResult = {
  /** Single step — used for keyboard (the OS repeats key-down events itself). */
  step: (direction: 1 | -1, decuple?: boolean) => void;
  /** Press-and-hold: immediate step, then auto-repeat — used for the mouse handlers. */
  startStep: (direction: 1 | -1, decuple?: boolean) => void;
  stopStep: () => void;
  upDisabled: boolean;
  downDisabled: boolean;
};

export const useStepper = ({
  value,
  step = 1,
  min,
  max,
  precision,
  disabled,
  readOnly,
  onStep,
}: UseStepperArgs): UseStepperResult => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep the latest args in a ref so the repeat loop always steps from the current value/bounds
  // without re-creating the timers on every render.
  const latest = useRef({
    value,
    step,
    min,
    max,
    precision,
    disabled,
    readOnly,
    onStep,
  });
  latest.current = {
    value,
    step,
    min,
    max,
    precision,
    disabled,
    readOnly,
    onStep,
  };

  const base = value ?? 0;
  const locked = Boolean(disabled || readOnly);
  const upDisabled = locked || (max !== undefined && base >= max);
  const downDisabled = locked || (min !== undefined && base <= min);

  const stepOnce = useCallback((direction: 1 | -1, decuple = false) => {
    const args = latest.current;
    if (args.disabled || args.readOnly) {
      return;
    }
    const rawStep =
      typeof args.step === 'string'
        ? parseFloat(args.step) || 1
        : (args.step ?? 1);
    const delta = rawStep * (decuple ? DECUPLE : 1) * direction;
    // Round the stepped value to the larger of the step's own decimals and the display precision
    // floor (from valueFormatOptions). Use rawStep — not delta — so Shift×10 stays on the step grid.
    const effectivePrecision = Math.max(
      countDecimals(rawStep),
      args.precision ?? 0,
    );
    const next = applyPrecision(
      clamp(scaledAdd(args.value ?? 0, delta), args.min, args.max),
      effectivePrecision,
    );
    args.onStep(next, {
      offset: Math.abs(delta),
      type: direction === 1 ? 'up' : 'down',
    });
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startStep = useCallback(
    (direction: 1 | -1, decuple = false) => {
      clearTimer();
      if (latest.current.disabled || latest.current.readOnly) {
        return;
      }
      stepOnce(direction, decuple);
      const loop = (): void => {
        stepOnce(direction, decuple);
        timerRef.current = setTimeout(loop, STEP_INTERVAL);
      };
      timerRef.current = setTimeout(loop, STEP_DELAY);
    },
    [clearTimer, stepOnce],
  );

  // Clear any pending repeat on unmount so a held stepper never calls onStep after teardown.
  useEffect(() => clearTimer, [clearTimer]);

  return {
    step: stepOnce,
    startStep,
    stopStep: clearTimer,
    upDisabled,
    downDisabled,
  };
};
