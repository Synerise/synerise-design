import React, { useCallback, useRef, useState, KeyboardEvent, FocusEvent, ChangeEvent, useEffect } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { EditS } from '@synerise/ds-icon';
import { toCamelCase } from '@synerise/ds-utils';
import { AutosizeInput } from '@synerise/ds-input';

import * as S from './InlineEdit.styles';
import { InlineEditProps } from './InlineEdit.types';

const InlineEdit = ({
  className,
  style,
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  tooltipTitle,
  error,
  input,
}: InlineEditProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [scrolled, setScrolled] = useState<boolean>();

  const handleScroll = useCallback(() => {
    if (inputRef.current) {
      const scrolledPixels = inputRef.current.scrollLeft;
      if (scrolledPixels > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  }, [inputRef]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      input.onChange(event);
    },
    [input]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      input.onBlur && input.onBlur(event);
      inputRef.current && inputRef.current.scrollTo({ left: 0 });
    },
    [input, inputRef]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        input.onEnterPress && input.onEnterPress(event);
        inputRef.current && inputRef.current.blur();
      }
    },
    [input, inputRef]
  );

  const handleFocusInput = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
  }, [autoFocus, inputRef]);

  return (
    <S.InPlaceEditableInputContainer
      className={`ds-inline-edit ${className || ''}`}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      scrolled={scrolled}
    >
      <AutosizeInput
        extraWidth={2}
        value={input.value || ''}
        placeholder={input.placeholder}
        placeholderIsMinWidth={false}
        wrapperClassName="autosize-input"
      >
        <input
          itemRef=""
          onScroll={handleScroll}
          id={input.name ? toCamelCase(input.name) : 'id'}
          className="autosize-input"
          placeholder={input.placeholder}
          maxLength={input.maxLength}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          name={input.name}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={input.readOnly}
          value={input.value || ''}
          autoComplete={input.autoComplete}
          ref={inputRef}
        />
      </AutosizeInput>
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper disabled={disabled} onClick={handleFocusInput} size={size}>
            <Icon component={<EditS />} size={24} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
