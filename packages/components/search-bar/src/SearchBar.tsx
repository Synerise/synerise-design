import React, { FormEvent, MutableRefObject, useEffect, useState } from 'react';
import Icon, { Close3M } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';
import { FormattedMessage } from 'react-intl';
import * as S from './SearchBar.styles';
import { SearchBarProps } from './SearchBar.types';

const SearchBar = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
  autofocus,
  clearTooltip = <FormattedMessage id="DS.SEARCH-BAR.CLEAR-TOOLTIP" />,
  disabled,
  borderRadius,
  handleInputRef,
  autofocusDelay,
}: SearchBarProps) => {
  const [isFocused, setFocus] = useState(false);
  const [input, setInput] = useState<HTMLInputElement | null>();
  const handleRef = (ref: MutableRefObject<HTMLInputElement | null>) => {
    // eslint-disable-next-line no-unused-expressions
    handleInputRef?.(ref);
    if (ref.current) setInput(ref.current);
  };

  useEffect(() => {
    if (input) {
      if (autofocus) {
        if (autofocusDelay) {
          const timeout = setTimeout(() => {
            input.focus({ preventScroll: true });
          }, autofocusDelay);
          return () => {
            clearTimeout(timeout);
          };
        }
        input.focus({ preventScroll: true });
      }
    }
    return undefined;
  }, [autofocus, autofocusDelay, input]);

  return (
    <S.SearchBarWrapper
      iconLeft={iconLeft}
      isEmpty={!value}
      className={isFocused ? 'is-focused' : ''}
      disabled={disabled as boolean}
      borderRadius={borderRadius}
      data-testid="input-wrapper"
    >
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && Boolean(value) && (
        <S.ClearInputWrapper onClick={onClearInput} data-testid="clear-btn">
          <Icon
            component={
              <Tooltip title={clearTooltip}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['grey-500']}
            size={18}
          />
        </S.ClearInputWrapper>
      )}
      <S.SearchBar
        onChange={(event: FormEvent<HTMLInputElement>): void => onSearchChange(event.currentTarget.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        value={value}
        className={className}
        resetMargin
        handleInputRef={handleRef}
        disabled={disabled}
        autoComplete="off"
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
