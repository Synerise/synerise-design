import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import type {
  UseAutosizeWidthParams,
  UseAutosizeWidthResult,
} from './useAutosizeWidth.types';
import { calculateInputWidth } from './utils';

/**
 * Styles for the hidden measuring `<span>`. It is taken out of layout flow
 * (`position: absolute`, `height: 0`, `visibility: hidden`) so it never affects
 * the surrounding layout, and `white-space: pre` preserves spacing exactly as
 * typed. Font properties inherit by default; when the consuming input declares
 * its font on the element itself (not an ancestor), pass `inputRef` to copy it.
 */
export const SIZER_STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: 0,
  visibility: 'hidden',
  overflow: 'scroll',
  whiteSpace: 'pre',
  font: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  fontFeatureSettings: 'inherit',
  fontVariantNumeric: 'inherit',
};

type FontCSSProperty = keyof Pick<
  CSSProperties,
  | 'fontSize'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontFeatureSettings'
  | 'fontVariantNumeric'
  | 'fontStyle'
  | 'letterSpacing'
  | 'fontStretch'
  | 'textTransform'
>;

const FONT_CSS_PROPS: Array<FontCSSProperty> = [
  'fontSize',
  'fontFamily',
  'fontWeight',
  'fontFeatureSettings',
  // Mirror tabular/proportional figures onto the sizer — otherwise an input using
  // `font-variant-numeric: tabular-nums` renders tabular but is measured proportional,
  // clipping the value or leaving a gap.
  'fontVariantNumeric',
  'fontStyle',
  'letterSpacing',
  'fontStretch',
  'textTransform',
];

/**
 * Headless auto-width measurement. The consumer renders a single hidden sizer
 * `<span>` and an inline-block wrapper; this hook measures the text width
 * synchronously in `useLayoutEffect` (before paint) and writes the resulting
 * width to the wrapper imperatively — no ResizeObserver and no per-keystroke
 * state update, so typing does not trigger extra React renders.
 */
export const useAutosizeWidth = <C extends HTMLElement = HTMLDivElement>({
  value,
  placeholder,
  minWidth = 0,
  extraWidth = 0,
  placeholderIsMinWidth,
  inputRef,
  onAutosize,
}: UseAutosizeWidthParams): UseAutosizeWidthResult<C> => {
  const sizerRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<C>(null);

  const copyFont = useCallback(() => {
    const sizer = sizerRef.current;
    const input = inputRef?.current;
    if (!sizer || !input) {
      return;
    }
    const computedStyle = window.getComputedStyle(input);
    FONT_CSS_PROPS.forEach((cssProperty) => {
      sizer.style[cssProperty] = computedStyle[cssProperty];
    });
  }, [inputRef]);

  const measure = useCallback(() => {
    const sizer = sizerRef.current;
    const container = containerRef.current;
    if (!sizer || !container) {
      return;
    }

    const content = value === undefined || value === null ? '' : String(value);
    sizer.textContent = content;
    const contentWidth = sizer.scrollWidth;

    let placeholderWidth: number | undefined;
    if (placeholder) {
      sizer.textContent = placeholder;
      placeholderWidth = sizer.scrollWidth;
      sizer.textContent = content;
    }

    const computedWidth = calculateInputWidth({
      sizerWidth: contentWidth,
      hasValue: content.length > 0,
      placeholderIsMinWidth,
      placeholderWidth,
      minWidth: +minWidth,
      placeholder,
    });

    const finalWidth = computedWidth + +extraWidth;
    if (parseFloat(container.style.width) !== finalWidth) {
      container.style.width = `${finalWidth}px`;
      onAutosize && onAutosize(computedWidth);
    }
  }, [
    value,
    placeholder,
    placeholderIsMinWidth,
    minWidth,
    extraWidth,
    onAutosize,
  ]);

  // Copy font once on mount (and if the input element changes) so the sizer
  // matches the input even when the font is set on the input itself.
  useLayoutEffect(() => {
    copyFont();
  }, [copyFont]);

  // Re-measure synchronously before paint whenever a width-affecting input changes.
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Keep stable references to the latest measure/copyFont so the observers
  // below can be subscribed once (not re-created every value change).
  const measureRef = useRef(measure);
  const copyFontRef = useRef(copyFont);
  useLayoutEffect(() => {
    measureRef.current = measure;
    copyFontRef.current = copyFont;
  });

  // A single ResizeObserver on the sizer covers the cases the synchronous
  // value-keyed measurement cannot: the field rendered while hidden (e.g. in a
  // closed drawer) and shown later, web-font loads, and ambient layout changes.
  // It calls `measure` imperatively (rAF-batched) — no state update, so it does
  // not cause the per-keystroke re-render storm the old implementation had.
  useEffect(() => {
    const sizer = sizerRef.current;
    if (!sizer || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    let frame = 0;
    const hasRaf = typeof window.requestAnimationFrame === 'function';
    const observer = new ResizeObserver(() => {
      if (hasRaf) {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => measureRef.current());
      } else {
        measureRef.current();
      }
    });
    observer.observe(sizer);
    return () => {
      observer.disconnect();
      if (hasRaf) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // The initial measurement runs with the fallback font; when a web font loads
  // asynchronously the glyphs get wider, so re-sync the sizer font and re-measure
  // once fonts settle (and on every subsequent font load) to avoid clipping.
  useEffect(() => {
    const fontSet =
      typeof document !== 'undefined' ? document.fonts : undefined;
    if (!fontSet) {
      return undefined;
    }
    const remeasure = () => {
      copyFontRef.current();
      measureRef.current();
    };
    fontSet.ready.then(remeasure).catch(() => undefined);
    fontSet.addEventListener('loadingdone', remeasure);
    return () => {
      fontSet.removeEventListener('loadingdone', remeasure);
    };
  }, []);

  const recalculate = useCallback(() => {
    copyFont();
    measure();
  }, [copyFont, measure]);

  return { sizerRef, containerRef, recalculate };
};
