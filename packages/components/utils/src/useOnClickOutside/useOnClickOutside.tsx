import { type RefObject, useEffect, useRef } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const _CLICK = 'click';
const _CONTEXTMENU = 'contextmenu';

type HandledEvents = [
  typeof MOUSEDOWN,
  typeof TOUCHSTART,
  typeof _CLICK,
  typeof _CONTEXTMENU,
];
export type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;
const defaultEvents: HandledEventsType[] = [MOUSEDOWN, TOUCHSTART];

/**
 * Hook for listening for outside clicks.
 *
 * @param ref main component to out of which outside clicks will be detected
 * @param handler function called on outside click
 * @param customEventsTypes list of events to handle that are happening outside (optional, pass something else than `undefined` to overwrite default `['mousedown', 'touchstart']`)
 * @param ignoreSelectors list of selectors/classes which, in case it is found that any of parent elements of triggering element has this class, event `handler` won't be called
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Handler | null,
  customEventsTypes?: HandledEventsType[],
  ignoreSelectors?: string[],
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
      if (!ref.current || !handlerRef.current) {
        return;
      }
      if (ref.current.contains(event.target as Node)) {
        return;
      }
      if (
        ignoreSelectors?.some((className) =>
          (event.target as HTMLElement)?.closest(className),
        )
      ) {
        // if any of parent elements contain one of ignored classes - stop proceeding this event
        return;
      }
      handlerRef.current(event);
    };
    events.forEach((event) => {
      document.addEventListener(event, listener);
    });
    return (): void => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, ref, events, ignoreSelectors]);
};
