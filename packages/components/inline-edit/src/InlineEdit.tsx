import React, {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { EditS } from '@synerise/ds-icon';
import { AutosizeInput } from '@synerise/ds-input';
import Tooltip from '@synerise/ds-tooltip';
import { toCamelCase } from '@synerise/ds-utils';

import * as S from './InlineEdit.styles';
import { type InlineEditProps } from './InlineEdit.types';

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
  const [focused, setFocused] = useState<boolean>();
  const theme = useTheme();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      input.onChange?.(event);
    },
    [input],
  );

  const handleFocus = () => {
    setFocused(false);
  };

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      input.onBlur && input.onBlur(event);
      inputRef.current && inputRef.current.scrollTo({ left: 0 });
      setFocused(true);
    },
    [input],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        input.onEnterPress && input.onEnterPress(event);
        inputRef.current && inputRef.current.blur();
      }
    },
    [input],
  );

  const handleFocusInput = useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
  }, [autoFocus]);

  return (
    <S.InPlaceEditableInputContainer
      className={`ds-inline-edit ${className || ''}`}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      scrolled={focused}
    >
      <AutosizeInput
        extraWidth={2}
        value={input.value}
        placeholder={input.placeholder}
        placeholderIsMinWidth={false}
        wrapperClassName="autosize-input"
      >
        <input
          autoComplete="off"
          id={input.name ? toCamelCase(input.name) : 'id'}
          {...input}
          className="autosize-input"
          data-testid="inline-edit-autosize-input"
          onKeyPress={handleKeyPress}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={input.value}
          ref={inputRef}
        />
      </AutosizeInput>
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper
            customIcon={Boolean(customIcon)}
            disabled={disabled}
            onClick={handleFocusInput}
            size={size}
          >
            <Icon
              color={theme.palette[`grey-600`]}
              component={customIcon || <EditS />}
              size={24}
            />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
