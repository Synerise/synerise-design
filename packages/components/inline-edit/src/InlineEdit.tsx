import React, { useCallback, useRef, useState, KeyboardEvent, FocusEvent, ChangeEvent, useEffect } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { EditS } from '@synerise/ds-icon';
import { toCamelCase } from '@synerise/ds-utils';
import { AutosizeInput } from '@synerise/ds-input';
import { theme } from '@synerise/ds-core';

import * as S from './InlineEdit.styles';
import { InlineEditProps } from './InlineEdit.types';

const InlineEdit = ({
  className,
  style,
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  customIcon,
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
          onScroll={handleScroll}
          id={input.name ? toCamelCase(input.name) : 'id'}
          {...input}
          className="autosize-input"
          data-testid="inline-edit-autosize-input"
          onKeyPress={handleKeyPress}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          value={input.value || ''}
          ref={inputRef}
        />
      </AutosizeInput>
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper customIcon={Boolean(customIcon)} disabled={disabled} onClick={handleFocusInput} size={size}>
            <Icon color={theme.palette[`grey-600`]} component={customIcon || <EditS />} size={24} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
