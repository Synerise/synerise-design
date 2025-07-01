import React from 'react';

enum KEYS {
  SHIFT = 'Shift',
  COMMAND = 'Meta',
  CONTROL = 'Control',
}

export const useShiftAndControlKeys = (
  ref: React.MutableRefObject<HTMLElement | undefined>,
): readonly [boolean, boolean] => {
  const [controlPressed, setControlPressed] = React.useState(false);
  const [shiftPressed, setShiftPressed] = React.useState(false);

  React.useEffect(() => {
    if (ref?.current) {
      ref.current.addEventListener<'keydown'>('keydown', (e: KeyboardEvent) => {
        if (e.key === KEYS.SHIFT) {
          setShiftPressed(true);
          setControlPressed(false);
        }
        if (e.key === KEYS.CONTROL || e.key === KEYS.COMMAND) {
          setControlPressed(true);
          setShiftPressed(false);
        }
      });
      ref.current.addEventListener<'keyup'>('keyup', (e: KeyboardEvent) => {
        if (e.key === KEYS.SHIFT) {
          setShiftPressed(false);
        }
        if (e.key === KEYS.CONTROL || e.key === KEYS.COMMAND) {
          setControlPressed(false);
        }
      });
    }
  }, [ref]);

  return [controlPressed, shiftPressed] as const;
};
