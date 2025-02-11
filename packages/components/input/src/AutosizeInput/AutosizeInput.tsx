import React, {
  CSSProperties,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
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
      transformWrapperRef = (element: HTMLElement) => element,
      transformRef = (element: HTMLElement) => element,
      placeholder,
      value,
      defaultValue,
      style,
    },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputWrapperRef = useRef<HTMLElement | null>(null);
    const sizerRef = useRef<HTMLDivElement>(null);
    const placeholderSizerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [inputWidth, setInputWidth] = useState(0);

    const usedValue = value ?? defaultValue ?? '';
    const hasValue = Boolean(usedValue);

    const resizeHandler = useCallback(
      (newSizerWidth: DOMRect) => {
        const placeholderWidth = placeholderSizerRef.current?.scrollWidth;
        const calculatedWidth = calculateInputWidth({
          sizerWidth: newSizerWidth.width,
          hasValue: !!sizerRef.current?.textContent,
          placeholderIsMinWidth,
          placeholderWidth,
          minWidth: +minWidth,
          placeholder,
        });

        if (inputWrapperRef.current) {
          inputWrapperRef.current.style.width = `${calculatedWidth + +extraWidth}px`;
        }
      },
      [extraWidth, minWidth, placeholder, placeholderIsMinWidth]
    );

    useResizeObserver(sizerRef, resizeHandler);
    const { width: updatedPlaceholderWidth } = useResizeObserver(placeholderSizerRef);

    const copyInputStyles = () => {
      if (inputRef.current) {
        const computedStyle = window.getComputedStyle(inputRef.current);
        if (sizerRef.current) {
          sizerRef.current.style.fontSize = computedStyle.fontSize;
          sizerRef.current.style.fontFamily = computedStyle.fontFamily;
          sizerRef.current.style.fontWeight = computedStyle.fontWeight;
          sizerRef.current.style.fontStyle = computedStyle.fontStyle;
          sizerRef.current.style.letterSpacing = computedStyle.letterSpacing;
          sizerRef.current.style.textTransform = computedStyle.textTransform;
        }
        if (placeholderSizerRef.current) {
          placeholderSizerRef.current.style.fontSize = computedStyle.fontSize;
          placeholderSizerRef.current.style.fontFamily = computedStyle.fontFamily;
          placeholderSizerRef.current.style.fontWeight = computedStyle.fontWeight;
          placeholderSizerRef.current.style.fontStyle = computedStyle.fontStyle;
          placeholderSizerRef.current.style.letterSpacing = computedStyle.letterSpacing;
          placeholderSizerRef.current.style.textTransform = computedStyle.textTransform;
        }
      }
    };

    const resize = useCallback(
      (width: number) => {
        if (inputWidth !== width + +extraWidth) {
          preAutosize && preAutosize(width);
          setInputWidth(width + +extraWidth);
          onAutosize && onAutosize(width);
        }
      },
      [extraWidth, inputWidth, onAutosize, preAutosize]
    );

    const updateInputWidth = () => {
      const sizerWidth = sizerRef.current?.scrollWidth;
      const placeholderWidth = placeholderSizerRef.current?.scrollWidth;
      const calculatedWidth = calculateInputWidth({
        sizerWidth,
        hasValue,
        placeholderIsMinWidth,
        placeholderWidth,
        minWidth: +minWidth,
        placeholder,
      });

      if ((sizerWidth && hasValue && calculatedWidth) || (placeholder && placeholderWidth) || sizerRef.current) {
        resize(calculatedWidth);
      }
    };

    /* Copy styles of the input field to the sizer, ensuring that the width of the input adjusts accordingly */
    useLayoutEffect(() => {
      copyInputStyles();
    }, []);

    useEffect(() => {
      if (inputWrapperRef.current) {
        inputWrapperRef.current.style.width = `${inputWidth}px`;
      }
    }, [inputWidth]);

    useEffect(() => {
      if (sizerRef.current) {
        const sizerSibling = sizerRef.current.nextElementSibling;
        const inputElement = sizerSibling instanceof HTMLElement && transformRef(sizerSibling);
        const inputWrapperElement = sizerSibling instanceof HTMLElement && transformWrapperRef(sizerSibling);
        if (inputWrapperElement && inputWrapperElement instanceof HTMLElement) {
          inputWrapperRef.current = inputWrapperElement;
        }
        if (inputElement) {
          if (inputElement && inputElement instanceof HTMLInputElement) {
            inputRef.current = inputElement;
            inputRef.current.style.boxSizing = 'content-box';
            handleInputRef && handleInputRef(inputElement, sizerSibling);
            copyInputStyles();
          }
        }
      }
    }, [handleInputRef, transformRef, transformWrapperRef]);

    useEffect(updateInputWidth, [
      hasValue,
      placeholder,
      extraWidth,
      placeholderIsMinWidth,
      onAutosize,
      setInputWidth,
      minWidth,
      updatedPlaceholderWidth,
      preAutosize,
      resize,
    ]);

    useImperativeHandle(forwardedRef, () => ({
      inputRef,
      sizerRef,
      wrapperRef,
      placeholderSizerRef,
      copyInputStyles,
      updateInputWidth,
    }));

    const wrapperStyle: CSSProperties = {
      ...wrapperStyleProp,
      position: 'relative',
      display: style?.display ?? 'inline-block',
    };

    return (
      <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle} data-testid="wrapper">
        <div style={sizerStyle} ref={sizerRef} data-testid="sizer">
          {usedValue}
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
