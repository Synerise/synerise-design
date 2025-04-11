import React, { FormEvent, MutableRefObject, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { Close3M } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './SearchBar.styles';
import { SearchBarProps } from './SearchBar.types';

const DEFAULT_PLACEHOLDER_STRING = 'Search';

const SearchBar = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
  autofocus,
  clearTooltip = <FormattedMessage id="DS.SEARCH-BAR.CLEAR-TOOLTIP" defaultMessage="Clear" />,
  disabled,
  borderRadius,
  handleInputRef,
  autofocusDelay,
  clearTooltipProps,
  ...htmlAttributes
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
  const placeholderString = typeof placeholder === 'string' ? placeholder : DEFAULT_PLACEHOLDER_STRING;
  return (
    <S.SearchBarWrapper
      iconLeft={iconLeft}
      isEmpty={!value}
      className={isFocused ? 'is-focused' : ''}
      disabled={disabled as boolean}
      borderRadius={borderRadius}
      data-testid="input-wrapper"
      {...htmlAttributes}
    >
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && Boolean(value) && (
        <S.ClearInputWrapper onClick={onClearInput} data-testid="clear-btn">
          <Icon
            component={
              <Tooltip title={clearTooltip} {...clearTooltipProps}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['grey-500']}
            size={18}
          />
        </S.ClearInputWrapper>
      )}
      {!value && <S.PlaceholderWrapper>{placeholder}</S.PlaceholderWrapper>}
      <S.SearchBar
        onChange={(event: FormEvent<HTMLInputElement>): void => {
          onSearchChange(event.currentTarget.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        className={className}
        resetMargin
        placeholder={placeholderString}
        handleInputRef={handleRef}
        disabled={disabled}
        autoComplete="off"
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
