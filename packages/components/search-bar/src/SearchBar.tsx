import React, { FormEvent, MutableRefObject, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import Icon, { Close3M } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';

import { CLEAR_ICON_SIZE } from './SearchBar.constants';
import { ValuePrefix } from './ValuePrefix';
import type { SearchBarProps } from './SearchBar.types';
import * as S from './SearchBar.styles';

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
  valuePrefix,
  ...htmlAttributes
}: SearchBarProps) => {
  const [isFocused, setFocus] = useState(false);
  const [input, setInput] = useState<HTMLInputElement | null>();
  const [valuePrefixWidth, setValuePrefixWidth] = useState<number>(0);
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

  const finalClassName = useMemo(() => classnames(className, { 'is-focused': isFocused }), [className, isFocused]);

  return (
    <S.SearchBarWrapper
      iconLeft={iconLeft}
      isEmpty={!value}
      disabled={disabled as boolean}
      borderRadius={borderRadius}
      data-testid="input-wrapper"
      valuePrefixWidth={valuePrefixWidth}
      {...htmlAttributes}
      className={finalClassName}
    >
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && (Boolean(valuePrefix) || Boolean(value)) && (
        <S.ClearInputWrapper onClick={onClearInput} data-testid="clear-btn">
          <Icon
            component={
              <Tooltip title={clearTooltip} {...clearTooltipProps}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['grey-500']}
            size={CLEAR_ICON_SIZE}
          />
        </S.ClearInputWrapper>
      )}
      {!!valuePrefix && <ValuePrefix value={valuePrefix} setValuePrefixWidth={setValuePrefixWidth} />}
      {!value && <S.PlaceholderWrapper valuePrefixWidth={valuePrefixWidth}>{placeholder}</S.PlaceholderWrapper>}
      <S.SearchBar
        onChange={(event: FormEvent<HTMLInputElement>): void => {
          onSearchChange(event.currentTarget.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
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
