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

/**
 * Hook for listening for outside clicks.
 * 
 * @param ref main ref to a ref
 * @param handler function for handling
 * @param customEventsTypes list of events to handle that are happening outside (optional, pass something else than `undefined` to overwrite default `['mousedown', 'touchstart']`)
 * @param otherRefs list of other refs which will be considered as inner-click (won't trigger the event handler)
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Handler | null,
  customEventsTypes?: HandledEventsType[],
  // otherRefs?: RefObject<HTMLElement>[],
  // otherRefs?: React.MutableRefObject<HTMLElement>,
  // otherRefs?: React.useRef<Record<string, HTMLElement>>,
  otherRefs?: React.MutableRefObject<Record<string, HTMLElement>>,
): void => {
  const handlerRef = useRef(handler);
  const events = customEventsTypes || defaultEvents;

  useEffect(() => {
    handlerRef.current = handler;
  });

  // const refsArray = otherRefs && Object.values(otherRefs.current)

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
      const refsArray = otherRefs && Object.values(otherRefs.current)
      console.info('handling click 1', refsArray)
      // if (refsArray && refsArray.some(someref => someref.current?.contains(event.target as Node))) {
      if (refsArray && refsArray.some(someref => someref?.contains(event.target as Node))) {
        console.info('handling click 2')
        // if at least one of other refs contain clicked element - also terminate processing event
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
  }, [handler, ref, events, otherRefs]);
};
