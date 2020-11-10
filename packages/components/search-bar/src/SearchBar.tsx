import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useState } from 'react';
import Tooltip from '@synerise/ds-tooltip';
import { FormattedMessage } from 'react-intl';
import * as S from './SearchBar.styles';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
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
}) => {
  const [isFocused, setFocus] = useState(false);
  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    handleInputRef && handleInputRef(inputRef)
    autofocus && inputRef.current && inputRef.current.focus();
  };
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
        onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
        onFocus={(): void => setFocus(true)}
        onBlur={(): void => setFocus(false)}
        placeholder={placeholder}
        value={value}
        className={className}
        resetMargin
        handleInputRef={focus}
        disabled={disabled}
        autoComplete="off"
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
