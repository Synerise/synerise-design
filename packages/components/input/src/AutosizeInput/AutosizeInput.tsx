import React, { type CSSProperties, forwardRef, useRef } from 'react';

import { useMergeRefs } from '@floating-ui/react';

import type { AutosizeInputProps } from './AutosizeInput.types';
import { SIZER_STYLE, useAutosizeWidth } from './useAutosizeWidth';

const wrapperBaseStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-block',
};

// content-box so the computed text width (+ extraWidth) is the content width;
// the input's own padding/border sit outside it and never clip the value.
const inputBaseStyle: CSSProperties = {
  boxSizing: 'content-box',
};

/**
 * Native auto-width `<input>`: renders its own input plus a hidden sizer, and
 * sizes the input to the text width via `useAutosizeWidth`. The forwarded ref
 * points at the underlying `<input>`.
 */
const AutosizeInput = forwardRef<HTMLInputElement, AutosizeInputProps>(
  (
    {
      minWidth,
      extraWidth,
      placeholderIsMinWidth,
      wrapperClassName,
      wrapperStyle,
      onAutosize,
      className,
      style,
      value,
      placeholder,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const measurableValue =
      typeof value === 'string' || typeof value === 'number'
        ? value
        : undefined;

    const { sizerRef, containerRef } = useAutosizeWidth<HTMLInputElement>({
      value: measurableValue,
      placeholder,
      minWidth,
      extraWidth,
      placeholderIsMinWidth,
      inputRef,
      onAutosize,
    });

    // The hook writes the measured width to `containerRef` — here that is the
    // input itself; `inputRef` (font source) and the forwarded ref point to it too.
    const mergedInputRef = useMergeRefs([inputRef, containerRef, forwardedRef]);

    return (
      <div
        className={wrapperClassName}
        style={{ ...wrapperBaseStyle, ...wrapperStyle }}
      >
        <input
          {...inputProps}
          value={value}
          placeholder={placeholder}
          ref={mergedInputRef}
          className={className}
          style={{ ...inputBaseStyle, ...style }}
        />
        <span ref={sizerRef} style={SIZER_STYLE} aria-hidden />
      </div>
    );
  },
);

export default AutosizeInput;
