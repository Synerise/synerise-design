import React, {
  type ChangeEvent,
  type FocusEvent,
  forwardRef,
  useRef,
  useState,
} from 'react';

import { useMergeRefs } from '@floating-ui/react';
import Scrollbar from '@synerise/ds-scrollbar';

import * as InputStyles from '../Input.styles';
import { useTextareaAutosize } from '../hooks/useTextareaAutosize';
import * as S from './Textarea.styles';
import { type AutoSizeType, type RawTextAreaProps } from './Textarea.types';

const resolveRows = (autoSize?: AutoSizeType) =>
  typeof autoSize === 'object' ? autoSize : undefined;

export const RawTextArea = forwardRef<HTMLTextAreaElement, RawTextAreaProps>(
  (
    {
      disabled,
      error,
      errorText,
      rows = 4,
      wrapperStyle,
      onBlur,
      onFocus,
      onChange,
      resize,
      autoSize,
      readOnly,
      value,
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const mergedRef = useMergeRefs([innerRef, ref]);
    const rowsConfig = resolveRows(autoSize);

    const resize_ = useTextareaAutosize({
      ref: innerRef,
      value,
      minRows: rowsConfig?.minRows,
      maxRows: rowsConfig?.maxRows,
      enabled: Boolean(autoSize),
      onViewportHeight: setViewportHeight,
    });

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
      onChange && onChange(event);
      // Re-measure for uncontrolled usage (controlled value changes are handled
      // by the hook's value-keyed layout effect).
      if (autoSize) {
        resize_();
      }
    };

    return (
      <S.TextareaWrapper
        className="ds-textarea"
        isDisabled={Boolean(disabled)}
        isFocused={focus}
        isReadOnly={readOnly}
        hasError={Boolean(error)}
        resize={resize}
        style={{
          // In autoSize mode the wrapper is the fixed/max-height viewport the
          // ds-Scrollbar scrolls: the hook reports the clamped viewport height
          // (definite px so the inner `.ps` `height: 100%` resolves) while the
          // textarea grows to its full content height behind it. Falls back to
          // `auto` until the first measurement lands.
          height: autoSize
            ? viewportHeight !== null
              ? `${viewportHeight}px`
              : 'auto'
            : `${rows * 17}px`,
          ...wrapperStyle,
        }}
      >
        <Scrollbar absolute classes="textarea-scrollbar">
          <InputStyles.RawTextArea
            {...props}
            value={value}
            ref={mergedRef}
            error={error}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            onFocus={(e: FocusEvent<HTMLTextAreaElement>): void => {
              onFocus && onFocus(e);
              setFocus(true);
            }}
            onBlur={(e: FocusEvent<HTMLTextAreaElement>): void => {
              onBlur && onBlur(e);
              setFocus(false);
            }}
          />
        </Scrollbar>
      </S.TextareaWrapper>
    );
  },
);

export default RawTextArea;
