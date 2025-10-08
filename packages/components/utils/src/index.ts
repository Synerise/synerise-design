export { default as hexToRgba } from './hexToRgba/hexToRgba';
export { default as toCamelCase } from './toCamelCase/toCamelCase';
export {
  useOnClickOutside,
  type HandledEventsType,
} from './useOnClickOutside/useOnClickOutside';
export { renderWithHighlight } from './renderWithHighlight/renderWithHighlight';
export { useStableId } from './useStableId/useStableId';
export { default as selectColorByLetter } from './selectColorByLetter/selectColorByLetter';
export { default as focusWithArrowKeys } from './focusWithArrowKeys/focusWithArrowKeys';
export { default as escapeRegEx } from './regex/regex';
export { default as doubleClickListener } from './doubleClickListener/doubleClickListener';
export { default as useResize } from './useResize/useResize';
export { default as useResizeObserver } from './useResizeObserver/useResizeObserver';
export * from './useBreakpoint/useBreakpoint';
export { default as useCombinedRefs } from './useCombinedRefs/useCombinedRefs';
export { default as usePrevious } from './usePrevious/usePrevious';
export { useIsMounted } from './useIsMounted/useIsMounted';
export { default as useElementInView } from './useElementInView/useElementInView';
export { default as useOverscrollBlock } from './useOverscrollBlock/useOverscrollBlock';
export { default as useResizeToFit } from './useResizeToFit/useResizeToFit';
export * from './useScrollContain/useScrollContain';
export * from './useSearchResults';
export * from './useKeyboardShortcuts/useKeyboardShortcuts';
export * from './omitKeys/omitKeys';
export * from './useTraceUpdate';
export * from './getPopupContainer';
export * from './useLatestRef';

export const NOOP = (): void => {};

export type {
  DataAttributes,
  ExactlyOne,
  LiteralStringUnion,
  WithHTMLAttributes,
  DeepPartial,
  RequiredProps,
  ObjectStringKeys,
} from './types/types';
