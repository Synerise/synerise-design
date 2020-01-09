import { RefObject, useEffect, useRef } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = { [Type in HandledEventsType]: HTMLElementEventMap[Type] }[HandledEventsType];
type Handler = (event: PossibleEvent) => void;
const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Handler | null): void => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });
  useEffect(() => {
    if (!handler) {
      return (): null => null;
    }
    const listener = (event: PossibleEvent): void => {
      if (!ref.current || !handlerRef.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handlerRef.current(event);
    };
    events.forEach(event => {
      document.addEventListener(event, listener);
    });
    return (): void => {
      events.forEach(event => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, ref]);
};

export default useOnClickOutside;
