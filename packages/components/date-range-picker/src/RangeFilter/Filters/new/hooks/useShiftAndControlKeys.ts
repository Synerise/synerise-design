import React from 'react';

const KEYS = {
  SHIFT: 'Shift',
  COMMAND: 'Meta',
  CONTROL: 'Control',
} as const;

export const useShiftAndControlKeys = (
  ref: React.MutableRefObject<HTMLElement | undefined>,
): readonly [boolean, boolean] => {
  const [controlPressed, setControlPressed] = React.useState(false);
  const [shiftPressed, setShiftPressed] = React.useState(false);

  React.useEffect(() => {
    const element = ref?.current;
    if (!element) {
      return undefined;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEYS.SHIFT) {
        setShiftPressed(true);
        setControlPressed(false);
      }
      if (e.key === KEYS.CONTROL || e.key === KEYS.COMMAND) {
        setControlPressed(true);
        setShiftPressed(false);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === KEYS.SHIFT) {
        setShiftPressed(false);
      }
      if (e.key === KEYS.CONTROL || e.key === KEYS.COMMAND) {
        setControlPressed(false);
      }
    };
    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('keyup', handleKeyUp);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('keyup', handleKeyUp);
    };
  }, [ref]);

  return [controlPressed, shiftPressed] as const;
};
