import { RefObject, useEffect, useRef } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const CLICK = 'click';
const CONTEXTMENU = 'contextmenu';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART, typeof CLICK, typeof CONTEXTMENU];
export type HandledEventsType = HandledEvents[number];
type PossibleEvent = { [Type in HandledEventsType]: HTMLElementEventMap[Type] }[HandledEventsType];
type Handler = (event: PossibleEvent) => void;
const defaultEvents: HandledEventsType[] = [MOUSEDOWN, TOUCHSTART];

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Handler | null,
  customEventsTypes?: HandledEventsType[]
): void => {
  const handlerRef = useRef(handler);
  const events = customEventsTypes || defaultEvents;

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
  }, [handler, ref, events]);
};

export default useOnClickOutside;
