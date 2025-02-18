import React, {
  CSSProperties,
  useEffect,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useResizeObserver } from '@synerise/ds-utils';
import type { AutosizeInputRefType, AutosizeInputProps } from './AutosizeInput.types';
import { calculateInputWidth } from './utils';

const sizerStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre',
};

const FONT_CSS_PROPS: (keyof CSSProperties)[] = [
  'fontSize',
  'fontFamily',
  'fontWeight',
  'fontFeatureSettings',
  'fontStyle',
  'letterSpacing',
  'fontStretch',
  'textTransform',
];

const AutosizeInput = forwardRef<AutosizeInputRefType, AutosizeInputProps>(
  (
    {
      extraWidth = 16,
      wrapperClassName,
      wrapperStyle: wrapperStyleProp,
      onAutosize,
      preAutosize,
      placeholderIsMinWidth,
      minWidth = 0,
      handleInputRef,
      children,
      transformWrapperRef,
      transformRef,
      placeholder,
      value,
      defaultValue,
      style,
    },
    forwardedRef
  ) => {
    const usedValue = value ?? defaultValue ?? '';
    const [sizerValue, setSizerValue] = useState(usedValue);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputWrapperRef = useRef<HTMLElement | null>(null);
    const sizerRef = useRef<HTMLDivElement>(null);
    const placeholderSizerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const transformWrapper = useMemo(() => {
      return transformWrapperRef || ((element: HTMLElement) => element);
    }, [transformWrapperRef]);

    const transformElement = useMemo(() => {
      return transformRef || ((element: HTMLElement) => element);
    }, [transformRef]);

    const contentWidth = useRef<number | undefined>();
    const placeholderWidth = useRef<number | undefined>();

    const applyNewWidth = useCallback(() => {
      const calculatedWidth = calculateInputWidth({
        sizerWidth: contentWidth.current,
        hasValue: !!sizerRef.current?.textContent,
        placeholderIsMinWidth,
        placeholderWidth: placeholderWidth.current ?? placeholderSizerRef.current?.scrollWidth,
        minWidth: +minWidth,
        placeholder,
      });

      if (inputWrapperRef.current) {
        const finalWidth = calculatedWidth + +extraWidth;
        if (finalWidth !== parseFloat(inputWrapperRef.current.style.width)) {
          preAutosize && preAutosize(calculatedWidth);
          inputWrapperRef.current.style.width = `${finalWidth}px`;
          onAutosize && onAutosize(calculatedWidth);
        }
      }
    }, [extraWidth, minWidth, onAutosize, placeholder, placeholderIsMinWidth, preAutosize]);

    const resizeContentHandler = useCallback(
      (newWidth: DOMRect) => {
        contentWidth.current = newWidth.width;
        applyNewWidth();
      },
      [applyNewWidth]
    );

    const resizePlaceholderHandler = useCallback(
      (newWidth: DOMRect) => {
        placeholderWidth.current = newWidth.width;
        applyNewWidth();
      },
      [applyNewWidth]
    );

    useResizeObserver(sizerRef, resizeContentHandler);
    useResizeObserver(placeholderSizerRef, resizePlaceholderHandler);

    const copyInputStyles = () => {
      if (inputRef.current) {
        const computedStyle = window.getComputedStyle(inputRef.current);
        FONT_CSS_PROPS.forEach(cssProperty => {
          if (sizerRef.current) {
            sizerRef.current.style[cssProperty] = computedStyle[cssProperty];
          }
          if (placeholderSizerRef.current) {
            placeholderSizerRef.current.style[cssProperty] = computedStyle[cssProperty];
          }
        });
      }
    };

    useLayoutEffect(() => {
      copyInputStyles();
    }, []);

    useEffect(() => {
      inputRef.current && setSizerValue(inputRef.current.value);
    }, [usedValue]);

    useEffect(() => {
      if (sizerRef.current) {
        const sizerSibling = sizerRef.current.nextElementSibling;
        const inputElement = sizerSibling instanceof HTMLElement && transformElement(sizerSibling);
        const inputWrapperElement = sizerSibling instanceof HTMLElement && transformWrapper(sizerSibling);
        if (inputWrapperElement && inputWrapperElement instanceof HTMLElement) {
          inputWrapperRef.current = inputWrapperElement;
        }
        if (inputElement && !inputRef.current) {
          if (inputElement && inputElement instanceof HTMLInputElement) {
            inputRef.current = inputElement;
            setSizerValue(inputRef.current.value);
            inputRef.current.style.boxSizing = 'content-box';
            handleInputRef && handleInputRef(inputElement, sizerSibling);
            copyInputStyles();
          }
        }
      }
    }, [handleInputRef, transformElement, transformWrapper]);

    useImperativeHandle(forwardedRef, () => ({
      inputRef,
      sizerRef,
      wrapperRef,
      inputWrapperRef,
      placeholderSizerRef,
      copyInputStyles,
      updateInputWidth: applyNewWidth,
    }));

    const wrapperStyle: CSSProperties = {
      ...wrapperStyleProp,
      position: 'relative',
      display: style?.display ?? 'inline-block',
    };

    return (
      <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle} data-testid="wrapper">
        <div style={sizerStyle} ref={sizerRef} data-testid="sizer">
          {sizerValue}
        </div>
        {children}
        {placeholder ? (
          <div ref={placeholderSizerRef} style={sizerStyle} data-testid="placeholder-sizer">
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
);

export default AutosizeInput;
